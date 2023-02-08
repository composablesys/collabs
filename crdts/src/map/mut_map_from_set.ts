import {
  AbstractCMapCObject,
  Collab,
  CollabID,
  CollabIDSerializer,
  DefaultSerializer,
  IMap,
  InitToken,
  ISet,
  Optional,
  PairSerializer,
  Serializer,
} from "@collabs/core";

export interface ConflictsCMap<K, V> extends IMap<K, V> {
  /**
   * Return the causally maximal concurrent values set
   * for key.
   */
  getConflicts(key: K): V[];
}

/**
 * The set is used as a source of Collabs for values.
 * Its `add` method must always return the new value
 * (not undefined).
 */
export class MutCMapFromSet<
  K,
  C extends Collab,
  SetArgs extends unknown[],
  SetT extends ISet<C, [K, SetArgs]>,
  MapT extends ConflictsCMap<K, CollabID<C>>
> extends AbstractCMapCObject<K, C, SetArgs> {
  protected readonly valueSet: SetT;
  protected readonly map: MapT;

  private justDeletedValues: C[] = [];

  constructor(
    init: InitToken,
    setCallback: (
      setInit: InitToken,
      setValueConstructor: (
        setValueInit: InitToken,
        key: K,
        args: SetArgs
      ) => C,
      setArgsSerializer: Serializer<[K, SetArgs]>
    ) => SetT,
    mapCallback: (
      mapInit: InitToken,
      mapKeySerializer: Serializer<K>,
      mapValueSerializer: Serializer<CollabID<C>>
    ) => MapT,
    valueConstructor: (valueInit: InitToken, key: K, ...args: SetArgs) => C,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(),
    argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance()
  ) {
    super(init);

    this.valueSet = this.addChild("", (setInit) =>
      setCallback(
        setInit,
        (valueInit, key, args) => {
          return valueConstructor(valueInit, key, ...args);
        },
        new PairSerializer(keySerializer, argsSerializer)
      )
    );
    // We use a map of CollabIDs instead of Collabs since concurrent delete
    // ops could result in attempting to deserialize a Collab that is
    // already deleted. However, by the design of our ops,
    // we know that outside of delete operations, IDs present in the map
    // correspond to Collabs that still exist in valueSet.
    // Hence it is safe to call ID.get() in our get, etc. methods.
    this.map = this.addChild("0", (mapInit) =>
      mapCallback(mapInit, keySerializer, new CollabIDSerializer(this.valueSet))
    );

    // Events.
    // Each of our ops does valueSet ops first, then map ops. So we emit
    // events during the map event handlers, when our op is complete.
    // A tricky issue is that we need to emit the previousValue for map
    // ops, but that might be a deleted Collab - e.g., when this.set is a
    // CSet. Then CollabID.get() won't work. Instead we
    // hold over the values from the this.set Delete events.
    this.valueSet.on("Delete", (e) => this.justDeletedValues.push(e.value));
    this.map.on("Set", (event) => {
      if (event.previousValue.isPresent) {
        const previousID = event.previousValue.get();
        this.emit("Set", {
          key: event.key,
          value: event.value.get()!,
          previousValue: Optional.of(this.getJustDeletedValue(previousID)),
          meta: event.meta,
        });
      } else {
        this.emit("Set", {
          key: event.key,
          value: event.value.get()!,
          previousValue: Optional.empty<C>(),
          meta: event.meta,
        });
      }
    });
    this.map.on("Delete", (event) => {
      this.emit("Delete", {
        key: event.key,
        value: this.getJustDeletedValue(event.value),
        meta: event.meta,
      });
    });
  }

  /**
   * @return The element of this.justDeletedValues with the given ID.
   * Also clears this.justDeletedValues.
   */
  private getJustDeletedValue(id: CollabID<C>): C {
    for (const justDeletedValue of this.justDeletedValues) {
      if (id.equals(CollabID.of(justDeletedValue, this.valueSet))) {
        this.justDeletedValues = [];
        return justDeletedValue;
      }
    }
    throw new Error("Internal error: justDeletedValue not found");
  }

  set(key: K, ...args: SetArgs): C {
    // Delete all existing values, so they don't become tombstones.
    this.deleteConflicts(key);
    // Set the new value.
    const value = this.valueSet.add(key, args)!;
    this.map.set(key, CollabID.of(value, this.valueSet));
    return value;
  }

  delete(key: K): void {
    // Delete all existing values, so they don't become tombstones.
    this.deleteConflicts(key);
    // Delete in map.
    this.map.delete(key);
  }

  private deleteConflicts(key: K): void {
    for (const valueID of this.map.getConflicts(key)) {
      this.valueSet.delete(valueID.get()!);
    }
  }

  get(key: K): C | undefined {
    return this.map.get(key)?.get();
  }

  getConflicts(key: K): C[] {
    return this.map.getConflicts(key).map((valueID) => valueID.get()!);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  get size(): number {
    return this.map.size;
  }

  *entries(): IterableIterator<[K, C]> {
    for (const [key, valueID] of this.map.entries()) {
      yield [key, valueID.get()!];
    }
  }

  clear() {
    // This may someday be more efficient than deleting
    // every key.
    this.map.clear();
    this.valueSet.clear();
  }
}
