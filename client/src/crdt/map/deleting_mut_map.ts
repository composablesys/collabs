import {
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
} from "../../util";
import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { AggregateCRegisterMeta, MutCRegister } from "../register";
import { AbstractCMapCompositeCrdt } from "./abstract_map";
import { RegisterCMap } from "./register_map";

// TODO: note that ValueInit events are emitted for all
// values, even ones that never show up locally due to
// a winning concurrent write to their key.
export class DeletingMutCMap<K, C extends Crdt, SetArgs extends any[]>
  extends AbstractCMapCompositeCrdt<K, C, SetArgs>
  implements Resettable 
{
  // Note that value given to us by internalMap are always
  // present (non-empty Optionals): RegisterCMap only
  // ever returns non-undefined values from registers
  // that are not in their reset state, and such
  // MutCRegisters' values are always present.
  private internalMap: RegisterCMap<
    K,
    Optional<C>,
    SetArgs,
    MutCRegister<C, SetArgs>
  >;

  constructor(
    valueConstructor: (key: K, ...args: SetArgs) => C,
    writerWinsRule: "first" | "last" = "last",
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.internalMap = this.addChild(
      "",
      new RegisterCMap(
        (key) =>
          new MutCRegister(
            (...args: SetArgs) => valueConstructor(key, ...args),
            writerWinsRule,
            argsSerializer
          ),
        keySerializer
      )
    );

    // Events
    this.internalMap.internalMap.on("ValueInit", (event) => {
      // Register listeners on event.value, which is a new
      // MutCRegister.
      event.value.on("ValueInit", (event2) => {
        this.emit("ValueInit", { key: event.value, value: event2.value });
      });
    });
    this.internalMap.on("Set", (event) => this.emit("Set", event));
    this.internalMap.on("Delete", (event) => this.emit("Delete", event));
    // TODO: Select
  }

  set(key: K, ...args: SetArgs): C {
    return this.internalMap.set(key, ...args).get();
  }

  delete(key: K): void {
    this.internalMap.delete(key);
  }

  get(key: K): C | undefined {
    return this.internalMap.get(key)?.get();
  }

  /**
   * Return the current conflicting values at key, i.e., the
   * non-overwritten values.  This may have
   * more than one element due to concurrent writes.
   * If key is not present, returns undefined.
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  getConflicts(key: K): C[] | undefined {
    const valueCrdt = this.internalMap.internalMap.getIfPresent(key);
    return valueCrdt === undefined ? undefined : valueCrdt.conflicts();
  }

  /**
   * Return the current conflicting values with metadata.
   * If key is not present, returns undefined.
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  getConflictsMeta(key: K): AggregateCRegisterMeta<C>[] | undefined {
    const valueCrdt = this.internalMap.internalMap.getIfPresent(key);
    return valueCrdt === undefined ? undefined : valueCrdt.conflictsMeta();
  }

  owns(value: C): boolean {
    // TODO: this is abstraction-busting, brittle;
    // also needs testing.
    try {
      return value.parent.parent.parent.parent.parent === this;
    } catch (e) {
      // Assume this happened because we hit the root
      // while traversing parents
      return false;
    }
  }

  has(key: K): boolean {
    return this.internalMap.has(key);
  }

  /**
   * Returns whether value is currently set as the value
   * of some key.
   * @param  value [description]
   * @return       [description]
   */
  hasValue(value: C): boolean {
    const key = this.keyOf(value);
    if (key === undefined) return false;
    return this.get(key) === value;
  }

  /**
   * Returns whether the given value is owned by
   * this map and still usable, i.e.,
   * it can still accept Crdt operations.
   * Values are made unusable once they are overwritten
   * by a causally later call to set or delete (but not
   * setExisting).
   *
   * isUsable is always true for return values of
   * get() and getConflicts().  It is true for value
   * not in getConflicts() only if value has been
   * overwritten by setExisting but not by set or delete.
   */
  isUsable(value: C): boolean {
    const key = this.keyOf(value);
    if (key === undefined) return false;
    const register = this.internalMap.internalMap.getIfPresent(key);
    // If register is not present, then all of its values
    // are deleted, hence not usable
    if (register === undefined) return false;
    return register.isUsable(value);
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
   * it has been deleted (made unusable), due to a causally
   * greater call to set(key) or delete(key) (but not setExisting).
   */
  setExisting(key: K, value: C) {
    const register = this.internalMap.internalMap.getIfPresent(key);
    // If register is not present, then all of its values
    // are deleted, hence not usable
    if (register === undefined) {
      throw new Error("value is not usable");
    }
    register.setExisting(value);
  }

  get size(): number {
    return this.internalMap.size;
  }

  *entries(): IterableIterator<[K, C]> {
    for (const [key, value] of this.internalMap) {
      yield [key, value.get()];
    }
  }

  clear() {
    // This may someday be more efficient than deleting
    // every key.
    this.internalMap.clear();
  }

  reset() {
    // This should be equivalent to clear, but just in case...
    this.internalMap.reset();
  }

  /**
   * TODO: note this returns the key even if the searchElement
   * is currently not set.  Make clear this is okay in
   * CMap.  It only returns undefined if
   * !this.owns(searchElement).
   */
  keyOf(searchElement: C): K | undefined {
    if (!this.owns(searchElement)) return undefined;
    // TODO: this is abstraction-busting, brittle;
    // also needs testing.
    return this.internalMap.internalMap.keyOf(
      searchElement.parent.parent as MutCRegister<C, SetArgs>
    );
  }

  // TODO: selection stuff (defer to MutRegister)
}
