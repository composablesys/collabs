import { CRDTRuntimeMessage } from "../../../generated/proto_compiled";
import { BatchingLayer, PublicCObject } from "../../constructions";
import {
  BatchingStrategy,
  ImmediateBatchingStrategy,
} from "../../constructions/batching_strategy";
import {
  AbstractRuntime,
  Collab,
  CollabEvent,
  CollabEventsRecord,
  Pre,
  randomReplicaId,
  Runtime,
  RuntimeEventsRecord,
  Message,
} from "../../core";
import { Optional } from "../../util";
import { CRDTMetaLayer } from "./crdt-meta-layer";

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

export class CRDTRuntime
  extends AbstractRuntime<CRDTRuntimeEventsRecord>
  implements Runtime
{
  private readonly batchingLayer: BatchingLayer;
  private readonly crdtMetaLayer: CRDTMetaLayer;
  private readonly registry: PublicCObject;
  private _isLoaded = false;

  constructor(options?: {
    batchingStrategy?: BatchingStrategy;
    causalityGuaranteed?: boolean;
    debugReplicaId?: string;
  }) {
    super(options?.debugReplicaId ?? randomReplicaId());

    const batchingStrategy =
      options?.batchingStrategy ?? new ImmediateBatchingStrategy();

    // Setup Collab tree.
    this.batchingLayer = this.setRootCollab(
      Pre(BatchingLayer)(batchingStrategy)
    );
    this.crdtMetaLayer = this.batchingLayer.setChild(
      Pre(CRDTMetaLayer)({
        causalityGuaranteed: options?.causalityGuaranteed,
      })
    );
    this.registry = this.crdtMetaLayer.setChild(Pre(PublicCObject)());

    // Events.
    this.batchingLayer.on("Change", (e) => this.emit("Change", e));
  }

  // ---Collabs-facing methods---
  // These are implementations of AbstractRuntime's abstract methods.

  private inRootReceive = false;

  childSend(child: Collab<CollabEventsRecord>, messagePath: Message[]): void {
    if (child !== this.rootCollab) {
      throw new Error(`childSend called by non-root: ${child}`);
    }

    if (!this._isLoaded) {
      throw new Error("Not yet loaded");
    }

    // From our choice of Collab layers,
    // we know messagePath is actually all Uint8Array's.
    const messagePathBytes = <Uint8Array[]>messagePath;

    // Local echo with only mandatory MessageMeta.
    if (this.inRootReceive) {
      // send inside a receive call; not allowed (might break things).
      throw new Error(
        "Runtime.send called during another message's receive;" +
          " did you try to perform an operation in an event handler?"
      );
    }
    this.inRootReceive = true;
    try {
      this.rootCollab.receive([...messagePathBytes], {
        sender: this.replicaID,
        isLocalEcho: true,
      });
    } catch (err) {
      // Don't let the error block other messages' delivery,
      // but still make it print
      // its error like it was unhandled.
      setTimeout(() => {
        throw err;
      });
    } finally {
      this.inRootReceive = false;
    }

    // Serialize messagePathBytes.
    // Opt: avoid copying the inner Uint8Array's, by serializing
    // them now instead of later, as part of the same Writer?
    const runtimeMessage = CRDTRuntimeMessage.create({
      messagePath: messagePathBytes,
      sender: this.replicaID,
    });
    const serialized = CRDTRuntimeMessage.encode(runtimeMessage).finish();

    // Send. It will be delivered to each other replica's
    // receive function, eventually at-least-once.
    this.emit("Send", { message: serialized });
  }

  /**
   * No added context.
   *
   * @return undefined
   */
  getAddedContext(_key: symbol): unknown {
    return undefined;
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
  registerCollab<C extends Collab>(name: string, preCollab: Pre<C>): C {
    return this.registry.addChild(name, preCollab);
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

    // Deliver to root with only mandatory MessageMeta.
    if (this.inRootReceive) {
      // nested receive calls; not allowed (might break things).
      throw new Error(
        "Runtime.receive called during another message's receive;" +
          " did you try to deliver a message in a Collab's event handler?"
      );
    }
    this.inRootReceive = true;
    try {
      this.rootCollab.receive(deserialized.messagePath, {
        sender: deserialized.sender,
        isLocalEcho: false,
      });
    } catch (err) {
      // Don't let the error block other messages' delivery,
      // but still make it print
      // its error like it was unhandled.
      setTimeout(() => {
        throw err;
      });
    } finally {
      this.inRootReceive = false;
    }
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
   * be accounted for in the `saveData`.
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
   * @param saveData save data from a previous instance's call to [[save]].
   */
  load(saveData: Optional<Uint8Array>): void {
    if (this._isLoaded) {
      throw new Error("Already loaded");
    }

    this.rootCollab.load(saveData);
    this._isLoaded = true;

    this.emit("Load", {
      skipped: !saveData.isPresent,
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
