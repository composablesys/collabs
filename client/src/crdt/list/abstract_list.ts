import { CompositeCrdt, Crdt, PrimitiveCrdt } from "../core";
import { CList, CListEventsRecord } from "./interfaces";

// TODO: do we need to include Events parameter here?
// (Check by seeing if we can extend this class and add
// non-CList events to it.)
export declare abstract class AbstractCList<T, InsertArgs extends any[]>
  extends Crdt
  implements CList<T, InsertArgs>
{
  abstract insert(index: number, ...args: InsertArgs): T;
  abstract delete(index: number, count?: number): void;
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

  // Convenience mutators
  pop(): T;
  push(...args: InsertArgs): T;
  shift(): T;
  unshift(...args: InsertArgs): T;

  // TODO: advice for range versions of mutators
  // TODO: may want to optimize methods involving slice
  // or iteration generally (usually n vs nlog(n)).
  // TODO: optimize includes, indexOf, lastIndexOf if you know how to get
  // the index of an element immediately.
  // TODO: optimize join for TextCrdt (in particular, join('')).

  // Convenience accessors
  concat(...items: ConcatArray<T>[]): T[];
  concat(...items: (T | ConcatArray<T>)[]): T[];
  find<S extends T>(
    predicate: (this: void, value: T, index: number, obj: this) => value is S,
    thisArg?: any
  ): S | undefined;
  find(
    predicate: (value: T, index: number, obj: this) => unknown,
    thisArg?: any
  ): T | undefined;
  findIndex(
    predicate: (value: T, index: number, obj: this) => unknown,
    thisArg?: any
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
    thisArg?: any
  ): boolean;
  some(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any
  ): boolean;
  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: any
  ): void;
  map<U>(
    callbackfn: (value: T, index: number, list: this) => U,
    thisArg?: any
  ): U[];
  filter<S extends T>(
    predicate: (value: T, index: number, list: this) => value is S,
    thisArg?: any
  ): S[];
  filter(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any
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
 * by AbstractCListPrimitiveCrdt and the other examples
 * in this file.
 *
 * TODO: such types become unsafe if Base's constructor
 * signature changes; how can we catch that?
 */
export function MakeAbstractCList<
  TBase extends abstract new (...args: any[]) => Crdt
>(
  Base: TBase
): abstract new <T, InsertArgs extends any[]>(
  ...args: ConstructorParameters<TBase>
) => AbstractCList<T, InsertArgs> & InstanceType<TBase> {
  // @ts-ignore generics in mixins are not supported
  abstract class Mixin<T, InsertArgs extends any[]>
    extends Base
    implements AbstractCList<T, InsertArgs>
  {
    constructor(...args: any[]) {
      super(...args);
    }

    abstract insert(index: number, ...args: InsertArgs): T;
    abstract delete(index: number, count?: number): void;
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
      for (let value of this) {
        yield [i, value];
        i++;
      }
    }

    // Convenience mutators
    pop(): T {
      // TODO: implementations can do this more efficiently
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
      // TODO: implementations can do this more efficiently
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
      // TODO: cache the value (make a property of the
      // list), to prevent recreating it each time it is used?

      // Use a proxy to define [index] accessors
      return new Proxy(this, {
        get: function (target, prop) {
          if (prop === "length") return target.length;
          else return target.get(Number(prop));
        },
      }) as unknown as {
        readonly length: number;
        readonly [index: number]: T;
      };
    }

    concat(...items: ConcatArray<T>[]): T[];
    concat(...items: (T | ConcatArray<T>)[]): T[] {
      // TODO: can we use Array.call version here?
      return this.slice().concat(...items);
    }

    find<S extends T>(
      predicate: (this: void, value: T, index: number, obj: this) => value is S,
      thisArg?: any
    ): S | undefined;
    find(
      predicate: (value: T, index: number, obj: this) => unknown,
      thisArg?: any
    ): T | undefined {
      return Array.prototype.find.call(
        this.asArrayLike(),
        (value, index) => predicate(value, index, this),
        thisArg
      );
    }

    findIndex(
      predicate: (value: T, index: number, obj: this) => unknown,
      thisArg?: any
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
      const thisVar = this;
      return this.slice().flatMap(function (this: This, value, index) {
        return callback.call(this, value, index, thisVar);
      }, thisArg);
    }

    flat<D extends number = 1>(depth?: D): FlatArray<T[], D>[] {
      // TODO
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
      thisArg?: any
    ): boolean {
      const thisVar = this;
      return Array.prototype.every.call(
        this.asArrayLike(),
        function (this: any, value, index) {
          return predicate.call(this, value, index, thisVar);
        },
        thisArg
      );
    }

    some(
      predicate: (value: T, index: number, list: this) => unknown,
      thisArg?: any
    ): boolean {
      const thisVar = this;
      return Array.prototype.some.call(
        this.asArrayLike(),
        function (this: any, value, index) {
          return predicate.call(this, value, index, thisVar);
        },
        thisArg
      );
    }

    forEach(
      callbackfn: (value: T, index: number, list: this) => void,
      thisArg?: any
    ): void {
      const thisVar = this;
      return Array.prototype.forEach.call(
        this.asArrayLike(),
        function (this: any, value, index) {
          return callbackfn.call(this, value, index, thisVar);
        },
        thisArg
      );
    }

    map<U>(
      callbackfn: (value: T, index: number, list: this) => U,
      thisArg?: any
    ): U[] {
      const thisVar = this;
      // TODO: why is the cast needed here?  Type inference
      // seems to be failing.
      return Array.prototype.map.call(
        this.asArrayLike(),
        function (this: any, value: T, index: number): U {
          return callbackfn.call(this, value, index, thisVar);
        },
        thisArg
      ) as U[];
    }

    filter<S extends T>(
      predicate: (value: T, index: number, list: this) => value is S,
      thisArg?: any
    ): S[];
    filter(
      predicate: (value: T, index: number, list: this) => unknown,
      thisArg?: any
    ): T[] {
      const thisVar = this;
      return Array.prototype.filter.call(
        this.asArrayLike(),
        function (this: any, value, index) {
          return predicate.call(this, value, index, thisVar);
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
    // TODO: had to make initialValue optional here, is
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
      const thisVar = this;
      // TODO: why is the cast and any needed here?  Type inference
      // seems to be failing.
      return Array.prototype.reduce.call(
        this.asArrayLike(),
        function (this: any, previousValue: any, currentValue, currentIndex) {
          return callbackfn.call(
            this,
            previousValue,
            currentValue,
            currentIndex,
            thisVar
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
      const thisVar = this;
      // TODO: why is the cast and any needed here?  Type inference
      // seems to be failing.
      return Array.prototype.reduceRight.call(
        this.asArrayLike(),
        function (this: any, previousValue: any, currentValue, currentIndex) {
          return callbackfn.call(
            this,
            previousValue,
            currentValue,
            currentIndex,
            thisVar
          );
        },
        initialValue
      ) as U;
    }

    slice(start?: number, end?: number): T[] {
      return Array.prototype.slice.call(this.asArrayLike(), start, end);
    }
  }
  // TODO: this almost works except it thinks insert's return
  // type is unknown for some reason?
  return Mixin as any;
}

export const AbstractCListCompositeCrdt = MakeAbstractCList(
  CompositeCrdt
) as abstract new <
  T,
  InsertArgs extends any[],
  Events extends CListEventsRecord<T> = CListEventsRecord<T>
>() => AbstractCList<T, InsertArgs> & CompositeCrdt<Events>;

export const AbstractCListPrimitiveCrdt = MakeAbstractCList(
  PrimitiveCrdt
) as abstract new <
  S extends Object,
  T,
  InsertArgs extends any[],
  Events extends CListEventsRecord<T> = CListEventsRecord<T>
>(
  state: S
) => AbstractCList<T, InsertArgs> & PrimitiveCrdt<S, Events>;

export const AbstractCListCrdt = MakeAbstractCList(Crdt) as abstract new <
  T,
  InsertArgs extends any[],
  Events extends CListEventsRecord<T> = CListEventsRecord<T>
>() => AbstractCList<T, InsertArgs> & Crdt<Events>;
