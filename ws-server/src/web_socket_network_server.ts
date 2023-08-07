import {
  CheckpointResponse,
  IWSMessage,
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
}

const defaultHeartbeatIntervalMS = 30000;

/**
 * Server for [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client)'s
 * WebSocketNetwork.
 *
 * You can start the server by calling the constructor in a Node.js program
 * or by using the `collabs-ws-server` command.
 * 
 * This server is only minimally configurable; for advanced uses, consider
 * copying and modifying
 * [its source code](https://github.com/composablesys/collabs/blob/master/ws-server/src/web_socket_network_server.ts)
 * directly.
 * 
 * However, you can configure:
 * - Document storage (constructor's `docStore` argument).
 * - Client/docID authentication (constructor's `authenticate` argument).
 *   - To correlate WebSockets with users, listen on your WebSocketServer's `"upgrade"` event;
 * see https://www.npmjs.com/package/ws#client-authentication .
 * - Error handling/logging, by listening on your WebSocketServer's
 * "error" and "connection" events (registering a per-WebSocket error handler in
 * the latter).
 */
export class WebSocketNetworkServer {
  /** Maps docID to set of clients in that room. */
  private rooms = new Map<string, RoomInfo>();
  /** Maps ws to the set of docIDs it's subscribed to. */
  private clients = new Map<WebSocket, Set<string>>();

  private readonly heartbeatInterval: number;

  /**
   * Constructs a WebSocketNetworkServer.
   *
   * @param wss The WebSocketServer (package [ws](https://www.npmjs.com/package/ws)) to run on top of.
   * @param docStore ServerDocStore, for persisting document states.
   * Default: [[InMemoryDocStore]], for demonstration purposes.
   * @param authenticate Callback that returns whether a given client (`ws`)
   * is allowed to read and write `docID`.
   * Default: Always true (all docs are public), for demonstration purposes.
   * @param options.heartbeatIntervalMS How often to send WebSocket pings, in ms.
   * Set to 0 to disable pings.
   */
  constructor(
    readonly wss: WebSocketServer,
    readonly docStore: ServerDocStore = new InMemoryDocStore(),
    private readonly authenticate: (
      ws: WebSocket,
      docID: string
    ) => Promise<boolean> = async () => true,
    options: { heartbeatIntervalMS?: number } = {}
  ) {
    this.heartbeatInterval =
      options.heartbeatIntervalMS ?? defaultHeartbeatIntervalMS;

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

  /**
   * Ping to keep connection alive.
   *
   * This is necessary on at least Heroku, which has a 55 second timeout:
   * https://devcenter.heroku.com/articles/websockets#timeouts
   */
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

  /**
   * Sends message over ws if the connection is currently open,
   * else dropping it.
   */
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
      case "checkpointResponse":
        this.onCheckpointResponse(
          ws,
          message.checkpointResponse as CheckpointResponse
        );
        break;
      default:
        throw new Error("Unexpected WebSocketNetwork message: " + encoded);
    }
  }

  private onSubscribe(ws: WebSocket, message: Subscribe) {
    const wsRooms = this.clients.get(ws);
    if (wsRooms === undefined) return;

    // Subscribe all docs in parallel.
    message.docIDs.map(async (docID) => {
      if (!(await this.authenticate(ws, docID))) {
        this.sendInternal(ws, { subscribeDenied: { docID } });
        return;
      }

      let room = this.rooms.get(docID);
      if (room === undefined) {
        room = { clients: new Set() };
        this.rooms.set(docID, room);
      }
      room.clients.add(ws);
      wsRooms.add(docID);

      // Note that we may already think ws is subscribed to a room.
      // Re-send the state anyway, in case they were offline and missed some
      // messages.
      const { checkpoint, updates, updateTypes } = await this.docStore.load(
        docID
      );
      this.sendInternal(ws, {
        welcome: {
          docID,
          savedState: checkpoint,
          updates,
          updateTypes,
        },
      });
    });
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
          // Note: peer might get this update before the room Welcome,
          // since loading the state from docStore is async.
          // That is fine; if the update depends on existing state,
          // peer's doc will buffer it.
          client.send(echo);
        }
      }
    }

    const localCounter = message.localCounter;
    void this.docStore
      .addUpdate(docID, message.update, message.updateType)
      .then((checkpointRequest) => {
        // Ack the update, confirming that we have saved it,
        // and possibly sending a checkpointRequest.
        this.sendInternal(ws, {
          ack: { docID, localCounter, checkpointRequest },
        });
      });
  }

  private onCheckpointResponse(
    ws: WebSocket,
    checkpointResponse: CheckpointResponse
  ) {
    // Check that ws is actually in the room.
    const room = this.rooms.get(checkpointResponse.docID);
    if (room === undefined || !room.clients.has(ws)) return;

    // Store the checkpointResponse.
    void this.docStore.checkpoint(
      checkpointResponse.docID,
      checkpointResponse.savedState,
      checkpointResponse.checkpointRequest
    );
  }
}
