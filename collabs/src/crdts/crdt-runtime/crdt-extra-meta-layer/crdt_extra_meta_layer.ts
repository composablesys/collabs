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
import { CRDTExtraMeta, CRDTExtraMetaRequestee } from "../crdt_extra_meta";
import { CausalMessageBuffer } from "./causal_message_buffer";
import { CRDTExtraMetaBatch } from "./crdt_extra_meta_batch";
import {
  ReceiveCRDTExtraMeta,
  SendCRDTExtraMeta,
} from "./crdt_extra_meta_implementations";

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

  /**
   * Whether we have started, but not yet ended, a send
   * transaction.
   */
  private isInTransaction = false;

  readonly causalityGuaranteed: boolean;
  /**
   * null iff causalityGuaranteed.
   */
  private readonly messageBuffer: CausalMessageBuffer | null;

  constructor(
    initToken: InitToken,
    options?: { causalityGuaranteed?: boolean }
  ) {
    super(initToken);

    this.causalityGuaranteed = options?.causalityGuaranteed ?? false;

    this.currentVC.set(this.runtime.replicaID, 0);

    if (!this.causalityGuaranteed) {
      this.messageBuffer = new CausalMessageBuffer(
        this.runtime.replicaID,
        this.currentVC,
        this.deliver.bind(this)
      );
    } else {
      this.messageBuffer = null;
    }
  }

  setChild<C extends Collab>(preChild: Pre<C>): C {
    const child = preChild(new InitToken("", this));
    this.child = child;
    return child;
  }

  getAddedContext(key: symbol): unknown {
    if (key === CRDTExtraMetaRequestee.CONTEXT_KEY) {
      return this.currentSendMeta();
    }
    if (key === MessageMeta.NEXT_MESSAGE_META) {
      const meta = <MessageMeta>(
        this.getContext(MessageMeta.NEXT_MESSAGE_META)
      ) ?? { sender: this.runtime.replicaID, isLocalEcho: true };
      meta[CRDTExtraMeta.MESSAGE_META_KEY] = this.currentSendMeta();
      return meta;
    }
    return undefined;
  }

  /**
   * Cache for currentSendMeta().
   */
  private _currentSendMeta: SendCRDTExtraMeta | null = null;
  /**
   * The CRDTExtraMeta for the current (or upcoming, if not
   * interrupted by a received message)
   * transaction.
   */
  private currentSendMeta(): SendCRDTExtraMeta {
    if (this._currentSendMeta === null) {
      this._currentSendMeta = new SendCRDTExtraMeta(
        this.runtime.replicaID,
        this.currentVC.get(this.runtime.replicaID)! + 1,
        this.currentVC,
        Date.now(),
        this.currentLamportTimestamp + 1,
        this.messageBuffer?.getCausallyMaximalVCKeys() ?? new Set()
      );
    }
    return this._currentSendMeta;
  }

  /**
   * Cache for currentSendBatch().
   */
  private _currentSendBatch: CRDTExtraMetaBatch | null = null;
  /**
   * The CRDTExtraMetaBatch for the current batch.
   */
  private currentSendBatch(): CRDTExtraMetaBatch {
    if (this._currentSendBatch === null) {
      this._currentSendBatch = new CRDTExtraMetaBatch(this.endTransaction);
    }
    return this._currentSendBatch;
  }

  /**
   * Ends the current transaction, if any.
   *
   * This must be called once per transaction at the end,
   * before processing any other messages (delivering or
   * updating our metadata).
   *
   * It may also be called outside of any transaction
   * (doing nothing).
   *
   * Specifically, it is called:
   * - Just before processing a message from another user,
   * in case there is a current transaction (which gets ended
   * by the received message).
   * - When the currentSendBatch is serialized, since that
   * indicates the end of the batch, hence current transaction
   * (if any - it might have already been ended by a processed
   * message).
   *
   * Defined as a var so we don't have to bind it as the
   * CRDTExtraMetaBatch callback.
   */
  private endTransaction = () => {
    if (this.isInTransaction) {
      this.isInTransaction = false;
      if (this._currentSendMeta !== null) {
        // Disallow further requests.
        this._currentSendMeta.freeze();
        // Make room for the next message to have a different
        // CRDTExtraMeta.
        this._currentSendMeta = null;
      }
      // Update "current" metadata to account for the end of
      // our current message.
      this.currentVC.set(
        this.runtime.replicaID,
        this.currentVC.get(this.runtime.replicaID)! + 1
      );
      this.currentLamportTimestamp++;
    }
  };

  childSend(child: Collab, messagePath: Message[]): void {
    if (child !== this.child) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    this.isInTransaction = true;
    const sendBatch = this.currentSendBatch();
    // Add this message's meta to the batch.
    sendBatch.metas.push(this.currentSendMeta());

    messagePath.push(sendBatch);
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
   * Also, not used for local echos.
   */
  private currentReceiveBatch: ReceiveCRDTExtraMeta[] | null = null;
  /**
   * The index for the next message in the batch of messages
   * currently being received. This combines with
   * currentReceiveBatch to fully describe the next message's
   * CRDTExtraMeta.
   *
   * null if we are not in the middle of receiving a batch.
   * Also, not used for local echos.
   */
  private currentReceiveBatchIndex: number | null = null;

  protected receiveInternal(messagePath: Message[], meta: MessageMeta): void {
    if (messagePath.length === 0) {
      throw new Error("messagePath.length === 0");
    }

    if (meta.isLocalEcho) {
      // This should equal this.pendingSendBatch.
      const batch = <CRDTExtraMetaBatch>messagePath[messagePath.length - 1];
      // Due to immediate local echos, we can assume that this
      // message corresponds to the current end of batch.
      // Note that batch might change in the future; that is
      // okay because crdtExtraMeta won't change as a result,
      // since the changes only add further messages to the
      // batch.
      const crdtExtraMeta = <SendCRDTExtraMeta>(
        batch.metas[batch.metas.length - 1]
      );
      // Remove our message.
      messagePath.length--;
      // Deliver immediately. No need to check the
      // buffer since our local echo cannot make any
      // previously received messages causally ready.
      if (!this.causalityGuaranteed) {
        this.messageBuffer!.processOwnDelivery();
      }
      this.deliver(messagePath, meta, crdtExtraMeta);

      // Reset isAutomatic, since we're done receiving.
      // (Otherwise future messages in the transaction will
      // inherit isAutomatic.)
      crdtExtraMeta.isAutomatic = false;
    } else {
      if (this.currentReceiveBatch === null) {
        // It's a new batch with a new CRDTMetaReceiveMessage.
        this.currentReceiveBatch = CRDTExtraMetaBatch.deserialize(
          meta.sender,
          <Uint8Array>messagePath[messagePath.length - 1]
        );
        this.currentReceiveBatchIndex = 0;
      }
      const crdtExtraMeta =
        this.currentReceiveBatch[this.currentReceiveBatchIndex!];

      this.currentReceiveBatchIndex!++;
      if (this.currentReceiveBatchIndex! === this.currentReceiveBatch.length) {
        // Done with the batch; allow GC.
        this.currentReceiveBatch = null;
        this.currentReceiveBatchIndex = null;
      }

      // Remove our message.
      messagePath.length--;

      if (this.causalityGuaranteed) {
        // Deliver immediately.
        this.deliver(messagePath, meta, crdtExtraMeta);
      } else {
        // Buffer the message and attempt to deliver it or
        // other messages.
        this.messageBuffer!.push(messagePath, meta, crdtExtraMeta);
        this.messageBuffer!.check();
      }
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
    if (meta.sender !== this.runtime.replicaID) {
      // End our current transaction, if any.
      this.endTransaction();
      // Update our own state to reflect the received crdtExtraMeta.
      this.currentVC.set(meta.sender, crdtExtraMeta.senderCounter);
      if (crdtExtraMeta.lamportTimestamp !== null) {
        // TODO: note that this is a restricted kind of
        // Lamport timestamp: only updates when you use it.
        // I think that should still give the causality
        // guarantees for actual uses, but need to check.
        this.currentLamportTimestamp = Math.max(
          crdtExtraMeta.lamportTimestamp,
          this.currentLamportTimestamp
        );
      }
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

  // TODO: throw error on save during a transaction.
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
