import { startServer } from "compoventuals-server";
import express from "express";
import fs from "fs";
import https from "https";

// Express server based on https://devcenter.heroku.com/articles/node-websockets
const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";
const ROOT = __dirname + "/../site";

const app = express().use((req, res) => res.sendFile(req.path, { root: ROOT }));

let server;
let args = process.argv.slice(2);
if (args[0] === "https") {
  console.log("Using https with fake certificate");
  const key = fs.readFileSync("keys/demo-key.pem");
  const cert = fs.readFileSync("keys/demo-cert.pem");
  server = https
    .createServer({ key, cert }, app)
    .listen(PORT, () => console.log(`Listening on ${PORT}`));
} else {
  server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

// Initialize the WebSocket server instance.
//const wss = new WebSocket.Server({ port: 8080 });
startServer({ server });
