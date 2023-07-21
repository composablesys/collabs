import {
  IWSMessage,
  SaveResponse,
  Send,
  Subscribe,
  Unsubscribe,
  WSMessage,
} from "@collabs/ws-client/generated/proto_compiled";
import { WebSocket, WebSocketServer } from "ws";
import { InMemoryDocStore } from "./in_memory_doc_store";
import { ServerDocStore } from "./server_doc_store";

interface RoomInfo {
  readonly clients: Set<WebSocket>;
  lastSaveRequestTime: number | null;
}

const defaultHeartbeatInterval = 30000;

export class WebSocketNetworkServer {
  /** Maps docID to set of clients in that room. */
  private rooms = new Map<string, RoomInfo>();
  /** Maps ws to the set of docIDs it's subscribed to. */
  private clients = new Map<WebSocket, Set<string>>();

  private readonly heartbeatInterval: number;

  constructor(
    readonly wss: WebSocketServer,
    readonly docStore: ServerDocStore = new InMemoryDocStore(),
    options: { heartbeatInterval?: number } = {}
  ) {
    this.heartbeatInterval =
      options.heartbeatInterval ?? defaultHeartbeatInterval;

    this.wss.on("connection", (ws) => {
      this.clients.set(ws, new Set());

      ws.binaryType = "arraybuffer";
      ws.on("open", () => this.startHeartbeats(ws));
      ws.on("message", (data) => this.wsReceive(ws, data as ArrayBuffer));
      ws.on("close", () => this.wsClosed(ws));
      ws.on("error", () => this.wsClosed(ws));
      // Don't log errors; the caller can log using their own wss listener.
    });
  }

  private startHeartbeats(ws: WebSocket) {
    if (this.heartbeatInterval === 0) return;
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.ping();
      } else clearInterval(interval);
    }, this.heartbeatInterval);
  }

  private wsClosed(ws: WebSocket) {
    // Unsubscribe ws from all rooms.
    const wsRooms = this.clients.get(ws);
    if (wsRooms === undefined) return;

    for (const docID of wsRooms) this.unsubscribe(ws, docID);

    this.clients.delete(ws);
  }

  private unsubscribe(ws: WebSocket, docID: string) {
    const room = this.rooms.get(docID);
    if (room === undefined) return;
    room.clients.delete(ws);
    if (room.clients.size === 0) this.rooms.delete(docID);
  }

  private sendInternal(ws: WebSocket, message: IWSMessage) {
    if (ws.readyState == WebSocket.OPEN) {
      ws.send(WSMessage.encode(message).finish());
    }
  }

  private wsReceive(ws: WebSocket, encoded: ArrayBuffer) {
    const message = WSMessage.decode(new Uint8Array(encoded));
    switch (message.type) {
      case "subscribe":
        this.onSubscribe(ws, message.subscribe as Subscribe);
        break;
      case "unsubscribe":
        this.onUnsubscribe(ws, message.unsubscribe as Unsubscribe);
        break;
      case "send":
        this.onSend(ws, message.send as Send);
        break;
      case "saveResponse":
        this.onSaveResponse(ws, message.saveResponse as SaveResponse);
        break;
      default:
        throw new Error("Unexpected WebSocketNetwork message: " + encoded);
    }
  }

  private onSubscribe(ws: WebSocket, message: Subscribe) {
    const wsRooms = this.clients.get(ws);
    if (wsRooms === undefined) return;

    for (const docID of message.docIDs) {
      let room = this.rooms.get(docID);
      if (room === undefined) {
        room = { clients: new Set(), lastSaveRequestTime: null };
        this.rooms.set(docID, room);
      }
      room.clients.add(ws);
      wsRooms.add(docID);

      // Note that we may already think ws is subscribed to a room.
      // Re-send the state anyway, in case they were offline and missed some
      // messages.
      // Do the data fetches in parallel.
      void this.docStore
        .load(docID)
        .then(([savedState, updates, updateTypes]) => {
          this.sendInternal(ws, {
            welcome: {
              docID,
              savedState,
              updates,
              updateTypes,
            },
          });
        });
    }
  }

  private onUnsubscribe(ws: WebSocket, message: Unsubscribe) {
    const wsRooms = this.clients.get(ws);
    if (wsRooms === undefined) return;
    wsRooms.delete(message.docID);

    this.unsubscribe(ws, message.docID);
  }

  private onSend(ws: WebSocket, message: Send) {
    // Check that ws is actually in the room.
    const docID = message.docID;
    const room = this.rooms.get(docID);
    if (room === undefined || !room.clients.has(ws)) return;

    // Echo the message to other open clients in the same room.
    if (room.clients.size > 1) {
      const echo = WSMessage.encode({
        receive: {
          docID,
          update: message.update,
          updateType: message.updateType,
        },
      }).finish();
      for (const client of room.clients) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          // Note: peer might get this update before the room Welcome.
          // That is fine; if the update depends on existing state,
          // peer's doc will buffer it.
          client.send(echo);
        }
      }
    }

    const localCounter = message.localCounter;
    void this.docStore
      .addUpdate(docID, message.update, message.updateType)
      .then((saveRequest) => {
        // Ack the update, confirming that we have saved it.
        this.sendInternal(ws, {
          ack: { docID, localCounter, saveRequest },
        });
      });
  }

  private onSaveResponse(ws: WebSocket, saveResponse: SaveResponse) {
    // Check that ws is actually in the room.
    const room = this.rooms.get(saveResponse.docID);
    if (room === undefined || !room.clients.has(ws)) return;

    void this.docStore.save(
      saveResponse.docID,
      saveResponse.savedState,
      saveResponse.saveRequest
    );
  }

  // TODO: ping-pong? I recall it was necessary to keep Heroku WS connections alive.
}
