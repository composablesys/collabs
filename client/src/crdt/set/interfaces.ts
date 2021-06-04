// TODO: another difference between P and C versions:
// value mutability.  For P, should either be primitives
// or immutable objects; for C, can edit object in-place.

import { Resettable } from "../composers/resettable";
import { Crdt } from "../core/crdt";

// TODO: deterministic iterator order?

// A set of opaque elements, supporting add and remove
// with any semantics.
export interface PlainSet<T> extends Crdt, Resettable {
  add(value: T): this;
  /**
   * Delete every value in this set.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
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

// Will give each child a unique id.  In Riak semantics,
// initializer only gets the sender, not arbitrary args like
// in DynamicCrdtSource, since you might need to revive it.
// In Yjs semantics, you can use arbitrary args.
// Methods throw an error if given a Crdt not owned
// by this CrdtSet.
export interface CrdtSet<C extends Crdt> extends Crdt, Resettable {
  create(): C;
  restore(valueCrdt: C): this;
  /** Alias for reset(). */
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
