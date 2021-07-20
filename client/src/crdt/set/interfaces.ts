import { Crdt, CrdtEvent, CrdtEventsRecord } from "../core";

export interface CSetEvent<T> extends CrdtEvent {
  value: T;
}

/**
 * Note that this doesn't extend CrdtEvent, because
 * values may be initialized independently of
 * operations/message delivery, in which case there is
 * no associated timestamp.
 */
export interface CSetInitEvent<T> {
  value: T;
}

export interface CSetEventsRecord<T> extends CrdtEventsRecord {
  Add: CSetEvent<T>;
  Delete: CSetEvent<T>;
  /**
   * Emitted when a value is constructed.
   * Use this when values are objects and you need to
   * do something with the objects themselves, not just
   * an equal copy.  E.g., registering event listeners
   * on Crdt values.
   *
   * Note that this may be emitted multiple times for the
   * same value (if a value is GC'd and then
   * reconstructed), it may not correspond precisely
   * to Add events, and it may be called independently of
   * operations/message delivery.
   *
   * If you are maintaining a view of a set by tracking Add/Delete
   * events, you don't need to worry about ValueInit events.
   * Specifically, you don't have to worry that one of the
   * values in your view might be GC'd and replaced with
   * a different but equivalent value.  This is because
   * implementations
   * will use WeakRefs to ensure that only reference-free
   * values are GC'd.
   */
  ValueInit: CSetInitEvent<T>;
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
  AddArgs extends any[] = [T],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
> extends Crdt<Events> {
  /**
   * Sends args to every replica in serialized form.
   * Every replica then uses
   * them to contruct the actual added value of type T.
   *
   * @return the added value
   */
  add(...args: AddArgs): T;

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
    thisArg?: any
  ): void;

  /**
   * Iterates over values in the set.
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

  // entries() and keys() are excluded because they are redundant and don't
  // seem useful, even though they are included in the ES6 Set class.
  // /**
  //  * Returns an iterable of [v,v] pairs for every value `v` in the set. Order is not eventually consistent.
  //  */
  // entries(): IterableIterator<[T, T]>;
  //
  // /**
  //  * Despite its name, returns an iterable of the values in the set. Order is not eventually consistent.
  //  */
  // keys(): IterableIterator<T>;

  // Only include this in implementations where it makes sense.
  // /**
  //  * Makes the given value present in the set.
  //  *
  //  * This method can be used to restore deleted elements, but
  //  * it cannot add new elements to the set.
  //  */
  // restore(value: T): this;
}
