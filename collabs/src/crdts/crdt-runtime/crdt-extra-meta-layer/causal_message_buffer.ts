import { Message, MessageMeta } from "../../../core";
import { ReceiveCRDTExtraMeta } from "./crdt_extra_meta_implementations";
import { Transaction } from "./transaction";

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
  private readonly buffer: Transaction[] = [];

  /**
   * The first index to check for readiness in the buffer.
   */
  private bufferCheckIndex = 0;

  /**
   * Excludes localReplicaID.
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
    private readonly deliverTransaction: (transaction: Transaction) => void
  ) {}

  /**
   * Adds the given message to the buffer.
   */
  push(transaction: Transaction): void {
    this.buffer.push(transaction);
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
        this.processOtherDelivery(crdtExtraMeta, sender);
        this.deliverTransaction(this.buffer[index]);
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
          console.log(JSON.stringify(crdtExtraMeta));
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
    // that these entries are present.
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
  private processOtherDelivery(
    crdtExtraMeta: ReceiveCRDTExtraMeta,
    sender: string
  ) {
    // Delete any current keys that are causally dominated by
    // this meta.
    for (const replicaID of crdtExtraMeta.causallyMaximalVCKeys) {
      if (replicaID === this.localReplicaID) continue;
      if (
        this.currentVC.get(replicaID) ===
        crdtExtraMeta.vectorClockGet(replicaID)
      ) {
        this._causallyMaximalVCKeys.delete(replicaID);
      }
    }
    // Add a new key for this message.
    this._causallyMaximalVCKeys.add(sender);
  }

  /**
   * Call when we deliver one of our own messages.
   */
  processOwnDelivery() {
    // Our own message causally dominates every current key.
    this._causallyMaximalVCKeys.clear();
  }

  /**
   * Excludes us.
   */
  getCausallyMaximalVCKeys(): Set<string> {
    return new Set(this._causallyMaximalVCKeys);
  }

  save(): Uint8Array {
    // TODO
    return new Uint8Array();
  }

  load(_saveData: Uint8Array) {
    // TODO
  }
}
