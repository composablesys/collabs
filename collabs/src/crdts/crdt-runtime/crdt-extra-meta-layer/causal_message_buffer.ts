import {
  BytesOrStringMessage,
  CausalMessageBufferSave,
  IReceiveTransactionSave,
} from "../../../../generated/proto_compiled";
import { int64AsNumber } from "../../../util";
import { ReceiveCRDTExtraMeta } from "./crdt_extra_meta_implementations";
import { ReceiveTransaction } from "./transaction";

/**
 * Debug flag, enables console.log's when causality checks
 * fail.
 */
const DEBUG = false;

/**
 * A buffer for delivering messages in causal order, used
 * by [[CRDTExtraMetaLayer]].
 */
export class CausalMessageBuffer {
  /**
   * Internal buffer for messages that have been received but are not
   * causally ready for delivery.
   */
  private readonly buffer: ReceiveTransaction[] = [];

  /**
   * The first index to check for readiness in the buffer.
   */
  private bufferCheckIndex = 0;

  /**
   * May include us, if we are causally maximal
   * (no received messages dominate our last sent message).
   */
  private _causallyMaximalVCKeys = new Set<string>();

  /**
   * @param currentVC A reference to the mutable current
   * vector clock, which you are expected to keep up-to-date,
   * including sender's entry.
   * @param deliver Callback to deliver messages, where
   * "deliver" means "actually process since it's causally
   * ready now".
   */
  constructor(
    private readonly localReplicaID: string,
    private readonly currentVC: Map<string, number>,
    private readonly deliverRemoteTransaction: (
      transaction: ReceiveTransaction
    ) => void
  ) {}

  /**
   * Adds the given message to the buffer, if it has not
   * already been delivered.
   */
  pushRemoteTransaction(transaction: ReceiveTransaction): void {
    if (!this.isAlreadyDelivered(transaction.crdtExtraMeta)) {
      this.buffer.push(transaction);
    } else if (DEBUG) {
      console.log("pushRemoteTransaction: not adding");
      console.log("(already received)");
      console.log([...this.currentVC]);
      console.log(transaction.crdtExtraMeta);
    }
  }

  /**
   * Checks the buffer and `deliver`s any causally ready
   * messages.
   */
  check() {
    // The checking order is from the latest to the oldest.
    let index = this.buffer.length - 1;

    while (index >= this.bufferCheckIndex) {
      const sender = this.buffer[index].crdtExtraMeta.sender;
      const crdtExtraMeta = this.buffer[index].crdtExtraMeta;

      if (this.isReady(crdtExtraMeta, sender)) {
        // Ready for delivery.
        this.processRemoteDelivery(crdtExtraMeta);
        this.deliverRemoteTransaction(this.buffer[index]);
        // Remove from the buffer.
        // OPT: something more efficient?  (Costly array
        // deletions).
        this.buffer.splice(index, 1);
        // Set index to the end and try again, in case
        // this makes more messages ready
        this.bufferCheckIndex = 0;
        index = this.buffer.length - 1;
      } else {
        if (DEBUG) {
          console.log("CRDTExtraMetaLayer.checkMessageBuffer: not ready");
        }
        if (this.isAlreadyDelivered(crdtExtraMeta)) {
          // Remove the message from the buffer
          this.buffer.splice(index, 1);
          if (DEBUG) console.log("(already received)");
        }
        index--;
        if (DEBUG) {
          console.log([...this.currentVC]);
          console.log(crdtExtraMeta);
        }
      }
    }
    this.bufferCheckIndex = this.buffer.length;
  }

  /**
   * @return whether a message with the given vector clock
   * and sender is ready for delivery, according to the causal
   * order.
   */
  private isReady(
    crdtExtraMeta: ReceiveCRDTExtraMeta,
    sender: string
  ): boolean {
    // Check that sender's entry is one more than ours.
    if ((this.currentVC.get(sender) ?? 0) !== crdtExtraMeta.senderCounter - 1) {
      return false;
    }

    // Check that other causally maximal entries are <= ours.
    // Note that this excludes sender, and it also is guaranteed
    // that these entries are present in crdtExtraMeta.
    for (const replicaID of crdtExtraMeta.causallyMaximalVCKeys) {
      if (
        (this.currentVC.get(replicaID) ?? 0) <
        crdtExtraMeta.vectorClockGet(replicaID)
      ) {
        return false;
      }
    }

    return true;
  }

  /**
   * @return whether a message with the given sender and
   * senderCounter
   * has already been delivered.
   */
  private isAlreadyDelivered(crdtExtraMeta: ReceiveCRDTExtraMeta): boolean {
    const senderEntry = this.currentVC.get(crdtExtraMeta.sender);
    if (senderEntry !== undefined) {
      if (senderEntry >= crdtExtraMeta.senderCounter) return true;
    }
    return false;
  }

  /**
   * crdtExtraMeta is assumed to be not from us.
   */
  private processRemoteDelivery(crdtExtraMeta: ReceiveCRDTExtraMeta) {
    // Delete any current keys that are causally dominated by
    // crdtExtraMeta.
    for (const replicaID of crdtExtraMeta.causallyMaximalVCKeys) {
      if (
        this.currentVC.get(replicaID) ===
        crdtExtraMeta.vectorClockGet(replicaID)
      ) {
        this._causallyMaximalVCKeys.delete(replicaID);
      }
    }
    // Add a new key for this message.
    this._causallyMaximalVCKeys.add(crdtExtraMeta.sender);
  }

  /**
   * Call when we deliver one of our own messages.
   */
  processOwnDelivery() {
    // Our own message causally dominates every current key.
    this._causallyMaximalVCKeys.clear();
    this._causallyMaximalVCKeys.add(this.localReplicaID);
  }

  /**
   * May include us, if we are causally maximal
   * (no received messages dominate our last sent message).
   */
  getCausallyMaximalVCKeys(): Set<string> {
    return new Set(this._causallyMaximalVCKeys);
  }

  save(): Uint8Array {
    const bufferSave = new Array<IReceiveTransactionSave>(this.buffer.length);
    for (let i = 0; i < this.buffer.length; i++) {
      const crdtExtraMeta = this.buffer[i].crdtExtraMeta;
      bufferSave[i] = {
        count: crdtExtraMeta.count,
        sender: crdtExtraMeta.sender,
        senderCounter: crdtExtraMeta.senderCounter,
        vectorClock: Object.fromEntries(crdtExtraMeta.vectorClock),
        wallClockTime: crdtExtraMeta.wallClockTime,
        lamportTimestamp: crdtExtraMeta.lamportTimestamp,
        causallyMaximalVCKeys: crdtExtraMeta.causallyMaximalVCKeys,
        messages: this.buffer[i].messages.map((messagePath) => {
          return {
            messagePath: messagePath.map((message) =>
              typeof message === "string"
                ? { asString: message }
                : { asBytes: message }
            ),
          };
        }),
      };
    }

    const saveMessage = CausalMessageBufferSave.create({
      buffer: bufferSave,
      bufferCheckIndex: this.bufferCheckIndex,
      causallyMaximalVCKeys: [...this._causallyMaximalVCKeys],
    });
    return CausalMessageBufferSave.encode(saveMessage).finish();
  }

  load(saveData: Uint8Array) {
    const decoded = CausalMessageBufferSave.decode(saveData);
    this.bufferCheckIndex = decoded.bufferCheckIndex;
    this._causallyMaximalVCKeys = new Set(decoded.causallyMaximalVCKeys);

    for (const transaction of decoded.buffer) {
      const vectorClock = new Map<string, number>();
      for (const [replicaID, entry] of Object.entries(
        transaction.vectorClock!
      )) {
        vectorClock.set(replicaID, int64AsNumber(entry));
      }

      const crdtExtraMeta = new ReceiveCRDTExtraMeta(
        transaction.count,
        transaction.sender,
        int64AsNumber(transaction.senderCounter),
        vectorClock,
        Object.prototype.hasOwnProperty.call(transaction, "wallClockTime")
          ? int64AsNumber(transaction.wallClockTime!)
          : null,
        Object.prototype.hasOwnProperty.call(transaction, "lamportTimestamp")
          ? int64AsNumber(transaction.lamportTimestamp!)
          : null,
        transaction.causallyMaximalVCKeys!
      );
      const messages = transaction.messages!.map((messagePathSave) =>
        messagePathSave.messagePath!.map((messageSave) =>
          (<BytesOrStringMessage>messageSave).type === "asString"
            ? messageSave.asString!
            : messageSave.asBytes!
        )
      );
      this.buffer.push({ crdtExtraMeta, messages });
    }
  }
}
