import {
  AbstractCMapCObject,
  Collab,
  CollabID,
  CollabIDSerializer,
  DefaultSerializer,
  InitToken,
  Optional,
  PairSerializer,
  Serializer,
} from "@collabs/core";
import { AddWinsCSet, DeletingMutCSet } from "../set";
import { LWWCMap } from "./c_value_map";

/**
 * Collab-valued [[IMap]] where deletions only "archive"
 * values.
 *
 * Archived values can continue being used on their own
 * and later be restored in the map, unlike in
 * [[DeletingMutCMap]]. Note that this comes at the
 * cost of increased memory usage: since deleted values
 * stick around forever, they consume memory forever.
 */
export class ArchivingMutCMap<
  K,
  C extends Collab,
  SetArgs extends unknown[]
> extends AbstractCMapCObject<K, C, SetArgs> {
  private readonly valueSet: DeletingMutCSet<C, [K, SetArgs]>;
  private readonly map: LWWCMap<K, CollabID<C>>;
  private readonly keySet: AddWinsCSet<K>;
  // Used to perform keyOf lookups in O(1) time, which are
  // necessary for restoreValue calls.
  private readonly keyByValue: WeakMap<C, K> = new WeakMap();

  constructor(
    init: InitToken,
    valueConstructor: (valueInit: InitToken, key: K, ...args: SetArgs) => C,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(),
    argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance()
  ) {
    super(init);

    this.valueSet = this.addChild(
      "",
      (setInit) =>
        new DeletingMutCSet(
          setInit,
          (valueInit, key, args) => {
            const value = valueConstructor(valueInit, key, ...args);
            // Cache
            this.keyByValue.set(value, key);
            return value;
          },
          undefined,
          new PairSerializer(keySerializer, argsSerializer)
        )
    );
    this.map = this.addChild(
      "0",
      (mapInit) =>
        new LWWCMap(
          mapInit,
          keySerializer,
          new CollabIDSerializer<C>(this.valueSet)
        )
    );
    this.keySet = this.addChild(
      "1",
      (keySetInit) => new AddWinsCSet(keySetInit, keySerializer)
    );

    // Events

    // Set events should be dispatched whenever the value
    // at a key changes and the key is present at the end
    // of the operation.  The ways this can happen are:
    // 1. when a value is originally created by Set and it
    // becomes the set value (under LWW rules), but only
    // if key is present
    // 2. when a value is restored and becomes the set value,
    // but only if key is present
    // 3. when a key is restored.
    // Listening on these is tricky because
    // some operations affect both keySet and map (e.g.,
    // this.set).  For now, we accept that some ops
    // will show up as two events, a Set for an old value
    // (due to keySet.add) followed by a Set for the
    // actual value, such that the two events together
    // end up in the proper state and have reasonable
    // previousValues (accounting for each other).
    this.map.on("Set", (event) => {
      if (this.has(event.key)) {
        // Note in case 1, this will properly have
        // previousValue = Optional.empty().
        // It will be wrong for the bulk op in case 2 if the key
        // wasn't present (it will report the previous this.map
        // value, but the user-facing value was not present.)
        // However, that is okay because in that case,
        // we will first emit a Set event from "not present"
        // to event.previousValue, during the Add handler.
        const previousValue = event.previousValue.isPresent
          ? Optional.of(event.previousValue.get().get()!)
          : Optional.empty<C>();
        this.emit("Set", {
          key: event.key,
          value: event.value.get()!,
          previousValue,
          meta: event.meta,
        });
      }
    });
    // Listen on case 3 without being redundant, and also
    // help out in case 2 when the key wasn't present
    // (emitting the first half of the event, from
    // "not present" to the value pre-restore).
    this.keySet.on("Add", (event) => {
      const key = event.value;
      // In case 1, we'll get this event before this.map
      // has a value, in which case we are in a nonsense
      // transient state (key present but no value).
      // So we don't want to dispatch an event then,
      // instead waiting for the Set event.
      if (this.map.has(key)) {
        this.emit("Set", {
          key,
          value: this.map.get(key)!.get()!,
          previousValue: Optional.empty<C>(),
          meta: event.meta,
        });
      }
    });
    // Delete events should be dispatched only when a key
    // is deleted from keySet, since that is the only
    // way to make a key not present in the map.
    // Since keySet only dispatches non-redundant deletes,
    // we are guaranteed that the key used to be present,
    // hence it has an entry in this.map: such an entry
    // is created whenever a key is added the first time,
    // and this.map entries are never deleted.
    this.keySet.on("Delete", (event) => {
      this.emit("Delete", {
        key: event.value,
        value: this.map.get(event.value)!.get()!,
        meta: event.meta,
      });
    });
  }

  set(key: K, ...args: SetArgs): C {
    const value = this.valueSet.add(key, args);
    this.keySet.add(key);
    this.map.set(key, CollabID.of(value, this.valueSet));
    return value;
  }

  delete(key: K): void {
    this.keySet.delete(key);
  }

  get(key: K): C | undefined {
    if (this.has(key)) return this.map.get(key)!.get()!;
    else return undefined;
  }

  getConflicts(key: K): C[] {
    return this.map.getConflicts(key).map((value) => value.get()!);
  }

  has(key: K): boolean {
    return this.keySet.has(key);
  }

  get size(): number {
    return this.keySet.size;
  }

  *entries(): IterableIterator<[K, C]> {
    for (const key of this.keySet) {
      // Since we never delete from this.map, and
      // this.keySet only adds if there is a value
      // already/nearly present, we can be sure that if
      // key is present, then this.map.get(key) exists.
      yield [key, this.map.get(key)!.get()!];
    }
  }

  clear() {
    // This may someday be more efficient than deleting
    // every key.
    this.keySet.clear();
  }

  /**
   * Returns the unique key associated to a value owned
   * by this map, regardless of whether it is present. If
   * the value is not owned by this map, returns undefined.
   *
   * @param searchElement The value to locate in this map.
   */
  keyOf(searchElement: C): K | undefined {
    return this.keyByValue.get(searchElement);
  }

  /**
   * Restore the given value to be its key's value.
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
   * @param  value [description]
   * @return       [description]
   * @throws if value does not belong to this map
   */
  restoreValue(value: C) {
    const key = this.keyOf(value);
    if (key === undefined) {
      throw new Error("value does not belong to this map");
    }
    this.keySet.add(key);
    this.map.set(key, CollabID.of(value, this.valueSet));
  }

  /**
   * key must have previously had a value (else throws)
   * @param  key [description]
   * @return     [description]
   */
  restoreKey(key: K) {
    if (!this.map.has(key)) {
      throw new Error(
        "key did not previously have a value, nothing to restore"
      );
    }
    this.keySet.add(key);
  }

  // No need to save/load keyByValue, since it will
  // automatically be filled in during valueConstructor
  // calls.
}
