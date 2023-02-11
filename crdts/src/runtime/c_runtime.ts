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
  randomReplicaID,
  SavedStateTreeSerializer,
} from "@collabs/core";

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

export interface CRuntimeEventsRecord {
  /**
   * Emitted each time the app's state is changed and
   * is in a reasonable user-facing state
   * (so not in the middle of a transaction).
   *
   * Usually, you will not listen on this event directly, insteading listening on
   * [[CRDTApp]] or `CRDTContainer`'s "Change".
   */
  Change: CollabEvent;
  /**
   * Emitted when a message is to be sent.
   *
   * This must be delivered to each other replica's
   * [[CRuntime.receive]] method, eventually at-least-once.
   *
   * Usually, you will not listen on this event directly, insteading listening on
   * [[CRDTApp]]'s "Send" event or using a `CRDTContainer`
   * (which listens on this event for you).
   */
  Send: SendEvent;
}

// TODO: auto-created transactions for single ops? How does Yjs do it?
// By doing it for outermost op, should avoid weirdness where you send a
// message for part of a CObject composition operation.

// TODO: don't use directly, use CRDTApp or CRDTContainer instead?
// Or, use directly for simple apps, but otherwise wrap in subclass of CDoc
// (which we should define like CRDTApp but with protected registerCollab?)
export class CRuntime
  extends AbstractRuntime<CRuntimeEventsRecord>
  implements IRuntime
{
  private readonly registry: PublicCObject;
  private readonly causalityGuaranteed: boolean;

  // State vars.
  private _isLoaded = false;
  private inApplyUpdate = false;
  private inTransaction = false;
  private messageBatches: (Uint8Array | string)[][] = [];

  constructor(
    options: {
      causalityGuaranteed?: boolean;
      debugReplicaID?: string;
    } = {}
  ) {
    super(options.debugReplicaID ?? randomReplicaID());
    this.causalityGuaranteed = options?.causalityGuaranteed ?? false;

    this.registry = super.setRootCollab((init) => new PublicCObject(init));

    // Events.
    // TODO
    // this.batchingLayer.on("Change", (e) => this.emit("Change", e));
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

  private beginTransaction() {
    this.inTransaction = true;
    // messageBatches was already cleared by the previous endTransaction.
  }

  private endTransaction() {
    this.inTransaction = false;

    this.messageBatches.push(meta);

    const message = MessageStacksSerializer.instance.serialize(
      this.messageBatches
    );
    this.messageBatches = [];

    // Send. It will be delivered to each other replica's
    // receive function, eventually at-least-once.
    this.emit("Send", { message });
  }

  transact(f: () => void) {
    const alreadyInTransaction = this.inTransaction;
    if (!alreadyInTransaction) this.beginTransaction();
    try {
      // TODO: allow async here? But then eslint dislikes ignoring the non-promise uses.
      f();
    } finally {
      // TODO: abort transaction? Although then local state may be inconsistent
      // with (lack of) sent messages.
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

    if (!this.inTransaction) {
      // Create a transaction for the current microtask.
      // TODO: document; allow disabling; instead wrap every composite op
      // (in Collabs) in a transact() call (would need to be on IRuntime)?
      this.beginTransaction();
      void Promise.resolve().then(() => this.endTransaction());
    }

    // Local echo.
    this.rootCollab.receive(messageStack.slice(), meta);

    this.messageBatches.push(messageStack);
  }

  // TODO: note that this represses receive errors. Way to expose?
  // More generally, how to recover from such errors? (Just reload the doc?)
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
      // TODO
      // TODO: causal order
    } finally {
      this.inApplyUpdate = false;
    }
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
    savedStateTree.self = metaQueuedSave;
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
      const meta = deserialize(savedStateTree.self);
      savedStateTree.self = undefined;
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
