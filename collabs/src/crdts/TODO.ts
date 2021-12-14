// TODO: Also CausalMeta, CausalMetaLayer, OpBasedCrdt that casts
// to them, ways to request them.

export interface VectorClock {
  /**
   * The maximum senderCounter received from replicaId,
   * or 0 if none have been received.
   * Equivalently, the number of messages received from
   * replicaId.
   * When replicaId is sender, this is senderCounter.
   */
  get(replicaId: string): number;
}
