import { ReceiveCRDTExtraMeta } from "./crdt_extra_meta_implementations";

/**
 * A received transaction that is not a local echo.
 *
 * Since it is not a local echo, we know that
 * MessageMeta.isLocalEcho
 * is false, and that all messages are Uint8Array | string.
 * Also, because CRDTExtraMetaLayer assumes that its ancestors
 * add no extra meta, the inherited MessageMeta is just
 * `{ sender, isLocalEcho }`.
 */
export interface ReceiveTransaction {
  readonly crdtExtraMeta: ReceiveCRDTExtraMeta;
  /**
   * Each array element is a messagePath.
   */
  readonly messages: (Uint8Array | string)[][];
}
