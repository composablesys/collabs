import * as crdts from "compoventuals";
import { WebRtcNetwork } from "compoventuals-webrtc-client";

/**
 * Get Heroku server host Websocket.
 */
// var HOST = location.origin.replace(/^http/, "ws");
const url = new URL(location.origin);
url.protocol = "ws";
url.port = "" + (parseInt(url.port) + 1);
const HOST = url.toString();

/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. Counter).
 */

let client = new crdts.Runtime(new WebRtcNetwork(HOST));
let clientCounter = client.registerCrdt("counter", new crdts.CCounter());

/* HTML variables */
var counter = document.getElementById("counter");

/* Customize the event listener for CRDT as refresh the value */
clientCounter.on("Add", (_) => {
  counter!.innerHTML = clientCounter.value.toString();
});

/* Customize onclick() function of increment button with CRDT operation */
document.getElementById("increment")!.onclick = function () {
  console.log("clicked increment");
  clientCounter.add(100);
  counter!.innerHTML = clientCounter.value.toString();
};

/* Customize onclick() function of decrement button with CRDT operation */
document.getElementById("decrement")!.onclick = function () {
  console.log("clicked decrement");
  clientCounter.add(-100);
  counter!.innerHTML = clientCounter.value.toString();
};

// /* Customize onclick() function of sync to synchronize the value */
// document.getElementById("sync")!.onclick = function() {
//     counter!.innerHTML = clientCounter.value.toString();
// }
