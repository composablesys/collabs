import { Crdt, CrdtEvent } from "../core";
import { ResettableEventsRecord } from "../helper_crdts";
import { Register } from "../register";

export interface NumberAddEvent extends CrdtEvent {
  readonly added: number;
}

export interface NumberMultEvent extends CrdtEvent {
  readonly multed: number;
}

export interface NumberCompEvent extends CrdtEvent {
  readonly compared: number;
}

export interface NumberEventsRecord extends ResettableEventsRecord {
  Add: NumberAddEvent;
  Mult: NumberMultEvent;
  Min: NumberCompEvent;
  Max: NumberCompEvent;
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

  /**
   * Returns the minimum of value and toComp
   */
  min?(toComp: number): void;

  /**
   * Returns the maximum of value and toComp
   */
  max?(toComp: number): void;
}
