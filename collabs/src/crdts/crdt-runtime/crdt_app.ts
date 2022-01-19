import { BatchingStrategy } from "../../constructions/batching_strategy";
import { Collab, CollabEvent, EventEmitter, Pre } from "../../core";
import { Optional } from "../../util";
import { CRDTRuntime, SendEvent } from "./crdt_runtime";

export interface CRDTAppEventsRecord {
  /**
   * Emitted each time the [[CRDTApp]]'s state is changed and
   * is in a reasonable user-facing state
   * (so not in the middle of a transaction).
   *
   * A simple way to keep a GUI in sync with the app is to
   * do `app.on("Change", refreshDisplay)`.
   */
  Change: CollabEvent;
  /**
   * Emitted when a message is to be sent.
   *
   * TODO: reqs: needs to be delivered to each other replica's
   * [[App.receive]] at least once.
   */
  Send: SendEvent;
}

export class CRDTApp extends EventEmitter<CRDTAppEventsRecord> {
  /**
   * TODO: normally don't access this directly; use the corresponding
   * CRDTApp methods/events instead.
   */
  readonly runtime: CRDTRuntime;

  constructor(options?: {
    batchingStrategy?: BatchingStrategy;
    debugReplicaId?: string;
  }) {
    super();

    this.runtime = new CRDTRuntime(options);
    this.runtime.on("Change", (e) => this.emit("Change", e));
    this.runtime.on("Send", (e) => this.emit("Send", e));
  }

  registerCollab<C extends Collab>(name: string, preCollab: Pre<C>): C {
    return this.runtime.registerCollab(name, preCollab);
  }

  receive(message: Uint8Array): void {
    this.runtime.receive(message);
  }

  save(): Uint8Array {
    return this.runtime.save();
  }

  load(saveData: Optional<Uint8Array>): void {
    this.runtime.load(saveData);
  }

  // ---Less common user-facing methods---

  /**
   * Replaces the current [[BatchingStrategy]] with
   * `batchingStrategy`.
   *
   * @param  batchingStrategy [description]
   */
  setBatchingStrategy(batchingStrategy: BatchingStrategy): void {
    this.runtime.setBatchingStrategy(batchingStrategy);
  }

  /**
   * Immediately commits the current batch (if present).
   *
   * Normally, you don't need to call this method directly;
   * instead, the set [[BatchingStrategy]] will do it for you.
   */
  commitBatch(): void {
    this.runtime.commitBatch();
  }

  get isLoaded(): boolean {
    return this.runtime.isLoaded;
  }
}
