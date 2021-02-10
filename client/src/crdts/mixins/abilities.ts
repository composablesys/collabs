import { OutOfOrderAble } from "./OutOfOrderAble";
import { Resettable, ResettableEventsRecord } from "./Resettable";
import {
  StrongResettable,
  StrongResettableEventsRecord,
} from "./StrongResettable";

export interface AllAble extends Resettable, StrongResettable, OutOfOrderAble {}

export type AllAbleEventsRecord = ResettableEventsRecord &
  StrongResettableEventsRecord;

// TODO: undo/redo abilities?
export interface AbilityFlag {
  /**
   * Include this field (i.e., it is !== undefined) to specify
   * the Resettable interface.
   */
  resettable?: any;
  /**
   * Include this field (i.e., it is !== undefined) to specify
   * the StrongResettable interface.
   */
  strongResettable?: any;
  /**
   * Include this field (i.e., it is !== undefined) to specify
   * the OutOfOrderAble interface..
   */
  outOfOrderAble?: any;
}

export const ABILITIES_ALL = Object.freeze({
  resettable: true,
  strongResettable: true,
  outOfOrderAble: true,
});

export const ABILITIES_NONE = Object.freeze({});

export function isResettable(crdt: Resettable | {}): crdt is Resettable {
  return (crdt as Resettable).reset !== undefined;
}

export function isStrongResettable(
  crdt: StrongResettable | {}
): crdt is StrongResettable {
  return (crdt as StrongResettable).strongReset !== undefined;
}

export function isOutOfOrderAble(
  crdt: OutOfOrderAble | {}
): crdt is OutOfOrderAble {
  return (crdt as OutOfOrderAble).receiveOutOfOrder !== undefined;
}

// Typescript doesn't correctly infer types when multiplie flags are passed
// if we define InterfaceOf this way:
//
// export type InterfaceOf<T extends AbilityFlag> =
//     (T extends {resettable: any}? Resettable: {}) &
//     (T extends {strongResettable: any}? StrongResettable: {}) &
//     (T extends {outOfOrderAble: any}? OutOfOrderAble: {});
//
// So we instead do it the long way below.
//
// Also, if you let x = {resettable: true}, the inferred type of x is
// {resettable: boolean}.  So later supplying x to a function
// whose return type uses InterfaceOf to check if x extends the type {resettable: true}
// doesn't work as expected (although supplying {resettable: true} as
// a function argument directly does work).  Thus instead of true vs false/undefined,
// we use any vs undefined when checking if a flag is set.  In particular,
// this means that setting a flag to false will cause it to be treated as true!
export type InterfaceOf<F extends AbilityFlag> = F extends {
  resettable: any;
  strongResettable: any;
  outOfOrderAble: any;
}
  ? AllAble
  : F extends { strongResettable: any; outOfOrderAble: any }
  ? StrongResettable & OutOfOrderAble
  : F extends { resettable: any; outOfOrderAble: any }
  ? Resettable & OutOfOrderAble
  : F extends { resettable: any; strongResettable: any }
  ? Resettable & StrongResettable
  : F extends { resettable: any }
  ? Resettable
  : F extends { strongResettable: any }
  ? StrongResettable
  : F extends { outOfOrderAble: any }
  ? OutOfOrderAble
  : {};
