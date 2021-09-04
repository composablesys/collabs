import * as crdts from "compoventuals";
import { WebSocketNetwork } from "compoventuals-ws-client";

/**
 * Get Heroku server host Websocket.
 */
var HOST = location.origin.replace(/^http/, "ws");

/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. Counter).
 */
let client = new crdts.Runtime(new WebSocketNetwork(HOST, "counter"));
let clientCounter = client.registerCrdt("counter", crdts.Pre(crdts.CCounter)());

/* HTML variables */
var counter = document.getElementById("counter");

/* Customize the event listener for CRDT as refresh the value */
clientCounter.on("Message", (_) => {
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

document.getElementById("reset")!.onclick = function () {
  console.log("clicked reset");
  clientCounter.reset();
  counter!.innerHTML = clientCounter.value.toString();
};

// document.getElementById("strongReset")!.onclick = function () {
//   console.log("clicked strongReset");
//   clientCounter.strongReset();
//   counter!.innerHTML = clientCounter.value.toString();
// };

// /* Customize onclick() function of sync to synchronize the value */
// document.getElementById("sync")!.onclick = function() {
//     counter!.innerHTML = clientCounter.value.toString();
// }
