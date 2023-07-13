import {
  AbstractMap_CObject,
  IMap,
  InitToken,
  Serializer,
} from "@collabs/core";
import { Aggregator, CMultiValueMap } from "./c_multi_value_map";

/**
 * Default aggregator: return the first item (first replicaID wins).
 */
const defaultAggregator: Aggregator<unknown> = {
  aggregate(items) {
    return items[0].value;
  },
} as const;

/**
 * A collaborative map with keys of type K and values of type V.
 *
 * The API is compatible* with `Map<K, V>` and can be used as a
 * drop-in collaborative replacement when V is internally immutable. If multiple users
 * set the value at a key concurrently, one of them is picked
 * arbitrarily.
 *
 * Values must be internally immutable;
 * mutating a value internally will not change it on
 * other replicas. If you need to mutate values internally,
 * instead use a [[CMap]] or [[CLazyMap]].
 *
 * (*) Except for the return value of [[set]], which is the set value instead
 * of `this`.
 *
 * @typeParam K The key type.
 * @typeParam V The value type.
 */
export class CValueMap<K, V>
  extends AbstractMap_CObject<K, V>
  implements IMap<K, V>
{
  private readonly mvMap: CMultiValueMap<K, V>;
  private readonly aggregator: Aggregator<V>;

  /**
   * Constructs a CValueMap.
   *
   * @param options.keySerializer Serializer for keys. Defaults to [[DefaultSerializer]].
   * @param options.valueSerializer Serializer for values. Defaults to [[DefaultSerializer]].
   * @param options.aggregator If provided, used
   * to aggregate concurrently-set values at the same key,
   * instead of picking one arbitrarily.
   */
  constructor(
    init: InitToken,
    options: {
      keySerializer?: Serializer<K>;
      valueSerializer?: Serializer<V>;
      aggregator?: Aggregator<V>;
    } = {}
  ) {
    super(init);

    this.aggregator =
      options.aggregator ?? (defaultAggregator as Aggregator<V>);

    this.mvMap = super.registerCollab(
      "",
      (init) => new CMultiValueMap(init, options)
    );

    this.mvMap.on("Delete", (e) => {
      this.emit("Delete", {
        key: e.key,
        value: this.aggregator.aggregate(e.value),
        meta: e.meta,
      });
    });
    this.mvMap.on("Set", (e) => {
      this.emit("Set", {
        key: e.key,
        value: this.aggregator.aggregate(e.value),
        previousValue: e.previousValue.map((multiValue) =>
          this.aggregator.aggregate(multiValue)
        ),
        meta: e.meta,
      });
    });
  }

  /**
   * Sets the value at key.
   *
   * @return `value`
   */
  set(key: K, value: V): V {
    this.mvMap.set(key, value);
    // Return this.get instead of just value, in case the aggregator does
    // something weird.
    // Use ! instead of nonNull because V might allow null.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.get(key)!;
  }

  /**
   * Deletes the given key, making it no longer present in this map.
   *
   * @returns `true` if key was present and has been removed.
   */
  delete(key: K): boolean {
    const existed = this.has(key);
    this.mvMap.delete(key);
    return existed;
  }

  get(key: K): V | undefined {
    const multiValue = this.mvMap.get(key);
    if (multiValue === undefined) return undefined;
    else return this.aggregator.aggregate(multiValue);
  }

  /**
   * Returns all conflicting concurrently-set values
   * at key.
   * Their order is arbitrary but consistent across replicas.
   *
   * If the key is not present, this returns `[]`.
   * Otherwise, its first element is the set value.
   */
  getConflicts(key: K): V[] {
    return (this.mvMap.get(key) ?? []).map((item) => item.value);
  }

  has(key: K): boolean {
    return this.mvMap.has(key);
  }

  get size(): number {
    return this.mvMap.size;
  }

  *entries(): IterableIterator<[K, V]> {
    for (const [key, multiValue] of this.mvMap) {
      yield [key, this.aggregator.aggregate(multiValue)];
    }
  }
}
