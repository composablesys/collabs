import {
  BatchingStrategy,
  BroadcastNetwork,
  CrdtEvent,
  DefaultCausalBroadcastNetwork,
  Runtime,
} from "../core";
import { Unsubscribe } from "./event_emitter";

/**
 * For testing or special purposes only.  Sends each message
 * immediately as its own batch.
 */
export class TestingBatchingStrategy implements BatchingStrategy {
  private runtime?: Runtime = undefined;
  private unsubscribe?: Unsubscribe = undefined;

  start(runtime: Runtime): void {
    this.runtime = runtime;
    this.unsubscribe = this.runtime.on("Message", this.onmessage.bind(this));
  }

  stop(): void {
    this.unsubscribe!();
    this.runtime = undefined;
    this.unsubscribe = undefined;
  }

  private onmessage(event: CrdtEvent) {
    if (event.meta.isLocal) {
      this.runtime!.commitBatch();
    }
  }
}

export class TestingNetwork implements BroadcastNetwork {
  sentBytes = 0;
  receivedBytes = 0;
  onreceive!: (message: Uint8Array) => void;
  constructor(private generator: TestingNetworkGenerator) {}
  send(message: Uint8Array): void {
    this.sentBytes += message.byteLength;
    let queueMap = this.generator.messageQueues.get(this)!;
    for (let queue of queueMap.values()) {
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
  load(_saveData: Uint8Array) {}
}

// Copied from Runtime (TODO: use directly to
// avoid duplication?)
const REPLICA_ID_LENGTH = 11;
const REPLICA_ID_CHARS = allAscii();
function allAscii() {
  let arr = new Array<number>(128);
  for (let i = 0; i < 128; i++) arr[i] = i;
  return String.fromCharCode(...arr);
}

function pseudorandomReplicaId(rng: seedrandom.prng) {
  let chars = new Array<string>(REPLICA_ID_LENGTH);
  for (let i = 0; i < REPLICA_ID_LENGTH; i++) {
    chars[i] = REPLICA_ID_CHARS[Math.floor(rng() * REPLICA_ID_CHARS.length)];
  }
  return chars.join("");
}

/**
 * Creates a collection of Runtimes linked together
 * (i.e., in-memory networking) that deliver messages
 * when release is called.
 */
export class TestingNetworkGenerator {
  /**
   * [newRuntime description]
   * @param  batchOptions Note that the default here is
   * "immediate", unlike Runtime, where it is {periodMs: 0}.
   * "immediate" is better for tests, while {periodMs: 0} is
   * better for real apps.
   * @param  rng          [description]
   * @return              [description]
   */
  newRuntime(
    batchingStrategy: BatchingStrategy = new TestingBatchingStrategy(),
    rng: seedrandom.prng | undefined = undefined
  ) {
    let replicaId = rng ? pseudorandomReplicaId(rng) : undefined;
    return new Runtime(this.newNetwork(), batchingStrategy, replicaId);
  }
  newNetwork() {
    let network = new TestingNetwork(this);
    let newQueue = new Map<TestingNetwork, Array<any>>();
    for (let oldEntry of this.messageQueues.entries()) {
      newQueue.set(oldEntry[0], []);
      oldEntry[1].set(network, []);
    }
    this.messageQueues.set(network, newQueue);
    return new DefaultCausalBroadcastNetwork(network);
  }
  // Maps sender and recipient to an array of queued messages.
  messageQueues = new Map<TestingNetwork, Map<TestingNetwork, Uint8Array[]>>();
  /**
   * Release all queued messages from sender to the specified recipients.
   * If recipients are not specified, releases them to all
   * recipients.  Only recipients that existed at the time
   * of sending will receive a message.
   */
  release(senderRuntime: Runtime, ...recipientRuntimes: Runtime[]) {
    let sender = this.getTestingNetwork(senderRuntime);
    let recipients = recipientRuntimes.map((runtime) =>
      this.getTestingNetwork(runtime)
    );
    this.releaseByNetwork(sender, ...recipients);
  }
  releaseByNetwork(sender: TestingNetwork, ...recipients: TestingNetwork[]) {
    if (recipients.length === 0) recipients = [...this.messageQueues.keys()];
    let senderMap = this.messageQueues.get(sender)!;
    for (let recipient of recipients) {
      if (recipient === sender) continue;
      for (let queued of senderMap.get(recipient)!) {
        recipient.receivedBytes += queued.byteLength;
        recipient.onreceive!(queued);
      }
      senderMap.set(recipient, []);
    }
  }
  releaseAll() {
    for (let sender of this.messageQueues.keys()) this.releaseByNetwork(sender);
  }

  getTestingNetwork(runtime: Runtime) {
    // @ts-ignore network is private
    let causal = runtime.network as DefaultCausalBroadcastNetwork;
    return causal.broadcastNetwork as TestingNetwork;
  }

  getTotalSentBytes() {
    let ret = 0;
    for (let sender of this.messageQueues.keys()) ret += sender.sentBytes;
    return ret;
  }

  lastMessage?: Uint8Array = undefined;
}
