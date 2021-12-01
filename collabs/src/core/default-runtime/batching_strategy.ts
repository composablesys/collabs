import { Unsubscribe } from "../event_emitter";
import { Runtime, RuntimeEvent } from "../runtime";

/**
 * A strategy for batching messages sent by a [[Runtime]].
 *
 * A [[Runtime]] does not send messages automatically.
 * Instead, it waits until [[Runtime.commitBatch]] is called,
 * at which point all queued operations are sent as a single
 * message.  A `BatchingStrategy` is responsible for calling
 * [[Runtime.commitBatch]], according to any strategy.
 * Typically, a strategy will commit batches in response
 * to [[Runtime]]'s events, perhaps with a delay to prevent
 * network stress.
 *
 * Except for special purposes, batching strategies should
 * not call commitBatch
 * on Runtime Message events.  Doing so may split up [transactions](TODO: guide/transactions.md)
 * into several batches, violating transaction guarantees.
 *
 * A `BatchingStrategy` can only be used with one [[Runtime]].
 *
 * We recommend [[ImmediateBatchingStrategy]] as a default
 * option, or [[RateLimitBatchingStrategy]] is you want to
 * rate-limit message sending.  Larger batches reduce network
 * traffic, both in terms of the number of separate messages and the
 * total bytes sent, but they increase user-perceived latency.
 */
export interface BatchingStrategy {
  /**
   * Called by `runtime` when this is set as its batching
   * strategy, either in [[Runtime.constructor]] or
   * [[Runtime.setBatchingStrategy]].  This should then
   * apply it strategy to `runtime`, calling `runtime.commitBatch` when appropriate.
   *
   * This method should only be called by `runtime`.  It will
   * only be called once.
   */
  start(runtime: Runtime): void;
  /**
   * Called by `runtime` when this is removed as its
   * batching strategy.  Afterwards, this should no longer
   * call `runtime.commitBatch`.
   *
   * This method should only be called by `runtime`.  It will
   * be called at most once, sometime after `start`.
   */
  stop(): void;
}

/**
 * Sends a batch immediately on each [[Runtime]] "Change" event.
 *
 * This is
 * the fastest-sending reasonable [[BatchingStrategy]].
 */
export class ImmediateBatchingStrategy implements BatchingStrategy {
  private runtime?: Runtime = undefined;
  private unsubscribe?: Unsubscribe = undefined;

  start(runtime: Runtime): void {
    this.runtime = runtime;
    this.unsubscribe = this.runtime.on("Change", this.onchange.bind(this));
  }

  stop(): void {
    this.unsubscribe!();
    this.runtime = undefined;
    this.unsubscribe = undefined;
  }

  private onchange(event: RuntimeEvent) {
    if (event.isLocal) this.runtime!.commitBatch();
  }
}

/**
 * Sends at most one batch per time period, otherwise sending
 * as soon as possible.
 */
export class RateLimitBatchingStrategy implements BatchingStrategy {
  private runtime?: Runtime = undefined;
  private unsubscribeChange?: Unsubscribe = undefined;
  private unsubscribeReceiveBlocked?: Unsubscribe = undefined;

  private pendingBatch = false;
  private lastSend = -1;

  /**
   * @param periodMs The length of the time period in ms
   * @param commitOnReceive If true, whenever `runtime`
   * would receive a message from another replica
   * except that there is a pending batch ("ReceiveBlocked" event),
   * this commits the batch immediately, so that the received message can be processed
   * immediately afterwards.  This may cause the rate limit to be
   * exceeded.
   */
  constructor(readonly periodMs: number, readonly commitOnReceive = false) {}

  start(runtime: Runtime): void {
    this.runtime = runtime;
    this.unsubscribeChange = this.runtime.on(
      "Change",
      this.onchange.bind(this)
    );
    if (this.commitOnReceive) {
      this.unsubscribeReceiveBlocked = this.runtime.on(
        "ReceiveBlocked",
        this.commitBatch
      );
    }
  }

  stop(): void {
    this.unsubscribeChange!();
    if (this.unsubscribeReceiveBlocked) this.unsubscribeReceiveBlocked!();
    this.runtime = undefined;
    this.unsubscribeChange = undefined;
    this.unsubscribeReceiveBlocked = undefined;
  }

  private onchange(event: RuntimeEvent) {
    if (event.isLocal) {
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
  }

  private commitBatch = () => {
    if (this.runtime !== undefined) {
      this.pendingBatch = false;
      this.lastSend = Date.now();
      this.runtime.commitBatch();
    }
  };
}

/**
 * Does nothing; you must call [[Runtime.commitBatch]] manually
 * when you want to send a batch.
 */
export class ManualBatchingStrategy implements BatchingStrategy {
  start(_runtime: Runtime): void {}
  stop(): void {}
}
