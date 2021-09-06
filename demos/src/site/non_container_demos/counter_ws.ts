import * as crdts from "compoventuals";
import { WebSocketNetwork } from "compoventuals-ws-client";

// WebSocket server info, connecting to a
// compoventuals-ws-server instance.
var HOST = location.origin.replace(/^http/, "ws");

// Create a Runtime using our chosen network.
// Here we use WebSocketNetwork from package compoventuals-ws-client,
// which sends messages through a compoventuals-ws-server
// via WebSockets.
// (A central server like this is not necessary to use
// compoventuals, but it is convenient.)
const runtime = new crdts.Runtime(new WebSocketNetwork(HOST, "counter"));

// Create top-level Crdts to store the collaborative state.
// Here we just need one counter.
const counterCrdt = runtime.registerCrdt(
  "counter",
  crdts.Pre(crdts.CCounter)()
);

const display = document.getElementById("display")!;

// Refresh the display when the Crdt state changes, possibly
// due to a message from another replica.
runtime.on("Change", () => {
  display.innerHTML = counterCrdt.value.toString();
});

// Change counterCrdt's value on button clicks.
// Note that we need not refresh the display here, since Batch
// events are also triggered by local operations.
document.getElementById("increment")!.onclick = () => {
  counterCrdt.add(100);
};
document.getElementById("decrement")!.onclick = () => {
  counterCrdt.add(-100);
};
document.getElementById("reset")!.onclick = () => {
  counterCrdt.reset();
};
