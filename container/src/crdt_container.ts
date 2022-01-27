import {
  BatchingStrategy,
  Collab,
  CollabEvent,
  CRDTApp,
  CRDTRuntime,
  EventEmitter,
  Optional,
  Pre,
  Unsubscribe,
} from "@collabs/collabs";
import {
  ContainerMessage,
  HostMessage,
  LoadMessage,
  SaveRequestMessage,
} from "./message_types";

interface CRDTContainerEventsRecord {
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
// Opt: skip expensive CRDTExtraMetadata where possible
// (e.g. causal ordering is guaranteed for us).

/**
 * Replaces CRDTApp for use in a container.
 *
 * TODO: usage (ref docs)
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
   * [constructor description]
   * @param options    [description] Default BatchingStrategy
   * is recommended (let the host decide whether to batch more).
   */
  constructor(options?: {
    batchingStrategy?: BatchingStrategy;
    debugReplicaId?: string;
  }) {
    super();

    // Setup a channel with our host's window.
    // For now, this is assumed to be window.parent.
    const channel = new MessageChannel();
    this.messagePort = channel.port1;
    this.messagePort.onmessage = this.messagePortReceive.bind(this);
    window.parent.postMessage(null, "*", [channel.port2]);

    this.app = new CRDTApp(options);
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

  registerCollab<C extends Collab>(name: string, preCollab: Pre<C>): C {
    return this.app.registerCollab(name, preCollab);
  }

  private loadFurtherMessages: Uint8Array[] | null = null;

  /**
   * TODO. Note "further messages" are not delivered until
   * next event loop (as if they were newly received).
   * (TODO: event to tell when *that* is done, in case you care?
   * E.g. for optimization - don't construct the view until
   * then, if you know what you're doing and when to register
   * which event handlers.)
   *
   * @return whether loading was skipped, i.e., there was no
   * prior save data. (TODO: what if further messages only?)
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

  ready(): void {
    if (this.loadFurtherMessages !== null) {
      setTimeout(() => this.receiveFurtherMessages());
    }
    this.messagePortSend({ type: "Ready" });
    this._isReady = true;
  }

  /**
   * TODO: optional (just an opt); warnings; called
   * automatically after the ready event loop and before
   * the next message or save request, if not called manually.
   * Usage: loading before adding event listeners (may cause issues);
   * waiting for GUI to process further messages before calling
   * ready, so that (if the host hides you during loading) the
   * user doesn't see that loading. (Although I guess they won't
   * see funny flashing because you'll do it all sync anyway;
   * they just might see the loaded state sit there frozen for
   * a second).
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

  get isLoaded(): boolean {
    return this.app.isLoaded;
  }

  get isReady(): boolean {
    return this._isReady;
  }

  /**
   * TODO: normally don't access this directly; use the corresponding
   * CRDTApp methods/events instead.
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
          // Don't let the error block other event handlers
          // or interrupt the save request as a whole
          // (there's still benefit in calling runtime.save()),
          // but still make it print
          // its error like it was unhandled.
          void Promise.resolve().then(() => {
            throw err;
          });
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
    } catch (error) {
      this.messagePortSend({
        type: "SaveRequestFailed",
        requestID: message.requestID,
        errorToString: String(error),
      });
      // Also "throw" the error separately, so it gets
      // logged in the console.
      void Promise.resolve().then(() => {
        throw error;
      });
    }
  }
}
