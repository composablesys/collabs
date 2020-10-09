"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compoventuals_server_1 = require("compoventuals-server");
// Express server based on https://devcenter.heroku.com/articles/node-websockets
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const ROOT = __dirname + "../../../demoserver/public/deploy/site";
const server = express()
    .use((req, res) => res.sendFile(req.path, { root: ROOT }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
// Initialize the WebSocket server instance.
//const wss = new WebSocket.Server({ port: 8080 });
compoventuals_server_1.startServer({ server });
//# sourceMappingURL=demo_server.js.map