import { Crdt, CrdtEvent } from "../core";
import { Resettable, ResettableEventsRecord } from "../helper_crdts";

export interface ListEvent<V> extends CrdtEvent {
  index: number;
  value: V;
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

export interface PlainList<
  V,
  Events extends PlainListEventsRecord = PlainListEventsRecord
> extends Resettable<Events> {
  /**
   * Delete every index in this set, i.e.,
   * deleteRange(0, this.length).
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  insert(index: number, value: V): this;
  insertRange(startIndex: number, ...values: V[]): this;
  // TODO: return the deleted value?  Could be weird if
  // value is no longer usable.  Deleted boolean seems
  // inappropriate because it will always be true.
  delete(index: number): void;
  /**
   * Deletes range [fromIndex, toIndex).
   * @param fromIndex [description]
   * @param toIndex   [description]
   */
  deleteRange(fromIndex: number, toIndex: number): void;
  // Not naming at() because there is an experimental
  // Array.at that acts differently (e.g. allowing negative
  // indices).
  get(index: number): V;
  // Optional?  Or non-supporting implementations just do
  // delete-then-insert?
  set(index: number, value: V): this;
  /**
   * TODO: include this?  If so: optional?  Default to
   * delete & insert semantics?  Sub-interface?
   *
   * toIndex is evaluated before removing fromIndex
   * and is used the same as the insertion index.
   * So it'll end up at toIndex - 1 if fromIndex < toIndex,
   * else toIndex.
   * @param  fromIndex [description]
   * @param  toIndex   [description]
   * @return           [description]
   */
  move(fromIndex: number, toIndex: number): void;
  readonly length: number;

  // TODO: convenience aliases like push, etc.?  (Array has
  // a bunch.)

  /** Returns an iterable of values in the list. */
  [Symbol.iterator](): IterableIterator<V>;
  /** Returns an iterable of [index,entry] pairs for every entry in the list.
   */
  entries(): IterableIterator<[number, V]>;
  /**
   * Returns an iterable of values in the list.
   */
  values(): IterableIterator<V>;
  /**
   * Returns an iterable of indices in the list.
   */
  keys(): IterableIterator<number>;

  // TODO: slice method (returning an array)?
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

export interface CrdtListEventsRecord<C extends Crdt>
  extends ResettableEventsRecord {
  // TODO: also include value?  You can get it from the list
  // though.
  Insert: ListIndexEvent;
  /**
   * Index gives the former index (immediately before
   * deleting).
   */
  Delete: ListIndexEvent;
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

export interface CrdtList<
  C extends Crdt,
  CreateArgs extends any[] = [],
  Events extends CrdtListEventsRecord<C> = CrdtListEventsRecord<C>
> extends Resettable<Events> {
  insert(index: number, ...args: CreateArgs): C;
  /**
   * [restore description]
   * @param  valueCrdt [description]
   * @return the restored index.  TODO: remove this return
   * value from restore in the sets/maps, for consistency.
   */
  restore(valueCrdt: C): number;
  // TODO: return the deleted value?  Could be weird if
  // value is no longer usable.  Deleted boolean seems
  // inappropriate because it will always be true.
  delete(index: number): void;
  /**
   * Deletes range [fromIndex, toIndex).
   * @param fromIndex [description]
   * @param toIndex   [description]
   */
  deleteRange(fromIndex: number, toIndex: number): void;
  // TODO: convenience aliases like push, etc.?  (Array has
  // a bunch.)

  // Not naming at() because there is an experimental
  // Array.at that acts differently (e.g. allowing negative
  // indices).
  get(index: number): C;
  /**
   * [indexOf description]
   * @param  valueCrdt [description]
   * @return undefined if this.has(valueCrdt) is false
   */
  indexOf(valueCrdt: C): number | undefined;
  /**
   * Returns true if valueCrdt is owned by this CrdtList,
   * i.e., it resulted from an insert operation on this.
   */
  owns(valueCrdt: C): boolean;
  has(valueCrdt: C): boolean;
  /**
   * Delete every value in this list, i.e.,
   * deleteRange(0, this.length).
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  // TODO: size instead?
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

  // TODO: slice method (returning an array)?
}

// TODO: include value?
export interface ListMoveEvent extends CrdtEvent {
  /**
   * The index where it started on this replica.
   * Will equal fromIndex on the sender, but maybe
   * not on other replicas.
   */
  oldIndex: number;
  /**
   * The index where it ended (is currently).
   * Might not equal toIndex even on the sender,
   * in case fromIndex < toIndex (then it is toIndex - 1).
   */
  newIndex: number;
}

export interface CrdtMovableListEventsRecord<C extends Crdt>
  extends CrdtListEventsRecord<C> {
  Move: ListMoveEvent;
}

// TODO: CrdtMovableList or MovableCrdtList?
// Or, separate Movable interface that works for both
// (not extending anything)?
export interface CrdtMovableList<
  C extends Crdt,
  CreateArgs extends any[] = [],
  Events extends CrdtMovableListEventsRecord<C> = CrdtMovableListEventsRecord<C>
> extends CrdtList<C, CreateArgs, Events> {
  /**
   * toIndex is evaluated before removing fromIndex
   * and is used the same as the insertion index.
   * So it'll end up at toIndex - 1 if fromIndex < toIndex,
   * else toIndex.
   */
  move(fromIndex: number, toIndex: number): void;
  // TODO: moveValue?  Usually, can just use indexOf to
  // get a fromIndex; but it could be useful as a combined
  // restore-then-move op, or for weird cases like dangling
  // values.
}
