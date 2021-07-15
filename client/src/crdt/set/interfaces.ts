import { Crdt, CrdtEvent, CrdtEventsRecord } from "../core";

export interface CSetEvent<T> extends CrdtEvent {
  value: T;
}

/**
 * Note that this doesn't extend CrdtEvent, because
 * values may be initialized independently of
 * operations/message delivery, in which case there is
 * no associated timestamp.
 */
export interface CSetInitEvent<T> {
  value: T;
}

export interface CSetEventsRecord<T> extends CrdtEventsRecord {
  Add: CSetEvent<T>;
  Delete: CSetEvent<T>;
  /**
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
   *
   * TODO: make clear (and mandate, for implementations) that
   * if you are maintaining a view of a set using add/delete
   * events, you don't have to worry about GC replacing one
   * of your view elements with a different one: implementations
   * will use WeakRefs to ensure that only reference-free
   * values are GC'd.
   */
  ValueInit: CSetInitEvent<T>;
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
 * Added values can later be deleted and (in some implementations)
 * restored, changing
 * their presence in the set, using any semantics to
 * resolve conflicts.
 */
export interface CSet<
  T,
  AddArgs extends any[],
  Events extends CSetEventsRecord<T> = CSetEventsRecord<T>
> extends Crdt<Events> {
  /**
   * Sends args to every replica in serialized form.
   * Every replica then uses
   * them to contruct the actual added value of type T.
   *
   * @return the added value
   */
  add(...args: AddArgs): T;

  /**
   * Deletes the given value, making it no longer present
   * in this set.
   */
  delete(value: T): void;

  has(value: T): boolean;

  /**
   * Delete every value in this set.
   */
  clear(): void;

  readonly size: number;

  forEach(
    callbackfn: (value: T, value2: T, set: this) => void,
    thisArg?: any
  ): void;

  /**
   * Iterates over values in the set.
   *
   * The iteration order is NOT eventually consistent, i.e.,
   * it may differ on replicas with the same state.
   *
   * TODO: when implementations do guarantee an order (e.g.
   * local view of add order), guarantee it?  Such a view
   * could be useful in some implementations, e.g., a chat
   * log where you want to display messages in the order
   * they were locally received.  Need to make sure the
   * order is preserved in save data.
   */
  [Symbol.iterator](): IterableIterator<T>;

  /**
   * Returns an iterable of values in the set.
   *
   * The iteration order is NOT eventually consistent, i.e.,
   * it may differ on replicas with the same state.
   */
  values(): IterableIterator<T>;

  // entries() and keys() are excluded because they are redundant and don't
  // seem useful, even though they are included in the ES6 Set class.
  // /**
  //  * Returns an iterable of [v,v] pairs for every value `v` in the set. Order is not eventually consistent.
  //  */
  // entries(): IterableIterator<[T, T]>;
  //
  // /**
  //  * Despite its name, returns an iterable of the values in the set. Order is not eventually consistent.
  //  */
  // keys(): IterableIterator<T>;

  // Only include this in implementations where it makes sense.
  // /**
  //  * Makes the given value present in the set.
  //  *
  //  * This method can be used to restore deleted elements, but
  //  * it cannot add new elements to the set.
  //  */
  // restore(value: T): this;
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
