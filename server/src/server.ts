import WebSocket = require('ws');

/**
 * Customized noop function as ping message.
 */
function noop() {}

/**
 * webRtc server used only.
 * Send Jsonify signaling message to clients.
 */
function sendWebRtcSignalMessage(connection : any, message: any) { 
	connection.send(JSON.stringify(message)); 
}

/**
 * This CRDT server will broadcast all messages that a client
 * WebSocket broadcasting to every other connected WebSocket clients, excluding itself.
 */
export function startServer(webSocketArgs: WebSocket.ServerOptions) {
	/**
	 * Initialize the WebSocket server instance.
	 */

	var isWebRtc = false;
	var users = new Map();
	var crdtUsers = new Map<any, Array<any>>();
	var webSocketGroup = new Map<String, Array<any>>();
	var webSocketUser = new Map<any, any>();
    const wss = new WebSocket.Server(webSocketArgs);
	/**
	 * Casual broadcasting server onconnection function main routine.
	 */

	console.log("Web Socket server initialize..")

    wss.on('connection', function connection(ws : any) {

		// Pong function of the server.
		ws.on('pong', function heartbeat() {
			console.log("pong");
		});

		// Broacast function of the server.
		ws.on('message', function incoming(data : string) {
			// TODO: Heroku server console log.

			var message;
			try {
				message = JSON.parse(data);
				if(message.webRtc != null && message.webRtc) {
					isWebRtc = true;
				}
			} catch(e) {
				message = {};
			}

			if(isWebRtc) {
				console.log(message)
				switch(message.type) {
					case "register":
						console.log("User logged in: ", message.name);
						if(users.has(message.name)) {
							console.log(users.get(message.name));
							sendWebRtcSignalMessage(ws, { 
								type: "register", 
								success: false
							}); 
						} else {
							users.set(message.name, ws);
							ws.name = message.name;
							sendWebRtcSignalMessage(ws, { 
								type: "register", 
								success: true
							});
	
							if(crdtUsers.has(message.crdtName)) {
								let crdtusers = crdtUsers.get(message.crdtName);
								sendWebRtcSignalMessage(ws, { 
									type: "connect", 
									users: crdtusers
								});
							} else {
								crdtUsers.set(message.crdtName, new Array<any>());
							}
	
							let crdtusers = crdtUsers.get(message.crdtName);
							crdtusers?.push(message.name);
						}
						break;
					
					case "offer":
						console.log("Sending offer to: ", message.name); 
						var conn = users.get(message.name);
						if(conn != null) {
							ws.otherName = message.name;
							sendWebRtcSignalMessage(conn, {
								type: "offer",
								offer: message.offer,
								name: ws.name,
								requestName: message.requestName
							});
						}
						break;
					
					case "answer":
						console.log("Sending answer to: ", message.name); 
						var conn = users.get(message.name);
						if(conn != null) {
							ws.otherName = message.name;
							sendWebRtcSignalMessage(conn, {
								type: "answer",
								answer: message.answer,
							});
						}
						break;
					
					case "candidate":
						console.log("Sending candidate to:", message.name);						
						var conn = users.get(message.name);
						if(conn != null) {
							ws.otherName = message.name;
							sendWebRtcSignalMessage(conn, {
								type: "candidate",
								candidate: message.candidate,
							});
						}
						break;
					
					case "leave":
						console.log("Disconnecting from", message.name); 
						var conn = users.get(message.name); 
						conn.otherName = ""; 
							
						if(conn != null) {
							sendWebRtcSignalMessage(conn, { 
								type: "leave"
							});
						}  		
						break;
	
					default:
						sendWebRtcSignalMessage(ws, { 
							type: "error", 
							message: "Command no found: " + message.type 
						});
						break;
				}
			} else {
				if(message.type == "register") {
					if(!webSocketGroup.has(message.group)) {
						webSocketGroup.set(message.group, new Array<any>());
					}
					webSocketGroup.get(message.group)!.push(ws);
				} else {
					if(webSocketGroup.has(message.group)) {
						webSocketGroup.get(message.group)!.forEach(function each(client : any) {
							if (client !== ws && client.readyState === WebSocket.OPEN) {
								client.send(data);
							}
						});
					} else {
						wss.clients.forEach(function each(client : any) {
							// Broadcasting to every other connected WebSocket clients, excluding itself.
							if (client !== ws && client.readyState === WebSocket.OPEN) {
								client.send(data);
							}
						});
					}
				}
			}
		});

		ws.on("close", function() { 			
			if(isWebRtc && ws.name) { 
				users.delete(ws.name);
				crdtUsers.clear();
				   
				if(ws.otherName) { 
				   console.log("Disconnecting from ", ws.otherName); 
				   var conn = users.get(ws.otherName); 
				   // conn.otherName = null;
					   
				   if(conn != null) {
					    sendWebRtcSignalMessage(conn, {
							type: "leave" 
					  	}); 
				    }  
				} 
			} 
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