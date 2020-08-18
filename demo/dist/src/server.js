"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startBroadcastServer = void 0;
const WebSocket = require("ws");
/**
 * This CRDT server will broadcast all messages that a client
 * WebSocket broadcasting to every other connected WebSocket clients, excluding itself.
 */
function startBroadcastServer(webSocketArgs) {
    // Initialize the WebSocket server instance.
    const wss = new WebSocket.Server(webSocketArgs);
    // Broacast function of the server.
    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(data) {
            console.log("Message: " + data);
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });
    });
}
exports.startBroadcastServer = startBroadcastServer;
//# sourceMappingURL=server.js.map