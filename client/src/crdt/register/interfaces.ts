import { Optional } from "../../util/optional";
import { Crdt, CrdtEvent, CrdtEventsRecord } from "../core";

export interface CRegisterEvent<T> extends CrdtEvent {
  previousValue: T;
}

export interface CRegisterEventsRecord<T> extends CrdtEventsRecord {
  /**
   * Emitted whenever the value is set or otherwise
   * changed.
   *
   * You should listen on this event instead of
   * on Change events, since a logical Set event may
   * emit multiple Change events, with all but the last
   * corresponding to a transient internal state.
   */
  Set: CRegisterEvent<T>;
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
  Events extends CRegisterEventsRecord<T> = CRegisterEventsRecord<T>
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

export interface OptionalCRegisterEvent<T> extends CRegisterEvent<T> {
  previousOptionalValue: Optional<T>;
}

export interface OptionalCRegisterEventsRecord<T>
  extends CRegisterEventsRecord<T> {
  OptionalSet: OptionalCRegisterEvent<T>;
}

/**
 * An extension of CRegister<T, SetArgs> in which the
 * value may be "unset", throwing an error.
 * E.g., in some implementations,
 * when the register is first initialized, throwing
 * an error is more
 * reasonable than trying to come up with an
 * initial value.  optionalValue can be used to query
 * the value safely.  Likewise, in the Set event,
 * previousOptionalValue can be used to query the
 * previousValue safely.
 */
export interface OptionalCRegister<
  T,
  SetArgs extends any[] = [T],
  Events extends OptionalCRegisterEventsRecord<T> = OptionalCRegisterEventsRecord<T>
> extends CRegister<T, SetArgs, Events> {
  readonly optionalValue: Optional<T>;
}
