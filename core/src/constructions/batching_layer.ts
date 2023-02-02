import { util } from "protobufjs/minimal";
import { BatchingLayerMessage } from "../../generated/proto_compiled";
import {
  Collab,
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  ICollabParent,
  MessageMeta,
  Message,
  serializeMessage,
} from "../core";
import { Optional } from "../util";
import { BatchingStrategy } from "./batching_strategy";

export interface BatchingLayerEventsRecord extends CollabEventsRecord {
  /**
   * Emitted each time the child's state is changed
   * (including changes to its descendants) and
   * is in a reasonable user-facing state
   * (so not in the middle of a transaction).
   *
   * A [[Runtime]] using this [[BatchingLayer]] should listen
   * on this event and emit its own "Change" events in response.
   *
   * More specifically, a "Change" event is emitted:
   * - For messages sent by the local child, once per
   * transaction, in a microtask scheduled after the first
   * sent message. Note that this may happen more than once per
   * batch or after the batch is committed, if it is
   * committed synchronously with the transaction.
   * - For received messages, once per batch.
   */
  Change: CollabEvent;
  /**
   * Emitted when a batch is pending, i.e., there is
   * a complete transaction waiting to be sent.
   * [[commitBatch]] can be be called to send it immediately,
   * or you (or the [[BatchingStrategy]]) can wait to send it later.
   *
   * Specifically, this event is emitted in a microtask after
   * the child sends a message, unless that message's batch
   * is already committed by the time of the microtask.
   */
  BatchPending: CollabEvent;
  /**
   * Event for debugging and testing purposes only.
   * Emitted each time a message is sent by the child,
   * at the end of [[BatchingLayer.childSend]]. By calling [[BatchingLayer.commitBatch]]
   * each time this event is emitted, you can effectively
   * disable batching. Doing so in a real application is
   * not recommended because it will break up transactions.
   */
  DebugSend: CollabEvent;
}

/**
 * Info about a pending batch.
 *
 * The sent messagePath's are interpreted as paths to the root in
 * a tree (last element is closest to the root), with the elements labelling
 * edges. We apply suffix compression (prefix compression but
 * reversed) to these paths.
 *
 * Edge labels are compared using ===, so you will only get
 * reasonable equality for (1) strings and (2) Uint8Arrays
 * that are stored by the sender and reused (e.g. collection
 * elements stored in serialized form).
 *
 * Vertices are labelled with numbers sequentially. The root
 * (messagePath = []) is 0.
 */
interface BatchInfo {
  /**
   * For each edge, maps from (child vertex - 1) to its label
   * and parent vertex.
   */
  edges: { label: Message; parent: number }[];
  /**
   * Maps each vertex with at least one child to a map
   * from edge labels to the corresponding child.
   */
  children: Map<number, Map<Message, number>>;
  /**
   * The vertices corresponding to actual complete messagePaths,
   * in order of sending.
   */
  messages: number[];

  /**
   * Type guard.
   */
  isBatchInfo: true;
}

function isBatchInfo(
  pendingBatch: BatchInfo | Message[]
): pendingBatch is BatchInfo {
  return (<BatchInfo>pendingBatch).isBatchInfo === true;
}

/**
 * Collab that batches message sent by its descendants.
 *
 * Batching serves a few purposes:
 * - Enforces transactional
 * behavior ([transactions docs](../../transactions.md)):
 * messages sent in the same event loop iteration are
 * delivered atomically on each replica.
 * - Reduce the number and size of messages sent on the
 * network, by delivering multiple transactions together
 * with some compression applied. Specifically, path
 * prefix compression is applied to sent `messagePath`s,
 * so in particular, multiple messages from the same [[Collab]]
 * end up only sending that [[Collab]]'s name path once.
 * - Rate-limit the rate of message sending.
 *
 * Typically, [[BatchingLayer]] should either be the
 * root Collab, or the sole child of the root, or the
 * sole child of a sole child, etc. Otherwise,
 * the current [[MessageMeta]] may change during a batch,
 * causing a sending replica to see different [[MessageMeta]]'s
 * than recipients.
 *
 * See the note on [[save]] about calling [[commitBatch]]
 * before saving---ideally before saving starts at the
 * [[Runtime]]/root level, to prevent confusion due to sending
 * messages partway through an ancestor's save.
 *
 * As an optimization, descendants of a [[BatchingLayer]] should reuse
 * [[Uint8Array]] objects (treated as immutable) when sending
 * identical messages, possibly within the same batch. That
 * allows [[BatchingLayer]] to deduplicate the messages.
 */
export class BatchingLayer
  extends Collab<BatchingLayerEventsRecord>
  implements ICollabParent
{
  private child!: Collab;

  /**
   * The first message is stored as a plain Message[]; if another message
   * appears, it is converted to BatchInfo. null when no send batch is pending.
   */
  private pendingBatch: BatchInfo | Message[] | null = null;

  constructor(init: InitToken, private batchingStrategy: BatchingStrategy) {
    super(init);
    this.batchingStrategy.start(this);
  }

  setChild<C extends Collab>(childCallback: (init: InitToken) => C): C {
    const child = childCallback(new InitToken("", this));
    this.child = child;
    return child;
  }

  /**
   * Replaces the current [[BatchingStrategy]] with
   * `batchingStrategy`.
   *
   * @param  batchingStrategy [description]
   */
  setBatchingStrategy(batchingStrategy: BatchingStrategy): void {
    this.batchingStrategy.stop();
    this.batchingStrategy = batchingStrategy;
    this.batchingStrategy.start(this);
  }

  isBatchPending(): boolean {
    return this.pendingBatch !== null;
  }

  /**
   * [[MessageMeta]] extra metadata that gives the number of messages
   * in the current batch.
   */
  static BATCH_SIZE_KEY = Symbol();

  private inChildReceive = false;

  private batchEventPending = false;

  childSend(child: Collab<CollabEventsRecord>, messagePath: Message[]): void {
    if (child !== this.child) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    // Local echo.
    if (this.inChildReceive) {
      // send inside a receive call; not allowed (might break things).
      throw new Error(
        "BatchingLayer.childSend called during another message's receive;" +
          " did you try to perform an operation in an event handler?"
      );
    }
    const meta = <MessageMeta>this.getContext(MessageMeta.NEXT_MESSAGE_META);
    this.inChildReceive = true;
    try {
      // Need to copy messagePath since receive mutates it but
      // we still need to store it.
      this.child.receive(messagePath.slice(), meta);
    } finally {
      this.inChildReceive = false;
    }

    if (this.pendingBatch === null) {
      this.pendingBatch = messagePath;
    } else if (isBatchInfo(this.pendingBatch)) {
      this.addToPendingBatch(messagePath);
    } else {
      // pendingBatch is a single messagePath. Creating a new BatchInfo
      // with both messages.
      const previousMessagePath = this.pendingBatch;
      this.pendingBatch = {
        edges: [],
        children: new Map(),
        messages: [],
        isBatchInfo: true,
      };
      this.addToPendingBatch(previousMessagePath);
      this.addToPendingBatch(messagePath);
    }

    // Schedule a BatchPending event as a microtask, if there
    // is not one pending already.
    // This notifies BatchingStrategy and also emits a Change event.
    if (!this.batchEventPending) {
      this.batchEventPending = true;
      void Promise.resolve().then(() => {
        this.batchEventPending = false;
        if (this.isBatchPending()) {
          // Only emit if the batch is still pending.
          this.emit("BatchPending", { meta });
        }
        this.emit("Change", { meta });
      });
    }

    this.emit("DebugSend", { meta }, false);
  }

  /**
   * Assumes this.pendingBatch has type BatchInfo.
   */
  private addToPendingBatch(messagePath: Message[]) {
    const pendingBatch = <BatchInfo>this.pendingBatch;

    // Find the vertex corresponding to messagePathResolved, creating
    // it if necessary.
    let vertex = 0;
    for (let i = messagePath.length - 1; i >= 0; i--) {
      const message = messagePath[i];
      let nextVertex: number | undefined = undefined;
      let vertexChildren = pendingBatch.children.get(vertex);
      if (vertexChildren !== undefined) {
        nextVertex = vertexChildren.get(message);
      } else {
        vertexChildren = new Map();
        pendingBatch.children.set(vertex, vertexChildren);
      }
      if (nextVertex === undefined) {
        // Create a new vertex for it.
        nextVertex = pendingBatch.edges.length + 1;
        pendingBatch.edges.push({ label: message, parent: vertex });
        vertexChildren.set(message, nextVertex);
      }
      vertex = nextVertex;
    }
    pendingBatch.messages.push(vertex);
  }

  /**
   * [commitBatch description]
   * @return [description]
   */
  commitBatch() {
    if (this.pendingBatch === null) return;
    const batch = this.pendingBatch;
    // Clear this.pendingBatch now so that this.isBatchPending()
    // is false when we call send at the end of this method,
    // in case someone consults it during send.
    this.pendingBatch = null;

    // Serialize the batch and send it.
    let batchMessage: BatchingLayerMessage;
    if (isBatchInfo(batch)) {
      // We only need to serialize batch.edges and batch.messages;
      // batch.children is redundant with batch.edges.
      // Note that we serialize the individual labels and store
      // them back in batch.edges[i].label, so that can later
      // be assumed to have type Uint8Array | string.
      const edgeLabelLengths = new Array<number>(batch.edges.length);
      let totalLength = 0;
      const edgeParents = new Array<number>(batch.edges.length);
      for (let i = 0; i < batch.edges.length; i++) {
        const label = serializeMessage(batch.edges[i].label);
        batch.edges[i].label = label; // Store serialized form.
        if (typeof label === "string") {
          const length = util.utf8.length(label);
          edgeLabelLengths[i] = ~length;
          totalLength += length;
        } else {
          edgeLabelLengths[i] = label.length;
          totalLength += label.length;
        }
        edgeParents[i] = batch.edges[i].parent;
      }
      const edgeLabelsPacked = new Uint8Array(totalLength);
      let offset = 0;
      for (let i = 0; i < batch.edges.length; i++) {
        const label = batch.edges[i].label;
        if (typeof label === "string") {
          util.utf8.write(label, edgeLabelsPacked, offset);
          offset += ~edgeLabelLengths[i];
        } else {
          // Use assumption that label is already serialized,
          // hence must be Uint8Array here.
          edgeLabelsPacked.set(<Uint8Array>label, offset);
          offset += edgeLabelLengths[i];
        }
      }

      batchMessage = BatchingLayerMessage.create({
        edgeLabelsPacked,
        edgeLabelLengths,
        edgeParents,
        messages: batch.messages,
      });
    } else {
      // batch is a single messagePath. Store it using edgeLabelsPacked
      // and edgeLabelLengths like before, but just in order, and leave
      // out edgeParents & messages.
      const messageLengths = new Array<number>(batch.length);
      let totalLength = 0;
      for (let i = 0; i < batch.length; i++) {
        const message = serializeMessage(batch[i]);
        batch[i] = message; // Store serialized form.
        if (typeof message === "string") {
          const length = util.utf8.length(message);
          messageLengths[i] = ~length;
          totalLength += length;
        } else {
          messageLengths[i] = message.length;
          totalLength += message.length;
        }
      }
      const messagesPacked = new Uint8Array(totalLength);
      let offset = 0;
      for (let i = 0; i < batch.length; i++) {
        const message = batch[i];
        if (typeof message === "string") {
          util.utf8.write(message, messagesPacked, offset);
          offset += ~messageLengths[i];
        } else {
          // Use assumption that message is already serialized,
          // hence must be Uint8Array here.
          messagesPacked.set(<Uint8Array>message, offset);
          offset += messageLengths[i];
        }
      }

      batchMessage = BatchingLayerMessage.create({
        edgeLabelsPacked: messagesPacked,
        edgeLabelLengths: messageLengths,
      });
    }

    const serialized = BatchingLayerMessage.encode(batchMessage).finish();
    this.send([serialized]);
  }

  receive(messagePath: Message[], meta: MessageMeta): void {
    // We do our own local echo.
    if (meta.isEcho) return;

    if (messagePath.length !== 1) {
      throw new Error(
        `messagePath.length is not 1: ${JSON.stringify(messagePath)}`
      );
    }

    const deserialized = BatchingLayerMessage.decode(
      <Uint8Array>messagePath[0]
    );
    const edgeLabels = new Array<string | Uint8Array>(
      deserialized.edgeLabelLengths.length
    );
    let offset = 0;
    for (let i = 0; i < edgeLabels.length; i++) {
      const signedLengthI = deserialized.edgeLabelLengths[i];
      if (signedLengthI < 0) {
        // string, actual length is ~signedLengthI.
        const lengthI = ~signedLengthI;
        edgeLabels[i] = util.utf8.read(
          deserialized.edgeLabelsPacked,
          offset,
          offset + lengthI
        );
        offset += lengthI;
      } else {
        // Uint8Array, actual length is signedLengthI.
        edgeLabels[i] = new Uint8Array(
          deserialized.edgeLabelsPacked.buffer,
          offset + deserialized.edgeLabelsPacked.byteOffset,
          signedLengthI
        );
        offset += signedLengthI;
      }
    }

    if (deserialized.messages.length === 0) {
      // Single message case. edgeLabels is the literal single message.
      meta = meta.set(BatchingLayer.BATCH_SIZE_KEY, 1);
      this.deliver(edgeLabels, meta);
    } else {
      // BatchInfo case. Use full deserialized message.
      meta = meta.set(
        BatchingLayer.BATCH_SIZE_KEY,
        deserialized.messages.length
      );
      for (const messageVertex of deserialized.messages) {
        // Reconstruct vertex's messagePath.
        const childMessagePath: (Uint8Array | string)[] = [];
        let vertex = messageVertex;
        while (vertex !== 0) {
          childMessagePath.push(edgeLabels[vertex - 1]);
          vertex = deserialized.edgeParents[vertex - 1];
        }
        this.deliver(childMessagePath, meta);
      }
    }

    this.emit("Change", { meta });
  }

  private deliver(
    childMessagePath: (Uint8Array | string)[],
    meta: MessageMeta
  ): void {
    if (this.inChildReceive) {
      // nested receive calls; not allowed (might break things).
      throw new Error(
        "BatchingLayer.receive called during another message's receive;" +
          " did you try to deliver a message in an event handler?"
      );
    }
    this.inChildReceive = true;
    try {
      this.child.receive(childMessagePath, meta);
    } catch (err) {
      console.error("Error while receiving remote Collabs message:\n", err);
    }
    this.inChildReceive = false;
  }

  /**
   * Usage note: there must not be a pending batch when this
   * is called. I.e., you should call [[commitBatch]] first,
   * then call `save` before any new messages might get queued.
   *
   * Saving with a pending batch does not make sense because
   * the pending messages are authored by the current replica,
   * not some future replica who might load this state
   * (possibly none or several concurrently). We can't just
   * ignore the pending batch or wait to commit it until
   * after saving, since the BatchingLayer's descendants
   * have already processed the pending messages, hence
   * their save state will reflect those messages.
   *
   * @throws is [[isBatchPending]]()
   */
  save(): Uint8Array {
    // Need to flush before saving.
    if (this.isBatchPending()) {
      throw new Error(
        "Cannot save during pending batch (call commitBatch() first)"
      );
    }
    return this.child.save();
  }

  load(saveData: Optional<Uint8Array>): void {
    this.child.load(saveData);
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
    return !this.isBatchPending() && this.child.canGC();
  }
}
