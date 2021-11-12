import * as crdts from "@collabs/collabs";
import { WebSocketNetwork } from "@collabs/ws-client";

// Create a Runtime using your chosen network.
// Here we use WebSocketNetwork from package @collabs/ws-client,
// which sends messages through a @collabs/ws-server
// via WebSockets.
// (A central server like this is not necessary to use
// Collabs, but it is convenient, especially for local testing.)
const host = location.origin.replace(/^http/, "ws");
const runtime = new crdts.Runtime(new WebSocketNetwork(host, ""));

// We include a simple collaborative counter as an example;
// delete the code below and replace with your own.

// Register collaborative data types.
const counter = runtime.registerCrdt("counter", crdts.Pre(crdts.CCounter)());

// Refresh the display when the Crdt state changes, possibly
// due to a message from another replica.
const display = document.getElementById("display")!;
runtime.on("Change", () => {
  display.innerHTML = counter.value.toString();
});

// Change counter's value on button clicks.
// Note that we need not refresh the display here, since Change
// events are also triggered by local operations.
document.getElementById("increment")!.onclick = () => {
  counter.add(100);
};
document.getElementById("decrement")!.onclick = () => {
  counter.add(-100);
};
document.getElementById("reset")!.onclick = () => {
  counter.reset();
};
