import { RuntimeMessage } from "../../../generated/proto_compiled";
import { int64AsNumber } from "../../util";
import { Crdt, CrdtEventsRecord, Pre } from "../crdt";
import { MandatoryMessageMeta, MessageMeta } from "../message_meta";
import { Runtime } from "../runtime";
import { AbstractRuntime } from "./abstract_runtime";
import { CausalBroadcastNetwork } from "./causal_broadcast_network";
import { PublicCObject } from "./public_object";
import { randomReplicaId } from "./random_replica_id";

export class DefaultRuntime extends AbstractRuntime implements Runtime {
  private readonly messageMetaLayer: MessageMetaLayer;
  private readonly batchingLayer: BatchingLayer;
  private readonly registry: PublicCObject;

  readonly network: CausalBroadcastNetwork;

  private senderCounter: number;

  constructor(
    network: CausalBroadcastNetwork,
    options?: { batchingStrategy?: BatchingStrategy; debugReplicaId?: string }
  ) {
    const replicaId = options?.debugReplicaId ?? randomReplicaId();
    const batchingStrategy =
      options?.batchingStrategy ?? new ImmediateBatchingStrategy();
    super(replicaId, Pre(MessageMetaLayer)());

    // Setup Crdt tree.
    this.messageMetaLayer = this.rootCrdt as MessageMetaLayer;
    this.batchingLayer = this.messageMetaLayer.setChild(
      Pre(BatchingLayer)(batchingStrategy)
    );
    this.registry = this.batchingLayer.setChild(Pre(PublicCObject)());

    // Setup network.
    this.network = network;
    this.network.onreceive = this.receive.bind(this);
    this.network.replicaId = this.replicaId;

    // Setup other class vars.
    this.senderCounter = 0;
  }

  // TODO: can we move this and receive to the abstract class,
  // or add an intermediate layer that assumes the network but
  // not the layers, or make the layers customizable thru
  // options?
  childSend(child: Crdt<CrdtEventsRecord>, messagePath: Uint8Array[]): void {
    if (child !== this.rootCrdt) {
      throw new Error("childSend called by non-root: " + child);
    }

    // Echo with only mandatory MessageMeta.
    // TODO: error handling.
    const meta = new MandatoryMessageMeta(
      true,
      this.replicaId,
      this.senderCounter
    );
    this.rootCrdt.receive([...messagePath], meta);

    // Serialize messagePath and mandatory MessageMeta fields.
    const runtimeMessage = RuntimeMessage.create({
      messagePath,
      sender: this.replicaId,
      senderCounter: this.senderCounter,
    });
    const serialized = RuntimeMessage.encode(runtimeMessage).finish();

    // Increment senderCounter.
    this.senderCounter++;

    // Send. It will be delivered to each other replica's
    // receive function, exactly once, in causal order.
    this.network.send(serialized);
  }

  receive(message: Uint8Array): void {
    const deserialized = RuntimeMessage.decode(message);

    // Deliver to root with only mandatory MessageMeta.
    const meta = new MandatoryMessageMeta(
      false,
      deserialized.sender,
      int64AsNumber(deserialized.senderCounter)
    );
    // TODO: error handling.
    this.rootCrdt.receive(deserialized.messagePath, meta);
  }

  nextMessageMeta(): MessageMeta {
    // TODO: this doesn't update accurately until after MessageMeta
    // receives the message. Fine so long as higher layers
    // don't try to access it, which they shouldn't.
    return this.messageMetaLayer.nextMessageMeta();
  }

  registerCrdt<C extends Crdt>(name: string, preCrdt: Pre<C>): C {
    return this.registry.addChild(name, preCrdt);
  }
}
