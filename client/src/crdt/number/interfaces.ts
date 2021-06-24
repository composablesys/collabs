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
  /**
   * Adds toAdd to the value.
   */
  add(toAdd: number): void;

  /**
   * Multiplies the value by toMult.
   */
  mult(toMult: number): void;
}
