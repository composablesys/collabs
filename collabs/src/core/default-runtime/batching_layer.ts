import { Crdt, CrdtEventsRecord, InitToken, Pre } from "../crdt";
import { ParentCrdt } from "../crdt_parent";
import { MessageMeta } from "../message_meta";
import { BatchingStrategy } from "./batching_strategy";

/**
 * Info about a pending batch.
 *
 * The sent messagePath's are interpreted as paths in
 * a tree (in reverse order), with the elements labelling
 * edges. We apply prefix compression to the set of paths
 * in this tree.
 *
 * Edge labels are compared using ===, so you will only get
 * reasonable equality for (1) strings and (2) Uint8Arrays
 * that are stored by the sender and reused (e.g. collection
 * elements stored in serialized form).
 *
 * Vertices are labelled with numbers sequentially.
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
   * TODO: can these be stored more compactly?
   */
  messages: number[];
}

// TODO: receivers' MessageMeta will end up being different
// from sender's if a non-descendant message is sent during
// a batch, or if messages are received from other users
// during a batch.
// So this is pretty much only useful if:
// - it's the sole descendant of the Runtime at this level, and
// none of its ancestors send messages of their own
// - the Runtime (or some ancestor that completely controls
// parent.nextMessageMeta()) refuses to deliver received
// messages while isBatchPending(), instead queuing them
// until the next time this sends a message.
//
// I.e., the setting of DefaultRuntime or something very similar.

/**
 * Crdt that batches message sent by its descendants.
 */
export class BatchingLayer extends Crdt implements ParentCrdt {
  private child!: Crdt;

  private pendingBatch: BatchInfo | null = null;

  constructor(
    initToken: InitToken,
    private batchingStrategy: BatchingStrategy
  ) {
    super(initToken);
  }

  setChild<C extends Crdt>(preChild: Pre<C>): C {
    const child = preChild(new InitToken("", this));
    this.child = child;
    return child;
  }

  isBatchPending(): boolean {
    return this.pendingBatch !== null;
  }

  childSend(
    child: Crdt<CrdtEventsRecord>,
    messagePath: (Uint8Array | string)[]
  ): void {
    if (child !== this.child) {
      throw new Error("childSend called by non-child: " + child);
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
  }

  commitBatch() {
    // TODO: serialize and send
  }

  protected receiveInternal(
    messagePath: (Uint8Array | string)[],
    meta: MessageMeta
  ): void {
    throw new Error("Method not implemented.");
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
