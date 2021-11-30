export interface VectorClock {
  /**
   * The maximum senderCounter received from replicaId,
   * or 0 if none have been received.
   * Equivalently, the number of messages received from
   * replicaId.
   */
  get(replicaId: string): number;
}

export interface MessageMeta {
  // Mandatory metadata

  readonly isLocal: boolean;
  readonly sender: string;
  /**
   * A counter for messages sent by this sender, starting at 1.
   */
  readonly senderCounter: number;

  // Default optional metadata, only available to descendants of a
  // Crdt that adds them (e.g., MessageMetaLayer).
  readonly vectorClock?: VectorClock;
  /**
   * Note this might go backwards (even on the same replica)
   * or generally act irrationally.
   */
  readonly wallClockTime?: number;
  readonly lamportTimestamp?: number;

  // Crdts may choose to add other metadata as well.
  // It is recommended that these are indexed by Symbols instead
  // of strings, to avoid conflicts.
  // If a field is not added, it will be not present (undefined).
}
