import { Resettable, ResettableEventsRecord } from "../helper_crdts";
import { CrdtEvent } from "../core";

export interface SetEvent<T> extends CrdtEvent {
  value: T;
}

/**
 * Note that this doesn't extend CrdtEvent, because
 * values may be initialized independently of
 * operations/message delivery, in which case there is
 * no associated timestamp.
 */
export interface SetInitEvent<T> {
  value: T;
}

export interface CSetEventsRecord<T> extends ResettableEventsRecord {
  Add: SetEvent<T>;
  Delete: SetEvent<T>;
  /**
   * TODO: should this be included by default, or just
   * added by implementations for which it makes sense
   * (currently just CrdtSet-like implementations)?
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
  ValueInit: SetInitEvent<T>;
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
 * Added values can later be deleted and restored, changing
 * their presence in the set, using any semantics to
 * resolve conflicts.
 */
export interface CSet<
  T,
  AddArgs extends any[] = [],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
> extends Resettable<Events> {
  /**
   * Sends args to every replica in serialized form.
   * Every replica then uses
   * them to contruct the actual added value of type T,
   *
   * If you want to make a value of type T present in the set
   * after it has been deleted, instead use restore.
   *
   * @return the added value
   */
  add(...args: AddArgs): T;

  /**
   * Makes the given value present in the set.
   *
   * This method can be used to restore deleted elements, but
   * it cannot add new elements to the set.
   */
  restore(value: T): this;

  /**
   * Returns whether value was deleted.  May be false either
   * because value was not present, or because the semantics
   * did not delete value.
   */
  delete(value: T): boolean;

  has(value: T): boolean;

  // TODO: include owns?
  // /**
  //  * Returns true if valueCrdt is owned by this CrdtSet,
  //  * i.e., it resulted from a create operation on this.
  //  */
  // owns(valueCrdt: C): boolean;

  /**
   * Delete every value in this set.
   *
   * Note that this may be a different semantics
   * than reset.
   */
  clear(): void;

  readonly size: number;

  // TODO: of the remaining methods/properties, only
  // values() is really necessary.  The rest
  // (forEach, entries, keys, Symbol.iterator) are just
  // included for consistency with the native JS Set.

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
}

// In terms of this interface, the old PlainSet interface is
// approximately as follows:
//     interface PlainSet<T> extends CSet<T, [T]> {}
// The only difference is CSet's extra "restore" method,
// which I expect PlainSet-like implementations to treat
// the same as add.
//
// The old CrdtSet interface is approximately as follows:
//     interface CrdtSet<C extends Crdt, AddArgs extends any[]> extends CSet<C, AddArgs>
// The only differences are that CSet has "add" instead of
// "create", and that CSet omits the "owns" method,
// which I expect CrdtSet-like implementations to add back
// anyway.
//
// The difference between "PlainSets" and "CrdtSets" then
// becomes internal, instead of appearing in the interface.
// In particular:
// - CrdtSet-like implementations will take a valueConstructor
// callback as a constructor argument, with type
// (...args: AddArgs) => T.  PlainSet-like implementations
// will take no such argument, instead using AddArgs
// (of type [T]) directly to get the added value.
// - CrdtSet-like implementations with Crdt value types will
// make created values be their children, in the runtime
// Crdt tree.
//   - In the future, this will be accomplished by
// giving a special parameter to the valueConstructor that
// can be passed to the Crdt's own constructor, which
// registers the value as the CSet's child.  So from the user's
// perspective, the key difference is that CrdtSet-like
// implementations will give you this special parameter
// as an argument to valueConstructor, in addition to AddArgs,
// which makes it possible for valueConstructor to construct
// new Crdt's.
//   - In principle, we could have CSet implementations which
// take nontrivial AddArgs instead of just adding T and which treat all
// added values as unique (like a CrdtSet), but which don't
// assume that T extends Crdt and don't make created values
// be their children (like a PlainSet).  Not sure what the
// use case for that would be, though, except possibly as
// a building block for true CrdtSets.
