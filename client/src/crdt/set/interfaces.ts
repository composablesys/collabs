import { Crdt, CrdtEvent, CrdtEventsRecord } from "../core";

export interface CSetEvent<T> extends CrdtEvent {
  value: T;
}

export interface CSetEventsRecord<T> extends CrdtEventsRecord {
  Add: CSetEvent<T>;
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
