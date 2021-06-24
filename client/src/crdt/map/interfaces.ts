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
  Set: MapKeyEvent<K>;
  KeyDelete: MapKeyEvent<K>;
}

/**
 * A map from keys to opaque values, with (any) register
 * semantics for values.
 */
export interface PlainMap<
  K,
  V,
  Events extends PlainMapEventsRecord<K> = PlainMapEventsRecord<K>
> extends Resettable<Events>,
    Map<K, V> {
  /**
   * Delete every key in this map.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
  readonly size: number;

  forEach(
    callbackfn: (value: V, key: K, map: this) => void,
    thisArg?: any
  ): void;

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

  readonly [Symbol.toStringTag]: string;
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

/**
 * A map from keys K to value Crdts of type C, representing a map from keys K to
 * mutable values of the type represented by C.
 *
 * Value Crdts created externally cannot be set in
 * a CrdtMap; instead, their key must be made present
 * in the map using addKey (possibly on another replica),
 * then they must be obtained by calling get(key),
 * after which they can be mutated into
 * the desired state.  All methods except owns throw an error if
 * called with a value Crdt that is not owned by this CrdtSet,
 * i.e., it resulted from a create operation on this.
 *
 * Keys can still be deleted and added.  That affects
 * their membership in the map, as indicated by has() and
 * the iterators, but their valueCrdts will always remain owned by this map.
 */
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

  /**
   * Returns the value Crdt for the given key, or
   * undefined if key is not present.
   */
  get(key: K): C | undefined;
  /**
   * Returns true if valueCrdt is owned by this CrdtMap,
   * i.e., it is one of this map's value Crdts.
   */
  owns(valueCrdt: C): boolean;
  has(key: K): boolean;
  hasValue(valueCrdt: C): boolean;
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
