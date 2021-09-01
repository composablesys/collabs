import * as crdts from "compoventuals";
import { ContainerHost } from "compoventuals-container";
import { WebSocketNetwork } from "compoventuals-ws-client";
import { WebRtcNetwork } from "compoventuals-webrtc-client";
import { MatrixWidgetNetwork } from "compoventuals-matrix-widget";

// Extract the name of the ContainerSource file to import
// from the URL's "container" GET parameter.
// If container points to a local file (relative path),
// it must be relative to this file's location.
const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has("container")) {
  throw new Error('URL missing "container" GET parameter.');
}
const containerUrl = urlParams.get("container")!;
console.log("containerUrl: " + containerUrl);

// Extract the type of network to use from the URL's
// "network" GET parameter.
if (!urlParams.has("network")) {
  throw new Error('URL missing "network" GET parameter.');
}
const networkType = urlParams.get("network")!;
console.log("networkType: " + networkType);
let network: crdts.BroadcastNetwork;
switch (networkType) {
  case "ws": {
    const HOST = location.origin.replace(/^http/, "ws");
    // TODO: shorter group name than containerUrl?
    network = new WebSocketNetwork(HOST, "ws-" + containerUrl);
    break;
  }
  // TODO: waiting until WebRtcNetwork is a BroadcastNetwork
  // case "webrtc": {
  //   const url = new URL(location.origin);
  //   url.protocol = "ws";
  //   url.port = "" + (parseInt(url.port) + 1);
  //   const HOST = url.toString();
  //   // TODO: I don't think this can handle multiple apps
  //   // using the same server.
  //   network = new WebRtcNetwork(HOST);
  //   break;
  // }
  case "matrix":
    network = new MatrixWidgetNetwork(
      "com.herokuapp.compoventuals-tests.counter"
    );
    break;
  default:
    throw new Error('URL "network" GET parameter invalid: "${networkType}"');
}

// Add the container in an IFrame.
const iframe = document.createElement("iframe");
iframe.src = containerUrl;
document.body.appendChild(iframe);
// Set title to that of the container.
iframe.addEventListener("load", () => {
  document.title = iframe.contentDocument!.title;
});

// Attach the container.
const runtime = new crdts.Runtime(network);
const host = runtime.registerCrdt("host", ContainerHost, iframe);

// TODO: loading.  Make sure to block GUI until host says it's complete.
