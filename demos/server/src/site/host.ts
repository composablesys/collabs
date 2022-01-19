import * as collabs from "@collabs/collabs";
import { CRDTContainerHost } from "@collabs/container";
import { WebSocketNetwork } from "@collabs/ws-client";
import { MatrixWidgetNetwork } from "@collabs/matrix-widget";

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
let network: collabs.BroadcastNetwork;
let batchingStrategy: collabs.BatchingStrategy;
switch (networkType) {
  case "ws": {
    const wsAddr = location.origin.replace(/^http/, "ws");
    // TODO: shorter group name than containerUrl?
    network = new WebSocketNetwork(wsAddr, containerUrl);
    batchingStrategy = new collabs.RateLimitBatchingStrategy(0);
    break;
  }
  case "matrix":
    network = new MatrixWidgetNetwork("com.herokuapp.@collabs/tests.counter");
    batchingStrategy = new collabs.RateLimitBatchingStrategy(500);
    break;
  default:
    throw new Error('URL "network" GET parameter invalid: "${networkType}"');
}
const disconnectableNetwork = new collabs.DisconnectableNetwork(network);
const app = new collabs.CRDTApp(disconnectableNetwork, { batchingStrategy });

// Add the container in an IFrame,
// initially hidden so that user input is blocked.
const iframe = document.createElement("iframe");
iframe.src = containerUrl;
iframe.style.display = "none";
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
const host = app.registerCollab("host", collabs.Pre(CRDTContainerHost)(iframe));

// Show the container once it's ready.
host.nextEvent("ContainerReady").then(() => {
  const loadingDiv = <HTMLDivElement>document.getElementById("loading");
  document.body.removeChild(loadingDiv);
  iframe.style.display = "block";
});

// Skip loading.
app.load(collabs.Optional.empty());

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
  disconnectableNetwork.receiveConnected = receiveConnected.checked;
  disconnectableNetwork.sendConnected = sendConnected.checked;
}
