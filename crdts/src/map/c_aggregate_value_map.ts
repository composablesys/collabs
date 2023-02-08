import {
  AbstractMap_CObject,
  DefaultSerializer,
  IMap,
  InitToken,
  Serializer,
} from "@collabs/core";
import { MultiValueMap, MultiValueMapItem } from ".";

export class CAggregateMap<K, V>
  extends AbstractMap_CObject<K, V>
  implements IMap<K, V>
{
  private readonly mvMap: MultiValueMap<K, V>;

  /**
   * aggregate isn't called on [], that's just not present.
   *
   * aggregate: values given in order by sender (eventually consistent).
   */
  constructor(
    init: InitToken,
    private readonly aggregate: (items: MultiValueMapItem<V>[]) => V,
    wallClockTime = false,
    keySerializer: Serializer<K> = DefaultSerializer.getInstance(),
    valueSerializer: Serializer<V> = DefaultSerializer.getInstance()
  ) {
    super(init);

    this.mvMap = super.addChild(
      "",
      (init) =>
        new MultiValueMap(init, wallClockTime, keySerializer, valueSerializer)
    );

    this.mvMap.on("Delete", (e) => {
      this.emit("Delete", {
        key: e.key,
        value: this.aggregate(e.value),
        meta: e.meta,
      });
    });
    this.mvMap.on("Set", (e) => {
      this.emit("Set", {
        key: e.key,
        value: this.aggregate(e.value),
        previousValue: e.previousValue.map((multiValue) =>
          this.aggregate(multiValue)
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
    else return this.aggregate(multiValue);
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
      yield [key, this.aggregate(multiValue)];
    }
  }
}
