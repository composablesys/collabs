import { Message, MessageMeta } from "../../../core";
import { CRDTExtraMetaFromBatch } from "./crdt_extra_meta_batch";

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
  private buffer: {
    messagePath: Message[];
    meta: MessageMeta;
    // OPT: store an intermediate form here that is smaller
    // in memory (just extract the maximal VC entries, leave
    // rest serialized).
    crdtExtraMeta: CRDTExtraMetaFromBatch;
  }[] = [];

  /**
   * The first index to check for readiness in the buffer.
   */
  private bufferCheckIndex = 0;

  /**
   * @param currentVC A reference to the mutable current
   * vector clock, which you are expected to keep up-to-date.
   * @param deliver Callback to deliver messages, where
   * "deliver" means "actually process since it's causally
   * ready now".
   */
  constructor(
    private readonly currentVC: Map<string, number>,
    private readonly deliver: (
      messagePath: Message[],
      meta: MessageMeta,
      crdtExtraMeta: CRDTExtraMetaFromBatch
    ) => void
  ) {}

  /**
   * Adds the given message to the buffer.
   */
  push(
    messagePath: Message[],
    meta: MessageMeta,
    crdtExtraMeta: CRDTExtraMetaFromBatch
  ): void {
    this.buffer.push({ messagePath, meta, crdtExtraMeta });
  }

  /**
   * Checks the buffer and `deliver`s any causally ready
   * messages.
   */
  check() {
    // The checking order is from the latest to the oldest.
    let index = this.buffer.length - 1;

    while (index >= this.bufferCheckIndex) {
      const sender = this.buffer[index].meta.sender;
      const crdtExtraMeta = this.buffer[index].crdtExtraMeta;

      if (this.isReady(crdtExtraMeta, sender)) {
        // Ready for delivery.
        this.deliver(
          this.buffer[index].messagePath,
          this.buffer[index].meta,
          crdtExtraMeta
        );
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
        if (this.isAlreadyDelivered(crdtExtraMeta, sender)) {
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
    crdtExtraMeta: CRDTExtraMetaFromBatch,
    sender: string
  ): boolean {
    // Check sender's entry is one more than ours.
    if ((this.currentVC.get(sender) ?? 0) !== crdtExtraMeta.senderCounter - 1) {
      return false;
    }

    // Check other causally maximal entries are <= ours.
    for (const [id, value] of crdtExtraMeta.causallyMaximalVCEntries) {
      if (id === sender) continue;
      if ((this.currentVC.get(id) ?? 0) < value) {
        return false;
      }
    }

    return true;
  }

  /**
   * @return whether a message with the given vector clock
   * has already been delivered.
   */
  private isAlreadyDelivered(
    crdtExtraMeta: CRDTExtraMetaFromBatch,
    sender: string
  ): boolean {
    const senderEntry = this.currentVC.get(sender);
    if (senderEntry !== undefined) {
      if (senderEntry >= crdtExtraMeta.senderCounter) return true;
    }
    return false;
  }
}
