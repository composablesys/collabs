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
import { BroadcastNetwork } from "./broadcast_network";
import { CRDTMessageMetaLayer } from "./crdt_message_meta_layer";

// TODO: make sure to emit Change events when internal
// transactions/batches happen (local echos that don't
// reach here yet).
export class CRDTRuntime
  extends AbstractRuntime<RuntimeEventsRecord>
  implements Runtime
{
  private readonly batchingLayer: BatchingLayer;
  private readonly crdtMetaLayer: CRDTMessageMetaLayer;
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
    this.crdtMetaLayer = this.batchingLayer.setChild(
      Pre(CRDTMessageMetaLayer)()
    );
    this.registry = this.crdtMetaLayer.setChild(Pre(PublicCObject)());

    // Setup network.
    this.network = network;
    this.network.onreceive = this.receive.bind(this);
    this.network.replicaId = this.replicaId;

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

  // TODO: can we move this and receive to the abstract class,
  // or add an intermediate layer that assumes the network but
  // not the layers, or make the layers customizable thru
  // options?
  childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: (Uint8Array | string)[]
  ): void {
    if (child !== this.rootCollab) {
      throw new Error("childSend called by non-root: " + child);
    }

    // Local echo with only mandatory MessageMeta.
    // TODO: error handling.
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
        sender: this.replicaId,
        isLocalEcho: true,
      });
    } finally {
      this.inRootReceive = false;
    }

    // Serialize messagePath. From our choice of Collab layers,
    // we know it's actually all Uint8Array's.
    const runtimeMessage = CRDTRuntimeMessage.create({
      messagePath: <Uint8Array[]>messagePath,
      sender: this.replicaId,
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
    // TODO: error handling.
    this.inRootReceive = true;
    try {
      this.rootCollab.receive(deserialized.messagePath, {
        sender: deserialized.sender,
        isLocalEcho: false,
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
  getAddedContext(_key: symbol): any {
    return undefined;
  }

  save(): Uint8Array {
    const saveMessage = CRDTRuntimeSave.create({
      crdtSave: super.save(),
      networkSave: this.network.save(),
    });
    return CRDTRuntimeSave.encode(saveMessage).finish();
  }

  load(saveData: Uint8Array | null): void {
    if (saveData === null) {
      // Indicates skipped loading. Pass on the message.
      super.load(null);
      this.network.load(null);
    } else {
      const saveMessage = CRDTRuntimeSave.decode(saveData);
      super.load(saveMessage.crdtSave);
      this.network.load(saveMessage.networkSave);
    }
  }
}
