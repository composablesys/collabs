import * as collabs from "@collabs/collabs";
import { CRDTContainerHost } from "@collabs/container";
import { WebSocketNetwork } from "@collabs/ws-client";

// Extract the container to use from the URL's
// GET parameters.
const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has("container")) {
  throw new Error('URL missing "container" GET parameter.');
}
const containerUrl = urlParams.get("container")!;

const doLoad = window.location.search === "?load=true";
if (doLoad) {
  // Get rid of the GET parameter in the address bar,
  // so it doesn't automatically happen on refresh.
  window.history.pushState(
    {},
    document.title,
    window.location.origin + window.location.pathname
  );
}

// --- Setup our app ---

const app = new collabs.CRDTApp();
const wsAddr = location.origin.replace(/^http/, "ws");
const network = new WebSocketNetwork(app, wsAddr, "");

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
    // TODO: should change this whole thing to use messages
    // from the container, since different origins is the
    // common case.
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

// Skip loading, since the demo server's state is not
// persistent anyway.
// See TODO (initialization docs with list of steps)
// for what you should do in a real app.
app.load(collabs.Optional.empty());

// --- Host controls ---
// This part is just for testing fun (lets users create
// artificial concurrency).

// Connectedness buttons.
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
  network.receiveConnected = receiveConnected.checked;
  network.sendConnected = sendConnected.checked;
}
