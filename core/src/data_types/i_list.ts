/**
 * Some methods in IList are copied or modified from methods on
 * JavaScript's Array class, in which case their
 * type annotations and docstrings are copied or modified from
 * those used in TypeScript, found in various files in
 * https://github.com/microsoft/TypeScript/tree/main/src/lib
 * Material from TypeScript
 * bears the following copyright notice:
 *
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
*/

import { Collab, CollabEvent, CollabEventsRecord } from "../core";
import { ICursorList } from "../util/cursors";

/**
 * A position in a collaborative list (e.g. [[CList]], [[CValueList]], [[CText]]),
 * represented as an opaque string.
 *
 * A position points to a list entry immutably: unlike its index,
 * an entry's position never changes.
 *
 * The [[IList]] interface has methods to convert between a position,
 * its value (if present), and
 * its current index (or where it would be if present).
 *
 * You can use positions
 * as [React keys](https://reactjs.org/docs/lists-and-keys.html#keys), cursors, range endpoints
 * for a comment on a document, etc.
 */
export type Position = string;

/**
 * Event emitted by an [[IList]]`<T>` implementation
 * when a range of values is inserted or deleted.
 */
export interface ListEvent<T> extends CollabEvent {
  /**
   * The index of the first affected value.
   * Collectively, the values have indices
   * `index` through `index + values.length - 1`.
   *
   * For [[ListEventsRecord.Delete]] events, this is the *former*
   * index of the first deleted value.
   */
  index: number;
  /**
   * The affected values, in list order.
   */
  values: T[];
  /**
   * The positions corresponding to [[values]].
   */
  positions: Position[];
}

/**
 * Base events record for an [[IList]]`<T>` implementation.
 */
export interface ListEventsRecord<T> extends CollabEventsRecord {
  /**
   * Emitted when a range of values is inserted.
   */
  Insert: ListEvent<T>;
  /**
   * Emitted when a range of values is deleted.
   */
  Delete: ListEvent<T>;
}

/**
 * Interface for a collaborative list with values
 * of type T.
 *
 * For implementations, see [[CList]] and [[CValueList]]. [[CText]] is similar but not an actual
 * IList implementation.
 *
 * `IList<T>` has a similar API to `Array<T>`,
 * but it is mutated more like a linked list: instead of mutating
 * existing values, you [[insert]] and [[delete]]
 * list entries. Insertions and deletions
 * shift later entries, changing their indices, like
 * in collaborative text editing or
 * [Array.splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).
 *
 * This interface permits [[insert]] to accept arbitrary
 * `InsertArgs` instead of just the value to insert.
 * That is useful
 * when the value is not serializable, e.g., a dynamically-
 * created [[Collab]].
 *
 * IList lets you address a list entry by its immutable *position*, in addition
 * to its mutable index; see [[Position]].
 *
 * @typeParam T The value type.
 * @typeParam InsertArgs The type of arguments to [[insert]].
 * Defaults to `[T]`, i.e., insert inputs the actual value.
 * @typeParam Events Events record.
 */
export interface IList<
  T,
  InsertArgs extends unknown[] = [T],
  Events extends ListEventsRecord<T> = ListEventsRecord<T>
> extends Collab<Events>,
    ICursorList {
  /**
   * Inserts a value at the given index using args.
   *
   * All values currently at or after `index` shift
   * to the right, incrementing their indices.
   *
   * Typically, args are broadcast to all replicas
   * in serialized form. Every replica then uses
   * them to contruct the actual value of type T.
   *
   * @param index The insertion index in the range
   * `[0, this.length]`. If `this.length`, the value
   * is appended to the end of the list.
   * @return The inserted value, or undefined if it is not
   * constructed immediately.
   * @throws If index is not in `[0, this.length]`.
   */
  insert(index: number, ...args: InsertArgs): T | undefined;

  /**
   * Delete `count` values starting at `startIndex`, i.e., values
   * `[startIndex, startIndex + count - 1)`.
   *
   * All later values shift to the left,
   * decreasing their indices by `count`.
   *
   * @param count The number of values to delete.
   * Defaults to 1 (delete the value at `startIndex` only).
   *
   * @throws if `startIndex < 0` or
   * `startIndex + count >= this.length`.
   */
  delete(startIndex: number, count?: number): void;

  /**
   * Returns the value currently at index.
   *
   * @throws If index is not in `[0, this.length)`.
   * Note that this differs from an ordinary Array,
   * which would instead return undefined.
   */
  get(index: number): T;

  // Docs inherited from ICursorList.
  getPosition(index: number): Position;

  // Docs inherited from ICursorList.
  indexOfPosition(
    position: Position,
    searchDir?: "none" | "left" | "right"
  ): number;

  /**
   * Returns whether position is currently present in the list,
   * i.e., its value is present.
   */
  hasPosition(position: Position): boolean;

  /**
   * Returns the value at position, or undefined if it is not currently present
   * ([[hasPosition]] returns false).
   */
  getByPosition(position: Position): T | undefined;

  /**
   * Returns the position of the first occurrence of value, or
   * undefined if there are no occurrences.
   *
   * Compare to [[indexOf]].
   */
  positionOf(searchElement: T): Position | undefined;

  /**
   * Deletes every value in the list.
   */
  clear(): void;

  /**
   * The length of the list.
   */
  readonly length: number;

  /** Returns an iterator for values in the list, in list order. */
  [Symbol.iterator](): IterableIterator<T>;
  /**
   * Returns an iterator of [index, position, value] tuples for every
   * value in the list, in list order.
   */
  entries(): IterableIterator<[index: number, position: Position, value: T]>;

  /** Returns an iterator for values in the list, in list order. */
  values(): IterableIterator<T>;

  /** Returns an iterator for present positions, in list order. */
  positions(): IterableIterator<Position>;

  // Omit keys() since it doesn't seem useful.

  // Convenience mutators
  /**
   * Deletes the last element and returns that element.
   */
  pop(): T;

  /**
   * Inserts a value at the end of the list using args.  Equivalent to
   * `this.insert(this.length, ...args)`.
   *
   * @return The inserted value, or undefined if it is not
   * constructed immediately.
   */
  push(...args: InsertArgs): T | undefined;

  /**
   * Deletes the first element and returns that element.
   */
  shift(): T;

  /**
   * Inserts a value at the start of the list using args.  Equivalent to
   * `this.insert(0, ...args)`.
   *
   * @return The inserted value, or undefined if it is not
   * constructed immediately.
   */
  unshift(...args: InsertArgs): T | undefined;

  // Convenience accessors.
  // When they are O(n), maybe implement by just making
  // an array and calling its method (e.g. join)?
  // Another trick is to look for polyfills (e.g. on the MDN
  // Array docs) and copy those.  That can help to catch
  // some the subtleties of the semantics (e.g., some use
  // a C-style for-loop instead of an iterator, which makes
  // a difference if you delete/insert stuff during the callback func; although we could ignore
  // that if it is annoying/weird and it gives O(log n)
  // efficiency instead of O(n)).
  // Note some implementations should override includes,
  // indexOf, etc., since they can do those methods in O(1)
  // time.

  /**
   * Combines two or more ILists or other array-like objects.
   * This method returns a new array without modifying any existing lists or arrays.
   * @param items Additional arrays and/or items to add to the end of the returned array.
   */
  concat(...items: ConcatArray<T>[]): T[];
  concat(...items: (T | ConcatArray<T>)[]): T[];

  /**
   * Returns the value of the first element in the list where predicate is true, and undefined
   * otherwise.
   * @param predicate find calls predicate once for each element of the list, in ascending
   * order, until it finds one where predicate returns true. If such an element is found, find
   * immediately returns that element value. Otherwise, find returns undefined.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  find<S extends T>(
    predicate: (this: void, value: T, index: number, obj: this) => value is S,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): S | undefined;
  find(
    predicate: (value: T, index: number, obj: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): T | undefined;

  /**
   * Returns the index of the first element in the list where predicate is true, and -1
   * otherwise.
   * @param predicate find calls predicate once for each element of the list, in ascending
   * order, until it finds one where predicate returns true. If such an element is found,
   * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  findIndex(
    predicate: (value: T, index: number, obj: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): number;

  /**
   * Calls a defined callback function on each element of this list. Then, flattens the result into
   * a new array.
   * This is identical to a map followed by flat with depth 1.
   *
   * @param callback A function that accepts up to three arguments. The flatMap method calls the
   * callback function one time for each element in this list.
   * @param thisArg An object to which the this keyword can refer in the callback function. If
   * thisArg is omitted, undefined is used as the this value.
   */
  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: T,
      index: number,
      array: this
    ) => U | ReadonlyArray<U>,
    thisArg?: This
  ): U[];

  // Note: we modified this type from the Array version by replacing A with T[].
  /**
   * Returns a new array with all sub-array elements concatenated into it recursively up to the
   * specified depth.
   *
   * @param depth The maximum recursion depth
   */
  flat<D extends number = 1>(depth?: D): FlatArray<T[], D>[];

  /**
   * Determines whether this list includes a certain element, returning true or false as appropriate.
   *
   * @param searchElement The element to search for.
   * @param fromIndex The index in this list at which to
   * begin searching for searchElement.  The first element
   * to be searched is found at fromIndex for positive
   * values of fromIndex, or at arr.length + fromIndex for
   * negative values of fromIndex (using the absolute
   * value of fromIndex as the number of elements from
   * the end of the list at which to start the
   * search).  Defaults to 0.
   */
  includes(searchElement: T, fromIndex?: number): boolean;
  /**
   * Returns the index of the first occurrence of a value in this list, or -1 if it is not present.
   * @param searchElement The value to locate in this list.
   * @param fromIndex The index to start the search at. If the index is greater than or equal to the list's length, -1 is returned, which means the list will not be searched. If the provided index value is a negative number, it is taken as the offset from the end of the list. Note: if the provided index is negative, the list is still searched from front to back. If the provided index is 0, then the whole list will be searched. Default: 0 (entire list is searched).
   */
  indexOf(searchElement: T, fromIndex?: number): number;
  /**
   * Returns the index of the last occurrence of a specified value in this list, or -1 if it is not present.
   * @param searchElement The value to locate in the list.
   * @param fromIndex The index at which to start searching backwards. Defaults to the list's length minus one (arr.length - 1), i.e. the whole list will be searched. If the index is greater than or equal to the length of the list, the whole list will be searched. If negative, it is taken as the offset from the end of the list. Note that even when the index is negative, the list is still searched from back to front. If the calculated index is less than 0, -1 is returned, i.e. the list will not be searched.
   */
  lastIndexOf(searchElement: T, fromIndex?: number): number;
  // Omitting this version because it is not type-safe,
  // since insert might still
  // try to insert things of type T but not type S.
  // /**
  //  * Determines whether all the members of this list satisfy the specified test.
  //  * @param predicate A function that accepts up to three arguments. The every method calls
  //  * the predicate function for each element in the list until the predicate returns a value
  //  * which is coercible to the Boolean value false, or until the end of the list.
  //  * @param thisArg An object to which the this keyword can refer in the predicate function.
  //  * If thisArg is omitted, undefined is used as the this value.
  //  */
  // every<S extends T>(
  //   predicate: (value: T, index: number, list: this) => value is S,
  //    thisArg?: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  // ): this is S[];
  /**
   * Determines whether all the members of this list satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls
   * the predicate function for each element in the list until the predicate returns a value
   * which is coercible to the Boolean value false, or until the end of the list.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  every(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): boolean;
  /**
   * Determines whether the specified callback function returns true for any element of this list.
   * @param predicate A function that accepts up to three arguments. The some method calls
   * the predicate function for each element in the list until the predicate returns a value
   * which is coercible to the Boolean value true, or until the end of the list.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  some(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): boolean;
  /**
   * Performs the specified action for each element in this list.
   * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the list.
   * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  forEach(
    callbackfn: (value: T, index: number, list: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  /**
   * Calls a defined callback function on each element of this list, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the list.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  map<U>(
    callbackfn: (value: T, index: number, list: this) => U,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): U[];
  /**
   * Returns the elements of this list that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the list.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  filter<S extends T>(
    predicate: (value: T, index: number, list: this) => value is S,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): S[];
  /**
   * Returns the elements of this list that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the list.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  filter(
    predicate: (value: T, index: number, list: this) => unknown,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): T[];
  /**
   * Adds all the elements of this list into a string, separated by the specified separator string.
   * @param separator A string used to separate one element of the list from the next in the resulting string. If omitted, the list elements are separated with a comma.
   */
  join(separator?: string): string;
  /**
   * Calls the specified callback function for all the elements in this list. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the list.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of a list value.
   */
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => T
  ): T;
  /**
   * Calls the specified callback function for all the elements in this list. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the list.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of this list value.
   */
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => U,
    initialValue: U
  ): U;
  /**
   * Calls the specified callback function for all the elements in this list, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the list.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of this list value.
   */
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => T
  ): T;
  /**
   * Calls the specified callback function for all the elements in this list, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the list.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of this list value.
   */
  reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      list: this
    ) => U,
    initialValue: U
  ): U;
  /**
   * Returns a copy of a section of this list, as an array.
   * For both start and end, a negative index can be used to indicate an offset from the end of the list.
   * For example, -2 refers to the second to last element of the list.
   * @param start The beginning index of the specified portion of the list.
   * If start is undefined, then the slice begins at index 0.
   * @param end The end index of the specified portion of the list. This is exclusive of the element at the index 'end'.
   * If end is undefined, then the slice extends to the end of the list.
   */
  slice(start?: number, end?: number): T[];
}
