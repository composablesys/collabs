import * as collabs from "@collabs/collabs";
import { CRDTContainerHost } from "@collabs/container";
import { WebSocketNetwork } from "@collabs/ws-client";
import { MatrixWidgetNetwork } from "@collabs/matrix-widget";

// From containerUrl.js, included in main script.
// (Not including it here since it's not a real file and
// Webpack will get confused.)
declare const containerUrl: string;
// console.log("containerUrl: " + containerUrl);

// Extract the type of network to use from the URL's
// "network" GET parameter.
const urlParams = new URLSearchParams(window.location.search);
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
    network = new WebSocketNetwork(wsAddr, "");
    batchingStrategy = new collabs.RateLimitBatchingStrategy(0);
    break;
  }
  case "matrix":
    network = new MatrixWidgetNetwork(
      "container-testing-server." + containerUrl
    );
    batchingStrategy = new collabs.RateLimitBatchingStrategy(500);
    break;
  default:
    throw new Error('URL "network" GET parameter invalid: "${networkType}"');
}
const disconnectableNetwork = new collabs.DisconnectableNetwork(network);
const app = new collabs.CRDTApp(disconnectableNetwork, { batchingStrategy });

// Add the container in an IFrame.
// Initially hidden so that user input is blocked.
const iframe = document.createElement("iframe");
iframe.src = containerUrl;
iframe.style.display = "none";
document.body.appendChild(iframe);
// Set title to that of the container.
// TODO: replace with metadata
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

// TODO: use metadata (including dynamically).

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

// TODO: save/load testing: button to save; button to
// load most recent save; allow playing with the save
// before playing back missing messages; network needs
// to behave properly upon loading (replay only messages
// since the last save).
// saving should await host.compactSaveData() before actually
// saving the app.
// Otherwise don't compact (to prevent bugs caused by saving
// from happening when the user doesn't expect it, e.g.,
// in case they haven't implemented saving and it throws
// an error). But remark that a real app should be doing so,
// so people looking to this code for host-programming-guidance
// know that it's missing.
