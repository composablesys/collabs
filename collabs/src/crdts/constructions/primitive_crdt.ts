import { CPrimitive } from "../../constructions";
import { CollabEventsRecord, MessageMeta, Message } from "../../core";
import { CRDTExtraMetaSource } from "../crdt-runtime";
import { CRDTMessageMeta } from "./crdt_message_meta";

/**
 * Superclass for a primitive (message-passing)
 * operation-based CRDT.
 *
 * Messages sent with [[sendCRDT]] are delivered to all
 * replica's [[receiveCRDT]] methods (including the sender's)
 * exactly once, in causal order, and tagged with
 * [[CRDTMessageMeta]]. Sent messages are delivered to the local
 * replica immediately. Subclasses are expected to implement
 * an operation-based CRDT algorithm using these methods.
 *
 * Besides renaming send and receive to sendCRDT and receiveCRDT,
 * the only user-facing difference between [[PrimitiveCRDT]]
 * and [[CPrimitive]] is that this class supplies
 * [[CRDTMessageMeta]] to recipients.
 *
 * To function, a [[PrimitiveCRDT]] must have an ancestor
 * that supplies the extra [[MessageMeta]] key
 * [[CRDTExtraMeta.MESSAGE_META_KEY]] (typically [[CRDTExtraMetaLayer]]). Also, its ancestors
 * must deliver messages exactly once, in causal order,
 * with sent messages delivered to the local replica immediately.
 */
export abstract class PrimitiveCRDT<
  Events extends CollabEventsRecord = CollabEventsRecord
> extends CPrimitive<Events> {
  protected sendCRDT(
    message: Message,
    requests?: {
      wallClockTime?: boolean;
      lamportTimestamp?: boolean;
    }
  ): void {
    if (requests !== undefined) {
      const crdtExtraMetaSource = <CRDTExtraMetaSource>(
        this.getContext(CRDTExtraMetaSource.CONTEXT_KEY)
      );
      if (requests.wallClockTime === true) {
        crdtExtraMetaSource.requestWallClockTime();
      }
      if (requests.lamportTimestamp === true) {
        crdtExtraMetaSource.requestLamportTimestamp();
      }
    }
    super.sendPrimitive(message);
  }

  protected receivePrimitive(
    message: string | Uint8Array,
    meta: MessageMeta
  ): void {
    this.receiveCRDT(message, CRDTMessageMeta.from(meta));
  }

  protected abstract receiveCRDT(
    message: string | Uint8Array,
    meta: CRDTMessageMeta
  ): void;
}
