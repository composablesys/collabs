import { startWebSocketServer } from "@collabs/ws-server";
import express from "express";
import fs from "fs";
import path from "path";
import https from "https";
import { Server } from "http";

const port = process.env.PORT || 3000;

const app = express();
// Serve app files in ../dist/
app.use("/dist", express.static(path.join(__dirname, "../dist")));
// Serve test server files in static/
app.use((req, res) => {
  if (req.path === "/reset.html") {
    resetMessageHistory();
  }
  res.sendFile(req.path, { root: path.join(__dirname, "static") });
});

let server: Server;
const args = process.argv.slice(2);
// If option -s, --https is set, start an HTTPS server with
// a fake (insecure, self-signed) key.
if (args[0] === "--https" || args[0] === "-s") {
  console.log("https mode");
  const key = fs.readFileSync(path.join(__dirname, "keys/demo-key.pem"));
  const cert = fs.readFileSync(path.join(__dirname, "keys/demo-cert.pem"));
  server = https
    .createServer({ key, cert }, app)
    .listen(port, () => console.log(`Listening at https://localhost:${port}/`));
} else {
  server = app.listen(port, () =>
    console.log(`Listening at http://localhost:${port}/`)
  );
}

// Run the @collabs/ws-server.
const { reset } = startWebSocketServer({ server });
// If you replace @collabs/ws-server with something else,
// remove resetMessageHistory() and reset.html.
function resetMessageHistory() {
  reset();
  console.log("reset message history");
}
