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
} from "../../core";
import { Optional } from "../../util";
import { CRDTExtraMetaLayer } from "./crdt_extra_meta_layer";

export interface SendEvent {
  message: Uint8Array;
}

export interface CRDTRuntimeEventsRecord extends RuntimeEventsRecord {
  /**
   * TODO: get rid of this description, just say it's a backer
   * of the user-facing Change event in CRDTApp?
   *
   * Emitted each time the app's state is changed and
   * is in a reasonable user-facing state
   * (so not in the middle of a transaction).
   *
   * A simple way to keep a GUI in sync with the app is to
   * do `runtime.on("Change", refreshDisplay)`.
   */
  Change: CollabEvent;
  /**
   * Emitted when a message is to be sent.
   *
   * TODO: reqs: needs to be delivered to each other replica's
   * [[Runtime.receive]] at least once.
   */
  Send: SendEvent;
}

export class CRDTRuntime
  extends AbstractRuntime<CRDTRuntimeEventsRecord>
  implements Runtime
{
  private readonly batchingLayer: BatchingLayer;
  private readonly crdtMetaLayer: CRDTExtraMetaLayer;
  private readonly registry: PublicCObject;
  private _isLoaded = false;

  constructor(options?: {
    batchingStrategy?: BatchingStrategy;
    debugReplicaId?: string;
  }) {
    super(options?.debugReplicaId ?? randomReplicaId());

    const batchingStrategy =
      options?.batchingStrategy ?? new ImmediateBatchingStrategy();

    // Setup Collab tree.
    this.batchingLayer = this.setRootCollab(
      Pre(BatchingLayer)(batchingStrategy)
    );
    this.crdtMetaLayer = this.batchingLayer.setChild(Pre(CRDTExtraMetaLayer)());
    this.registry = this.crdtMetaLayer.setChild(Pre(PublicCObject)());

    // Events.
    this.batchingLayer.on("Change", (e) => this.emit("Change", e));
  }

  // ---Collabs-facing methods---
  // These are implementations of AbstractRuntime's abstract methods.

  private inRootReceive = false;

  childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: (Uint8Array | string)[]
  ): void {
    if (child !== this.rootCollab) {
      throw new Error(`childSend called by non-root: ${child}`);
    }

    if (!this._isLoaded) {
      throw new Error("Not yet loaded");
    }

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
      this.rootCollab.receive([...messagePath], {
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

    // Serialize messagePath. From our choice of Collab layers,
    // we know it's actually all Uint8Array's.
    const runtimeMessage = CRDTRuntimeMessage.create({
      messagePath: <Uint8Array[]>messagePath,
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

  registerCollab<C extends Collab>(name: string, preCollab: Pre<C>): C {
    return this.registry.addChild(name, preCollab);
  }

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
   * [save description]
   *
   * Note: this will commit a pending batch first.
   * So if there is a pending batch, expect messages to
   * be sent during this method. Those messages will
   * be accounted for in the `saveData` (including by
   * network, which will know not to deliver them to a
   * future loading replica).
   *
   * @return [description]
   */
  save(): Uint8Array {
    if (!this._isLoaded) {
      throw new Error("Not yet loaded");
    }

    // Commit the pending batch, as required by [[BatchingLayer.save]].
    this.batchingLayer.commitBatch();

    return this.rootCollab.save();
  }

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
