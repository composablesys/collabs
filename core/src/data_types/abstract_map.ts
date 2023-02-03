import { Collab } from "../core";
import { CMapEventsRecord, IMap } from "./imap";

export interface MakeAbstractMap_Methods<
  K,
  V,
  SetArgs extends unknown[] = [V]
> {
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
 * This mixin adds default implementations of [[IMap]]
 * methods to a base class `Base`. `Base` is assumed to extend [[Collab]]
 * and implement the remaining IMap methods (or leave them abstract).
 *
 * The implemented methods are those in [[MakeAbstractMap_Methods]].
 * You may override their implementations in subclasses.
 *
 * Typically, you do not need to use this mixin directly. Instead,
 * use our predefined instances for the most common `Base` classes:
 * [[AbstractMap_Collab]], [[AbstractMap_CObject]], [[AbstractMap_CPrimitive]],
 * [[AbstractMap_PrimitiveCRDT]].
 *
 * If you do need to apply this mixin to a different `Base`, beware that
 * it tricky to use in TypeScript. Specifically, the mixin requires generic type
 * parameters, but you cannot pass a class's generic type parameters to
 * a mixin that it extends. To work around this, we recommend
 * declaring the mixin usage and its type separately, in `.js`
 * and `.d.ts` files. See the source of [[AbstractMap_Collab]]
 * for an example.
 */
export function MakeAbstractMap<
  K,
  V,
  SetArgs extends unknown[],
  Events extends CMapEventsRecord<K, V>,
  TBase extends abstract new (...args: any[]) => {
    set(key: K, ...args: SetArgs): V | undefined;
    delete(key: K): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    entries(): IterableIterator<[K, V]>;
    readonly size: number;
  } & Collab<Events>
>(
  Base: TBase
): TBase &
  (abstract new (...args: any[]) => MakeAbstractMap_Methods<K, V, SetArgs>) {
  abstract class Mixin extends Base implements IMap<K, V, SetArgs, Events> {
    constructor(...args: any[]) {
      super(...args);
    }

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
}
