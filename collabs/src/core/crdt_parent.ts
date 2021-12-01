import { Crdt } from "./crdt";
import { MessageMeta } from "./message_meta";
import { Runtime } from "./runtime";

/**
 * Interface implemented by a [[Crdt]] that can have children.
 */
export interface ParentCrdt extends Crdt {
  childSend(child: Crdt, messagePath: (Uint8Array | string)[]): void;

  /**
   * @return the MessageMeta that will be passed along with
   * the received message corresponding to the next childSend
   * call, assuming there are no intervening messages
   * (within the whole Runtime). This can be used by children
   * to get the MessageMeta for messages that they echo internally.
   * Typically, it will just be
   * parent.nextMessageMeta(), but this Crdt may choose to
   * add extra fields.
   */
  nextMessageMeta(): MessageMeta;
}

/**
 * Something that can be a parent of a [[Crdt]]: either
 * a [[Runtime]] or a [[Crdt]] that can have children.
 */
export type CrdtParent = Runtime | ParentCrdt;
