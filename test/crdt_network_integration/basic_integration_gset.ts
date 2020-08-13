// import assert from 'assert';
// import { CrdtNetworkRuntime } from '../../src/network/crdt_network_runtime';
// import { GSetCrdt } from "../../src/crdts/basic_crdts";

// console.log('Test Starting... ')
// console.log('Test Case 3...')
// console.log('----------------------------------------------')

// let alice = new CrdtNetworkRuntime("alice", "ws://localhost:8080");
// let bob = new CrdtNetworkRuntime("bob", "ws://localhost:8080");

// function test3(resolve : any, reject : any) {

//     let aliceGSet = new GSetCrdt("gsetId", alice);
//     aliceGSet.onchange = (event => console.log(
//         "Alice: " + event.timestamp.getSender() + " added " + event.description));
//     let bobGSet = new GSetCrdt("gsetId", bob);
//     bobGSet.onchange = (event => console.log(
//         "Bob: " + event.timestamp.getSender() + " added " + event.description));

//     aliceGSet.add("element"); 

//     setTimeout(function () {
//         if (assertSetEquals(aliceGSet.value, new Set(["element"])) && assertSetEquals(bobGSet.value, new Set(["element"]))) {
            
//             bobRegister.mult(-4);
            
//             setTimeout(function () {
//                 if (aliceRegister.value == -24 && bobRegister.value == -24) {
//                     aliceRegister.value = 11;

//                     setTimeout(function () {
//                         if (aliceRegister.value == 11 && bobRegister.value == 11) {
//                             aliceRegister.mult(2);
//                             bobRegister.mult(-8);

//                             setTimeout(function () {
//                                 if (aliceRegister.value == -176 && bobRegister.value == -176) {
//                                     resolve();
//                                 } else {
//                                     reject();
//                                 }
//                             }, 1000);
//                         } 
//                     }, 1000);
//                 } 
//             }, 1000);
//         } 
//     }, 1000);
// }

// var p1 = new Promise(test3);

// p1.then(function () {
//     console.log('----------------------------------------------')
//     console.log('Test 3 passed!!!');
//     process.exit();
// });
// p1.catch(function () {
//     console.log('----------------------------------------------')
//     console.log('Test 3 failed...');
//     process.exit();
// });

// // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// function isSuperset<T>(set: Set<T>, subset: Set<T>) {
//     for (let elem of subset) {
//         if (!set.has(elem)) {
//             return false
//         }
//     }
//     return true
// }
// function setEquals<T>(set1: Set<T>, set2: Set<T>) {
//     return isSuperset(set1, set2) && isSuperset(set2, set1);
// }
// function assertSetEquals<T>(set1: Set<T>, set2: Set<T>) {
//     if(!setEquals(set1, set2)) {
//         throw new Error("setEquals failed, actual: " +
//             JSON.stringify([...set1.values()]) + ", expected: " +
//             JSON.stringify([...set2.values()]));
//     }
//     assert(setEquals(set1, set2));
// }



