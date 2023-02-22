import { Collab, CollabEvent, CollabEventsRecord } from "../core";

/**
 * Event emitted by an [[IVar]]`<T>` implementation
 * when its value changes.
 */
export interface VarEvent<T> extends CollabEvent {
  /**
   * The set value.
   */
  value: T;
  /**
   * The previous value on this replica.
   */
  previousValue: T;
}

/**
 * Base events record for an [[IVar]]`<T>` implementation.
 */
export interface VarEventsRecord<T> extends CollabEventsRecord {
  /**
   * Emitted whenever the value is set or otherwise
   * changed.
   */
  Set: VarEvent<T>;
}

/**
 * Interface for a collaborative variable of type T.
 *
 * For an implementation, see [[CVar]].
 *
 * An `IVar<T>` represents an opaque value of type T.
 * It is set with [[set]] and read with the [[value]]
 * getter; some implementations add a [[value]] setter as
 * well. Any semantics can be used to resolve
 * conflicting sets.
 *
 * This interface permits [[set]] to accept arbitrary
 * `SetArgs` instead of just the value to set.
 * That is useful
 * when the value is not serializable, e.g., a dynamically-
 * created [[Collab]].
 *
 * In the CRDT and DB literature, data structures of this form
 * are usually called "registers",
 * e.g., "last-writer wins register".
 *
 * @typeParam T The value type.
 * @typeParam SetArgs The type of arguments to [[set]].
 * Defaults to `[T]`, i.e., set inputs the actual value.
 * @typeParam Events Events record.
 */
export interface IVar<
  T,
  SetArgs extends unknown[] = [T],
  Events extends VarEventsRecord<T> = VarEventsRecord<T>
> extends Collab<Events> {
  /**
   * Sets the current value using args.
   *
   * Typically, args are broadcast to all replicas
   * in serialized form. Every replica then uses
   * them to contruct the actual value of type T.
   *
   * @return The set value, or undefined if it is not
   * constructed immediately.
   */
  set(...args: SetArgs): T | undefined;

  /**
   * The current value.
   */
  readonly value: T;
}
