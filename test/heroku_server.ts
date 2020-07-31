import {startBroadcastServer} from "../src/server";
import express = require('express');

// Express server based on https://devcenter.heroku.com/articles/node-websockets
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const ROOT = __dirname + "../../../public";

const server = express()
  .use((req, res) => res.sendFile(req.path, { root: ROOT }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


// Initialize the WebSocket server instance.
//const wss = new WebSocket.Server({ port: 8080 });
startBroadcastServer({ server });
