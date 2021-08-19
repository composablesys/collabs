import { WebSocketNetwork } from "compoventuals-ws-client";

// Change this file to change the app.
// It must "export default" an instance of ContainerSource
// that requires no networking (including loading other files).
const CONTAINER_SOURCE_FILE = "containers/counter.js";

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
    iframeWindow.postMessage({ type: "message", message }, "*");
  } else {
    // Queue until load event
    iframeLoadQueue.push(message);
  }
};
window.addEventListener(
  "message",
  (event) => {
    // TODO: separate into different listeners.
    // Remove readyForMessages listener once it's done.
    if (event.source !== iframeWindow) return;
    switch (event.data.type as "readyForMessages" | "message") {
      case "readyForMessages":
        // Dispatch queued messages.
        // In theory we could listen for iframe's "load" event instead,
        // but there is the danger that the iframe could load
        // before we can add our event listener, in which
        // case we will never know that it's ready.
        // Known workarounds (https://stackoverflow.com/a/36155560)
        // appear more complicated than just using postMessage.
        for (const message of iframeLoadQueue!) {
          // TODO: insecure targetOrigin
          iframeWindow.postMessage({ type: "message", message }, "*");
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

// Load containerSourceFile and send it to the IFrame
// once it is readyForContainer.
const loadContainerSourcePromise = new Promise<string>((resolve) => {
  // TODO: this will be blocked by CORS if it's not a file
  // on the same server.
  $.ajax({ url: CONTAINER_SOURCE_FILE, success: resolve });
});
// Listen for the IFrame's readyForContainer message.
const readyForContainerPromise = new Promise<void>((resolve) => {
  function messageListener(event: MessageEvent<any>) {
    if (event.source !== iframeWindow) return;
    if (event.data.type !== "readyForContainer") return;
    window.removeEventListener("message", messageListener);
    resolve();
  }
  window.addEventListener("message", messageListener, false);
});
Promise.all([loadContainerSourcePromise, readyForContainerPromise]).then(
  (value) => {
    const containerSourceJs = value[0];
    // TODO: insecure targetOrigin
    iframeWindow.postMessage(
      { type: "containerSource", containerSourceJs },
      "*"
    );
  }
);
