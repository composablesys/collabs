import { CompositeCrdt } from "../core";
import { CMap, CMapEventsRecord } from "./interfaces";

export class DecoratedCMap<
    K,
    V,
    SetArgs extends any[],
    InnerMap extends CMap<K, V, SetArgs>,
    Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
  >
  extends CompositeCrdt<Events>
  implements CMap<K, V, SetArgs, Events>
{
  protected readonly internalMap: InnerMap;

  constructor(map: InnerMap) {
    super();
    this.internalMap = this.addChild("", map);

    this.internalMap.on("Set", (event) => this.emit("Set", event));
    this.internalMap.on("Delete", (event) => this.emit("Delete", event));
    this.internalMap.on("ValueInit", (event) => this.emit("ValueInit", event));
  }

  set(key: K, ...args: SetArgs): V {
    return this.internalMap.set(key, ...args);
  }

  delete(key: K): void {
    this.internalMap.delete(key);
  }

  get(key: K): V | undefined {
    return this.internalMap.get(key);
  }

  has(key: K): boolean {
    return this.internalMap.has(key);
  }

  clear(): void {
    this.internalMap.clear();
  }

  get size(): number {
    return this.internalMap.size;
  }

  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any
  ): void {
    this.internalMap.forEach(
      (value, key) => callbackfn(value, key, this),
      thisArg
    );
  }

  entries(): IterableIterator<[K, V]> {
    return this.internalMap.entries();
  }

  keys(): IterableIterator<K> {
    return this.internalMap.keys();
  }

  values(): IterableIterator<V> {
    return this.internalMap.values();
  }

  keyOf(searchElement: V): K | undefined {
    return this.internalMap.keyOf(searchElement);
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.internalMap[Symbol.iterator]();
  }
}
