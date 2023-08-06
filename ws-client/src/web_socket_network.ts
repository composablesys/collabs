import { AbstractDoc, CRuntime, EventEmitter } from "@collabs/collabs";
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
  Connect: {};
  Disconnect: {
    // Doc: disconnect includes this.close() call. close is for if the WS closes itself somehow (?).
    cause: "close" | "error" | "disconnect";
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
  localCounter: number;
  off?: () => void;
  subscribeDenied?: true;
}

export class WebSocketNetwork extends EventEmitter<WebSocketNetworkEventsRecord> {
  private ws: WebSocket | null = null;

  private readonly subs = new Map<Doc, DocInfo>();
  /** Inverse map docID -> Doc. */
  private readonly docsByID = new Map<string, Doc>();

  private closed = false;

  /**
   * Constructs a WebSocketNetwork
   *
   * You typically only need one WebSocketNetwork per app, since it
   * can [[subscribe]] multiple documents.
   *
   * @param url The WebSocket url to connect to.
   * @param options.connect Set to false to skip connecting automatically.
   * If so, you will need to call [[connect]] later.
   */
  constructor(readonly url: string, options: { connect?: boolean } = {}) {
    super();

    if (options.connect ?? true) this.connect();
  }

  // Doc: may call multiple times, e.g., reconnecting.
  // Okay to call if already connected.
  // E.g. net.on("Disconnect", () => setTimeout(net.connect(), 2000))
  // will (repeatedly) try to reconnect after a disconnection.
  connect() {
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

  // Doc: Can call this and later reconnect.
  disconnect() {
    this.ws?.close();

    // Note that changing this.ws right away will cause wsDisconnect to
    // ignore the WebSocket close event, which is dispatched async.
    // We instead emit our own Disconnect event.
    this.ws = null;

    this.emit("Disconnect", { cause: "disconnect", wsEvent: null });
  }

  // Whether we have an active WS connection (connect was called, and we
  // haven't had disconnect() or WS close/error). Note that the WS connection
  // might not be ready (OPEN) yet.
  get connected(): boolean {
    return this.ws !== null;
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

  subscribe(doc: AbstractDoc | CRuntime, docID: string) {
    if (this.closed) throw new Error("Already closed");
    if (this.subs.has(doc)) {
      throw new Error("doc is already subscribed to a docID");
    }
    if (this.docsByID.has(docID)) {
      throw new Error("Unsupported: multiple docs with same docID");
    }

    // TODO: if you unsub & re-sub to a doc, old acks might trick you
    // into thinking you're up-to-date.
    this.subs.set(doc, { docID, localCounter: 0 });
    this.docsByID.set(docID, doc);
    this.sendInternal({ subscribe: { docIDs: [docID] } });

    // Wait to subscribe to doc updates until after the first time
    // we send our whole state (on Welcome).
  }

  unsubscribe(doc: AbstractDoc | CRuntime) {
    const info = this.subs.get(doc);
    if (info === undefined) return;

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

    this.emit("Load", { doc, docID: message.docID });

    // Make the server up-to-date with us.
    // OPT: use a delta on top of ourOldState instead.
    this.sendInternal({
      send: {
        docID: message.docID,
        update: ourOldState,
        updateType: UpdateType.SavedState,
        localCounter: ++info.localCounter,
      },
    });

    if (info.off === undefined) {
      // Subscribe to future doc updates and forward them to the server.
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

        // OPT: if it's a saved state, only send the delta on top of our
        // old state to the server (skipping the delta computation if disconnected).
        this.sendInternal({
          send: {
            docID,
            update: e.update,
            updateType: stringToEnum(e.updateType),
            localCounter: ++info.localCounter,
          },
        });
      });
    }
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

    // Note: we might get this update before the room Welcome.
    // That is fine; if the update causally depends on existing state,
    // doc will buffer it.
    if (message.updateType === UpdateType.Message)
      doc.receive(message.update, this);
    else doc.load(message.update, this);
  }

  private onAck(message: Ack): void {
    const doc = this.docsByID.get(message.docID);
    if (doc === undefined) return;
    const info = nonNull(this.subs.get(doc));

    if (message.localCounter === info.localCounter) {
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
