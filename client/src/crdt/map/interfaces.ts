import { Resettable, ResettableEventsRecord } from "../helper_crdts";
import { Crdt, CrdtEvent } from "../core";

export interface MapKeyEvent<K> extends CrdtEvent {
  key: K;
}

export interface MapEvent<K, V> extends CrdtEvent {
  key: K;
  value: V;
}

export interface PlainMapEventsRecord<K> extends ResettableEventsRecord {
  // TODO: also include value?  You can get it from the map
  // though.
  Set: MapKeyEvent<K>;
  KeyDelete: MapKeyEvent<K>;
}

// A map from keys to opaque values, with (any) register
// semantics for values.
export interface PlainMap<
  K,
  V,
  Events extends PlainMapEventsRecord<K> = PlainMapEventsRecord<K>
> extends Resettable<Events> {
  /**
   * Delete every key in this map.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  delete(key: K): boolean;
  // TODO: forEach

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

/**
 * Note that this doesn't extend CrdtEvent, because
 * values may be initialized independently of
 * message delivery, in which case there is
 * no associated timestamp.
 */
export interface MapInitEvent<K, C extends Crdt> {
  key: K;
  value: C;
}

export interface CrdtMapEventsRecord<K, C extends Crdt>
  extends ResettableEventsRecord {
  KeyAdd: MapKeyEvent<K>;
  KeyDelete: MapKeyEvent<K>;
  /**
   * Emitted when a valueCrdt is constructed.
   * Use this to register event listeners on valueCrdts.
   * Note that this may be called multiple times for the
   * same key (if a valueCrdt is GC'd and then
   * reconstructed), and it may not correspond precisely
   * to KeyAdd events.
   */
  ValueInit: MapInitEvent<K, C>;
}

// TODO: same as Map above, but with values controlled
// by implicitly-initialized Crdt's.  Any semantics.
export interface CrdtMap<
  K,
  C extends Crdt,
  Events extends CrdtMapEventsRecord<K, C> = CrdtMapEventsRecord<K, C>
> extends Resettable<Events> {
  /**
   * Delete every key in this map.
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
  hasValue(valueCrdt: C): boolean;
  // TODO: require sequential semantics, so that addKey
  // followed by get! is always safe?
  // Necessary for some situations, e.g., RegisterPlainMap.
  // Perhaps put as restrictions there, instead of general
  // contracts, since they can be rather subtle.
  addKey(key: K): this;
  /**
   * Returns valueCrdt's key.
   *
   * Works even if the key is currently not present.
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
