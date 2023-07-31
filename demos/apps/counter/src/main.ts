import { CCounter, CRuntime } from "@collabs/collabs";
import { LocalStorageDocStore } from "@collabs/local-storage";
import { WebSocketNetwork } from "@collabs/ws-client";

// --- App code ---

const doc = new CRuntime();

// Register Collabs.
const counter = doc.registerCollab("counter", (init) => new CCounter(init));

// Refresh the display when the Collabs state changes, possibly
// due to a message from another replica.
const display = document.getElementById("display")!;
function refreshDisplay() {
  display.innerHTML = counter.value.toString();
}
doc.on("Change", refreshDisplay);

// Change counter's value on button clicks.
// Note that we don't need to refresh the display here, since Change
// events are also triggered by local operations.
document.getElementById("increment")!.onclick = () => {
  counter.add(1);
};

// --- Network/storage setup ---

const docID = "counter";

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
  if (e.cause === "disconnect") return;
  console.error("WebSocket disconnected due to", e.cause, e.wsEvent);
  setTimeout(() => {
    console.log("Reconnecting...");
    wsNetwork.connect();
  }, 2000);
});
wsNetwork.subscribe(doc, docID);

// Change to true to store a copy of the doc locally in IndexedDB.
// We disable this for our demos because the server frequently resets
// the doc's state. Disabling is also useful during development.
if (false) {
  // TODO: change to IndexedDB; copy to all demos.
  const docStore = new LocalStorageDocStore();
  docStore.subscribe(doc, docID);
  docStore.on("Load", (e) => {
    console.log(`Loaded doc "${e.docID}" from IndexedDB.`);
  });
}

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
