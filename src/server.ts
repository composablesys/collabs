import WebSocket = require('ws');

/**
 * Customized noop function as ping message.
 */
function noop() {}
/**
 * This CRDT server will broadcast all messages that a client
 * WebSocket broadcasting to every other connected WebSocket clients, excluding itself.
 */
export function startBroadcastServer(webSocketArgs: WebSocket.ServerOptions | undefined) {
	/**
	 * Initialize the WebSocket server instance.
	 */
    const wss = new WebSocket.Server(webSocketArgs);
	/**
	 * Casual broadcasting server onconnection function main routine.
	 */
    wss.on('connection', function connection(ws : any) {

		// Pong function of the server.
		ws.on('pong', function heartbeat() {
			console.log("pong");
		});

		// Broacast function of the server.
		ws.on('message', function incoming(data : string) {
			// TODO: Heroku server console log.
			console.log("Message: " + data);
		
			wss.clients.forEach(function each(client : any) {
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
		wss.clients.forEach(function each(ws: any) {
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
