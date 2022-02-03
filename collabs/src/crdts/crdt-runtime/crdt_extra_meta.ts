/**
 * Extra field on [[MessageMeta]] that gives metadata
 * relevant to CRDTs.
 *
 * Keyed by [[CRDTExtraMeta.MESSAGE_META_KEY]].
 */
export interface CRDTExtraMeta {
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

export const CRDTExtraMeta = {
  MESSAGE_META_KEY: Symbol(),
} as const;

/**
 * TODO
 *
 * Access via [[Collab.getContext]] key
 * [[CRDTExtraMetaRequestee.CONTEXT_KEY]].
 */
export interface CRDTExtraMetaRequestee {
  requestWallClockTime(): void;
  requestLamportTimestamp(): void;
  requestVectorClockEntry(replicaID: string): void;
  requestAll(): void;
  requestAutomatic(): void;
}

export const CRDTExtraMetaRequestee = {
  /**
   * [[Collab.getContext]] key that returns the
   * [[CRDTExtraMetaRequestee]]. Use this to request fields
   * on the next message's [[CRDTExtraMeta]].
   */
  CONTEXT_KEY: Symbol(),
} as const;
