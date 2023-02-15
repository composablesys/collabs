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
***************************************************************************** */

import { Collab, CollabEvent, CollabEventsRecord } from "../core";

export interface ListEvent<T> extends CollabEvent {
  /**
   * The index of the first affected value.
   *
   * For [[ListEventsRecord.Delete]] events, this is the former
   * index of the first deleted value.
   */
  index: number;
  /**
   * The affected values. For bulk operations, there may be more than
   * one, in list order.
   *
   * For [[ListEventsRecord.Delete]] events, these are the former
   * values at the deleted indices.
   */
  values: T[];
  /**
   * The positions corresponding to [[values]].
   */
  positions: string[];
}

export interface ListEventsRecord<T> extends CollabEventsRecord {
  Insert: ListEvent<T>;
  Delete: ListEvent<T>;
}

/**
 * A list of values of type T, supporting insert and
 * delete with any semantics.
 *
 * Initially, values must be created using the insert method
 * or its aliases.
 * Those methods input InsertArgs and send them to every
 * replica in serialized form; every replica then uses
 * them to contruct the actual value of type T,
 * e.g., using a user-supplied callback in the constructor.
 * Values can later be deleted (and in some implementations, restored), changing
 * their presence in the list, using any semantics to
 * resolve conflicts.
 *
 * "Positions" are immutable pointers to a specific value's position in the list;
 * unlike indices, they move around like values. In this way, they act like
 * map keys (treating a list as a map from positions to values).
 * They can in particular be used as [React keys](https://reactjs.org/docs/lists-and-keys.html#keys).
 * Positions are inspired by Yjs's [Y.RelativePosition](https://docs.yjs.dev/api/relative-positions),
 * except that they are local to a specific list (to reference a position in an unknown
 * list, use a position plus a [[CollabID]] from [[IRuntime.idOf]]).
 */
export interface IList<
  T,
  InsertArgs extends unknown[] = [T],
  Events extends ListEventsRecord<T> = ListEventsRecord<T>
> extends Collab<Events> {
  /**
   * Sends args to every replica in serialized form.
   * Every replica then uses
   * them to contruct the actual inserted value of type T.
   *
   * The value currently
   * at index and all later values are shifted one
   * to the right.
   *
   * index can be in the range [0, this.length]; this.length
   * appends it to the end of the list.  If index is out
   * of range, an error is thrown.
   *
   * @param index the insertion index
   * @return The inserted value, or undefined if it is not
   * yet constructed. Implementations that always construct
   * the value immediately should get rid of the "undefined"
   * case.
   */
  insert(index: number, ...args: InsertArgs): T | undefined;

  /**
   * Deletes count values starting at startIndex (inclusive).
   * All later values are
   * shifted count to the left.
   *
   * count is optional and defaults to 1, i.e., delete(index)
   * just deletes the value at index.
   *
   * @throws if count < 0 or is not an integer, or
   * index + count >= this.length.
   */
  delete(startIndex: number, count?: number): void;

  /**
   * Returns the value at index.
   *
   * If index is out of bounds,
   * an error is thrown; this differs from an ordinary Array,
   * which would instead return undefined.
   */
  get(index: number): T;

  /**
   * @return The position currently at index.
   */
  getPosition(index: number): string;

  /**
   * Returns the current index of position.
   *
   * If position is not currently present in the list
   * ([[hasPosition]] returns false), then the result depends on searchDir:
   * - "none" (default): Returns -1.
   * - "left": Returns the next index to the left of position.
   * If there are no values to the left of position,
   * returns -1.
   * - "right": Returns the next index to the right of position.
   * If there are no values to the left of position,
   * returns [[length]].
   */
  indexOfPosition(
    position: string,
    searchDir?: "none" | "left" | "right"
  ): number;

  /**
   * Returns whether position is currently present in the list,
   * i.e., its value is present.
   */
  hasPosition(position: string): boolean;

  /**
   * Returns the value at position, or undefined if it is not currently present
   * ([[hasPosition]] returns false).
   */
  getByPosition(position: string): T | undefined;

  /**
   * Returns the position of the first occurrence of value, or
   * undefined if there are no occurrences.
   *
   * Compare to [[indexOf]].
   */
  positionOf(searchElement: T): string | undefined;

  /**
   * Deletes every index in this list.
   */
  clear(): void;

  /**
   * The length of the list.
   */
  readonly length: number;

  /** Returns an iterable of values in the list, in list order. */
  [Symbol.iterator](): IterableIterator<T>;
  /**
   * Returns an iterable of [index, position, value] tuples for every
   * value in the list, in list order.
   */
  entries(): IterableIterator<[index: number, position: string, value: T]>;

  /** Returns an iterable of values in the list, in list order. */
  values(): IterableIterator<T>;

  /** Returns an iterable of present positions, in list order. */
  positions(): IterableIterator<string>;

  // Omit keys() since it doesn't seem useful.

  // Convenience mutators
  /**
   * Deletes the last element and returns that element.
   */
  pop(): T;

  /**
   * Inserts a value at the end of the list, constructed
   * using the given InsertArgs.  Equivalent to
   * this.insert(this.length, ...args).
   *
   * @return The inserted value, or undefined if it is not
   * yet constructed. Implementations that always construct
   * the value immediately should get rid of the "undefined"
   * case.
   */
  push(...args: InsertArgs): T | undefined;

  /**
   * Deletes the first element and returns that element.
   */
  shift(): T;

  /**
   * Inserts a value at the start of the list, constructed
   * using the given InsertArgs.  Equivalent to
   * this.insert(0, ...args).
   *
   * @return the inserted value, or undefined if it is not
   * yet constructed. Implementations that always construct
   * the value immediately should get rid of the "undefined"
   * case.
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
   * Combines two or more CLists or other array-like objects.
   * This method returns a new array without modifying any existing lists or arrays.
   * @param items Additional arrays and/or items to add to the end of the array.
   */
  concat(...items: ConcatArray<T>[]): T[];
  /**
   * Combines two or more CLists or other array-like objects.
   * This method returns a new array without modifying any existing lists or arrays.
   * @param items Additional arrays and/or items to add to the end of the array.
   */
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
   * @param fromIndex The position in this list at which to
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
