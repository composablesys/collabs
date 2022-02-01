import { CRDTExtraMetaLayerSave } from "../../../../generated/proto_compiled";
import {
  Collab,
  ICollabParent,
  InitToken,
  MessageMeta,
  Pre,
  Message,
} from "../../../core";
import { int64AsNumber, Optional } from "../../../util";
import { CRDTExtraMeta } from "../crdt_extra_meta";
import { BasicVectorClock } from "./basic_vector_clock";
import { CausalMessageBuffer } from "./causal_message_buffer";
import {
  CRDTMetaReceiveMessage,
  ReceivedCRDTExtraMeta,
} from "./crdt_meta_receive_message";
import { CRDTMetaSendMessage } from "./crdt_meta_send_message";

/**
 * Collab that provides [[CRDTExtraMeta]] to its
 * descendants.
 *
 * The added [[CRDTExtraMeta]] is stored in [[MessageMeta]]'s
 * index signature
 * keyed by [[CRDTExtraMeta.MESSAGE_META_KEY]].
 */
export class CRDTExtraMetaLayer extends Collab implements ICollabParent {
  private child!: Collab;
  /**
   * Includes this.runtime.replicaID.
   */
  private readonly currentVC = new Map<string, number>();
  /**
   * The current Lamport meta, i.e., the max meta
   * sent or received so far.
   * Note the next message's senderCounter will be one greater.
   * @param  newInitToken("",this [description]
   * @return                      [description]
   */
  private currentLamportTimestamp = 0;

  private readonly messageBuffer: CausalMessageBuffer;

  // These are all cached so that === equality is valid.
  private cachedNextCRDTMeta: CRDTExtraMeta | null = null;
  private pendingSendMessage: CRDTMetaSendMessage | null = null;

  constructor(initToken: InitToken) {
    super(initToken);

    this.currentVC.set(this.runtime.replicaID, 0);

    this.messageBuffer = new CausalMessageBuffer(
      this.currentVC,
      this.deliver.bind(this)
    );
  }

  setChild<C extends Collab>(preChild: Pre<C>): C {
    const child = preChild(new InitToken("", this));
    this.child = child;
    return child;
  }

  /**
   * Returns the CRDTExtraMeta for the next sent message,
   * assuming no other messages are received in the interim.
   *
   * The result is cached between calls when it doesn't change,
   * so that === equality is valid.
   */
  private nextCRDTMeta(): CRDTExtraMeta {
    if (this.cachedNextCRDTMeta === null) {
      // Create and cache this.cachedNextCRDTMeta.
      const vectorClockForMeta = new Map(this.currentVC);
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
      this.cachedNextCRDTMeta = crdtMeta;
    }
    return this.cachedNextCRDTMeta;
  }

  getAddedContext(key: symbol): unknown {
    if (key === MessageMeta.NEXT_MESSAGE_META) {
      const meta = <MessageMeta>(
        this.getContext(MessageMeta.NEXT_MESSAGE_META)
      ) ?? { sender: this.runtime.replicaID, isLocalEcho: true };
      meta[CRDTExtraMeta.MESSAGE_META_KEY] = this.nextCRDTMeta();
      return meta;
    }
    return undefined;
  }

  childSend(child: Collab, messagePath: Message[]): void {
    if (child !== this.child) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    const crdtMeta = this.nextCRDTMeta();
    // Add the next CRDTExtraMeta to this.pendingSendMessage.
    if (this.pendingSendMessage === null) {
      const vcNoSender = new Map(this.currentVC);
      vcNoSender.delete(this.runtime.replicaID);
      this.pendingSendMessage = new CRDTMetaSendMessage(
        crdtMeta,
        vcNoSender,
        () => {
          this.pendingSendMessage = null;
        }
      );
    } else {
      this.pendingSendMessage.addMessage(crdtMeta);
    }
    messagePath.push(this.pendingSendMessage);
    this.send(messagePath);
  }

  /**
   * The CRDTMetaReceiveMessage for the batch of messages
   * currently being received. All messages in the batch
   * will have the same one (specifially, they will all
   * have the same Uint8Array object, which deserailizes to
   * this); their actual CRDTExtraMeta's are distinguished
   * by their index within the batch.
   *
   * null if we are not in the middle of receiving a batch.
   * Also, not used for local echos (TODO: change).
   */
  private currentReceiveMessage: CRDTMetaReceiveMessage | null = null;
  /**
   * The index for the next message in the batch of messages
   * currently being received. This combines with
   * currentReceiveMessage to fully describe the next message's
   * CRDTExtraMeta.
   *
   * null if we are not in the middle of receiving a batch.
   * Also, not used for local echos (TODO: change).
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
      // so this.cachedNextCRDTMeta is the "deserialized" CRDTExtraMeta.
      this.deliver(messagePath, meta, this.cachedNextCRDTMeta!);
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
      this.messageBuffer.push(messagePath, meta, crdtExtraMeta);
      this.messageBuffer.check();
    }
  }

  /**
   * Called when a message is ready for immediate delivery,
   * i.e., its causality checks have passed.
   *
   * This is called immediately for local echos, and also
   * given as the callback to this.messageBuffer.
   */
  private deliver(
    messagePath: Message[],
    meta: MessageMeta,
    crdtExtraMeta: CRDTExtraMeta
  ) {
    // Update our own state to reflect crdtExtraMeta.
    this.cachedNextCRDTMeta = null; // Invalidate cached nextCRDTMeta.
    this.currentVC.set(meta.sender, crdtExtraMeta.senderCounter);
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

    // Add the CRDTExtraMeta to meta.
    meta[CRDTExtraMeta.MESSAGE_META_KEY] = crdtExtraMeta;

    try {
      this.child.receive(messagePath, meta);
    } catch (err) {
      // Don't let the error block other event handlers
      // or affect the emitter, but still make it print
      // its error like it was unhandled.
      void Promise.resolve().then(() => {
        throw err;
      });
    }
  }

  save(): Uint8Array {
    const vectorClock = Object.fromEntries(this.currentVC);
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
        this.currentVC.set(replicaID, int64AsNumber(entry));
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
