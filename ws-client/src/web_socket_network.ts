import { AbstractDoc, CRuntime, EventEmitter } from "@collabs/collabs";
import { nonNull, protobufHas } from "@collabs/core";
import {
  Ack,
  IWSMessage,
  Receive,
  WSMessage,
  Welcome,
} from "../generated/proto_compiled";
import { UpdateType, stringToEnum } from "./update_type";

type Doc = AbstractDoc | CRuntime;

export interface WebSocketNetworkEventsRecord {
  Connect: {};
  Disconnect: {
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
}

interface RoomInfo {
  readonly docID: string;
  readonly off: () => void;
  localCounter: number;
}

export class WebSocketNetwork extends EventEmitter<WebSocketNetworkEventsRecord> {
  private ws: WebSocket | null = null;

  private readonly subs = new Map<Doc, RoomInfo>();
  /** Inverse map docID -> Doc. */
  private readonly docsByID = new Map<string, Doc>();

  constructor(readonly url: string, options: { connect?: boolean } = {}) {
    super();

    if (options.connect ?? true) this.connect();
  }

  // Doc: may call multiple times, e.g., reconnecting.
  // Okay to call if already connected.
  // E.g. net.on("Disconnect", () => setTimeout(net.connect(), 2000))
  // will (repeatedly) try to reconnect after a disconnection.
  connect() {
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
    if (this.subs.has(doc)) {
      throw new Error("doc is already subscribed to a docID");
    }

    if (this.docsByID.has(docID)) {
      throw new Error("Unsupported: multiple docs with same docID");
    }

    let roomInfo: RoomInfo;
    const off = doc.on("Transaction", (e) => {
      if (e.caller === this) return;

      // The transaction is either a new local message or
      // a message/savedState delivered by a different provider;
      // forward it to the server.
      // TODO: incremental savedState instead.
      this.sendInternal({
        send: {
          docID,
          update: e.update,
          updateType: stringToEnum(e.meta.updateType),
          localCounter: ++roomInfo.localCounter,
        },
      });
    });
    roomInfo = { docID, off, localCounter: 0 };

    this.subs.set(doc, roomInfo);
    this.docsByID.set(docID, doc);
    this.sendInternal({ subscribe: { docIDs: [docID] } });
  }

  unsubscribe(doc: AbstractDoc | CRuntime) {
    const sub = this.subs.get(doc);
    if (sub === undefined) return;

    const { docID, off } = sub;
    off();
    this.docsByID.delete(docID);
    this.sendInternal({ unsubscribe: { docID } });
  }

  private wsReceive(encoded: ArrayBuffer) {
    const message = WSMessage.decode(new Uint8Array(encoded));
    switch (message.type) {
      case "welcome": {
        const welcome = message.welcome as Welcome;
        const doc = this.docsByID.get(welcome.docID);
        if (doc === undefined) return;
        const roomInfo = nonNull(this.subs.get(doc));

        // Make us up-to-date with the server:
        // 1. Load the welcome state.
        if (protobufHas(welcome, "savedState")) {
          doc.load(welcome.savedState, this);
        }
        // 2. Load the further updates.
        for (let i = 0; i < welcome.updates.length; i++) {
          const update = welcome.updates[i];
          const updateType = welcome.updateTypes[i];
          if (updateType === UpdateType.Message) doc.receive(update, this);
          else doc.load(update, this);
        }

        this.emit("Load", { doc, docID: welcome.docID });

        // Make the server up-to-date with us.
        // TODO: use an incremental save instead;
        // skip entirely if we've got nothing new.
        const ourState = doc.save();
        this.sendInternal({
          send: {
            docID: welcome.docID,
            update: ourState,
            updateType: UpdateType.SavedState,
            localCounter: ++roomInfo.localCounter,
          },
        });
        break;
      }
      case "receive": {
        const receive = message.receive as Receive;
        const doc = this.docsByID.get(receive.docID);
        if (doc === undefined) return;

        // Note: we might get this update before the room Welcome.
        // That is fine; if the update depends on existing state,
        // doc will buffer it.
        doc.receive(receive.update, this);
        break;
      }
      case "ack": {
        const ack = message.ack as Ack;
        const doc = this.docsByID.get(ack.docID);
        if (doc === undefined) return;
        const roomInfo = nonNull(this.subs.get(doc));

        if (ack.localCounter === roomInfo.localCounter) {
          // The ack'd update is the last one we sent to the server.
          // So doc's state is now completely saved.
          this.emit("Save", { doc, docID: ack.docID });
        }

        if (protobufHas(ack, "saveRequest")) {
          // The server requests that we send our current saved state.
          // It will use this as a "checkpoint", replacing its message log
          // (up to the point that we've saved).
          this.sendInternal({
            saveResponse: {
              docID: ack.docID,
              savedState: doc.save(),
              saveRequest: ack.saveRequest,
            },
          });
        }
        break;
      }
      default:
        throw new Error(
          "Unexpected WebSocketNetwork message type: " + message.type
        );
    }
  }
}
