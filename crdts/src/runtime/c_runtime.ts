import {
  AbstractRuntime,
  CObject,
  Collab,
  CollabEventsRecord,
  InitToken,
  IRuntime,
  MessageMeta,
  MetaRequest,
  nonNull,
  ReplicaIDs,
  SavedStateMeta,
  SavedStateTreeSerializer,
} from "@collabs/core";
import { CausalMessageBuffer } from "./causal_message_buffer";
import { CRDTMessageMeta, CRDTMetaRequest } from "./crdt_meta";
import { SendCRDTMeta } from "./crdt_meta_implementations";
import { MessageSerializer } from "./message_serializer";

class PublicCObject extends CObject {
  registerCollab<C extends Collab>(
    name: string,
    childCallback: (init: InitToken) => C
  ): C {
    return super.registerCollab(name, childCallback);
  }
}

/**
 * Event emitted by [[CRuntime]] or [[AbstractDoc]]
 * when a message is to be sent, due to a local transaction.
 */
export interface SendEvent {
  /**
   * The message.
   */
  message: Uint8Array;
  /**
   * The message's sender: our [[AbstractDoc.replicaID]]/[[CRuntime.replicaID]].
   */
  senderID: string;
  /**
   * A 1-indexed counter for our local transactions.
   *
   * The pair `(senderID, senderCounter)` uniquely
   * identifies the message's transaction. It is sometimes called a *causal dot*.
   */
  senderCounter: number;
}

/**
 * [[UpdateEvent]] sub-type emitted for updates of type "message".
 */
export interface MessageEvent {
  // For fields shared with SavedStateEvent, we use the same typedoc
  // on both, so that they show up nicely in IDE tooltips when you have
  // an Update event of type MessageEvent | SavedStateEvent.

  /**
   * The serialized update.
   *
   * Specifically, this is:
   * - For a local message, its [[SendEvent.message]].
   * - For a remote message, the `message` passed to `receive`.
   * - For a loaded state, the `savedState` passed to `load`.
   */
  update: Uint8Array;
  /**
   * The caller who triggered this update.
   *
   * Specifically, this is:
   * - For a local message, `undefined`.
   * - For a remote message, the `caller` passed to `receive`.
   * - For a loaded state, the `caller` passed to `load`.
   * - For a remote message delivered as part of a loaded state
   * (due to unmet causal dependencies), the `caller` passed to `load`.
   */
  caller: unknown | undefined;
  /**
   * The update's type.
   */
  updateType: "message";
  /**
   * The replicaID that sent the message.
   */
  senderID: string;
  /**
   * A 1-indexed counter for senderID's transactions.
   *
   * The pair `(senderID, senderCounter)` uniquely
   * identifies the message's transaction. It is sometimes called a *causal dot*.
   */
  senderCounter: number;
  /**
   * Whether the update is from a local transaction, i.e., it results
   * from calling Collab methods on this replica.
   */
  isLocalOp: boolean;
}

/**
 * [[UpdateEvent]] sub-type emitted for updates of type "savedState".
 */
export interface SavedStateEvent {
  /**
   * The serialized update.
   *
   * Specifically, this is:
   * - For a local message, its [[SendEvent.message]].
   * - For a remote message, the `message` passed to `receive`.
   * - For a loaded state, the `savedState` passed to `load`.
   */
  update: Uint8Array;
  /**
   * The caller who triggered this update.
   *
   * Specifically, this is:
   * - For a local message, `undefined`.
   * - For a remote message, the `caller` passed to `receive`.
   * - For a loaded state, the `caller` passed to `load`.
   * - For a remote message delivered as part of a loaded state
   * (due to unmet causal dependencies), the `caller` passed to `load`.
   */
  caller: unknown | undefined;
  /**
   * The update's type.
   */
  updateType: "savedState";
  /**
   * The vector clock for this saved state, mapping each replicaID
   * to the number of included transactions from that replicaID.
   *
   * This saved state includes precisely the transactions
   * with ID `(senderID, senderCounter)` where
   * `senderCounter <= (vectorClock.get(senderID) ?? 0)`.
   */
  vectorClock: Map<string, number>;
  /**
   * For each replicaID in [[vectorClock]]'s keys, the number of
   * transactions from that sender that were redundant
   * (i.e., we had already applied them), possibly 0.
   *
   * The effect of this saved state on our state was to
   * apply precisely the transactions with ID `(senderID, senderCounter)`
   * where:
   * - `vectorClock.has(senderID)`
   * - `redundant.get(senderID) < senderCounter <= vectorClock.get(senderID)`.
   */
  redundant: Map<string, number>;
  /**
   * Whether the update is from a local transaction, i.e., it results
   * from calling Collab methods on this replica.
   */
  isLocalOp: false;
}

/**
 * Event emitted by [[CRuntime]]/[[AbstractDoc]]
 * after applying an update.
 */
export type UpdateEvent = MessageEvent | SavedStateEvent;

/**
 * Event emitted by [[CRuntime]]/[[AbstractDoc]]
 * after applying a synchronous set of updates.
 */
export interface ChangeEvent {
  /**
   * Whether the change is from a local transaction, i.e., it results
   * from calling Collab methods on this replica.
   */
  isLocalOp: boolean;
}

/**
 * Events record for a
 * [document](https://collabs.readthedocs.io/en/latest/guide/documents.html)
 * ([[CRuntime]]/[[AbstractDoc]]).
 */
export interface DocEventsRecord {
  /**
   * Emitted when a message is to be sent.
   */
  Send: SendEvent;
  /**
   * Emitted after applying an update.
   *
   * The update may be a local message, remote message,
   * or saved state. Note that it may contain multiple
   * [transactions](https://collabs.readthedocs.io/en/latest/advanced/updates.html#terminology).
   */
  Update: UpdateEvent;
  /**
   * Emitted after applying a synchronous set of updates. This
   * is a good time to rerender the GUI.
   * 
   * When delivering remote updates, you can reduce the number of Change
   * events using [[AbstractDoc.batchRemoteUpdates]]/[[CRuntime.batchRemoteUpdates]].
   */
  Change: ChangeEvent;
}

/**
 * Constructor options for a
 * [document](https://collabs.readthedocs.io/en/latest/guide/documents.html)
 * ([[CRuntime]]/[[AbstractDoc]]).
 */
export interface DocOptions {
  /**
   * If you guarantee that messages will always be delivered to
   * [[CRuntime.receive]]/[[AbstractDoc.receive]] in causal order, on all replicas (not just
   * this one), you may set this
   * to true to turn off causal ordering checks.
   *
   * For example, this may be true if all messages
   * pass through a central server that forwards them
   * in the order it receives them.
   *
   * [[CRuntime.receive]]/[[AbstractDoc.receive]] will still filter duplicate messages for you.
   */
  causalityGuaranteed?: boolean;
  /**
   * How long transactions should be in the absence of a top-level [[CRuntime.transact]]/[[AbstractDoc.transact]] call:
   * - "microtask" (default): All operations in the same microtask form a transaction
   * (specifically, until `Promise.resolve().then()` executes).
   * - "error": Throw an error if there is an operation
   * outside a top-level `transact` call.
   * - "debugOp": Each operation is its own transaction.
   * This is not recommended except for testing or benchmarking, since
   * individual Collabs may expect that sequential
   * operations are delivered together.
   */
  autoTransactions?: "microtask" | "error" | "debugOp";
  /**
   * For debugging/testing/benchmarking purposes, you may specify `replicaID`, typically
   * using [[ReplicaIDs.pseudoRandom]].
   *
   * Otherwise, `replicaID` is randomly generated using
   * [[ReplicaIDs.random]].
   */
  debugReplicaID?: string;
  /**
   * If true, [[AbstractDoc.load]]/[[CRuntime.load]] always pass `savedState`
   * to the Collabs and emit an Update event, even if `savedState`
   * appears to be redundant.
   *
   * Set this to true if loading is intentionally not idempotent (loading
   * an already-applied transaction has a nontrivial effect), or if you
   * want to test whether loading is idempotent.
   *
   * A saved state "appears to be redundant" if all of its vector clock
   * entries are <= our own. In that case, [[SavedStateEvent]]'s `vectorClock`
   * and `redundant` fields are deep-equal.
   */
  allowRedundantLoads?: boolean;
}

/**
 * A runtime for a Collabs document, responsible for managing the document's
 * [[Collab]]s.
 *
 * To get started with CRuntime, see
 * [Documents](https://collabs.readthedocs.io/en/latest/guide/documents.html).
 *
 * CRuntime is network- and storage-agnostic. By itself, it does not connect
 * to remote collaborators or persistent storage.
 * To easily set up networking and storage, configure
 * [Providers](https://collabs.readthedocs.io/en/latest/guide/providers.html).
 * Or, manually manage updates using the methods in this class; see
 * [Updates and Sync](https://collabs.readthedocs.io/en/latest/advanced/updates.html).
 *
 * See also: [[AbstractDoc]], which lets you encapsulate
 * a CRuntime and its registered Collabs in a single object.
 */
export class CRuntime
  extends AbstractRuntime<DocEventsRecord>
  implements IRuntime
{
  private readonly registry: PublicCObject;
  private readonly buffer: CausalMessageBuffer;

  private readonly autoTransactions: "microtask" | "debugOp" | "error";
  private readonly allowRedundantLoads: boolean;

  // State vars.
  private used = false;
  private inReceiveOrLoad = false;

  // Transaction vars.
  private inTransaction = false;
  private crdtMeta: SendCRDTMeta | null = null;
  private meta: MessageMeta | null = null;
  private messageBatches: (Uint8Array | string)[][] = [];

  // batchDeliveries() vars.
  private inBatchRemote = false;
  private batchChanged = false;

  readonly isCRDTRuntime = true;

  /**
   * Constructs a [[CRuntime]].
   *
   * @param options See [[DocOptions]].
   */
  constructor(options: DocOptions = {}) {
    super(options.debugReplicaID ?? ReplicaIDs.random());
    const causalityGuaranteed = options.causalityGuaranteed ?? false;
    this.autoTransactions = options.autoTransactions ?? "microtask";
    this.allowRedundantLoads = options.allowRedundantLoads ?? false;

    this.registry = super.setRootCollab((init) => new PublicCObject(init));

    this.buffer = new CausalMessageBuffer(
      this.replicaID,
      causalityGuaranteed,
      this.deliverFromBuffer.bind(this)
    );
  }

  /**
   * Registers a [[Collab]] as part of this document.
   * See [Documents - Using CRuntime](https://collabs.readthedocs.io/en/latest/guide/documents.html#using-cruntime).
   *
   * Typically, you will call this method right after creating this CRuntime, with the style:
   * ```ts
   * const foo = runtime.registerCollab("foo", (init) => new FooClass(init, constructor args...));
   * ```
   * where `const foo: FooClass;` is a top-level variable.
   *
   * Registrations must be identical across all replicas, i.e., all CRuntime instances that share
   * messages and saved states.
   *
   * @param name A name for the registered Collab, unique among
   * this document's `registerCollab` calls.
   * We recommend using the same name as the variable where you store the Collab,
   * but you can also use short strings to reduce
   * network usage ("", "0", "1", ...).
   * @param collabCallback A callback that uses the
   * given [[InitToken]] to construct the registered [[Collab]].
   * @return The registered Collab.
   */
  registerCollab<C extends Collab>(
    name: string,
    collabCallback: (init: InitToken) => C
  ): C {
    if (this.used) {
      throw new Error("Already used (sent/received message or loaded state)");
    }
    return this.registry.registerCollab(name, collabCallback);
  }

  private beginTransaction() {
    // For now, we allow local ops when inBatchDeliveries = true,
    // in case you react to remote updates with your own.
    // (However, local ops are not allowed inside an actual receive/load call).

    this.inTransaction = true;
    // Wait to set meta until we actually send a message, if we do.
    // messageBatches was already cleared by the previous endTransaction.
  }

  private endTransaction() {
    this.inTransaction = false;

    if (this.meta === null) {
      // Trivial transaction, skip.
      return;
    }

    const meta = this.meta;
    const crdtMeta = nonNull(this.crdtMeta);
    crdtMeta.freeze();

    const message = MessageSerializer.serialize([this.messageBatches, meta]);

    this.messageBatches = [];
    this.meta = null;
    this.crdtMeta = null;

    // Send. This message, or a saved state containing its transaction, should
    // be delivered to each other replica, eventually at-least-once.
    this.emit("Send", {
      message,
      senderID: this.replicaID,
      senderCounter: crdtMeta.senderCounter,
    });

    this.emit("Update", {
      update: message,
      caller: undefined,
      updateType: "message",
      senderID: this.replicaID,
      senderCounter: crdtMeta.senderCounter,
      isLocalOp: true,
    });
    this.emit("Change", { isLocalOp: true });
  }

  /**
   * Wraps `f`'s operations in a
   * [transaction](https://collabs.readthedocs.io/en/latest/advanced/updates.html#terminology).
   *
   * `f()` is called immediately, then if it performed any local Collab operations,
   * their transaction is ended (emitting "Send", "Update", and "Change" events).
   *
   * Notes:
   * - Operations not wrapped in a `transact` call use the constructor's
   * [[DocOptions.autoTransactions]] option.
   * - If there are nested `transact` calls (possibly due to
   * DocOptions.autoTransactions), only the outermost one matters.
   *
   * See also: [[batchRemoteUpdates]], a similar method for remote updates.
   */
  transact(f: () => void) {
    if (this.inTransaction) f();
    else {
      this.beginTransaction();
      try {
        f();
      } finally {
        this.endTransaction();
      }
    }
  }

  childSend(
    child: Collab<CollabEventsRecord>,
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void {
    if (child !== this.rootCollab) {
      throw new Error(`childSend called by non-root: ${child}`);
    }
    if (this.inReceiveOrLoad) {
      throw new Error(
        "CRuntime.send called during a receive/load call;" +
          " did you try to perform an operation in an event handler?"
      );
    }
    this.used = true;

    let autoEndTransaction = false;
    if (!this.inTransaction) {
      // Create a transaction according to options.autoTransactions.
      // Note that calls to transact() inside this transaction do nothing,
      // so we don't have to worry about ending them early or double-ending.
      switch (this.autoTransactions) {
        case "microtask":
          this.beginTransaction();
          void Promise.resolve().then(() => this.endTransaction());
          break;
        case "debugOp":
          this.beginTransaction();
          autoEndTransaction = true;
          break;
        case "error":
          throw new Error(
            'Operation outside of transaction when options.autoTransactions = "error"'
          );
      }
    }

    try {
      if (this.meta === null) {
        // First message in a transaction; tick our current VC etc.
        // and use the new values to create the transaction's meta.
        // OPT: avoid this copy (not required by SendCRDTMeta,
        // but required due to tick()).
        const causallyMaximalVCKeys = new Set(this.buffer.maximalVCKeys);
        this.buffer.tick();

        this.crdtMeta = new SendCRDTMeta(
          this.replicaID,
          this.buffer.vc,
          causallyMaximalVCKeys,
          Date.now(),
          this.buffer.lamportTimestamp
        );
        this.meta = {
          senderID: this.replicaID,
          updateType: "message",
          isLocalOp: true,
          runtimeExtra: this.crdtMeta,
        };
      }

      // Process meta requests, including automatic mode by default.
      const crdtMeta = nonNull(this.crdtMeta);
      crdtMeta.requestAutomatic(true);
      for (const metaRequest of <CRDTMetaRequest[]>metaRequests) {
        if (metaRequest.lamportTimestamp) crdtMeta.requestLamportTimestamp();
        if (metaRequest.wallClockTime) crdtMeta.requestWallClockTime();
        if (metaRequest.vectorClockKeys) {
          for (const sender of metaRequest.vectorClockKeys) {
            crdtMeta.requestVectorClockEntry(sender);
          }
        }
      }

      // Local echo.
      this.rootCollab.receive(messageStack.slice(), this.meta);

      // Disable automatic meta request, to prevent accesses outside of
      // the local echo from changing the meta locally only.
      crdtMeta.requestAutomatic(false);

      this.messageBatches.push(messageStack);
    } finally {
      if (autoEndTransaction) this.endTransaction();
    }
  }

  /**
   * Delivers remotes updates (receive/load calls) in a *batch*,
   * so that only a single "Change" event is emitted for the entire batch.
   *
   * `f()` is called immediately, then if it delivered any remote updates,
   * a single "Change" event is emitted.
   * That way, "Change" listeners know that they only need
   * to refresh the display once at the end, instead of once per receive/load
   * call.
   *
   * Notes:
   * - Each delivered update still emits its own "Update" event immediately,
   * as usual.
   * - If there are nested batchRemoteUpdates calls, only the outermost
   * one matters.
   *
   * See also: [[transact]], a similar method for local operations.
   *
   * @param f A callback that delivers the remote updates by calling
   * [[receive]]/[[load]].
   */
  batchRemoteUpdates(f: () => void): void {
    if (this.inTransaction) {
      throw new Error("Cannot apply remote updates during a local transaction");
      // That would violate the constraint that all ops during a transaction
      // have the same metadata, including the same vector clock.
    }

    if (this.inBatchRemote) f();
    else {
      this.inBatchRemote = true;
      this.batchChanged = false;
      try {
        f();
      } finally {
        this.inBatchRemote = false;
        if (this.batchChanged) {
          this.emit("Change", { isLocalOp: false });
        }
      }
    }
  }

  /**
   * Receives a message from another replica's [[DocEventsRecord.Send]] event.
   * The message's sender must be a CRuntime that is a
   * replica of this one (i.e., it has the same
   * ["schema"](https://collabs.readthedocs.io/en/latest/guide/documents.html#using-cruntime)).
   *
   * The local Collabs process the message, change the
   * local state accordingly, and emit events describing the
   * local changes.
   *
   * Messages from other replicas should be received eventually and at-least-once. Arbitrary delays, duplicates,
   * reordering, and delivery of (redundant) messages from this replica
   * are acceptable. Two replicas will be in the same
   * state once they have the same set of received (or sent) messages.
   *
   * @param caller Optionally, a value to use as the "Update" event's
   * [[MessageEvent.caller]] field.
   * A caller can use that field to distinguish its own updates from updates
   * delivered by other sources.
   */
  receive(message: Uint8Array, caller?: unknown): void {
    if (this.inTransaction) {
      throw new Error("Cannot call receive() during a transaction");
    }
    if (this.inReceiveOrLoad) {
      throw new Error(
        "Cannot call receive() during another receive/load call;" +
          " did you try to deliver a message in a Collab's event handler?"
      );
    }
    this.used = true;

    this.batchRemoteUpdates(() => {
      this.inReceiveOrLoad = true;
      try {
        const [messageStacks, meta] = MessageSerializer.deserialize(message);
        if (this.buffer.process(message, messageStacks, meta, caller)) {
          this.batchChanged = true;
          this.buffer.check();
        }
      } finally {
        this.inReceiveOrLoad = false;
      }
    });
  }

  /**
   * Called by this.buffer when a (remote) transaction is ready for delivery.
   * This is always within our call to this.buffer.check() in [[receive]]
   * or [[load]], so that method handles thrown errors and batches deliveries.
   */
  private deliverFromBuffer(
    message: Uint8Array,
    messageStacks: (Uint8Array | string)[][],
    meta: MessageMeta,
    caller: unknown | undefined
  ) {
    for (const messageStack of messageStacks) {
      this.rootCollab.receive(messageStack, meta);
    }
    const crdtMeta = meta.runtimeExtra as CRDTMessageMeta;
    this.emit("Update", {
      update: message,
      caller,
      updateType: "message",
      senderID: crdtMeta.senderID,
      senderCounter: crdtMeta.senderCounter,
      isLocalOp: false,
    });
  }

  /**
   * Returns saved state describing the current state of this runtime,
   * including its Collabs.
   *
   * The saved state may later be passed to [[load]]
   * on a replica of this CRuntime, possibly in a different
   * collaboration session. That is equivalent to delivering all messages
   * that this document has already sent or received.
   */
  save(): Uint8Array {
    if (this.inTransaction) {
      throw new Error("Cannot call save() during a transaction");
    }
    if (this.inReceiveOrLoad) {
      throw new Error("Cannot call save() during a load/receive call");
    }

    const savedStateTree = this.rootCollab.save();
    // We know that PublicCObject's save has empty self, so it's okay to overwrite.
    savedStateTree.self = this.buffer.save();
    return SavedStateTreeSerializer.instance.serialize(savedStateTree);
  }

  /**
   * Loads saved state. The saved state must be from
   * a call to [[save]] on a CRuntime that is a replica
   * of this one (i.e., it has the same
   * ["schema"](https://collabs.readthedocs.io/en/latest/guide/documents.html#using-cruntime)).
   *
   * The local Collabs merge in the saved state, change the
   * local state accordingly, and emit events describing the
   * local changes.
   *
   * Calling load is roughly equivalent to calling [[receive]]
   * on every message that influenced the saved state
   * (skipping already-received messages),
   * but it is typically much more efficient.
   *
   * @param savedState Saved state from another replica's [[save]] call.
   * @param caller Optionally, a value to use as the "Update" event's
   * [[SavedStateEvent.caller]] field.
   * A caller can use that field to distinguish its own updates from updates
   * delivered by other sources.
   */
  load(savedState: Uint8Array, caller?: unknown): void {
    if (this.inTransaction) {
      throw new Error("Cannot call load() during a transaction");
    }
    if (this.inReceiveOrLoad) {
      throw new Error(
        "Cannot call load() during another receive/load call;" +
          " did you try to load in a Collab's event handler?"
      );
    }
    this.used = true;

    this.batchRemoteUpdates(() => {
      this.inReceiveOrLoad = true;
      try {
        const savedStateTree =
          SavedStateTreeSerializer.instance.deserialize(savedState);
        const loadCRDTMeta = this.buffer.load(
          nonNull(savedStateTree.self),
          caller
        );
        savedStateTree.self = undefined;
        const meta: SavedStateMeta = {
          updateType: "savedState",
          runtimeExtra: loadCRDTMeta,
          isLocalOp: false,
        };

        let isRedundant = true;
        const vectorClock = new Map<string, number>();
        const redundant = new Map<string, number>();
        for (const [replicaID, remote] of loadCRDTMeta.remoteVectorClock
          .vcEntries) {
          vectorClock.set(replicaID, remote);
          const local = loadCRDTMeta.localVectorClock.get(replicaID);
          // If local > remote (fully redundant), set to remote, so that
          // redundant.get(replicaID) == vectorClock.get(replicaID).
          redundant.set(replicaID, Math.min(local, remote));
          if (local < remote) isRedundant = false;
        }

        if (isRedundant && !this.allowRedundantLoads) {
          // The saved state is redundant. Don't load or emit events.

          // We did still call buffer.load. This doesn't affect our VC because
          // the remote VC was redundant, but it may still have added
          // new messages to the buffer. Check if any of these are ready in
          // our state, and if so, emit a Change event.
          if (this.buffer.check()) this.batchChanged = true;
        } else {
          this.rootCollab.load(savedStateTree, meta);
          this.batchChanged = true;

          this.emit("Update", {
            update: savedState,
            caller,
            updateType: "savedState",
            vectorClock,
            redundant,
            isLocalOp: false,
          });

          this.buffer.check();
        }
      } finally {
        this.inReceiveOrLoad = false;
      }
    });
  }

  /**
   *
   * The vector clock for our current state, mapping each senderID
   * to the number of applied transactions from that senderID.
   *
   * Our current state includes precisely the transactions
   * with ID `(senderID, senderCounter)` where
   * `senderCounter <= (vectorClock.get(senderID) ?? 0)`.
   */
  vectorClock(): Map<string, number> {
    const vc = new Map(this.buffer.vc);
    if (vc.get(this.replicaID) === 0) vc.delete(this.replicaID);
    return vc;
  }
}
