import { CObject, CPrimitive } from "../constructions";
import { Collab } from "../core";
import { CSet, CSetEventsRecord } from "./set";

export declare abstract class AbstractCSet<T, AddArgs extends unknown[]>
  extends Collab
  implements CSet<T, AddArgs>
{
  abstract add(...args: AddArgs): T | undefined;
  abstract delete(value: T): void;
  abstract has(value: T): boolean;
  abstract values(): IterableIterator<T>;
  abstract readonly size: number;

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
 * This mixin adds default implementations of CSet
 * methods to an arbitrary Collab base class.
 * You may override the default implementations.
 *
 * Implemented methods: clear, forEach, Symbol.iterator
 *
 * Existing specific base classes: [[AbstractCSetCObject]],
 * [[AbstractCSetCPrimitive]], [[AbstractCSetCollab]].
 *
 * Example of how to apply to a new base class:
 * ```ts
   export abstract class AbstractCSetCObject<
     T,
     AddArgs extends unknown[],
     Events extends CSetEventsRecord<T> = CSetEventsRecord<T>,
     C extends Collab = Collab
   >
   // @ts-expect-error No good way to pass generics T & AddArgs to mixin
   extends MakeAbstractCSet(CObject)<T, AddArgs>()<Events, C> {}
 * ```
 */
export function MakeAbstractCSet<
  TBase extends abstract new (...args: any[]) => Collab
>(Base: TBase) {
  return function <T, AddArgs extends unknown[]>(): TBase &
    (abstract new (...args: any[]) => AbstractCSet<T, AddArgs>) {
    abstract class Mixin extends Base implements AbstractCSet<T, AddArgs> {
      constructor(...args: any[]) {
        super(...args);
      }

      abstract add(...args: AddArgs): T | undefined;
      abstract delete(value: T): void;
      abstract has(value: T): boolean;
      abstract values(): IterableIterator<T>;
      abstract readonly size: number;

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
  };
}

/**
 * [[AbstractCSet]] as a subclass of [[CObject]].
 *
 * It is recommend to subclass in the form
 * ```
 * class Foo<T, AddArgs, ...> extends AbstractCSetCObject<T, AddArgs, ...>
 * implements CSet<T, AddArgs>
 * ```
 * with a redundant `implements CSet<T, AddArgs>`, since otherwise TypeScript
 * will not force you to use the actual types `T` and `AddArgs` in your
 * method signatures. This is due to a hack that we use to get those generic
 * types into the mixin that defines this class, working around
 * [this limitation](https://github.com/microsoft/TypeScript/issues/26154#issuecomment-1048480277).
 */
export abstract class AbstractCSetCObject<
    T,
    AddArgs extends unknown[],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>,
    C extends Collab = Collab
  >
  // @ts-expect-error No good way to pass generics T & AddArgs to mixin
  extends MakeAbstractCSet(CObject)<T, AddArgs>()<Events, C> {}

/**
 * [[AbstractCSet]] as a subclass of [[CPrimitive]].
 *
 * It is recommend to subclass in the form
 * ```
 * class Foo<T, AddArgs, ...> extends AbstractCSetCPrimitive<T, AddArgs, ...>
 * implements CSet<T, AddArgs>
 * ```
 * with a redundant `implements CSet<T, AddArgs>`, since otherwise TypeScript
 * will not force you to use the actual types `T` and `AddArgs` in your
 * method signatures. This is due to a hack that we use to get those generic
 * types into the mixin that defines this class, working around
 * [this limitation](https://github.com/microsoft/TypeScript/issues/26154#issuecomment-1048480277).
 */
export abstract class AbstractCSetCPrimitive<
    T,
    AddArgs extends unknown[],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
  >
  // @ts-expect-error No good way to pass generics T & AddArgs to mixin
  extends MakeAbstractCSet(CPrimitive)<T, AddArgs>()<Events> {}

/**
 * [[AbstractCSet]] as a subclass of [[Collab]].
 *
 * It is recommend to subclass in the form
 * ```
 * class Foo<T, AddArgs, ...> extends AbstractCSetCollab<T, AddArgs, ...>
 * implements CSet<T, AddArgs>
 * ```
 * with a redundant `implements CSet<T, AddArgs>`, since otherwise TypeScript
 * will not force you to use the actual types `T` and `AddArgs` in your
 * method signatures. This is due to a hack that we use to get those generic
 * types into the mixin that defines this class, working around
 * [this limitation](https://github.com/microsoft/TypeScript/issues/26154#issuecomment-1048480277).
 */
export abstract class AbstractCSetCollab<
    T,
    AddArgs extends unknown[],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
  >
  // @ts-expect-error No good way to pass generics T & AddArgs to mixin
  extends MakeAbstractCSet(Collab)<T, AddArgs>()<Events> {}
