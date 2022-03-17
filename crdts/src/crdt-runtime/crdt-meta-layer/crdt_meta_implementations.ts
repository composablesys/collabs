import { CRDTMeta, CRDTMetaRequestee } from "../crdt_meta";

export class SendCRDTMeta implements CRDTMeta, CRDTMetaRequestee {
  count = 0;
  /**
   * The requested vector clock entries so far, excluding sender.
   *
   * This always includes the causallyMaximalVCKeys.
   */
  readonly vectorClockIfRequested = new Map<string, number>();
  wallClockTimeIfRequested: number | null = null;
  lamportTimestampIfRequested: number | null = null;

  /**
   * Note this may be toggled back and forth by
   * [[CRDTMetaLayer]], in addition to
   * [[requestAutomatic]].
   */
  isAutomatic = false;
  private isFrozen = false;

  /**
   * @param causallyMaximalVCKeys Permitted to contain
   * sender, but it will be deleted anyway.
   */
  constructor(
    readonly sender: string,
    readonly senderCounter: number,
    /**
     * Sender's entry is not used, so it's okay that it
     * is inaccurate (will be 1 too small, since this
     * will just be CRDTMetaLayer.currentVectorClock).
     * Also, this will no longer be consulted after freeze(), so
     * it's okay to mutate it as long as you do so after freeze()
     * (currently called in CRDTMetaLayer.endTransaction).
     */
    private readonly actualVectorClock: Map<string, number>,
    private readonly actualWallClockTime: number,
    private readonly actualLamportTimestamp: number,
    /** Excludes sender. Must all be present in actualVectorClock. */
    readonly causallyMaximalVCKeys: Set<string>
  ) {
    this.causallyMaximalVCKeys.delete(sender);
    for (const replicaID of causallyMaximalVCKeys) {
      this.vectorClockIfRequested.set(
        replicaID,
        actualVectorClock.get(replicaID)!
      );
    }
  }

  freeze() {
    this.isFrozen = true;
    this.isAutomatic = false;
  }

  private checkFrozen(): void {
    if (this.isFrozen) {
      throw new Error("Requests not allowed - transaction already complete");
    }
  }

  vectorClockGet(replicaID: string): number {
    if (replicaID === this.sender) return this.senderCounter;
    else {
      if (this.isAutomatic) {
        this.requestVectorClockEntry(replicaID);
      }
      return this.vectorClockIfRequested.get(replicaID) ?? 0;
    }
  }

  get wallClockTime(): number | null {
    if (this.isAutomatic) {
      this.requestWallClockTime();
    }
    return this.wallClockTimeIfRequested;
  }

  get lamportTimestamp(): number | null {
    if (this.isAutomatic) {
      this.requestLamportTimestamp();
    }
    return this.lamportTimestampIfRequested;
  }

  requestAutomatic(): void {
    this.isAutomatic = true;
  }

  requestVectorClockEntry(replicaID: string): void {
    this.checkFrozen();
    if (replicaID !== this.sender) {
      const entry = this.actualVectorClock.get(replicaID);
      if (entry !== undefined) {
        this.vectorClockIfRequested.set(replicaID, entry);
      }
    }
  }

  requestWallClockTime(): void {
    this.checkFrozen();
    this.wallClockTimeIfRequested = this.actualWallClockTime;
  }

  requestLamportTimestamp(): void {
    this.checkFrozen();
    this.lamportTimestampIfRequested = this.actualLamportTimestamp;
  }

  requestAll(): void {
    this.checkFrozen();
    // Request all vector clock entries.
    for (const [replicaID, entry] of this.actualVectorClock) {
      if (replicaID !== this.sender) {
        this.vectorClockIfRequested.set(replicaID, entry);
      }
    }
    // Other requests.
    this.wallClockTimeIfRequested = this.actualWallClockTime;
    this.lamportTimestampIfRequested = this.actualLamportTimestamp;
  }

  toString(): string {
    return JSON.stringify({
      sender: this.sender,
      senderCounter: this.senderCounter,
      vectorClock: Object.entries(this.vectorClockIfRequested),
      wallClockTime: this.wallClockTime,
      lamportTimestamp: this.lamportTimestamp,
    });
  }
}

export class ReceiveCRDTMeta implements CRDTMeta {
  constructor(
    readonly count: number,
    readonly sender: string,
    readonly senderCounter: number,
    /**
     * Excludes sender.
     */
    readonly vectorClock: Map<string, number>,
    readonly wallClockTime: number | null,
    readonly lamportTimestamp: number | null,
    /**
     * Excludes sender. Empty if CRDTMetaLayer's
     * causalityGuaranteed flag is true.
     */
    readonly causallyMaximalVCKeys: string[]
  ) {}

  vectorClockGet(replicaID: string): number {
    if (replicaID === this.sender) return this.senderCounter;
    else return this.vectorClock.get(replicaID) ?? 0;
  }

  toString(): string {
    return JSON.stringify({
      sender: this.sender,
      senderCounter: this.senderCounter,
      vectorClock: Object.entries(this.vectorClock),
      wallClockTime: this.wallClockTime,
      lamportTimestamp: this.lamportTimestamp,
    });
  }
}
