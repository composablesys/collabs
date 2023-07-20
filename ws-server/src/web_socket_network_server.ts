import {
  IAck,
  IWSMessage,
  SaveResponse,
  Send,
  WSMessage,
} from "@collabs/ws-client/generated/proto_compiled";
import { WebSocket, WebSocketServer } from "ws";
import { InMemoryDocStore } from "./in_memory_doc_store";
import { ServerDocStore } from "./server_doc_store";

// TODO: npx command to run a basic server on a port

interface RoomInfo {
  readonly clients: Set<WebSocket>;
  lastSaveRequestTime: number | null;
}

export class WebSocketNetworkServer {
  /** Maps docID to set of clients in that room. */
  private rooms = new Map<string, RoomInfo>();

  constructor(
    readonly wss: WebSocketServer,
    readonly docStore: ServerDocStore = new InMemoryDocStore()
  ) {
    this.wss.on("connection", (ws) => {
      ws.binaryType = "arraybuffer";
      ws.on("message", (data) => this.wsReceive(ws, data as ArrayBuffer));
      // If the user wants ws errors, they can add their own wss.connection
      // listener.
      // TODO: remove (& unsub) client when disconnected/errored.
    });
  }

  private sendInternal(ws: WebSocket, message: IWSMessage) {
    if (ws.readyState == WebSocket.OPEN) {
      ws.send(WSMessage.encode(message).finish());
    }
  }

  private wsReceive(ws: WebSocket, encoded: ArrayBuffer) {
    const message = WSMessage.decode(new Uint8Array(encoded));
    switch (message.type) {
      // TODO: split into method per type
      case "subscribe": {
        for (const docID of message.subscribe!.docIDs!) {
          let room = this.rooms.get(docID);
          if (room === undefined) {
            room = { clients: new Set(), lastSaveRequestTime: null };
          }
          room.clients.add(ws);

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
        break;
      }
      case "unsubscribe": {
        const docID = message.unsubscribe!.docID;
        const room = this.rooms.get(docID);
        if (room === undefined) return;
        room.clients.delete(ws);
        if (room.clients.size === 0) this.rooms.delete(docID);
        break;
      }
      case "send": {
        const send = message.send as Send;

        // Check that ws is actually in the room.
        const docID = send.docID;
        const room = this.rooms.get(docID);
        if (room === undefined || !room.clients.has(ws)) return;

        // Echo the message to other open clients in the same room.
        if (room.clients.size > 1) {
          const echo = WSMessage.encode({
            receive: {
              docID,
              update: send.update,
              updateType: send.updateType,
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

        const localCounter = send.localCounter;
        void this.docStore
          .addUpdate(docID, send.update, send.updateType)
          .then(([count, logLength]) => {
            // Ack the update, confirming that we have saved it.
            if (ws.readyState === WebSocket.OPEN) {
              const ack: IAck = {
                docID,
                localCounter,
              };
              const room = this.rooms.get(docID);
              if (
                room !== undefined &&
                this.shouldSaveRequest(room, logLength)
              ) {
                // Request the client to send their current saved state as a
                // snapshot, to replace some of the docStore's further updates
                // (specifically, those up to `count`).
                // We're guaranteed that the sender is up-to-date with this count
                // *once they get this Ack*, since they must received at least:
                // - A Welcome with our latest state at the time.
                // - All echoes between the Welcome and this Ack.
                // which together contain all updates in this count.
                ack.saveRequest = `${count}`;
                room.lastSaveRequestTime = Date.now();
              }
              ws.send(WSMessage.encode({ ack }).finish());
            }
          });
        break;
      }
      case "saveResponse": {
        const saveResponse = message.saveResponse as SaveResponse;

        // Check that ws is actually in the room.
        const room = this.rooms.get(saveResponse.docID);
        if (room === undefined || !room.clients.has(ws)) return;

        const count = Number.parseInt(saveResponse.saveRequest);
        if (isNaN(count)) return;

        void this.docStore.save(
          saveResponse.docID,
          saveResponse.savedState,
          count
        );
      }
      default:
        throw new Error("Unexpected WebSocketNetwork message: " + encoded);
    }
  }

  private shouldSaveRequest(room: RoomInfo, logLength: number): boolean {
    // Do save request if:
    // - There are at least 100 pending updates in the log.
    // - It has been at least 5 seconds since the last save request,
    // including potential failed or long-latency requests.
    // TODO: move this decision into the DocStore (knows better than we do).
    if (logLength >= 100) {
      if (
        room.lastSaveRequestTime === null ||
        room.lastSaveRequestTime + 5000 <= Date.now()
      ) {
        return true;
      }
    }
    return false;
  }

  // TODO: ping-pong? I recall it was necessary to keep Heroku WS connections alive.
}
