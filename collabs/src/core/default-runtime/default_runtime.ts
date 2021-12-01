import { RuntimeMessage } from "../../../generated/proto_compiled";
import { Crdt, CrdtEventsRecord, Pre } from "../crdt";
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

export class DefaultRuntime extends AbstractRuntime implements Runtime {
  private readonly messageMetaLayer: MessageMetaLayer;
  private readonly batchingLayer: BatchingLayer;
  private readonly registry: PublicCObject;

  readonly network: CausalBroadcastNetwork;

  /**
   * The number of messages sent so far.
   * Initialized to 0 in the constructor.
   * Note the next message's senderCounter will be one greater.
   */
  private currentSenderCounter: number;
  /**
   * Stores messages received while a batch is pending.
   * They will be delivered immediately after the batch is
   * sent.
   */
  private queuedReceivedMessages: [
    messagePath: Uint8Array[],
    meta: MessageMeta
  ][];

  constructor(
    network: CausalBroadcastNetwork,
    options?: { batchingStrategy?: BatchingStrategy; debugReplicaId?: string }
  ) {
    const replicaId = options?.debugReplicaId ?? randomReplicaId();
    const batchingStrategy =
      options?.batchingStrategy ?? new ImmediateBatchingStrategy();

    super(replicaId);

    // Setup Crdt tree.
    this.messageMetaLayer = this.setRootCrdt(Pre(MessageMetaLayer)());
    this.batchingLayer = this.messageMetaLayer.setChild(
      Pre(BatchingLayer)(batchingStrategy)
    );
    this.registry = this.batchingLayer.setChild(Pre(PublicCObject)());

    // Setup network.
    this.network = network;
    this.network.onreceive = this.receive.bind(this);
    this.network.replicaId = this.replicaId;

    // Setup other class vars.
    this.currentSenderCounter = 0;
    this.queuedReceivedMessages = [];
  }

  // TODO: can we move this and receive to the abstract class,
  // or add an intermediate layer that assumes the network but
  // not the layers, or make the layers customizable thru
  // options?
  childSend(
    child: Crdt<CrdtEventsRecord>,
    messagePath: (Uint8Array | string)[]
  ): void {
    if (child !== this.rootCrdt) {
      throw new Error("childSend called by non-root: " + child);
    }

    // Echo with only mandatory MessageMeta.
    // TODO: error handling.
    const meta = this.nextMessageMeta();
    this.rootCrdt.receive([...messagePath], meta);

    // Serialize messagePath. From our choice of Crdt layers,
    // we know it's actually all Uint8Array's.
    const runtimeMessage = RuntimeMessage.create({
      messagePath: <Uint8Array[]>messagePath,
    });
    const serialized = RuntimeMessage.encode(runtimeMessage).finish();

    // Send. It will be delivered to each other replica's
    // receive function, exactly once, in causal order.
    this.network.send(serialized, meta.senderCounter);

    // Update senderCounter for the next message.
    this.currentSenderCounter++;

    // Receive message queued during the batch.
    for (const [messagePath, meta] of this.queuedReceivedMessages) {
      // TODO: error handling.
      try {
        this.rootCrdt.receive(messagePath, meta);
      } catch (e) {
        console.error("Error in receive handler:");
        console.error(e);
      }
    }
  }

  receive(message: Uint8Array, sender: string, senderCounter: number): void {
    const deserialized = RuntimeMessage.decode(message);

    // Deliver to root with only mandatory MessageMeta.
    const meta = { isLocal: false, sender, senderCounter };
    if (this.batchingLayer.isBatchPending()) {
      this.queuedReceivedMessages.push([deserialized.messagePath, meta]);
    } else {
      // TODO: error handling.
      this.rootCrdt.receive(deserialized.messagePath, meta);
    }
  }

  nextMessageMeta(): MessageMeta {
    return {
      isLocal: true,
      sender: this.replicaId,
      senderCounter: this.currentSenderCounter + 1,
    };
  }

  registerCrdt<C extends Crdt>(name: string, preCrdt: Pre<C>): C {
    return this.registry.addChild(name, preCrdt);
  }
}
