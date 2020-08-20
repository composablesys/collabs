require('../test/test'); // run test.ts

import { CounterCrdt } from "../src/crdts/basic_crdts";
import { CrdtNetworkRuntime } from '../src/network/crdt_network_runtime';
import { v4 as uuid } from 'uuid';

/**
 * Get Heroku server host Websocket.
 */
var HOST = location.origin.replace(/^http/, 'ws')

/**
 * Generate uuid for client.
 * Create CRDTs (e.g. CounterCrdt).
 */
const client_uuid: string = uuid();
let client = new CrdtNetworkRuntime(client_uuid, HOST);
let clientCounter = new CounterCrdt("counterId", client);

/* HTML variables */
var counter = document.getElementById("counter");

/* Customize the onchange() for CRDT as refresh the value */
clientCounter.onchange = (event => {
    counter!.innerHTML = clientCounter.value.toString()});

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

// /* Customize onclick() function of sync to synchronize the value */
// document.getElementById("sync")!.onclick = function() {
//     counter!.innerHTML = clientCounter.value.toString();
// }
