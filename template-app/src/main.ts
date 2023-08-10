import { CCounter, CRuntime } from "@collabs/collabs";
import { IndexedDBDocStore } from "@collabs/indexeddb";
import { TabSyncNetwork } from "@collabs/tab-sync";
import { WebSocketNetwork } from "@collabs/ws-client";

// --- App code ---

const doc = new CRuntime();

// We include a simple collaborative counter as an example
// (the code from here to "Network/storage setup").

// Register Collabs.
const counter = doc.registerCollab("counter", (init) => new CCounter(init));

// Refresh the display when the Collabs state changes, possibly
// due to a message from another user.
const display = document.getElementById("display")!;
function refreshDisplay() {
  display.innerHTML = counter.value.toString();
}
doc.on("Change", refreshDisplay);

// Change counter's value on button clicks.
// Note that we don't need to refresh the display here, since Change
// events are also triggered by local operations.
document.getElementById("increment")!.onclick = () => counter.add(1);

// --- Network/storage setup ---

const docID = "counter";

// Connect to the server over WebSocket.
const wsURL = "ws://localhost:3001/";
const wsNetwork = new WebSocketNetwork(wsURL);
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

wsNetwork.subscribe(doc, docID);

// Add cross-tab sync, so that local tabs share updates quickly,
// even when offline.
const tabSync = new TabSyncNetwork();
tabSync.on("Error", (e) => {
  console.error("TabSyncNetwork error:", e.err);
});

tabSync.subscribe(doc, docID);

// Add on-device storage in IndexedDB, so the app is closer to "local-first".
const docStore = new IndexedDBDocStore();
docStore.on("Error", (e) => {
  console.error("IndexedDBDocStore error:", e.err);
});

docStore.subscribe(doc, docID);
