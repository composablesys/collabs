import { DefaultElementSerializer, ElementSerializer } from "../../util";
import { Crdt } from "../core";
import { Resettable } from "../helper_crdts";
import { DeletingMutCRegister } from "../register";
import { RegisterMutCMap } from "./register_mut_map";

// TODO: note that ValueInit events are emitted for all
// values, even ones that never show up locally due to
// a winning concurrent write to their key.
export class DeletingMutCMap<K, C extends Crdt, SetArgs extends any[]>
  extends RegisterMutCMap<K, C, SetArgs>
  implements Resettable
{
  constructor(
    valueConstructor: (key: K, ...args: SetArgs) => C,
    writerWinsRule: "first" | "last" = "last",
    keySerializer: ElementSerializer<K> = DefaultElementSerializer.getInstance(),
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(
      (key) =>
        new DeletingMutCRegister(
          (...args: SetArgs) => valueConstructor(key, ...args),
          writerWinsRule,
          argsSerializer
        ),
      keySerializer
    );
  }

  // Override just to change the docs
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
   * overwritten by restore but not by set or delete.
   */
  isUsable(value: C): boolean {
    return super.isUsable(value);
  }

  delete(key: K): void {
    // Note this resets the value, which is okay because it
    // is DeletingMutCRegister, which is Resettable.
    this.internalMap.delete(key);
  }

  clear() {
    // This may someday be more efficient than deleting
    // every key.
    this.internalMap.clear();
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
   * greater call to set(key) or delete(key) (but not setExisting).
   */
  restore(value: C) {
    super.restore(value);
  }

  reset() {
    // This should be equivalent to clear, but just in case...
    this.internalMap.reset();
  }
}
