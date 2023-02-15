import { Collab } from "../core";
// Import CObject and CPrimitive from their specific files;
// with whole-folder imports, AbstractCMapCObject and CLazyMap
// create a circular dependency between constructions
// and data_types.
import { CObject } from "../constructions/c_object";
import { CPrimitive } from "../constructions/c_primitive";
import { IMap, MapEventsRecord } from "./i_map";

// See MakeAbstractMap for the rationale behind this file.

/**
 * Abstract [[IMap]] with some default method implementations,
 * as a subclass of [[Collab]].
 */
export declare abstract class AbstractMap_Collab<
    K,
    V,
    SetArgs extends unknown[] = [V],
    Events extends MapEventsRecord<K, V> = MapEventsRecord<K, V>
  >
  extends Collab<Events>
  implements IMap<K, V, SetArgs, Events>
{
  clear(): void;
  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  toString(): string;
  keyOf(searchElement: V): K | undefined;

  abstract set(key: K, ...args: SetArgs): V | undefined;
  abstract delete(key: K): void;
  abstract get(key: K): V | undefined;
  abstract has(key: K): boolean;
  abstract entries(): IterableIterator<[K, V]>;
  abstract readonly size: number;
}

/**
 * Abstract [[IMap]] with some default method implementations,
 * as a subclass of [[CObject]].
 */
export declare abstract class AbstractMap_CObject<
    K,
    V,
    SetArgs extends unknown[] = [V],
    Events extends MapEventsRecord<K, V> = MapEventsRecord<K, V>
  >
  extends CObject<Events>
  implements IMap<K, V, SetArgs, Events>
{
  clear(): void;
  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  toString(): string;
  keyOf(searchElement: V): K | undefined;

  abstract set(key: K, ...args: SetArgs): V | undefined;
  abstract delete(key: K): void;
  abstract get(key: K): V | undefined;
  abstract has(key: K): boolean;
  abstract entries(): IterableIterator<[K, V]>;
  abstract readonly size: number;
}

/**
 * Abstract [[IMap]] with some default method implementations,
 * as a subclass of [[CPrimitive]].
 */
export declare abstract class AbstractMap_CPrimitive<
    K,
    V,
    SetArgs extends unknown[] = [V],
    Events extends MapEventsRecord<K, V> = MapEventsRecord<K, V>
  >
  extends CPrimitive<Events>
  implements IMap<K, V, SetArgs, Events>
{
  clear(): void;
  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ): void;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  keys(): IterableIterator<K>;
  values(): IterableIterator<V>;
  toString(): string;
  keyOf(searchElement: V): K | undefined;

  abstract set(key: K, ...args: SetArgs): V | undefined;
  abstract delete(key: K): void;
  abstract get(key: K): V | undefined;
  abstract has(key: K): boolean;
  abstract entries(): IterableIterator<[K, V]>;
  abstract readonly size: number;
}
