import {
  AbstractRuntime,
  CObject,
  Collab,
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  IRuntime,
  MessageStacksSerializer,
  MetaRequest,
  ReplicaIDs,
  SavedStateTreeSerializer,
  UpdateMeta,
} from "@collabs/core";
import { CausalMessageBuffer } from "./causal_message_buffer";
import { CRDTMetaRequest } from "./crdt_meta";
import {
  RuntimeMetaSerializer,
  SendCRDTMeta,
} from "./crdt_meta_implementations";

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
 * when a message is to be sent.
 */
export interface SendEvent {
  /**
   * The message.
   */
  message: Uint8Array;
}

/**
 * Events record for [[CRuntime]] and [[AbstractDoc]].
 */
export interface RuntimeEventsRecord {
  /**
   * Emitted when a message is to be sent.
   *
   * Its message should be delivered to each other replica's
   * [[CRuntime.receive]] /[[AbstractDoc.receive]]
   *  method, eventually and at-least-once.
   */
  Send: SendEvent;
  /**
   * Emitted at the end of each transaction (local or remote)
   * and at the end of [[CRuntime.load]] / [[AbstractDoc.load]].
   *
   * The event's [[CollabEvent.updateMeta]] is the same as
   * for all of the transaction's events.
   */
  Transaction: CollabEvent;
  /**
   * Emitted after each synchronous set of changes. This
   * is a good time to rerender the GUI.
   *
   * Specifically, this is emitted at the end of:
   * - A local transaction.
   * - A series of remote transactions processed in the same
   * [[CRuntime.receive]] / [[AbstractDoc.receive]] call. (There can be multiple if one
   * transaction unblocks others' causal dependencies.)
   * - [[CRuntime.load]] / [[AbstractDoc.load]].
   */
  Change: object;
}

/**
 * Constructor options for [[CRuntime]] and [[AbstractDoc]].
 */
export interface RuntimeOptions {
  /**
   * If you guarantee that messages will always be delivered to
   * [[CRuntime.receive]] / [[AbstractDoc.receive]] in causal order, on all replicas (not just
   * this one), you may set this
   * to true to turn off causal ordering checks.
   *
   * For example, this may be true if all messages
   * pass through a central server that forwards them
   * in the order it receives them.
   *
   * [[CRuntime.receive]] / [[AbstractDoc.receive]] will still filter duplicate messages for you.
   */
  causalityGuaranteed?: boolean;
  /**
   * For debugging/testing/benchmarking purposes, you may specify `replicaID`, typically
   * using [[ReplicaIDs.pseudoRandom]].
   *
   * Otherwise, `replicaID` is randomly generated using
   * [[ReplicaIDs.random]].
   */
  debugReplicaID?: string;
  /**
   * How long transactions should be in the absence of a top-level [[CRuntime.transact]] / [[AbstractDoc.transact]] call:
   * - "microtask" (default): All operations in the same microtask form a transaction
   * (specifically, until `Promise.resolve().then()` executes).
   * - "error": Throw an error if there is an operation
   * outside a top-level `transact` call.
   * - "op": Each operation is its own transaction.
   * This is not recommended except for testing or benchmarking, since Collabs may expect that sequential
   * operations are delivered together.
   */
  autoTransactions?: "microtask" | "error" | "op";
}

/**
 * A runtime for a Collabs document, responsible for connecting
 * replicas of [[Collab]]s across devices and for other
 * whole-document functionality.
 *
 * Specifically, this runtime is for use with the @collabs/collabs and @collabs/crdts package,
 * which provide CRDT Collabs.
 *
 * For a usage example, see [Entry Points](../../../guide/entry_points.html#cruntime).
 *
 * See also:
 * - [[AbstractDoc]], which lets you encapsulate
 * a runtime and your "global variable" Collabs in a single object.
 * - [@collabs/container's CContainer](../../container/classes/CContainer.html), which replaces CRuntime
 * in [containers](../../../guide/containers.html).
 */
export class CRuntime
  extends AbstractRuntime<RuntimeEventsRecord>
  implements IRuntime
{
  private readonly registry: PublicCObject;
  private readonly buffer: CausalMessageBuffer;

  private readonly autoTransactions: "microtask" | "op" | "error";

  // State vars.
  private used = false;
  private inApplyUpdate = false;

  // Transaction vars.
  private inTransaction = false;
  private crdtMeta: SendCRDTMeta | null = null;
  private meta: UpdateMeta | null = null;
  private messageBatches: (Uint8Array | string)[][] = [];

  readonly isCRDTRuntime = true;

  /**
   * Constructs a [[CRuntime]].
   *
   * @param options See [[RuntimeOptions]].
   */
  constructor(options: RuntimeOptions = {}) {
    super(options.debugReplicaID ?? ReplicaIDs.random());
    const causalityGuaranteed = options?.causalityGuaranteed ?? false;
    this.autoTransactions = options.autoTransactions ?? "microtask";

    this.registry = super.setRootCollab((init) => new PublicCObject(init));

    this.buffer = new CausalMessageBuffer(
      this.replicaID,
      causalityGuaranteed,
      this.deliverFromBuffer.bind(this)
    );
  }

  /**
   * Registers a [[Collab]] as a ["global variable" Collab](../../../guide/initialization.html#global-variable-collabs)
   * in this runtime with the given name.
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
   * @param name A name for this property, unique among
   * this runtime's `registerCollab` calls.
   * We recommend using the same name as the property,
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
    this.crdtMeta!.freeze();
    this.messageBatches.push([RuntimeMetaSerializer.instance.serialize(meta)]);
    this.crdtMeta = null;
    this.meta = null;

    const message = MessageStacksSerializer.instance.serialize(
      this.messageBatches
    );
    this.messageBatches = [];

    // Send. It will be delivered to each other replica's
    // receive function, eventually at-least-once.
    this.emit("Send", { message });

    this.emit("Transaction", { meta });
    this.emit("Change", {});
  }

  /**
   * Wraps `f`'s operations in a transaction. <!-- TODO: see transactions doc -->
   *
   * This method begins a transaction (if needed), calls `f()`,
   * then ends its transaction (if begun). Operations
   * not wrapped in a `transact` call use the constructor's
   * [[RuntimeOptions.autoTransactions]] option.
   *
   * If there are nested `transact` calls (possibly due to [[RuntimeOptions.autoTransactions]]), only the outermost one matters.
   * In particular, only its `info` is used.
   */
  transact(f: () => void) {
    const alreadyInTransaction = this.inTransaction;
    if (!alreadyInTransaction) this.beginTransaction();
    try {
      f();
    } finally {
      if (!alreadyInTransaction) this.endTransaction();
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
    if (this.inApplyUpdate) {
      throw new Error(
        "CRuntime.send called during a receive/load call;" +
          " did you try to perform an operation in an event handler?"
      );
    }
    this.used = true;

    let autoEndTransaction = false;
    if (!this.inTransaction) {
      // Create a transaction according to options.autoTransactions.
      switch (this.autoTransactions) {
        case "microtask":
          this.beginTransaction();
          void Promise.resolve().then(() => this.endTransaction());
          break;
        case "op":
          this.beginTransaction();
          autoEndTransaction = true;
          break;
        case "error":
          throw new Error(
            'Operation outside of transaction when options.autoTransactions = "error"'
          );
      }
    }

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
    this.crdtMeta!.requestAutomatic(true);
    for (const metaRequest of <CRDTMetaRequest[]>metaRequests) {
      if (metaRequest.lamportTimestamp)
        this.crdtMeta!.requestLamportTimestamp();
      if (metaRequest.wallClockTime) this.crdtMeta!.requestWallClockTime();
      if (metaRequest.vectorClockKeys) {
        for (const sender of metaRequest.vectorClockKeys) {
          this.crdtMeta!.requestVectorClockEntry(sender);
        }
      }
    }

    // Local echo.
    this.rootCollab.receive(messageStack.slice(), this.meta);

    // Disable automatic meta request, to prevent accesses outside of
    // the local echo from changing the meta locally only.
    this.crdtMeta!.requestAutomatic(false);

    this.messageBatches.push(messageStack);

    if (autoEndTransaction) this.endTransaction();
  }

  /**
   * Receives a message from another replica's [[RuntimeEventsRecord.Send]] event.
   * The message's sender must be a [[CRuntime]] that is a
   * replica of this one.
   *
   * The local Collabs process the message, change the
   * local state accordingly, and emit events describing the
   * local changes.
   *
   * Messages from other replicas should be received eventually and at-least-once. Arbitrary delays, duplicates,
   * reordering, and delivery of messages from this replica
   * are acceptable. Two replicas will be in the same
   * state once they have the same set of received (or sent) messages.
   */
  receive(message: Uint8Array): void {
    if (this.inTransaction) {
      throw new Error("Cannot call receive() during a transaction");
    }
    if (this.inApplyUpdate) {
      throw new Error(
        "Cannot call receive() during another receive/load call;" +
          " did you try to deliver a message in a Collab's event handler?"
      );
    }

    this.inApplyUpdate = true;
    try {
      const messageStacks =
        MessageStacksSerializer.instance.deserialize(message);
      const meta = RuntimeMetaSerializer.instance.deserialize(
        (<Uint8Array[]>messageStacks.pop())[0]
      );
      if (this.buffer.process(messageStacks, meta)) {
        this.buffer.check();
        this.emit("Change", {});
      }
    } finally {
      this.inApplyUpdate = false;
    }
  }

  /**
   * Called by this.buffer when a (remote) transaction is ready for delivery.
   * This is always within our call to this.buffer.check() in [[receive]],
   * so errors will propagate to there.
   */
  private deliverFromBuffer(
    messageStacks: (Uint8Array | string)[][],
    meta: UpdateMeta
  ) {
    for (const messageStack of messageStacks) {
      this.rootCollab.receive(messageStack, meta);
    }
    this.emit("Transaction", { meta });
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
    if (this.inApplyUpdate) {
      throw new Error("Cannot call save() during a load/receive call");
    }

    // We know that PublicCObject returns a non-null save with empty self.
    const savedStateTree = this.rootCollab.save()!;
    savedStateTree.self = this.buffer.save();
    return SavedStateTreeSerializer.instance.serialize(savedStateTree);
  }

  /**
   * Loads saved state. The saved state must be from
   * a call to [[load]] on a CRuntime that is a replica
   * of this one.
   *
   * Calling load is equivalent to calling [[receive]]
   * on every message that influenced the saved state,
   * but it is typically much more efficient.
   *
   * Note that loading will **not** trigger events on
   * Collabs, even if their state changes.
   * It will trigger "Transaction" and "Change" events on this CRuntime.
   *
   * TODO: events: one Transaction after load, then one per buffered
   * tr that gets delivered. One "Change" at end. Also update in
   * "Transaction" docs.
   *
   * @param savedState Saved state from another replica's [[save]] call.
   */
  load(savedState: Uint8Array): void {
    if (this.inTransaction) {
      throw new Error("Cannot call load() during a transaction");
    }
    if (this.inApplyUpdate) {
      throw new Error(
        "Cannot call load() during another receive/load call;" +
          " did you try to load in a Collab's event handler?"
      );
    }
    this.used = true;

    this.inApplyUpdate = true;
    try {
      const savedStateTree =
        SavedStateTreeSerializer.instance.deserialize(savedState)!;
      const loadCRDTMeta = this.buffer.load(savedStateTree.self!);
      savedStateTree.self = undefined;
      const meta: UpdateMeta = {
        senderID: loadCRDTMeta.senderID,
        updateType: "savedState",
        isLocalOp: false,
        runtimeExtra: loadCRDTMeta,
      };
      this.rootCollab.load(savedStateTree, meta);

      this.emit("Transaction", { meta });

      this.buffer.check();

      this.emit("Change", {});
    } finally {
      this.inApplyUpdate = false;
    }
  }
}
