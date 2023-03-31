import { Collab, CollabEvent, CRuntime, InitToken } from "@collabs/collabs";
import { EventEmitter } from "@collabs/core";
import {
  ContainerMessage,
  HostMessage,
  LoadMessage,
  SaveRequestMessage,
} from "./message_types";

/**
 * Events record for [[CContainer]].
 */
export interface CContainerEventsRecord {
  /**
   * Emitted at the end of each transaction (local or remote).
   *
   * The event's [[CollabEvent.updateMeta]] is the same as for
   * all messages in the transaction.
   */
  Transaction: CollabEvent;
  /**
   * Emitted after each synchronous set of changes. This
   * is a good time to rerender the GUI.
   *
   * Specifically, this is emitted at the end of:
   * - A local transaction.
   * - A remote transaction.
   * - [[CContainer.load]].
   */
  Change: object;
}

/**
 * Entrypoint for a Collabs container: a network-agnostic,
 * self-contained collaborative app that is deployed using static
 * files only.
 *
 * For a usage example, see [Containers](../../../guide/containers.html).
 *
 * This class is similar to, and replaces, [[CRuntime]] / [[AbstractDoc]].
 * Unlike `CRuntime`, there are no
 * methods/events for sending or receiving messages or for
 * saving and loading; those are handled for you.
 */
export class CContainer extends EventEmitter<CContainerEventsRecord> {
  private readonly _runtime: CRuntime;
  private readonly messagePort: MessagePort;

  private _isReady = false;

  /**
   * The ID of the last received message (-1 if none).
   *
   * This counts messages received as a result of loading.
   */
  private lastReceivedID = -1;

  private loadEarlyMessage: LoadMessage | null = null;
  private loadResolve: ((message: LoadMessage) => void) | null = null;

  /**
   * Constructs a new CContainer that connects to
   * a [[CContainerHost]] running in `window.parent`.
   *
   * @param options See [[RuntimeOptions]].
   */
  constructor(options?: {
    debugReplicaID?: string;
    autoTransactions?: "microtask" | "op" | "error";
  }) {
    super();

    // Setup a channel with our host's window.
    // For now, this is assumed to be window.parent.
    const channel = new MessageChannel();
    this.messagePort = channel.port1;
    this.messagePort.onmessage = this.messagePortReceive.bind(this);
    window.parent.postMessage(null, "*", [channel.port2]);

    this._runtime = new CRuntime({ ...options, causalityGuaranteed: true });
    this._runtime.on("Change", (e) => this.emit("Change", e));
    this._runtime.on("Transaction", (e) => this.emit("Transaction", e));
    this._runtime.on("Send", (e) => {
      if (!this.isReady) {
        if (!this.isLoaded) {
          throw new Error(
            "Not yet ready (pending: load, receiveFurtherMessages)"
          );
        } else {
          throw new Error("Not yet ready (pending: receiveFurtherMessages)");
        }
      }
      this.messagePortSend({
        type: "Send",
        message: e.message,
        predID: this.lastReceivedID,
      });
    });
  }

  private messagePortSend(message: HostMessage) {
    this.messagePort.postMessage(message);
  }

  private messagePortReceive(e: MessageEvent<ContainerMessage>) {
    switch (e.data.type) {
      case "Receive":
        // Make sure that loadFurtherMessages are processed
        // before any new messages. Probably this is assured
        // because the setTimeout in ready() should be queued
        // before any future MessagePort messages, but it
        // doesn't hurt to double check.
        this.receiveFurtherMessages();

        this._runtime.receive(e.data.message);
        this.lastReceivedID = e.data.id;
        break;
      case "Load":
        // Dispatch the load message where [[load]] can get
        // it. If [[load]] was called already, we pass the message
        // to its Promise resolver, this.loadResolve; else
        // we store it in this.loadMessage.
        if (this.loadResolve !== null) {
          this.loadResolve(e.data);
          this.loadResolve = null;
        } else {
          this.loadEarlyMessage = e.data;
        }
        break;
      case "SaveRequest":
        // Note we ignore the returned Promise; processSaveRequest
        // completes independently.
        void this.processSaveRequest(e.data);
        break;
      default:
        throw new Error("bad e.data.type: " + e.data);
    }
  }

  /**
   * Registers a [[Collab]] as a ["global variable" Collab](../../../guide/initialization.html#global-variable-collabs)
   * in this container with the given name.
   *
   * Typically, you will call this method when the page loads, with the style:
   * ```ts
   * const foo = container.registerCollab("foo", (init) => new FooClass(init, constructor args...));
   * ```
   * where `const foo: FooClass;` is a top-level variable.
   *
   * Registrations must be identical across all replicas, i.e., all CContainer instances running in
   * connected [[CContainerHost]]s.
   *
   * @param name A name for this property, unique among
   * this container's `registerCollab` calls.
   * We recommend using the same name as the property,
   * but you can also use short strings to reduce
   * network usage ("", "0", "1", ...).
   * @param collabCallback A callback that uses the
   * given [[InitToken]] to construct the registered [[Collab]].
   * @return The registered Collab.
   */
  registerCollab<C extends Collab>(
    name: string,
    collabCallback: (init: InitToken) => C
  ): C {
    return this._runtime.registerCollab(name, collabCallback);
  }

  /**
   * Wraps `f`'s operations in a transaction. <!-- TODO: see transactions doc -->
   *
   * This method begins a transaction (if needed), calls `f()`,
   * then ends its transaction (if begun). Operations
   * not wrapped in a `transact` call use the constructor's
   * [[RuntimeOptions.autoTransactions]] option.
   *
   * If there are nested `transact` calls (possibly due to
   * [[RuntimeOptions.autoTransactions]]), only the outermost one matters.
   *
   * @param info An optional info string to attach to the transaction.
   * It will appear as the transaction's [[UpdateMeta.info]], including on events' [[CollabEvent.meta]] property.
   */
  transact(f: () => void) {
    this.runtime.transact(f);
  }

  private loadFurtherMessages: Uint8Array[] | null = null;

  /**
   * Waits to receive prior save data from the container host,
   * then applies it to the registered `Collab`s.
   *
   * Analogous to `CRuntime.load`, except that you don't have
   * to provide the save data; the host does that for us.
   *
   * @return Whether loading was skipped, i.e., there was no
   * prior save data.
   */
  async load(): Promise<boolean> {
    // Get the load message from messagePortReceive.
    let loadMessage: LoadMessage;
    if (this.loadEarlyMessage !== null) {
      // loadMessage already arrived.
      // Do it in a Promise for consistency with the other
      // case, so that if the caller does stuff in the same
      // thread as loadSaveData (without awaiting), it will
      // always happen before loading.
      loadMessage = await Promise.resolve(this.loadEarlyMessage);
    } else {
      // Not yet arrived; await it.
      loadMessage = await new Promise((resolve) => {
        this.loadResolve = resolve;
      });
    }

    // Store furtherMessages for receiveFurtherMessages.
    this.loadFurtherMessages = loadMessage.furtherMessages;

    // Load latestSaveData, if present.
    if (loadMessage.latestSaveData !== null) {
      this._runtime.load(loadMessage.latestSaveData);
    }

    return loadMessage.latestSaveData === null;
  }

  /**
   * Signals to your container host that you are ready.
   *
   * Your host will then reveal the container to the user
   * (e.g., unhide its IFrame), allow user input, and start
   * delivering messages - both new messages from collaborators,
   * and old messages that didn't make it into the loaded state.
   */
  ready(): void {
    if (this.loadFurtherMessages !== null) {
      setTimeout(() => this.receiveFurtherMessages());
    }
    this.messagePortSend({ type: "Ready" });
    this._isReady = true;
  }

  /**
   * Optionally, this may be called after [[load]] to cause
   * all "further messages" to be delivered immediately and
   * synchronously. You can use this to optimize startup,
   * as described in the [container docs](../../../guide/containers.html).
   *
   * The "further messages" are messages that should have been
   * part of our loaded save data (i.e., they were received
   * before the previous instance was saved), but were
   * not included for technical reasons.
   *
   * If not called, the "further messages" will be delivered in an event loop iteration after [[ready]] is called, like new messages.
   */
  receiveFurtherMessages(): void {
    if (this.loadFurtherMessages === null) return;

    const furtherMessages = this.loadFurtherMessages;
    this.loadFurtherMessages = null;
    furtherMessages.forEach((message) => this._runtime.receive(message));
    this.lastReceivedID = furtherMessages.length - 1;
  }

  /**
   * Whether [[ready]] has completed.
   */
  get isReady(): boolean {
    return this._isReady;
  }

  /**
   * The [[CRuntime]] for this container's Collabs.
   */
  get runtime(): CRuntime {
    return this._runtime;
  }

  private saveRequestHandlers = new Set<
    (caller: this) => void | Promise<void>
  >();

  /**
   * Registers an event handler that is triggered and awaited
   * when the host makes a save request (due to
   * [[CContainerHost.compactSaveData]] being called).
   *
   * The event handler will be run and awaited before
   * calling `runtime.save()` and responding to the save
   * request. So, you can use event handlers to make the
   * save data nicer/smaller before `runtime.save()` is called.
   * E.g., if you have your own [[CContainerHost]],
   * you can call its [[CContainerHost.compactSaveData]]
   * methods and return the resulting Promise, so that our save
   * data uses the nested container's compacted save data.
   *
   * @param handler Callback that handles the event (possibly async)
   * @return An "off" function that removes the event handler when called
   */
  onSaveRequest(handler: (caller: this) => void | Promise<void>): () => void {
    this.saveRequestHandlers.add(handler);
    return () => this.saveRequestHandlers.delete(handler);
  }

  private async processSaveRequest(message: SaveRequestMessage): Promise<void> {
    try {
      // Make sure that loadFurtherMessages are processed
      // before saving. Probably this is assured
      // because the setTimeout in ready() should be queued
      // before any future MessagePort messages, but it
      // doesn't hurt to double check.
      this.receiveFurtherMessages();

      // Wait for SaveRequest handlers to complete.
      const toAwait: Promise<void>[] = [];
      for (const handler of this.saveRequestHandlers) {
        try {
          const ret = handler(this);
          if (ret instanceof Promise) toAwait.push(ret);
        } catch (err) {
          console.error("Error in SaveRequest event handler:\n", err);
        }
      }
      await Promise.all(toAwait);

      // Save and respond to the request.
      const savedState = this._runtime.save();
      this.messagePortSend({
        type: "Saved",
        savedState,
        lastReceivedID: this.lastReceivedID,
        requestID: message.requestID,
      });
    } catch (err) {
      this.messagePortSend({
        type: "SaveRequestFailed",
        requestID: message.requestID,
        errorToString: String(err),
      });
      throw err;
    }
  }
}
