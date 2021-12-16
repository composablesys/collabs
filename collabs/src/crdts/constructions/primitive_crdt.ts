import { CPrimitive } from "../../constructions";
import { CollabEventsRecord, MessageMeta } from "../../core";
import { CRDTExtraMeta, VectorClock } from "../crdt-runtime";

/**
 * Extension of [[MessageMeta]] that includes extra
 * metadata relevant to CRDTs in a convenient form.
 *
 * This is passed directly to [[PrimitiveCRDT.receiveCRDT]]
 * in place of the usual [[MessageMeta]]. That is in contrast
 * to [[CRDTExtraMeta]], which is included as an extra field
 * of a normal [[MessageMeta]], keyed by [[CRDTExtraMeta.MESSAGE_META_KEY]].
 * However, they include the same information; this class
 * is merely a convenience for PrimitiveCRDTs.
 */
export interface CRDTMessageMeta extends MessageMeta {
  readonly senderCounter: number;
  // TODO: make these optional, need to be requested in context.
  readonly vectorClock: VectorClock;
  readonly wallClockTime: number;
  readonly lamportTimestamp: number;
}

/**
 * Superclass for a primitive (message-passing) op-based CRDT.
 *
 * TODO: rules: sendCRDT/receiveCRDT in causal order, with
 * requested CRDT metadata. Model is of an op-based CRDT as
 * defined by TODO.
 *
 * TODO: context/meta/ancestor reqs.
 *
 * TODO: difference from CPrimitive: adds CRDT meta, that's it.
 */
export abstract class PrimitiveCRDT<
  Events extends CollabEventsRecord = CollabEventsRecord
> extends CPrimitive<Events> {
  protected sendCRDT(message: string | Uint8Array): void {
    super.sendPrimitive(message);
  }

  protected receivePrimitive(
    message: string | Uint8Array,
    meta: MessageMeta
  ): void {
    const crdtExtraMeta = <CRDTExtraMeta | undefined>(
      meta[CRDTExtraMeta.MESSAGE_META_KEY]
    );
    if (crdtExtraMeta === undefined) {
      throw new Error(
        "CRDTExtraMeta not supplied to PrimitiveCRDT. Expected from a CRDTExtraMetaLayer ancestor."
      );
    }

    this.receiveCRDT(message, {
      ...meta,
      ...crdtExtraMeta,
    });
  }

  protected abstract receiveCRDT(
    message: string | Uint8Array,
    meta: CRDTMessageMeta
  ): void;
}
