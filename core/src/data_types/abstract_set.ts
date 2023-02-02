import { CObject, CPrimitive } from "../constructions";
import { Collab } from "../core";
import { CSetEventsRecord, ISet } from "./iset";

// TODO: C first; underscore after Set
declare abstract class AbstractCSetCollab_declaration<
    T,
    AddArgs extends unknown[] = [T],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
  >
  extends Collab<Events>
  implements ISet<T, AddArgs>
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
 * This mixin adds default implementations of ISet
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
   TODO
 * ```
 */
function withBaseClass<
  T,
  AddArgs extends unknown[],
  Events extends CSetEventsRecord<T>,
  TBase extends abstract new (...args: any[]) => Collab<Events>
>(
  Base: TBase
): TBase &
  (abstract new (...args: any[]) => AbstractCSetCollab_declaration<
    T,
    AddArgs,
    Events
  >) {
  abstract class Mixin
    extends Base
    implements AbstractCSetCollab_declaration<T, AddArgs, Events>
  {
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
}

declare abstract class AbstractCSetCObject_declaration<
    T,
    AddArgs extends unknown[] = [T],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>,
    C extends Collab = Collab
  >
  extends CObject<Events, C>
  implements ISet<T, AddArgs>
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

declare abstract class AbstractCSetCPrimitive_declaration<
    T,
    AddArgs extends unknown[] = [T],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
  >
  extends CPrimitive<Events>
  implements ISet<T, AddArgs>
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

// TODO: check typedocs for these (make sure shows generic types,
// abstract method names & docs, implemented method names & docs,
// and inherited Collab method docs), then delete.
// Also check eslint TODOs and see if it is un-confused.
// This is still suboptimal when you mouseover the const, e.g.
// while extending - doesn't show you the type parameters.
// I guess can fix with dummy subclass?
// Check that method list/autocomplete works in subclass and has correct
// generic types.

// TODO: If it works, do same for map, list. At least do namespacing?

export const AbstractCSet = {
  withBaseClass,
  Collab: withBaseClass(Collab) as typeof AbstractCSetCollab_declaration,
  CObject: withBaseClass(CObject) as typeof AbstractCSetCObject_declaration,
  CPrimitive: withBaseClass(
    CPrimitive
  ) as typeof AbstractCSetCPrimitive_declaration,
} as const;
