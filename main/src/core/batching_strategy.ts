import { Unsubscribe } from "../util";
import { Runtime, RuntimeEvent } from "./runtime";

/**
 * Except for special purposes, don't call commitBatch
 * on Runtime Message events, since those can happen in the
 * middle of a thread of execution, and then receivers might
 * get just one message but not the rest, leaving them in
 * a nonsensical, transient state for a while.
 * @param runtime [description]
 */
export interface BatchingStrategy {
  start(runtime: Runtime): void;
  stop(): void;
}

/**
 * Sends a batch immediately on each Change event.  This is
 * the fastest-sending (reasonable) BatchingStrategy.
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
 * Sends at most one batch per period, otherwise sending
 * as soon as possible.
 */
export class RateLimitBatchingStrategy implements BatchingStrategy {
  private runtime?: Runtime = undefined;
  private unsubscribeChange?: Unsubscribe = undefined;
  private unsubscribeReceiveBlocked?: Unsubscribe = undefined;

  private pendingBatch = false;
  private lastSend = -1;

  /**
   * [constructor description]
   * @param periodMs              [description]
   * @param commitOnReceive=false if true, whenever tuntime
   * would receive a message from another replica
   * except that there is a pending batch (ReceiveBlocked event),
   * commits the batch immediately (even if the period is not
   * up), so that the received message can be processed
   * immediately.
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
 * Does nothing; you must call runtime.commitBatch() manually
 * when you want to send a batch.
 */
export class ManualBatchingStrategy implements BatchingStrategy {
  start(_runtime: Runtime): void {}
  stop(): void {}
}
