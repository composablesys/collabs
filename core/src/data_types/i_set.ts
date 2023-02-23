/**
 * Some methods in ISet are copied or modified from methods on
 * JavaScript's Set class, in which case their
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

/**
 * Event emitted by an [[ISet]]`<T>` implementation
 * when a value is added or deleted.
 */
export interface SetEvent<T> extends CollabEvent {
  /**
   * The affected value.
   */
  value: T;
}

/**
 * Base events record for an [[ISet]]`<T>` implementation.
 */
export interface SetEventsRecord<T> extends CollabEventsRecord {
  /**
   * Emitted when a value is added, i.e., goes
   * from "not present" to "present".
   */
  Add: SetEvent<T>;
  /**
   * Emitted when a value is deleted, i.e., goes
   * from "present" to "not present".
   */
  Delete: SetEvent<T>;
}

/**
 * Interface for a collaborative set with values
 * of type T.
 *
 * For implementations, see [[CSet]] and [[CValueSet]].
 *
 * An `ISet<T>` represents a `Set<T>` and has similar
 * methods. If conflicting [[add]] and [[delete]] calls
 * on the same value are possible, then any semantics
 * can be used to resolve them.
 *
 * This interface permits [[add]] to accept arbitrary
 * `AddArgs` instead of just the value to set.
 * That is useful
 * when the value is not serializable, e.g., a dynamically-
 * created [[Collab]].
 *
 * @typeParam T The value type.
 * @typeParam AddArgs The type of arguments to [[add]].
 * Defaults to `[T]`, i.e., add inputs the actual value.
 * @typeParam Events Events record.
 */
export interface ISet<
  T,
  AddArgs extends unknown[] = [T],
  Events extends SetEventsRecord<T> = SetEventsRecord<T>
> extends Collab<Events> {
  /**
   * Adds a value to the set using args.
   *
   * Typically, args are broadcast to all replicas
   * in serialized form. Every replica then uses
   * them to contruct the actual value of type T.
   *
   * @return The added value, or undefined if it is not
   * constructed immediately.
   */
  add(...args: AddArgs): T | undefined;

  /**
   * Deletes the given value, making it no longer present
   * in this set.
   */
  delete(value: T): void;

  /**
   * Returns whether value is present in the set.
   */
  has(value: T): boolean;

  /**
   * Deletes every value in the set.
   */
  clear(): void;

  /**
   * The number of values in the set.
   */
  readonly size: number;

  /**
   * Executes a provided function once for each value in
   * the set, in the same order as [[values]].
   *
   * @param callbackfn Function to execute for each value.
   * Its arguments are the value twice, then this set.
   * @param thisArg Value to use as `this` when executing `callbackfn`.
   */
  forEach(
    callbackfn: (value: T, value2: T, set: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;

  /**
   * Returns an iterator for values in the set.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  [Symbol.iterator](): IterableIterator<T>;

  /**
   * Returns an iterator for values in the set.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  values(): IterableIterator<T>;
}
