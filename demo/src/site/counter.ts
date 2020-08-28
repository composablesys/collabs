// require('../test/test'); // run test.ts
import { crdts, network } from 'compoventuals-client';
import { v4 as uuid } from 'uuid';

/**
 * Get Heroku server host Websocket.
 */
var HOST = location.origin.replace(/^http/, 'ws')

/**
 * Generate uuid for each client.
 */
const client_uuid : string = uuid();

/**
 * Generate CRDTs' Runtime on each client and create CRDTs (e.g. CounterCrdt).
 */
let client = new network.CrdtNetworkRuntime(client_uuid, HOST);
//let clientCounter = new crdts.CounterCrdt("counterId", client);
let clientCounter = new crdts.Counter2(client_uuid, client);

/* HTML variables */
var counter = document.getElementById("counter");

/* Customize the onchange() for CRDT as refresh the value */
clientCounter.onchange = (() => {
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
