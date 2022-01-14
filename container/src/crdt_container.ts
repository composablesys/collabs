import {
  BatchingStrategy,
  BroadcastNetwork,
  Collab,
  CollabEvent,
  CRDTApp,
  CRDTRuntime,
  EventEmitter,
  Optional,
  Pre,
} from "@collabs/collabs";
import { ContainerMessage, HostMessage } from "./message_types";

class CRDTContainerNetwork implements BroadcastNetwork {
  constructor(private readonly sendFunc: (message: Uint8Array) => void) {}

  onreceive!: (message: Uint8Array) => void;

  send(message: Uint8Array): void {
    this.sendFunc(message);
  }

  save(): Uint8Array {
    return new Uint8Array(0);
  }

  load(_saveData: Optional<Uint8Array>): void {}
}

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
 * [constructor description]
 *
 * Replaces CRDTApp for use in a container.
 */
export class CRDTContainer extends EventEmitter<CRDTContainerEventsRecord> {
  private readonly network: CRDTContainerNetwork;
  private readonly app: CRDTApp;
  private messagePort: MessagePort | null = null;
  /**
   * The ID of the last received message (-1 if none).
   *
   * This counts messages received as a result of loading.
   */
  private lastReceivedID = -1;
  /**
   * Queue for messages to be sent over messagePort
   * before it exists.
   */
  private sendQueue: HostMessage[] | null = [];
  private readonly loadedPromise: Promise<boolean>;
  private loadedResolve: ((value: boolean) => void) | null = null;

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

    this.network = new CRDTContainerNetwork((message) =>
      this.messagePortSend({
        type: "Send",
        message,
        predID: this.lastReceivedID,
      })
    );
    this.app = new CRDTApp(this.network, options);

    // Listen for this.messagePort.
    window.addEventListener(
      "message",
      (e) => {
        if (e.source !== hostWindow) return;
        // TODO: other checks?
        this.messagePort = e.ports[0];
        this.messagePort.onmessage = this.messagePortReceive.bind(this);
        // Send queued messages.
        this.sendQueue!.forEach((message) =>
          this.messagePort!.postMessage(message)
        );
      },
      { once: true }
    );

    // Setup loadedPromise.
    this.loadedPromise = new Promise<boolean>((resolve) => {
      this.loadedResolve = resolve;
    });

    // Send initial metadata.
    this.setMetadata(metadata);
  }

  private messagePortSend(message: HostMessage) {
    if (this.messagePort === null) {
      this.sendQueue!.push(message);
    } else {
      this.messagePort.postMessage(message);
    }
  }

  private messagePortReceive(e: MessageEvent<ContainerMessage>) {
    switch (e.data.type) {
      case "Receive":
        this.network.onreceive(e.data.message);
        this.lastReceivedID = e.data.id;
        break;
      case "Load":
        if (e.data.skipped) {
          this.app.load(Optional.empty());
        } else {
          // Load latestSaveData, if present.
          // TODO: issue: loading due to saveData won't gen
          // events, but loading due to further messages will.
          // In part., you might see messages before loaded()
          // resolves, but you should (?) ignore them.
          // Need to clarify or working around this.
          if (e.data.latestSaveData === null) {
            this.app.load(Optional.empty());
          } else {
            this.app.load(Optional.of(e.data.latestSaveData));
          }
          // Deliver further messages (messages in the saved
          // state that didn't make it into latestSaveData).
          e.data.furtherMessages.forEach((message) =>
            this.network.onreceive(message)
          );
          // TODO: this could be too late if something weird
          // happens during the above forEach?
          this.lastReceivedID = e.data.lastID;
        }
        // Let the host and our user know that loading
        // is complete.
        this.messagePortSend({ type: "Ready" });
        this.loadedResolve!(e.data.skipped);
        this.loadedResolve = null;
        break;
      default:
        throw new Error("bad e.data.type: " + e.data.type);
    }
  }

  registerCollab<C extends Collab>(name: string, preCollab: Pre<C>): C {
    return this.app.registerCollab(name, preCollab);
  }

  /**
   * TODO: need to await this (in place of calling load)
   * before users can do anything!
   * @return true if a previous save was loaded (as opposed
   * to skip loading, for a new app instance)
   */
  loaded(): Promise<boolean> {
    return this.loadedPromise;
  }

  setMetadata(metadata: unknown) {
    this.messagePortSend({ type: "Metadata", metadata });
  }

  get runtime(): CRDTRuntime {
    return this.app.runtime;
  }
}
