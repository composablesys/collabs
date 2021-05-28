import { Crdt } from "./crdt_core";
import { Resettable } from "./mixins";

// TODO: for now, include all resets because it's easier.
// Might want to split into Base and Resettable versions,
// but that's just for micro-optimizers, so can leave until
// later.  For now, throw UnimplementedException or similar.

// TODO: events
// TODO: extend Crdt?

// Types based on those for ES6 Maps/Sets/Arrays.
// https://github.com/microsoft/TypeScript/blob/master/src/lib/es2015.collection.d.ts
// https://github.com/microsoft/TypeScript/blob/master/src/lib/es2015.iterable.d.ts

// Opaque collections.  Values obey (any) register semantics, if mutable (only the case for Map values).
// Methods to convert to the original type are not
// necessary because you can do new Map(map),
// new Set(), or [...list].

// A map from keys to opaque values, with (any) register
// semantics for values.
export interface PMap<K, V> extends Resettable {
  /** Alias for reset(). */
  clear(): void;
  delete(key: K): boolean;
  // TODO
  // forEach(
  //   callbackfn: (value: V, key: K, map: Map<K, V>) => void,
  //   thisArg?: any
  // ): void;

  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
  readonly size: number;

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
}

// A set of opaque elements, supporting add and remove
// with any semantics.
export interface PSet<T> extends Resettable {
  add(value: T): this;
  /** Alias for reset(). */
  clear(): void;
  delete(value: T): boolean;
  // TODO
  // forEach(
  //   callbackfn: (value: T, value2: T, set: Set<T>) => void,
  //   thisArg?: any
  // ): void;
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

// TODO: same as array, as much as possible, plus move ops.
// A list of opaque elements, supporting insert, delete,
// and move, with any semantics.
export interface PList<T> extends Resettable {
  /** Alias for reset(). */
  clear(): void;
  // throws an error if out of bounds
  get(index: number): T;
  set(index: number, value: T): this;
  /**
   * Removes the last element from an array and returns it.
   * If the array is empty, undefined is returned and the array is not modified.
   */
  pop(): T | undefined;
  /**
   * Appends new elements to the end of an array, and returns the new length of the array.
   * @param items New elements to add to the array.
   */
  push(...items: T[]): number;
  /**
   * Inserts new elements at the start of an array, and returns the new length of the array.
   * @param items Elements to insert at the start of the array.
   */
  unshift(...items: T[]): number;
  /**
   * Removes the first element from an array and returns it.
   * If the array is empty, undefined is returned and the array is not modified.
   */
  shift(): T | undefined;
  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @returns An array containing the elements that were deleted.
   */
  splice(start: number, deleteCount?: number): T[];
  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the array in place of the deleted elements.
   * @returns An array containing the elements that were deleted.
   */
  splice(start: number, deleteCount: number, ...items: T[]): T[];
  // TODO: semantics: movement does an insertion (not
  // overwriting the existing toIndex), and toIndex is
  // done relative to the current state, not the state
  // after deleting fromIndex (which may shift toIndex's
  // meaning 1 to the right).  moves count elements,
  // works even if overlapping.
  move(fromIndex: number, toIndex: number, count?: number): this;
  // TODO
  // /**
  //  * Performs the specified action for each element in an array.
  //  * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
  //  * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
  //  */
  // forEach(
  //   callbackfn: (value: T, index: number, array: T[]) => void,
  //   thisArg?: any
  // ): void;
  // /**
  //  * Reverses the elements in an array in place.
  //  * This method mutates the array and returns a reference to the same array.
  //  */
  // reverse(): T[];

  readonly size: number;

  /**
   * Returns an iterable of [index,entry] pairs for every entry in the list.
   */
  entries(): IterableIterator<[number, T]>;

  /**
   * Returns an iterable of values in the list.
   */
  values(): IterableIterator<T>;

  /** Alias for values(). */
  [Symbol.iterator](): IterableIterator<T>;

  // TODO: include?  Same Q for other array inspection
  // methods that could run in sublinear time,
  // but will run in linear time if you copy this
  // to an array and then use the array method (e.g. some).
  /**
   * Returns a copy of a section of an array.
   * For both start and end, a negative index can be used to indicate an offset from the end of the array.
   * For example, -2 refers to the second to last element of the array.
   * @param start The beginning index of the specified portion of the array.
   * If start is undefined, then the slice begins at index 0.
   * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
   * If end is undefined, then the slice extends to the end of the array.
   */
  slice(start?: number, end?: number): T[];
}

// CRDT collections.  Values are controlled by
// CRDTs explicitly, instead of being primitive and
// controlled by registers.
// They may (but don't always) obey Riak map semantics:
// multiple creations/sets merge all ops, you can't
// overwrite a value.  Remove semantics can vary:
// Riak map (reset & revive on concurrent ops);
// Yjs (delete forever); mixed (e.g. revive on
// concurrent ops but don't reset - not GC-able
// though).
// TODO: change "value" to "valueCrdt" throughout?

// TODO: same as Map above, but with values controlled
// by implicitly-initialized Crdt's.  Any semantics.
export interface CMap<K, C extends Crdt> extends Resettable {
  /** Alias for reset(). */
  clear(): void;
  delete(key: K): boolean;
  // TODO
  // forEach(
  //   callbackfn: (value: V, key: K, map: Map<K, V>) => void,
  //   thisArg?: any
  // ): void;

  get(key: K): C | undefined;
  getForce(key: K): C;
  has(key: K): boolean;
  addKey(key: K): this;
  readonly size: number;

  /** Returns an iterable of entries in the map. */
  [Symbol.iterator](): IterableIterator<[K, C]>;

  /**
   * Returns an iterable of key, value pairs for every entry in the map.
   */
  entries(): IterableIterator<[K, C]>;

  /**
   * Returns an iterable of keys in the map
   */
  keys(): IterableIterator<K>;

  /**
   * Returns an iterable of values in the map
   */
  values(): IterableIterator<C>;
}

// Will give each child a unique id.  In Riak semantics,
// initializer only gets the sender, not arbitrary args like
// in DynamicCrdtSource, since you might need to revive it.
// In Yjs semantics, you can use arbitrary args.
export interface CSet<C extends Crdt> extends Resettable {
  create(): C;
  // Throws an error if not from this set
  restore(value: C): this;
  /** Alias for reset(). */
  clear(): void;
  // Throws an error if not from this set
  delete(value: C): boolean;
  // TODO
  // forEach(
  //   callbackfn: (value: T, value2: T, set: Set<T>) => void,
  //   thisArg?: any
  // ): void;

  // Throws an error if not from this set
  has(value: C): boolean;
  readonly size: number;

  /** Iterates over values in the set. */
  [Symbol.iterator](): IterableIterator<C>;
  /**
   * Returns an iterable of [v,v] pairs for every value `v` in the set.
   */
  entries(): IterableIterator<[C, C]>;
  /**
   * Despite its name, returns an iterable of the values in the set.
   */
  keys(): IterableIterator<C>;

  /**
   * Returns an iterable of values in the set.
   */
  values(): IterableIterator<C>;
}

// TODO: remove fluency (redundant this return values),
// in case a subclass wants to overwrite them?

// Not allowing revivals (Yjs semantics) lets you
// avoid making elements direct children; instead you can
// use a CrdtSet to hold the children, with arbitrary
// initializers, and the CrdtSet will id them by unique ids.
// That will make their names shorter (no seqId).
export interface CList<C extends Crdt> extends Resettable {
  /** Alias for reset(). */
  clear(): void;
  // throws an error if out of bounds
  get(index: number): C;
  insert(index: number): C;
  insertRange(index: number, count: number): C[];
  delete(index: number): void;
  deleteRange(index: number, count: number): void;
  // TODO: semantics: movement does an insertion (not
  // overwriting the existing toIndex), and toIndex is
  // done relative to the current state, not the state
  // after deleting fromIndex (which may shift toIndex's
  // meaning 1 to the right).  moves count elements,
  // works even if overlapping.
  move(fromIndex: number, toIndex: number, count?: number): this;
  // TODO
  // /**
  //  * Performs the specified action for each element in an array.
  //  * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
  //  * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
  //  */
  // forEach(
  //   callbackfn: (value: T, index: number, array: T[]) => void,
  //   thisArg?: any
  // ): void;
  // /**
  //  * Reverses the elements in an array in place.
  //  * This method mutates the array and returns a reference to the same array.
  //  */
  // reverse(): T[];

  readonly size: number;

  /**
   * Returns an iterable of [index,entry] pairs for every entry in the list.
   */
  entries(): IterableIterator<[number, C]>;

  /**
   * Returns an iterable of values in the list.
   */
  values(): IterableIterator<C>;

  /** Alias for values(). */
  [Symbol.iterator](): IterableIterator<C>;

  // TODO: include?  Same Q for other array inspection
  // methods that could run in sublinear time,
  // but will run in linear time if you copy this
  // to an array and then use the array method (e.g. some).
  /**
   * Returns a copy of a section of an array.
   * For both start and end, a negative index can be used to indicate an offset from the end of the array.
   * For example, -2 refers to the second to last element of the array.
   * @param start The beginning index of the specified portion of the array.
   * If start is undefined, then the slice begins at index 0.
   * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
   * If end is undefined, then the slice extends to the end of the array.
   */
  slice(start?: number, end?: number): C[];
}

// An opaque register of type T, any semantics.
// TODO: separate MVR type?  Or just LwwRegister with
// its special conflicts() method?
export interface Register<T> extends Resettable {
  // Set and get-able
  value: T;
}

// TODO: specializations of Register to Number, Boolean, ??
export interface Number extends Register<number> {
  add(toAdd: number): void;
  mult(toMult: number): void;
  minWith(toMin: number): void;
  maxWith(toMax: number): void;
}
