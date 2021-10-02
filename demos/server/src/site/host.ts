import * as crdts from "@collabs/collabs";
import { ContainerHost } from "@collabs/container";
import { WebSocketNetwork } from "@collabs/ws-client";
import { MatrixWidgetNetwork } from "@collabs/matrix-widget";

// TODO: future features:
// - save & load button that also reports how long it takes

// Extract the container & type of network to use from the URL's
// GET parameters.
const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has("container")) {
  throw new Error('URL missing "container" GET parameter.');
}
const containerUrl = urlParams.get("container")!;
// console.log("containerUrl: " + containerUrl);
if (!urlParams.has("network")) {
  throw new Error('URL missing "network" GET parameter.');
}
const networkType = urlParams.get("network")!;
// console.log("networkType: " + networkType);

// Setup Runtime.
let network: crdts.BroadcastNetwork;
let batchingStrategy: crdts.BatchingStrategy;
switch (networkType) {
  case "ws": {
    const wsAddr = location.origin.replace(/^http/, "ws");
    // TODO: shorter group name than containerUrl?
    network = new WebSocketNetwork(wsAddr, containerUrl);
    batchingStrategy = new crdts.RateLimitBatchingStrategy(0);
    break;
  }
  case "matrix":
    network = new MatrixWidgetNetwork(
      "com.herokuapp.@collabs/tests.counter"
    );
    batchingStrategy = new crdts.RateLimitBatchingStrategy(500, false);
    break;
  default:
    throw new Error('URL "network" GET parameter invalid: "${networkType}"');
}
const disonnectableNetwork = new crdts.DisconnectableNetwork(network);
const runtime = new crdts.Runtime(disonnectableNetwork, batchingStrategy);

// Add the container in an IFrame.
const iframe = document.createElement("iframe");
iframe.src = containerUrl;
document.body.appendChild(iframe);
// Set title to that of the container.
iframe.addEventListener("load", () => {
  // contentDocument is only non-null if IFrame is from the
  // same origin.
  if (iframe.contentDocument !== null) {
    document.title = iframe.contentDocument.title;
  } else {
    // TODO: use metadata from the container
    document.title = "Container";
  }
});

// Attach the container.
const host = runtime.registerCrdt("host", crdts.Pre(ContainerHost)(iframe));

// TODO: loading.  Make sure to block GUI until host says it's complete.

// App controls

const connected = <HTMLInputElement>document.getElementById("connected");
const sendConnected = <HTMLInputElement>(
  document.getElementById("sendConnected")
);
const receiveConnected = <HTMLInputElement>(
  document.getElementById("receiveConnected")
);

connected.addEventListener("click", () => {
  // connected just forces the state of the others.
  sendConnected.checked = connected.checked;
  receiveConnected.checked = connected.checked;
  updateNetwork();
});
sendConnected.addEventListener("click", updateNetwork);
receiveConnected.addEventListener("click", updateNetwork);
function updateNetwork() {
  // connected state.
  if (sendConnected.checked !== receiveConnected.checked) {
    connected.indeterminate = true;
  } else {
    connected.indeterminate = false;
    connected.checked = sendConnected.checked;
  }
  // Affect network.
  disonnectableNetwork.receiveConnected = receiveConnected.checked;
  disonnectableNetwork.sendConnected = sendConnected.checked;
}

// const saveLoad = <HTMLButtonElement>document.getElementById("saveLoad");
// saveLoad.addEventListener("clicked", () => {
//   // TODO: save, recreate, then load, without repeating
//   // message history.
// });
