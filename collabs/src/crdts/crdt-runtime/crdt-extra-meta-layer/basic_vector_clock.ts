import { VectorClock } from "../crdt_extra_meta";

/**
 * Basic [[VectorClock]] implementation that just uses a
 * literal vector clock.
 */
export class BasicVectorClock implements VectorClock {
  /**
   * @param vcMap Includes local replica
   */
  constructor(private readonly vcMap: Map<string, number>) {}

  get(replicaID: string): number {
    return this.vcMap.get(replicaID) ?? 0;
  }

  toString(): string {
    return JSON.stringify(Object.entries(this.vcMap));
  }
}
