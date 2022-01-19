import {
  BatchingStrategy,
  Collab,
  CollabEvent,
  CRDTApp,
  CRDTRuntime,
  EventEmitter,
  Optional,
  Pre,
} from "@collabs/collabs";
import { ContainerMessage, HostMessage, LoadMessage } from "./message_types";

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
   * @param hostWindow [description]
   * @param metadata   [description]
   * @param options    [description] Default BatchingStrategy
   * is recommended (let the host decide whether to batch more)
   */
  constructor(
    hostWindow: Window,
    metadata: unknown,
    options?: {
      batchingStrategy?: BatchingStrategy;
      debugReplicaId?: string;
    }
  ) {
    super();

    // Setup a channel with hostWindow.
    const channel = new MessageChannel();
    this.messagePort = channel.port1;
    this.messagePort.onmessage = this.messagePortReceive.bind(this);
    hostWindow.postMessage(null, "*", [channel.port2]);

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

    // Send metadata.
    this.messagePortSend({ type: "Metadata", metadata });
  }

  private messagePortSend(message: HostMessage) {
    this.messagePort.postMessage(message);
  }

  private messagePortReceive(e: MessageEvent<ContainerMessage>) {
    switch (e.data.type) {
      case "Receive":
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
        try {
          const saveData = this.app.save();
          this.messagePortSend({
            type: "Saved",
            saveData,
            lastReceivedID: this.lastReceivedID,
            requestID: e.data.requestID,
          });
        } catch (error) {
          this.messagePortSend({
            type: "SaveRequestFailed",
            requestID: e.data.requestID,
            error,
          });
        }
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

    // Load latestSaveData, if present.
    if (loadMessage.latestSaveData === null) {
      this.app.load(Optional.empty());
    } else {
      this.app.load(Optional.of(loadMessage.latestSaveData));
    }

    return loadMessage.latestSaveData === null;
  }

  receiveFurtherMessages() {
    if (!this.app.isLoaded) {
      throw new Error(
        "receiveFurtherMessages must be called after load completes"
      );
    }
    if (this.loadFurtherMessages === null) {
      throw new Error("receiveFurtherMessages has already been called");
    }

    this.loadFurtherMessages.forEach((message) => this.app.receive(message));
    this.lastReceivedID = this.loadFurtherMessages.length - 1;
    this.loadFurtherMessages = null;
    // Let the host know that loading is complete.
    // TODO: doc that this *does* include furtherMessages
    // (i.e., the host's full load, but not the container's).
    this.messagePortSend({ type: "Ready" });
  }

  /**
   * TODO: normally don't access this directly; use the corresponding
   * CRDTApp methods/events instead.
   */
  get runtime(): CRDTRuntime {
    return this.app.runtime;
  }

  get isLoaded(): boolean {
    return this.app.isLoaded;
  }

  get isReady(): boolean {
    return this.isLoaded && this.receiveFurtherMessages === null;
  }
}
