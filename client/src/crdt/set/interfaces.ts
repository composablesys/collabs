import { Resettable, ResettableEventsRecord } from "../helper_crdts";
import { Crdt, CrdtEvent } from "../core";

// Types based on those for ES6 Maps/Sets/Arrays.
// https://github.com/microsoft/TypeScript/blob/master/src/lib/es2015.collection.d.ts
// https://github.com/microsoft/TypeScript/blob/master/src/lib/es2015.iterable.d.ts

// TODO: deterministic iterator order?

export interface SetEvent<T> extends CrdtEvent {
  value: T;
}

export interface PlainSetEventsRecord<T> extends ResettableEventsRecord {
  Add: SetEvent<T>;
  Delete: SetEvent<T>;
}

// A set of opaque elements, supporting add and delete
// with any semantics.
export interface PlainSet<
  T,
  Events extends PlainSetEventsRecord<T> = PlainSetEventsRecord<T>
> extends Resettable<Events> {
  add(value: T): this;
  /**
   * Delete every value in this set.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  /**
   * Returns whether value was present in the set.
   *
   * TODO: if delete does nothing (violates sequential
   * semantics), should this instead return whether
   * the set changed?  Likewise for deletes in other
   * interfaces.
   */
  delete(value: T): boolean;
  // TODO: forEach
  has(value: T): boolean;
  readonly size: number;

  /** Iterates over values in the set. */
  [Symbol.iterator](): IterableIterator<T>;
  /**
   * Returns an iterable of [v,v] pairs for every value `v` in the set.
   */
  entries(): IterableIterator<[T, T]>;
  /**
   * Despite its name, returns an iterable of the values in the set.
   */
  keys(): IterableIterator<T>;

  /**
   * Returns an iterable of values in the set.
   */
  values(): IterableIterator<T>;
}

// TODO: instead use separate event with name "valueCrdt"
// instead of value?
// TODO: Add vs Restore.  Add seems more general - apply
// to any time an element becomes present, either by
// create or restore.
export interface CrdtSetEventsRecord<C extends Crdt>
  extends ResettableEventsRecord {
  Add: SetEvent<C>;
  Delete: SetEvent<C>;
  /**
   * Emitted when a valueCrdt is constructed.
   * Use this to register event listeners on valueCrdts.
   * Note that this may be called multiple times for the
   * same key (if a valueCrdt is GC'd and then
   * reconstructed), and it may not correspond precisely
   * to Add events.
   */
  ValueInit: SetEvent<C>;
}

// Will give each child a unique id.  In Riak semantics,
// initializer only gets the sender, not arbitrary args like
// in DynamicCrdtSource, since you might need to revive it.
// In Yjs semantics, you can use arbitrary args.
// Methods throw an error if given a Crdt not owned
// by this CrdtSet.
export interface CrdtSet<
  C extends Crdt,
  Events extends CrdtSetEventsRecord<C> = CrdtSetEventsRecord<C>
> extends Resettable<Events> {
  create(): C;
  restore(valueCrdt: C): this;
  /**
   * Delete every value in this set.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  delete(valueCrdt: C): boolean;

  // TODO: forEach (w/ or w/o concurrently added)

  /**
   * Returns true if valueCrdt is owned by this CrdtSet,
   * i.e., it resulted from a create operation on this.
   */
  owns(valueCrdt: C): boolean;
  has(valueCrdt: C): boolean;
  readonly size: number;

  /** Iterates over value Crdts in the set. */
  [Symbol.iterator](): IterableIterator<C>;
  /**
   * Returns an iterable of [c,c] pairs for every value Crdt `c` in the set.
   */
  entries(): IterableIterator<[C, C]>;
  /**
   * Despite its name, returns an iterable of the value Crdts in the set.
   */
  keys(): IterableIterator<C>;

  /**
   * Returns an iterable of value Crdts in the set.
   * TODO: rename valueCrdts?  (Likewise in LazyCrdtMap etc.)
   */
  values(): IterableIterator<C>;
}
