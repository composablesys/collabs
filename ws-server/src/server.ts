import WebSocket = require("ws");

/**
 * Customized noop function as ping message.
 */
function noop() {}

/**
 * This CRDT server will broadcast all messages that a client
 * WebSocket broadcasting to every other connected WebSocket clients, excluding itself.
 *
 * @returns an object { reset }, where reset(group?: string)
 * resets the message history of group, or of all apps
 * if group is not given.
 */
export function startWebSocketServer(webSocketArgs: WebSocket.ServerOptions): {
  reset(group?: string): void;
} {
  /**
   * Group of WebSocket users.
   */
  var webSocketGroup = new Map<String, Array<any>>();
  /**
   * Naive way of storing all the previous history messages.
   */
  var groupHistory = new Map<String, Array<any>>();
  /**
   * WebSocket server ws.
   */
  const wss = new WebSocket.Server(webSocketArgs);
  /**
   * Casual broadcasting server onconnection function main routine.
   */
  console.log("Web Socket server initializing..");
  /**
   * Register server listener functions.
   */
  wss.on("connection", function connection(ws: any) {
    // Pong function of the server.
    ws.on("pong", function heartbeat() {
      console.log("pong");
    });

    // Broacast function of the server.
    ws.on("message", function incoming(data: string) {
      var message;
      try {
        message = JSON.parse(data);
      } catch (e) {
        console.log("Failed to parse message:");
        console.log(message);
        message = {};
      }
      // If it is not a WebRTC message.
      // Then check if it is a "register" message.
      // If yes, then register the new peer to the group.
      if (message.type == "register") {
        if (!webSocketGroup.has(message.group)) {
          webSocketGroup.set(message.group, new Array<any>());
        }
        webSocketGroup.get(message.group)!.push(ws);

        // push all the history messages to the new connected client.
        if (groupHistory.has(message.group)) {
          groupHistory.get(message.group)!.forEach(function each(history: any) {
            if (ws.readyState == WebSocket.OPEN) {
              ws.send(history);
            }
          });
        }
      } else {
        // store all the messages in the history log.
        if (!groupHistory.has(message.group)) {
          groupHistory.set(message.group, new Array<any>());
        }
        groupHistory.get(message.group)!.push(data);

        // If it is not a "register" message, then broadcast the message to
        // all the related clients.
        if (webSocketGroup.has(message.group)) {
          webSocketGroup
            .get(message.group)!
            .forEach(function each(client: any) {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
              }
            });
        } else {
          // If cannot find the groupID, then broadcast the message to all clients.
          wss.clients.forEach(function each(client: any) {
            // Broadcasting to every other connected WebSocket clients, excluding itself.
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(data);
            }
          });
        }
      }
    });

    ws.on("close", function () {});
  });

  /**
   * Sending ping to every connected clients with customized interval.
   */
  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws: any) {
      ws.ping(noop);
    });
  }, 5000);
  /**
   * Casual broadcasting server onclose routine.
   * Stop the interval process.
   */
  wss.on("close", function close() {
    clearInterval(interval);
  });

  return {
    reset(group?: string) {
      if (group === undefined) {
        groupHistory.clear();
      } else {
        groupHistory.delete(group);
      }
    },
  };
}
