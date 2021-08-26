import { WebSocketNetwork } from "compoventuals-ws-client";

// Change this file to change the app.
const CONTAINER_SOURCE_FILE = "containers/counter.js";

// TODO: load/save of BroadcastNetwork.  Not automatically
// managed by Runtime.  We could either let load/save
// pass across the iframe and back (seems convoluted and
// would require async load/save), or have this host
// do so as part of its own load/save functions (preferred).
const HOST = location.origin.replace(/^http/, "ws");
const network = new WebSocketNetwork(HOST, "container");

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
  $.ajax({ url: CONTAINER_SOURCE_FILE, dataType: "text", success: resolve });
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
