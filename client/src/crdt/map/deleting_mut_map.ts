import { DeletingMutCMapSave } from "../../../generated/proto_compiled";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  PairSerializer,
  stringAsArray,
} from "../../util";
import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { DeletingMutCSet, DeletingMutCSetValueSerializer } from "../set";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { LwwCMap } from "./lww_map";

// TODO: note that ValueInit events are emitted for all
// values, even ones that never show up locally due to
// a winning concurrent write to their key.
export class DeletingMutCMap<K, C extends Crdt, SetArgs extends any[]>
  extends AbstractCMapCompositeCrdt<K, C, SetArgs>
  implements Resettable
{
  private readonly crdtFactory: DeletingMutCSet<C, [K, SetArgs]>;
  private readonly map: LwwCMap<K, C>;
  // In case of restore calls, we can't trust that
  // map.getConflicts(key) returns all of the usable values
  // for key.  So to be able to delete all usable values when
  // set or delete is called, we need to store them here.
  // TODO: only use this if it's really needed (for values
  // not in conflicts), for efficiency?  Don't want to
  // pay for the storage cost if we never restore.
  private readonly usableValues: Map<K, Set<C>> = new Map();
  // Used to perform keyOf lookups in O(1) time, which are
  // necessary for restore calls.
  // TODO: when is this needed?  Can we choose not to pay
  // for this if we don't need it?
  private readonly keyByValue: WeakMap<C, K> = new WeakMap();

  // TODO: FWW option?  (Like in MutCRegister.)
  // Perhaps have LwwMap be a generic "WW" map with a
  // first/last option, to make this easy.
  constructor(
    valueConstructor: (key: K, ...args: SetArgs) => C,
    private readonly keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();

    this.crdtFactory = this.addChild(
      "",
      new DeletingMutCSet(
        (key, args) => {
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
        },
        undefined,
        new PairSerializer(keySerializer, argsSerializer)
      )
    );
    this.map = this.addChild(
      "0",
      new LwwCMap(
        keySerializer,
        new DeletingMutCSetValueSerializer(this.crdtFactory)
      )
    );

    // TODO: dispatch events
    this.crdtFactory.on("Delete", (event) => {
      // Remove from the cache
      // TODO: simplify if we can guarantee no redundant deletes
      const key = this.keyOf(event.value);
      if (key !== undefined) {
        const usableSet = this.usableValues.get(key);
        if (usableSet !== undefined) {
          usableSet.delete(event.value);
          if (usableSet.size === 0) this.usableValues.delete(key);
        }
      }
    });
  }

  set(key: K, ...args: SetArgs): C {
    // Delete all old usable values, so they don't become tombstones.
    const usableSet = this.usableValues.get(key);
    if (usableSet !== undefined) {
      for (const value of usableSet) {
        this.crdtFactory.delete(value);
      }
    }
    // Set the new value
    const value = this.crdtFactory.add(key, args);
    this.map.set(key, value);
    return value;
  }

  delete(key: K): void {
    this.map.delete(key);
    // Delete all usable values, so they don't become tombstones.
    const usableSet = this.usableValues.get(key);
    if (usableSet !== undefined) {
      for (const value of usableSet) {
        this.crdtFactory.delete(value);
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
    this.crdtFactory.clear();
  }

  reset() {
    // This should be equivalent to clear, but just in case...
    this.map.reset();
    this.crdtFactory.reset();
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
    return this.crdtFactory.has(value);
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
    // tombstones.
    const keys = new Array<Uint8Array>(this.crdtFactory.size);
    const ids = new Array<Uint8Array>(this.crdtFactory.size);
    let i = 0;
    for (const value of this.crdtFactory) {
      keys[i] = this.keySerializer.serialize(this.keyOf(value)!);
      ids[i] = stringAsArray(this.crdtFactory.idOf(value));
      i++;
    }
    const message = DeletingMutCMapSave.create({ keys, ids });
    return DeletingMutCMapSave.encode(message).finish();
  }

  saveData?: Uint8Array;
  loadComposite(saveData: Uint8Array): void {
    // Need to wait until postLoad so we can call
    // this.crdtFactory.getById
    this.saveData = saveData;
  }

  postLoad() {
    const decoded = DeletingMutCMapSave.decode(this.saveData!);
    delete this.saveData;
    for (let i = 0; i < decoded.ids.length; i++) {
      const key = this.keySerializer.deserialize(decoded.keys[i], this.runtime);
      const value = this.crdtFactory.getById(arrayAsString(decoded.ids[i]))!;
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
