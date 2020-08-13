import { CrdtNetworkRuntime } from '../../src/network/crdt_network_runtime';
import { CounterCrdt } from "../../src/crdts/basic_crdts";

console.log('Test Starting... ')
console.log('Test Case 1...')
console.log('----------------------------------------------')

let alice = new CrdtNetworkRuntime("alice", "ws://localhost:8080");
let bob = new CrdtNetworkRuntime("bob", "ws://localhost:8080");

function test1(resolve : any, reject : any) {

    let aliceCounter = new CounterCrdt("counterId", alice);
    aliceCounter.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + event.description));
    let bobCounter = new CounterCrdt("counterId", bob);
    bobCounter.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + event.description));

    aliceCounter.add(3);

    setTimeout(function () {
        if (aliceCounter.value == 3 && bobCounter.value == 3) {
            bobCounter.add(-4);
            
            setTimeout(function () {
                if (aliceCounter.value == -1 && bobCounter.value == -1) {
                    aliceCounter.value = 11;

                    setTimeout(function () {
                        if (aliceCounter.value == 11 && bobCounter.value == 11) {

                            aliceCounter.add(2);
                            bobCounter.add(-5);

                            setTimeout(function () {
                                if (aliceCounter.value == 8 && bobCounter.value == 8) {
                                    resolve();
                                } else {
                                    reject();
                                }
                            }, 1000);
                        } 
                    }, 1000);
                } 
            }, 1000);
        } 
    }, 1000);
}

var p1 = new Promise(test1);

p1.then(function () {
    console.log('----------------------------------------------')
    console.log('Test 1 passed!!!');
    process.exit();
});
p1.catch(function () {
    console.log('----------------------------------------------')
    console.log('Test 1 failed...');
    process.exit();
});





