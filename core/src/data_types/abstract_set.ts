import { Collab } from "../core";
import { CSetEventsRecord, ISet } from "./iset";

/**
 * Utility type for [[MakeAbstractSet]]'s type signature.
 */
export interface MakeAbstractSet_Methods<
  T,
  AddArgs extends unknown[] = [T],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
> {
  clear(): void;
  forEach(
    callbackfn: (value: T, value2: T, set: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  [Symbol.iterator](): IterableIterator<T>;
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
 * a mixin that it extends. To work around this, we recommend:
 * 1. Define your mixin's concrete instance in a `.js` file:
 * ```js
 * export const AbstractSet_MyBase = MakeAbstractSet(MyBase);
 * ```
 * 2. Declare your instance's type in a matching `.d.ts` file as follows
 * (copy-paste and replace "MyBase"):
 * ```ts
 * export declare abstract class AbstractSet_MyBase<
 *     T,
 *     AddArgs extends unknown[],
 *     Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
 *   >
 *   extends MyBase<Events>
 *   implements ISet<T, AddArgs, Events>
 * {
 *   clear(): void;
 *   forEach(
 *     callbackfn: (value: T, value2: T, set: this) => void,
 *     thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
 *   ): void;
 *   [Symbol.iterator](): IterableIterator<T>;
 *   toString(): string;
 *
 *   // OPTIONAL: If MyBase does not already implement the other ISet methods
 *   // (the ones not added by MakeAbstractSet), you should
 *   // make them abstract, like so:
 *   abstract add(...args: AddArgs): T | undefined;
 *   abstract delete(value: T): void;
 *   abstract has(value: T): boolean;
 *   abstract values(): IterableIterator<T>;
 *   abstract readonly size: number;
 * }
 * ```
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
  (abstract new (...args: any[]) => MakeAbstractSet_Methods<
    T,
    AddArgs,
    Events
  >) {
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
