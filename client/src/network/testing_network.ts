import { CrdtRuntime } from "../crdts";
import { CausalTimestamp } from "./causal_broadcast_network";
import {
  BroadcastNetwork,
  DefaultCausalBroadcastNetwork,
} from "./default_causal_broadcast_network";

export class TestingNetwork implements BroadcastNetwork {
  causal!: DefaultCausalBroadcastNetwork;
  sentBytes = 0;
  receivedBytes = 0;
  constructor(private generator: TestingNetworkGenerator) {}
  joinGroup(_group: string): void {
    // Ignored
  }
  send(_group: string, message: Uint8Array, _timestamp: CausalTimestamp): void {
    this.sentBytes += message.byteLength;
    let queueMap = this.generator.messageQueues.get(this)!;
    for (let queue of queueMap.values()) {
      queue.push(message);
    }
  }
  register(causal: DefaultCausalBroadcastNetwork): void {
    this.causal = causal;
  }
}

/**
 * Creates a collection of CrdtRuntimes linked together
 * (i.e., in-memory networking) that deliver messages
 * when release is called.
 */
export class TestingNetworkGenerator {
  newRuntime() {
    return new CrdtRuntime(this.newNetwork());
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
  release(senderRuntime: CrdtRuntime, ...recipientRuntimes: CrdtRuntime[]) {
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
      for (let message of senderMap.get(recipient)!) {
        recipient.receivedBytes += message.byteLength;
        recipient.causal.receive(message);
      }
      senderMap.set(recipient, []);
    }
  }
  releaseAll() {
    for (let sender of this.messageQueues.keys())
      this.release(sender.causal.crdtRuntime);
  }

  getTestingNetwork(runtime: CrdtRuntime) {
    let causal = runtime.network as DefaultCausalBroadcastNetwork;
    return causal.broadcastNetwork as TestingNetwork;
  }

  getTotalSentBytes() {
    let ret = 0;
    for (let sender of this.messageQueues.keys()) ret += sender.sentBytes;
    return ret;
  }
}
