import { Optional } from "../util";

export interface VectorClock {
  get(replicaId: string): number | undefined;
}

export interface MessageMeta {
  readonly isLocal: boolean;
  readonly sender: string;
  /**
   * A counter for messages sent by this sender, starting at 0.
   */
  readonly senderCounter: number;

  readonly vectorClock: Optional<VectorClock>;
  requestVectorClock(): void;

  readonly wallClockTime: Optional<number>;
  requestWallClockTime(): void;

  readonly lamportTimestamp: Optional<number>;
  requestLamportTimestamp(): void;
}

/**
 * Minimal implementation of MessageMeta that includes only
 * mandatory fields. requests throw an error.
 */
export class MandatoryMessageMeta implements MessageMeta {
  constructor(
    readonly isLocal: boolean,
    readonly sender: string,
    readonly senderCounter: number
  ) {}

  readonly vectorClock = Optional.empty<VectorClock>();
  requestVectorClock(): void {
    throw new Error("MandatoryMessageMeta does not support requests.");
  }

  readonly wallClockTime = Optional.empty<number>();
  requestWallClockTime(): void {
    throw new Error("MandatoryMessageMeta does not support requests.");
  }

  readonly lamportTimestamp = Optional.empty<number>();
  requestLamportTimestamp(): void {
    throw new Error("MandatoryMessageMeta does not support requests.");
  }
}
