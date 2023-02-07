import { int64AsNumber, SerializableMessage } from "@collabs/core";
import {
  CRDTMetaBatchMessage,
  ICRDTMetaMessage,
} from "../../../generated/proto_compiled";
import { ReceiveCRDTMeta, SendCRDTMeta } from "./crdt_meta_implementations";
import { ReceiveTransaction } from "./receive_transaction";

export class SendCRDTMetaBatch implements SerializableMessage {
  readonly metas: SendCRDTMeta[] = [];
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

    // In the simple case of a single transaction with no requested metadata and
    // no non-sender causally maximal VC entries, skip adding metadata at all.
    let simple = false;
    if (this.metas.length === 1) {
      const meta = this.metas[0];
      if (
        meta.vectorClockIfRequested.size === 0 &&
        meta.wallClockTimeIfRequested === null &&
        meta.lamportTimestampIfRequested === null
      ) {
        simple = true;
      }
    }

    let metasSerialized: ICRDTMetaMessage[];
    if (simple) {
      metasSerialized = [];
    } else {
      metasSerialized = new Array<ICRDTMetaMessage>(this.metas.length);
      for (let i = 0; i < this.metas.length; i++) {
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
    }

    const message = CRDTMetaBatchMessage.create({
      firstSenderCounter: this.metas[0].senderCounter,
      metas: metasSerialized,
    });
    return CRDTMetaBatchMessage.encode(message).finish();
  }
}

export class ReceiveCRDTMetaBatch {
  readonly metas: ReceiveCRDTMeta[];

  constructor(sender: string, totalCount: number, serialized: Uint8Array) {
    const decoded = CRDTMetaBatchMessage.decode(serialized);
    const firstSenderCounter = int64AsNumber(decoded.firstSenderCounter);

    if (decoded.metas.length === 0) {
      // "Simple" case.
      this.metas = new Array<ReceiveCRDTMeta>(1);
      this.metas[0] = new ReceiveCRDTMeta(
        totalCount,
        sender,
        firstSenderCounter,
        new Map(),
        null,
        null,
        []
      );
    } else {
      this.metas = new Array<ReceiveCRDTMeta>(decoded.metas.length);
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

        this.metas[i] = new ReceiveCRDTMeta(
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
  }

  private currentTransaction = 0;
  private nextMessage = 0;
  private transactionMessages: (Uint8Array | string)[][] = [];

  /**
   * [received description]
   * @param messageStack [description]
   * @return Whether the current transaction is complete,
   * hence completeTransaction must be called next.
   */
  received(messageStack: (Uint8Array | string)[]): boolean {
    this.transactionMessages[this.nextMessage] = messageStack;
    this.nextMessage++;
    return this.nextMessage === this.metas[this.currentTransaction].count;
  }

  completeTransaction(): ReceiveTransaction {
    const ret: ReceiveTransaction = {
      crdtMeta: this.metas[this.currentTransaction],
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
