import { crdts, network } from 'compoventuals-client';

const HOST = location.origin.replace(/^http/, 'ws');

let client = new crdts.CrdtRuntime(
    new network.DefaultCausalBroadcastNetwork(
        new network.WebSocketNetwork(HOST, "variable_counter")
    )
);

let clientCounter = client.registerCrdt("variable_counter", new crdts.Counter());

const counter = document.getElementById("variable_counter");

const updateCounter = () => {
    counter!.innerHTML = clientCounter.value.toString();
}

clientCounter.on("Change", (_) => {
    updateCounter();
});

const amount = <HTMLInputElement>document.getElementById("variable_amount")!;
const increment = document.getElementById("variable_increment")!;
const decrement = document.getElementById("variable_decrement")!;
const reset = document.getElementById("variable_reset")!;

increment.onclick = function () {
    console.log(`Clicked increment | Amount = ${amount.value}`);
    clientCounter.add(parseFloat(amount.value));
    updateCounter();
};

decrement.onclick = function () {
    console.log(`Clicked decrement | Amount = ${amount.value}`);
    clientCounter.add(-parseFloat(amount.value));
    updateCounter();
};

reset.onclick = function () {
    console.log(`Clicked reset`);
    clientCounter.reset();
    updateCounter();
}

