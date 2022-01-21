import {
  BatchingLayerEdgeMessage,
  BatchingLayerMessage,
} from "../../generated/proto_compiled";
import {
  Collab,
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  ICollabParent,
  MessageMeta,
  Pre,
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
  edges: { label: Uint8Array | string; parent: number }[];
  /**
   * Maps each vertex with at least one child to a map
   * from edge labels to the corresponding child.
   */
  children: Map<number, Map<Uint8Array | string, number>>;
  /**
   * The vertices corresponding to actual complete messagePaths,
   * in order of sending.
   */
  messages: number[];
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

  private pendingBatch: BatchInfo | null = null;

  constructor(
    initToken: InitToken,
    private batchingStrategy: BatchingStrategy
  ) {
    super(initToken);
    this.batchingStrategy.start(this);
  }

  setChild<C extends Collab>(preChild: Pre<C>): C {
    const child = preChild(new InitToken("", this));
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

  private inChildReceive = false;

  private batchEventPending = false;

  childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: (Uint8Array | string)[]
  ): void {
    if (child !== this.child) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    // Local echo.
    if (this.inChildReceive) {
      // send inside a receive call; not allowed (might break things).
      throw new Error(
        "BatchingLayer.send called during another message's receive;" +
          " did you try to perform an operation in an event handler?"
      );
    }
    const meta = <MessageMeta>(
      this.getContext(MessageMeta.NEXT_MESSAGE_META)
    ) ?? { sender: this.runtime.replicaID, isLocalEcho: true };
    this.inChildReceive = true;
    try {
      // Need to copy messagePath since receive mutates it but
      // we still need to store it.
      this.child.receive(messagePath.slice(), meta);
    } finally {
      this.inChildReceive = false;
    }

    let pendingBatch = this.pendingBatch;
    if (pendingBatch === null) {
      pendingBatch = { edges: [], children: new Map(), messages: [] };
      this.pendingBatch = pendingBatch;
    }

    // OPT: for single (non-batched) messages, optimize by
    // not doing anything fancy, just using the literal path?
    // Don't even form the pendingBatch structure, just store
    // it as a second special case after the empty case.

    // Find the vertex corresponding to messagePath, creating
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
    // We only need to serialize batch.edges and batch.messages;
    // batch.children is redundant with batch.edges.
    const batchMessage = BatchingLayerMessage.create({
      edges: batch.edges.map((edge) => {
        if (typeof edge.label === "string") {
          return { stringLabel: edge.label, parent: edge.parent };
        } else {
          return { bytesLabel: edge.label, parent: edge.parent };
        }
      }),
      messages: batch.messages,
    });
    const serialized = BatchingLayerMessage.encode(batchMessage).finish();
    this.send([serialized]);

    // OPT: optimized encoding: unwrap inner fields as
    // multiple arrays; for labels, put in one big Uint8Array
    // (encoding strings as needed) and have a separate packed
    // array of sint32's giving the length of each one and
    // using sign to say if it's a string or not.
    // Will avoid overhead of field number & type markers
    // on each label, and also gives us an easy way to encode
    // string-or-Uint8Array.
  }

  /**
   * No added context.
   *
   * @return undefined
   */
  getAddedContext(_key: symbol): unknown {
    return undefined;
  }

  protected receiveInternal(
    messagePath: (Uint8Array | string)[],
    meta: MessageMeta
  ): void {
    // We do our own local echo.
    if (meta.isLocalEcho) return;

    if (messagePath.length !== 1) {
      throw new Error(
        `messagePath.length is not 1: ${JSON.stringify(messagePath)}`
      );
    }

    const deserialized = BatchingLayerMessage.decode(
      <Uint8Array>messagePath[0]
    );
    for (const messageVertex of deserialized.messages) {
      // Reconstruct vertex's messagePath.
      const childMessagePath: (Uint8Array | string)[] = [];
      let vertex = messageVertex;
      while (vertex !== 0) {
        const edge = <BatchingLayerEdgeMessage>deserialized.edges[vertex - 1];
        childMessagePath.push(
          edge.label === "stringLabel" ? edge.stringLabel : edge.bytesLabel
        );
        vertex = edge.parent;
      }
      // Deliver messagePath.
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
        // Don't let the error block other messages' delivery,
        // but still make it print
        // its error like it was unhandled.
        void Promise.resolve().then(() => {
          throw err;
        });
      } finally {
        this.inChildReceive = false;
      }
    }

    this.emit("Change", { meta });
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

  getDescendant(namePath: string[]): Collab<CollabEventsRecord> {
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
