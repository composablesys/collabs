import { ReplicaIDs, nonNull } from "@collabs/core";
import type seedrandom from "seedrandom";
import { CRuntime } from "../runtime";

/**
 * Creates a collection of [[CRuntime]]s linked together
 * (in-memory networking) that delivers messages
 * when [[release]] is called.
 *
 * This is useful for tests, including tests with concurrent operations.
 */
export class TestingRuntimes {
  /**
   * Maps sender and recipient to an array of queued messages.
   */
  private readonly messageQueues = new Map<
    CRuntime,
    Map<CRuntime, Uint8Array[]>
  >();

  /**
   * Maps sender to the number of bytes they have sent.
   */
  private readonly sentBytes = new Map<CRuntime, number>();
  /**
   * Maps sender to the number of bytes they have received.
   */
  private readonly receivedBytes = new Map<CRuntime, number>();

  /**
   * Returns a new [[CRuntime]] linked with all prior
   * runtimes created by this TestingRuntime.
   *
   * @param options.rng A PRNG used to deterministically set the replicaID
   * (via [[ReplicaIDs.pseudoRandom]]).
   * @param options.causalityGuaranteed As in [[CRuntime]]'s constructor.
   */
  newRuntime(
    options: {
      rng?: seedrandom.prng;
      causalityGuaranteed?: boolean;
    } = {}
  ): CRuntime {
    const debugReplicaID = options.rng
      ? ReplicaIDs.pseudoRandom(options.rng)
      : undefined;
    const runtime = new CRuntime({
      autoTransactions: "debugOp",
      debugReplicaID,
      causalityGuaranteed: options.causalityGuaranteed,
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
        nonNull(this.sentBytes.get(runtime)) + e.message.byteLength
      );
      for (const queue of appQueue.values()) {
        queue.push(e.message);
      }
      this.lastMessage = e.message;
    });

    return runtime;
  }

  /**
   * Releases all queued messages from sender to the specified recipients.
   * If recipients are not specified, releases them to all
   * recipients.
   *
   * Only recipients that existed at the time
   * of sending will receive a message.
   */
  release(sender: CRuntime, ...recipients: CRuntime[]): void {
    if (recipients.length === 0) recipients = [...this.messageQueues.keys()];
    const senderMap = nonNull(this.messageQueues.get(sender));
    for (const recipient of recipients) {
      if (recipient === sender) continue;
      for (const queued of nonNull(senderMap.get(recipient))) {
        this.receivedBytes.set(
          recipient,
          nonNull(this.receivedBytes.get(recipient)) + queued.byteLength
        );
        recipient.receive(queued);
      }
      senderMap.set(recipient, []);
    }
  }

  /**
   * Release all queued messages.
   *
   * Only recipients that existed at the time
   * of sending will receive a message.
   */
  releaseAll(): void {
    for (const sender of this.messageQueues.keys()) this.release(sender);
  }

  /**
   * Returns the total number of bytes in messages
   * sent by all runtimes.
   */
  getTotalSentBytes(): number {
    let ret = 0;
    for (const value of this.sentBytes.values()) ret += value;
    return ret;
  }

  /**
   * The last sent message, if any.
   *
   * This is sometimes convenient to access during benchmarks.
   */
  lastMessage?: Uint8Array = undefined;
}
