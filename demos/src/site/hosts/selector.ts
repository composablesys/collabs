import * as crdts from "compoventuals";
import { MatrixWidgetNetwork } from "compoventuals-matrix-widget";
import { WebSocketNetwork } from "compoventuals-ws-client";
import { ContainerHost } from "compoventuals-container";
import $ from "jquery";
import pako from "pako";

// Extract the type of network to use from the URL's
// "network" GET parameter.
const urlParams = new URLSearchParams(window.location.search);
if (!urlParams.has("network")) {
  throw new Error('URL missing "network" GET parameter.');
}
const networkType = urlParams.get("network")!;
console.log("networkType: " + networkType);
let network: crdts.BroadcastNetwork;
switch (networkType) {
  case "ws": {
    const HOST = location.origin.replace(/^http/, "ws");
    network = new WebSocketNetwork(HOST, "selector");
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
      "com.herokuapp.compoventuals-tests.selector"
    );
    break;
  default:
    throw new Error('URL "network" GET parameter invalid: "${networkType}"');
}

// Crdt setup.
const runtime = new crdts.Runtime(network);
const currentHost = runtime.registerCrdt(
  "",
  new crdts.LwwMutCRegister((htmlSrcGzipped: Uint8Array) => {
    const htmlSrc = pako.inflate(htmlSrcGzipped, { to: "string" });
    // Create a new ContainerHost + IFrame from htmlSrc and
    // attach it to the document, invisible for now.
    const iframe = document.createElement("iframe");
    iframe.hidden = true;
    iframe.srcdoc = htmlSrc;
    const host = new ContainerHost(iframe);
    document.body.appendChild(iframe);
    return host;
  })
);
const selectorDiv = <HTMLDivElement>document.getElementById("selectorDiv")!;
currentHost.on("Set", (e) => {
  // Make the set value the only visible thing.
  selectorDiv.hidden = true;
  if (e.previousValue.isPresent) {
    e.previousValue.get().containerIFrame.hidden = true;
  }
  currentHost.value.get().containerIFrame.hidden = false;
});

function setHtmlSrc(htmlSrc: string) {
  // The container definitions can get large (100s of KB)
  // but are very gzippable, so let's compress them.
  // CPU penalty should be okay since you only have to do
  // this once at startup, which users should expect to take
  // a moment anyway.
  const htmlSrcGzipped = pako.deflate(htmlSrc);
  currentHost.set(htmlSrcGzipped);
}

// Handle inputs.
const urlForm = <HTMLFormElement>document.getElementById("urlForm")!;
const urlInput = <HTMLInputElement>document.getElementById("url");
urlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // TODO: might this fail due to CORS on target server?
  $.ajax({
    url: urlInput.value,
    dataType: "text",
    success: setHtmlSrc,
    error: (_, textStatus, errorThrown) => {
      alert("URL error: " + textStatus + ", " + errorThrown);
    },
  });
});

const fileForm = <HTMLFormElement>document.getElementById("fileForm");
const fileInput = <HTMLInputElement>document.getElementById("file");
fileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const file = fileInput.files![0];
  file.text().then(setHtmlSrc);
});
