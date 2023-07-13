import {
  Collab,
  CollabEventsRecord,
  CollabID,
  EventEmitter,
} from "@collabs/core";
import { CRuntime, RuntimeEventsRecord, RuntimeOptions } from "./c_runtime";

const runtimeEventNames: (keyof RuntimeEventsRecord)[] = [
  "Change",
  "Transaction",
  "Send",
];

/**
 * Base class for a Collabs document.
 *
 * By extending AbstractDoc, you can encapsulate
 * a [[CRuntime]] and your [global variable Collabs](../../..guide/initialization.html#global-variable-collabs)
 * in a single "document" object. This is convenient
 * for passing documents around and for working with
 * multiple documents in the same app.
 *
 * See [Data Modeling](../../../guide/data_modeling.html#abstractdoc) for a usage example.
 *
 *
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
   * If there are nested `transact` calls (possibly due to [[RuntimeOptions.autoTransactions]]),
   * only the outermost one matters.
   */
  transact(f: () => void) {
    this.runtime.transact(f);
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
   * reordering, and delivery of (redundant) messages from this replica
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
   * The local Collabs merge in the saved state, change the
   * local state accordingly, and emit events describing the
   * local changes.
   *
   * Calling load is roughly equivalent to calling [[receive]]
   * on every message that influenced the saved state
   * (skipping already-received messages),
   * but it is typically much more efficient.
   *
   * @param savedState Saved state from another replica's [[save]] call.
   */
  load(savedState: Uint8Array): void {
    this.runtime.load(savedState);
  }

  /**
   * Returns a [[CollabID]] for the given Collab.
   *
   * The CollabID may be passed to [[fromID]] on any replica of this
   * AbstractDoc to obtain that replica's copy of `collab`.
   *
   * @param collab A Collab that belongs to this runtime.
   */
  idOf<C extends Collab<CollabEventsRecord>>(collab: C): CollabID<C> {
    if (collab.runtime !== this.runtime) {
      throw new Error("idOf called with Collab from different AbstractDoc");
    }
    return this.runtime.idOf(collab);
  }

  /**
   * Inverse of [[idOf]].
   *
   * Specifically, given a [[CollabID]] returned by [[idOf]] on some replica of
   * this AbstractDoc, returns this replica's copy of the original
   * `collab`. If that Collab does not exist (e.g., it was deleted
   * or it is not present in this program version), returns undefined.
   *
   * @param id A CollabID from [[idOf]].
   */
  fromID<C extends Collab<CollabEventsRecord>>(id: CollabID<C>): C | undefined {
    return this.runtime.fromID(id);
  }

  get replicaID(): string {
    return this.runtime.replicaID;
  }
}
