import { int64AsNumber, Serializer, UpdateMeta } from "@collabs/core";
import { CRDTMetaMessage } from "../../generated/proto_compiled";
import { CRDTMessageMeta, CRDTSavedStateMeta, VectorClock } from "./crdt_meta";

export class BasicVectorClock implements VectorClock {
  constructor(
    readonly vcEntries: Map<string, number>,
    private readonly senderID?: string,
    private readonly senderCounter?: number
  ) {}

  get(replicaID: string): number {
    // TODO: get rid of senderID case? Seems like our VC entry should
    // always be present now (& make it present if not).
    if (replicaID === this.senderID) return this.senderCounter!;
    else return this.vcEntries.get(replicaID) ?? 0;
  }
}

export class SendCRDTMeta implements CRDTMessageMeta {
  readonly senderCounter: number;
  readonly vectorClock: VectorClock;

  /**
   * The requested vector clock entries so far. Excludes this.sender
   * (uses senderCounter instead), includes causallyMaximalVCKeys.
   *
   * Public only for [[CRDTMetaSerializer]].
   */
  readonly vcEntries = new Map<string, number>();
  /**
   * The number of entries at the beginning of requestedVC's
   * iterator order that are causally maximal.
   */
  readonly maximalVcKeyCount: number;
  private wallClockTimeIfRequested: number | null = null;
  private lamportTimestampIfRequested: number | null = null;
  /**
   * Note this may be toggled back and forth.
   */
  private isAutomatic = false;
  private isFrozen = false;

  constructor(
    readonly senderID: string,
    private readonly actualVC: Map<string, number>,
    /** We "copy" this right away. Okay to contain sender, but we'll ignore it. */
    causallyMaximalVCKeys: Set<string>,
    private readonly actualWallClockTime: number,
    private readonly actualLamportTimestamp: number
  ) {
    this.senderCounter = actualVC.get(senderID)!;
    let count = causallyMaximalVCKeys.size;
    for (const replicaID of causallyMaximalVCKeys) {
      if (replicaID === this.senderID) {
        count--;
        continue;
      }
      this.vcEntries.set(replicaID, actualVC.get(replicaID)!);
    }
    this.maximalVcKeyCount = count;
    this.vectorClock = { get: this.vectorClockGet.bind(this) };
  }

  private vectorClockGet(replicaID: string): number {
    if (replicaID === this.senderID) return this.senderCounter;
    else {
      if (this.isAutomatic) {
        this.requestVectorClockEntry(replicaID);
      }
      const clock = this.vcEntries.get(replicaID);
      if (!this.isFrozen && clock === undefined) {
        throw new Error(
          "You must request a vector clock entry (or automatic mode) to access it (entry:" +
            replicaID +
            ")"
        );
      }
      return clock ?? 0;
    }
  }

  get wallClockTime(): number | null {
    if (this.isAutomatic) {
      this.requestWallClockTime();
    } else if (!this.isFrozen && this.wallClockTimeIfRequested === null) {
      throw new Error(
        "You must request wallClockTime (or automatic mode) to access it"
      );
    }
    return this.wallClockTimeIfRequested;
  }

  get lamportTimestamp(): number | null {
    if (this.isAutomatic) {
      this.requestLamportTimestamp();
    } else if (!this.isFrozen && this.lamportTimestampIfRequested === null) {
      throw new Error(
        "You must request lamportTimestamp (or automatic mode) to access it"
      );
    }
    return this.lamportTimestampIfRequested;
  }

  requestAutomatic(value: boolean): void {
    this.isAutomatic = value;
  }

  requestVectorClockEntry(replicaID: string): void {
    if (replicaID !== this.senderID) {
      const entry = this.actualVC.get(replicaID);
      if (entry === undefined) {
        throw new Error("Unknown replicaID: " + replicaID);
      }
      this.vcEntries.set(replicaID, entry);
    }
  }

  requestWallClockTime(): void {
    this.wallClockTimeIfRequested = this.actualWallClockTime;
  }

  requestLamportTimestamp(): void {
    this.lamportTimestampIfRequested = this.actualLamportTimestamp;
  }

  /**
   * Freezes this CRDTMeta at the end of its sending transaction.
   *
   * After freezing, all getters behave like ReceiveCRDTMeta. In
   * particular, getting a non-requested property will return a
   * default value instead of an error. This is in case a Collab
   * stores CRDTMeta after a transaction, then later queries it
   * for e.g. newly-relevant VC entries (expecting 0).
   */
  freeze(): void {
    this.isFrozen = true;
  }

  toString(): string {
    return JSON.stringify({
      sender: this.senderID,
      senderCounter: this.senderCounter,
      vectorClock: Object.entries(this.vcEntries),
      wallClockTime: this.wallClockTime,
      lamportTimestamp: this.lamportTimestamp,
    });
  }
}

// TODO: also used for load
export class ReceiveCRDTMeta implements CRDTMessageMeta {
  readonly vectorClock: VectorClock;

  constructor(
    readonly senderID: string,
    readonly senderCounter: number,
    /**
     * Excludes sender.
     *
     * Public only for [[CRDTMetaSerializer]].
     */
    readonly vcEntries: Map<string, number>,
    /**
     * Excludes sender. Empty if CRDTMetaLayer's
     * causalityGuaranteed flag is true.
     *
     * Used by CausalMessageBuffer.
     */
    readonly maximalVcKeyCount: number,
    readonly wallClockTime: number | null,
    readonly lamportTimestamp: number | null
  ) {
    this.vectorClock = new BasicVectorClock(vcEntries, senderID, senderCounter);
  }

  toString(): string {
    return JSON.stringify({
      sender: this.senderID,
      senderCounter: this.senderCounter,
      vectorClock: Object.entries(this.vcEntries),
      wallClockTime: this.wallClockTime,
      lamportTimestamp: this.lamportTimestamp,
    });
  }
}

/**
 * Serializer for UpdateMeta produced by CRuntime.
 *
 * runtimeExtra field must either ReceiveCRDTMeta
 * or a frozen SendCRDTMeta.
 *
 * TODO: rename (UpdateMetaSerializer)? Not imp b/c not exported.
 */
export class CRDTMetaSerializer implements Serializer<UpdateMeta> {
  private constructor() {
    // Singleton.
  }

  static instance = new this();

  serialize(value: UpdateMeta): Uint8Array {
    const crdtMeta = value.runtimeExtra as SendCRDTMeta | ReceiveCRDTMeta;
    const vcKeys = new Array<string>(crdtMeta.vcEntries.size);
    const vcValues = new Array<number>(crdtMeta.vcEntries.size);
    // Since Map iterator order is set-order and
    // both types set causallyMaximalVCKeys first (in the
    // constructor for SendCRDTMeta),
    // this loop puts causally maximal keys first.
    let i = 0;
    for (const [key, value] of crdtMeta.vcEntries) {
      vcKeys[i] = key;
      vcValues[i] = value;
      i++;
    }
    const message = CRDTMetaMessage.create({
      sender: crdtMeta.senderID,
      senderCounter: crdtMeta.senderCounter,
      vcKeys,
      vcValues,
      maximalVcKeyCount:
        crdtMeta.maximalVcKeyCount === 0
          ? undefined
          : crdtMeta.maximalVcKeyCount,
      wallClockTime: crdtMeta.wallClockTime,
      lamportTimestamp: crdtMeta.lamportTimestamp,
      isLoad: value.updateType === "savedState" ? true : undefined,
    });
    return CRDTMetaMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): UpdateMeta {
    const decoded = CRDTMetaMessage.decode(message);
    const vc = new Map<string, number>();
    for (let i = 0; i < decoded.vcKeys.length; i++) {
      vc.set(decoded.vcKeys[i], int64AsNumber(decoded.vcValues[i]));
    }
    const crdtMeta = new ReceiveCRDTMeta(
      decoded.sender,
      int64AsNumber(decoded.senderCounter),
      vc,
      // Missing converted to 0 by protobufjs - okay.
      int64AsNumber(decoded.maximalVcKeyCount),
      Object.prototype.hasOwnProperty.call(decoded, "wallClockTime")
        ? int64AsNumber(decoded.wallClockTime)
        : null,
      Object.prototype.hasOwnProperty.call(decoded, "lamportTimestamp")
        ? int64AsNumber(decoded.lamportTimestamp)
        : null
    );
    return {
      senderID: crdtMeta.senderID,
      updateType: decoded.isLoad ? "savedState" : "message",
      isLocalOp: false,
      runtimeExtra: crdtMeta,
    };
  }
}

// TODO: also used for load
export class LoadCRDTMeta implements CRDTSavedStateMeta {
  readonly remoteVectorClock: BasicVectorClock;
  readonly localVectorClock: BasicVectorClock;

  constructor(
    localVCEntries: Map<string, number>,
    remoteVCEntries: Map<string, number>,
    readonly localLamportTimestamp: number,
    readonly remoteLamportTimestamp: number
  ) {
    this.localVectorClock = new BasicVectorClock(localVCEntries);
    this.remoteVectorClock = new BasicVectorClock(remoteVCEntries);
  }

  toString(): string {
    return JSON.stringify({
      localVectorClock: Object.entries(this.localVectorClock.vcEntries),
      remoteVectorClock: Object.entries(this.remoteVectorClock.vcEntries),
    });
  }
}
