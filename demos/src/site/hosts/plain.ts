import { isContainerSource } from "compoventuals-container";
import * as crdts from "compoventuals";
import { WebSocketNetwork } from "compoventuals-ws-client";
import { WebRtcNetwork } from "compoventuals-webrtc-client";
import { MatrixWidgetNetwork } from "compoventuals-matrix-widget";

(async function () {
  const body = document.body;

  // Extract the name of the ContainerSource file to import
  // from the URL's "container" GET parameter.
  // If container points to a local file (relative path),
  // it must be relative to this file's location.
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("container")) {
    body.innerHTML = 'URL missing "container" GET parameter.';
    return;
  }
  const containerUrl = urlParams.get("container")!;
  console.log("containerUrl: " + containerUrl);

  // Import the ContainerSource.
  const imported = await import(/* webpackIgnore: true */ containerUrl);
  // TODO: we would prefer to do it this way and use
  // output.libraryTarget: "module" in webpack.config.ts,
  // but the feature is still in dev and broken last
  // time I tried it.  If changing, also remove
  // above check for window.compoventuals_ContainerSource.
  // const containerSource = imported.default;
  // TODO: need to use unique per-instance names,
  // it's possible multiple import()s could be pending
  // at once, and then they will fight over the name.
  // Make clear in docs what name to use, how to set.
  const containerSource = (window as any).compoventuals_ContainerSource;
  delete (window as any).compoventuals_ContainerSource;
  if (!isContainerSource(containerSource)) {
    body.innerHTML = `"container" param ${containerUrl} did not yield a ContainerSource`;
    return;
  }

  // Extract the type of network to use from the URL's
  // "network" GET parameter.
  // Need to construct the network after the above "await"
  // or we will start receiving messages before the Runtime
  // is constructed.
  if (!urlParams.has("network")) {
    document.body.innerHTML = 'URL missing "network" GET parameter.';
    return;
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
      document.body.innerHTML =
        'URL "network" GET parameter invalid: "${networkType}"';
      return;
  }

  // Attach the container.
  const shadowRoot = body.attachShadow({ mode: "open" });
  const runtime = new crdts.Runtime(network, { periodMs: 200 });
  containerSource.attachNewContainer(shadowRoot, runtime);
})();
