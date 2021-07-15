import { Crdt, CrdtEventsRecord } from "../core";

/**
 * An opaque register of type T.  Any semantics can
 * be used to resolve conflicts between concurrent writes.
 *
 * In general, values must be "serializable plain values".
 * This means that they can be:
 * - A primitive value
 * - A reference to a Crdt belonging to the same Runtime
 * - Or, an immutable object whose instance fields are
 * themselves plain values, without circular references.
 *
 * Other values might not serialize correctly, or might
 * not be eventually consistent.  In particular, if the
 * value is a non-Crdt object and you mutate it on one
 * replica, those mutations won't show up on other
 * replicas - they have no way of knowing about the
 * mutations.
 *
 * There are no CRegister-specific events; instead, listen
 * on the generic Change event and use this.value to read
 * the changed value, if needed.
 */
export interface CRegister<
  T,
  Events extends CrdtEventsRecord = CrdtEventsRecord
> extends Crdt<Events> {
  /**
   * The register's value, which can be set and get.
   */
  value: T;
}
