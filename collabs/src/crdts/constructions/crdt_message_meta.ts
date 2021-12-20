import { MessageMeta } from "../../core";
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

export const CRDTMessageMeta = {
  from(meta: MessageMeta): CRDTMessageMeta {
    const crdtExtraMeta = <CRDTExtraMeta | undefined>(
      meta[CRDTExtraMeta.MESSAGE_META_KEY]
    );
    if (crdtExtraMeta === undefined) {
      throw new Error(
        "CRDTExtraMeta not supplied to CRDT. Expected from a CRDTExtraMetaLayer ancestor."
      );
    }

    return {
      ...meta,
      ...crdtExtraMeta,
    };
  },
} as const;
