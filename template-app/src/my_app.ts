import * as crdts from "compoventuals";
import { WebSocketNetwork } from "compoventuals-ws-client";

// Create a Runtime using our chosen network.
// Here we use WebSocketNetwork from package compoventuals-ws-client,
// which sends messages through a compoventuals-ws-server
// via WebSockets.
// (A central server like this is not necessary to use
// compoventuals, but it is convenient, especially for local testing.)
const host = location.origin.replace(/^http/, "ws");
const runtime = new crdts.Runtime(new WebSocketNetwork(host, "counter"));

// We include a simple collaborative counter as an example;
// delete the code below and replace with your own.

// Register collaborative data types.
const counterCrdt = runtime.registerCrdt(
  "counter",
  crdts.Pre(crdts.CCounter)()
);

// Refresh the display when the Crdt state changes, possibly
// due to a message from another replica.
const display = document.getElementById("display")!;
runtime.on("Change", () => {
  display.innerHTML = counterCrdt.value.toString();
});

// Change counterCrdt's value on button clicks.
// Note that we need not refresh the display here, since Change
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
