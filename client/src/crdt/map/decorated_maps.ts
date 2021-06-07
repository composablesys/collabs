import { CompositeCrdt } from "../core/composite_crdt";
import { Crdt } from "../core/crdt";
import { CrdtMap } from "./interfaces";

// Maps that decorate an existing map, copying its
// methods.  Override to modify methods.
// More flexible/reusable than subclassing the decorated maps.

export class DecoratedCrdtMap<K, C extends Crdt>
  extends CompositeCrdt
  implements CrdtMap<K, C>
{
  private readonly map: CrdtMap<K, C>;
  constructor(map: CrdtMap<K, C>) {
    super();
    this.map = this.addChild("map", map);
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
