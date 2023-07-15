import { Collab } from "../core";
import { IList, ListEventsRecord, Position } from "./i_list";

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
  hasPosition(position: Position): boolean;
  /**
   * Returns get(indexOfPosition(position)).
   *
   * Override this method if you want to optimize this
   * behavior.
   */
  getByPosition(position: Position): T | undefined;
  /**
   * Returns getPosition(indexOf(value)).
   *
   * Override this method if you want to optimize this
   * behavior. If you do so, you probably also want to
   * override indexOf to call this method instead of doing a linear search.
   */
  positionOf(searchElement: T): Position | undefined;
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
  positions(): IterableIterator<Position>;
  /**
   * @return [...this].toString()
   */
  toString(): string;

  // Convenience mutators.
  push(...args: InsertArgs): T | undefined;
  unshift(...args: InsertArgs): T | undefined;
  // Splice omitted because in InsertArgs form, it is hard to
  // allow multiple new values. However, implementations with
  // InsertArgs = [T] may choose to add splice in the obvious way
  // (e.g., see CValueList).

  // OPT: may want to optimize methods involving slice
  // or iteration generally (usually n vs nlog(n)).
  // OPT: optimize positionOf, indexOf if you know how to get
  // the position/index of an element immediately.

  // Convenience accessors
  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  map<U>(
    callbackfn: (value: T, index: number, list: this) => U,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): U[];
  slice(start?: number, end?: number): T[];
  indexOf(searchElement: T, fromIndex?: number): number;
}

/**
 * Mixin that adds default implementations of [[IList]]
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
  Events extends ListEventsRecord<T>,
  TBase extends abstract new (...args: any[]) => {
    insert(index: number, ...args: InsertArgs): T | undefined;
    delete(index: number, count?: number): void;
    get(index: number): T;
    getPosition(index: number): Position;
    indexOfPosition(
      position: Position,
      searchDir?: "none" | "left" | "right"
    ): number;
    entries(): IterableIterator<[index: number, value: T, position: Position]>;
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

    hasPosition(position: Position): boolean {
      return this.indexOfPosition(position) !== -1;
    }

    getByPosition(position: Position): T | undefined {
      const index = this.indexOfPosition(position);
      return index === -1 ? undefined : this.get(index);
    }

    positionOf(searchElement: T): Position | undefined {
      const index = this.indexOf(searchElement);
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
      for (const [, value] of this.entries()) {
        yield value;
      }
    }

    *positions(): IterableIterator<Position> {
      for (const [, , position] of this.entries()) {
        yield position;
      }
    }

    toString(): string {
      return [...this.values()].toString();
    }

    // Convenience mutators

    push(...args: InsertArgs): T | undefined {
      return this.insert(this.length, ...args);
    }

    unshift(...args: InsertArgs): T | undefined {
      return this.insert(0, ...args);
    }

    // Convenience accessors

    // For tree-based list CRDTs, iterating with entries()
    // is generally faster than calling get(i) for every i
    // (O(n) vs O(nlog(n))).
    // Hence we use entries()/values() in these accessors when possible.

    forEach(
      callbackfn: (value: T, index: number, list: this) => void,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): void {
      for (const [i, value] of this.entries()) {
        callbackfn.call(thisArg, value, i, this);
      }
    }

    map<U>(
      callbackfn: (value: T, index: number, list: this) => U,
      thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
    ): U[] {
      const ans = new Array<U>(this.length);
      for (const [i, value] of this.entries()) {
        ans[i] = callbackfn.call(thisArg, value, i, this);
      }
      return ans;
    }

    slice(start?: number, end?: number): T[] {
      const len = this.length;
      if (start === undefined || start < -len) {
        start = 0;
      } else if (start < 0) {
        start += len;
      } else if (start >= len) {
        return [];
      }
      if (end === undefined || end >= len) {
        end = len;
      } else if (end < -len) {
        end = 0;
      } else if (end < 0) {
        end += len;
      }
      if (end <= start) return [];

      // Optimize common case (slice()).
      if (start === 0 && end === len) {
        return [...this.values()];
      } else {
        const ans = new Array<T>(end - start);
        for (let i = 0; i < end - start; i++) {
          ans[i] = this.get(start + i);
        }
        return ans;
      }
    }

    indexOf(searchElement: T, fromIndex = 0): number {
      if (fromIndex < 0) fromIndex += this.length;
      if (fromIndex < 0) fromIndex = 0;

      if (fromIndex === 0) {
        // Optimize common case (indexOf(searchElement)).
        for (const [i, value] of this.entries()) {
          if (value === searchElement) return i;
        }
      } else {
        for (let i = fromIndex; i < this.length; i++) {
          if (this.get(i) === searchElement) return i;
        }
      }
      return -1;
    }
  }
  return Mixin;
}
