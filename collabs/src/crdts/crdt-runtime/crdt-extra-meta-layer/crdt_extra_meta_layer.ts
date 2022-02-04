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
import {
  SendCRDTExtraMetaBatch,
  ReceiveCRDTExtraMetaBatch,
} from "./crdt_extra_meta_batches";
import {
  ReceiveCRDTExtraMeta,
  SendCRDTExtraMeta,
} from "./crdt_extra_meta_implementations";
import { Transaction } from "./transaction";

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
        this.deliverRemoteTransaction.bind(this)
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
  private _currentSendBatch: SendCRDTExtraMetaBatch | null = null;
  /**
   * The SendCRDTExtraMetaBatch for the current batch.
   */
  private currentSendBatch(): SendCRDTExtraMetaBatch {
    if (this._currentSendBatch === null) {
      this._currentSendBatch = new SendCRDTExtraMetaBatch(
        this.onBatchSerialize
      );
    }
    return this._currentSendBatch;
  }

  /**
   * Callback for _currentSendBatch's onSerialize.
   *
   * Defined as a var so we don't have to bind it as the
   * CRDTExtraMetaBatch callback.
   */
  private onBatchSerialize = () => {
    // End the current transaction, if any.
    // Note this may modify the batch (pushing current
    // transaction's meta onto batch.metas).
    this.endTransaction();
    // Make room for the next batch.
    this._currentSendBatch = null;
  };

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
   * - in onBatchSerialize, since that
   * indicates the end of the batch, hence current transaction
   * (if any - it might have already been ended by a processed
   * message).
   */
  private endTransaction() {
    if (this.isInTransaction) {
      this.isInTransaction = false;
      // Disallow further requests.
      this._currentSendMeta!.freeze();
      // Add the currentSendMeta to the batch.
      this.currentSendBatch().metas.push(this._currentSendMeta!);
      // Make room for the next transaction to have a different
      // CRDTExtraMeta.
      this._currentSendMeta = null;
      // Update "current" metadata to account for the end of
      // our current message.
      this.currentVC.set(
        this.runtime.replicaID,
        this.currentVC.get(this.runtime.replicaID)! + 1
      );
      this.currentLamportTimestamp++;
    }
  }

  childSend(child: Collab, messagePath: Message[]): void {
    if (child !== this.child) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    this.isInTransaction = true;

    this.currentSendMeta().count++;

    messagePath.push(this.currentSendBatch());
    this.send(messagePath);
  }

  /**
   * The CRDTMetaReceiveMessage for the batch of messages
   * currently being received.
   *
   * null if we are not in the middle of receiving a batch.
   * Also, not used for local echos.
   */
  private currentReceiveBatch: ReceiveCRDTExtraMetaBatch | null = null;

  protected receiveInternal(messagePath: Message[], meta: MessageMeta): void {
    if (messagePath.length === 0) {
      throw new Error("messagePath.length === 0");
    }

    if (meta.isLocalEcho) {
      // Due to immediate local echos, we can assume that this
      // message corresponds to the current transaction.
      const crdtExtraMeta = this.currentSendMeta();
      // Remove our message.
      messagePath.length--;
      // Deliver immediately. No need to check the
      // buffer since our local echo cannot make any
      // previously received messages causally ready.
      if (!this.causalityGuaranteed) {
        this.messageBuffer!.processOwnDelivery();
      }
      this.deliverMessage(messagePath, meta, crdtExtraMeta);

      // Reset isAutomatic, since we're done receiving.
      // (Otherwise future messages in the transaction will
      // inherit isAutomatic.)
      crdtExtraMeta.isAutomatic = false;
    } else {
      if (this.currentReceiveBatch === null) {
        // It's a new batch with a new CRDTMetaReceiveMessage.
        this.currentReceiveBatch = new ReceiveCRDTExtraMetaBatch(
          meta.sender,
          <Uint8Array>messagePath[messagePath.length - 1]
        );
      }

      // Remove our message.
      messagePath.length--;

      if (this.currentReceiveBatch.received(messagePath, meta)) {
        // Deliver/buffer the current transaction.
        const transaction = this.currentReceiveBatch.completeTransaction();
        if (this.causalityGuaranteed) {
          // We're assured that the transaction is causally
          // ready; we just need to ensure that it has
          // not already been delivered.
          // (That includes the case of getting delivered
          // our own message as not a local echo).
          if (!this.isAlreadyDelivered(transaction.crdtExtraMeta)) {
            this.deliverRemoteTransaction(transaction);
          }
        } else {
          // Buffer the message and attempt to deliver it or
          // other messages.
          this.messageBuffer!.push(transaction);
          this.messageBuffer!.check();
        }

        if (this.currentReceiveBatch.isFinished()) {
          // Done with the batch; make room for the next one.
          this.currentReceiveBatch = null;
        }
      }
    }
  }

  // TODO: deduplicate?
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
   * Called for non-local messages only.
   * @param  transaction [description]
   * @return             [description]
   */
  private deliverRemoteTransaction(transaction: Transaction) {
    // End our current transaction, if any.
    // Note this immediately updates our own VC entry and
    // Lamport timestamp.
    this.endTransaction();
    // Update our own state to reflect the received crdtExtraMeta.
    this.currentVC.set(
      transaction.crdtExtraMeta.sender,
      transaction.crdtExtraMeta.senderCounter
    );
    if (transaction.crdtExtraMeta.lamportTimestamp !== null) {
      // TODO: note that this is a restricted kind of
      // Lamport timestamp: only updates when you use it.
      // I think that should still give the causality
      // guarantees for actual uses, but need to check.
      this.currentLamportTimestamp = Math.max(
        transaction.crdtExtraMeta.lamportTimestamp,
        this.currentLamportTimestamp
      );
    }

    // Deliver messages.
    for (const message of transaction.messages) {
      this.deliverMessage(
        message.messagePath,
        message.meta,
        transaction.crdtExtraMeta
      );
    }
  }

  private deliverMessage(
    messagePath: Message[],
    meta: MessageMeta,
    crdtExtraMeta: CRDTExtraMeta
  ) {
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
    if (this.isInTransaction) {
      throw new Error(
        "Cannot call save during a send transaction; commit the pending batch first"
      );
    }
    if (this.currentReceiveBatch !== null) {
      throw new Error(
        "Cannot call save during a received transaction; let the current received batch be processed first"
      );
    }

    const vectorClock = Object.fromEntries(this.currentVC);
    const saveMessage = CRDTExtraMetaLayerSave.create({
      vectorClock,
      lamportTimestamp: this.currentLamportTimestamp,
      childSave: this.child.save(),
      messageBufferSave: this.messageBuffer?.save(),
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
      if (this.messageBuffer !== null) {
        this.messageBuffer.load(saveMessage.messageBufferSave);
      }
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
