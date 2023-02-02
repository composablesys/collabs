import * as collabs from "@collabs/collabs";
import { CRDTContainerHost } from "@collabs/container";
import { WebSocketNetwork } from "@collabs/ws-client";

// From containerUrl.js, included in index.html.
// (Not including it here since it's not a real file and
// Webpack will get confused.)
declare const containerUrl: string;

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
const host = app.registerCollab(
  "host",
  (init) => new CRDTContainerHost(init, iframe)
);

// Show the container once it's ready.
host.once("ContainerReady", () => {
  const loadingDiv = <HTMLDivElement>document.getElementById("loading");
  document.body.removeChild(loadingDiv);
  iframe.style.display = "block";
});

// Load if needed.
const sessionStorageSave = window.sessionStorage.getItem(containerUrl);

if (doLoad) {
  console.log("Loading from sessionStorage...");
  if (sessionStorageSave === null) {
    console.log("Load error: no save found.");
    app.load(collabs.Optional.empty());
  } else {
    app.load(collabs.Optional.of(collabs.Bytes.parse(sessionStorageSave)));
    console.log("Loaded.");
  }
} else {
  app.load(collabs.Optional.empty());
}
// Note: in a real app, you should also locally persist all sent messages
// that are not part of the save data,
// then replay them here.
// See TODO (initialization docs with list of steps).

// TODO: here, only request messages we need from the server.
// (Currently, network requests them all as part of its constructor).

// --- Host controls ---

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

// Save and load buttons.
const saveButton = <HTMLButtonElement>document.getElementById("save");
const loadButton = <HTMLButtonElement>document.getElementById("load");
loadButton.disabled = sessionStorageSave === null;

saveButton.addEventListener("click", async function () {
  console.log("Saving to sessionStorage...");

  // Make sure the container actually uses its save function.
  await host.compactSaveData();
  // Get saved state.
  const saveData = app.save();
  // Store in sessionStorage.
  try {
    window.sessionStorage.setItem(
      containerUrl,
      collabs.Bytes.stringify(saveData)
    );
  } catch (err) {
    console.log("Save error: ");
    console.log(err);
  }

  loadButton.disabled = false;
  console.log("Saved.");
});
loadButton.addEventListener("click", function () {
  // Reload the page with ?load=true.
  window.location.href += "?load=true";
});

// Reset button.
const resetButton = <HTMLButtonElement>document.getElementById("reset");
resetButton.addEventListener("click", async function () {
  // Ask for confirmation.
  if (
    confirm(
      "Confirm: Reset.\nThis will delete all messages from the server, clear sessionStorage, and refresh the page."
    )
  ) {
    // Fetch reset.html on the server to refresh it.
    await fetch("reset.html");
    // Clear sessionStorage.
    window.sessionStorage.removeItem(containerUrl);
    // Refresh this page.
    window.location.reload();
  }
});
