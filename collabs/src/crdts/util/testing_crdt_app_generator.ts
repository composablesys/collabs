import { BatchingLayer } from "../../constructions";
import { BatchingStrategy } from "../../constructions/batching_strategy";
import { DEFAULT_REPLICA_ID_LENGTH, Unsubscribe } from "../../core";
import { CRDTApp } from "../crdt-runtime";

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

function pseudorandomReplicaId(rng: seedrandom.prng) {
  const arr = new Array<number>(DEFAULT_REPLICA_ID_LENGTH);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(rng() * 128);
  }
  return String.fromCharCode(...arr);
}

/**
 * Creates a collection of [[CRDTApp]]s linked together
 * (in-memory networking) that deliver messages
 * when release is called.
 */
export class TestingCRDTAppGenerator {
  /**
   * Maps sender and recipient to an array of queued messages.
   */
  messageQueues = new Map<CRDTApp, Map<CRDTApp, Uint8Array[]>>();

  /**
   * Maps sender to the number of bytes they have sent.
   */
  sentBytes = new Map<CRDTApp, number>();
  /**
   * Maps sender to the number of bytes they have received.
   */
  receivedBytes = new Map<CRDTApp, number>();

  /**
   * [newApp description]
   *
   * Note: technically you should call [[CRDTApp.load]] on the
   * app after registering Collabs, even if you are not loading
   * any previous state. But if you know your Collabs don't
   * care, there should be no harm in skipping it.
   *
   * @param  batchingStrategy Note that the default here is
   * [[TestingBatchingStrategy]], unlike in [[CRDTApp]].
   * @return                  [description]
   */
  newApp(
    batchingStrategy: BatchingStrategy = new TestingBatchingStrategy(),
    rng: seedrandom.prng | undefined = undefined
  ) {
    const debugReplicaId = rng ? pseudorandomReplicaId(rng) : undefined;
    const app = new CRDTApp({
      batchingStrategy,
      debugReplicaId,
    });

    const appQueue = new Map<CRDTApp, Uint8Array[]>();
    for (const [oldApp, oldAppQueue] of this.messageQueues) {
      appQueue.set(oldApp, []);
      oldAppQueue.set(app, []);
    }
    this.messageQueues.set(app, appQueue);

    this.sentBytes.set(app, 0);
    this.receivedBytes.set(app, 0);

    app.on("Send", (e) => {
      this.sentBytes.set(app, this.sentBytes.get(app)! + e.message.byteLength);
      for (const queue of appQueue.values()) {
        queue.push(e.message);
      }
      this.lastMessage = e.message;
    });

    return app;
  }

  /**
   * Release all queued messages from sender to the specified recipients.
   * If recipients are not specified, releases them to all
   * recipients.  Only recipients that existed at the time
   * of sending will receive a message.
   */
  release(sender: CRDTApp, ...recipients: CRDTApp[]) {
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
