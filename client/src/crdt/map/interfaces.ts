// Types based on those for ES6 Maps/Sets/Arrays.
// https://github.com/microsoft/TypeScript/blob/master/src/lib/es2015.collection.d.ts
// https://github.com/microsoft/TypeScript/blob/master/src/lib/es2015.iterable.d.ts

import { Resettable } from "../composers/resettable";
import { Crdt } from "../core/crdt";

// TODO: events

// A map from keys to opaque values, with (any) register
// semantics for values.
export interface PlainMap<K, V> extends Resettable, Crdt {
  /**
   * Delete every value in this set.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  delete(key: K): boolean;
  // TODO: forEach

  // TODO: require sequential semantics, so that set
  // followed by get! is always safe.
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
  readonly size: number;

  /** Returns an iterable of entries in the map. */
  [Symbol.iterator](): IterableIterator<[K, V]>;

  /**
   * Returns an iterable of key, value pairs for every entry in the map.
   */
  entries(): IterableIterator<[K, V]>;

  /**
   * Returns an iterable of keys in the map
   */
  keys(): IterableIterator<K>;

  /**
   * Returns an iterable of values in the map
   */
  values(): IterableIterator<V>;
}

// TODO: keyOf, etc. methods from LazyCrdtMap

// TODO: same as Map above, but with values controlled
// by implicitly-initialized Crdt's.  Any semantics.
export interface CrdtMap<K, C extends Crdt> extends Resettable, Crdt {
  /**
   * Delete every value in this set.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  delete(key: K): boolean;
  // TODO: forEach

  get(key: K): C | undefined;
  /**
   * Returns true if valueCrdt is owned by this CrdtMap,
   * i.e., it is one of this map's value Crdt.s
   */
  owns(valueCrdt: C): boolean;
  has(key: K): boolean;
  // TODO: require sequential semantics, so that addKey
  // followed by get! is always safe.
  addKey(key: K): this;
  /**
   * Returns valueCrdt's key.
   */
  keyOf(valueCrdt: C): K;
  readonly size: number;

  /** Returns an iterable of entries in the map. */
  [Symbol.iterator](): IterableIterator<[K, C]>;

  /**
   * Returns an iterable of key, value Crdts pairs for every entry in the map.
   */
  entries(): IterableIterator<[K, C]>;

  /**
   * Returns an iterable of keys in the map
   */
  keys(): IterableIterator<K>;

  /**
   * Returns an iterable of value Crdts in the map
   */
  values(): IterableIterator<C>;
}
