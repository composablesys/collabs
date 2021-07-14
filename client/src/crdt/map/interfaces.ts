import { Crdt, CrdtEvent, CrdtEventsRecord } from "../core";

export interface CMapEvent<K> extends CrdtEvent {
  key: K;
}

/**
 * Note that this doesn't extend CrdtEvent, because
 * values may be initialized independently of
 * operations/message delivery, in which case there is
 * no associated timestamp.
 */
export interface CMapInitEvent<K, V> {
  key: K;
  value: V;
}

export interface CMapEventsRecord<K, V> extends CrdtEventsRecord {
  Set: CMapEvent<K>;
  Delete: CMapEvent<K>;
  /**
   * TODO: should this be included by default, or just
   * added by implementations for which it makes sense
   * (currently just CrdtSet-like implementations)?
   *
   * Emitted when a value is constructed.
   * Use this when values are objects and you need to
   * do something with the objects themselves, not just
   * an equal copy.  E.g., registering event listeners
   * on Crdt values.
   *
   * Note that this may be called multiple times for the
   * same value (if a value is GC'd and then
   * reconstructed), it may not correspond precisely
   * to Add events, and it may be called independently of
   * operations/message delivery.
   */
  ValueInit: CMapInitEvent<K, V>;
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
 * Set keys can later be deleted and (in some implementations)
 * restored, changing
 * their presence in the map, using any semantics to
 * resolve conflicts.
 */
export interface CMap<
  K,
  V,
  SetArgs extends any[],
  Events extends CMapEventsRecord<K, V> = CMapEventsRecord<K, V>
> extends Crdt<Events> {
  /**
   * Sends args to every replica in serialized form.
   * Every replica then uses
   * them to contruct the actual set value of type V,
   * which is set as the value at key
   *
   * @return the set value
   */
  set(key: K, ...args: SetArgs): V;

  /**
   * Returns whether key was deleted.  May be false either
   * because value was not present, or because the semantics
   * did not delete value.
   */
  delete(key: K): boolean;

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

  /**
   * Returns the key of some occurrence of a value in this map, or undefined if it is not present.
   * TODO: can we enforce search start and order like
   * for indexOf?  In case you want to get all keys for
   * a value (although in that case you can just loop over
   * it yourself, or convert to an array and then use Array.find).
   * This method is really just targetted
   * at the implementations with unique values, for which this
   * operation is O(1), so should it be included (TODO)?
   * @param searchElement The value to locate in this map.
   */
  keyOf(searchElement: V): K | undefined;
}
