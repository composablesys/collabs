require('../test/test'); // run test.ts
import { CounterCrdt } from "../src/crdts/basic_crdts";
import { CrdtNetworkRuntime } from '../src/network/crdt_network_runtime';

/**
 * Get Heroku server host Websocket.
 */
var HOST = location.origin.replace(/^http/, 'ws')

/**
 * Create CRDTs (e.g. CounterCrdt).
 */
let client = new CrdtNetworkRuntime("client", HOST);
let clientCounter = new CounterCrdt("counterId", client);

/* HTML variables */
var counter = document.getElementById("counter");

/* Customize onclick() function of increment button with CRDT operation */
document.getElementById("increment")!.onclick = function() {
    console.log("clicked increment");
    clientCounter.add(100);
    counter!.innerHTML = clientCounter.value.toString();
}

/* Customize onclick() function of decrement button with CRDT operation */
document.getElementById("decrement")!.onclick = function() {
    console.log("clicked decrement");
    clientCounter.add(-100);
    counter!.innerHTML = clientCounter.value.toString();
}
