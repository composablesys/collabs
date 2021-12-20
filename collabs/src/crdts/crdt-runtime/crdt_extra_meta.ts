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
export class CRDTExtraMeta {
  constructor(
    readonly senderCounter: number,
    // TODO: make these optional, need to be requested in context.
    readonly vectorClock: VectorClock,
    readonly wallClockTime: number,
    readonly lamportTimestamp: number
  ) {}

  toString(): string {
    return JSON.stringify(this);
  }

  static readonly MESSAGE_META_KEY = Symbol();
}
