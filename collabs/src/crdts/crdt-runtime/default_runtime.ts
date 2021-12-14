import {
  DefaultRuntimeMessage,
  DefaultRuntimeSave,
} from "../../../generated/proto_compiled";
import { Collab, CollabEventsRecord, Pre } from "../crdt";
import { MessageMeta } from "../message_meta";
import { Runtime } from "../runtime";
import { AbstractRuntime } from "./abstract_runtime";
import { BatchingLayer } from "./batching_layer";
import {
  BatchingStrategy,
  ImmediateBatchingStrategy,
} from "./batching_strategy";
import { CausalBroadcastNetwork } from "./causal_broadcast_network";
import { MessageMetaLayer } from "./message_meta_layer";
import { PublicCObject } from "./public_object";
import { randomReplicaId } from "./random_replica_id";

// TODO: make sure to emit Change events when internal
// transactions/batches happen (local echos that don't
// reach here yet).
export class DefaultRuntime
  extends AbstractRuntime<CollabEventsRecord>
  implements Runtime
{
  private readonly batchingLayer: BatchingLayer;
  private readonly messageMetaLayer: MessageMetaLayer;
  private readonly registry: PublicCObject;

  readonly network: CausalBroadcastNetwork;

  /**
   * The number of messages sent so far.
   * Note the next message's senderCounter will be one greater.
   */
  private currentSenderCounter = 0;
  private pendingMeta: MessageMeta;

  constructor(
    network: CausalBroadcastNetwork,
    options?: { batchingStrategy?: BatchingStrategy; debugReplicaId?: string }
  ) {
    super(options?.debugReplicaId ?? randomReplicaId());

    const batchingStrategy =
      options?.batchingStrategy ?? new ImmediateBatchingStrategy();

    // Setup Collab tree.
    this.batchingLayer = this.setRootCollab(
      Pre(BatchingLayer)(batchingStrategy)
    );
    this.messageMetaLayer = this.batchingLayer.setChild(
      Pre(MessageMetaLayer)()
    );
    this.registry = this.messageMetaLayer.setChild(Pre(PublicCObject)());

    // Setup network.
    this.network = network;
    this.network.onreceive = this.receive.bind(this);
    this.network.replicaId = this.replicaId;

    // Misc setup.
    this.pendingMeta = {
      isLocal: true,
      sender: this.replicaId,
      senderCounter: 1,
    };

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
    const meta = this.nextMessageMeta();
    this.inRootReceive = true;
    try {
      this.rootCollab.receive([...messagePath], meta);
    } finally {
      this.inRootReceive = false;
    }

    // Serialize messagePath. From our choice of Collab layers,
    // we know it's actually all Uint8Array's.
    const runtimeMessage = DefaultRuntimeMessage.create({
      messagePath: <Uint8Array[]>messagePath,
    });
    const serialized = DefaultRuntimeMessage.encode(runtimeMessage).finish();

    // Send. It will be delivered to each other replica's
    // receive function, exactly once, in causal order.
    this.network.send(serialized, meta.senderCounter);

    // Update senderCounter for the next message.
    this.currentSenderCounter++;
  }

  receive(message: Uint8Array, sender: string, senderCounter: number): void {
    const deserialized = DefaultRuntimeMessage.decode(message);

    // Deliver to root with only mandatory MessageMeta.
    const meta = { isLocal: false, sender, senderCounter };
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
      this.rootCollab.receive(deserialized.messagePath, meta);
    } finally {
      this.inRootReceive = false;
    }
  }

  nextMessageMeta(): MessageMeta {
    if (this.pendingMeta.senderCounter !== this.currentSenderCounter + 1) {
      // Update pendingMeta.
      this.pendingMeta = {
        isLocal: true,
        sender: this.replicaId,
        senderCounter: this.currentSenderCounter + 1,
      };
    }
    return this.pendingMeta;
  }

  save(): Uint8Array {
    const saveMessage = DefaultRuntimeSave.create({
      crdtSave: super.save(),
      networkSave: this.network.save(),
    });
    return DefaultRuntimeSave.encode(saveMessage).finish();
  }

  load(saveData: Uint8Array | null): void {
    if (saveData === null) {
      // Indicates skipped loading. Pass on the message.
      super.load(null);
      this.network.load(null);
    } else {
      const saveMessage = DefaultRuntimeSave.decode(saveData);
      super.load(saveMessage.crdtSave);
      this.network.load(saveMessage.networkSave);
    }
  }
}
