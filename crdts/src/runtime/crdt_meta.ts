import { MetaRequest } from "@collabs/core";

export interface VectorClock {
  /**
   * Returns `replicaID`'s vector clock entry for the update.
   *
   * By definition, this equals the maximum `senderCounter` received from
   * `replicaID` before this update was sent/saved,
   * or 0 if no messages had been received from `replicaID`.
   */
  get(replicaID: string): number;
}

// OPT: for load and save, include an array of all replicaIDs, so that
// savers can reference indices in that array instead of redundantly
// repeating replicaIDs everywhere. Would require meta arg to save().

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
   * The message's vector clock.
   *
   * In the vector clock, entries that were not
   * accessed or requested by the sender return 0, regardless of
   * the actual value.
   */
  readonly vectorClock: VectorClock;
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
   * When present, it is always positive.
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
   * [[CRDTMessageMeta.vectorClock]], keyed by replicaID.
   */
  vectorClockKeys?: Iterable<string>;
  /**
   * Requests [[CRDTMessageMeta.wallClockTime]].
   */
  wallClockTime?: boolean;
  /**
   * Requests [[CRDTMessageMeta.lamportTimestamp]].
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
 * Unlike [[CRDTMessageMeta]], all properties are always included;
 * there is no "request" mechanism.
 */
export interface CRDTSavedStateMeta {
  /**
   * Copy of [[UpdateMeta.senderID]], for convenience.
   */
  readonly senderID: string;
  /**
   * The local replica's vector clock (prior to merging
   * savedState's vector clock).
   */
  localVectorClock: VectorClock;
  /**
   * The saved state's vector clock, i.e., the remote replica's
   * vector clock at the time [[Collab.save]] was called.
   */
  remoteVectorClock: VectorClock;
  /**
   * The local replica's [Lamport timestamp](https://en.wikipedia.org/wiki/Lamport_timestamp)
   * (prior to merging savedState's Lamport timestamp).
   */
  localLamportTimestamp: number;
  /**
   * The saved state's [Lamport timestamp](https://en.wikipedia.org/wiki/Lamport_timestamp),
   * i.e., the remote replica's Lamport timestamp at the time [[Collab.save]]
   * was called.
   */
  remoteLamportTimestamp: number;
}
