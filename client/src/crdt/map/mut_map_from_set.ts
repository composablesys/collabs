import { MutCMapFromSetSave } from "../../../generated/proto_compiled";
import {
  DefaultElementSerializer,
  ElementSerializer,
  PairSerializer,
} from "../../util";
import { Crdt } from "../core";
import { CSet } from "../set";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { LwwCMap } from "./lww_map";

/**
 * The set is used as a source of Crdts for values.
 */
export class MutCMapFromSet<
  K,
  C extends Crdt,
  SetArgs extends any[],
  S extends CSet<C, [K, SetArgs]> & {
    valueSerializer(): ElementSerializer<C>;
  }
> extends AbstractCMapCompositeCrdt<K, C, SetArgs> {
  protected readonly valueSet: S;
  protected readonly valueSetSerializer: ElementSerializer<C>;
  protected readonly map: LwwCMap<K, C>;
  // In case of restore calls, we can't trust that
  // map.getConflicts(key) returns all of the usable values
  // for key.  So to be able to delete all usable values when
  // set or delete is called, we need to store them here.
  // TODO: only use this if it's really needed (for values
  // not in conflicts), for efficiency?  Don't want to
  // pay for the storage cost if we never restore.
  protected readonly usableValues: Map<K, Set<C>> = new Map();
  // Used to perform keyOf lookups in O(1) time, which are
  // necessary for restore calls.
  protected readonly keyByValue: WeakMap<C, K> = new WeakMap();

  // TODO: FWW option?  (Like in MutCRegister.)
  // Generic map?  (Then move conflicts etc. to the subclass)
  constructor(
    setCallback: (
      setValueConstructor: (key: K, args: SetArgs) => C,
      setArgsSerializer: ElementSerializer<[K, SetArgs]>
    ) => S,
    valueConstructor: (key: K, ...args: SetArgs) => C,
    protected readonly keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();

    this.valueSet = this.addChild(
      "",
      setCallback((key, args) => {
        const value = valueConstructor(key, ...args);
        // Cache
        let usableSet = this.usableValues.get(key);
        if (usableSet === undefined) {
          usableSet = new Set();
          this.usableValues.set(key, usableSet);
        }
        usableSet.add(value);
        this.keyByValue.set(value, key);
        return value;
      }, new PairSerializer(keySerializer, argsSerializer))
    );
    this.valueSetSerializer = this.valueSet.valueSerializer();
    this.map = this.addChild(
      "0",
      new LwwCMap(keySerializer, this.valueSetSerializer)
    );

    this.valueSet.on("Delete", (event) => {
      // Remove from the cache
      const key = this.keyOf(event.value)!;
      const usableSet = this.usableValues.get(key)!;
      usableSet.delete(event.value);
      if (usableSet.size === 0) this.usableValues.delete(key);
    });

    // Events
    this.map.on("Set", (event) => this.emit("Set", event));
    this.map.on("Delete", (event) => this.emit("Delete", event));
  }

  set(key: K, ...args: SetArgs): C {
    // Delete all old usable values, so they don't become tombstones.
    const usableSet = this.usableValues.get(key);
    if (usableSet !== undefined) {
      for (const value of usableSet) {
        this.valueSet.delete(value);
      }
    }
    // Set the new value
    const value = this.valueSet.add(key, args);
    this.map.set(key, value);
    return value;
  }

  delete(key: K): void {
    this.map.delete(key);
    // Delete all usable values, so they don't become tombstones.
    const usableSet = this.usableValues.get(key);
    if (usableSet !== undefined) {
      for (const value of usableSet) {
        this.valueSet.delete(value);
      }
    }
  }

  get(key: K): C | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  get size(): number {
    return this.map.size;
  }

  entries(): IterableIterator<[K, C]> {
    return this.map.entries();
  }

  clear() {
    // This may someday be more efficient than deleting
    // every key.
    this.map.clear();
    this.valueSet.clear();
  }

  keyOf(searchElement: C): K | undefined {
    return this.keyByValue.get(searchElement);
  }

  /**
   * Returns whether the given value is owned by
   * this map and still usable, i.e.,
   * it can still accept Crdt operations.
   * Values are made unusable once they are overwritten
   * by a causally later call to set or delete (but not
   * restoreValue).
   *
   * isUsable is always true for return values of
   * get() and getConflicts().  It is true for value
   * not in getConflicts() only if value has been
   * overwritten by restoreValue but not by set or delete.
   */
  isUsable(value: C): boolean {
    return this.valueSet.has(value);
  }

  /**
   * Set the value at key to a previous value for key that isUsable
   * (e.g., an element of getConflicts(key)).
   *
   * A typical use case is if multiple users set the
   * value concurrently and each do some work on their
   * value, causing a conflict, they can inspect the conflicts
   * (using getConflicts(key)) and choose one to appear as
   * the main value.  In case multiple users do so
   * concurrently, one of their choices will be chosen
   * using the usual conflict resolution rule (LWW or FWW)
   * for this map.
   *
   * Unlike set(key), this method does not delete (make unusable)
   * other existing elements; instead, they will be still
   * be usable as standalone CRDTs, and they can be
   * passed to a future or concurrent call to setExisting.
   * That is so that if two users concurrently call
   * setExisting on different conflicting values for the
   * same key, the
   * winning value will still be usable as a Crdt.
   * Existing values will instead be deleted on the next
   * call to set(key) or delete(key).
   *
   * @param key    [description]
   * @param  value [description]
   * @return       [description]
   * @throws if value is not owned by this map, it was
   * not a previous value at key, or
   * it is unusable, due to a causally
   * greater call to set(key) or delete(key) (but not restoreValue for the same key).
   */
  restoreValue(value: C) {
    if (!this.isUsable(value)) {
      throw new Error("value is not usable");
    }
    this.map.set(this.keyOf(value)!, value);
  }

  saveComposite(): Uint8Array {
    // Need to save keysByValue, which we can use to
    // load itself and usableValues.

    // TODO: optimize to avoid repeating keys?
    // Shouldn't really be a problem because most keys
    // won't be repeated, at least when there are no
    // tombstones.  If so, make keySerializer not an
    // instance variable.
    const keys = new Array<Uint8Array>(this.valueSet.size);
    const ids = new Array<Uint8Array>(this.valueSet.size);
    let i = 0;
    for (const value of this.valueSet) {
      keys[i] = this.keySerializer.serialize(this.keyOf(value)!);
      ids[i] = this.valueSetSerializer.serialize(value);
      i++;
    }
    const message = MutCMapFromSetSave.create({ keys, ids });
    return MutCMapFromSetSave.encode(message).finish();
  }

  saveData?: Uint8Array;
  loadComposite(saveData: Uint8Array): void {
    // Need to wait until postLoad so we can call
    // this.valueSet.getById
    this.saveData = saveData;
  }

  postLoad() {
    // TODO: this shouldn't be needed because loading the
    // set will call valueConstructor, which will set up
    // the caches.
    const decoded = MutCMapFromSetSave.decode(this.saveData!);
    delete this.saveData;
    for (let i = 0; i < decoded.ids.length; i++) {
      const key = this.keySerializer.deserialize(decoded.keys[i], this.runtime);
      const value = this.valueSetSerializer.deserialize(
        decoded.ids[i],
        this.runtime
      );
      this.keyByValue.set(value, key);
      let usableSet = this.usableValues.get(key);
      if (usableSet === undefined) {
        usableSet = new Set();
        this.usableValues.set(key, usableSet);
      }
      usableSet.add(value);
    }
  }
}
