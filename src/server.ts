import WebSocket = require('ws');

/**
 * This CRDT server will broadcast all messages that a client
 * WebSocket broadcasting to every other connected WebSocket clients, excluding itself.
 */
export function startBroadcastServer(webSocketArgs: WebSocket.ServerOptions | undefined) {
    // Initialize the WebSocket server instance.
    const wss = new WebSocket.Server(webSocketArgs);

    // Broacast function of the server.
    wss.on('connection', function connection(ws : any) {
		ws.on('message', function incoming(data : string) {
			// TODO: Heroku server console log.
			console.log("Message: " + data);
			// TODO: Check if the message is heartbeat message.
			if (data !== 'heartbeat') {
				wss.clients.forEach(function each(client : any) {
					// Broadcasting to every other connected WebSocket clients, excluding itself.
					if (client !== ws && client.readyState === WebSocket.OPEN) {
						client.send(data);
					}
				});
			}
		});     
    });        
}
