import * as crdts from "compoventuals";
import { WebRtcNetwork } from "compoventuals-webrtc-client";

// WebRTC signalling server info, connecting to a
// compoventuals-webrtc-server instance.
const url = new URL(location.origin);
url.protocol = "ws";
url.port = "" + (parseInt(url.port) + 1);
const HOST = url.toString();

// Create a Runtime using our chosen network.
// Here we use WebRtcNetwork from package compoventuals-webrtc-client,
// which uses WebRTC to send messages, using
// compoventuals-webrtc-server as the signalling server.
const runtime = new crdts.Runtime(new WebRtcNetwork(HOST));

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
