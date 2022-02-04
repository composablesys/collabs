import {
  CRDTExtraMetaBatchMessage,
  ICRDTExtraMetaMessage,
} from "../../../../generated/proto_compiled";
import { Message, MessageMeta, Serializable } from "../../../core";
import { int64AsNumber } from "../../../util";
import {
  ReceiveCRDTExtraMeta,
  SendCRDTExtraMeta,
} from "./crdt_extra_meta_implementations";
import { Transaction } from "./transaction";

export class SendCRDTExtraMetaBatch implements Serializable {
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

    // Note this may change our metas (e.g., ending the
    // current transaction, hence pushing its meta onto
    // this.metas).
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
        count: meta.count,
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
}

export class ReceiveCRDTExtraMetaBatch {
  readonly metas: ReceiveCRDTExtraMeta[];

  constructor(sender: string, serialized: Uint8Array) {
    const decoded = CRDTExtraMetaBatchMessage.decode(serialized);
    this.metas = new Array<ReceiveCRDTExtraMeta>(decoded.metas.length);
    const firstSenderCounter = int64AsNumber(decoded.firstSenderCounter);
    for (let i = 0; i < this.metas.length; i++) {
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

      this.metas[i] = new ReceiveCRDTExtraMeta(
        message.count,
        sender,
        firstSenderCounter + i,
        vectorClock,
        wallClockTime,
        lamportTimestamp,
        causallyMaximalVCKeys
      );
    }
  }

  private currentTransaction = 0;
  private nextMessage = 0;
  private transactionMessages: { messagePath: Message[]; meta: MessageMeta }[] =
    [];

  /**
   * [received description]
   * @param messagePath [description]
   * @param meta        [description]
   * @return Whether the current transaction is complete,
   * hence completeTransaction must be called next.
   */
  received(messagePath: Message[], meta: MessageMeta): boolean {
    this.transactionMessages[this.nextMessage] = { messagePath, meta };
    this.nextMessage++;
    return this.nextMessage === this.metas[this.currentTransaction].count;
  }

  completeTransaction(): Transaction {
    const ret: Transaction = {
      crdtExtraMeta: this.metas[this.currentTransaction],
      messages: this.transactionMessages,
    };
    this.currentTransaction++;
    this.nextMessage = 0;
    this.transactionMessages = [];
    return ret;
  }

  isFinished() {
    return this.currentTransaction === this.metas.length;
  }
}
