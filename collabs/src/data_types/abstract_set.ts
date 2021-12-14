import { CObject, CPrimitive } from "../../constructions";
import { Collab, InitToken } from "../../core";
import { CSet, CSetEventsRecord } from "./interfaces";

export declare abstract class AbstractCSet<T, AddArgs extends any[]>
  extends Collab
  implements CSet<T, AddArgs>
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
 * Due to limitations of TypeScript, this version of the
 * function sets all of Base's generic type parameters to their
 * base type constraint (e.g., {} if they are unconstrained).
 * If you want to override this, you must make an unsafe
 * cast to the intended constructor type, as demonstrated
 * by AbstractCSetCPrimitive and the other examples
 * in this file.
 */
export function MakeAbstractCSet<
  TBase extends abstract new (...args: any[]) => Collab
>(
  Base: TBase
): abstract new <T, AddArgs extends any[]>(
  ...args: ConstructorParameters<TBase>
) => AbstractCSet<T, AddArgs> & InstanceType<TBase> {
  // @ts-ignore generics in mixins are not supported
  abstract class Mixin<T, AddArgs extends any[]>
    extends Base
    implements AbstractCSet<T, AddArgs>
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

    toString(): string {
      return [...this].toString();
    }
  }
  return Mixin as any;
}

export const AbstractCSetCObject = MakeAbstractCSet(CObject) as abstract new <
  T,
  AddArgs extends any[],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>,
  C extends Collab = Collab
>(
  initToken: InitToken
) => AbstractCSet<T, AddArgs> & CObject<Events, C>;

export const AbstractCSetCPrimitive = MakeAbstractCSet(
  CPrimitive
) as abstract new <
  T,
  AddArgs extends any[],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
>(
  initToken: InitToken
) => AbstractCSet<T, AddArgs> & CPrimitive<Events>;

export const AbstractCSetCollab = MakeAbstractCSet(Collab) as abstract new <
  T,
  AddArgs extends any[],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
>(
  initToken: InitToken
) => AbstractCSet<T, AddArgs> & Collab<Events>;
