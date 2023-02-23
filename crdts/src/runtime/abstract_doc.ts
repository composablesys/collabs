import { EventEmitter } from "@collabs/core";
import { CRuntime, RuntimeEventsRecord, RuntimeOptions } from "./c_runtime";

const runtimeEventNames: (keyof RuntimeEventsRecord)[] = [
  "Change",
  "Transaction",
  "Send",
  "Load",
];

/**
 * Base class for a Collabs document.
 *
 * By extending AbstractDoc, you can encapsulate
 * a [[CRuntime]] and your [global variable Collabs](guide/initialization.html#global-variable-collabs)
 * in a single "document" object. This is convenient
 * for passing documents around and for working with
 * multiple documents in the same app.
 *
 * <!-- TODO: link to example in docs: Entry Points? -->
 */
export abstract class AbstractDoc extends EventEmitter<RuntimeEventsRecord> {
  /**
   * The [[CRuntime]] for this document's Collabs.
   *
   * Use its [[CRuntime.registerCollab]] method to register your "global variable" Collabs.
   * Typically, you will do so in your constructor.
   */
  protected readonly runtime: CRuntime;

  /**
   * Constructs an AbstractDoc.
   *
   * @param options See [[RuntimeOptions]].
   */
  constructor(options?: RuntimeOptions) {
    super();

    this.runtime = new CRuntime(options);
    for (const eventName of runtimeEventNames) {
      this.runtime.on(eventName, (e) => this.emit(eventName, e));
    }
  }

  /**
   * Wraps `f`'s operations in a transaction. <!-- TODO: see transactions doc -->
   *
   * This method begins a transaction (if needed), calls `f()`,
   * then ends its transaction (if begun). Operations
   * not wrapped in a `transact` call use the constructor's
   * [[RuntimeOptions.autoTransactions]] option.
   *
   * If there are nested `transact` calls (possibly due to [[RuntimeOptions.autoTransactions]]), only the outermost one matters.
   * In particular, only its `info` is used.
   *
   * @param info An optional info string to attach to the transaction.
   * It will appear as the transaction's [[UpdateMeta.info]], including on events' [[CollabEvent.meta]] property.
   */
  transact(f: () => void, info?: string) {
    this.runtime.transact(f, info);
  }

  /**
   * Receives a message from another replica's [[RuntimeEventsRecord.Send]] event.
   * The message's sender must be an AbstractDoc that is a
   * replica of this one.
   *
   * The local Collabs process the message, change the
   * local state accordingly, and emit events describing the
   * local changes.
   *
   * Messages from other replicas should be received eventually and at-least-once. Arbitrary delays, duplicates,
   * reordering, and delivery of messages from this replica
   * are acceptable. Two replicas will be in the same
   * state once they have the same set of received (or sent) messages.
   */
  receive(message: Uint8Array): void {
    this.runtime.receive(message);
  }

  /**
   * Returns saved state describing the current state of this document.
   *
   * The saved state may later be passed to [[load]]
   * on a replica of this AbstractDoc, possibly in a different
   * collaboration session. That is equivalent to delivering all messages
   * that this document has already sent or received.
   */
  save(): Uint8Array {
    return this.runtime.save();
  }

  /**
   * Loads saved state. The saved state must be from
   * a call to [[load]] on an AbstractDoc that is a replica
   * of this one.
   *
   * Calling load is equivalent to calling [[receive]]
   * on every message that influenced the saved state,
   * but it is typically much more efficient.
   *
   * Note that loading will **not** trigger events on
   * Collabs, even if their state changes.
   * It will trigger "Load" and "Change" events on this AbstractDoc.
   *
   * @param savedState Saved state from another replica's [[save]] call.
   */
  load(savedState: Uint8Array): void {
    this.runtime.load(savedState);
  }

  /**
   * Whether [[load]] has completed.
   */
  get isLoaded(): boolean {
    return this.runtime.isLoaded;
  }
}
