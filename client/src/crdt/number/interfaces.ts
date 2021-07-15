// TODO: no special interface for this; instead the
// semidirect number is CNumber, with the events below.
// Counter is its own thing, with a different interface
// (just inc, get value; also implementations with dec, reset).

// import { Crdt, CrdtEvent, CrdtEventsRecord } from "../core";
// import { CRegister } from "../register";
//
// export interface NumberAddEvent extends CrdtEvent {
//   readonly added: number;
// }
//
// export interface NumberMultEvent extends CrdtEvent {
//   readonly multed: number;
// }
//
// export interface NumberEventsRecord extends CrdtEventsRecord {
//   Add: NumberAddEvent;
//   Mult: NumberMultEvent;
// }
//
// export interface CNumber<Events extends NumberEventsRecord = NumberEventsRecord>
//   extends CRegister<number, Events>,
//     Crdt<Events> {
//   /**
//    * Adds toAdd to the value.
//    */
//   add(toAdd: number): void;
//
//   /**
//    * Multiplies the value by toMult.
//    */
//   mult(toMult: number): void;
// }
