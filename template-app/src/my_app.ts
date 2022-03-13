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

// Variable collaborative data types.
const counter = app.registerCollab(
  "counter",
  collabs.Pre(collabs.ResettableCCounter)()
);

// Refresh the display when the Collab state changes, possibly
// due to a message from another replica.
const display = document.getElementById("display")!;
function refreshDisplay() {
  display.innerHTML = counter.value.toString();
}
app.on("Change", refreshDisplay);

// Change counter's value on button clicks.
// Note that we don't need to refresh the display here, since Change
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

// Skip loading for this template.
// In a real app, you will instead have to manage loading.
// See https://github.com/composablesys/collabs/blob/master/collabs/docs/saving_and_loading.md
app.load(collabs.Optional.empty());

// Display the loaded state.
refreshDisplay();

// TODO: here, load messages that we sent/received last time but
// that didn't make it into the save data. These should be
// persisted locally for a proper "local-first" experience:
// the app reloads its previous state immediately, without waiting
// for the network.

// TODO: here, only request messages we need from the server.
// (Currently, network requests them all as part of its constructor).
