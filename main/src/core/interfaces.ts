import { Crdt } from "./crdt";

/**
 * A Crdt that can be a parent to other Crdts.
 *
 * In addition to implementing this interface,
 * Crdt parents are responsible for calling
 * Crdt.init(name, this) on each child Crdt immediately
 * after the child is constructed,
 * where name is the child Crdt's name.
 */
export interface CrdtParent extends Crdt {
  /**
   * Callback called by a child at the end of init when this is passed
   * to init as parent.  It should throw an error if this is not the
   * object calling init.
   * @param child the child Crdt on which init was called with this as parent
   */
  onChildInit(child: Crdt): void;
}

/**
 * Interface describing a Crdt which stores all of its mutable state
 * in a single readonly variable state of type S.
 *
 * Such a Crdt must continue
 * to function after state is mutated or even replaced (ignoring state's
 * readonly property) as if it had changed state itself.
 *
 * This interace is used by SemidirectProduct, which composes two
 * StatefulCrdt's of the same type, unifying their states by setting
 * both state variables equal to the same value.  Note that
 * SemidirectProduct ignores the readonly property during
 * init, possibly overwriting state with a different instance
 * of S.
 *
 * @param S the state type.  S is forced to extend Object
 * because state is meant to be mutated in-place, since
 * it is readonly.  Immutable primitive types (e.g., number)
 * should be wrapped in an object.
 */
export interface StatefulCrdt<S extends Object> extends Crdt {
  /**
   * Not for use outside of this (treat as protected).
   */
  readonly state: S;
}
