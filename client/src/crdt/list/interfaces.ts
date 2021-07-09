import { Crdt, CrdtEvent, CrdtEventsRecord } from "../core";

export interface CSeqIndexEvent extends CrdtEvent {
  index: number;
}

/**
 * Note that this doesn't extend CrdtEvent, because
 * values may be initialized independently of
 * message delivery, in which case there is
 * no associated timestamp.
 */
export interface CSeqInitEvent<T> {
  index: number;
  value: T;
}

export interface CSeqEventsRecord<T> extends CrdtEventsRecord {
  Insert: CSeqIndexEvent;
  /**
   * Index gives the former index (immediately before
   * deleting).
   */
  Delete: CSeqIndexEvent;
  /**
   * TODO: should this be included by default, or just
   * added by implementations for which it makes sense
   * (currently just CrdtList-like implementations)?
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
  ValueInit: CSeqInitEvent<T>;
}

/**
 * A sequence of plain values of type T, supporting insert and
 * delete with any semantics.
 *
 * Initially, values must be added using the insert method
 * (TODO: or its aliases?).
 * This method inputs InsertArgs and sends them to every
 * replica in serialized form; every replica then uses
 * them to contruct the actual added value of type T,
 * e.g., using a user-supplied callback in the constructor.
 * Added values can later be deleted and (in some implementations)
 * restored, changing
 * their presence in the sequence, using any semantics to
 * resolve conflicts.
 *
 * TODO: document exceptions (range errors)
 */
export interface CSeq<
  T,
  InsertArgs extends any[],
  Events extends CSeqEventsRecord<T> = CSeqEventsRecord<T>
> extends Crdt<Events> {
  // TODO: Args type name.  Perhaps unified CreateArgs for
  // all collections?

  /**
   * Insert value at the given index.  The value currently
   * at index and all later values are shifted one
   * to the right.
   *
   * index can be in the range [0, this.length]; this.length
   * appends it to the end of the sequence.
   *
   * @return the inserted value
   */
  insert(index: number, ...args: InsertArgs): T;

  // Omitting since it needs to have different arguments
  // on different implementations (list of elements vs
  // list of args arrays vs count).
  // /**
  //  * Insert values starting at the given index.
  //  * Afterwards, values[0] will be at startIndex, values[1]
  //  * will be at startIndex + 1, etc.
  //  */
  // insertRange(startIndex: number, ...values: T[]): this;

  /**
   * Deletes count values starting at index (inclusive).
   * All later values are
   * shifted count to the left.
   *
   * count is optional and defaults to 1, i.e., delete(index)
   * just deletes the value at index.
   *
   * TODO: the closest JS analog, Array.splice, calls
   * the params "start" and "deleteCount" instead.  But
   * I like "index" and "count" better.
   *
   * TODO: return the deleted value(s)?  Might reduce efficiency,
   * and users can always work around it (get then delete).
   * Also necessitates splitting this into delete and
   * deleteRange (different return values).
   */
  delete(index: number, count?: number): void;

  // TODO: equivalents/aliases to insert/delete?
  // Array includes a bunch:
  // - push (insert at end) -> my favorite
  // - pop (delete at end) -> also potentially useful (typing seq.length - 1 all the time is annoying)
  // - unshift (insert at front) -> just use insert(0)
  // - shift (delete at end) -> just use delete(0)
  // - splice (bulk insert and bulk delete at once, or one or the other) -> who's idea was this?

  /**
   * Return the value at index.  If index is out of bounds,
   * an error is thrown; this differs from an ordinary Array,
   * which would instead return undefined.  (TODO: is this wise?)
   */
  get(index: number): T;

  // TODO: indexOf?  has?  (linear time for PlainLists;
  // useful and constant-time for CrdtLists).

  /**
   * Delete every element in this sequence.
   */
  clear(): void;

  // Aliases
  readonly size: number;
  readonly length: number;

  /** Returns an iterable of values in the sequence, in sequence order. */
  [Symbol.iterator](): IterableIterator<T>;
  /** Returns an iterable of [index, value] pairs for every value in the sequence, in sequence order.
   */
  entries(): IterableIterator<[number, T]>;

  /** Returns an iterable of values in the sequence, in sequence order. */
  values(): IterableIterator<T>;

  /**
   * Returns an iterable of indices in the sequence, in order.
   */
  keys(): IterableIterator<number>;

  // TODO: slice

  // Omitting set and move since they are not the
  // minimum possible; implementations can add them back
  // as needed.
  // /**
  //  * Sets index to the given value.  index must be in bounds
  //  * (between [0, this.length)); if you want to set a value
  //  * after the current end of the seq, using insert instead.
  //  */
  // set(index: number, value: T): this;
}

// TODO: should move have its own interface?  It's fairly
// common and comes with an event, which I'd like to only
// have to define once.

export interface SeqMoveEvent extends CrdtEvent {
  /**
   * The index where the moved element started
   * on this replica.  In general, except on the
   * sending replica, this can be different from fromIndex.
   */
  oldIndex: number;
  /**
   * The index where the moved element ended (is currently).
   * Might not equal toIndex even on the sender,
   * in case fromIndex < toIndex (then it is toIndex - 1).
   * TODO: during a bulk move, can we guarantee this index
   * is the final destination, or will it only hold until
   * the next entry is moved?
   */
  newIndex: number;
}

export interface CMovableSeqEventsRecord<T> extends CSeqEventsRecord<T> {
  /**
   * Emitted when a move (TODO: or moveRange?) operation
   * moves a value.
   */
  Move: SeqMoveEvent;
}

export interface CMovableSeq<
  T,
  InsertArgs extends any[],
  Events extends CSeqEventsRecord<T> = CSeqEventsRecord<T>
> extends CSeq<T, InsertArgs, Events> {
  /**
   * Move the value at fromIndex to toIndex.
   * Concurrent moves of the same value will move the
   * value to a single destination chosen
   * by some arbitration rule.
   *
   * toIndex is evaluated before removing fromIndex
   * and follows the same rules as insertion indices.
   * So the element will end up at toIndex - 1 if fromIndex < toIndex,
   * else toIndex.
   */
  move(fromIndex: number, toIndex: number): void;

  // TODO: moveRange?
}
