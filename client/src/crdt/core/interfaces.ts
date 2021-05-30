/**
 * TODO.  Should only be implemented by Crdt's
 * (except for the internal RootCrdt).
 */
export interface CrdtParent extends Crdt {
  readonly runtime: CrdtRuntime;
  pathToRoot(): string[];
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
 * Such a Crdt must continue
 * to function after state is mutated or even replaced (ignoring state's
 * readonly property) as if it had changed state itself.
 *
 * This interace is used by SemidirectProduct, which composes two
 * StatefulCrdt's of the same type, unifying their states by setting
 * both state variables equal to the same value.
 *
 * @param S the type of state
 */
export interface StatefulCrdt<
  S extends Object,
  Events extends CrdtEventsRecord = CrdtEventsRecord
> extends Crdt<Events> {
  /**
   * Not for external use, except by SemidirectProduct.
   */
  readonly state: S;
}

export interface Resettable {
  /**
   * Perform an observed-reset operation on this Crdt.  Actually,
   * any behavior is acceptable (will not violate eventual
   * consistency) so long as this method commutes with
   * concurrent operations and has no effect if timestamp
   * is prior to the timestamps of all other received messages.
   * In particular, if you don't want to implement resets, it is okay to
   * make this method a no-op, so long as users are aware that
   * reset() will have no effect.
   */
  reset(): void;
}

export interface ResettableEventsRecord extends CrdtEventsRecord {
  Reset: CrdtEvent;
}
