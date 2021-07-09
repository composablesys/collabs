import { CompositeCrdt, Crdt } from "../core";
import {
  CrdtMap,
  CrdtMapEventsRecord,
  PlainMap,
  PlainMapEventsRecord,
} from "./interfaces";

/**
 * Convenience abstract class that provides default
 * implementations of CrdtMap methods where possible.
 *
 * Ideally, this would be a mixin instead of extending
 * CompositeCrdt, so that implementations could choose
 * their superclass.  However, TypeScript mixins don't
 * support returning abstract classes, and they are
 * hard to use even in basic situations, so we instead
 * opt to extend the most common superclass, CompositeCrdt.
 */
export abstract class AbstractCrdtMap<
    K,
    C extends Crdt,
    Events extends CrdtMapEventsRecord<K, C> = CrdtMapEventsRecord<K, C>,
    D extends Crdt = Crdt
  >
  extends CompositeCrdt<Events, D>
  implements CrdtMap<K, C>
{
  abstract delete(key: K): boolean;
  abstract get(key: K): C | undefined;
  abstract owns(valueCrdt: C): boolean;
  abstract has(key: K): boolean;
  abstract addKey(key: K): this;
  abstract keyOf(valueCrdt: C): K;
  abstract readonly size: number;
  abstract entries(): IterableIterator<[K, C]>;
  abstract reset(): void;

  /**
   * Throws an error if !this.owns(valueCrdt).
   */
  protected checkOwns(valueCrdt: C) {
    if (!this.owns(valueCrdt)) {
      throw new Error("valueCrdt is not owned by this CrdtSet");
    }
  }

  clear(): void {
    for (let key of this.keys()) this.delete(key);
  }

  hasValue(valueCrdt: C): boolean {
    return this.has(this.keyOf(valueCrdt));
  }

  [Symbol.iterator](): IterableIterator<[K, C]> {
    return this.entries();
  }

  *keys(): IterableIterator<K> {
    for (let [key, _] of this.entries()) yield key;
  }

  *values(): IterableIterator<C> {
    for (let [_, valueCrdt] of this.entries()) yield valueCrdt;
  }
}

export abstract class AbstractPlainMap<
    K,
    V,
    Events extends PlainMapEventsRecord<K> = PlainMapEventsRecord<K>,
    D extends Crdt = Crdt
  >
  extends CompositeCrdt<Events, D>
  implements PlainMap<K, V>
{
  abstract delete(key: K): boolean;
  abstract get(key: K): V | undefined;
  abstract has(key: K): boolean;
  abstract set(key: K, value: V): this;
  abstract readonly size: number;
  abstract entries(): IterableIterator<[K, V]>;
  abstract reset(): void;

  clear(): void {
    for (let key of this.keys()) this.delete(key);
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.entries();
  }

  *keys(): IterableIterator<K> {
    for (let [key, _] of this.entries()) yield key;
  }

  *values(): IterableIterator<V> {
    for (let [_, value] of this.entries()) yield value;
  }

  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any
  ): void {
    for (let [key, value] of this) {
      callbackfn.call(thisArg, value, key, this);
    }
  }

  get [Symbol.toStringTag](): string {
    return "PlainMap";
  }
}
