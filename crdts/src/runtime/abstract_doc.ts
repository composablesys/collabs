import { EventEmitter } from "@collabs/core";
import { CRuntime, CRuntimeEventsRecord, CRuntimeOptions } from "./c_runtime";

const runtimeEventNames: (keyof CRuntimeEventsRecord)[] = [
  "Change",
  "Transaction",
  "Send",
  "Load",
];

/**
 * The entrypoint for a Collabs CRDT app.
 *
 * Subclass to make your own "CDoc", w/ (probably public readonly)
 * Collabs, added via runtime.registerCollab.
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
 *
 * Subclassing: Maybe also expose idOf/fromID
 * and a UID for cross-doc refs?
 */
export abstract class AbstractDoc extends EventEmitter<CRuntimeEventsRecord> {
  /**
   * The internal [[CRuntime]], i.e., the value of
   * `runtime` on any [[Collab]].
   */
  protected readonly runtime: CRuntime;

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
  constructor(options?: CRuntimeOptions) {
    super();

    this.runtime = new CRuntime(options);
    for (const eventName of runtimeEventNames) {
      this.runtime.on(eventName, (e) => this.emit(eventName, e));
    }
  }

  /**
   * If this is not the outermost transaction, it is ignored (including info).
   * In particular, that can happen if we are inside an auto microtask
   * transaction, due to an earlier out-of-transaction op.
   *
   * @param f
   * @param info An optional info string to attach to the transaction.
   * It will appear on [[CollabEvent]]s as [[UpdateMeta.info]].
   * E.g. a "commit message".
   */
  transact(f: () => void, info?: string) {
    this.runtime.transact(f, info);
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
   * be accounted for in the `savedState`.
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
   * instance had sent or received before generating `savedState`.
   *
   * This must be called after registering [[Collab]]s but before
   * calling [[receive]] or performing any [[Collab]] operations.
   * Note that loading will **not** trigger events on
   * [[Collab]]s, even if their state changes as a result
   * of loading. Thus you must manually construct views of
   * the loaded state (e.g., the GUI), instead of relying
   * on event handlers like for sent/received messages.
   *
   * @param savedState save data from a previous instance's call to [[save]].
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
