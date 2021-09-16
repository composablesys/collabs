import { startWebSocketServer } from "compoventuals-ws-server";
import express from "express";
import fs from "fs";
import path from "path";
import https from "https";
import { Server } from "http";
import { Command } from "commander";

// Parse args
const program = new Command();
program.option(
  "-s, --https",
  "run in https mode, using a fake (not secret, self-signed) certificate"
);
program.name("npm start");
program.parse();

const app = express();

// Serve the main repo folder under /demos.
app.use(
  "/demos",
  express.static(path.join(__dirname, "../../.."), {
    setHeaders: (res) => {
      // Allow CORS, so you can get the files with AJAX
      // from a selector host.
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);

// Serve test server files in build/site (we'll be in build/server).
app.use((req, res) => {
  if (req.path === "/reset.html") {
    resetMessageHistory();
  }
  res.sendFile(req.path, { root: path.join(__dirname, "../site") });
});

const port = process.env.PORT || 3000;
let server: Server;
// If option --https is set, start an HTTPS server with
// a fake (insecure, self-signed) key.
if (program.opts().https) {
  const key = fs.readFileSync(path.join(__dirname, "../../keys/demo-key.pem"));
  const cert = fs.readFileSync(
    path.join(__dirname, "../../keys/demo-cert.pem")
  );
  server = https
    .createServer({ key, cert }, app)
    .listen(port, () => console.log(`Listening at https://localhost:${port}/`));
} else {
  server = app.listen(port, () =>
    console.log(`Listening at http://localhost:${port}/`)
  );
}

// Run the compoventuals-ws-server.
const { reset } = startWebSocketServer({ server });
// If you replace compoventuals-ws-server with something else,
// remove resetMessageHistory() and reset.html.
function resetMessageHistory() {
  reset();
  console.log("reset message history");
}
