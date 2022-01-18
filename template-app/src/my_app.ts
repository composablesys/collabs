import * as collabs from "@collabs/collabs";
import { WebSocketNetwork } from "@collabs/ws-client";

// Create a Runtime using your chosen network.
// Here we use WebSocketNetwork from package @collabs/ws-client,
// which sends messages through a @collabs/ws-server
// via WebSockets.
// (A central server like this is not necessary to use
// Collabs, but it is convenient, especially for local testing.)
const host = location.origin.replace(/^http/, "ws");
const app = new collabs.CRDTApp(new WebSocketNetwork(host, ""));

// We include a simple collaborative counter as an example;
// delete the code below and replace with your own.

// Register collaborative data types.
const counterCollab = app.registerCollab(
  "counter",
  collabs.Pre(collabs.CCounter)()
);

// Load prior saved state.
// For this starter file, we don't have any prior saved state,
// but we still have to call app.load to indicate that loading is skipped.
app.load(collabs.Optional.empty());

// Display the loaded state.
const display = document.getElementById("display")!;
function refreshDisplay() {
  display.innerHTML = counterCollab.value.toString();
}
refreshDisplay();

// Refresh the display when the Collab state changes, possibly
// due to a message from another replica.
app.on("Change", refreshDisplay);

// Change counterCollab's value on button clicks.
// Note that we don't need to refresh the display here, since Change
// events are also triggered by local operations.
document.getElementById("increment")!.onclick = () => {
  counterCollab.add(100);
};
document.getElementById("decrement")!.onclick = () => {
  counterCollab.add(-100);
};
document.getElementById("reset")!.onclick = () => {
  counterCollab.reset();
};
