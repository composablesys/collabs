import { MetaRequest } from "@collabs/core";

/**
 * CRDT-related meta for an update.
 *
 * [[CRuntime]] puts this meta in [[UpdateMeta.runtimeExtra]]
 * whenever it delivers a message or saved state.
 * To access it more easily, consider extending [[PrimitiveCRDT]].
 *
 * All messages in the same [transaction](../../transactions.md)
 * have the same [[CRDTMeta]].
 *
 * Properties are only included if they were accessed during the
 * sender's own local echo (i.e., within their
 * [[PrimitiveCRDT.receiveCRDT]] / [[Collab.receive]] call)
 * or requested by a [[CRDTMetaRequest]] passed to
 * [[PrimitiveCRDT.sendCRDT]] / [[Collab.send]].
 * Other fields are null, or 0 for [[vectorClockGet]].
 */
export interface CRDTMeta {
  /**
   * Copy of [[UpdateMeta.senderID]], for convenience.
   */
  readonly senderID: string;
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
   *
   * When `replicaID` is `senderID`, this is the same as senderCounter.
   *
   * If not requested or accessed by the sender, returns 0.
   */
  vectorClockGet(replicaID: string): number;
  /**
   * The sender's wall clock time (`Date.now()`)
   * for the transaction that created this item.
   *
   * If not requested or accessed by the sender, this is null.
   */
  readonly wallClockTime: number | null;
  /**
   * The [Lamport timestamp](https://en.wikipedia.org/wiki/Lamport_timestamp)
   * for the transaction that created this item.
   *
   * If not requested or accessed by the sender, this is null.
   */
  readonly lamportTimestamp: number | null;
}

/**
 * A request for specific [[CRDTMeta]] fields.
 *
 * This is the [[MetaRequest]] type for [[CRuntime]],
 * as passed to [[PrimitiveCRDT.sendCRDT]] / [[Collab.send]].
 *
 * All requests are in addition to those accessed during
 * the sender's own local echo.
 * For most CRDTs, the sender-accessed fields suffice,
 * so requests are not necessary.
 */
export interface CRDTMetaRequest extends MetaRequest {
  /**
   * Requests additional vector clock entries for
   * [[CRDTMeta.vectorClockGet]], keyed by replicaID.
   */
  vectorClockKeys?: Iterable<string>;
  /**
   * Requests [[CRDTMeta.wallClockTime]].
   */
  wallClockTime?: boolean;
  /**
   * Requests [[CRDTMeta.lamportTimestamp]].
   */
  lamportTimestamp?: boolean;
}

/**
 * Flag on an [[IRuntime]] indicating that it provides [[CRDTMeta]]
 * in [[UpdateMeta.runtimeExtra]].
 *
 * Collabs that use [[CRDTMeta]] are encouraged to check this flag
 * in their constructor ([[PrimitiveCRDT]] does this for you).
 */
export interface CRDTMetaProvider {
  /**
   * [[CRDTMetaProvider]] flag.
   */
  readonly providesCRDTMeta: true;
}
