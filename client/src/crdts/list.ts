import { Crdt } from "./crdt_core";
import { Resettable } from "./mixins";

/**
 * A list whose elements are atoms, i.e.,
 * immutable values (although they may be references
 * to mutable values).  Elements can be
 * inserted at a given position or deleted,
 * but not modified in-place.
 *
 * In case of concurrent insertions, they may
 * be arbitrarily ordered with respect to each
 * other, but they will always be ordered properly
 * with respect to elements that existed at
 * their time of insertion.
 *
 * TODO: a way to get permanent ids for list locations,
 * which you can use to access an element even if
 * it moves due to other operations?
 *
 * TODO: way to undelete an entry (besides concurrent
 * ops)?
 *
 * @type T the type of list elements
 */
export interface IAtomicList<T> extends Crdt {
  /**
   * Get the element at the given index in
   * the current list.  Note that elements
   * may move from their original positions
   * due to insertions or deletions at lesser
   * indices.
   *
   * @param  index [description]
   * @return       [description]
   */
  get(index: number): T;

  /**
   * Delete the element at the given index in
   * the current list.  Later elements are
   * shifted left.
   *
   * Once an element is deleted by any replica,
   * it is deleted permanently; there is no possibility
   * for an "insert-wins" semantics because insertions
   * are unique.
   *
   * @param index [description]
   */
  delete(index: number): void;

  /**
   * Insert the given elements starting at the
   * given index.  Existing elements
   * at index or later are shifted right.
   *
   * Index may be in the range
   * [0, this.length].  If it equals this.length,
   * the elements are appended to the end of the list.
   * @param index       [description]
   * @param ...elements [description]
   */
  insert(index: number, ...elements: T[]): void;

  /**
   * Append the given elements to the end of the list.
   * Alias for this.insert(this.length, ...elements).
   */
  push(...elements: T[]): void;

  readonly length: number;

  asArray(): T[];
}

/**
 * A Crdt-valued List, similar to MapCrdt but with
 * list indices instead of arbitrary keys.
 *
 * TODO: way to undelete an entry (besides concurrent
 * ops)?
 */
export interface IList<C extends Crdt & Resettable> {
  get(index: number): C;
  /**
   * Deletes the given index from the list,
   * also resetting its Crdt.  In case there are concurrent
   * operations on the value Crdt, the deletion is
   * cancelled out.  Later elements are
   * shifted left.
   *
   * @param index [description]
   */
  delete(index: number): void;

  /**
   * Deletes the given value from the list,
   * also resetting it.  In case there are concurrent
   * operations on the value Crdt, the deletion is
   * cancelled out.  Later elements are
   * shifted left.
   * @param value [description]
   */
  delete(value: C): void;

  /**
   * Inserts a new value at the given index and
   * returns the new value.  Existing elements
   * at index or later are shifted right.
   *
   * Index may be in the range
   * [0, this.length].  If it equals this.length,
   * the elements are appended to the end of the list.
   * @param  index [description]
   * @return       [description]
   */
  insert(index: number): C;

  asArray(): C[];
}
