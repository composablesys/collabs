import { Resettable, ResettableEventsRecord } from "../helper_crdts";

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
 * remain unchanged on other replicas when mutated locally
 * (e.g., if a non-Crdt object's fields are mutated),
 * causing different replicas to see different values.
 */
export interface Register<
  T,
  Events extends ResettableEventsRecord = ResettableEventsRecord
> extends Resettable<Events> {
  /**
   * The register's value, which can be set and get.
   */
  value: T;
}
