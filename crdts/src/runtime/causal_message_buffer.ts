import {
  int64AsNumber,
  MessageStacksSerializer,
  UpdateMeta,
} from "@collabs/core";
import { CausalMessageBufferSave } from "../../generated/proto_compiled";
import {
  CRDTMetaSerializer,
  ReceiveCRDTMeta,
} from "./crdt_meta_implementations";

/**
 * Debug flag, enables console.log's when causality checks
 * fail.
 */
const DEBUG = false;

interface ReceivedTransaction {
  messageStacks: (Uint8Array | string)[][];
  meta: UpdateMeta;
}

/**
 * A buffer for delivering messages in causal order, used
 * by [[CRuntime]].
 *
 * Also manages CRDT metadata (vector clock, causally maximal keys,
 * Lamport timestamp).
 */
export class CausalMessageBuffer {
  /**
   * The vector clock. Missing entries are presumed 0.
   *
   * An entry for this replica is always present, even when 0.
   *
   * Do not modify externally.
   */
  readonly vc = new Map<string, number>();
  /**
   * May include us, if we are causally maximal
   * (no received messages dominate our last sent message).
   *
   * If causalityGuaranteed, this is always empty.
   *
   * Do not modify externally.
   */
  readonly maximalVcKeys = new Set<string>();
  /**
   * The Lamport timestamp.
   *
   * Do not modify externally.
   */
  lamportTimestamp = 0;

  /**
   * Internal buffer for messages that have been received but not
   * yet delivered, either because check() was not called or they
   * are not causally ready.
   */
  private readonly buffer: ReceivedTransaction[] = [];

  /**
   * The first index to check for readiness in the buffer.
   */
  private bufferCheckIndex = 0;

  /**
   * @param deliver Callback to deliver messages, where
   * "deliver" means "actually process since it's causally
   * ready now".
   */
  constructor(
    private readonly replicaID: string,
    private readonly causalityGuaranteed: boolean,
    private readonly deliver: (
      messageStacks: (Uint8Array | string)[][],
      meta: UpdateMeta
    ) => void
  ) {
    this.vc.set(this.replicaID, 0);
  }

  /**
   * Adds the given message to the buffer, if it has not
   * already been delivered.
   */
  add(messageStacks: (Uint8Array | string)[][], meta: UpdateMeta): void {
    const crdtMeta = <ReceiveCRDTMeta>meta.runtimeExtra;
    if (!this.isAlreadyDelivered(crdtMeta)) {
      this.buffer.push({ messageStacks, meta });
    } else if (DEBUG) {
      console.log("CausalMessageBuffer.add: not adding");
      console.log("(already received)");
      console.log([...this.vc]);
      console.log(crdtMeta);
    }
  }

  /**
   * Checks the buffer and delivers any causally ready
   * transactions.
   *
   * @return true if any transactions were delivered.
   */
  check(): boolean {
    let anyDelivered = false;
    // The checking order is from the latest to the oldest.
    let index = this.buffer.length - 1;

    while (index >= this.bufferCheckIndex) {
      const sender = this.buffer[index].meta.sender;
      const crdtMeta = <ReceiveCRDTMeta>this.buffer[index].meta.runtimeExtra;

      if (this.isReady(crdtMeta, sender)) {
        // Ready for delivery.
        this.deliver(this.buffer[index].messageStacks, this.buffer[index].meta);
        this.processRemoteDelivery(crdtMeta);
        // Remove from the buffer.
        // OPT: something more efficient?  (Costly array
        // deletions).
        this.buffer.splice(index, 1);
        // Set index to the end and try again, in case
        // this makes more messages ready
        this.bufferCheckIndex = 0;
        index = this.buffer.length - 1;
        anyDelivered = true;
      } else {
        if (DEBUG) {
          console.log("CRDTMetaLayer.checkMessageBuffer: not ready");
        }
        if (this.isAlreadyDelivered(crdtMeta)) {
          // Remove the message from the buffer
          this.buffer.splice(index, 1);
          if (DEBUG) console.log("(already received)");
        }
        index--;
        if (DEBUG) {
          console.log([...this.vc]);
          console.log(crdtMeta);
        }
      }
    }
    this.bufferCheckIndex = this.buffer.length;
    return anyDelivered;
  }

  /**
   * @return whether a message with the given vector clock
   * and sender is ready for delivery, according to the causal
   * order.
   */
  private isReady(crdtMeta: ReceiveCRDTMeta, sender: string): boolean {
    if (this.causalityGuaranteed) return true;

    // Check that sender's entry is one more than ours.
    if ((this.vc.get(sender) ?? 0) !== crdtMeta.senderCounter - 1) {
      return false;
    }

    // Check that other causally maximal entries are <= ours.
    // Note that this excludes sender.
    let i = 0;
    for (const [key, value] of crdtMeta.vc) {
      if (i === crdtMeta.maximalVcKeyCount) break;
      if ((this.vc.get(key) ?? 0) < value) {
        return false;
      }
      i++;
    }

    return true;
  }

  /**
   * @return whether a message with the given sender and
   * senderCounter
   * has already been delivered.
   */
  private isAlreadyDelivered(crdtMeta: ReceiveCRDTMeta): boolean {
    const senderEntry = this.vc.get(crdtMeta.sender);
    if (senderEntry !== undefined) {
      if (senderEntry >= crdtMeta.senderCounter) return true;
    }
    return false;
  }

  private processRemoteDelivery(crdtMeta: ReceiveCRDTMeta) {
    if (!this.causalityGuaranteed) {
      // Delete any current keys that are causally dominated by
      // crdtMeta.
      let i = 0;
      for (const [key, value] of crdtMeta.vc) {
        if (i === crdtMeta.maximalVcKeyCount) break;
        if (this.vc.get(key) === value) {
          this.maximalVcKeys.delete(key);
        }
        i++;
      }
      // Add a new key for this message.
      this.maximalVcKeys.add(crdtMeta.sender);
    }
    // Update vc.
    this.vc.set(crdtMeta.sender, crdtMeta.senderCounter);
    // Update Lamport timestamp if it's present.
    // Skipping this when it's not present technically violates the def
    // of Lamport timestamp, and it is still causally-compatible due to
    // causal order delivery.
    this.lamportTimestamp = Math.max(
      this.lamportTimestamp,
      crdtMeta.lamportTimestamp ?? 0
    );
  }

  /**
   * Update our meta for a new local transaction.
   */
  tick() {
    // Update vc.
    this.vc.set(this.replicaID, this.vc.get(this.replicaID)! + 1);
    if (!this.causalityGuaranteed) {
      // Our own message causally dominates every current key.
      this.maximalVcKeys.clear();
      this.maximalVcKeys.add(this.replicaID);
    }
    // Update Lamport timestamp.
    this.lamportTimestamp++;
  }

  save(): Uint8Array {
    const vcKeys = new Array<string>(this.vc.size);
    const vcValues = new Array<number>(this.vc.size);
    let i = 0;
    for (const [key, value] of this.vc) {
      vcKeys[i] = key;
      vcValues[i] = value;
      i++;
    }

    // OPT: compress repeated senders in VCs.
    const bufferMessageStacks = new Array<Uint8Array>(this.buffer.length);
    const bufferMetas = new Array<Uint8Array>(this.buffer.length);
    for (i = 0; i < this.buffer.length; i++) {
      bufferMessageStacks[i] = MessageStacksSerializer.instance.serialize(
        this.buffer[i].messageStacks
      );
      bufferMetas[i] = CRDTMetaSerializer.instance.serialize(
        this.buffer[i].meta
      );
    }

    const saveMessage = CausalMessageBufferSave.create({
      vcKeys,
      vcValues,
      maximalVcKeys: [...this.maximalVcKeys],
      lamportTimestamp: this.lamportTimestamp,
      bufferMessageStacks,
      bufferMetas,
      bufferCheckIndex: this.bufferCheckIndex,
    });
    return CausalMessageBufferSave.encode(saveMessage).finish();
  }

  load(savedState: Uint8Array) {
    const decoded = CausalMessageBufferSave.decode(savedState);

    for (let i = 0; i < decoded.vcKeys.length; i++) {
      this.vc.set(decoded.vcKeys[i], int64AsNumber(decoded.vcValues[i]));
    }
    for (const key of decoded.maximalVcKeys) {
      this.maximalVcKeys.add(key);
    }
    this.lamportTimestamp = int64AsNumber(decoded.lamportTimestamp);
    for (let i = 0; i < decoded.bufferMessageStacks.length; i++) {
      this.buffer.push({
        messageStacks: MessageStacksSerializer.instance.deserialize(
          decoded.bufferMessageStacks[i]
        ),
        meta: CRDTMetaSerializer.instance.deserialize(decoded.bufferMetas[i]),
      });
    }
    this.bufferCheckIndex = decoded.bufferCheckIndex;
  }
}
