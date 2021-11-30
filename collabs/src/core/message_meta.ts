import { Optional } from "../util";

export interface VectorClock {
  get(replicaId: string): number | undefined;
}

export interface MessageMeta {
  readonly isLocal: boolean;
  readonly sender: string;
  readonly senderCounter: number;

  readonly vectorClock: Optional<VectorClock>;
  requestVectorClock(): void;

  readonly wallClockTime: Optional<number>;
  requestWallClockTime(): void;

  readonly lamportTimestamp: Optional<number>;
  requestLamportTimestamp(): void;
}
