import { Collab } from "../core";
// Import CObject and CPrimitive from their specific files;
// with whole-folder imports, AbstractCMapCObject and LazyMutCMap
// create a circular dependency between constructions
// and data_types.
import { CObject } from "../constructions/object";
import { CPrimitive } from "../constructions/primitive";
import { CMap, CMapEventsRecord } from "./map";

export declare abstract class AbstractCMap<K, V, SetArgs extends unknown[]>
  extends Collab
  implements CMap<K, V, SetArgs>
{
  abstract set(key: K, ...args: SetArgs): V | undefined;
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
 * Existing specific base classes: [[AbstractCMapCObject]],
 * [[AbstractCMapCPrimitive]], [[AbstractCMapCollab]].
 *
 * Example of how to apply to a new base class:
 * ```ts
   export abstract class AbstractCMapCObject<
     K,
     V,
     SetArgs extends unknown[],
     Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>,
     C extends Collab = Collab
   >
   // @ts-expect-error No good way to pass generics K, V, SetArgs to mixin
   extends MakeAbstractCMap(CObject)<K, V, SetArgs>()<Events, C> {}
 * ```
 */
export function MakeAbstractCMap<
  TBase extends abstract new (...args: any[]) => Collab
>(Base: TBase) {
  return function <K, V, SetArgs extends unknown[]>(): TBase &
    (abstract new (...args: any[]) => AbstractCMap<K, V, SetArgs>) {
    abstract class Mixin extends Base implements AbstractCMap<K, V, SetArgs> {
      constructor(...args: any[]) {
        super(...args);
      }

      abstract set(key: K, ...args: SetArgs): V | undefined;
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
    return Mixin;
  };
}

/**
 * [[AbstractCMap]] as a subclass of [[CObject]].
 *
 * It is recommend to subclass in the form
 * ```
 * class Foo<K, V, SetArgs, ...> extends AbstractCMapCObject<K, V, SetArgs, ...>
 * implements CMap<K, V, SetArgs>
 * ```
 * with a redundant `implements CMap<K, V, SetArgs>`, since otherwise TypeScript
 * will not force you to use the actual types `K`, `V`, `SetArgs` in your
 * method signatures. This is due to a hack that we use to get those generic
 * types into the mixin that defines this class, working around
 * [this limitation](https://github.com/microsoft/TypeScript/issues/26154#issuecomment-1048480277).
 */
export abstract class AbstractCMapCObject<
    K,
    V,
    SetArgs extends unknown[],
    Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>,
    C extends Collab = Collab
  >
  // @ts-expect-error No good way to pass generics K, V, SetArgs to mixin
  extends MakeAbstractCMap(CObject)<K, V, SetArgs>()<Events, C> {}

/**
 * [[AbstractCMap]] as a subclass of [[CPrimitive]].
 *
 * It is recommend to subclass in the form
 * ```
 * class Foo<K, V, SetArgs, ...> extends AbstractCMapCPrimitive<K, V, SetArgs, ...>
 * implements CMap<K, V, SetArgs>
 * ```
 * with a redundant `implements CMap<K, V, SetArgs>`, since otherwise TypeScript
 * will not force you to use the actual types `K`, `V`, `SetArgs` in your
 * method signatures. This is due to a hack that we use to get those generic
 * types into the mixin that defines this class, working around
 * [this limitation](https://github.com/microsoft/TypeScript/issues/26154#issuecomment-1048480277).
 */
export abstract class AbstractCMapCPrimitive<
    K,
    V,
    SetArgs extends unknown[],
    Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
  >
  // @ts-expect-error No good way to pass generics K, V, SetArgs to mixin
  extends MakeAbstractCMap(CPrimitive)<K, V, SetArgs>()<Events> {}

/**
 * [[AbstractCMap]] as a subclass of [[Collab]].
 *
 * It is recommend to subclass in the form
 * ```
 * class Foo<K, V, SetArgs, ...> extends AbstractCMapCollab<K, V, SetArgs, ...>
 * implements CMap<K, V, SetArgs>
 * ```
 * with a redundant `implements CMap<K, V, SetArgs>`, since otherwise TypeScript
 * will not force you to use the actual types `K`, `V`, `SetArgs` in your
 * method signatures. This is due to a hack that we use to get those generic
 * types into the mixin that defines this class, working around
 * [this limitation](https://github.com/microsoft/TypeScript/issues/26154#issuecomment-1048480277).
 */
export abstract class AbstractCMapCollab<
    K,
    V,
    SetArgs extends unknown[],
    Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
  >
  // @ts-expect-error No good way to pass generics K, V, SetArgs to mixin
  extends MakeAbstractCMap(Collab)<K, V, SetArgs>()<Events> {}
