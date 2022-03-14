import { Collab, CollabEvent, CollabEventsRecord } from "../core";

export interface CVariableEvent<T> extends CollabEvent {
  previousValue: T;
}

export interface CVariableEventsRecord<T> extends CollabEventsRecord {
  /**
   * Emitted whenever the value is set or otherwise
   * changed.
   *
   * Generally, this should only be emitted when the value
   * actually changes under `===` equality. Implementations
   * that behave otherwise should clearly indicate so.
   */
  Set: CVariableEvent<T>;
}

/**
 * An opaque variable of type T.  Any semantics can
 * be used to resolve conflicting writes.
 *
 * The value is set using the set method.
 * This method inputs SetArgs and sends them to every
 * replica in serialized form; every replica then uses
 * them to contruct the actual added value of type T,
 * e.g., using a user-supplied callback in the constructor.
 *
 * There are no CVariable-specific events; instead, listen
 * on the generic Message event and use this.value to read
 * the changed value, if needed.
 *
 * In the CRDT and DB literature, data structures of this form
 * are usually called "registers" instead of "variables",
 * e.g., "last-writer wins register".
 */
export interface CVariable<
  T,
  SetArgs extends unknown[] = [T],
  Events extends CVariableEventsRecord<T> = CVariableEventsRecord<T>
> extends Collab<Events> {
  /**
   * Sends args to every replica in serialized form.
   * Every replica then uses
   * them to contruct the actual set value of type T.
   *
   * @return The set value, or undefined if it is not
   * yet constructed. Implementations that always construct
   * the value immediately should get rid of the "undefined"
   * case.
   */
  set(...args: SetArgs): T | undefined;

  /**
   * Returns the current value.
   *
   * Implementations in which set takes the actual set
   * value of type T (i.e., SetArgs = [T]) should make
   * value writable, so that this.value = x is an alias
   * for this.set(x).  Note that if you add that setter
   * in a subclass of a class defining this getter, you
   * must also define the getter as "return super.value".
   * Otherwise, the setter will cover it up, causing the getter
   * to always return undefined.
   */
  readonly value: T;
}
