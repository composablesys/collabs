import {
  AbstractMap_CObject,
  Collab,
  CollabID,
  CollabIDSerializer,
  DefaultSerializer,
  InitToken,
  PairSerializer,
  Serializer,
} from "@collabs/core";
import { CSet } from "../set";
import { Aggregator } from "./c_multi_value_map";
import { CValueMap } from "./c_value_map";

/**
 * A collaborative map with keys of type K and *mutable*
 * values of type C.
 *
 * Values are internally mutable.
 * Specifically, each value is its own [[Collab]], and
 * operations on that Collab are collaborative as usual.
 *
 * Unlike a normal `Map<K, C>`, you do not set values directly.
 * Instead, you use the pattern described in
 * [dynamically-created Collabs](../../../guide/initialization.html#dynamically-created-collabs):
 * one user calls [[set]] with `SetArgs`; each
 * replica passes those `SetArgs` to its
 * `valueConstructor`;
 * and `valueConstructor` returns the local copy of the new value Collab.
 *
 * If multiple users
 * set the value at a key concurrently, one of the value Collabs is picked
 * arbitrarily; operations on the others are ignored.
 * To instead "merge" concurrently-created values - applying all of their
 * operations to the same underlying Collab - use
 * [[CLazyMap]].
 *
 * See also: [[CValueMap]], a simpler map for immutable values.
 *
 * @typeParam K The key type.
 * @typeParam C The value type, which is a Collab.
 * @typeParam SetArgs The type of arguments to [[set]].
 */
export class CMap<
  K,
  C extends Collab,
  SetArgs extends unknown[]
> extends AbstractMap_CObject<K, C, SetArgs> {
  // Invariant: valueSet and map's values (including conflicts) are always identical.
  // We maintain this property in add() and delete(), and we rely on
  // whenever we call valueSet.idOf.

  private readonly valueSet: CSet<C, [key: K, args: SetArgs]>;
  private readonly map: CValueMap<K, CollabID<C>>;

  /**
   * Constructs a CMap with the given `valueConstructor`.
   *
   * @param valueConstructor Callback used to construct a
   * value Collab with the given [[InitToken]], key, and arguments to [[set]]. See [dynamically-created Collabs](../../../guide/initialization.html#dynamically-created-collabs)
   * for example usage.
   * @param options.keySerializer A serializer for keys.
   * Defaults to [[DefaultSerializer]].
   * @param options.argsSerializer A serializer for `SetArgs` as an array.
   * Defaults to [[DefaultSerializer]].
   * @param options.aggregator If provided, used
   * to aggregate concurrently-set values at the same key,
   * instead of picking one arbitrarily.
   */
  constructor(
    init: InitToken,
    valueConstructor: (valueInit: InitToken, key: K, ...args: SetArgs) => C,
    options: {
      keySerializer?: Serializer<K>;
      argsSerializer?: Serializer<SetArgs>;
      aggregator?: Aggregator<CollabID<C>>;
    } = {}
  ) {
    super(init);

    const keySerializer =
      options.keySerializer ?? DefaultSerializer.getInstance();
    const argsSerializer =
      options.argsSerializer ?? DefaultSerializer.getInstance();

    this.valueSet = super.registerCollab(
      "",
      (init) =>
        new CSet(
          init,
          (valueInit, key, args) => valueConstructor(valueInit, key, ...args),
          { argsSerializer: new PairSerializer(keySerializer, argsSerializer) }
        )
    );
    this.map = super.registerCollab(
      "0",
      (init) =>
        new CValueMap(init, {
          keySerializer,
          valueSerializer: CollabIDSerializer.getInstance(),
          aggregator: options.aggregator,
        })
    );

    // In this event handlers, calling this.valueSet.fromID
    // on just-added values is okay because the set's additions
    // always come before map sets. (On operations, this is by method
    // call order; during loading, this is because we register this.set
    // first, hence it is loaded first).
    // Calling this.valueSet.fromID on just-deleted values is okay
    // because CSet remembers just-deleted values until the end of
    // the transaction/load.
    this.map.on("Set", (e) => {
      const previousValue = e.previousValue.map(
        (id) => this.valueSet.fromID(id)!
      );
      this.emit("Set", {
        key: e.key,
        value: this.valueSet.fromID(e.value)!,
        previousValue,
        meta: e.meta,
      });
    });
    this.map.on("Delete", (e) => {
      const value = this.valueSet.fromID(e.value)!;
      this.emit("Delete", {
        key: e.key,
        value,
        meta: e.meta,
      });
    });
  }

  /**
   * Sets the value at key using args.
   *
   * The args are broadcast to all replicas in serialized form.
   * Every replica then passes them to `valueConstructor` to construct the actual
   * value of type C, a new Collab that is collaborative as usual.
   *
   * @returns The set value.
   */
  set(key: K, ...args: SetArgs): C {
    const oldConflicts = this.getConflicts(key);

    const newValue = this.valueSet.add(key, args);
    this.map.set(key, this.valueSet.idOf(newValue));

    // Delete old values, so they don't become tombstones.
    // These correspond precisely to the conflicts deleted by map.set,
    // so the invariant is maintained (valueSet and map's values remain in sync).
    oldConflicts.forEach((value) => this.valueSet.delete(value));

    return newValue;
  }

  delete(key: K): void {
    const oldConflicts = this.getConflicts(key);

    this.map.delete(key);

    // Delete old values, so they don't become tombstones.
    // These correspond precisely to the conflicts deleted by map.delete,
    // so the invariant is maintained (valueSet and map's values remain in sync).
    oldConflicts.forEach((value) => this.valueSet.delete(value));
  }

  get(key: K): C | undefined {
    const id = this.map.get(key);
    return id === undefined ? undefined : this.valueSet.fromID(id)!;
  }

  /**
   * Returns all conflicting concurrently-set values
   * at key.
   * Their order is arbitrary but consistent across replicas.
   *
   * If the key is not present, this returns `[]`.
   * Otherwise, its first element is the set value.
   */
  getConflicts(key: K): C[] {
    return this.map.getConflicts(key).map((id) => this.valueSet.fromID(id)!);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  *entries(): IterableIterator<[K, C]> {
    for (const [key, id] of this.map) {
      yield [key, this.valueSet.fromID(id)!];
    }
  }

  /**
   * Returns the unique key associated to a value
   * in this map, in O(1) time.
   *
   * This method will succeed if value is the current value
   * or a conflicting concurrently-set value (see [[getConflicts]]).
   * Otherwise, it returns undefined.
   *
   * @param searchElement The value to locate in this map.
   */
  keyOf(searchElement: C): K | undefined {
    if (!this.valueSet.has(searchElement)) return undefined;
    return this.valueSet.getArgs(searchElement)[0];
  }

  get size(): number {
    return this.map.size;
  }
}
