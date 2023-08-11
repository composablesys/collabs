import {
  int64AsNumber,
  MessageMeta,
  nonNull,
  protobufHas,
  Serializer,
} from "@collabs/core";
import { CRDTMessageMetaMessage } from "../../generated/proto_compiled";
import { CRDTMessageMeta, CRDTSavedStateMeta, VectorClock } from "./crdt_meta";

export class BasicVectorClock implements VectorClock {
  constructor(readonly vcEntries: Map<string, number>) {}

  get(replicaID: string): number {
    return this.vcEntries.get(replicaID) ?? 0;
  }
}

export class SendCRDTMeta implements CRDTMessageMeta {
  readonly senderCounter: number;
  readonly vectorClock: VectorClock;

  /**
   * The requested vector clock entries so far, plus
   * senderID and causallyMaximalVCKeys.
   *
   * Iterator order is guaranteed to start with senderID,
   * then causallyMaximalVCKeys.
   *
   * Public only for [[CRDTMetaSerializer]].
   */
  readonly vcEntries = new Map<string, number>();
  /**
   * The number of entries at the beginning of vcEntries's
   * iterator order but after senderID (which is first)
   * that are causally maximal.
   */
  readonly maximalVCKeyCount: number;
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
    /**
     * Causally maximal VC keys minus senderID (even if it's causally maximal).
     *
     * We "copy" this right away, so okay if it is mutated later.
     */
    causallyMaximalVCKeys: Set<string>,
    private readonly actualWallClockTime: number,
    private readonly actualLamportTimestamp: number
  ) {
    this.senderCounter = nonNull(actualVC.get(senderID));
    this.vcEntries.set(senderID, this.senderCounter);

    if (causallyMaximalVCKeys.has(senderID)) {
      throw new Error("Internal error: causallyMaximalVCKeys has senderID");
    }
    this.maximalVCKeyCount = causallyMaximalVCKeys.size;
    for (const replicaID of causallyMaximalVCKeys) {
      this.vcEntries.set(replicaID, nonNull(actualVC.get(replicaID)));
    }

    this.vectorClock = { get: this.vectorClockGet.bind(this) };
  }

  private vectorClockGet(replicaID: string): number {
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
    const entry = this.actualVC.get(replicaID);
    if (entry === undefined) {
      throw new Error("Unknown replicaID: " + replicaID);
    }
    // Don't re-set if already present, to avoid messing up iterator order
    // (needed for causallyMaximalVCKeys).
    if (!this.vcEntries.has(replicaID)) {
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
   * Freezes this SendCRDTMeta at the end of its sending transaction.
   *
   * After freezing, all getters behave like ReceiveCRDTMeta. In
   * particular, getting a non-requested property will return a
   * default value instead of an error. This is in case a Collab
   * stores SendCRDTMeta after a transaction, then later queries it
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

export class ReceiveCRDTMeta implements CRDTMessageMeta {
  readonly vectorClock: VectorClock;

  constructor(
    readonly senderID: string,
    readonly senderCounter: number,
    /**
     * Iterator order must be the same as in SendCRDTMeta.
     *
     * Public only for [[RuntimeMetaSerializer]].
     */
    readonly vcEntries: Map<string, number>,
    /**
     * The number of entries at the beginning of vcEntries's
     * iterator order but after senderID (which is first)
     * that are causally maximal.
     *
     * Empty if CRDTMetaLayer's
     * causalityGuaranteed flag is true.
     */
    readonly maximalVCKeyCount: number,
    readonly wallClockTime: number | null,
    readonly lamportTimestamp: number | null
  ) {
    this.vectorClock = new BasicVectorClock(vcEntries);
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
 * Serializer for MessageMeta produced by CRuntime.
 *
 * runtimeExtra field must be either ReceiveCRDTMeta
 * or a frozen SendCRDTMeta.
 */
export const RuntimeMetaSerializer: Serializer<MessageMeta> = {
  serialize(value: MessageMeta): Uint8Array {
    const crdtMeta = value.runtimeExtra as SendCRDTMeta | ReceiveCRDTMeta;
    const vcKeys = new Array<string>(crdtMeta.vcEntries.size - 1);
    const vcValues = new Array<number>(crdtMeta.vcEntries.size - 1);
    // Write vc entries in the order they were set, skipping senderID
    // (which is first).
    // Thus the order starts with non-sender causallyMaximalVCKeys.
    let i = 0;
    for (const [key, value] of crdtMeta.vcEntries) {
      if (key === crdtMeta.senderID) continue;
      vcKeys[i] = key;
      vcValues[i] = value;
      i++;
    }
    const message = CRDTMessageMetaMessage.create({
      senderID: crdtMeta.senderID,
      senderCounter: crdtMeta.senderCounter,
      vcKeys,
      vcValues,
      maximalVcKeyCount:
        crdtMeta.maximalVCKeyCount === 0
          ? undefined
          : crdtMeta.maximalVCKeyCount,
      wallClockTime: crdtMeta.wallClockTime,
      lamportTimestamp: crdtMeta.lamportTimestamp,
    });
    return CRDTMessageMetaMessage.encode(message).finish();
  },

  deserialize(message: Uint8Array): MessageMeta {
    const decoded = CRDTMessageMetaMessage.decode(message);
    const vc = new Map<string, number>();
    vc.set(decoded.senderID, decoded.senderCounter);
    for (let i = 0; i < decoded.vcKeys.length; i++) {
      vc.set(decoded.vcKeys[i], decoded.vcValues[i]);
    }
    const crdtMeta = new ReceiveCRDTMeta(
      decoded.senderID,
      decoded.senderCounter,
      vc,
      // Missing converted to 0 by protobufjs - okay.
      decoded.maximalVcKeyCount,
      protobufHas(decoded, "wallClockTime")
        ? int64AsNumber(decoded.wallClockTime)
        : null,
      protobufHas(decoded, "lamportTimestamp")
        ? int64AsNumber(decoded.lamportTimestamp)
        : null
    );
    return {
      senderID: crdtMeta.senderID,
      updateType: "message",
      isLocalOp: false,
      runtimeExtra: crdtMeta,
    };
  },
} as const;

export class LoadCRDTMeta implements CRDTSavedStateMeta {
  readonly remoteVectorClock: BasicVectorClock;
  readonly localVectorClock: BasicVectorClock;

  constructor(
    readonly senderID: string,
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
