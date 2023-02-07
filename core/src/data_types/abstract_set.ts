import { Collab } from "../core";
import { CSetEventsRecord, ISet } from "./iset";

/**
 * Utility type for [[MakeAbstractSet]]'s type signature.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface MakeAbstractSet_Methods<T, AddArgs extends unknown[] = [T]> {
  /**
   * Calls delete on every value in the set.
   *
   * Override this method if you want to optimize this
   * behavior.
   */
  clear(): void;
  forEach(
    callbackfn: (value: T, value2: T, set: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  [Symbol.iterator](): IterableIterator<T>;
  /**
   * @return [...this].toString()
   */
  toString(): string;
}

/**
 * This mixin adds default implementations of [[ISet]]
 * methods to a base class `Base`. `Base` is assumed to extend [[Collab]]
 * and implement the remaining ISet methods (or leave them abstract).
 *
 * The implemented methods are those in [[MakeAbstractSet_Methods]].
 * You may override their implementations in subclasses.
 *
 * Typically, you do not need to use this mixin directly. Instead,
 * use our predefined instances for the most common `Base` classes:
 * [[AbstractSet_Collab]], [[AbstractSet_CObject]], [[AbstractSet_CPrimitive]],
 * [[AbstractSet_PrimitiveCRDT]].
 *
 * If you do need to apply this mixin to a different `Base`, beware that
 * it tricky to use in TypeScript. Specifically, the mixin requires generic type
 * parameters, but you cannot pass a class's generic type parameters to
 * a mixin that it extends. To work around this, we recommend
 * declaring the mixin usage and its type separately, in `.js`
 * and `.d.ts` files. See the source of [[AbstractSet_Collab]]
 * for an example.
 */
export function MakeAbstractSet<
  T,
  AddArgs extends unknown[],
  Events extends CSetEventsRecord<T>,
  TBase extends abstract new (...args: any[]) => {
    add(...args: AddArgs): T | undefined;
    delete(value: T): void;
    has(value: T): boolean;
    values(): IterableIterator<T>;
    readonly size: number;
  } & Collab<Events>
>(
  Base: TBase
): TBase &
  (abstract new (...args: any[]) => MakeAbstractSet_Methods<T, AddArgs>) {
  abstract class Mixin extends Base implements ISet<T, AddArgs, Events> {
    constructor(...args: any[]) {
      super(...args);
    }

    clear(): void {
      for (const value of this) this.delete(value);
    }

    forEach(
      callbackfn: (value: T, value2: T, set: this) => void,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): void {
      // Not sure if this gives the exact same semantics
      // as Set if callbackfn modifies this during the
      // loop.  (Given that Array.forEach has a rather
      // funky polyfill on MDN, I expect Set.forEach is
      // similarly funky.)  Although users probably shouldn't
      // be doing that anyway.
      for (const value of this) {
        callbackfn.call(thisArg, value, value, this);
      }
    }

    [Symbol.iterator](): IterableIterator<T> {
      return this.values();
    }

    toString(): string {
      return [...this].toString();
    }
  }
  return Mixin;
}
