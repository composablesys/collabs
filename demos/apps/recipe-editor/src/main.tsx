import { WebSocketNetwork } from "@collabs/ws-client";
import React from "react";
import ReactDOM from "react-dom";
import { Loader } from "./loader";

// --- Network/storage setup ---

// Connect to the server over WebSocket.
const wsURL = location.origin.replace(/^http/, "ws");
const wsNetwork = new WebSocketNetwork(wsURL, { connect: false });
wsNetwork.on("Load", (e) => {
  console.log(`Loaded doc "${e.docID}" from the server.`);
});
wsNetwork.on("Save", (e) => {
  console.log(`Saved all local updates to doc "${e.docID}" to the server`);
});
wsNetwork.on("Connect", () => console.log("Connected to the server."));
wsNetwork.on("Disconnect", (e) => {
  // After a disconnection, try to reconnect every 2 seconds, unless
  // we deliberately called wsNetwork.disconnect().
  if (e.cause === "manual") return;
  console.error("WebSocket disconnected due to", e.cause, e.wsEvent);
  setTimeout(() => {
    console.log("Reconnecting...");
    wsNetwork.connect();
  }, 2000);
});

// In a real app, you would probably also add on-device storage
// (@collabs/indexeddb or @collabs/local-storage)
// and cross-tab sync (@collabs/tab-sync).
// See the [Quick Start](https://collabs.readthedocs.io/en/latest/quick_start.html)
// for an example.

// --- "Connected" checkbox for testing concurrency ---

const connected = document.getElementById("connected") as HTMLInputElement;
connected.checked = localStorage.getItem("connected") !== "false";
if (connected.checked) {
  // Instead of calling connect() here, you can just remove WebSocketNetwork's
  // { connect: false } option above.
  wsNetwork.connect();
}
connected.addEventListener("click", () => {
  localStorage.setItem("connected", connected.checked + "");
  if (connected.checked) wsNetwork.connect();
  else wsNetwork.disconnect();
});

// --- App code ---

const docID = "recipe-editor";

ReactDOM.render(
  <Loader docID={docID} wsNetwork={wsNetwork} />,
  document.getElementById("app")!
);
