import { Unsubscribe } from "../core";
import { BatchingLayer } from "./batching_layer";

/**
 * A strategy for batching messages in a [[BatchingLayer]].
 *
 * `BatchingStrategy` instances are responsible for automatically
 * calling [[BatchingLayer.commitBatch]] as desired, so
 * that the user does not have to call it manually.
 * Larger batches (more messages) reduce network
 * traffic, both in terms of the number of separate messages and the
 * total bytes sent, but they increase sending latency.
 *
 * A `BatchingStrategy` can only be used with one [[BatchingLayer]].
 *
 * [[ImmediateBatchingStrategy]] is recommended as a default
 * option. Use [[RateLimitBatchingStrategy]] if you want to
 * rate-limit message sending.
 */
export interface BatchingStrategy {
  /**
   * Called by the using [[BatchingLayer]] when this is
   * first set as its batching strategy.
   *
   * This will then start calling `batchingLayer.commitBatch()`
   * according to its strategy.
   */
  start(batchingLayer: BatchingLayer): void;
  /**
   * Called by the using [[BatchingLayer]] when this is
   * removed as its batching strategy.
   *
   * This will then no longer call `batchingLayer.commitBatch()`.
   */
  stop(): void;
}

/**
 * Sends a batch immediately on each [[BatchingLayer]] "BatchPending" event.
 *
 * This is
 * the fastest-sending reasonable [[BatchingStrategy]].
 */
export class ImmediateBatchingStrategy implements BatchingStrategy {
  private batchingLayer?: BatchingLayer = undefined;
  private unsubscribe?: Unsubscribe = undefined;

  start(batchingLayer: BatchingLayer): void {
    this.batchingLayer = batchingLayer;
    this.unsubscribe = this.batchingLayer.on("BatchPending", () =>
      this.batchingLayer!.commitBatch()
    );
  }

  stop(): void {
    this.unsubscribe!();
    this.batchingLayer = undefined;
    this.unsubscribe = undefined;
  }
}

/**
 * Sends at most one batch per time period, otherwise sending
 * as soon as possible.
 */
export class RateLimitBatchingStrategy implements BatchingStrategy {
  private batchingLayer?: BatchingLayer = undefined;
  private unsubscribeBatchPending?: Unsubscribe = undefined;
  private unsubscribeReceiveBlocked?: Unsubscribe = undefined;

  private pendingBatch = false;
  private lastSend = -1;

  /**
   * @param periodMs The length of the time period in ms
   * @param commitOnReceive If true, whenever `batchingLayer`
   * would receive a message from another replica
   * except that there is a pending batch ("ReceiveBlocked" event),
   * this commits the batch immediately, so that the received message can be processed
   * immediately afterwards.  This may cause the rate limit to be
   * exceeded.
   */
  constructor(readonly periodMs: number) {}

  start(batchingLayer: BatchingLayer): void {
    this.batchingLayer = batchingLayer;
    this.unsubscribeBatchPending = this.batchingLayer.on(
      "BatchPending",
      this.onBatchPending.bind(this)
    );
  }

  stop(): void {
    this.unsubscribeBatchPending!();
    if (this.unsubscribeReceiveBlocked) this.unsubscribeReceiveBlocked();
    this.batchingLayer = undefined;
    this.unsubscribeBatchPending = undefined;
    this.unsubscribeReceiveBlocked = undefined;
  }

  private onBatchPending() {
    if (!this.pendingBatch) {
      const time = Date.now();
      // If it has been more then periodMs ms since the last
      // batch, commit immediately.
      if (this.lastSend === -1 || this.lastSend + this.periodMs <= time) {
        this.commitBatch();
      } else {
        // Wait until periodMs ms have elapsed since lastSend.
        this.pendingBatch = true;
        setTimeout(
          this.commitBatch,
          Math.min(this.lastSend + this.periodMs - time, this.periodMs)
        );
      }
    }
  }

  private commitBatch = () => {
    if (this.batchingLayer !== undefined) {
      this.pendingBatch = false;
      this.lastSend = Date.now();
      this.batchingLayer.commitBatch();
    }
  };
}

/**
 * Does nothing; you must call [[BatchingLayer.commitBatch]] manually
 * when you want to send a batch.
 */
export class ManualBatchingStrategy implements BatchingStrategy {
  start(_batchingLayer: BatchingLayer): void {
    // Does nothing.
  }
  stop(): void {
    // Does nothing.
  }
}
