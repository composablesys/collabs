import {
  AbstractMap_CObject,
  IMap,
  InitToken,
  Serializer,
} from "@collabs/core";
import { Aggregator, CMultiValueMap } from "./c_multi_value_map";

/**
 * Default aggregator: return the first item (first replicaID wins)l
 */
const defaultAggregator: Aggregator<unknown> = {
  aggregate(items) {
    return items[0].value;
  },
} as const;

export class CValueMap<K, V>
  extends AbstractMap_CObject<K, V>
  implements IMap<K, V>
{
  private readonly mvMap: CMultiValueMap<K, V>;
  private readonly aggregator: Aggregator<V>;

  /**
   * aggregate isn't called on [], that's just not present.
   *
   * aggregate: values given in order by sender (eventually consistent).
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

    this.mvMap = super.addChild(
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

  set(key: K, value: V): V {
    this.mvMap.set(key, value);
    return this.get(key)!;
  }

  delete(key: K): void {
    this.mvMap.delete(key);
  }

  get(key: K): V | undefined {
    const multiValue = this.mvMap.get(key);
    if (multiValue === undefined) return undefined;
    else return this.aggregator.aggregate(multiValue);
  }

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
