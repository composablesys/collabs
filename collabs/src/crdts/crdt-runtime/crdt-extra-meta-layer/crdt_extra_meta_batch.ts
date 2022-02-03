import {
  CRDTExtraMetaBatchMessage,
  ICRDTExtraMetaMessage,
} from "../../../../generated/proto_compiled";
import { Serializable } from "../../../core";
import { int64AsNumber } from "../../../util";
import {
  ReceiveCRDTExtraMeta,
  SendCRDTExtraMeta,
} from "./crdt_extra_meta_implementations";

export class CRDTExtraMetaBatch implements Serializable {
  readonly metas: SendCRDTExtraMeta[] = [];
  private alreadySerialized = false;

  constructor(private readonly onSerialize: () => void) {}

  /**
   * @throws if metas is empty
   * @throws if serialize() has already been called
   */
  serialize(): Uint8Array {
    if (this.alreadySerialized) {
      throw new Error("already serialized");
    }
    this.alreadySerialized = true;

    this.onSerialize();

    const metasSerialized = new Array<ICRDTExtraMetaMessage>(this.metas.length);
    for (let i = 0; i < metasSerialized.length; i++) {
      const meta = this.metas[i];
      const causallyMaximalVectorClock: { [replicaID: string]: number } = {};
      const extraVectorClock: { [replicaID: string]: number } = {};
      for (const [replicaID, entry] of meta.vectorClockIfRequested) {
        if (meta.causallyMaximalVCKeys.has(replicaID)) {
          causallyMaximalVectorClock[replicaID] = entry;
        } else extraVectorClock[replicaID] = entry;
      }
      metasSerialized[i] = {
        causallyMaximalVectorClock,
        extraVectorClock,
        wallClockTime: meta.wallClockTimeIfRequested,
        lamportTimestamp: meta.lamportTimestampIfRequested,
      };
    }

    const message = CRDTExtraMetaBatchMessage.create({
      firstSenderCounter: this.metas[0].senderCounter,
      metas: metasSerialized,
    });
    return CRDTExtraMetaBatchMessage.encode(message).finish();
  }

  static deserialize(
    sender: string,
    serialized: Uint8Array
  ): ReceiveCRDTExtraMeta[] {
    const decoded = CRDTExtraMetaBatchMessage.decode(serialized);
    const ans = new Array<ReceiveCRDTExtraMeta>(decoded.metas.length);
    const firstSenderCounter = int64AsNumber(decoded.firstSenderCounter);
    for (let i = 0; i < ans.length; i++) {
      const message = decoded.metas[i];

      const vectorClock = new Map<string, number>();
      const causallyMaximalVCKeys: string[] = [];
      for (const [replicaID, entry] of Object.entries(
        message.causallyMaximalVectorClock!
      )) {
        vectorClock.set(replicaID, int64AsNumber(entry));
        causallyMaximalVCKeys.push(replicaID);
      }
      for (const [replicaID, entry] of Object.entries(
        message.extraVectorClock!
      )) {
        vectorClock.set(replicaID, int64AsNumber(entry));
      }

      const wallClockTime = Object.prototype.hasOwnProperty.call(
        decoded.metas[i],
        "wallClockTime"
      )
        ? int64AsNumber(decoded.metas[i].wallClockTime!)
        : null;
      const lamportTimestamp = Object.prototype.hasOwnProperty.call(
        decoded.metas[i],
        "lamportTimestamp"
      )
        ? int64AsNumber(decoded.metas[i].lamportTimestamp!)
        : null;

      ans[i] = new ReceiveCRDTExtraMeta(
        sender,
        firstSenderCounter,
        vectorClock,
        wallClockTime,
        lamportTimestamp,
        causallyMaximalVCKeys
      );
    }

    return ans;
  }
}
