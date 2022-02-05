/**
 * Extra field on [[MessageMeta]] that gives metadata
 * relevant to CRDTs.
 *
 * Keyed by [[CRDTMeta.MESSAGE_META_KEY]].
 */
export interface CRDTMeta {
  readonly sender: string;
  readonly senderCounter: number;
  /**
   * The maximum senderCounter received from replicaID,
   * or 0 if none have been received.
   * Equivalently, the number of messages received from
   * replicaID.
   * When replicaID is sender, this is the same as senderCounter.
   */
  vectorClockGet(replicaID: string): number;
  readonly wallClockTime: number | null;
  readonly lamportTimestamp: number | null;
}

export const CRDTMeta = {
  MESSAGE_META_KEY: Symbol(),
} as const;

/**
 * TODO
 *
 * Access via [[Collab.getContext]] key
 * [[CRDTMetaRequestee.CONTEXT_KEY]].
 */
export interface CRDTMetaRequestee {
  requestWallClockTime(): void;
  requestLamportTimestamp(): void;
  requestVectorClockEntry(replicaID: string): void;
  requestAll(): void;
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
