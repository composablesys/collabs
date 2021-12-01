import { BatchingLayerMessage } from "../../../generated/proto_compiled";
import { Crdt, CrdtEvent, CrdtEventsRecord, InitToken, Pre } from "../crdt";
import { ParentCrdt } from "../crdt_parent";
import { MessageMeta } from "../message_meta";
import { BatchingStrategy } from "./batching_strategy";

/**
 * TODO: guarantees Change event for all changes.
 * For send, this is per transaction (microtask after
 * each sent message), possibly more than once per batch
 * or after the batch is committed (if committed synchronously).
 * For received messages, emitted once per batch.
 */
export interface BatchingLayerEventsRecord extends CrdtEventsRecord {
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
  BatchPending: CrdtEvent;
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
 * Crdt that batches message sent by its descendants.
 *
 * TODO: for correct MessageMeta's (consistent between sender
 * and receiver), need to guarantee that parent.nextMessageMeta()
 * is consistent within batches. In practice, this requires
 * usage like in DefaultRuntime: BatchingLayer is the root
 * (so no other sent messages can increase senderCounter),
 * and only mandatory MessageMeta is supplied (so received messages
 * don't change it).
 *
 * TODO: transactions: still works within event loop iterations;
 * but when a batch contains multiple transactions, there
 * might be other messages causally between them, in case
 * a message is received in between. So delaying commitBatch
 * calls doesn't work to create transactions across event
 * loop iterations, unless the parent blocks delivery while
 * isBatchPending().
 *
 * TODO: somewhere: advice to reuse Uint8Array's, or use strings,
 * if you send the same messages often. That way they
 * can be batched properly. Especially true for high-up
 * things, e.g., child names and adding metadata.
 */
export class BatchingLayer
  extends Crdt<BatchingLayerEventsRecord>
  implements ParentCrdt
{
  private child!: Crdt;

  private pendingBatch: BatchInfo | null = null;

  constructor(
    initToken: InitToken,
    private batchingStrategy: BatchingStrategy
  ) {
    super(initToken);
    this.batchingStrategy.start(this);
  }

  setChild<C extends Crdt>(preChild: Pre<C>): C {
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
    child: Crdt<CrdtEventsRecord>,
    messagePath: (Uint8Array | string)[]
  ): void {
    if (child !== this.child) {
      throw new Error("childSend called by non-child: " + child);
    }

    // Local echo.
    if (this.inChildReceive) {
      // send inside a receive call; not allowed (might break things).
      throw new Error(
        "BatchingLayer.send called during another message's receive;" +
          " did you try to perform an operation in an event handler?"
      );
    }
    const meta = this.parent.nextMessageMeta();
    this.inChildReceive = true;
    try {
      this.child.receive(messagePath, meta);
    } finally {
      this.inChildReceive = false;
    }

    let pendingBatch = this.pendingBatch;
    if (pendingBatch === null) {
      pendingBatch = { edges: [], children: new Map(), messages: [] };
      this.pendingBatch = pendingBatch;
    }

    // TODO: for single (non-batched) messages, optimize by
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
      Promise.resolve().then(() => {
        this.batchEventPending = false;
        if (this.isBatchPending()) {
          this.emit("BatchPending", { meta });
        } else {
          // The batch is no longer pending, so don't emit
          // a BatchPending event. However we still have to
          // emit a Change event, since the state was changed
          // in a transaction.
          this.emit("Change", { meta });
        }
      });
    }
  }

  /**
   * [commitBatch description]
   * @return [description]
   */
  commitBatch() {
    if (this.pendingBatch === null) return;
    const batch = this.pendingBatch;
    // Clear this.pendingBatch now so that this.isBatchPending()
    // is false when we call send at the end of this method.
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

    // TODO: optimized encoding: unwrap inner fields as
    // multiple arrays; for labels, put in one big Uint8Array
    // (encoding strings as needed) and have a separate packed
    // array of sint32's giving the length of each one and
    // using sign to say if it's a string or not.
    // Will avoid overhead of field number & type markers
    // on each label, and also gives us an easy way to encode
    // string-or-Uint8Array.
  }

  protected receiveInternal(
    messagePath: (Uint8Array | string)[],
    meta: MessageMeta
  ): void {
    // We do our own echo.
    if (meta.isLocal) return;

    if (messagePath.length !== 1) {
      throw new Error("messagePath.length is not 1: " + messagePath.length);
    }

    const deserialized = BatchingLayerMessage.decode(
      <Uint8Array>messagePath[0]
    );
    for (let vertex of deserialized.messages) {
      // Reconstruct vertex's messagePath.
      const childMessagePath: (Uint8Array | string)[] = [];
      while (vertex !== 0) {
        const edge = deserialized.edges[vertex - 1];
        childMessagePath.push((edge.stringLabel || edge.bytesLabel)!);
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
      } finally {
        this.inChildReceive = false;
      }
    }

    // Emit Change event, so that all changes have an event.
    this.emit("Change", { meta });
  }

  load(saveData: Uint8Array | null): Promise<void> {
    throw new Error("Method not implemented.");
  }

  save(): Promise<Uint8Array> {
    throw new Error("Method not implemented.");
  }

  getDescendant(namePath: string[]): Crdt<CrdtEventsRecord> {
    if (namePath.length === 0) return this;
    if (namePath[namePath.length - 1] !== "") {
      throw new Error("Unrecognized child: " + namePath[namePath.length - 1]);
    }
    namePath.length--;
    return this.child.getDescendant(namePath);
  }

  canGc(): boolean {
    return !this.isBatchPending() && this.child.canGc();
  }

  nextMessageMeta(): MessageMeta {
    return this.parent.nextMessageMeta();
  }
}
