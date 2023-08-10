import { WebSocketNetworkServer } from "@collabs/ws-server";
import express from "express";
import path from "path";
import { WebSocketServer } from "ws";

// Server for collabs-demos.herokuapp.com.

const port = process.env.PORT || 3000;

// Using express, serve:
// - server/src/site at "/"
// - Each demo's dist/ folder at "/<demo name>/"
const app = express();
app.use((req, res) => {
  const firstSlash = req.path.indexOf("/", 1);
  if (firstSlash === -1) {
    // Send `server/src/site/${afterFolder}`.
    const afterFolder = req.path.slice(1);
    res.sendFile(path.join(__dirname, "../site/", afterFolder));
  } else {
    // Split req.path into `/${folder}/${afterFolder}`.
    const folder = req.path.slice(1, firstSlash);
    const afterFolder = req.path.slice(firstSlash + 1);
    // Send `${folder}/dist/${afterFolder}`.
    res.sendFile(
      path.join(__dirname, "../../../", folder, "dist/", afterFolder)
    );
  }
});
const server = app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}/`)
);

// Run the @collabs/ws-server with its default InMemoryDocStore.
// In a real app, you would modify the server's code to add authentication
// and a ServerDocStore that saves to persistent storage.
const wss = new WebSocketServer({ server });
new WebSocketNetworkServer(wss);
