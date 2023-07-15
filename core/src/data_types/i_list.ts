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
 * as [React keys](https://reactjs.org/docs/lists-and-keys.html#keys), range endpoints
 * for a comment on a document, etc.
 *
 * See also: [[Cursor]]
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
   * Delete `count` values starting at `index`, i.e., values
   * `[index, index + count - 1)`.
   *
   * All later values shift to the left,
   * decreasing their indices by `count`.
   *
   * @param count The number of values to delete.
   * Defaults to 1 (delete the value at `index` only).
   *
   * @throws if `index < 0` or
   * `index + count >= this.length`.
   */
  delete(index: number, count?: number): void;

  /**
   * Returns the value currently at index.
   *
   * @throws If index is not in `[0, this.length)`.
   * Note that this differs from an ordinary Array,
   * which would instead return undefined.
   */
  get(index: number): T;

  /**
   * Returns the position currently at index.
   *
   * @throws If index is not in `[0, this.length)`.
   */
  getPosition(index: number): Position;

  /**
   * Returns the current index of position.
   *
   * If position is not currently present in the list
   * ([[hasPosition]] returns false),
   * then the result depends on searchDir:
   * - "none" (default): Returns -1.
   * - "left": Returns the next index to the left of position.
   * If there are no values to the left of position,
   * returns -1.
   * - "right": Returns the next index to the right of position.
   * If there are no values to the right of position,
   * returns [[length]].
   *
   * To find the index where a position would be if
   * present, use `searchDir = "right"`.
   */
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
   * Returns the position of the first occurrence of searchElement, or
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
   * Returns an iterator of [index, value, position] tuples for every
   * value in the list, in list order.
   */
  entries(): IterableIterator<[index: number, value: T, position: Position]>;

  /** Returns an iterator for values in the list, in list order. */
  values(): IterableIterator<T>;

  /** Returns an iterator for present positions, in list order. */
  positions(): IterableIterator<Position>;

  // Omit keys() since it doesn't seem useful.

  // Convenience mutators

  /**
   * Inserts a value at the end of the list using args.  Equivalent to
   * `this.insert(this.length, ...args)`.
   *
   * @return The inserted value, or undefined if it is not
   * constructed immediately.
   */
  push(...args: InsertArgs): T | undefined;

  // Omit pop because list CRDTs don't really behave like a stack:
  // it's not guaranteed that an element will be popped only once.
  // Likewise for shift.

  /**
   * Inserts a value at the start of the list using args.  Equivalent to
   * `this.insert(0, ...args)`.
   *
   * @return The inserted value, or undefined if it is not
   * constructed immediately.
   */
  unshift(...args: InsertArgs): T | undefined;

  // Convenience accessors

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
   * Returns a copy of a section of this list, as an array.
   * For both start and end, a negative index can be used to indicate an offset from the end of the list.
   * For example, -2 refers to the second to last element of the list.
   * @param start The beginning index of the specified portion of the list.
   * If start is undefined, then the slice begins at index 0.
   * @param end The end index of the specified portion of the list. This is exclusive of the element at the index 'end'.
   * If end is undefined, then the slice extends to the end of the list.
   */
  slice(start?: number, end?: number): T[];

  /**
   * Returns the index of the first occurrence of a value in this list, or -1 if it is not present.
   * @param searchElement The value to locate in this list.
   * @param fromIndex The index to start the search at. If the index is greater than or equal to the list's length, -1 is returned, which means the list will not be searched. If the provided index value is a negative number, it is taken as the offset from the end of the list. Note: if the provided index is negative, the list is still searched from front to back. If the provided index is 0, then the whole list will be searched. Default: 0 (entire list is searched).
   */
  indexOf(searchElement: T, fromIndex?: number): number;
}
