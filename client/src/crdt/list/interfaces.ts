import { Crdt, CrdtEvent } from "../core";
import { Resettable, ResettableEventsRecord } from "../helper_crdts";

export interface ListEvent<T> extends CrdtEvent {
  index: number;
  value: T;
}

export interface ListIndexEvent extends CrdtEvent {
  index: number;
}

export interface PlainListEventsRecord extends ResettableEventsRecord {
  Insert: ListIndexEvent;
  /**
   * Index gives the former index (immediately before
   * deleting).
   */
  Delete: ListIndexEvent;
}

/**
 * A list of plain values of type T, supporting insert and
 * delete with any semantics.
 */
export interface PlainList<
  T,
  Events extends PlainListEventsRecord = PlainListEventsRecord
> extends Resettable<Events> {
  /**
   * Delete every index in this set.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  /**
   * Insert value at the given index.  The value currently
   * at index and all later values are shifted one
   * to the right.
   *
   * index can be in the range [0, this.length]; this.length
   * appends it to the end of the list.
   */
  insert(index: number, value: T): this;
  /**
   * Insert values starting at the given index.
   * Afterwards, values[0] will be at startIndex, values[1]
   * will be at startIndex + 1, etc.
   */
  insertRange(startIndex: number, ...values: T[]): this;
  /**
   * Deletes the value at index.  All later values are
   * shifted one to the left.
   *
   * @return the deleted value
   */
  delete(index: number): T;
  /**
   * Deletes range [fromIndex, toIndex).
   *
   * @return an array of the deleted values
   */
  deleteRange(fromIndex: number, toIndex: number): T[];
  /**
   * Return the value at index.  If index is out of bounds,
   * an error is thrown; this differs from an ordinary Array,
   * which would instead return undefined.
   */
  get(index: number): T;
  /**
   * Sets index to the given value.  index must be in bounds
   * (between [0, this.length)); if you want to set a value
   * after the current end of the list, using insert instead.
   */
  set(index: number, value: T): this;
  /**
   * Move the value at fromIndex to toIndex.
   * Depending on the implementation's semantics,
   * concurrent moves of the same value might
   * duplicate the value at each destination, or they
   * might move the value to a single destination chosen
   * by some arbitration rule.
   *
   * toIndex is evaluated before removing fromIndex
   * and is used the same as the insertion index.
   * So it'll end up at toIndex - 1 if fromIndex < toIndex,
   * else toIndex.
   *
   * @param  fromIndex [description]
   * @param  toIndex   [description]
   * @return           [description]
   */
  move(fromIndex: number, toIndex: number): void;
  readonly length: number;

  /** Returns an iterable of values in the list. */
  [Symbol.iterator](): IterableIterator<T>;
  /** Returns an iterable of [index,entry] pairs for every entry in the list.
   */
  entries(): IterableIterator<[number, T]>;
  /**
   * Returns an iterable of values in the list.
   */
  values(): IterableIterator<T>;
  /**
   * Returns an iterable of indices in the list.
   */
  keys(): IterableIterator<number>;
}

/**
 * Note that this doesn't extend CrdtEvent, because
 * values may be initialized independently of
 * message delivery, in which case there is
 * no associated timestamp.
 */
export interface ListInitEvent<C extends Crdt> {
  index: number;
  value: C;
}

export interface ListMoveEvent extends CrdtEvent {
  /**
   * The index where the moved element started
   * _on this replica_.
   * Will equal fromIndex on the sending replica, but maybe
   * not on other replicas.
   */
  oldIndex: number;
  /**
   * The index where the moved element ended (is currently).
   * Might not equal toIndex even on the sender,
   * in case fromIndex < toIndex (then it is toIndex - 1).
   */
  newIndex: number;
}

export interface CrdtListEventsRecord<C extends Crdt>
  extends ResettableEventsRecord {
  Insert: ListIndexEvent;
  /**
   * Index gives the former index (immediately before
   * deleting).
   */
  Delete: ListIndexEvent;
  Move: ListMoveEvent;
  /**
   * Emitted when a valueCrdt is constructed.
   * Use this to register event listeners on valueCrdts.
   * Note that this may be called multiple times for the
   * same conceptual value (if a valueCrdt is GC'd and then
   * reconstructed), and it may not correspond precisely
   * to Insert events.
   */
  ValueInit: ListInitEvent<C>;
}

/**
 * A list of value Crdts of type C, representing a list of
 * mutable values of the type represented by C.
 *
 * Value Crdts created externally cannot be added to
 * a CrdtList; instead, they must be created (on some replica)
 * by calling insert (or insertRange), after which they can be mutated into
 * the desired state.  All methods except owns throw an error if
 * called with a value Crdt that is not owned by this CrdtSet,
 * i.e., it resulted from a insert operation on this.
 *
 * Value Crdts can still be deleted and restored.  That affects
 * their membership in the list, as indicated by indices,
 * has(), and
 * the iterators, but they will always remain owned by this list.
 */
export interface CrdtList<
  C extends Crdt,
  InsertArgs extends any[] = [],
  Events extends CrdtListEventsRecord<C> = CrdtListEventsRecord<C>
> extends Resettable<Events> {
  /**
   * Create a new value Crdt and insert it into the list
   * at index.
   * Typically, this will call a user-supplied
   * valueCrdtConstructor with the given args.
   *
   * The value Crdt currently
   * at index and all later value Crdts are shifted one
   * to the right.
   *
   * index can be in the range [0, this.length]; this.length
   * appends it to the end of the list.
   *
   * @return the created value Crdt
   */
  insert(index: number, ...args: InsertArgs): C;
  /**
   * Insert value Crdts starting at the given index.
   * Afterwards, the value Crdt constructed using
   * argsArrays[0] will be at startIndex, the one using
   * argsArrays[1] will be at startIndex + 1, etc.
   *
   * @return an array of the created value Crdts
   */
  insertRange(startIndex: number, ...argsArrays: InsertArgs[]): C[];
  /**
   * Makes valueCrdt present in the list.
   *
   * This method can be used to restore deleted elements, but
   * it cannot add new elements to the list.
   *
   * @return valueCrdt's index in the list after being restored
   */
  restore(valueCrdt: C): number;
  /**
   * Deletes the value Crdt at index.  All later value Crdts are
   * shifted one to the left.
   *
   * @return the deleted value Crdt
   */
  delete(index: number): C;

  /**
   * Deletes range [fromIndex, toIndex).
   *
   * @return an array of the deleted value Crdts
   */
  deleteRange(fromIndex: number, toIndex: number): C[];

  /**
   * Moves the valueCrdt at fromIndex to toIndex.
   *
   * toIndex is evaluated before removing fromIndex
   * and is used the same as the insertion index.
   * So it'll end up at toIndex - 1 if fromIndex < toIndex,
   * else toIndex.
   */
  move(fromIndex: number, toIndex: number): void;

  get(index: number): C;
  /**
   * @return the index of valueCrdt, or
   * undefined if this.has(valueCrdt) is false
   */
  indexOf(valueCrdt: C): number | undefined;
  /**
   * Returns true if valueCrdt is owned by this CrdtList,
   * i.e., it resulted from an insert operation on this.
   */
  owns(valueCrdt: C): boolean;
  /**
   * Returns whether valueCrdt is currently present in
   * the list, i.e., it has an index.
   */
  has(valueCrdt: C): boolean;
  /**
   * Delete every value in this list.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  readonly length: number;

  /** Returns an iterable of value Crdts in the list. */
  [Symbol.iterator](): IterableIterator<C>;
  /** Returns an iterable of [index,entry] pairs for every entry in the list.
   */
  entries(): IterableIterator<[number, C]>;
  /**
   * Returns an iterable of value Crdts in the list.
   */
  values(): IterableIterator<C>;
  /**
   * Returns an iterable of indices in the list.
   */
  keys(): IterableIterator<number>;
}
