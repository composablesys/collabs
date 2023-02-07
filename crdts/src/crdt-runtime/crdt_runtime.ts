import {
  AbstractRuntime,
  BatchingLayer,
  BatchingStrategy,
  CObject,
  Collab,
  CollabEvent,
  CollabEventsRecord,
  ImmediateBatchingStrategy,
  InitToken,
  IRuntime,
  Optional,
  randomReplicaID,
  RuntimeEventsRecord,
} from "@collabs/core";
import { CRDTRuntimeMessage } from "../../generated/proto_compiled";
import { CRDTMetaLayer } from "./crdt-meta-layer";

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

export interface CRDTRuntimeEventsRecord extends RuntimeEventsRecord {
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
   * [[CRDTRuntime.receive]] method, eventually at-least-once.
   *
   * Usually, you will not listen on this event directly, insteading listening on
   * [[CRDTApp]]'s "Send" event or using a `CRDTContainer`
   * (which listens on this event for you).
   */
  Send: SendEvent;
}

// TODO: don't use directly, use CRDTApp or CRDTContainer instead.
export class CRDTRuntime
  extends AbstractRuntime<CRDTRuntimeEventsRecord>
  implements IRuntime
{
  private readonly batchingLayer: BatchingLayer;
  private readonly crdtMetaLayer: CRDTMetaLayer;
  private readonly registry: PublicCObject;
  private _isLoaded = false;

  constructor(options?: {
    batchingStrategy?: BatchingStrategy;
    causalityGuaranteed?: boolean;
    debugReplicaID?: string;
  }) {
    super(options?.debugReplicaID ?? randomReplicaID());

    const batchingStrategy =
      options?.batchingStrategy ?? new ImmediateBatchingStrategy();

    // Setup Collab tree.
    this.batchingLayer = this.setRootCollab(
      (init) => new BatchingLayer(init, batchingStrategy)
    );
    this.crdtMetaLayer = this.batchingLayer.setChild(
      (init) =>
        new CRDTMetaLayer(init, {
          causalityGuaranteed: options?.causalityGuaranteed,
        })
    );
    this.registry = this.crdtMetaLayer.setChild(
      (init) => new PublicCObject(init)
    );

    // Events.
    this.batchingLayer.on("Change", (e) => this.emit("Change", e));
  }

  // ---Collabs-facing methods---
  // These are implementations of AbstractRuntime's abstract methods.

  private inRootReceive = false;

  childSend(
    child: Collab<CollabEventsRecord>,
    messageStack: Uint8Array[]
  ): void {
    if (child !== this.rootCollab) {
      throw new Error(`childSend called by non-root: ${child}`);
    }

    if (!this._isLoaded) {
      throw new Error("Not yet loaded");
    }

    // Since BatchingLayer is the root, we know this
    // is actually just a single Uint8Array.
    const message = <Uint8Array>messageStack[0];

    if (this.inRootReceive) {
      // send inside a receive call; not allowed (might break things).
      throw new Error(
        "IRuntime.send called during another message's receive;" +
          " did you try to perform an operation in an event handler?"
      );
    }

    // No need for local echo, since BatchingLayer ignores it anyway.

    // Serialize messagePathBytes.
    // Opt: avoid copying the inner Uint8Array's, by serializing
    // them now instead of later, as part of the same Writer?
    const runtimeMessage = CRDTRuntimeMessage.create({
      message,
      sender: this.replicaID,
    });
    const serialized = CRDTRuntimeMessage.encode(runtimeMessage).finish();

    // Send. It will be delivered to each other replica's
    // receive function, eventually at-least-once.
    this.emit("Send", { message: serialized });
  }

  // ---User-facing methods---

  // To make the separation between Collabs-facing methods and
  // user-facing methods clearer, these are duplicated on
  // CRDTApp (which is just a thin wrapper). Users are
  // expected to use CRDTApp.

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

  /**
   * Delivers `message` to the [[Collab]]s, so that they update
   * to reflect the operation(s) that triggered this message.
   *
   * Usually, you will not call this method directly, insteading using
   * [[CRDTApp.receive]] or using a `CRDTContainer` (which calls this method for you).
   *
   * @param message The message to receive.
   */
  receive(message: Uint8Array): void {
    if (!this._isLoaded) {
      throw new Error("Not yet loaded");
    }

    const deserialized = CRDTRuntimeMessage.decode(message);

    // Deliver to root with only mandatory UpdateMeta.
    if (this.inRootReceive) {
      // nested receive calls; not allowed (might break things).
      throw new Error(
        "IRuntime.receive called during another message's receive;" +
          " did you try to deliver a message in a Collab's event handler?"
      );
    }
    this.inRootReceive = true;
    try {
      this.rootCollab.receive(
        [deserialized.message],
        UpdateMeta.new(
          deserialized.sender,
          deserialized.sender === this.replicaID,
          false
        )
      );
    } catch (err) {
      console.error("Error while receiving remote Collabs message:\n", err);
    }
    this.inRootReceive = false;
  }

  /**
   * Like [[Collab.save]], but for the whole runtime and all of its
   * registered [[Collab]]s.
   *
   * Usually, you will not call this method directly, insteading using
   * [[CRDTApp.save]] or using a `CRDTContainer` (which calls this method for you).
   *
   * Note: this will commit a pending batch first.
   * So if there is a pending batch, expect messages to
   * be sent during this method. Those messages will
   * be accounted for in the `savedState`.
   *
   * @return save data for a future instance's [[load]]
   */
  save(): Uint8Array {
    if (!this._isLoaded) {
      throw new Error("Not yet loaded");
    }

    // Commit the pending batch, as required by [[BatchingLayer.save]].
    this.batchingLayer.commitBatch();

    return this.rootCollab.save();
  }

  /**
   * Like [[Collab.load]], but for the whole runtime and all of its
   * registered [[Collab]]s.
   *
   * Usually, you will not call this method directly, insteading using
   * [[CRDTApp.load]] or `CRDTContainer.load`.
   *
   * This must be called after registering [[Collab]]s but before
   * calling [[receive]] or performing any [[Collab]] operations.
   *
   * @param savedState save data from a previous instance's call to [[save]].
   */
  load(savedState: Optional<Uint8Array>): void {
    if (this._isLoaded) {
      throw new Error("Already loaded");
    }

    this.rootCollab.load(savedState);
    this._isLoaded = true;

    this.emit("Load", {
      skipped: !savedState.isPresent,
    });
  }

  // ---Less common user-facing methods---

  /**
   * Replaces the current [[BatchingStrategy]] with
   * `batchingStrategy`.
   *
   * @param  batchingStrategy [description]
   */
  setBatchingStrategy(batchingStrategy: BatchingStrategy): void {
    this.batchingLayer.setBatchingStrategy(batchingStrategy);
  }

  /**
   * Immediately commits the current batch (if present).
   *
   * Normally, you don't need to call this method directly;
   * instead, the set [[BatchingStrategy]] will do it for you.
   */
  commitBatch(): void {
    this.batchingLayer.commitBatch();
  }

  get isLoaded(): boolean {
    return this._isLoaded;
  }
}
