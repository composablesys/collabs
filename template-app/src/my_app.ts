import * as collabs from "@collabs/collabs";
import { WebSocketNetwork } from "@collabs/ws-client";

// Create a CRDTApp.
const app = new collabs.CRDTApp();

// Attach your chosen network(s).
// Here we use WebSocketNetwork from package @collabs/ws-client,
// which sends messages through a @collabs/ws-server
// via WebSockets.
// (A central server like this is not necessary to use
// Collabs, but it is convenient, especially for local testing.)
const host = location.origin.replace(/^http/, "ws");
const network = new WebSocketNetwork(app, host, "");

// We include a simple collaborative counter as an example;
// delete the code below and replace with your own.

// Register collaborative data types.
const counterCollab = app.registerCollab(
  "counter",
  collabs.Pre(collabs.CCounter)()
);

// Refresh the display when the Collab state changes, possibly
// due to a message from another replica.
const display = document.getElementById("display")!;
function refreshDisplay() {
  display.innerHTML = counterCollab.value.toString();
}
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

// Skip loading for this template.
// In a real app, you will instead have to manage loading
// See TODO (loading/init docs).
app.load(collabs.Optional.empty());

// Display the loaded state.
refreshDisplay();

// TODO: here, only request messages we need from the server.
// (Currently, network requests them all as part of its constructor).
