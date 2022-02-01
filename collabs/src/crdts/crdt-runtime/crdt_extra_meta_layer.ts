import {
  CRDTExtraMetaLayerMessage,
  CRDTExtraMetaLayerSave,
} from "../../../generated/proto_compiled";
import {
  Collab,
  ICollabParent,
  InitToken,
  MessageMeta,
  Pre,
  Message,
  Serializable,
} from "../../core";
import { int64AsNumber, Optional } from "../../util";
import { CRDTExtraMeta, VectorClock } from "./crdt_extra_meta";

// Debug flag for causality checking.
const DEBUG = false;

/**
 * Basic [[VectorClock]] implementation that just uses a
 * literal vector clock.
 *
 * In the future, this will be optimized to prevent messages
 * from growing in proportion to the number of past replicas,
 * which grows without bound during a collaborative session.
 */
class BasicVectorClock implements VectorClock {
  /**
   * @param vcMap Includes local replica
   */
  constructor(private readonly vcMap: Map<string, number>) {}

  get(replicaID: string): number {
    return this.vcMap.get(replicaID) ?? 0;
  }

  toString(): string {
    return JSON.stringify(Object.entries(this.vcMap));
  }
}

interface CRDTMetaSendMessageDelta {
  index: number;
  /**
   * Maps each non-sender replica to the amount of increase in its
   * VC entry, i.e., the # of received messages.
   */
  deltaVCEntries: Map<string, number>;
  newWallClockTime: number;
  /**
   * The increase in the Lamport timestamp.
   */
  deltaLamportTimestamp: number;
}

class CRDTMetaSendMessage implements Serializable {
  private readonly firstSenderCounter: number;
  /**
   * The number of sent messages corresponding to this
   * CRDTMetaSendMessage.
   */
  private count: number;
  /**
   * A sparse array of deltas describing how the CRDTExtraMeta
   * change as you go through the
   * messages in this batch.
   *
   * The delta with index i describes the differences leading
   * to the i-th message.
   *
   * When the i-th message only changes by incrementing
   * senderCounter and lamportTimestamp (because there
   * were no intervening messages from other users since
   * the last message), the delta is
   * implicit (not needed); this is why deltas is sparse.
   */
  private readonly deltas: CRDTMetaSendMessageDelta[];

  lastWallClockTime: number;
  private lastLamportTimestamp: number;
  private deltaLastVC = new Map<string, number>();

  /**
   * [constructor description]
   * @param firstMeta [description]
   * @param firstVC   Omits this replicaID.
   */
  constructor(
    firstMeta: CRDTExtraMeta,
    firstVC: Map<string, number>,
    private readonly invalidate: () => void
  ) {
    this.firstSenderCounter = firstMeta.senderCounter;
    this.count = 1;
    this.deltas = [
      {
        index: 0,
        deltaVCEntries: firstVC,
        newWallClockTime: firstMeta.wallClockTime,
        deltaLamportTimestamp: firstMeta.lamportTimestamp,
      },
    ];

    this.lastWallClockTime = firstMeta.wallClockTime;
    this.lastLamportTimestamp = firstMeta.lamportTimestamp;
  }

  /**
   * Don't call when sender is us.
   */
  receivedMessageFrom(sender: string) {
    this.deltaLastVC.set(sender, (this.deltaLastVC.get(sender) ?? 0) + 1);
  }

  hasReceivedMessage(): boolean {
    return this.deltaLastVC.size > 0;
  }

  addMessage(newCRDTMeta: CRDTExtraMeta) {
    if (this.deltaLastVC.size === 0) {
      // Trivial delta.
      // TODO: here we assume wallClockTime *only* changes upon received message.
      this.count++;
    } else {
      this.deltas.push({
        index: this.count,
        deltaVCEntries: this.deltaLastVC,
        newWallClockTime: newCRDTMeta.wallClockTime,
        deltaLamportTimestamp:
          newCRDTMeta.lamportTimestamp - this.lastLamportTimestamp,
      });
      this.count++;
      this.deltaLastVC = new Map();
      this.lastWallClockTime = newCRDTMeta.wallClockTime;
      this.lastLamportTimestamp = newCRDTMeta.lamportTimestamp;
    }
  }

  serialize(): Uint8Array {
    const message = CRDTExtraMetaLayerMessage.create({
      firstSenderCounter: this.firstSenderCounter,
      count: this.count,
      deltas: this.deltas.map((delta) => {
        return {
          ...delta,
          deltaVCEntries: Object.fromEntries(delta.deltaVCEntries),
        };
      }),
    });

    this.invalidate();

    return CRDTExtraMetaLayerMessage.encode(message).finish();
  }
}

class CRDTMetaReceiveMessage {
  readonly firstSenderCounter: number;
  readonly count: number;
  readonly deltas: CRDTMetaSendMessageDelta[];

  constructor(serialized: Uint8Array) {
    const decoded = CRDTExtraMetaLayerMessage.decode(serialized);
    this.firstSenderCounter = int64AsNumber(decoded.firstSenderCounter);
    this.count = decoded.count;
    this.deltas = decoded.deltas.map((delta) => {
      const deltaVCEntries = new Map<string, number>();
      for (const [sender, entry] of Object.entries(delta.deltaVCEntries!)) {
        deltaVCEntries.set(sender, int64AsNumber(entry));
      }
      return {
        index: delta.index,
        deltaVCEntries,
        newWallClockTime: int64AsNumber(delta.newWallClockTime),
        deltaLamportTimestamp: int64AsNumber(delta.deltaLamportTimestamp),
      };
    });
  }
}

class ReceivedCRDTExtraMeta implements CRDTExtraMeta {
  private readonly vcMap: Map<string, number>;
  readonly senderCounter: number;
  readonly vectorClock: VectorClock;
  readonly wallClockTime: number;
  readonly lamportTimestamp: number;

  constructor(
    receiveMessage: CRDTMetaReceiveMessage,
    index: number,
    sender: string
  ) {
    this.senderCounter = receiveMessage.firstSenderCounter + index;

    let lastNontrivialDeltaIndex = 0;
    this.vcMap = new Map();
    let wallClockTime = 0;
    let lamportTimestamp = 0;
    for (const delta of receiveMessage.deltas) {
      if (delta.index > index) break;
      lastNontrivialDeltaIndex = delta.index;
      for (const [sender, deltaEntry] of delta.deltaVCEntries) {
        this.vcMap.set(sender, (this.vcMap.get(sender) ?? 0) + deltaEntry);
      }
      wallClockTime = delta.newWallClockTime;
      lamportTimestamp += delta.deltaLamportTimestamp;
    }
    this.vcMap.set(sender, this.senderCounter);
    lamportTimestamp += index - lastNontrivialDeltaIndex;

    this.vectorClock = new BasicVectorClock(this.vcMap);
    this.wallClockTime = wallClockTime;
    this.lamportTimestamp = lamportTimestamp;
  }

  get causallyMaximalVCEntries(): IterableIterator<[string, number]> {
    // TODO: necessary entries only
    return this.vcMap.entries();
  }
}

/**
 * Collab that provides optional MessageMeta fields to its
 * descendants.
 */
export class CRDTExtraMetaLayer extends Collab implements ICollabParent {
  private child!: Collab;
  /**
   * Includes this.runtime.replicaID.
   */
  private currentVectorClock = new Map<string, number>();
  /**
   * The current Lamport meta, i.e., the max meta
   * sent or received so far.
   * Note the next message's senderCounter will be one greater.
   * @param  newInitToken("",this [description]
   * @return                      [description]
   */
  private currentLamportTimestamp = 0;

  // These are all cached so that === equality is valid.
  private pendingCRDTMeta: CRDTExtraMeta | null = null;
  private pendingSendMessage: CRDTMetaSendMessage | null = null;

  constructor(initToken: InitToken) {
    super(initToken);

    this.currentVectorClock.set(this.runtime.replicaID, 0);
  }

  setChild<C extends Collab>(preChild: Pre<C>): C {
    const child = preChild(new InitToken("", this));
    this.child = child;
    return child;
  }

  getAddedContext(key: symbol): unknown {
    if (key === MessageMeta.NEXT_MESSAGE_META) {
      const meta = <MessageMeta>(
        this.getContext(MessageMeta.NEXT_MESSAGE_META)
      ) ?? { sender: this.runtime.replicaID, isLocalEcho: true };
      this.createPendingCRDTMeta();
      meta[CRDTExtraMeta.MESSAGE_META_KEY] = this.pendingCRDTMeta!;
      return meta;
    }
    return undefined;
  }

  /**
   * Creates this.pendingCRDTMeta if needed, using this.currentVectorClock,
   * this.currentTimestamp, and the current wall-clock time.
   * If this.pendingCRDTMeta already exists, does nothing.
   *
   * Note that this.pendingCRDTMeta is invalidated once we
   * receive a message (including local echos).
   */
  private createPendingCRDTMeta(): CRDTExtraMeta {
    if (this.pendingCRDTMeta === null) {
      // Create and cache this.pendingCRDTMeta.
      const vectorClockForMeta = new Map(this.currentVectorClock);
      vectorClockForMeta.set(
        this.runtime.replicaID,
        vectorClockForMeta.get(this.runtime.replicaID)! + 1
      );
      let wallClockTime: number;
      if (
        this.pendingSendMessage !== null &&
        !this.pendingSendMessage.hasReceivedMessage()
      ) {
        // Reuse previous wallClockTime, so that it's consistent
        // within batches.
        wallClockTime = this.pendingSendMessage.lastWallClockTime;
      } else wallClockTime = Date.now();
      const crdtMeta: CRDTExtraMeta = {
        senderCounter: vectorClockForMeta.get(this.runtime.replicaID)!,
        vectorClock: new BasicVectorClock(vectorClockForMeta),
        wallClockTime,
        lamportTimestamp: this.currentLamportTimestamp + 1,
      };
      this.pendingCRDTMeta = crdtMeta;
    }
    return this.pendingCRDTMeta;
  }

  private invalidatePendingCRDTMeta() {
    this.pendingCRDTMeta = null;
  }

  childSend(child: Collab, messagePath: Message[]): void {
    if (child !== this.child) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    const pendingCRDTMeta = this.createPendingCRDTMeta();
    // Add the next CRDTExtraMeta to this.pendingSendMessage.
    if (this.pendingSendMessage === null) {
      const vcNoSender = new Map(this.currentVectorClock);
      vcNoSender.delete(this.runtime.replicaID);
      this.pendingSendMessage = new CRDTMetaSendMessage(
        pendingCRDTMeta,
        vcNoSender,
        () => {
          this.pendingSendMessage = null;
        }
      );
    } else {
      this.pendingSendMessage.addMessage(pendingCRDTMeta);
    }
    messagePath.push(this.pendingSendMessage);
    this.send(messagePath);
  }

  /**
   * Buffer for messages that have been received but are not
   * causally ready for delivery.
   */
  private messageBuffer: {
    messagePath: Message[];
    meta: MessageMeta;
    // OPT: store an intermediate form here that is smaller
    // in memory (just extract the maximal VC entries, leave
    // rest serialized).
    crdtExtraMeta: ReceivedCRDTExtraMeta;
  }[] = [];
  /**
   * The first index to check for readiness in the buffer.
   */
  private bufferCheckIndex = 0;

  private currentReceiveMessage: CRDTMetaReceiveMessage | null = null;
  /**
   * The index for the next message that you receive (if any).
   */
  private currentReceiveMessageIndex: number | null = null;

  protected receiveInternal(
    messagePath: Uint8Array[],
    meta: MessageMeta
  ): void {
    if (messagePath.length === 0) {
      throw new Error("messagePath.length === 0");
    }

    if (meta.isLocalEcho) {
      // Remove our message.
      messagePath.length--;
      // Deliver immediately. No need to check the
      // buffer since our local echo cannot make any
      // previously received messages causally ready.
      // Also, we are guaranteed immediate local echos,
      // so this.pendingCRDTMeta is the "deserialized" CRDTExtraMeta.
      this.deliver(messagePath, meta, this.pendingCRDTMeta!);
    } else {
      if (this.currentReceiveMessage === null) {
        // It's a new batch with a new CRDTMetaReceiveMessage.
        this.currentReceiveMessage = new CRDTMetaReceiveMessage(
          messagePath[messagePath.length - 1]
        );
        this.currentReceiveMessageIndex = 0;
      }
      const crdtExtraMeta = new ReceivedCRDTExtraMeta(
        this.currentReceiveMessage,
        this.currentReceiveMessageIndex!,
        meta.sender
      );

      this.currentReceiveMessageIndex!++;
      if (
        this.currentReceiveMessageIndex! === this.currentReceiveMessage.count
      ) {
        // Done with the batch.
        this.currentReceiveMessage = null;
        this.currentReceiveMessageIndex = null;
      }

      // Remove our message.
      messagePath.length--;

      // Buffer the message and attempt to deliver it or
      // other messages.
      this.messageBuffer.push({
        messagePath,
        meta,
        crdtExtraMeta,
      });
      this.checkMessageBuffer();
    }
  }

  /**
   * Delivers the given message to this.child.
   *
   * The message must already have its CRDTExtraMeta
   * and be causally ready.
   */
  private deliver(
    messagePath: Message[],
    meta: MessageMeta,
    crdtExtraMeta: CRDTExtraMeta
  ) {
    // Current metadata is about to change; invalidate cached copies.
    this.invalidatePendingCRDTMeta();

    // Add the CRDTExtraMeta to meta.
    meta[CRDTExtraMeta.MESSAGE_META_KEY] = crdtExtraMeta;

    try {
      this.child.receive(messagePath, meta);
    } catch (err) {
      // Don't let the error block other messages' delivery,
      // but still make it print
      // its error like it was unhandled.
      setTimeout(() => {
        throw err;
      });
    }

    // Update our own state to reflect crdtMeta.
    this.currentVectorClock.set(meta.sender, crdtExtraMeta.senderCounter);
    this.currentLamportTimestamp = Math.max(
      crdtExtraMeta.lamportTimestamp,
      this.currentLamportTimestamp
    );
    if (
      this.pendingSendMessage !== null &&
      meta.sender !== this.runtime.replicaID
    ) {
      this.pendingSendMessage.receivedMessageFrom(meta.sender);
    }
  }

  /**
   * Checks this.messageBuffer and delivers any causally ready
   * messages.
   */
  private checkMessageBuffer() {
    // The checking order is from the latest to the oldest.
    let index = this.messageBuffer.length - 1;

    while (index >= this.bufferCheckIndex) {
      const sender = this.messageBuffer[index].meta.sender;
      const crdtExtraMeta = this.messageBuffer[index].crdtExtraMeta;

      if (this.isReady(crdtExtraMeta, sender)) {
        // Ready for delivery.
        this.deliver(
          this.messageBuffer[index].messagePath,
          this.messageBuffer[index].meta,
          crdtExtraMeta
        );
        // Remove from the buffer.
        // OPT: something more efficient?  (Costly array
        // deletions).
        this.messageBuffer.splice(index, 1);
        // Set index to the end and try again, in case
        // this makes more messages ready
        this.bufferCheckIndex = 0;
        index = this.messageBuffer.length - 1;
      } else {
        if (DEBUG) {
          console.log("CRDTExtraMetaLayer.checkMessageBuffer: not ready");
        }
        if (this.isAlreadyDelivered(crdtExtraMeta, sender)) {
          // Remove the message from the buffer
          this.messageBuffer.splice(index, 1);
          if (DEBUG) console.log("(already received)");
        }
        index--;
        if (DEBUG) {
          console.log([...this.currentVectorClock]);
          console.log(JSON.stringify(crdtExtraMeta));
        }
      }
    }
    this.bufferCheckIndex = this.messageBuffer.length;
  }

  /**
   * @return whether a message with the given vector clock
   * and sender is ready for delivery, according to the causal
   * order.
   */
  private isReady(
    crdtExtraMeta: ReceivedCRDTExtraMeta,
    sender: string
  ): boolean {
    // Check sender's entry is one more than ours.
    if (
      (this.currentVectorClock.get(sender) ?? 0) !==
      int64AsNumber(crdtExtraMeta.senderCounter) - 1
    ) {
      return false;
    }

    // Check other entries are <= ours.
    // OPT: only need to check causally maximal entries.
    // Also, should separate this and isAlreadyDelivered from
    // VCs, since they will be optional in the future.
    for (const [id, value] of crdtExtraMeta.causallyMaximalVCEntries) {
      if (id === sender) continue;
      if ((this.currentVectorClock.get(id) ?? 0) < value) {
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
    crdtExtraMeta: ReceivedCRDTExtraMeta,
    sender: string
  ): boolean {
    const senderEntry = this.currentVectorClock.get(sender);
    if (senderEntry !== undefined) {
      if (senderEntry >= int64AsNumber(crdtExtraMeta.senderCounter))
        return true;
    }
    return false;
  }

  save(): Uint8Array {
    const vectorClock = Object.fromEntries(this.currentVectorClock);
    const saveMessage = CRDTExtraMetaLayerSave.create({
      vectorClock,
      lamportTimestamp: this.currentLamportTimestamp,
      childSave: this.child.save(),
    });
    return CRDTExtraMetaLayerSave.encode(saveMessage).finish();
  }

  load(saveData: Optional<Uint8Array>): void {
    if (!saveData.isPresent) {
      // Indicates skipped loading. Pass on the message.
      this.child.load(saveData);
    } else {
      const saveMessage = CRDTExtraMetaLayerSave.decode(saveData.get());
      for (const [replicaID, entry] of Object.entries(
        saveMessage.vectorClock
      )) {
        this.currentVectorClock.set(replicaID, int64AsNumber(entry));
      }
      this.currentLamportTimestamp = int64AsNumber(
        saveMessage.lamportTimestamp
      );
      this.child.load(Optional.of(saveMessage.childSave));
    }
  }

  getDescendant(namePath: string[]): Collab {
    if (namePath.length === 0) return this;
    if (namePath[namePath.length - 1] !== "") {
      throw new Error("Unrecognized child: " + namePath[namePath.length - 1]);
    }
    namePath.length--;
    return this.child.getDescendant(namePath);
  }

  canGC(): boolean {
    // Vector clock state is never trivial after the
    // first message. Approximate as never trivial.
    return false;
  }
}
