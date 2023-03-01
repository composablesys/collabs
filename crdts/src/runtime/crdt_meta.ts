import { MetaRequest } from "@collabs/core";

/**
 * CRDT-related meta for a message.
 *
 * [[CRuntime]] puts this meta in [[UpdateMeta.runtimeExtra]]
 * whenever it delivers a message to [[Collab.receive]].
 * To access it more easily, consider extending [[PrimitiveCRDT]].
 *
 * All messages in the same transaction
 * have the same [[CRDTMessageMeta]]. <!-- TODO: docs link -->
 *
 * Properties are only included if they were accessed during the
 * sender's own local echo (i.e., within their
 * [[PrimitiveCRDT.receiveCRDT]] / [[Collab.receive]] call)
 * or requested by a [[CRDTMetaRequest]] passed to
 * [[PrimitiveCRDT.sendCRDT]] / [[Collab.send]].
 * Other fields are null, or 0 for [[vectorClockGet]].
 */
export interface CRDTMessageMeta {
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
   * Returns `replicaID`'s vector clock entry for the received message.
   *
   * By definition, this equals the maximum `senderCounter` received from
   * `replicaID` before this message was sent,
   * or 0 if no messages had been received from `replicaID`.
   *
   * When `replicaID` is `senderID`, returns [[senderCounter]].
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
 * A request for specific [[CRDTMessageMeta]] fields.
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
 * CRDT-related meta for a saved state.
 *
 * [[CRuntime]] puts this meta in [[UpdateMeta.runtimeExtra]]
 * whenever it delivers a saved state to [[Collab.load]].
 * To access it more easily, consider extending [[PrimitiveCRDT]].
 *
 * Unlike [[CRDTMessageMeta]], all properties are always included.
 */
export interface CRDTSavedStateMeta {
  /**
   * Returns `replicaID`'s vector clock entry for the saved state.
   *
   * By definition, this equals the maximum `senderCounter` received from
   * `replicaID` before the state was saved,
   * or 0 if no messages had been received from `replicaID`.
   */
  remoteVectorClockGet(replicaID: string): number;
  /**
   * Returns `replicaID`'s vector clock entry on the local replica.
   *
   * By definition, this equals the maximum `senderCounter` received from
   * `replicaID` by this replica,
   * or 0 if no messages have been received from `replicaID`.
   *
   * TODO: don't save for later (this is live view).
   */
  localVectorClockGet(replicaID: string): number;
}
