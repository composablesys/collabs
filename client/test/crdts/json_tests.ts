// import assert from 'assert';
// import {TestingRuntimeGenerator} from "../runtime_for_testing";
// import { JsonCrdt } from '../../src/crdts/json';
// import { IntRegisterCrdt } from '../../src/crdts/standard';
//
// let runtimeGen = new TestingRuntimeGenerator();
// let alice = runtimeGen.newRuntime("alice");
// let bob = runtimeGen.newRuntime("bob");
//
// function testJsonMapFeatures() {
//     console.log("testJsonMapFeatures()...");
//
//     let aliceJson = new JsonCrdt("jsonMap", alice);
//     let bobJson = new JsonCrdt("jsonMap", bob);
//
//     assertSetEquals(new Set(aliceJson.keys()), new Set([]));
//     assertSetEquals(new Set(bobJson.keys()), new Set([]));
//
//     // Inits go through
//     aliceJson.init("test", 0);
//     runtimeGen.releaseAll();
//     assertSetEquals(new Set(aliceJson.keysByType(0)), new Set(["test"]));
//     assertSetEquals(new Set(bobJson.keysByType(0)), new Set(["test"]));
//     assert(aliceJson.has("test", 0));
//     assert(bobJson.has("test", 0));
//
//     let aliceTest = aliceJson.get("test", 0) as IntRegisterCrdt;
//     assert(aliceTest);
//     let bobTest = bobJson.get("test", 0) as IntRegisterCrdt;
//     assert(bobTest);
//     assert.equal(aliceTest.value, 0);
//     assert.equal(bobTest.value, 0);
//
//     // Value ops work
//     aliceTest.add(3);
//     bobTest.add(4);
//     runtimeGen.releaseAll();
//     assert.equal(aliceTest.value, 7);
//     assert.equal(bobTest.value, 7);
//
//     // Delete works
//     bobJson.delete("test", 0);
//     runtimeGen.releaseAll();
//     assertSetEquals(new Set(aliceJson.keys()), new Set([]));
//     assertSetEquals(new Set(bobJson.keys()), new Set([]));
//     assert(aliceJson.get("test", 0) === undefined);
//     assert(bobJson.get("test", 0) === undefined);
//
//     aliceJson.init("register", 0);
//     runtimeGen.releaseAll();
//     assertSetEquals(new Set(aliceJson.keysByType(0)), new Set(["register"]));
//     assertSetEquals(new Set(bobJson.keysByType(0)), new Set(["register"]));
//
//     // Concurrent operation revives key
//     let bobRegister = bobJson.get("register", 0) as IntRegisterCrdt;
//     aliceJson.delete("register", 0);
//     bobRegister.add(3);
//     runtimeGen.releaseAll();
//     assertSetEquals(new Set(aliceJson.keysByType(0)), new Set(["register"]));
//     assertSetEquals(new Set(bobJson.keysByType(0)), new Set(["register"]));
//     assert.equal(bobRegister.value, 3);
//     assert.equal((aliceJson.get("register", 0) as IntRegisterCrdt).value, 3);
//
//     // // Reset tests
//     // // Concurrent op revives
//     // let aliceRegister = aliceJson.get("register") as IntRegisterCrdt;
//     // aliceJson.reset();
//     // assertSetEquals(new Set(aliceJson.keys()), new Set([]));
//     // assert.equal(aliceJson.get("register"), undefined);
//     // assert.equal(aliceRegister.value, 0);
//     // bobRegister.add(5);
//     // runtimeGen.releaseAll();
//     // assertSetEquals(new Set(aliceJson.keys()), new Set(["register"]));
//     // assertSetEquals(new Set(bobJson.keys()), new Set(["register"]));
//     // assert.equal(bobRegister.value, 5);
//     // assert.equal(aliceRegister, aliceJson.get("register"));
//     // assert.equal(aliceRegister.value, 5);
//     //
//     // // Causally later op revives
//     // bobJson.reset();
//     // bobRegister.add(7);
//     // runtimeGen.releaseAll();
//     // assertSetEquals(new Set(aliceJson.keys()), new Set(["register"]));
//     // assertSetEquals(new Set(bobJson.keys()), new Set(["register"]));
//     // assert.equal(bobRegister.value, 7);
//     // assert.equal(aliceRegister, aliceJson.get("register"));
//     // assert.equal(aliceRegister.value, 7);
//
//     // TODO: strong delete, strong resets, nesting?
//     console.log("...ok");
// }
//
// function testJsonConversion() {
//     console.log("testJsonMapFeatures()...");
//
//     let aliceJson = new JsonCrdt("json2", alice);
//     let bobJson = new JsonCrdt("json2", bob);
//
//     let testObj = {
//         "topic": "games",
//         "reviews": [
//             {"name": "monopoly", "rating": 7},
//             {"name": "life", "rating": 6}
//         ]
//     };
//     let nestedObj = {
//         "topic": "nesting",
//         "nested": testObj
//     };
//     aliceJson.value = nestedObj;
//     runtimeGen.releaseAll();
//     console.log("alice: " + JSON.stringify(aliceJson.getAsObject(JsonCrdt.ErrorOnConflict, true)));
//     console.log("bob: " + JSON.stringify(bobJson.getAsObject(JsonCrdt.ErrorOnConflict, true)));
//     assert.deepStrictEqual(aliceJson.getAsObject(JsonCrdt.ErrorOnConflict, true), nestedObj);
//     assert.deepStrictEqual(bobJson.getAsObject(JsonCrdt.ErrorOnConflict, true), nestedObj);
//
//     bobJson.setValue("flag", true);
//     (nestedObj as any).flag = true;
//     runtimeGen.releaseAll();
//     console.log("alice: " + JSON.stringify(aliceJson.getAsObject(JsonCrdt.ErrorOnConflict, true)));
//     console.log("bob: " + JSON.stringify(bobJson.getAsObject(JsonCrdt.ErrorOnConflict, true)));
//     assert.deepStrictEqual(aliceJson.getAsObject(JsonCrdt.ErrorOnConflict, true), nestedObj);
//     assert.deepStrictEqual(bobJson.getAsObject(JsonCrdt.ErrorOnConflict, true), nestedObj);
//
//     console.log("...ok");
// }
//
// testJsonMapFeatures();
// testJsonConversion();
//
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
