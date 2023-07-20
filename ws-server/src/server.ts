import type {
  Ack,
  Receive,
  WSMessage,
  Welcome,
} from "@collabs/ws-client/src/message_types";
import { WebSocket, WebSocketServer } from "ws";

// TODO: npx command to run a basic server on a port

// TODO: roomName -> docID in general?

export type Update = {
  // TODO: binary instead: protobufs in separate folder; remove ws-client devDep.
  update: string;
  updateType: "message" | "savedState";
};

export interface DocStore {
  // Only needs to be accurate as of the time the call started, but can be
  // more up-to-date.
  load(
    roomName: string
    // TODO: binary instead
    // If it doesn't exist yet, return [null, []]
  ): Promise<[savedState: string | null, furtherUpdates: Update[]]>;

  /**
   * Returns [the update's count, number of pending furtherUpdates].
   */
  addUpdate(
    roomName: string,
    update: Update
  ): Promise<[count: number, logLength: number]>;

  // TODO: can we make this handle multiple providers? Or would that be silly?
  /**
   * count: last update that is dominated by this save.
   *
   * Ignore if the current savedState already includes count.
   */
  save(roomName: string, savedState: string, count: number): Promise<void>;
}

interface DocStoreRoomInfo {
  savedState: string | null;
  furtherUpdates: Update[];
  savedStateCount: number;
}

export class InMemoryDocStore implements DocStore {
  private rooms = new Map<string, DocStoreRoomInfo>();

  private getRoom(roomName: string): DocStoreRoomInfo {
    let room = this.rooms.get(roomName);
    if (room === undefined) {
      room = { savedState: null, furtherUpdates: [], savedStateCount: 0 };
      this.rooms.set(roomName, room);
    }
    return room;
  }

  async load(
    roomName: string
  ): Promise<[savedState: string | null, furtherUpdates: Update[]]> {
    const room = this.getRoom(roomName);
    return [room.savedState, room.furtherUpdates.slice()];
  }

  async addUpdate(
    roomName: string,
    update: Update
  ): Promise<[count: number, logLength: number]> {
    const room = this.getRoom(roomName);
    room.furtherUpdates.push(update);
    return [
      room.savedStateCount + room.furtherUpdates.length,
      room.furtherUpdates.length,
    ];
  }

  async save(
    roomName: string,
    savedState: string,
    count: number
  ): Promise<void> {
    const room = this.getRoom(roomName);
    if (room.savedStateCount >= count) return;
    if (count > room.savedStateCount + room.furtherUpdates.length) {
      throw new Error("savedState claims to contain more updates than exist");
    }

    const dominated = count - room.savedStateCount;
    room.savedState = savedState;
    room.savedStateCount = count;
    room.furtherUpdates = room.furtherUpdates.slice(dominated);
  }
}

interface RoomInfo {
  readonly clients: Set<WebSocket>;
  lastSaveRequestTime: number | null;
}

export class WebSocketNetworkServer {
  /** Maps roomName to set of clients in that room. */
  private rooms = new Map<string, RoomInfo>();

  constructor(
    readonly wss: WebSocketServer,
    readonly docStore: DocStore = new InMemoryDocStore()
  ) {
    this.wss.on("connection", (ws) => {
      ws.on("message", (data) => this.wsReceive(ws, data.toString()));
      // If the user wants ws errors, they can add their own wss.connection
      // listener.
      // TODO: remove (& unsub) client when disconnected/errored.
    });
  }

  private wsReceive(ws: WebSocket, encoded: string) {
    const message = JSON.parse(encoded) as WSMessage;
    switch (message.type) {
      case "Subscribe": {
        for (const roomName of message.roomNames) {
          let room = this.rooms.get(roomName);
          if (room === undefined) {
            room = { clients: new Set(), lastSaveRequestTime: null };
          }
          room.clients.add(ws);

          // Note that we may already think ws is subscribed to a room.
          // Re-send the state anyway, in case they were offline and missed some
          // messages.
          // Do the data fetches in parallel.
          void this.docStore
            .load(roomName)
            .then(([savedState, furtherUpdates]) => {
              if (ws.readyState === WebSocket.OPEN) {
                const welcome: Welcome = {
                  type: "Welcome",
                  roomName,
                  savedState,
                  furtherUpdates,
                };
                ws.send(JSON.stringify(welcome));
              }
            });
        }
        break;
      }
      case "Unsubscribe": {
        const room = this.rooms.get(message.roomName);
        if (room === undefined) return;
        room.clients.delete(ws);
        if (room.clients.size === 0) this.rooms.delete(message.roomName);
        break;
      }
      case "Send": {
        // Check that ws is actually in the room.
        const roomName = message.roomName;
        const room = this.rooms.get(roomName);
        if (room === undefined || !room.clients.has(ws)) return;
        // Echo the message to other open clients in the same room.
        if (room.clients.size > 1) {
          const echo: Receive = {
            type: "Receive",
            roomName,
            update: message.update,
            updateType: message.updateType,
          };
          const encoded = JSON.stringify(echo);
          for (const client of room.clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              // Note: peer might get this update before the room Welcome.
              // That is fine; if the update depends on existing state,
              // peer's doc will buffer it.
              client.send(encoded);
            }
          }
        }

        // TODO: save the message to DocStore
        const localCounter = message.localCounter;
        void this.docStore
          .addUpdate(roomName, {
            update: message.update,
            updateType: message.updateType,
          })
          .then(([count, logLength]) => {
            // Ack the update, confirming that we have saved it.
            if (ws.readyState === WebSocket.OPEN) {
              let sendSaveRequest: boolean;

              const ack: Ack = {
                type: "Ack",
                roomName,
                localCounter,
              };
              const room = this.rooms.get(roomName);
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
              ws.send(JSON.stringify(ack));
            }
          });
        break;
      }
      case "SaveResponse": {
        // Check that ws is actually in the room.
        const room = this.rooms.get(message.roomName);
        if (room === undefined || !room.clients.has(ws)) return;

        const count = Number.parseInt(message.saveRequest);
        if (isNaN(count)) return;

        void this.docStore.save(message.roomName, message.savedState, count);
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
    // TODO: configurable (constr options, or properties of docStore).
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
