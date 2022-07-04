/**
 * Some methods in CSet are copied or modified from methods on
 * JavaScript's Set class, in which case their
 * type annotations and docstrings are copied or modified from
 * those used in TypeScript, found in various files in
 * https://github.com/microsoft/TypeScript/tree/main/src/lib
 * Material from TypeScript
 * bears the following copyright notice:
 *
/*! *****************************************************************************
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

export interface CSetEvent<T> extends CollabEvent {
  value: T;
}

export interface CSetEventsRecord<T> extends CollabEventsRecord {
  /**
   * Only emitted when the value is actually new
   * (was not previously present).
   */
  Add: CSetEvent<T>;
  /**
   * Only emitted when the value is actually deleted
   * (was previously present).
   */
  Delete: CSetEvent<T>;
}

/**
 * A set of values of type T, supporting add and
 * delete with any semantics.
 *
 * Initially, values must be added using the add method.
 * This method inputs AddArgs and sends them to every
 * replica in serialized form; every replica then uses
 * them to contruct the actual added value of type T,
 * e.g., using a user-supplied callback in the constructor.
 * Added values can later be deleted (and in some implementations,
 * restored), changing
 * their presence in the set, using any semantics to
 * resolve conflicts.
 */
export interface CSet<
  T,
  AddArgs extends unknown[] = [T],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
> extends Collab<Events> {
  /**
   * Sends args to every replica in serialized form.
   * Every replica then uses
   * them to contruct the actual added value of type T.
   *
   * @return The added value, or undefined if it is not
   * yet constructed. Implementations that always construct
   * the value immediately should get rid of the "undefined"
   * case.
   */
  add(...args: AddArgs): T | undefined;

  /**
   * Deletes the given value, making it no longer present
   * in this set.
   */
  delete(value: T): void;

  has(value: T): boolean;

  /**
   * Deletes every value in this set.
   */
  clear(): void;

  readonly size: number;

  forEach(
    callbackfn: (value: T, value2: T, set: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;

  /**
   * Returns an iterable of values in the set.
   *
   * The iteration order is NOT eventually consistent, i.e.,
   * it may differ on replicas with the same state.
   */
  [Symbol.iterator](): IterableIterator<T>;

  /**
   * Returns an iterable of values in the set.
   *
   * The iteration order is NOT eventually consistent, i.e.,
   * it may differ on replicas with the same state.
   */
  values(): IterableIterator<T>;
}
