import {
  CRDTExtraMetaLayerMessage,
  CRDTExtraMetaLayerSave,
} from "../../../generated/proto_compiled";
import { Collab, ICollabParent, InitToken, MessageMeta, Pre } from "../../core";
import { int64AsNumber } from "../../util";
import { CRDTExtraMeta, VectorClock } from "./crdt_extra_meta";

// TODO: put somewhere reasonable
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
  // TODO: opt: pre-convert Longs to ints, should be more efficient?
  constructor(
    private readonly vcMap: { [replicaId: string]: number | Long.Long }
  ) {}

  get(replicaId: string): number {
    return int64AsNumber(this.vcMap[replicaId] ?? 0);
  }

  toString(): string {
    return JSON.stringify(
      Object.entries(this.vcMap).map(([k, v]) => [k, int64AsNumber(v)])
    );
  }
}

/**
 * Collab that provides optional MessageMeta fields to its
 * descendants.
 */
export class CRDTExtraMetaLayer extends Collab implements ICollabParent {
  private child!: Collab;
  /**
   * Includes this.runtime.replicaId.
   */
  private currentVectorClock = new Map<string, number>();
  /**
   * The current Lamport meta, i.e., the max meta
   * sent or received so far.
   * Note the next message's senderCounter will be one greater.
   * @param  newInitToken("",this [description]
   * @return                      [description]
   */
  private currentLamportTimestamp: number = 0;

  // These are all cached so that === equality is valid.
  private pendingCRDTMeta: CRDTExtraMeta | null = null;
  private pendingCRDTMetaSerialized: Uint8Array | null = null;

  /**
   * Buffer for messages that have been received but are not
   * causally ready for delivery.
   */
  private messageBuffer: {
    messagePath: (Uint8Array | string)[];
    meta: MessageMeta;
    // TODO: opt: store an intermediate form here that is smaller
    // in memory (just extract the maximal VC entries, leave
    // rest serialized).
    crdtMetaMessage: CRDTExtraMetaLayerMessage;
  }[] = [];
  /**
   * The first index to check for readiness in the buffer.
   */
  private bufferCheckIndex = 0;

  constructor(initToken: InitToken) {
    super(initToken);

    this.currentVectorClock.set(this.runtime.replicaId, 0);
  }

  setChild<C extends Collab>(preChild: Pre<C>): C {
    const child = preChild(new InitToken("", this));
    this.child = child;
    return child;
  }

  getAddedContext(key: symbol): any {
    if (key === MessageMeta.NEXT_MESSAGE_META) {
      const meta = <MessageMeta>(
        this.getContext(MessageMeta.NEXT_MESSAGE_META)
      ) ?? { sender: this.runtime.replicaId, isLocalEcho: true };
      this.createPendingMeta();
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
  private createPendingMeta(): void {
    if (this.pendingCRDTMeta === null) {
      // Create and cache this.pendingCRDTMeta.
      const vectorClockForMeta = Object.fromEntries(this.currentVectorClock);
      vectorClockForMeta[this.runtime.replicaId]++;
      const crdtMeta = new CRDTExtraMeta(
        vectorClockForMeta[this.runtime.replicaId],
        new BasicVectorClock(vectorClockForMeta),
        Date.now(),
        this.currentLamportTimestamp + 1
      );
      this.pendingCRDTMeta = crdtMeta;

      // Also cache this.pendingCRDTMetaSerialized.
      const vectorClockForMessage = Object.fromEntries(this.currentVectorClock);
      delete vectorClockForMessage[this.runtime.replicaId];
      const metaMessage = CRDTExtraMetaLayerMessage.create({
        senderCounter: vectorClockForMeta[this.runtime.replicaId],
        vectorClock: vectorClockForMessage,
        wallClockTime: crdtMeta.wallClockTime,
        lamportTimestamp: crdtMeta.lamportTimestamp,
      });
      this.pendingCRDTMetaSerialized =
        CRDTExtraMetaLayerMessage.encode(metaMessage).finish();
      // TODO: opt: if we know we're in the same
      // batch as a previous message with a different CRDTExtraMeta,
      // we can give just a diff (or reuse the serialized
      // thing entirely, if we can infer the change, i.e.,
      // it's just incrementing our senderCounter.)
      // TODO: That is also necessary for good transaction semantics
      // (e.g., multiple LWW sets within a transaction all have
      // same wall clock time).
    }
  }

  private invalidatePendingMeta() {
    this.pendingCRDTMeta = null;
    this.pendingCRDTMetaSerialized = null;
  }

  childSend(child: Collab, messagePath: (Uint8Array | string)[]): void {
    if (child !== this.child) {
      throw new Error("childSend called by non-child: " + child);
    }

    // Add the next CRDTExtraMeta, serialized, to messagePath.
    // First call createPendingMeta() to ensure it's created.
    this.createPendingMeta();
    messagePath.push(this.pendingCRDTMetaSerialized!);
    this.send(messagePath);
  }

  protected receiveInternal(
    messagePath: Uint8Array[],
    meta: MessageMeta
  ): void {
    if (messagePath.length === 0) {
      throw new Error("messagePath.length === 0");
    }

    // Deserialize messagePath[messagePath.length - 1] to get
    // the CRDTExtraMeta.
    const crdtMetaMessage = CRDTExtraMetaLayerMessage.decode(
      messagePath[messagePath.length - 1]
    );

    // Remove our message.
    messagePath.length--;

    // Buffer the message and attempt to deliver it or
    // other messages.
    if (meta.isLocalEcho) {
      // Optimization: just deliver. No need to check the
      // buffer since our local echo cannot make any
      // previously received messages causally ready.
      this.deliver(messagePath, meta, crdtMetaMessage);
    } else {
      this.messageBuffer.push({ messagePath, meta, crdtMetaMessage });
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
    messagePath: (Uint8Array | string)[],
    meta: MessageMeta,
    crdtMetaMessage: CRDTExtraMetaLayerMessage
  ) {
    // Current metadata is about to change, invalidate cached copies.
    this.invalidatePendingMeta();

    crdtMetaMessage.vectorClock[meta.sender] = crdtMetaMessage.senderCounter;
    const crdtMeta = new CRDTExtraMeta(
      int64AsNumber(crdtMetaMessage.senderCounter),
      new BasicVectorClock(crdtMetaMessage.vectorClock),
      int64AsNumber(crdtMetaMessage.wallClockTime),
      int64AsNumber(crdtMetaMessage.lamportTimestamp)
    );

    // Add the CRDTExtraMeta to meta.
    meta[CRDTExtraMeta.MESSAGE_META_KEY] = crdtMeta;

    // TODO: error handling (do here since it can be
    // out-of-turn relative to parent's delivery).
    this.child.receive(messagePath, meta);

    // Update our own state to reflect crdtMeta.
    this.currentVectorClock.set(meta.sender, crdtMeta.senderCounter);
    this.currentLamportTimestamp = Math.max(
      crdtMeta.lamportTimestamp,
      this.currentLamportTimestamp
    );
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
      const crdtMetaMessage = this.messageBuffer[index].crdtMetaMessage;

      if (this.isReady(crdtMetaMessage, sender)) {
        // Ready for delivery.
        this.deliver(
          this.messageBuffer[index].messagePath,
          this.messageBuffer[index].meta,
          crdtMetaMessage
        );
        // Remove from the buffer.
        // TODO: something more efficient?  (Costly array
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
        if (this.isAlreadyDelivered(crdtMetaMessage, sender)) {
          // Remove the message from the buffer
          this.messageBuffer.splice(index, 1);
          if (DEBUG) console.log("(already received)");
        }
        index--;
        if (DEBUG) {
          console.log(this.currentVectorClock.toString());
          console.log(crdtMetaMessage.toString());
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
    crdtMetaMessage: CRDTExtraMetaLayerMessage,
    sender: string
  ): boolean {
    // Check sender's entry is one more than ours.
    if (
      (this.currentVectorClock.get(sender) ?? 0) !==
      int64AsNumber(crdtMetaMessage.senderCounter) - 1
    ) {
      return false;
    }

    // Check other entries are <= ours.
    // TODO: opt: only need to check causally maximal entries.
    // Also, should separate this and isAlreadyDelivered from
    // VCs, since they will be optional in the future.
    for (const [id, value] of Object.entries(crdtMetaMessage.vectorClock)) {
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
    crdtMetaMessage: CRDTExtraMetaLayerMessage,
    sender: string
  ): boolean {
    const senderEntry = this.currentVectorClock.get(sender);
    if (senderEntry !== undefined) {
      if (senderEntry >= int64AsNumber(crdtMetaMessage.senderCounter))
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

  load(saveData: Uint8Array | null): void {
    if (saveData === null) {
      // Indicates skipped loading. Pass on the message.
      this.child.load(null);
    } else {
      const saveMessage = CRDTExtraMetaLayerSave.decode(saveData);
      for (const [replicaId, entry] of Object.entries(
        saveMessage.vectorClock
      )) {
        this.currentVectorClock.set(replicaId, int64AsNumber(entry));
      }
      this.currentLamportTimestamp = int64AsNumber(
        saveMessage.lamportTimestamp
      );
      this.child.load(saveMessage.childSave);
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

  canGc(): boolean {
    // Vector clock state is never trivial after the
    // first message. Approximate as never trivial.
    return false;
  }
}
