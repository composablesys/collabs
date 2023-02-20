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
 * A collaborative map with mutable values.
 *
 * If multiple values are set concurrently, one is chosen and others
 * are overwritten. To instead "merge" concurrently-set values, use
 * [[CLazyMap]].
 *
 * For immutable values, consider [[CValueMap]], which is simpler.
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

    this.map.on("Set", (e) => {
      // The previous value is guaranteed to be not-yet-deleted,
      // since set calls map.set before valueSet.delete.
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
      // The previous value is guaranteed to be not-yet-deleted,
      // since delete calls map.delete before valueSet.delete.
      const value = this.valueSet.fromID(e.value)!;
      this.emit("Delete", {
        key: e.key,
        value,
        meta: e.meta,
      });
    });
  }

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

  get size(): number {
    return this.map.size;
  }
}
