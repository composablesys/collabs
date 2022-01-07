import { CObject, CPrimitive } from "../constructions";
import { Collab, InitToken } from "../core";
import { CList, CListEventsRecord } from "./list";

export declare abstract class AbstractCList<T, InsertArgs extends unknown[]>
  extends Collab
  implements CList<T, InsertArgs>
{
  abstract insert(index: number, ...args: InsertArgs): T;
  abstract delete(startIndex: number, count?: number): void;
  abstract get(index: number): T;
  abstract values(): IterableIterator<T>;
  abstract readonly length: number;

  /**
   * Calls delete on every value in the list, in
   * reverse order.
   *
   * Override this method if you want to optimize this
   * behavior.
   */
  clear(): void;
  readonly size: number;
  [Symbol.iterator](): IterableIterator<T>;
  entries(): IterableIterator<[number, T]>;
  /**
   * @return [...this].toString()
   */
  toString(): string;

  // Convenience mutators.
  pop(): T;
  push(...args: InsertArgs): T;
  shift(): T;
  unshift(...args: InsertArgs): T;

  // OPT: may want to optimize methods involving slice
  // or iteration generally (usually n vs nlog(n)).
  // OPT: optimize includes, indexOf, lastIndexOf if you know how to get
  // the index of an element immediately.
  // OPT: optimize join for TextCollab (in particular, join('')).

  // Convenience accessors
  concat(...items: ConcatArray<T>[]): T[];
  concat(...items: (T | ConcatArray<T>)[]): T[];
  find<S extends T>(
    predicate: (this: void, value: T, index: number, obj: this) => value is S,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): S | undefined;
  find(
    predicate: (value: T, index: number, obj: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): T | undefined;
  findIndex(
    predicate: (value: T, index: number, obj: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): number;
  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: T,
      index: number,
      array: this
    ) => U | ReadonlyArray<U>,
    thisArg?: This
  ): U[];
  flat<D extends number = 1>(depth?: D): FlatArray<T[], D>[];
  includes(searchElement: T, fromIndex?: number): boolean;
  indexOf(searchElement: T, fromIndex?: number): number;
  lastIndexOf(searchElement: T, fromIndex?: number): number;
  every(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): boolean;
  some(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): boolean;
  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  map<U>(
    callbackfn: (value: T, index: number, list: this) => U,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): U[];
  filter<S extends T>(
    predicate: (value: T, index: number, list: this) => value is S,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): S[];
  filter(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): T[];
  join(separator?: string): string;
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => T
  ): T;
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => U,
    initialValue: U
  ): U;
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => T
  ): T;
  reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => U,
    initialValue: U
  ): U;
  slice(start?: number, end?: number): T[];
}

/**
 * This mixin adds default implementations of CList
 * methods to an arbitrary Collab base class.
 * You may override the default implementations.
 *
 * Implemented methods: all except insert, delete, get,
 * values, and length.
 *
 * Due to limitations of TypeScript, this version of the
 * function sets all of Base's generic type parameters to their
 * base type constraint (e.g., {} if they are unconstrained).
 * If you want to override this, you must make an unsafe
 * cast to the intended constructor type, as demonstrated
 * by [[AbstractCListCObject]] and the other examples
 * in this file.
 *
 * In CLists with `InsertArgs == [T]``, you
 * wish to modify [[push]] and [[unshift]] to allow bulk insertions,
 * like their `Array` versions.
 * See [[PrimitiveCList]] for an example of how to do this.
 */
export function MakeAbstractCList<
  TBase extends abstract new (...args: any[]) => Collab
>(
  Base: TBase
): abstract new <T, InsertArgs extends unknown[]>(
  ...args: ConstructorParameters<TBase>
) => AbstractCList<T, InsertArgs> & InstanceType<TBase> {
  // @ts-expect-error generics in mixins are not supported
  abstract class Mixin<T, InsertArgs extends unknown[]>
    extends Base
    implements AbstractCList<T, InsertArgs>
  {
    constructor(...args: any[]) {
      super(...args);
    }

    abstract insert(index: number, ...args: InsertArgs): T;
    abstract delete(startIndex: number, count?: number): void;
    abstract get(index: number): T;
    abstract values(): IterableIterator<T>;
    abstract readonly length: number;

    clear(): void {
      for (let i = this.length - 1; i >= 0; i--) {
        this.delete(i);
      }
    }

    get size(): number {
      return this.length;
    }

    [Symbol.iterator](): IterableIterator<T> {
      return this.values();
    }

    *entries(): IterableIterator<[number, T]> {
      let i = 0;
      for (const value of this) {
        yield [i, value];
        i++;
      }
    }

    toString(): string {
      return [...this].toString();
    }

    // Convenience mutators
    pop(): T {
      // OPT: implementations can do this more efficiently
      // (one tree lookup only) using delete's return value,
      // or by noting that it's guaranteed to be the end of
      // the list.
      const value = this.get(this.length - 1);
      this.delete(this.length - 1);
      return value;
    }

    push(...args: InsertArgs): T {
      return this.insert(this.length, ...args);
    }

    shift(): T {
      // OPT: implementations can do this more efficiently
      // (one tree lookup only) using delete's return value,
      // or by noting that it's guaranteed to be the start of
      // the list.
      const value = this.get(0);
      this.delete(0);
      return value;
    }

    unshift(...args: InsertArgs): T {
      return this.insert(0, ...args);
    }

    // Convenience accessors
    // TODO: Test these work properly with the Array.call
    // algorithms; not all of them explicitly say so.
    // I would expect at least the ones that also appear
    // on TypedArray are safe.
    private asArrayLike(): ArrayLike<T> {
      // OPT: cache the value (make a property of the
      // list), to prevent recreating it each time it is used?

      // Use a proxy to define [index] accessors
      return new Proxy(this, {
        get: function (target, p) {
          if (p === "length") return target.length;
          else return target.get(Number.parseInt(p as string));
        },
        has(_target, _p) {
          // Let the Array methods know that we do indeed
          // have properties for all of the indices.
          return true;
        },
      }) as unknown as {
        readonly length: number;
        readonly [index: number]: T;
      };
    }

    concat(...items: ConcatArray<T>[]): T[];
    concat(...items: (T | ConcatArray<T>)[]): T[] {
      return this.slice().concat(...items);
    }

    find<S extends T>(
      predicate: (this: void, value: T, index: number, obj: this) => value is S,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): S | undefined;
    find(
      predicate: (value: T, index: number, obj: this) => unknown,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): T | undefined {
      return <T | undefined>(
        Array.prototype.find.call(
          this.asArrayLike(),
          (value, index) => predicate(value, index, this),
          thisArg
        )
      );
    }

    findIndex(
      predicate: (value: T, index: number, obj: this) => unknown,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): number {
      return Array.prototype.findIndex.call(
        this.asArrayLike(),
        (value, index) => predicate(value, index, this),
        thisArg
      );
    }

    flatMap<U, This = undefined>(
      callback: (
        this: This,
        value: T,
        index: number,
        array: this
      ) => U | ReadonlyArray<U>,
      thisArg?: This
    ): U[] {
      const outerThis = this;
      return this.slice().flatMap(function (this: This, value, index) {
        return callback.call(this, value, index, outerThis);
      }, thisArg);
    }

    flat<D extends number = 1>(depth?: D): FlatArray<T[], D>[] {
      return this.slice().flat(depth);
    }

    includes(searchElement: T, fromIndex?: number): boolean {
      return Array.prototype.includes.call(
        this.asArrayLike(),
        searchElement,
        fromIndex
      );
    }

    indexOf(searchElement: T, fromIndex?: number): number {
      return Array.prototype.indexOf.call(
        this.asArrayLike(),
        searchElement,
        fromIndex
      );
    }

    lastIndexOf(searchElement: T, fromIndex?: number): number {
      return Array.prototype.lastIndexOf.call(
        this.asArrayLike(),
        searchElement,
        fromIndex
      );
    }

    every(
      predicate: (value: T, index: number, list: this) => unknown,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): boolean {
      const outerThis = this;
      return Array.prototype.every.call(
        this.asArrayLike(),
        function (this: unknown, value, index) {
          return predicate.call(this, value, index, outerThis);
        },
        thisArg
      );
    }

    some(
      predicate: (value: T, index: number, list: this) => unknown,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): boolean {
      const outerThis = this;
      return Array.prototype.some.call(
        this.asArrayLike(),
        function (this: unknown, value, index) {
          return predicate.call(this, value, index, outerThis);
        },
        thisArg
      );
    }

    forEach(
      callbackfn: (value: T, index: number, list: this) => void,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): void {
      const outerThis = this;
      return Array.prototype.forEach.call(
        this.asArrayLike(),
        function (this: unknown, value, index) {
          return callbackfn.call(this, value, index, outerThis);
        },
        thisArg
      );
    }

    map<U>(
      callbackfn: (value: T, index: number, list: this) => U,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): U[] {
      const outerThis = this;
      // Why is the cast needed here?  Type inference
      // seems to be failing.
      return Array.prototype.map.call(
        this.asArrayLike(),
        function (this: unknown, value: T, index: number): U {
          return callbackfn.call(this, value, index, outerThis);
        },
        thisArg
      ) as U[];
    }

    filter<S extends T>(
      predicate: (value: T, index: number, list: this) => value is S,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): S[];
    filter(
      predicate: (value: T, index: number, list: this) => unknown,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): T[] {
      const outerThis = this;
      return <T[]>Array.prototype.filter.call(
        this.asArrayLike(),
        function (this: unknown, value, index) {
          return predicate.call(this, value, index, outerThis);
        },
        thisArg
      );
    }

    join(separator?: string): string {
      return Array.prototype.join.call(this.asArrayLike(), separator);
    }

    reduce(
      callbackfn: (
        previousValue: T,
        currentValue: T,
        currentIndex: number,
        list: this
      ) => T
    ): T;
    // Had to make initialValue optional here, is
    // that okay?  Same in reduceRight.
    reduce<U>(
      callbackfn: (
        previousValue: U,
        currentValue: T,
        currentIndex: number,
        list: this
      ) => U,
      initialValue?: U
    ): U {
      const outerThis = this;
      // Why is the cast and any needed here?  Type inference
      // seems to be failing.
      return Array.prototype.reduce.call(
        this.asArrayLike(),
        function (
          this: unknown,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          previousValue: any,
          currentValue,
          currentIndex
        ) {
          return callbackfn.call(
            this,
            previousValue,
            currentValue,
            currentIndex,
            outerThis
          );
        },
        initialValue
      ) as U;
    }

    reduceRight(
      callbackfn: (
        previousValue: T,
        currentValue: T,
        currentIndex: number,
        list: this
      ) => T
    ): T;
    reduceRight<U>(
      callbackfn: (
        previousValue: U,
        currentValue: T,
        currentIndex: number,
        list: this
      ) => U,
      initialValue?: U
    ): U {
      const outerThis = this;
      // Why is the cast and any needed here?  Type inference
      // seems to be failing.
      return Array.prototype.reduceRight.call(
        this.asArrayLike(),
        function (
          this: unknown,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          previousValue: any,
          currentValue,
          currentIndex
        ) {
          return callbackfn.call(
            this,
            previousValue,
            currentValue,
            currentIndex,
            outerThis
          );
        },
        initialValue
      ) as U;
    }

    slice(start?: number, end?: number): T[] {
      return <T[]>Array.prototype.slice.call(this.asArrayLike(), start, end);
    }
  }
  // This almost works except it thinks insert's return
  // type is unknown for some reason?
  // eslint-disable-next-line
  return Mixin as any;
}

export const AbstractCListCObject = MakeAbstractCList(CObject) as abstract new <
  T,
  InsertArgs extends unknown[],
  Events extends CListEventsRecord<T> = CListEventsRecord<T>,
  C extends Collab = Collab
>(
  initToken: InitToken
) => AbstractCList<T, InsertArgs> & CObject<Events, C>;

export const AbstractCListCPrimitive = MakeAbstractCList(
  CPrimitive
) as abstract new <
  T,
  InsertArgs extends unknown[],
  Events extends CListEventsRecord<T> = CListEventsRecord<T>
>(
  initToken: InitToken
) => AbstractCList<T, InsertArgs> & CPrimitive<Events>;

export const AbstractCListCollab = MakeAbstractCList(Collab) as abstract new <
  T,
  InsertArgs extends unknown[],
  Events extends CListEventsRecord<T> = CListEventsRecord<T>
>(
  initToken: InitToken
) => AbstractCList<T, InsertArgs> & Collab<Events>;
