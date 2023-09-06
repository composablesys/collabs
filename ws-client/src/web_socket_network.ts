import {
  AbstractDoc,
  CRuntime,
  EventEmitter,
  mergeMessages,
} from "@collabs/collabs";
import { nonNull, protobufHas } from "@collabs/core";
import {
  Ack,
  IWSMessage,
  Receive,
  SubscribeDenied,
  WSMessage,
  Welcome,
} from "../generated/proto_compiled";
import { UpdateType, stringToEnum } from "./update_type";

type Doc = AbstractDoc | CRuntime;

/** Events record for [[WebSocketNetwork]]. */
export interface WebSocketNetworkEventsRecord {
  /**
   * Emitted when we connect to the server.
   */
  Connect: {};
  /**
   * Emitted when we disconnect from the server.
   *
   * This is also emitted if we fail to connect to the server.
   */
  Disconnect: {
    /**
     * The reason for the disconnection:
     * - "close": A WebSocket "close" event.
     * - "error": A WebSocket "error" event.
     * - "manual": A call to [[WebSocketNetwork.disconnect]] or
     * [[WebSocketNetwork.close]].
     */
    cause: "close" | "error" | "manual";
    /**
     * The WebSocket event, if [[cause]] is "close" or "error" (else null).
     */
    wsEvent: CloseEvent | Event | null;
  };
  /**
   * Emitted after all of doc's local changes are confirmed saved to the server.
   */
  Save: { doc: AbstractDoc | CRuntime; docID: string };
  /**
   * Emitted after doc loads the server's current state.
   *
   * This may be emitted multiple times for a doc - in particular, after
   * reconnecting.
   */
  Load: { doc: AbstractDoc | CRuntime; docID: string };
  /**
   * Emitted if we subscribe to a docID but the server denies us access.
   */
  SubscribeDenied: { doc: AbstractDoc | CRuntime; docID: string };
}

interface DocInfo {
  readonly docID: string;
  readonly batchRemoteMS: number | null;
  batchSendMS: number | null;
  /** The WebSocketNetwork.localCounter value of our last sent message. */
  lastSent: number;
  /** Pending remote updates, to be delivered in the next remote batch. */
  nextRemoteBatch: Receive[];
  /** Pending local messages, to be sent in the next send batch. */
  nextSendBatch: Uint8Array[];
  sendBatchTimeout?: ReturnType<typeof setTimeout>;
  off?: () => void;
  subscribeDenied?: true;
  unsubscribed?: true;
}

/**
 * Syncs updates to Collabs documents via a server over
 * WebSockets.
 *
 * The server is in package [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server).
 *
 * This class is designed to work seamlessly with other sources of updates,
 * such as [@collabs/indexeddb](https://www.npmjs.com/package/@collabs/indexeddb).
 * In particular, updates from those sources will be synced to the server
 * alongside local operations.
 * - Exception: Updates from other tabs via
 * [@collabs/tab-sync](https://www.npmjs.com/package/@collabs/tab-sync) are not
 * sent, since the source tab should send them.
 */
export class WebSocketNetwork extends EventEmitter<WebSocketNetworkEventsRecord> {
  private ws: WebSocket | null = null;
  /** A counter for our sent messages across all docs. */
  private localCounter = 0;

  private readonly subs = new Map<Doc, DocInfo>();
  /** Inverse map docID -> Doc. */
  private readonly docsByID = new Map<string, Doc>();

  private closed = false;

  /**
   * Constructs a WebSocketNetwork.
   *
   * You typically only need one WebSocketNetwork per app, since it
   * can [[subscribe]] multiple documents.
   *
   * @param url The WebSocket url to connect to.
   * @param options.connect Set to false to skip connecting in the constructor.
   * If so, you will need to call [[connect]] later.
   */
  constructor(
    private readonly url: string,
    options: { connect?: boolean } = {}
  ) {
    super();

    if (options.connect ?? true) this.connect();
  }

  // Doc: may call multiple times, e.g., reconnecting.
  // Okay to call if already connected.
  // E.g. net.on("Disconnect", () => setTimeout(net.connect(), 2000))
  // will (repeatedly) try to reconnect after a disconnection.
  /**
   * Connects to the server.
   *
   * Once connected, all subscribed docs sync their current states with
   * the server, then send and receive further updates as they occur.
   *
   * If we disconnect due to a network error, you will need to call this method
   * again to reconnect. E.g., to try to reconnect every 2 seconds after
   * a disconnection:
   * ```ts
   * wsNetwork.on("Disconnect", () => setTimeout(wsNetwork.connect(), 2000));
   * ```
   * (Since failed connection attempts also emit a "Disconnect" event, this will
   * repeat until a connection succeeds.)
   */
  connect(): void {
    if (this.closed) throw new Error("Already closed");
    if (this.connected) return;

    const ws = new WebSocket(this.url);
    ws.binaryType = "arraybuffer";
    this.ws = ws;
    ws.addEventListener("open", () => {
      if (ws !== this.ws) return;

      // (Re-) subscribe to all docIDs.
      if (this.docsByID.size !== 0) {
        this.sendInternal({
          subscribe: {
            docIDs: [...this.docsByID.keys()],
          },
        });
      }

      // Emit event.
      this.emit("Connect", {});
    });
    ws.addEventListener("message", (e) =>
      this.wsReceive(e.data as ArrayBuffer)
    );
    ws.addEventListener("close", (e) => this.wsDisconnect(ws, "close", e));
    ws.addEventListener("error", (e) => this.wsDisconnect(ws, "error", e));
  }

  private wsDisconnect(
    caller: WebSocket,
    cause: "close" | "error",
    e: CloseEvent | Event
  ) {
    if (caller !== this.ws) return;

    this.ws = null;

    this.emit("Disconnect", { cause, wsEvent: e });
  }

  /**
   * Disconnects from the server or aborts an in-progress connection attempt.
   *
   * You may reconnect later by calling [[connect]].
   */
  disconnect() {
    this.ws?.close();

    // Note that changing this.ws right away will cause wsDisconnect to
    // ignore the WebSocket close event, which is dispatched async.
    // We instead emit our own Disconnect event.
    this.ws = null;

    this.emit("Disconnect", { cause: "manual", wsEvent: null });
  }

  /**
   * Whether we have an open WebSocket connection to the server.
   */
  get connected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  /**
   * Sends the given message if the connection is open.
   *
   * We do not guarantee eventual receipt - if the server is not open,
   * or if sending fails, the message will not reach the server.
   * So make sure to re-do message's effect on open.
   */
  private sendInternal(message: IWSMessage) {
    if (this.ws != null && this.ws.readyState == WebSocket.OPEN) {
      this.ws.send(WSMessage.encode(message).finish());
    }
  }

  /**
   * Subscribes `doc` to updates for `docID`.
   *
   * `doc` will send and receive updates with the server's copy of `docID`.
   * It will also sync initial states with
   * the server, to ensure that `doc` and the server start up-to-date.
   *
   * @param doc The document to subscribe.
   * @param docID An arbitrary string that identifies which updates to use.
   * @param options.batchRemoteMS If set, remote updates to doc are
   * delivered at most once every `batchRemoteMS` ms, emitting only a single
   * doc "Change" event. This limits render frequency.
   * @param options.batchSendMS **Experimental** If set, local updates to
   * doc are pushed to the server at most once every `batchSendMS` ms.
   * This reduces the load on the server and on remote users, but increases
   * the time before a local update is saved and visible remotely.
   * @throws If `doc` is already subscribed to a docID.
   * @throws If another doc is subscribed to `docID`.
   */
  subscribe(
    doc: AbstractDoc | CRuntime,
    docID: string,
    options: { batchRemoteMS?: number; batchSendMS?: number } = {}
  ) {
    if (this.closed) throw new Error("Already closed");
    if (this.subs.has(doc)) {
      throw new Error("doc is already subscribed to a docID");
    }
    if (this.docsByID.has(docID)) {
      throw new Error("Unsupported: multiple docs with same docID");
    }

    this.subs.set(doc, {
      docID,
      lastSent: 0,
      nextRemoteBatch: [],
      nextSendBatch: [],
      batchRemoteMS: options.batchRemoteMS ?? null,
      batchSendMS: options.batchSendMS ?? null,
    });
    this.docsByID.set(docID, doc);
    this.sendInternal({ subscribe: { docIDs: [docID] } });

    // Wait to subscribe to doc updates until after the first time
    // we send our whole state (on Welcome).
  }

  /**
   * **Experimental**
   *
   * Changes the `batchSendMS` for a subscribed doc.
   *
   * See [[subscribe]]'s `options.batchSendMS`.
   */
  setBatchSendMS(
    doc: AbstractDoc | CRuntime,
    batchSendMS: number | null
  ): void {
    const info = this.subs.get(doc);
    if (info === undefined) return;

    if (batchSendMS === null || batchSendMS < (info.batchSendMS ?? 0)) {
      // The new batch length is shorter than the old one.
      // To prevent unexpected delays, send the current batch now.
      if (info.sendBatchTimeout !== undefined) {
        clearTimeout(info.sendBatchTimeout);
      }
      this.sendBatch(info);
    }
    info.batchSendMS = batchSendMS;
  }

  private sendBatch(info: DocInfo): void {
    // Skip if we've been unsubscribed already.
    if (info.unsubscribed) return;

    if (info.nextSendBatch.length === 0) return;

    const merged = mergeMessages(info.nextSendBatch);
    info.nextSendBatch = [];
    info.sendBatchTimeout = undefined;

    this.sendInternal({
      send: {
        docID: info.docID,
        update: merged,
        updateType: UpdateType.Message,
        localCounter: ++this.localCounter,
      },
    });
    info.lastSent = this.localCounter;
  }

  /**
   * Unsubscribes `doc` from its subscribed `docID` (if any).
   *
   * `doc` will no longer send or receive updates with the server.
   */
  unsubscribe(doc: AbstractDoc | CRuntime) {
    const info = this.subs.get(doc);
    if (info === undefined || info.unsubscribed) return;

    // Push out the pending send batch.
    this.sendBatch(info);

    info.unsubscribed = true;
    this.subs.delete(doc);
    this.docsByID.delete(info.docID);
    if (info.off !== undefined) info.off();
    this.sendInternal({ unsubscribe: { docID: info.docID } });
  }

  private wsReceive(encoded: ArrayBuffer) {
    const message = WSMessage.decode(new Uint8Array(encoded));
    switch (message.type) {
      case "welcome":
        this.onWelcome(message.welcome as Welcome);
        break;
      case "subscribeDenied":
        this.onSubscribeDenied(message.subscribeDenied as SubscribeDenied);
        break;
      case "receive":
        this.onReceive(message.receive as Receive);
        break;
      case "ack": {
        this.onAck(message.ack as Ack);
        break;
      }
      default:
        throw new Error(
          "Unexpected WebSocketNetwork message type: " + message.type
        );
    }
  }

  private onWelcome(message: Welcome): void {
    const doc = this.docsByID.get(message.docID);
    if (doc === undefined) return;
    const info = nonNull(this.subs.get(doc));

    const ourOldState = doc.save();

    if (info.off === undefined) {
      // Subscribe to future doc updates (not included in ourOldState)
      // and forward them to the server.
      // This includes both local operations and updates that we learn
      // of from other network/storage tools.
      const docID = message.docID;
      info.off = doc.on("Update", (e) => {
        // Skip updates that we delivered.
        if (e.caller === this) return;
        // Skip updates delivered by other tabs; they should be sending
        // their updates to the server themselves.
        if (
          typeof e.caller === "object" &&
          (<any>e.caller).isTabSyncNetwork === true
        )
          return;

        if (info.batchSendMS !== null) {
          if (e.updateType === "message") {
            // Just add to the pending send batch.
            if (info.nextSendBatch.length === 0) {
              // Schedule send.
              info.sendBatchTimeout = setTimeout(
                () => this.sendBatch(info),
                info.batchSendMS
              );
            }
            info.nextSendBatch.push(e.update);
            return;
          } else {
            // Send immediately as usual (below).
            // To guarantee causal-order sending, first push out the pending
            // send batch early.
            this.sendBatch(info);
          }
        }

        // OPT: if it's a saved state, only send the delta on top of our
        // old state to the server (skipping the delta computation if disconnected).
        this.sendInternal({
          send: {
            docID,
            update: e.update,
            updateType: stringToEnum(e.updateType),
            localCounter: ++this.localCounter,
          },
        });
        info.lastSent = this.localCounter;
      });
    }

    // After the above save(), do the load() in a separate task, to avoid
    // blocking for too long.
    setTimeout(() => {
      // Skip if we've been unsubscribed already.
      if (info.unsubscribed) return;

      doc.batchRemoteUpdates(() => {
        // Make us up-to-date with the server:
        //   1. Load the welcome state.
        if (protobufHas(message, "savedState")) {
          doc.load(message.savedState, this);
        }
        //   2. Load the further updates.
        for (let i = 0; i < message.updates.length; i++) {
          const update = message.updates[i];
          const updateType = message.updateTypes[i];
          switch (updateType) {
            case UpdateType.Message:
              doc.receive(update, this);
              break;
            case UpdateType.SavedState:
              doc.load(update, this);
              break;
            default:
              throw new Error("Unrecognized UpdateType: " + updateType);
          }
        }
      });

      this.emit("Load", { doc, docID: message.docID });

      // Make the server up-to-date with us.
      // OPT: use a delta on top of ourOldState instead,
      // or mergeMessages applied to all not-acked updates.
      // OPT: cancel pending send batch?
      this.sendInternal({
        send: {
          docID: message.docID,
          update: ourOldState,
          updateType: UpdateType.SavedState,
          localCounter: ++this.localCounter,
        },
      });
      info.lastSent = this.localCounter;
    }, 0);
  }

  private onSubscribeDenied(message: SubscribeDenied): void {
    const doc = this.docsByID.get(message.docID);
    if (doc === undefined) return;
    const info = nonNull(this.subs.get(doc));

    if (info.subscribeDenied === undefined) {
      // First we've heard of it.
      this.emit("SubscribeDenied", { doc, docID: message.docID });
      // If the server disconnects and reconnects, don't emit another event.
      info.subscribeDenied = true;
    }
  }

  private onReceive(message: Receive): void {
    const doc = this.docsByID.get(message.docID);
    if (doc === undefined) return;
    const info = nonNull(this.subs.get(doc));

    if (info.batchRemoteMS === null) this.deliver(doc, message);
    else {
      if (info.nextRemoteBatch.length === 0) {
        // Start of a new batch.
        setTimeout(
          () => this.deliverRemoteBatch(doc, info),
          info.batchRemoteMS
        );
      }
      info.nextRemoteBatch.push(message);
    }
  }

  private deliverRemoteBatch(doc: Doc, info: DocInfo): void {
    if (info.unsubscribed) return;

    doc.batchRemoteUpdates(() => {
      for (const message of info.nextRemoteBatch)
        try {
          this.deliver(doc, message);
        } catch (err) {
          // We display this error but let future messages go through,
          // to match non-batched behavior.
          console.error(err);
        }
    });
    info.nextRemoteBatch = [];
  }

  private deliver(doc: Doc, message: Receive): void {
    // Note: it is guaranteed that this method is only ever called with
    // causally-ready messages. Indeed:
    // 1. Other WebSocketNetwork clients only send/forward messages to the
    // server after sending all of their causal dependencies.
    // 2. The server echos messages in the order it receives them, which
    // is in causal order by (1).
    // 3. The server always sends the Welcome (encompassing all prior updates)
    // before echoing any new messages.
    // 4. Our batching preserves message order.
    //
    // Thus it is safe to use CRuntime's causalityGuaranteed option
    // if WebSocketNetwork is your only network.
    switch (message.updateType) {
      case UpdateType.Message:
        doc.receive(message.update, this);
        break;
      case UpdateType.SavedState:
        doc.load(message.update, this);
        break;
      default:
        throw new Error("Unrecognized UpdateType: " + message.updateType);
    }
  }

  private onAck(message: Ack): void {
    const doc = this.docsByID.get(message.docID);
    if (doc === undefined) return;
    const info = nonNull(this.subs.get(doc));

    if (message.localCounter === info.lastSent) {
      // The ack'd update is the last one we sent to the server.
      // So doc's state is now completely saved.
      this.emit("Save", { doc, docID: message.docID });
    }

    if (protobufHas(message, "checkpointRequest")) {
      // The server requests that we send our current saved state.
      // It will use this as a "checkpoint", replacing its message log
      // (up to the point that we've saved).
      this.sendInternal({
        checkpointResponse: {
          docID: message.docID,
          savedState: doc.save(),
          checkpointRequest: message.checkpointRequest,
        },
      });
    }
  }

  /**
   * Closes our WebSocket and unsubscribes all documents.
   *
   * Future method calls will throw an error.
   */
  close() {
    if (this.closed) return;

    this.closed = true;

    // Unsubscribe all docs.
    for (const doc of this.subs.keys()) this.unsubscribe(doc);

    // Close our WebSocket.
    this.disconnect();
  }
}
