import * as crdts from "compoventuals";
import { ContainerHost } from "compoventuals-container";
import { WebSocketNetwork } from "compoventuals-ws-client";
import { MatrixWidgetNetwork } from "compoventuals-matrix-widget";

// TODO: future features:
// - buttons to disable sending or receiving, for testing concurrency
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
      "com.herokuapp.compoventuals-tests.counter"
    );
    batchingStrategy = new crdts.RateLimitBatchingStrategy(500, false);
    break;
  default:
    throw new Error('URL "network" GET parameter invalid: "${networkType}"');
}
const runtime = new crdts.Runtime(network, batchingStrategy);

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
