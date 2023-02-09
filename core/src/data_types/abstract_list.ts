import { Collab } from "../core";
import { CListEventsRecord, IList } from "./ilist";

export interface MakeAbstractList_Methods<
  T,
  InsertArgs extends unknown[] = [T]
> {
  /**
   * Returns indexOfPosition(position) !== -1.
   *
   * Override this method if you want to optimize this
   * behavior.
   */
  hasPosition(position: string): boolean;
  /**
   * Returns get(indexOfPosition(position)).
   *
   * Override this method if you want to optimize this
   * behavior.
   */
  getByPosition(position: string): T | undefined;
  /**
   * Returns getPosition(indexOf(value)).
   *
   * Override this method if you want to optimize this
   * behavior.
   */
  positionOf(value: T): string | undefined;
  /**
   * Calls delete on every value in the list, in
   * reverse order.
   *
   * Override this method if you want to optimize this
   * behavior.
   */
  clear(): void;
  [Symbol.iterator](): IterableIterator<T>;
  values(): IterableIterator<T>;
  positions(): IterableIterator<string>;
  /**
   * @return [...this].toString()
   */
  toString(): string;

  // Convenience mutators.
  pop(): T;
  push(...args: InsertArgs): T | undefined;
  shift(): T;
  unshift(...args: InsertArgs): T | undefined;
  // Splice omitted because in InsertArgs form, it is hard to
  // allow multiple new values. However, implementations with
  // InsertArgs = [T] may choose to add splice in the obvious way
  // (e.g., see CValueList).

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

const proxyHandler: ProxyHandler<
  IList<unknown, unknown[], CListEventsRecord<unknown>>
> = {
  get: function (target, p) {
    if (p === "length") return target.length;
    else return target.get(Number.parseInt(p as string));
  },
  has(_target, _p) {
    // Let the Array methods know that we do indeed
    // have properties for all of the indices.
    return true;
  },
};

/**
 * This mixin adds default implementations of [[IList]]
 * methods to a base class `Base`. `Base` is assumed to extend [[Collab]]
 * and implement the remaining IList methods (or leave them abstract).
 *
 * The implemented methods are those in [[MakeAbstractList_Methods]].
 * You may override their implementations in subclasses.
 *
 * Typically, you do not need to use this mixin directly. Instead,
 * use our predefined instances for the most common `Base` classes:
 * [[AbstractList_Collab]], [[AbstractList_CObject]], [[AbstractList_CPrimitive]],
 * [[AbstractList_PrimitiveCRDT]].
 *
 * If you do need to apply this mixin to a different `Base`, beware that
 * it tricky to use in TypeScript. Specifically, the mixin requires generic type
 * parameters, but you cannot pass a class's generic type parameters to
 * a mixin that it extends. To work around this, we recommend:
 * 1. Declare the mixin usage and its type separately, in `.js`
 * and `.d.ts` files. See the source of [[AbstractList_Collab]]
 * for an example.
 * 2. In `tsconfig.json`, set `"allowJs": true`.
 * 3. In your build script, after running `tsc`, copy the `.d.ts` file to the
 * output folder. Otherwise, by default TypeScript auto-generates its own
 * `.d.ts` file from the `.js` file
 * (see [https://github.com/microsoft/TypeScript/issues/39231](https://github.com/microsoft/TypeScript/issues/39231)).
 */
export function MakeAbstractList<
  T,
  InsertArgs extends unknown[],
  Events extends CListEventsRecord<T>,
  TBase extends abstract new (...args: any[]) => {
    insert(index: number, ...args: InsertArgs): T | undefined;
    delete(startIndex: number, count?: number): void;
    get(index: number): T;
    getPosition(index: number): string;
    indexOfPosition(
      position: string,
      searchDir?: "none" | "left" | "right"
    ): number;
    entries(): IterableIterator<[index: number, position: string, value: T]>;
    readonly length: number;
  } & Collab<Events>
>(
  Base: TBase
): TBase &
  (abstract new (...args: any[]) => MakeAbstractList_Methods<T, InsertArgs>) {
  abstract class Mixin extends Base implements IList<T, InsertArgs, Events> {
    constructor(...args: any[]) {
      super(...args);
    }

    hasPosition(position: string): boolean {
      return this.indexOfPosition(position) !== -1;
    }

    getByPosition(position: string): T | undefined {
      const index = this.indexOfPosition(position);
      return index === -1 ? undefined : this.get(index);
    }

    positionOf(value: T): string | undefined {
      const index = this.indexOf(value);
      return index === -1 ? undefined : this.getPosition(index);
    }

    clear(): void {
      for (let i = this.length - 1; i >= 0; i--) {
        this.delete(i);
      }
    }

    [Symbol.iterator](): IterableIterator<T> {
      return this.values();
    }

    *values(): IterableIterator<T> {
      for (const [, , value] of this.entries()) {
        yield value;
      }
    }

    *positions(): IterableIterator<string> {
      for (const [, position] of this.entries()) {
        yield position;
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

    push(...args: InsertArgs): T | undefined {
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

    unshift(...args: InsertArgs): T | undefined {
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
      return new Proxy(this, proxyHandler as ProxyHandler<this>) as unknown as {
        readonly length: number;
        readonly [index: number]: T;
      };
    }

    concat(...items: ConcatArray<T>[]): T[];
    concat(...items: (T | ConcatArray<T>)[]): T[] {
      return this.slice().concat(...items);
    }

    find<S extends T>(
      predicate: (
        this: void,
        value: T,
        index: number,
        obj: this
      ) => /* value is S */ unknown, // Type predicate confuses other this's,
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
      predicate: (
        value: T,
        index: number,
        list: this
      ) => /* value is S */ unknown, // Type predicate confuses other this's
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
  return Mixin;
}
