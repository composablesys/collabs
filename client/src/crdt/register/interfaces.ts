import { Resettable, ResettableEventsRecord } from "../helper_crdts";
import { Crdt, CrdtEventsRecord } from "../core";

// TODO: force events to extend ResettableEventsRecord?
// This doesn't actually have any effect because implementers
// can just choose not to emit Reset events.

/** An opaque register of type T, any semantics. */
export interface Register<
  T,
  Events extends ResettableEventsRecord = ResettableEventsRecord
> extends Resettable<Events> {
  // Set and get-able
  value: T;
}
