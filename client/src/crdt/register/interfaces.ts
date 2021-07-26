import { Crdt, CrdtEvent, CrdtEventsRecord } from "../core";

export interface CRegisterEventsRecord extends CrdtEventsRecord {
  /**
   * Emitted whenever the value is set (or changed,
   * in general).
   *
   * Listening on this event is preferable to listening
   * on Change events, since a logical Set event may
   * emit multiple Change events, with all but the last
   * corresponding to a transient internal state.
   */
  Set: CrdtEvent;
}

/**
 * An opaque register of type T.  Any semantics can
 * be used to resolve conflicts between concurrent writes.
 *
 * The value is set using the set method.
 * This method inputs SetArgs and sends them to every
 * replica in serialized form; every replica then uses
 * them to contruct the actual added value of type T,
 * e.g., using a user-supplied callback in the constructor.
 *
 * There are no CRegister-specific events; instead, listen
 * on the generic Change event and use this.value to read
 * the changed value, if needed.
 */
export interface CRegister<
  T,
  SetArgs extends any[] = [T],
  Events extends CRegisterEventsRecord = CRegisterEventsRecord
> extends Crdt<Events> {
  /**
   * Sends args to every replica in serialized form.
   * Every replica then uses
   * them to contruct the actual set value of type T.
   */
  set(...args: SetArgs): void;

  /**
   * Returns the current value.
   *
   * Implementations in which set takes the actual set
   * value of type T (i.e., SetArgs = [T]) should make
   * value writable, so that this.value = x is an alias
   * for this.set(x).
   */
  readonly value: T;
}
