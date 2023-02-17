import {
  Collab,
  CollabEventsRecord,
  CollabID,
  collabIDOf,
  InitToken,
  IParent,
  MetaRequest,
  Parent,
  SavedStateTree,
  UpdateMeta,
} from "@collabs/core";

/**
 * **Experimental/flaky - use with caution**
 *
 * Layer that allows you to run operations on its descendants
 * locally only, not as a replicated operation, by calling
 * [[runLocally]].
 *
 * Typically, you will call [[runLocally]] in response to
 * a message broadcast to all replicas (e.g., using
 * [[CMessenger]]), so that all replicas run the same
 * operation. This is supposed to give the same result as
 * if the message's sender had run `doPureOps` normally.
 * However, ensuring this requires some care; see
 * [[runLocally]].
 *
 * Use cases:
 * - Optimizing bulk operations. For example, in a drawing tool,
 * suppose a user draws a 1,000x1,000 filled rectangle. The easy
 * way to implement this is by setting each of the 1,000,000
 * pixels to the intended color as a replicated operation.
 * However, this will result in 1,000,000 messages being sent.
 * You can instead use a [[CMessenger]] to send a short
 * description
 * of the operation (e.g., the rectangle's coordinates and
 * fill color), then each replica uses [[runLocally]] to do
 * the actual fill operation in response to that message.
 * - Together with [[SemidirectProductStore]]. [[SemidirectProductStore]]
 * concerns modifying sent operations based on concurrent
 * operations. To make this possible, it is easiest to send
 * a high-level description of each operation using
 * [[CMessenger]], modify it using [[SemidirectProductStore]],
 * then perform the modified operation using [[runLocally]].
 *
 * ## Experimental
 * This class is experimental. Using it may break certain
 * assumptions made by the library, due to its "magic"
 * nature. See [https://github.com/composablesys/collabs/issues](https://github.com/composablesys/collabs/issues).
 */
export class RunLocallyLayer extends Collab implements IParent {
  private child!: Collab;
  private runLocallyMeta: UpdateMeta | null = null;

  setChild<C extends Collab>(childCallback: (init: InitToken) => C): C {
    const child = childCallback(new InitToken("", this));
    this.child = child;
    return child;
  }

  /**
   * Runs the pure operations doPureOps locally, as if they have the given
   * meta, which should come from the currently-processed message.
   *
   * doPureOps must satisfy:
   * - It is "pure" in the sense of pure op-based CRDTs: the messages it sends
   * do not depend on the current state. (E.g. no state-based conditionals,
   * no generating UIDs before sending.)
   * - It works with "automatic" [[CRDTMeta]]. (Exception: it may access extra
   * CRDTMeta fields if those were requested by the currently-processed message.)
   *
   * These properties hold for most (TODO: all?) operations in the standard library
   * except:
   * - All list operations ([[CList]], [[CValueList]], [[CText]]).
   * - [[CSet.add]] (TODO: fix this)
   */
  runLocally<T>(meta: UpdateMeta, doPureOps: () => T): T {
    const oldRunLocallyMeta = this.runLocallyMeta;
    this.runLocallyMeta = meta;
    try {
      return doPureOps();
    } finally {
      this.runLocallyMeta = oldRunLocallyMeta;
    }
  }

  childSend(
    child: Collab<CollabEventsRecord>,
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void {
    if (child !== this.child) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    if (this.runLocallyMeta !== null) {
      // Local echo only.
      this.child.receive(messageStack, this.runLocallyMeta);
    } else {
      // Normal send.
      // TODO: auto meta by default? Way to add more for semidirect?
      // Or make semidirect happy with auto meta? What if it's not
      // in response to a child message?
      this.send(messageStack, metaRequests);
    }
  }

  receive(messageStack: (string | Uint8Array)[], meta: UpdateMeta): void {
    this.child.receive(messageStack, meta);
  }

  idOf<C extends Collab>(descendant: C): CollabID<C> {
    return collabIDOf(descendant, this);
  }

  fromID<C extends Collab>(id: CollabID<C>, startIndex = 0): C | undefined {
    const name = id.namePath[startIndex];
    if (name !== "") {
      throw new Error("Unrecognized child: " + name);
    }
    // Terminal case.
    // Note that this cast is unsafe, but convenient.
    if (startIndex === id.namePath.length - 1) return this.child as C;
    // Recursive case.
    if ((this.child as Parent).fromID === undefined) {
      throw new Error("child is not a parent, but CollabID is its descendant");
    }
    return (this.child as Parent).fromID(id, startIndex + 1);
  }

  save() {
    return this.child.save();
  }

  load(savedStateTree: SavedStateTree, meta: UpdateMeta): void {
    this.child.load(savedStateTree, meta);
  }

  canGC(): boolean {
    return this.child.canGC();
  }
}
