import { ReceiveCRDTMeta } from "./crdt_meta_implementations";

/**
 * A received transaction that is not a local echo.
 *
 * Since it is not a local echo, we know that
 * UpdateMeta.isLocalEcho
 * is false, and that all messages are Uint8Array | string.
 * Also, because CRDTMetaLayer assumes that its ancestors
 * add no extra meta, the inherited UpdateMeta is just
 * `{ sender, isLocalEcho }`.
 */
export interface ReceiveTransaction {
  readonly crdtMeta: ReceiveCRDTMeta;
  /**
   * Each array element is a messagePath.
   */
  readonly messages: (Uint8Array | string)[][];
}
