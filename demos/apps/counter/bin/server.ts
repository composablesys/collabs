import { WebSocketNetworkServer } from "@collabs/ws-server";
import express from "express";
import path from "path";
import { WebSocketServer } from "ws";

// Simple server for running the demo on its own.
// Start with `npm start`.
// The actual demo server instead uses demos/apps/server.

const port = process.env.PORT || 3000;

// Server dist/ with a simple express server.
const app = express();
app.use("/", express.static(path.join(__dirname, "../dist")));
const server = app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}/`)
);

// Run the @collabs/ws-server with its default InMemoryDocStore.
// In a real app, you would modify the server's code to add authentication
// and a ServerDocStore that saves to persistent storage.
new WebSocketNetworkServer(new WebSocketServer({ server }));
