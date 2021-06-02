// TODO: another difference between P and C versions:
// value mutability.  For P, should either be primitives
// or immutable objects; for C, can edit object in-place.

// TODO: deterministic iterator order?

// A set of opaque elements, supporting add and remove
// with any semantics.
export interface PlainSet<T> extends Resettable {
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

// Will give each child a unique id.  In Riak semantics,
// initializer only gets the sender, not arbitrary args like
// in DynamicCrdtSource, since you might need to revive it.
// In Yjs semantics, you can use arbitrary args.
export interface CrdtSet<C extends Crdt> extends Resettable {
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
