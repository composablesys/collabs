import { CPrimitive } from "../../constructions";
import { CollabEventsRecord, MessageMeta, Message } from "../../core";
import { CRDTExtraMeta, CRDTExtraMetaRequestee } from "../crdt-runtime";

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
      automatic?: boolean;
      vectorClockEntries?: Iterable<string>;
      wallClockTime?: boolean;
      lamportTimestamp?: boolean;
      all?: boolean;
    }
  ): void {
    if (requests !== undefined) {
      const crdtExtraMetaRequestee = <CRDTExtraMetaRequestee>(
        this.getContext(CRDTExtraMetaRequestee.CONTEXT_KEY)
      );
      if (requests.automatic === true) {
        crdtExtraMetaRequestee.requestAutomatic();
      }
      if (requests.vectorClockEntries !== undefined) {
        for (const replicaID of requests.vectorClockEntries) {
          crdtExtraMetaRequestee.requestVectorClockEntry(replicaID);
        }
      }
      if (requests.wallClockTime === true) {
        crdtExtraMetaRequestee.requestWallClockTime();
      }
      if (requests.lamportTimestamp === true) {
        crdtExtraMetaRequestee.requestLamportTimestamp();
      }
      if (requests.all === true) {
        crdtExtraMetaRequestee.requestAll();
      }
    }
    super.sendPrimitive(message);
  }

  protected receivePrimitive(
    message: string | Uint8Array,
    meta: MessageMeta
  ): void {
    this.receiveCRDT(
      message,
      meta,
      <CRDTExtraMeta>meta[CRDTExtraMeta.MESSAGE_META_KEY]
    );
  }

  protected abstract receiveCRDT(
    message: string | Uint8Array,
    meta: MessageMeta,
    crdtExtraMeta: CRDTExtraMeta
  ): void;
}
