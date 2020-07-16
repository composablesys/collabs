import * as http from 'http';
import * as WebSocket from 'ws';
import { AddressInfo } from 'net';


// This CRDT server will broadcast all messages that a client 
// WebSocket broadcasting to every other connected WebSocket clients, excluding itself.


// Initialize the WebSocket server instance.
const wss = new WebSocket.Server({ port: 8080 });

// Broacast function of the server.
wss.on('connection', function connection(ws : any) {
    ws.on('message', function incoming(data : string) {
      wss.clients.forEach(function each(client : any) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });