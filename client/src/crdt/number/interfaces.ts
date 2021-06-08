import { Crdt, CrdtEvent } from "../core";
import { ResettableEventsRecord } from "../helper_crdts";
import { Register } from "../register";

export interface NumberAddEvent extends CrdtEvent {
  readonly added: number;
}

export interface NumberMultEvent extends CrdtEvent {
  readonly multed: number;
}

export interface NumberEventsRecord extends ResettableEventsRecord {
  Add: NumberAddEvent;
  Mult: NumberMultEvent;
}

export interface Number<Events extends NumberEventsRecord = NumberEventsRecord>
  extends Register<number, Events>,
    Crdt<Events> {
  add(toAdd: number): void;
  mult(toMult: number): void;
  // TODO: min, max?
}

// TODO: mixin to implement the methods you don't care
// about automatically, using value-set?

// TODO: export simple (pure) counter, for integers only?
// Slightly simpler than default counter.
// TODO: likewise for mults?  Not as necessary if we can
// optimize the standard number's mults; but until we do,
// that gets a per-op storage cost for mults, when it
// could be done in O(1) space (ignoring floating-point
// noncommutativity).
