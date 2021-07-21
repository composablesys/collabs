import { CompositeCrdt, Crdt, PrimitiveCrdt } from "../core";
import { CMap, CMapEventsRecord } from "./interfaces";

// TODO: do we need to include Events parameter here?
// (Check by seeing if we can extend this class and add
// non-CMap events to it.)
export declare abstract class AbstractCMap<
    K,
    V,
    SetArgs extends any[],
    Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
  >
  extends Crdt<Events>
  implements CMap<K, V, SetArgs, Events>
{
  abstract set(key: K, ...args: SetArgs): V;
  abstract delete(key: K): void;
  abstract get(key: K): V | undefined;
  abstract has(key: K): boolean;
  abstract readonly size: number;
  abstract entries(): IterableIterator<[K, V]>;

  /**
   * Calls delete on every value in the map.
   *
   * Override this method if you want to optimize this
   * behavior.
   */
  clear(): void;
  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any
  ): void;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  /**
   * Searches linearly through the map using the default
   * iterator,
   * comparing values to searchElement using ===.
   *
   * Override this method if you want to optimize the
   * search or use different equality semantics.
   */
  keyOf(searchElement: V): K | undefined;
}

/**
 * This mixin adds default implementations of CMap
 * methods to an arbitrary Crdt base class.
 * You may override the default implementations.
 *
 * Implemented methods: clear, forEach, Symbol.iterator,
 * keys, values
 *
 * Due to limitations of TypeScript, this version of the
 * function sets all of Base's generic type parameters to their
 * base type constraint (e.g., {} if they are unconstrained).
 * If you want to override this, you must make an unsafe
 * cast to the intended constructor type, as demonstrated
 * by AbstractCMapPrimitiveCrdt and the other examples
 * in this file.
 *
 * TODO: such types become unsafe if Base's constructor
 * signature changes; how can we catch that?
 */
export function MakeAbstractCMap<
  TBase extends abstract new (...args: any[]) => Crdt
>(
  Base: TBase
): abstract new <
  K,
  V,
  SetArgs extends any[],
  Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
>(
  ...args: ConstructorParameters<TBase>
) => AbstractCMap<K, V, SetArgs, Events> & InstanceType<TBase> {
  // @ts-ignore generics in mixins are not supported
  abstract class Mixin<
      K,
      V,
      SetArgs extends any[],
      Events extends CMapEventsRecord<K, V>
    >
    extends Base
    implements AbstractCMap<K, V, SetArgs, Events>
  {
    constructor(...args: any[]) {
      super(...args);
    }

    abstract set(key: K, ...args: SetArgs): V;
    abstract delete(key: K): void;
    abstract get(key: K): V | undefined;
    abstract has(key: K): boolean;
    abstract entries(): IterableIterator<[K, V]>;
    abstract readonly size: number;

    /**
     * Calls delete on every value in the map.
     *
     * Override this method if you want to optimize this
     * behavior.
     */
    clear(): void {
      for (let key of this.keys()) this.delete(key);
    }

    forEach(
      callbackfn: (value: V, key: K, map: this) => void,
      thisArg?: any
    ): void {
      // TODO: this might not give the exact same semantics
      // as Map if callbackfn modifies this during the
      // loop.  (Given that Array.forEach has a rather
      // funky polyfill on MDN, I expect Map.forEach is
      // similarly funky.)  Although users probably shouldn't
      // be doing that anyway.
      for (const [key, value] of this) {
        callbackfn.call(thisArg, value, key, this);
      }
    }

    [Symbol.iterator](): IterableIterator<[K, V]> {
      return this.entries();
    }

    *keys(): IterableIterator<K> {
      for (const [key] of this) yield key;
    }

    *values(): IterableIterator<V> {
      for (const [_, value] of this) yield value;
    }

    keyOf(searchElement: V): K | undefined {
      for (const [key, value] of this) {
        if (value === searchElement) return key;
      }
      return undefined;
    }
  }
  return Mixin as any;
}

export const AbstractCMapCompositeCrdt = MakeAbstractCMap(
  CompositeCrdt
) as abstract new <
  K,
  V,
  SetArgs extends any[],
  Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
>() => AbstractCMap<K, V, SetArgs, Events> & CompositeCrdt<Events>;

export const AbstractCMapPrimitiveCrdt = MakeAbstractCMap(
  PrimitiveCrdt
) as abstract new <
  S extends Object,
  K,
  V,
  SetArgs extends any[],
  Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
>(
  state: S
) => AbstractCMap<K, V, SetArgs, Events> & PrimitiveCrdt<S, Events>;

export const AbstractCMapCrdt = MakeAbstractCMap(Crdt) as abstract new <
  K,
  V,
  SetArgs extends any[],
  Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
>() => AbstractCMap<K, V, SetArgs, Events> & Crdt<Events>;
