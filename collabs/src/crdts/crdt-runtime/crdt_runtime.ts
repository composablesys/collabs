import {
  CRDTRuntimeMessage,
  CRDTRuntimeSave,
} from "../../../generated/proto_compiled";
import { BatchingLayer, PublicCObject } from "../../constructions";
import {
  BatchingStrategy,
  ImmediateBatchingStrategy,
} from "../../constructions/batching_strategy";
import {
  AbstractRuntime,
  Collab,
  CollabEventsRecord,
  Pre,
  randomReplicaId,
  Runtime,
  RuntimeEventsRecord,
} from "../../core";
import { Optional } from "../../util";
import { BroadcastNetwork } from "./broadcast_network";
import { CRDTExtraMetaLayer } from "./crdt_extra_meta_layer";

export class CRDTRuntime
  extends AbstractRuntime<RuntimeEventsRecord>
  implements Runtime
{
  private readonly batchingLayer: BatchingLayer;
  private readonly crdtMetaLayer: CRDTExtraMetaLayer;
  private readonly registry: PublicCObject;

  readonly network: BroadcastNetwork;

  constructor(
    network: BroadcastNetwork,
    options?: {
      batchingStrategy?: BatchingStrategy;
      debugReplicaId?: string;
    }
  ) {
    super(options?.debugReplicaId ?? randomReplicaId());

    const batchingStrategy =
      options?.batchingStrategy ?? new ImmediateBatchingStrategy();

    // Setup Collab tree.
    this.batchingLayer = this.setRootCollab(
      Pre(BatchingLayer)(batchingStrategy)
    );
    this.crdtMetaLayer = this.batchingLayer.setChild(Pre(CRDTExtraMetaLayer)());
    this.registry = this.crdtMetaLayer.setChild(Pre(PublicCObject)());

    // Setup network.
    this.network = network;
    this.network.onreceive = this.receive.bind(this);

    // Events.
    this.batchingLayer.on("Change", (e) => this.emit("Change", e));
  }

  registerCollab<C extends Collab>(name: string, preCollab: Pre<C>): C {
    return this.registry.addChild(name, preCollab);
  }

  /**
   * Replaces the current [[BatchingStrategy]] with
   * `batchingStrategy`.
   *
   * @param  batchingStrategy [description]
   */
  setBatchingStrategy(batchingStrategy: BatchingStrategy): void {
    this.batchingLayer.setBatchingStrategy(batchingStrategy);
  }

  commitBatch() {
    this.batchingLayer.commitBatch();
  }

  private inRootReceive = false;

  childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: (Uint8Array | string)[]
  ): void {
    if (child !== this.rootCollab) {
      throw new Error(`childSend called by non-root: ${child}`);
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
    this.network.send(serialized);
  }

  receive(message: Uint8Array): void {
    const deserialized = CRDTRuntimeMessage.decode(message);

    // Deliver to root with only mandatory MessageMeta.
    if (this.inRootReceive) {
      // nested receive calls; not allowed (might break things).
      throw new Error(
        "Runtime.receive called during another message's receive;" +
          " did you try to deliver a message in an event handler?"
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
   * No added context.
   *
   * @return undefined
   */
  getAddedContext(_key: symbol): unknown {
    return undefined;
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
    // Commit the pending batch, as required by [[BatchingLayer.save]].
    this.batchingLayer.commitBatch();

    const saveMessage = CRDTRuntimeSave.create({
      crdtSave: super.save(),
      networkSave: this.network.save(),
    });
    return CRDTRuntimeSave.encode(saveMessage).finish();
  }

  load(saveData: Optional<Uint8Array>): void {
    if (!saveData.isPresent) {
      // Indicates skipped loading. Pass on the message.
      super.load(saveData);
      this.network.load(saveData);
    } else {
      const saveMessage = CRDTRuntimeSave.decode(saveData.get());
      super.load(Optional.of(saveMessage.crdtSave));
      // Load the network last in case it delivers messages as
      // part of its loading process.
      this.network.load(Optional.of(saveMessage.networkSave));
    }
  }
}
