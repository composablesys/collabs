/**
 * Some methods in CMap are copied or modified from methods on
 * JavaScript's Map class, in which case their
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

import { Optional } from "../util/optional";
import { Collab, CollabEvent, CollabEventsRecord } from "../core";

export interface CMapSetEvent<K, V> extends CollabEvent {
  key: K;
  /**
   * Present if there was a value set previously at key.
   */
  previousValue: Optional<V>;
}

export interface CMapDeleteEvent<K, V> extends CollabEvent {
  key: K;
  /**
   * The previously set value at key.
   */
  deletedValue: V;
}

export interface CMapEventsRecord<K, V> extends CollabEventsRecord {
  /**
   * This is emitted not just
   * when the value is set (including if already
   * set and maybe changed) but also when
   * a previously-existing value's key is restored,
   * even if the value object remained the same.
   * It is NOT emitted each time the value mutates
   * internally, if the value is itself a [[Collab]]; for that,
   * add your own event listeners on the value
   * itself in the valueConstructor.
   */
  Set: CMapSetEvent<K, V>;
  Delete: CMapDeleteEvent<K, V>;
}

/**
 * A map from keys K to values V, supporting set and
 * delete with any semantics.
 *
 * Initially, values must be created using the set method.
 * This method inputs SetArgs and sends them to every
 * replica in serialized form; every replica then uses
 * them to contruct the actual set value of type V,
 * e.g., using a user-supplied callback in the constructor.
 * Set keys can later be deleted (and in some implementations,
 * restored), changing
 * their presence in the map, using any semantics to
 * resolve conflicts.
 */
export interface CMap<
  K,
  V,
  SetArgs extends any[] = [V],
  Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
> extends Collab<Events> {
  /**
   * Sends args to every replica in serialized form.
   * Every replica then uses
   * them to contruct the actual set value of type V,
   * which is set as the value at key.
   *
   * @return the set value
   */
  set(key: K, ...args: SetArgs): V;

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
   * Deletes every key in this map.
   */
  clear(): void;

  readonly size: number;

  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any
  ): void;

  /**
   * Returns an iterable of entries in the map.
   *
   * The
   * iteration order is NOT eventually consistent, i.e.,
   * it may differ on replicas with the same state.
   */
  [Symbol.iterator](): IterableIterator<[K, V]>;

  /**
   * Returns an iterable of key, value pairs for every entry in the map.
   *
   * The
   * iteration order is NOT eventually consistent, i.e.,
   * it may differ on replicas with the same state.
   */
  entries(): IterableIterator<[K, V]>;

  /**
   * Returns an iterable of keys in the map.
   *
   * The
   * iteration order is NOT eventually consistent, i.e.,
   * it may differ on replicas with the same state.
   */
  keys(): IterableIterator<K>;

  /**
   * Returns an iterable of values in the map.
   *
   * The iteration order is NOT eventually consistent, i.e.,
   * it may differ on replicas with the same state.
   */
  values(): IterableIterator<V>;

  /**
   * Returns the key of some occurrence of a value in this map, or undefined if the value is not present.
   * The equality semantics for comparing values is
   * implementation-dependent.
   *
   * @param searchElement The value to locate in this map.
   */
  keyOf(searchElement: V): K | undefined;
}
