import { AbstractDoc, CRuntime, EventEmitter } from "@collabs/collabs";
import { nonNull } from "@collabs/core";
import { fromByteArray, toByteArray } from "base64-js";
import { Subscribe, WSMessage } from "./message_types";

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
  Save: { doc: AbstractDoc | CRuntime; roomName: string };
  /**
   * Emitted after doc loads the server's current state.
   *
   * This may be emitted multiple times for a doc - in particular, after
   * reconnecting.
   */
  Load: { doc: AbstractDoc | CRuntime; roomName: string };
}

interface RoomInfo {
  readonly roomName: string;
  readonly off: () => void;
  localCounter: number;
}

export class WebSocketNetwork extends EventEmitter<WebSocketNetworkEventsRecord> {
  private ws: WebSocket | null = null;

  private readonly subs = new Map<Doc, RoomInfo>();
  /** Inverse map roomName -> Doc. */
  private readonly docByRoom = new Map<string, Doc>();

  // TODO: binary messages, then remove base64-js dep
  // TODO: events: close, error, open, saved

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
    this.ws = ws;
    ws.addEventListener("open", () => {
      if (ws !== this.ws) return;

      // (Re-) subscribe to all rooms.
      if (this.docByRoom.size !== 0) {
        const message: Subscribe = {
          type: "Subscribe",
          roomNames: [...this.docByRoom.keys()],
        };
        ws.send(JSON.stringify(message));
      }

      // Emit event.
      this.emit("Connect", {});
    });
    ws.addEventListener("message", (e) => this.wsReceive(e.data));
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
  private sendInternal(message: WSMessage) {
    if (this.ws != null && this.ws.readyState == WebSocket.OPEN) {
      const encoded = JSON.stringify(message);
      this.ws.send(encoded);
    }
  }

  subscribe(doc: AbstractDoc | CRuntime, roomName: string) {
    if (this.subs.has(doc)) {
      throw new Error("doc is already subscribed to a room");
    }

    if (this.docByRoom.has(roomName)) {
      throw new Error("Unsupported: multiple docs in same room");
    }

    let roomInfo: RoomInfo;
    const off = doc.on("Transaction", (e) => {
      if (e.caller === this) return;

      // The transaction is either a new local message or
      // a message/savedState delivered by a different provider;
      // forward it to the server.
      // TODO: incremental savedState instead.
      this.sendInternal({
        type: "Send",
        roomName,
        update: fromByteArray(e.update),
        updateType: e.meta.updateType,
        localCounter: ++roomInfo.localCounter,
      });
    });
    roomInfo = { roomName, off, localCounter: 0 };

    this.subs.set(doc, roomInfo);
    this.docByRoom.set(roomName, doc);
    this.sendInternal({ type: "Subscribe", roomNames: [roomName] });
  }

  unsubscribe(doc: AbstractDoc | CRuntime) {
    const sub = this.subs.get(doc);
    if (sub === undefined) return;

    const { roomName, off } = sub;
    off();
    this.docByRoom.delete(roomName);
    this.sendInternal({ type: "Unsubscribe", roomName });
  }

  private wsReceive(encoded: string) {
    const message = JSON.parse(encoded) as WSMessage;
    switch (message.type) {
      case "Welcome": {
        const doc = this.docByRoom.get(message.roomName);
        if (doc === undefined) return;
        const roomInfo = nonNull(this.subs.get(doc));

        // Make us up-to-date with the server:
        // 1. Load the welcome state.
        if (message.savedState !== null) {
          const savedState = toByteArray(message.savedState);
          doc.load(savedState, this);
        }
        // 2. Load the further messages.
        for (const update of message.furtherUpdates) {
          const bytes = toByteArray(update.update);
          if (update.updateType === "message") doc.receive(bytes, this);
          else doc.load(bytes, this);
        }

        this.emit("Load", { doc, roomName: message.roomName });

        // Make the server up-to-date with us.
        // TODO: use an incremental save instead;
        // skip entirely if we've got nothing new.
        const ourState = doc.save();
        this.sendInternal({
          type: "Send",
          roomName: message.roomName,
          update: fromByteArray(ourState),
          updateType: "savedState",
          localCounter: ++roomInfo.localCounter,
        });
        break;
      }
      case "Receive": {
        const doc = this.docByRoom.get(message.roomName);
        if (doc === undefined) return;

        const update = toByteArray(message.update);
        // Note: we might get this update before the room Welcome.
        // That is fine; if the update depends on existing state,
        // doc will buffer it.
        // TODO: buffering will break applyUpdate (won't detect that its ours and
        // will bounce it back to the server). So maybe we really do need an
        // origin/caller arg.
        doc.receive(update, this);
        break;
      }
      case "Ack": {
        const doc = this.docByRoom.get(message.roomName);
        if (doc === undefined) return;
        const roomInfo = nonNull(this.subs.get(doc));

        if (message.localCounter === roomInfo.localCounter) {
          // The ack'd update is the last one we sent to the server.
          // So doc's state is now completely saved.
          this.emit("Save", { doc, roomName: message.roomName });
        }

        if (message.saveRequest !== undefined) {
          // The server requests that we send our current saved state.
          // It will use this as a "checkpoint", replacing its message log
          // (up to the point that we've saved).
          const ourState = doc.save();
          this.sendInternal({
            type: "SaveResponse",
            roomName: message.roomName,
            savedState: fromByteArray(ourState),
            saveRequest: message.saveRequest,
          });
        }
        break;
      }
      default:
        throw new Error("Unexpected WebSocketNetwork message: " + encoded);
    }
  }
}
