import {
  BatchingStrategy,
  Collab,
  CollabEvent,
  CRDTApp,
  CRDTRuntime,
  EventEmitter,
  InitToken,
  Optional,
  Unsubscribe,
} from "@collabs/collabs";
import {
  ContainerMessage,
  HostMessage,
  LoadMessage,
  SaveRequestMessage,
} from "./message_types";

export interface CRDTContainerEventsRecord {
  /**
   * Emitted each time the container's state is changed and
   * is in a reasonable user-facing state
   * (so not in the middle of a transaction).
   *
   * A simple way to keep a GUI in sync with the container is to
   * do `container.on("Change", refreshDisplay)`.
   *
   * Identical to [[CRDTApp]]'s "Change" event.
   */
  Change: CollabEvent;
}

// Opt: is replicaID needed?
// Opt: skip expensive CRDTMetadata where possible
// (e.g. causal ordering is guaranteed for us).

/**
 * Entrypoint for a Collabs container: a network-agnostic,
 * self-contained collaborative app that is deployed using static
 * files only.
 *
 * See [container docs](https://github.com/composablesys/collabs/blob/master/collabs/docs/containers.md).
 *
 * This class is similar to, and replaces, @collabs/collabs
 * `CRDTApp` class as the Collabs entrypoint. This means that
 * it is the first thing you construct when using Collabs,
 * and you register your top-level (global variable) Collabs
 * using [[registerCollab]]. Unlike `CRDTApp`, there are no
 * methods/events for sending or receiving messages or for
 * saving and loading; those are handled for you.
 * Specifically, those happen via communication with an instance
 * of [[CRDTContainerHost]] running in a separate window
 * (currently assumed to be `window.parent`).
 *
 * As the name suggests, `CRDTContainer` is specifically designed for use
 * with `Collab`s that are (op-based) CRDTs. Currently, this includes
 * all `Collab`s that come built-in with @collabs/collabs.
 *
 * ## `CRDTContainer` Lifecycle
 *
 * After construction a `CRDTContainer`, you must first
 * register your Collabs using [[registerCollab]].
 * Afterwards, you must eventually call [[load]], await
 * its Promise, and then call [[ready]]. Only then can you
 * use the `CRDTContainer`, i.e., you can perform `Collab`
 * operations and the container will deliver messages
 * to the `Collab`s.
 *
 * See the
 * [container docs](https://github.com/composablesys/collabs/blob/master/collabs/docs/containers.md)
 * for step-by-step instructions on when to call these methods
 * during your app's setup.
 */
export class CRDTContainer extends EventEmitter<CRDTContainerEventsRecord> {
  private readonly app: CRDTApp;
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
   * Constructs a new `CRDTContainer` that connects to
   * a `CRDTContainerHost` running in `window.parent`.
   *
   * @param options Options to pass to the internal [[CRDTApp]].
   * It is recommended that you leave `batchingStrategy` as
   * its default value (an `ImmediateBatchingStrategy`);
   * that way, the choice of batching is left up to your
   * container host.
   */
  constructor(options?: {
    batchingStrategy?: BatchingStrategy;
    debugReplicaID?: string;
  }) {
    super();

    // Setup a channel with our host's window.
    // For now, this is assumed to be window.parent.
    const channel = new MessageChannel();
    this.messagePort = channel.port1;
    this.messagePort.onmessage = this.messagePortReceive.bind(this);
    window.parent.postMessage(null, "*", [channel.port2]);

    this.app = new CRDTApp({ ...options, causalityGuaranteed: true });
    this.app.on("Change", (e) => this.emit("Change", e));
    this.app.on("Send", (e) => {
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

        this.app.receive(e.data.message);
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
   * Constructs `preCollab` and registers it as a
   * top-level (global variable) `Collab` with the
   * given name.
   *
   * @param  name The `Collab`'s name, which must be
   * unique among all registered `Collabs`. E.g., its name
   * as a variable in your program.
   @param  preCollab The [[Collab]] to construct, typically
   * created using a statement of the form
   * `(init) => new collabs.constructor(init, [constructor args])`.
   * For example, `(init) => new collabs.CCounter(init)`
   * @return The registered `Collab`. You should assign
   * this to a variable for later use.
   */
  registerCollab<C extends Collab>(
    name: string,
    collabCallback: (init: InitToken) => C
  ): C {
    return this.app.registerCollab(name, collabCallback);
  }

  private loadFurtherMessages: Uint8Array[] | null = null;

  /**
   * Waits to receive prior save data from the container host,
   * then applies it to the registered `Collab`s.
   *
   * Analogous to `CRDTApp.load`, except that you don't have
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
    if (loadMessage.latestSaveData === null) {
      this.app.load(Optional.empty());
    } else {
      this.app.load(Optional.of(loadMessage.latestSaveData));
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
   * synchronously.
   *
   * The "further messages" are messages that should have been
   * part of our loaded save data (i.e., they were received
   * before the previous instance was saved), but were
   * not included. This can happen because
   * `CRDTContainerHost.save` must run synchronously,
   * so it does not have time to instruct us to call our
   * internal analog of `CRDTApp.save`. Instead, `CRDTContainerHost`
   * instructs us to do so occasionally, then saves any
   * further messages as part of its own save data.
   * (See [[onSaveRequest]].)
   *
   * Ordinarily, the further messages are delivered to your
   * `Collab`s in an event loop iteration after [[ready]]
   * is called. This makes them indistinguishable from newly
   * received messages. However, you can instead call this
   * method earlier (but after [[load]]). This is never
   * necessary but can serve as an optimization; see
   * the [container docs](https://github.com/composablesys/collabs/blob/master/collabs/docs/containers.md#loading).
   */
  receiveFurtherMessages(): void {
    if (!this.app.isLoaded) {
      throw new Error("not yet loaded");
    }
    if (this.loadFurtherMessages === null) return;

    const furtherMessages = this.loadFurtherMessages;
    this.loadFurtherMessages = null;
    furtherMessages.forEach((message) => this.app.receive(message));
    this.lastReceivedID = furtherMessages.length - 1;
  }

  /**
   * Whether [[load]] has completed (including its Promise).
   */
  get isLoaded(): boolean {
    return this.app.isLoaded;
  }

  /**
   * Whether [[ready]] has completed.
   */
  get isReady(): boolean {
    return this._isReady;
  }

  /**
   * The internal [[CRDTRuntime]], i.e., the value of
   * `runtime` on any `Collab`.
   */
  get runtime(): CRDTRuntime {
    return this.app.runtime;
  }

  private saveRequestHandlers = new Set<
    (caller: this) => void | Promise<void>
  >();

  /**
   * Registers an event handler that is triggered and awaited
   * when the host makes a save request (due to
   * [[CRDTContainerHost.compactSaveData]] being called).
   *
   * The event handler will be run and awaited before
   * calling `runtime.save()` and responding to the save
   * request. So, you can use event handlers to make the
   * save data nicer/smaller before `runtime.save()` is called.
   * E.g., if you have your own [[CRDTContainerHost]],
   * you can call its [[CRDTContainerHost.compactSaveData]]
   * methods and return the resulting Promise, so that our save
   * data uses the nested container's compacted save data.
   *
   * @param handler Callback that handles the event (possibly async)
   * @return An "off" function that removes the event handler when called
   */
  onSaveRequest(handler: (caller: this) => void | Promise<void>): Unsubscribe {
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
      const saveData = this.app.save();
      this.messagePortSend({
        type: "Saved",
        saveData,
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
