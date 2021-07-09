import { Resettable, ResettableEventsRecord } from "../helper_crdts";
import { Crdt, CrdtEvent } from "../core";

export interface SetEvent<T> extends CrdtEvent {
  value: T;
}

export interface PlainSetEventsRecord<T> extends ResettableEventsRecord {
  Add: SetEvent<T>;
  Delete: SetEvent<T>;
}

/**
 * A set of plain values of type T, supporting add and
 * delete with any semantics.
 */
export interface PlainSet<
  T,
  Events extends PlainSetEventsRecord<T> = PlainSetEventsRecord<T>
> extends Resettable<Events>,
    Set<T> {
  add(value: T): this;
  /**
   * Delete every value in this set.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;
  /**
   * Returns whether value was deleted.  May be false either
   * because value was not present, or because the semantics
   * did not delete value.
   */
  delete(value: T): boolean;
  has(value: T): boolean;
  readonly size: number;

  forEach(
    callbackfn: (value: T, value2: T, set: this) => void,
    thisArg?: any
  ): void;
  /** Iterates over values in the set.  Order is not eventually consistent. */
  [Symbol.iterator](): IterableIterator<T>;
  /**
   * Returns an iterable of [v,v] pairs for every value `v` in the set. Order is not eventually consistent.
   */
  entries(): IterableIterator<[T, T]>;
  /**
   * Despite its name, returns an iterable of the values in the set. Order is not eventually consistent.
   */
  keys(): IterableIterator<T>;

  /**
   * Returns an iterable of values in the set. Order is not eventually consistent.
   */
  values(): IterableIterator<T>;

  readonly [Symbol.toStringTag]: string;
}

/**
 * Note that this doesn't extend CrdtEvent, because
 * values may be initialized independently of
 * operations/message delivery, in which case there is
 * no associated timestamp.
 */
export interface SetInitEvent<C extends Crdt> {
  value: C;
}

export interface CrdtSetEventsRecord<C extends Crdt>
  extends ResettableEventsRecord {
  Add: SetEvent<C>;
  Delete: SetEvent<C>;
  /**
   * Emitted when a valueCrdt is constructed.
   * Use this to register event listeners on valueCrdts.
   * Note that this may be called multiple times for the
   * same key (if a valueCrdt is GC'd and then
   * reconstructed), it may not correspond precisely
   * to Add events, and it may be called independently of
   * operations/message delivery.
   */
  ValueInit: SetInitEvent<C>;
}

/**
 * A set of value Crdts of type C, representing a set of
 * mutable values of the type represented by C.
 *
 * Value Crdts created externally cannot be added to
 * a CrdtSet; instead, they must be created (on some replica)
 * by calling create, after which they can be mutated into
 * the desired state.  All methods except owns throw an error if
 * called with a value Crdt that is not owned by this CrdtSet,
 * i.e., it resulted from a create operation on this.
 *
 * Value Crdts can still be deleted and restored.  That affects
 * their membership in the set, as indicated by has() and
 * the iterators, but they will always remain owned by this set.
 */
export interface CrdtSet<
  C extends Crdt,
  CreateArgs extends any[] = [],
  Events extends CrdtSetEventsRecord<C> = CrdtSetEventsRecord<C>
> extends Resettable<Events> {
  /**
   * Create a new value Crdt and add it to the set.
   * Typically, this will call a user-supplied
   * valueCrdtConstructor with the given args.
   *
   * @return the created value Crdt
   */
  create(...args: CreateArgs): C;
  /**
   * Makes the given valueCrdt present in the set.
   *
   * This method can be used to restore deleted elements, but
   * it cannot add new elements to the set.
   */
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

  /** Iterates over value Crdts in the set.  Order is not eventually consistent. */
  [Symbol.iterator](): IterableIterator<C>;
  /**
   * Returns an iterable of [c,c] pairs for every value Crdt `c` in the set. Order is not eventually consistent.
   */
  entries(): IterableIterator<[C, C]>;
  /**
   * Despite its name, returns an iterable of the value Crdts in the set. Order is not eventually consistent.
   */
  keys(): IterableIterator<C>;

  /**
   * Returns an iterable of value Crdts in the set. Order is not eventually consistent.
   */
  values(): IterableIterator<C>;
}
