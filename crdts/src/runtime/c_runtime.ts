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
import { CRDTMetaProvider, CRDTMetaRequest } from "./crdt_meta";
import {
  CRDTMetaSerializer,
  LoadCRDTMeta,
  SendCRDTMeta,
} from "./crdt_meta_implementations";

class PublicCObject extends CObject {
  addChild<C extends Collab>(
    name: string,
    childCallback: (init: InitToken) => C
  ): C {
    return super.addChild(name, childCallback);
  }
}

export interface SendEvent {
  message: Uint8Array;
}

export interface RuntimeEventsRecord {
  /**
   * Emitted when a message is to be sent.
   *
   * This must be delivered to each other replica's
   * [[CRuntime.receive]] method, eventually at-least-once.
   */
  Send: SendEvent;
  /**
   * Emitted at the end of each transaction (local or remote).
   *
   * The event's [[CollabEvent.updateMeta]] is the same as for
   * all messages in the transaction.
   */
  Transaction: CollabEvent;
  /**
   * Emitted after each synchronous set of changes. This
   * is a good time to rerender the GUI.
   *
   * Specifically, this is emitted at the end of:
   * - A local transaction.
   * - A series of remote transactions processed in the same
   * [[CRuntime.receive]] call. (There can be multiple if one
   * transaction unblocks others' causal dependencies.)
   * - [[CRuntime.load]].
   */
  Change: object;
  /**
   * Emitted at the end of [[CRuntime.load]].
   */
  Load: object;
}

export interface CRuntimeOptions {
  causalityGuaranteed?: boolean;
  debugReplicaID?: string;
  autoTransactions?: "microtask" | "op" | "error";
}

export class CRuntime
  extends AbstractRuntime<RuntimeEventsRecord>
  implements IRuntime, CRDTMetaProvider
{
  private readonly registry: PublicCObject;
  private readonly buffer: CausalMessageBuffer;

  private readonly autoTransactions: "microtask" | "op" | "error";

  // State vars.
  private _isLoaded = false;
  private inApplyUpdate = false;

  // Transaction vars.
  private inTransaction = false;
  private trInfo: string | undefined = undefined;
  private crdtMeta: SendCRDTMeta | null = null;
  private meta: UpdateMeta | null = null;
  private messageBatches: (Uint8Array | string)[][] = [];

  readonly providesCRDTMeta = true;

  constructor(options: CRuntimeOptions = {}) {
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
   * Constructs `preCollab` and registers it as a
   * top-level (global variable) `Collab` with the
   * given name.
   *
   * @param  name The `Collab`'s name, which must be
   * unique among all registered `Collabs`. E.g., its name
   * as a variable in your program.
   * @param  preCollab The `Collab` to construct, typically
   * created using a statement of the form
   * `Pre(class_name)<generic types>(constructor args)`
   * @return The registered `Collab`. You should assign
   * this to a variable for later use.
   */
  registerCollab<C extends Collab>(
    name: string,
    collabCallback: (init: InitToken) => C
  ): C {
    if (this._isLoaded) {
      throw new Error("Already loaded");
    }
    return this.registry.addChild(name, collabCallback);
  }

  private beginTransaction(info: string | undefined) {
    this.inTransaction = true;
    this.trInfo = info;
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
    this.messageBatches.push([CRDTMetaSerializer.instance.serialize(meta)]);
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
   * If this is not the outermost transaction, it is ignored (including info).
   * In particular, that can happen if we are inside an auto microtask
   * transaction, due to an earlier out-of-transaction op.
   *
   * @param f
   * @param info An optional info string to attach to the transaction.
   * It will appear on [[CollabEvent]]s as [[UpdateMeta.info]].
   * E.g. a "commit message".
   */
  transact(f: () => void, info?: string) {
    const alreadyInTransaction = this.inTransaction;
    if (!alreadyInTransaction) this.beginTransaction(info);
    try {
      f();
    } finally {
      if (!alreadyInTransaction) this.endTransaction();
    }
  }

  /**
   * Internal use only.
   */
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

    let autoEndTransaction = false;
    if (!this.inTransaction) {
      // Create a transaction according to options.autoTransactions.
      switch (this.autoTransactions) {
        case "microtask":
          this.beginTransaction(undefined);
          void Promise.resolve().then(() => this.endTransaction());
          break;
        case "op":
          this.beginTransaction(undefined);
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
      const causallyMaximalVCKeys = new Set(this.buffer.maximalVcKeys);
      this.buffer.tick();

      this.crdtMeta = new SendCRDTMeta(
        this.replicaID,
        this.buffer.vc,
        causallyMaximalVCKeys,
        Date.now(),
        this.buffer.lamportTimestamp + 1
      );
      this.meta = {
        senderID: this.replicaID,
        updateType: "message",
        isLocalOp: true,
        info: this.trInfo,
        runtimeExtra: this.crdtMeta,
      };
    }

    // Process meta requests.
    for (const metaRequest of <CRDTMetaRequest[]>metaRequests) {
      if (metaRequest.automatic) this.crdtMeta!.requestAutomatic(true);
      if (metaRequest.lamportTimestamp)
        this.crdtMeta!.requestLamportTimestamp();
      if (metaRequest.wallClockTime) this.crdtMeta!.requestWallClockTime();
      if (metaRequest.vectorClockEntries) {
        for (const sender of metaRequest.vectorClockEntries) {
          this.crdtMeta!.requestVectorClockEntry(sender);
        }
      }
    }

    // Local echo.
    this.rootCollab.receive(messageStack.slice(), this.meta);

    // Disable automatic meta request.
    this.crdtMeta!.requestAutomatic(false);

    this.messageBatches.push(messageStack);

    if (autoEndTransaction) this.endTransaction();
  }

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
      const meta = CRDTMetaSerializer.instance.deserialize(
        (<Uint8Array[]>messageStacks.pop())[0]
      );
      this.buffer.add(messageStacks, meta);
      if (this.buffer.check()) {
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

  load(savedState: Uint8Array): void {
    if (this._isLoaded) {
      throw new Error("Already loaded");
    }
    if (this.inTransaction) {
      throw new Error("Cannot call load() during a transaction");
    }
    if (this.inApplyUpdate) {
      throw new Error(
        "Cannot call load() during another receive/load call;" +
          " did you try to load in a Collab's event handler?"
      );
    }

    this.inApplyUpdate = true;
    try {
      const savedStateTree =
        SavedStateTreeSerializer.instance.deserialize(savedState)!;
      this.buffer.load(savedStateTree.self!);
      savedStateTree.self = undefined;
      const meta: UpdateMeta = {
        senderID: this.replicaID,
        updateType: "savedState",
        isLocalOp: false,
        info: undefined,
        runtimeExtra: new LoadCRDTMeta(this.replicaID),
      };
      this.rootCollab.load(savedStateTree, meta);

      this._isLoaded = true;
    } finally {
      this.inApplyUpdate = false;
    }
  }

  get isLoaded(): boolean {
    return this._isLoaded;
  }
}
