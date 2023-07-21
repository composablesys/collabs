import { CCounter, CRuntime } from "@collabs/collabs";
import { WebSocketNetwork } from "@collabs/ws-client";

(async function () {
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

  // Connect to the server over WebSocket.
  // For demo purposes, we wait to call connect() until below;
  // you can instead just remove the { connect: false } option.
  const wsURL = location.origin.replace(/^http/, "ws");
  const wsNetwork = new WebSocketNetwork(wsURL, { connect: false });
  wsNetwork.on("Load", (e) => {
    console.log(`Loaded doc "${e.docID}" from the server.`);
  });
  wsNetwork.subscribe(doc, "counter");

  // In a real app, you would also connect to on-device storage, e.g.,
  // using IndexedDBDocStore from @collabs/storage.
  // We don't do that here because our demo server frequently resets the
  // doc's state.

  // "Connected" checkbox, to let the user demo concurrency.
  const connected = document.getElementById("connected") as HTMLInputElement;
  connected.checked = localStorage.getItem("connected") !== "false";
  if (connected.checked) wsNetwork.connect();
  connected.addEventListener("click", () => {
    localStorage.setItem("connected", connected.checked + "");
    if (connected.checked) wsNetwork.connect();
    else wsNetwork.disconnect();
  });
})();
