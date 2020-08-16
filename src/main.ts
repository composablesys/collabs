require('../test/test');// run test.ts

// export default function Compoventuals(hi: string): void {

// }

import { CounterCrdt } from "../src/crdts/basic_crdts";
import { CrdtNetworkRuntime } from '../src/network/crdt_network_runtime';

var HOST = location.origin.replace(/^http/, 'ws')
var ws = new WebSocket(HOST);
let client = new CrdtNetworkRuntime("client", "ws://localhost:3000");
let clientCounter = new CounterCrdt("counterId", client);

var counter = document.getElementById("counter");

document.getElementById("increment")!.onclick = function() {
    console.log("clicked");
    clientCounter.add(100);
    counter!.innerHTML = clientCounter.value.toString();
}
