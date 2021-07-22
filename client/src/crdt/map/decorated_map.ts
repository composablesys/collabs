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
  protected readonly map: InnerMap;

  constructor(map: InnerMap) {
    super();
    this.map = this.addChild("", map);

    this.map.on("Set", (event) => this.emit("Set", event));
    this.map.on("Delete", (event) => this.emit("Delete", event));
    this.map.on("ValueInit", (event) => this.emit("ValueInit", event));
  }

  set(key: K, ...args: SetArgs): V {
    return this.map.set(key, ...args);
  }

  delete(key: K): void {
    this.map.delete(key);
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  clear(): void {
    this.map.clear();
  }

  get size(): number {
    return this.map.size;
  }

  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any
  ): void {
    this.map.forEach((value, key) => callbackfn(value, key, this), thisArg);
  }

  entries(): IterableIterator<[K, V]> {
    return this.map.entries();
  }

  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  values(): IterableIterator<V> {
    return this.map.values();
  }

  keyOf(searchElement: V): K | undefined {
    return this.map.keyOf(searchElement);
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.map[Symbol.iterator]();
  }
}
