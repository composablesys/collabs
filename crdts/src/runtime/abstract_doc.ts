import {
  Collab,
  CollabEventsRecord,
  CollabID,
  EventEmitter,
} from "@collabs/core";
import { CRuntime, RuntimeEventsRecord, RuntimeOptions } from "./c_runtime";

const runtimeEventNames: (keyof RuntimeEventsRecord)[] = [
  "Change",
  "Update",
  "Send",
];

/**
 * Base class for an encapsulated Collabs document, which wraps
 * its [[CRuntime]] and registered Collabs in a single object.
 *
 * To get started with AbstractDoc, see
 * [Documents - Using AbstractDoc](https://collabs.readthedocs.io/en/latest/guide/documents.html#using-abstractdoc).
 *
 * AbstractDoc is network- and storage-agnostic. By itself, it does not connect
 * to remote collaborators or persistent storage.
 * To easily set up networking and storage, configure
 * [Providers](https://collabs.readthedocs.io/en/latest/guide/providers.html).
 * Or, manually manage updates using the methods in this class; see
 * [Updates and Sync](https://collabs.readthedocs.io/en/latest/advanced/updates.html).
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
   * Wraps `f`'s operations in a
   * [transaction](https://collabs.readthedocs.io/en/latest/advanced/updates.html#terminology).
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
   * @param collab A Collab that belongs to this AbstractDoc.
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

  /**
   * An ID that uniquely identifies this replica among
   * all connected replicas.
   *
   * See [[CRuntime.replicaID]].
   */
  get replicaID(): string {
    return this.runtime.replicaID;
  }

  /**
   *
   * The vector clock for our current state, mapping each senderID
   * to the number of applied transactions from that senderID.
   *
   * Our current state includes precisely the transactions
   * with ID `(senderID, senderCounter)` where
   * `senderCounter <= (vectorClock.get(senderID) ?? 0)`.
   */
  vectorClock(): Map<string, number> {
    return this.runtime.vectorClock();
  }
}
