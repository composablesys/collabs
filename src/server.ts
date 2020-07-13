// This server class will implement broadcasting all messages
// that a client WebSocket broadcasting to every other 
// connected WebSocket clients, excluding itself.

// import * as http from 'http';
import * as WebSocket from 'ws';
// import { AddressInfo } from 'net';

// initialize the WebSocket server instance
const wss = new WebSocket.Server({ port: 8080 });

// broacast function of the server
wss.on('connection', function connection(ws : WebSocket) {
    ws.on('message', function incoming(data : ArrayBufferView | ArrayBuffer | any) {
      wss.clients.forEach(function each(client : any) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });