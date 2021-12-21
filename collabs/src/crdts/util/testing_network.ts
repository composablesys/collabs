import { BatchingLayer } from "../../constructions";
import { BatchingStrategy } from "../../constructions/batching_strategy";
import { Unsubscribe } from "../../core";
import { BroadcastNetwork, CRDTApp } from "../crdt-runtime";

/**
 * For testing or special purposes only.  Sends each message
 * immediately as its own batch.
 */
export class TestingBatchingStrategy implements BatchingStrategy {
  private batchingLayer?: BatchingLayer = undefined;
  private unsubscribe?: Unsubscribe = undefined;

  start(batchingLayer: BatchingLayer): void {
    this.batchingLayer = batchingLayer;
    this.unsubscribe = this.batchingLayer.on("DebugSend", () =>
      this.batchingLayer!.commitBatch()
    );
  }

  stop(): void {
    this.unsubscribe!();
    this.batchingLayer = undefined;
    this.unsubscribe = undefined;
  }
}

export class TestingNetwork implements BroadcastNetwork {
  sentBytes = 0;
  receivedBytes = 0;

  onreceive!: (message: Uint8Array) => void;

  constructor(private generator: TestingNetworkGenerator) {}

  send(message: Uint8Array): void {
    this.sentBytes += message.byteLength;
    const queueMap = this.generator.messageQueues.get(this)!;
    for (const queue of queueMap.values()) {
      queue.push(message);
    }
    this.generator.lastMessage = message;
  }
  /**
   * Not implemented (returns empty array).
   */
  save() {
    return new Uint8Array();
  }
  /**
   * Not implemented (no-op).
   */
  load() {
    // Not implemented.
  }
}

// Copied from Runtime (TODO: use directly to
// avoid duplication?)
const REPLICA_ID_LENGTH = 11;
const REPLICA_ID_CHARS = allAscii();
function allAscii() {
  const arr = new Array<number>(128);
  for (let i = 0; i < 128; i++) arr[i] = i;
  return String.fromCharCode(...arr);
}

function pseudorandomReplicaId(rng: seedrandom.prng) {
  const chars = new Array<string>(REPLICA_ID_LENGTH);
  for (let i = 0; i < REPLICA_ID_LENGTH; i++) {
    chars[i] = REPLICA_ID_CHARS[Math.floor(rng() * REPLICA_ID_CHARS.length)];
  }
  return chars.join("");
}

/**
 * Creates a collection of [[CRDTApp]]s linked together
 * (in-memory networking) that deliver messages
 * when release is called.
 */
export class TestingNetworkGenerator {
  /**
   * [newApp description]
   * @param  batchingStrategy Note that the default here is
   * [[TestingBatchingStrategy]], unlike in [[CRDTApp]].
   * @return                  [description]
   */
  newApp(
    batchingStrategy: BatchingStrategy = new TestingBatchingStrategy(),
    rng: seedrandom.prng | undefined = undefined
  ) {
    const debugReplicaId = rng ? pseudorandomReplicaId(rng) : undefined;
    return new CRDTApp(this.newNetwork(), {
      batchingStrategy,
      debugReplicaId,
    });
  }

  newNetwork() {
    const network = new TestingNetwork(this);
    const newQueue = new Map<TestingNetwork, Uint8Array[]>();
    for (const oldEntry of this.messageQueues.entries()) {
      newQueue.set(oldEntry[0], []);
      oldEntry[1].set(network, []);
    }
    this.messageQueues.set(network, newQueue);
    return network;
  }

  /**
   * Maps sender and recipient to an array of queued messages.
   */
  messageQueues = new Map<TestingNetwork, Map<TestingNetwork, Uint8Array[]>>();

  /**
   * Release all queued messages from sender to the specified recipients.
   * If recipients are not specified, releases them to all
   * recipients.  Only recipients that existed at the time
   * of sending will receive a message.
   */
  release(senderApp: CRDTApp, ...recipientApps: CRDTApp[]) {
    const sender = this.getTestingNetwork(senderApp);
    const recipients = recipientApps.map((app) => this.getTestingNetwork(app));
    this.releaseByNetwork(sender, ...recipients);
  }

  releaseByNetwork(sender: TestingNetwork, ...recipients: TestingNetwork[]) {
    if (recipients.length === 0) recipients = [...this.messageQueues.keys()];
    const senderMap = this.messageQueues.get(sender)!;
    for (const recipient of recipients) {
      if (recipient === sender) continue;
      for (const queued of senderMap.get(recipient)!) {
        // TODO: count senderCounter towards totals.
        recipient.receivedBytes += queued.byteLength;
        recipient.onreceive(queued);
      }
      senderMap.set(recipient, []);
    }
  }

  releaseAll() {
    for (const sender of this.messageQueues.keys())
      this.releaseByNetwork(sender);
  }

  getTestingNetwork(app: CRDTApp): TestingNetwork {
    return <TestingNetwork>app.runtime.network;
  }

  getTotalSentBytes() {
    let ret = 0;
    for (const sender of this.messageQueues.keys()) ret += sender.sentBytes;
    return ret;
  }

  lastMessage?: Uint8Array = undefined;
}
