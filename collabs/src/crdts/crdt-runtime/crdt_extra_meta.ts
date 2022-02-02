export interface VectorClock {
  /**
   * The maximum senderCounter received from replicaID,
   * or 0 if none have been received.
   * Equivalently, the number of messages received from
   * replicaID.
   * When replicaID is sender, this is the same as senderCounter.
   */
  get(replicaID: string): number;
}

/**
 * Extra field on [[MessageMeta]] that gives metadata
 * relevant to CRDTs.
 *
 * Keyed by [[CRDTExtraMeta.MESSAGE_META_KEY]].
 */
export interface CRDTExtraMeta {
  readonly senderCounter: number;
  readonly vectorClock: VectorClock;
  readonly wallClockTime: number | null;
  readonly lamportTimestamp: number | null;
}

export const CRDTExtraMeta = {
  MESSAGE_META_KEY: Symbol(),
} as const;

/**
 * A source of [[CRDTExtraMeta]].
 *
 * Access via [[Collab.getContext]] key
 * [[CRDTExtraMetaSource.CONTEXT_KEY]].
 */
export interface CRDTExtraMetaSource {
  requestWallClockTime(): void;
  requestLamportTimestamp(): void;
}

export const CRDTExtraMetaSource = {
  /**
   * [[Collab.getContext]] key that returns the
   * [[CRDTExtraMetaSource]]. Use this to request fields
   * on the next message's [[CRDTExtraMeta]].
   */
  CONTEXT_KEY: Symbol(),
} as const;
