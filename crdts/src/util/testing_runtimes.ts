import { ReplicaIDs } from "@collabs/core";
import { CRuntime } from "../runtime";

/**
 * Creates a collection of [[CRuntime]]s linked together
 * (in-memory networking) that deliver messages
 * when release is called.
 */
export class TestingRuntimes {
  /**
   * Maps sender and recipient to an array of queued messages.
   */
  messageQueues = new Map<CRuntime, Map<CRuntime, Uint8Array[]>>();

  /**
   * Maps sender to the number of bytes they have sent.
   */
  sentBytes = new Map<CRuntime, number>();
  /**
   * Maps sender to the number of bytes they have received.
   */
  receivedBytes = new Map<CRuntime, number>();

  /**
   * [newRuntime description]
   *
   * @param  batchingStrategy Note that the default here is
   * [[TestingBatchingStrategy]], unlike in [[CRuntime]].
   * @return                  [description]
   */
  newRuntime(
    rng: seedrandom.prng | undefined = undefined,
    causalityGuaranteed = false
  ) {
    const debugReplicaID = rng ? ReplicaIDs.pseudoRandom(rng) : undefined;
    const runtime = new CRuntime({
      autoTransactions: "op",
      debugReplicaID,
      causalityGuaranteed,
    });

    const appQueue = new Map<CRuntime, Uint8Array[]>();
    for (const [oldApp, oldAppQueue] of this.messageQueues) {
      appQueue.set(oldApp, []);
      oldAppQueue.set(runtime, []);
    }
    this.messageQueues.set(runtime, appQueue);

    this.sentBytes.set(runtime, 0);
    this.receivedBytes.set(runtime, 0);

    runtime.on("Send", (e) => {
      this.sentBytes.set(
        runtime,
        this.sentBytes.get(runtime)! + e.message.byteLength
      );
      for (const queue of appQueue.values()) {
        queue.push(e.message);
      }
      this.lastMessage = e.message;
    });

    return runtime;
  }

  /**
   * Release all queued messages from sender to the specified recipients.
   * If recipients are not specified, releases them to all
   * recipients.  Only recipients that existed at the time
   * of sending will receive a message.
   */
  release(sender: CRuntime, ...recipients: CRuntime[]) {
    if (recipients.length === 0) recipients = [...this.messageQueues.keys()];
    const senderMap = this.messageQueues.get(sender)!;
    for (const recipient of recipients) {
      if (recipient === sender) continue;
      for (const queued of senderMap.get(recipient)!) {
        this.receivedBytes.set(
          recipient,
          this.receivedBytes.get(recipient)! + queued.byteLength
        );
        recipient.receive(queued);
      }
      senderMap.set(recipient, []);
    }
  }

  releaseAll() {
    for (const sender of this.messageQueues.keys()) this.release(sender);
  }

  getTotalSentBytes() {
    let ret = 0;
    for (const value of this.sentBytes.values()) ret += value;
    return ret;
  }

  lastMessage?: Uint8Array = undefined;
}
