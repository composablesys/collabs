import { CrdtNetworkRuntime } from '../../src/network/crdt_network_runtime';
import { MultRegisterCrdt } from "../../src/crdts/basic_crdts";

console.log('Test Starting... ')
console.log('Test Case 2...')
console.log('----------------------------------------------')

let alice = new CrdtNetworkRuntime("alice", "ws://localhost:8080");
let bob = new CrdtNetworkRuntime("bob", "ws://localhost:8080");

function test2(resolve : any, reject : any) {

    let aliceRegister = new MultRegisterCrdt("multId", alice, 2);
    aliceRegister.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " multed " + event.description));
    let bobRegister = new MultRegisterCrdt("multId", bob, 2);
    bobRegister.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " multed " + event.description));

    aliceRegister.mult(3);    

    setTimeout(function () {
        if (aliceRegister.value == 6 && bobRegister.value == 6) {
            bobRegister.mult(-4);
            
            setTimeout(function () {
                if (aliceRegister.value == -24 && bobRegister.value == -24) {
                    aliceRegister.value = 11;

                    setTimeout(function () {
                        if (aliceRegister.value == 11 && bobRegister.value == 11) {
                            aliceRegister.mult(2);
                            bobRegister.mult(-8);

                            setTimeout(function () {
                                if (aliceRegister.value == -176 && bobRegister.value == -176) {
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

var p1 = new Promise(test2);

p1.then(function () {
    console.log('----------------------------------------------')
    console.log('Test 2 passed!!!');
    process.exit();
});
p1.catch(function () {
    console.log('----------------------------------------------')
    console.log('Test 2 failed...');
    process.exit();
});





