import { WebSocketNetwork } from "compoventuals-ws-client";

// TODO: load/save of BroadcastNetwork.  Not automatically
// managed by Runtime.  We could either let load/save
// pass across the iframe and back (seems convoluted and
// would require async load/save), or have this host
// do so as part of its own load/save functions (preferred).

const HOST = location.origin.replace(/^http/, "ws");
const network = new WebSocketNetwork(HOST, "container");

// Pipe network through the IFrame
const iframe = document.getElementById("iframe")! as HTMLIFrameElement;
const iframeWindow = iframe.contentWindow!;

// The IFrame takes some time to load, until when it will
// not be listening for messages.  So we need to queue
// received messages until it signals that it is ready.
let iframeLoadQueue: Uint8Array[] | undefined = []; // undefined iff already loaded
network.onReceive = (message) => {
  if (iframeLoadQueue === undefined) {
    // TODO: insecure targetOrigin
    iframeWindow.postMessage({ message }, "*");
  } else {
    // Queue until load event
    iframeLoadQueue.push(message);
  }
};
window.addEventListener(
  "message",
  (event) => {
    if (event.source !== iframeWindow) return;
    switch (event.data.type as "onready" | "message") {
      case "onready":
        // Dispatch queued messages.
        // In theory we could listen for iframe's "load" event instead,
        // but there is the danger that the iframe could load
        // before we can add our event listener, in which
        // case we will never know that it's ready.
        // Known workarounds (https://stackoverflow.com/a/36155560)
        // appear more complicated than just using postMessage.
        for (const message of iframeLoadQueue!) {
          // TODO: insecure targetOrigin
          iframeWindow.postMessage({ message }, "*");
        }
        iframeLoadQueue = undefined;
        break;
      case "message":
        network.send(event.data.message);
        break;
    }
  },
  false
);
