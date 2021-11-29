import { Crdt } from "./crdt";
import { Runtime } from "./runtime";

/**
 * Interface implemented by a [[Crdt]] that can have children.
 */
export interface ParentCrdt extends Crdt {
  childSend(child: Crdt, messagePath: Uint8Array[]): void;
}

/**
 * Something that can be a parent of a [[Crdt]]: either
 * a [[Runtime]] or a [[Crdt]] that can have children.
 */
export type CrdtParent = Runtime | ParentCrdt;
