import { Crdt, CompositeCrdt } from "../core";
import { CrdtMap, CrdtMapEventsRecord } from "./interfaces";

// Maps that decorate an existing map, copying its
// methods.  Override to modify methods.
// More flexible/reusable than subclassing the decorated maps.

export class DecoratedCrdtMap<K, C extends Crdt>
  extends CompositeCrdt<CrdtMapEventsRecord<K, C>>
  implements CrdtMap<K, C>
{
  protected readonly map: CrdtMap<K, C>;
  constructor(map: CrdtMap<K, C>) {
    super();
    this.map = this.addChild("0", map);
    // TODO: do this as a loop if TypeScript will allow it
    this.map.on("KeyAdd", (event) => this.emit("KeyAdd", event));
    this.map.on("KeyDelete", (event) => this.emit("KeyDelete", event));
    this.map.on("ValueInit", (event) => this.emit("ValueInit", event));
  }

  clear(): void {
    this.map.clear();
  }

  delete(key: K): boolean {
    return this.map.delete(key);
  }

  get(key: K): C | undefined {
    return this.map.get(key);
  }

  owns(valueCrdt: C): boolean {
    return this.map.owns(valueCrdt);
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  hasValue(valueCrdt: C): boolean {
    return this.map.hasValue(valueCrdt);
  }

  addKey(key: K): this {
    this.map.addKey(key);
    return this;
  }

  keyOf(valueCrdt: C): K {
    return this.map.keyOf(valueCrdt);
  }

  get size(): number {
    return this.map.size;
  }

  [Symbol.iterator](): IterableIterator<[K, C]> {
    return this.map[Symbol.iterator]();
  }

  entries(): IterableIterator<[K, C]> {
    return this.map.entries();
  }

  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  values(): IterableIterator<C> {
    return this.map.values();
  }

  reset(): void {
    this.map.reset();
  }
}

// TODO: PlainMap version, if needed
