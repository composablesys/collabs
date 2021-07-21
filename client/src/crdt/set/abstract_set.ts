import { CompositeCrdt, Crdt, PrimitiveCrdt } from "../core";
import { CSet, CSetEventsRecord } from "./interfaces";

// TODO: do we need to include Events parameter here?
// (Check by seeing if we can extend this class and add
// non-CSet events to it.)
export declare abstract class AbstractCSet<
    T,
    AddArgs extends any[],
    Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
  >
  extends Crdt<Events>
  implements CSet<T, AddArgs, Events>
{
  abstract add(...args: AddArgs): T;
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
    thisArg?: any
  ): void;
  [Symbol.iterator](): IterableIterator<T>;
}

/**
 * This mixin adds default implementations of CSet
 * methods to an arbitrary Crdt base class.
 * You may override the default implementations.
 *
 * Implemented methods: clear, forEach, Symbol.iterator
 *
 * Due to limitations of TypeScript, this version of the
 * function sets all of Base's generic type parameters to their
 * base type constraint (e.g., {} if they are unconstrained).
 * If you want to override this, you must make an unsafe
 * cast to the intended constructor type, as demonstrated
 * by AbstractCSetPrimitiveCrdt and the other examples
 * in this file.
 *
 * TODO: such types become unsafe if Base's constructor
 * signature changes; how can we catch that?
 */
export function MakeAbstractCSet<
  TBase extends abstract new (...args: any[]) => Crdt
>(
  Base: TBase
): abstract new <
  T,
  AddArgs extends any[],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
>(
  ...args: ConstructorParameters<TBase>
) => AbstractCSet<T, AddArgs, Events> & InstanceType<TBase> {
  // @ts-ignore generics in mixins are not supported
  abstract class Mixin<
      T,
      AddArgs extends any[],
      Events extends CSetEventsRecord<T>
    >
    extends Base
    implements AbstractCSet<T, AddArgs, Events>
  {
    constructor(...args: any[]) {
      super(...args);
    }

    abstract add(...args: AddArgs): T;
    abstract delete(value: T): void;
    abstract has(value: T): boolean;
    abstract values(): IterableIterator<T>;
    abstract readonly size: number;

    clear(): void {
      for (let value of this) this.delete(value);
    }

    forEach(
      callbackfn: (value: T, value2: T, set: this) => void,
      thisArg?: any
    ): void {
      // TODO: this might not give the exact same semantics
      // as Set if callbackfn modifies this during the
      // loop.  (Given that Array.forEach has a rather
      // funky polyfill on MDN, I expect Set.forEach is
      // similarly funky.)  Although users probably shouldn't
      // be doing that anyway.
      for (let value of this) {
        callbackfn.call(thisArg, value, value, this);
      }
    }

    [Symbol.iterator](): IterableIterator<T> {
      return this.values();
    }
  }
  return Mixin as any;
}

export const AbstractCSetCompositeCrdt = MakeAbstractCSet(
  CompositeCrdt
) as abstract new <
  T,
  AddArgs extends any[],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
>() => AbstractCSet<T, AddArgs, Events> & CompositeCrdt<Events>;

export const AbstractCSetPrimitiveCrdt = MakeAbstractCSet(
  PrimitiveCrdt
) as abstract new <
  S extends Object,
  T,
  AddArgs extends any[],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
>(
  state: S
) => AbstractCSet<T, AddArgs, Events> & PrimitiveCrdt<S, Events>;

export const AbstractCSetCrdt = MakeAbstractCSet(Crdt) as abstract new <
  T,
  AddArgs extends any[],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
>() => AbstractCSet<T, AddArgs, Events> & Crdt<Events>;
