import { CObject, CPrimitive } from "../constructions";
import { Collab, InitToken } from "../core";
import { CMap, CMapEventsRecord } from "./map";

export declare abstract class AbstractCMap<K, V, SetArgs extends unknown[]>
  extends Collab
  implements CMap<K, V, SetArgs>
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
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  /**
   * @return [...this].toString()
   */
  toString(): string;
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
 * methods to an arbitrary Collab base class.
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
 * by [[AbstractCMapCObject]] and the other examples
 * in this file.
 */
export function MakeAbstractCMap<
  TBase extends abstract new (...args: any[]) => Collab
>(
  Base: TBase
): abstract new <K, V, SetArgs extends unknown[]>(
  ...args: ConstructorParameters<TBase>
) => AbstractCMap<K, V, SetArgs> & InstanceType<TBase> {
  // @ts-expect-error generics in mixins are not supported
  abstract class Mixin<K, V, SetArgs extends unknown[]>
    extends Base
    implements AbstractCMap<K, V, SetArgs>
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
      for (const key of this.keys()) this.delete(key);
    }

    forEach(
      callbackfn: (value: V, key: K, map: this) => void,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): void {
      // Not sure if this gives the exact same semantics
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
      for (const [, value] of this) yield value;
    }

    toString(): string {
      return [...this].toString();
    }

    keyOf(searchElement: V): K | undefined {
      for (const [key, value] of this) {
        if (value === searchElement) return key;
      }
      return undefined;
    }
  }
  // eslint-disable-next-line
  return Mixin as any;
}

export const AbstractCMapCObject = MakeAbstractCMap(CObject) as abstract new <
  K,
  V,
  SetArgs extends unknown[],
  Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>,
  C extends Collab = Collab
>(
  initToken: InitToken
) => AbstractCMap<K, V, SetArgs> & CObject<Events, C>;

export const AbstractCMapCPrimitive = MakeAbstractCMap(
  CPrimitive
) as abstract new <
  K,
  V,
  SetArgs extends unknown[],
  Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
>(
  initToken: InitToken
) => AbstractCMap<K, V, SetArgs> & CPrimitive<Events>;

export const AbstractCMapCollab = MakeAbstractCMap(Collab) as abstract new <
  K,
  V,
  SetArgs extends unknown[],
  Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
>(
  initToken: InitToken
) => AbstractCMap<K, V, SetArgs> & Collab<Events>;
