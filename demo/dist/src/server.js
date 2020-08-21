"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBroadcastServer = void 0;
const WebSocket = require("ws");
/**
 * Customized noop function as ping message.
 */
function noop() { }
/**
 * This CRDT server will broadcast all messages that a client
 * WebSocket broadcasting to every other connected WebSocket clients, excluding itself.
 */
function startBroadcastServer(webSocketArgs) {
    /**
     * Initialize the WebSocket server instance.
     */
    const wss = new WebSocket.Server(webSocketArgs);
    /**
     * Casual broadcasting server onconnection function main routine.
     */
    wss.on('connection', function connection(ws) {
        // Pong function of the server.
        ws.on('pong', function heartbeat() {
            console.log("pong");
        });
        // Broacast function of the server.
        ws.on('message', function incoming(data) {
            // TODO: Heroku server console log.
            console.log("Message: " + data);
            wss.clients.forEach(function each(client) {
                // Broadcasting to every other connected WebSocket clients, excluding itself.
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });
    });
    /**
     * Sending ping to every connected clients with customized interval.
     */
    const interval = setInterval(function ping() {
        wss.clients.forEach(function each(ws) {
            ws.ping(noop);
        });
    }, 5000);
    /**
     * Casual broadcasting server onclose routine.
     * Stop the interval process.
     */
    wss.on('close', function close() {
        clearInterval(interval);
    });
}
exports.startBroadcastServer = startBroadcastServer;
//# sourceMappingURL=server.js.map