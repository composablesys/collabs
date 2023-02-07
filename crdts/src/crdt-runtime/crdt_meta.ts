/**
 * Extra field on [[UpdateMeta]] that gives metadata
 * relevant to CRDTs.
 *
 * Keyed by [[CRDTMeta.MESSAGE_META_KEY]].
 *
 * The easiest way to access this extra metadata is by
 * subclassing [[PrimitiveCRDT]]. It provides an abstract
 * method [[PrimitiveCRDT.receiveCRDT]] in place of
 * [[Collab.receive]], which receives the [[CRDTMeta]]
 * as an argument.
 *
 * To ensure access to [[CRDTMeta]], a [[Collab]] must
 * be a descendant of [[CRDTMetaLayer]] in the tree
 * of [[Collab]]s. Using [[CRDTApp]] ensures this
 * for all [[Collab]]s.
 *
 * All messages in the same [transaction](../../transactions.md)
 * will have the same [[CRDTMeta]]. In particular,
 * [[senderCounter]] and [[lamportTimestamp]] may be repeated
 * for the same sender, so they cannot be
 * used as part of a unique identifer
 * (see [[Runtime.nextLocalCounter]] instead).
 *
 * [[vectorClockGet]] values, [[wallClockTime]],
 * and [[lamportTimestamp]] are not included by default.
 * Instead, they must be requested from the ambient
 * [[CRDTExtraMetaRequestee]], accessed via
 *  [[Collab.getContext]]([[CRDTMetaRequestee.CONTEXT_KEY]]).
 * The easiest way to do this is again to subclass
 * [[PrimitiveCRDT]]; its [[PrimitiveCRDT.sendCRDT]] method takes
 * requests as an argument. Notes:
 * - You may succeed at accessing a field you did not request,
 * if it was included due to another request in the same
 * transaction or (for vector clock entries) if it was included
 * for causal ordering purposes.
 * - If you attempt to access a field you did not request,
 * it may fail on the sending replica but succeed on
 * remote replicas. This happens if the field was requested
 * by a later message in the same transaction.
 */
export interface CRDTMeta {
  /**
   * The transaction's sender's [[Runtime.replicaID]].
   */
  readonly sender: string;
  /**
   * The sender's own vector clock entry for this transaction.
   *
   * I.e., this transaction's index (1-indexed) among all
   * transactions sent by [[sender]].
   */
  readonly senderCounter: number;
  /**
   * The maximum `senderCounter` received from `replicaID`,
   * or 0 if none have been received.
   * Equivalently, the number of transactions received from
   * replicaID.
   * When `replicaID` is sender, this is the same as senderCounter.
   *
   * Must be requested by the sender using
   * [[CRDTMetaRequestee.requestVectorClockEntry]]
   * (or a broader request). If not requested,
   * this may return 0 as if `replicaID` had never
   * sent any messages, regardless of the actual value.
   */
  vectorClockGet(replicaID: string): number;
  /**
   * The sender's wall clock time (`Date.now()`) when
   * they sent the transaction (more precisely, when
   * this [[CRDTMeta]] was created for the transaction).
   *
   * Must by requested by the sender using
   * [[CRDTMetaRequestee.requestWallClockTime]]
   * (or a broader request); otherwise it may be null.
   */
  readonly wallClockTime: number | null;
  /**
   * The transaction's [Lamport Timestamp](https://en.wikipedia.org/wiki/Lamport_timestamp).
   *
   * Unlike the traditional definition of Lamport timestamp
   * (in which every message is an "event" that
   * increments the timestamp), we only count
   * *transactions that requested this field*
   * as events. That is:
   * - Transactions that do **not** request this field do
   * not increment the local Lamport timestamp.
   * - Transactions that **do** request this field
   * increase the local Lamport timestamp by 1,
   * regardless of how many messages are in the transaction.
   *
   * Must by requested by the sender using
   * [[CRDTMetaRequestee.requestLamportTimestamp]]
   * (or a broader request); otherwise it may be null.
   */
  readonly lamportTimestamp: number | null;
}

export const CRDTMeta = {
  /**
   * [[UpdateMeta]] extra metadata key.
   *
   * That is, if `meta` is a [[UpdateMeta]] that contains
   * added [[CRDTMeta]], then you can access it via
   * `<CRDTMeta>meta[CRDTMeta.MESSAGE_META_KEY]`.
   */
  MESSAGE_META_KEY: Symbol(),
} as const;

/**
 * Target of [[CRDTMeta]] requests.
 *
 * The easiest way to make requests is to subclass
 * [[PrimitiveCRDT]]; its [[PrimitiveCRDT.sendCRDT]] method takes
 * requests as an argument. You can access this
 * directly via [[Collab.getContext]] key
 * [[CRDTMetaRequestee.CONTEXT_KEY]].
 */
export interface CRDTMetaRequestee {
  requestWallClockTime(): void;
  requestLamportTimestamp(): void;
  requestVectorClockEntry(replicaID: string): void;
  /**
   * Request all metadata (wallClockTime,
   * lamportTimestamp, and all vectorClock entries).
   */
  requestAll(): void;
  /**
   * Request all metadata accessed while processing
   * the next message's local echo.
   *
   * This is sufficient for most use cases, but you
   * should think carefully through the steps that
   * remote recipients would take, and ensure that they
   * only need to access the same metadata as the sender.
   * In particular, ensure that it is okay for
   * remote replicas to see incorrect 0 entries in
   * the vector clock, so long as that only happens with
   * entries not accessed by the sender.
   */
  requestAutomatic(): void;
}

export const CRDTMetaRequestee = {
  /**
   * [[Collab.getContext]] key that returns the
   * [[CRDTMetaRequestee]]. Use this to request fields
   * on the next message's [[CRDTMeta]].
   */
  CONTEXT_KEY: Symbol(),
} as const;
