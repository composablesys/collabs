import * as crdts from "compoventuals";
import { MatrixWidgetNetwork } from "compoventuals-matrix-widget";
import { WebRtcNetwork } from "compoventuals-webrtc-client";
import { WebSocketNetwork } from "compoventuals-ws-client";

(function () {
  // Extract the name of the ContainerSource file to import
  // from the URL's "container" GET parameter.
  // If container points to a local file (relative path),
  // it must be relative to this file's location.
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("container")) {
    document.body.innerHTML = 'URL missing "container" GET parameter.';
    return;
  }
  const containerUrl = urlParams.get("container")!;
  console.log("containerUrl: " + containerUrl);

  // Extract the type of network to use from the URL's
  // "network" GET parameter.
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
      network = new WebSocketNetwork(HOST, "sandbox-" + containerUrl);
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

  // TODO: load/save of BroadcastNetwork.  Not automatically
  // managed by Runtime.  We could either let load/save
  // pass across the iframe and back (seems convoluted and
  // would require async load/save), or have this sandbox
  // do so as part of its own load/save functions (preferred).

  const iframe = document.getElementById("iframe")! as HTMLIFrameElement;
  const iframeWindow = iframe.contentWindow!;

  let isReady = false;

  // Listen for the IFrame's "ready" message.
  // In theory we could listen for iframe's "load" event instead,
  // but there is the danger that the iframe could load
  // before we can add our event listener, in which
  // case we will never know that it's ready.
  // Known workarounds (https://stackoverflow.com/a/36155560)
  // appear more complicated than just using a "ready" message.
  // TODO: what if we don't receive the "ready" message, for the
  // same reason?
  // TODO: move to sandbox package?
  const readyPromise = new Promise<void>((resolve) => {
    function messageListener(event: MessageEvent<any>) {
      if (event.source !== iframeWindow) return;
      if (event.data.type !== "ready") return;
      isReady = true;
      window.removeEventListener("message", messageListener);
      resolve();
    }
    window.addEventListener("message", messageListener, false);
  });

  // Pipe network through the IFrame.
  // The IFrame takes some time to load, until when it will
  // not be listening for messages.  So we need to queue
  // received messages until readyPromise resolves.
  let iframeLoadQueue: Uint8Array[] = [];
  network.onReceive = (message) => {
    if (isReady) {
      // TODO: insecure targetOrigin
      iframeWindow.postMessage({ type: "message", message }, "*");
    } else {
      // Queue until isReady
      iframeLoadQueue.push(message);
    }
  };
  window.addEventListener(
    "message",
    (event) => {
      if (event.source !== iframeWindow) return;
      if (event.data.type !== "message") return;
      network.send(event.data.message);
    },
    false
  );

  // Load containerSourceFile and send it to the IFrame
  // once it isReady.
  const loadContainerSourcePromise = new Promise<string>((resolve) => {
    // TODO: this will be blocked by CORS if it's not a file
    // on the same server.
    $.ajax({ url: containerUrl, dataType: "text", success: resolve });
  });

  Promise.all([loadContainerSourcePromise, readyPromise]).then((value) => {
    const containerSourceJs = value[0];
    // TODO: insecure targetOrigin
    iframeWindow.postMessage(
      {
        type: "containerSource",
        containerSourceJs,
      },
      "*"
    );
    // Dispatch queued messages.
    for (const message of iframeLoadQueue!) {
      // TODO: insecure targetOrigin
      iframeWindow.postMessage({ type: "message", message }, "*");
    }
    iframeLoadQueue = [];
  });
})();
