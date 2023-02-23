/**
 * Some methods in IMap are copied or modified from methods on
 * JavaScript's Map class, in which case their
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
import { Optional } from "../util/optional";

/**
 * Event emitted by an [[IMap]]`<K, V>` implementation
 * when a key-value pair is set.
 */
export interface MapSetEvent<K, V> extends CollabEvent {
  key: K;
  value: V;
  /**
   * An [[Optional]] of the previous value at [[key]].
   *
   * Empty if the key was previously not present.
   */
  previousValue: Optional<V>;
}

/**
 * Event emitted by an [[IMap]]`<K, V>` implementation
 * when a key-value pair is deleted.
 */
export interface MapDeleteEvent<K, V> extends CollabEvent {
  key: K;
  /**
   * The previous value at key.
   */
  value: V;
}

/**
 * Base events record for an [[IMap]]`<K, V>` implementation.
 */
export interface MapEventsRecord<K, V> extends CollabEventsRecord {
  /**
   * Emitted when a key's value is set,
   * i.e., it changes or goes from "not present"
   * to "present".
   *
   * Note: If the value is itself a mutable
   * [[Collab]], this event is NOT emitted
   * each time the value mutates internally.
   * To detect such changes, instead
   * add your own event listeners on the value
   * when it is constructed (e.g., in [[CMap]]'s
   * `valueConstructor` constructor arg).
   */
  Set: MapSetEvent<K, V>;
  /**
   * Emitted when a key's value is deleted, i.e.,
   * the key goes from "present" to "not present".
   */
  Delete: MapDeleteEvent<K, V>;
}

/**
 * Interface for a collaborative map with keys of
 * type K and values of type V.
 *
 * For implementations, see [[CMap]], [[CValueMap]],
 * and [[CLazyMap]].
 *
 * An `IMap<K, V>` represents a `Map<K, V>` and has
 * similar methods. Any semantics can be used to resolve
 * conflicting [[set]] and [[delete]] calls on the same key.
 *
 * This interface permits [[set]] to accept arbitrary
 * `SetArgs` instead of just the value to set.
 * That is useful
 * when the value is not serializable, e.g., a dynamically-
 * created [[Collab]].
 *
 * @typeParam K The key type.
 * @typeParam V The value type.
 * @typeParam SetArgs The type of arguments to [[set]].
 * Defaults to `[V]`, i.e., set inputs the actual value.
 * @typeParam Events Events record.
 */
export interface IMap<
  K,
  V,
  SetArgs extends unknown[] = [V],
  Events extends MapEventsRecord<K, V> = MapEventsRecord<K, V>
> extends Collab<Events> {
  /**
   * Sets the value at key using args.
   *
   * Typically, args are broadcast to all replicas
   * in serialized form. Every replica then uses
   * them to contruct the actual value of type V.
   *
   * @return The set value, or undefined if it is not
   * constructed immediately.
   */
  set(key: K, ...args: SetArgs): V | undefined;

  /**
   * Deletes the given key, making it no longer present
   * in this map.
   */
  delete(key: K): void;

  /**
   * Returns the value associated to key, or undefined if
   * key is not present.
   */
  get(key: K): V | undefined;

  /**
   * Returns whether key is present in the map.
   */
  has(key: K): boolean;

  /**
   * Deletes every key in the map.
   */
  clear(): void;

  /**
   * The number of present keys in the map.
   */
  readonly size: number;

  /**
   * Executes a provided function once for each (key, value) pair in
   * the map, in the same order as [[entries]].
   *
   * @param callbackfn Function to execute for each value.
   * Its arguments are the value, key, and this map.
   * @param thisArg Value to use as `this` when executing `callbackfn`.
   */
  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any //eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;

  /**
   * Returns an iterator for entries in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  [Symbol.iterator](): IterableIterator<[K, V]>;

  /**
   * Returns an iterator of key, value pairs for every entry in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  entries(): IterableIterator<[K, V]>;

  /**
   * Returns an iterator for keys in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  keys(): IterableIterator<K>;

  /**
   * Returns an iterator for values in the map.
   *
   * The iteration order is NOT eventually consistent:
   * it may differ on replicas with the same state.
   */
  values(): IterableIterator<V>;

  /**
   * Returns the key for some occurrence of a value
   * `searchElement` in
   * this map, or undefined if `searchElement` is not
   * associated with any key.
   *
   * @param searchElement The value to locate in this map.
   */
  keyOf(searchElement: V): K | undefined;
}
