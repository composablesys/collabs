import {
  BatchingStrategy,
  Collab,
  CollabEvent,
  EventEmitter,
  Optional,
  InitToken,
} from "@collabs/core";
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
   * This must be delivered to each other replica's
   * [[CRDTApp.receive]] method, eventually at-least-once.
   */
  Send: SendEvent;
}

/**
 * The entrypoint for a Collabs CRDT app.
 *
 * `CRDTApp` manages a group of CRDT [[Collab]]s, i.e.,
 * [[Collab]]s that are (op-based) CRDTs. (Currently, this includes
 * all `Collab`s that come built-in with @collabs/collabs.)
 * `CRDTApp` lets you register [[Collab]]s and then use them.
 * In return, you must provide networking and storage.
 *
 * For networking, whenever this replica sends a message
 * (the "Send" event), that message must be delivered
 * to every other replica's [[receive]] method, eventually
 * at-least-once.
 *
 * For storage, you must ensure that when a new replica
 * is created, it eventually learns of all prior messages.
 * The `CRDTApp` can learn of a message either by calling
 * [[receive]] on it as usual, or by calling [[load]] with
 * save data from a call to a previous instance's [[save]]
 * method that happened after sending or receiving that message.
 * Save data will generally be smaller than the full message log,
 * and it will also load faster than replaying every message
 * in the log.
 *
 * See the [Getting Started Guide](https://github.com/composablesys/collabs/blob/master/collabs/docs/getting_started_guide.md).
 * `CRDTApp` corresponds to the "app" template (not the "container"
 * template, which uses the alternative class `CRDTContainer`
 * from package @collabs/container).
 *
 * ## `CRDTApp` Lifecycle
 *
 * After construction a `CRDTApp`, you must first
 * register your Collabs using [[registerCollab]].
 * Afterwards, you must eventually call [[load]],
 * even if you do not have prior save data to load
 * (in that case, use [[Optional.empty]]`()` as the argument).
 *  Only then can you
 * use the `CRDTApp`, i.e., you can perform `Collab`
 * operations and call [[receive]].
 */
export class CRDTApp extends EventEmitter<CRDTAppEventsRecord> {
  /**
   * The internal [[CRDTRuntime]], i.e., the value of
   * `runtime` on any [[Collab]].
   */
  readonly runtime: CRDTRuntime;

  /**
   * Options:
   *
   * `causalityGuaranteed` option: Optimization flag.
   * If you can guarantee that messages will always be
   * delivered in causal order (i.e., after all of their
   * causal predecessors), then you may set this to true.
   * Then this class will not bother attaching the
   * vector clock entries needed to ensure causal order
   * delivery.
   * - Important: if any replica (not necessarily
   * the local one), on any network, is not guaranteed
   * causality, then this flag must be false.
   * - When true, redundant re-deliveries are still okay -
   * they will be filtered out as usual.
   * - "All causal predecessors" of a message M means all messages
   * that were passed to [[receive]] before M's "Send"
   * event was emitted.
   */
  constructor(options?: {
    batchingStrategy?: BatchingStrategy;
    causalityGuaranteed?: boolean;
    debugReplicaID?: string;
  }) {
    super();

    this.runtime = new CRDTRuntime(options);
    this.runtime.on("Change", (e) => this.emit("Change", e));
    this.runtime.on("Send", (e) => this.emit("Send", e));
  }

  /**
   * Constructs `preCollab` and registers it as a
   * top-level (global variable) [[Collab]] with the
   * given name.
   *
   * @param  name The [[Collab]]'s name, which must be
   * unique among all registered `Collabs`. E.g., its name
   * as a variable in your program.
   * @param  preCollab The [[Collab]] to construct, typically
   * created using a statement of the form
   * `(initToken) => new collabs.constructor(initToken, [constructor args])`.
   * For example, `(initToken) => new collabs.CCounter(initToken)`
   *
   * @return The registered [[Collab]]. You should assign
   * this to a variable for later use.
   */
  registerCollab<C extends Collab>(
    name: string,
    preCollab: (initToken: InitToken) => C
  ): C {
    return this.runtime.registerCollab(name, preCollab);
  }

  /**
   * Delivers `message` to the [[Collab]]s, so that they update
   * to reflect the operation(s) that triggered this message.
   *
   * This must be called eventually at-least-once for each message
   * sent by another replica that was not included in the loaded
   * save data (i.e., not delivered prior to the [[save]] call
   * that returned that save data). However, it is acceptable
   * to call this method multiple times with the same message
   * or to call it with messages sent by this replica; such
   * redundant deliveries will be ignored.
   *
   * Internally, messages are delivered to [[Collab]]s in
   * causal order. If this message is out-of-order, it will
   * be queued internally until it is ready.
   *
   * @param message The message to receive.
   */
  receive(message: Uint8Array): void {
    this.runtime.receive(message);
  }

  /**
   * Return "save data" describing the app's current
   * state, i.e., the state of all registered [[Collab]]s
   * (as returned by their [[Collab.save]] methods).
   *
   * This save data summarizes the effect of all sent or received
   * messages so far. It can be passed to a future
   * newly-initialized instance's [[load]] method, in place
   * of redelivering all of those messages (although
   * redundant redeliveries are okay and will just be ignored).
   * Doing so is an important optimization, since typically,
   * the save data will be smaller than the complete message log,
   * and also load faster then replaying the log to [[receive]].
   *
   * The save data may be used both for future
   * replicas of this real-world user (e.g., after they
   * reload the app's tab), or to help initialize new user's
   * state, so that they don't have to replay the whole message
   * log.
   *
   * Note: this will commit a pending batch first.
   * So if there is a pending batch, expect messages to
   * be sent during this method. Those messages will
   * be accounted for in the `saveData`.
   *
   * @return save data for a future instance's [[load]]
   */
  save(): Uint8Array {
    return this.runtime.save();
  }

  /**
   * Load save data from a previous instance's call to [[save]] (wrapped in [[Optional.of]]).
   * If there is no such save data, this method still must be called,
   * but with an empty [[Optional]].
   *
   * Loading save data serves as a more efficient substitute
   * for calling [[receive]] on all messages that the previous
   * instance had sent or received before generating `saveData`.
   *
   * This must be called after registering [[Collab]]s but before
   * calling [[receive]] or performing any [[Collab]] operations.
   * Note that loading will **not** trigger events on
   * [[Collab]]s, even if their state changes as a result
   * of loading. Thus you must manually construct views of
   * the loaded state (e.g., the GUI), instead of relying
   * on event handlers like for sent/received messages.
   *
   * @param saveData save data from a previous instance's call to [[save]].
   */
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

  /**
   * Whether [[load]] has completed.
   */
  get isLoaded(): boolean {
    return this.runtime.isLoaded;
  }
}
