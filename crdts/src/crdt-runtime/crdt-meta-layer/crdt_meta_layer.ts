import {
  BatchingLayer,
  Collab,
  ICollabParent,
  InitToken,
  int64AsNumber,
  Message,
  MessageMeta,
  Optional,
} from "@collabs/core";
import { CRDTMetaLayerSave } from "../../../generated/proto_compiled";
import { CRDTMeta, CRDTMetaRequestee } from "../crdt_meta";
import { CausalMessageBuffer } from "./causal_message_buffer";
import { ReceiveCRDTMetaBatch, SendCRDTMetaBatch } from "./crdt_meta_batches";
import { ReceiveCRDTMeta, SendCRDTMeta } from "./crdt_meta_implementations";
import { ReceiveTransaction } from "./receive_transaction";

/**
 * Collab that provides [[CRDTMeta]] to its
 * descendants.
 *
 * The added [[CRDTMeta]] is stored in [[MessageMeta]]'s
 * index signature
 * keyed by [[CRDTMeta.MESSAGE_META_KEY]].
 *
 * All messages in the same transaction are assigned
 * the same [[CRDTMeta]], where transactions are delimited
 * (ended) by either:
 * - Serializing the most recent [[SerializableMessage]]
 * sent by this class.
 * E.g., when using this class inside [[BatchingLayer]]
 * like in [[CRDTRuntime]], this occurs when
 * [[BatchingLayer.commitBatch]] is called. (Note that the same [[SerializableMessage]]
 * is reused until it is serialized.
 * E.g., when using this class inside [[BatchingLayer]]
 * like in [[CRDTRuntime]], this occurs when
 * [[BatchingLayer.commitBatch]] is called.)
 * - Receiving a message from another replica.
 *
 * When the `causalityGuaranteed` constructor option
 * is false (the default), it is assumed that no ancestor [[Collab]]s
 * provide extra metadata fields. These fields will be
 * forgotten during saving, if there are queued
 * not-yet-causally-ready messages.
 * (Exception: BatchingLayer.BATCH_SIZE_KEY, which we extract and don't need
 * after loading.)
 */
export class CRDTMetaLayer extends Collab implements ICollabParent {
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

  /**
   * `causalityGuaranteed` option: Optimization flag.
   * If you can guarantee that messages will always be
   * delivered in causal order (i.e., after all of their
   * causal predecessors), then you may set this to true.
   * Then this class will not bother attaching the
   * vector clock entries needed to ensure causal order
   * delivery.
   * - Important: if any replica (not necessarily
   * the local one), on any network, is not guaranteed
   * causality, then this flag must be false.
   * - When true, redundant re-deliveries are still okay -
   * they will be filtered out as usual.
   */
  constructor(init: InitToken, options?: { causalityGuaranteed?: boolean }) {
    super(init);

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

  setChild<C extends Collab>(childCallback: (init: InitToken) => C): C {
    const child = childCallback(new InitToken("", this));
    this.child = child;
    return child;
  }

  getAddedContext(key: symbol): unknown {
    if (key === CRDTMetaRequestee.CONTEXT_KEY) {
      return this.currentSendMeta();
    }
    if (key === MessageMeta.NEXT_MESSAGE_META) {
      let meta = <MessageMeta>(
        this.getContext(MessageMeta.NEXT_MESSAGE_META)
      ) ?? { sender: this.runtime.replicaID, isLocalEcho: true };
      meta = meta.set(CRDTMeta.MESSAGE_META_KEY, this.currentSendMeta());
      return meta;
    }
    return undefined;
  }

  /**
   * Cache for currentSendMeta().
   */
  private _currentSendMeta: SendCRDTMeta | null = null;
  /**
   * The CRDTMeta for the current (or upcoming, if not
   * interrupted by a received message)
   * transaction.
   */
  private currentSendMeta(): SendCRDTMeta {
    if (this._currentSendMeta === null) {
      this._currentSendMeta = new SendCRDTMeta(
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
  private _currentSendBatch: SendCRDTMetaBatch | null = null;
  /**
   * The SendCRDTMetaBatch for the current batch.
   */
  private currentSendBatch(): SendCRDTMetaBatch {
    if (this._currentSendBatch === null) {
      this._currentSendBatch = new SendCRDTMetaBatch(this.onBatchSerialize);
    }
    return this._currentSendBatch;
  }

  /**
   * Callback for _currentSendBatch's onSerialize.
   *
   * Defined as a var so we don't have to bind it as the
   * CRDTMetaBatch callback.
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
      // CRDTMeta.
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
  private currentReceiveBatch: ReceiveCRDTMetaBatch | null = null;

  receive(messagePath: Message[], meta: MessageMeta): void {
    if (messagePath.length === 0) {
      throw new Error("messagePath.length === 0");
    }

    if (meta.isEcho) {
      // Due to immediate local echos, we can assume that this
      // message corresponds to the current transaction.
      const crdtMeta = this.currentSendMeta();
      // Remove our message.
      messagePath.length--;
      // Deliver immediately. No need to check the
      // buffer since our local echo cannot make any
      // previously received messages causally ready.
      if (!this.causalityGuaranteed) {
        this.messageBuffer!.processOwnDelivery();
      }
      this.deliverMessage(messagePath, meta, crdtMeta);

      // Reset isAutomatic, since we're done receiving.
      // (Otherwise future messages in the transaction will
      // inherit isAutomatic.)
      crdtMeta.isAutomatic = false;
    } else {
      if (meta.sender === this.runtime.replicaID) {
        // We got redelivered our own message not as a
        // local echo. Redundant; do nothing.
        // (In fact the calls to isAlreadyDelivered below
        // should be sufficient to check for this.)
        return;
      }

      if (this.currentReceiveBatch === null) {
        // It's a new batch with a new CRDTMetaReceiveMessage.
        this.currentReceiveBatch = new ReceiveCRDTMetaBatch(
          meta.sender,
          <number | undefined>meta.get(BatchingLayer.BATCH_SIZE_KEY) ?? 1,
          <Uint8Array>messagePath[messagePath.length - 1]
        );
      }

      // Remove our message.
      messagePath.length--;

      // Since the message is not a local echo, we can
      // assume messagePath is all (Uint8Array | string).
      // Also, here we are implicitly using the assumption
      // that meta is just `{ sender, isLocalEcho }`,
      // by forgetting it.
      if (
        this.currentReceiveBatch.received(<(Uint8Array | string)[]>messagePath)
      ) {
        // Deliver/buffer the current transaction.
        const transaction = this.currentReceiveBatch.completeTransaction();
        if (this.causalityGuaranteed) {
          // We're assured that the transaction is causally
          // ready; we just need to ensure that it has
          // not already been delivered.
          // (That includes the case of getting delivered
          // our own message as not a local echo).
          if (!this.isAlreadyDelivered(transaction.crdtMeta)) {
            this.deliverRemoteTransaction(transaction);
          }
        } else {
          // Buffer the message and attempt to deliver it or
          // other messages.
          this.messageBuffer!.pushRemoteTransaction(transaction);
          this.messageBuffer!.check();
        }

        if (this.currentReceiveBatch.isFinished()) {
          // Done with the batch; make room for the next one.
          this.currentReceiveBatch = null;
        }
      }
    }
  }

  /**
   * @return whether a message with the given sender and
   * senderCounter
   * has already been delivered.
   */
  private isAlreadyDelivered(crdtMeta: ReceiveCRDTMeta): boolean {
    const senderEntry = this.currentVC.get(crdtMeta.sender);
    if (senderEntry !== undefined) {
      if (senderEntry >= crdtMeta.senderCounter) return true;
    }
    return false;
  }

  /**
   * Called for non-local messages only.
   * @param  transaction [description]
   * @return             [description]
   */
  private deliverRemoteTransaction(transaction: ReceiveTransaction) {
    // End our current transaction, if any.
    // Note this immediately updates our own VC entry and
    // Lamport timestamp.
    this.endTransaction();
    // Update our own state to reflect the received crdtMeta.
    this.currentVC.set(
      transaction.crdtMeta.sender,
      transaction.crdtMeta.senderCounter
    );
    if (transaction.crdtMeta.lamportTimestamp !== null) {
      // TODO: note that this is a restricted kind of
      // Lamport timestamp: only updates when you use it.
      // I think that should still give the causality
      // guarantees for actual uses, but need to check.
      this.currentLamportTimestamp = Math.max(
        transaction.crdtMeta.lamportTimestamp,
        this.currentLamportTimestamp
      );
    }

    // Deliver messages.
    for (const message of transaction.messages) {
      this.deliverMessage(
        message,
        MessageMeta.new(transaction.crdtMeta.sender, false, false),
        transaction.crdtMeta
      );
    }
  }

  private deliverMessage(
    messagePath: Message[],
    meta: MessageMeta,
    crdtMeta: CRDTMeta
  ) {
    // Add the CRDTMeta to meta.
    meta = meta.set(CRDTMeta.MESSAGE_META_KEY, crdtMeta);

    try {
      this.child.receive(messagePath, meta);
    } catch (err) {
      if (meta.isEcho) {
        // Propagate the error back to the original
        // operation.
        throw err;
      } else {
        console.error("Error while receiving remote Collabs message:\n", err);
      }
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
    const saveMessage = CRDTMetaLayerSave.create({
      vectorClock,
      lamportTimestamp: this.currentLamportTimestamp,
      childSave: this.child.save(),
      messageBufferSave: this.messageBuffer?.save(),
    });
    return CRDTMetaLayerSave.encode(saveMessage).finish();
  }

  load(saveData: Optional<Uint8Array>): void {
    if (!saveData.isPresent) {
      // Indicates skipped loading. Pass on the message.
      this.child.load(saveData);
    } else {
      const saveMessage = CRDTMetaLayerSave.decode(saveData.get());
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

  getDescendant(namePath: string[]): Collab | undefined {
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
