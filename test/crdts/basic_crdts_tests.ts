import assert from 'assert';
import {TestingRuntimeGenerator} from "../runtime_for_testing";
import { CounterCrdt, MultRegisterCrdt, GSetCrdt, MultiValueRegister } from "../../src/crdts/basic_crdts";

let runtimeGen = new TestingRuntimeGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");

function testCounter() {
    console.log("testCounter()...");

    let aliceCounter = new CounterCrdt("counterId", alice);
    aliceCounter.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + event.description));
    let bobCounter = new CounterCrdt("counterId", bob);
    bobCounter.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + event.description));
    assert.equal(aliceCounter.value, 0);
    assert.equal(bobCounter.value, 0);

    aliceCounter.add(3);
    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, 3);
    assert.equal(bobCounter.value, 3);

    bobCounter.add(-4);
    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, -1);
    assert.equal(bobCounter.value, -1);

    aliceCounter.value = 11;
    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, 11);
    assert.equal(bobCounter.value, 11);

    // Out of order test
    aliceCounter.add(2);
    assert.equal(aliceCounter.value, 13);
    assert.equal(bobCounter.value, 11);

    bobCounter.add(-5);
    assert.equal(aliceCounter.value, 13);
    assert.equal(bobCounter.value, 6);

    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, 8);
    assert.equal(bobCounter.value, 8);
    console.log("...ok");
}

function testMultRegister() {
    console.log("testMultRegister()...");

    let aliceRegister = new MultRegisterCrdt("multId", alice, 2);
    aliceRegister.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " multed " + event.description));
    let bobRegister = new MultRegisterCrdt("multId", bob, 2);
    bobRegister.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " multed " + event.description));
    assert.equal(aliceRegister.value, 2);
    assert.equal(bobRegister.value, 2);

    aliceRegister.mult(3);
    runtimeGen.releaseAll();
    assert.equal(aliceRegister.value, 6);
    assert.equal(bobRegister.value, 6);

    bobRegister.mult(-4);
    runtimeGen.releaseAll();
    assert.equal(aliceRegister.value, -24);
    assert.equal(bobRegister.value, -24);

    aliceRegister.value = 11;
    runtimeGen.releaseAll();
    assert.equal(aliceRegister.value, 11);
    assert.equal(bobRegister.value, 11);

    // Out of order test
    aliceRegister.mult(2);
    assert.equal(aliceRegister.value, 22);
    assert.equal(bobRegister.value, 11);

    bobRegister.mult(-8);
    assert.equal(aliceRegister.value, 22);
    assert.equal(bobRegister.value, -88);

    runtimeGen.releaseAll();
    assert.equal(aliceRegister.value, -176);
    assert.equal(bobRegister.value, -176);
    console.log("...ok");
}

function testGSet() {
    console.log("testGSet()...");

    let aliceGSet = new GSetCrdt("gsetId", alice);
    aliceGSet.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + event.description));
    let bobGSet = new GSetCrdt("gsetId", bob);
    bobGSet.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + event.description));
    assertSetEquals(aliceGSet.value, new Set());
    assertSetEquals(bobGSet.value, new Set());

    aliceGSet.add("element");
    runtimeGen.releaseAll();
    assertSetEquals(aliceGSet.value, new Set(["element"]));
    assertSetEquals(bobGSet.value, new Set(["element"]));

    bobGSet.add(7);
    runtimeGen.releaseAll();
    assertSetEquals(aliceGSet.value, new Set(["element", 7]));
    assertSetEquals(bobGSet.value, new Set(["element", 7]));

    aliceGSet.add(7);
    runtimeGen.releaseAll();
    assertSetEquals(aliceGSet.value, new Set(["element", 7]));
    assertSetEquals(bobGSet.value, new Set(["element", 7]));

    // Out of order test
    aliceGSet.add("first");
    assertSetEquals(aliceGSet.value, new Set(["element", 7, "first"]));
    assertSetEquals(bobGSet.value, new Set(["element", 7]));

    bobGSet.add("second");
    assertSetEquals(aliceGSet.value, new Set(["element", 7, "first"]));
    assertSetEquals(bobGSet.value, new Set(["element", 7, "second"]));

    runtimeGen.releaseAll();
    assertSetEquals(aliceGSet.value, new Set(["element", 7, "first", "second"]));
    assertSetEquals(bobGSet.value, new Set(["element", 7, "first", "second"]));
    console.log("...ok");
}

function testMvr() {
    console.log("testMvr()...");

    let aliceMvr = new MultiValueRegister<string>("mvrId", alice, "initial");
    aliceMvr.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " set to " + JSON.stringify(event.description)));
    let bobMvr = new MultiValueRegister<string>("mvrId", bob, "initial");
    bobMvr.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " set to " + JSON.stringify(event.description)));
    assertSetEquals(aliceMvr.valueSet, new Set(["initial"]));
    assertSetEquals(bobMvr.valueSet, new Set(["initial"]));

    aliceMvr.value = "second";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["second"]));
    assertSetEquals(bobMvr.valueSet, new Set(["second"]));

    aliceMvr.value = "third";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["third"]));
    assertSetEquals(bobMvr.valueSet, new Set(["third"]));

    bobMvr.value = "bob's";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["bob's"]));
    assertSetEquals(bobMvr.valueSet, new Set(["bob's"]));

    // Concurrent test
    aliceMvr.value = "concA";
    bobMvr.value = "concB";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["concA", "concB"]));
    assertSetEquals(bobMvr.valueSet, new Set(["concB", "concA"]));

    aliceMvr.value = "concA2";
    assertSetEquals(aliceMvr.valueSet, new Set(["concA2"]));
    bobMvr.value = "concB2";
    assertSetEquals(bobMvr.valueSet, new Set(["concB2"]));
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["concA2", "concB2"]));
    assertSetEquals(bobMvr.valueSet, new Set(["concB2", "concA2"]));

    // Multiple adds are redundant, unless they're overwritten
    aliceMvr.value = "redundant";
    bobMvr.value = "redundant";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["redundant"]));
    assertSetEquals(bobMvr.valueSet, new Set(["redundant"]));

    aliceMvr.value = "redundant";
    bobMvr.value = "redundant";
    aliceMvr.value = "overwrite";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["redundant", "overwrite"]));
    assertSetEquals(bobMvr.valueSet, new Set(["redundant", "overwrite"]));

    // Reset test
    aliceMvr.reset();
    assertSetEquals(aliceMvr.valueSet, new Set());
    bobMvr.value = "conc";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["conc"]));
    assertSetEquals(bobMvr.valueSet, new Set(["conc"]));

    console.log("...ok");
}

testCounter();
testMultRegister();
testGSet();
testMvr();

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function isSuperset<T>(set: Set<T>, subset: Set<T>) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false
        }
    }
    return true
}
function setEquals<T>(set1: Set<T>, set2: Set<T>) {
    return isSuperset(set1, set2) && isSuperset(set2, set1);
}
function assertSetEquals<T>(set1: Set<T>, set2: Set<T>) {
    if(!setEquals(set1, set2)) {
        throw new Error("setEquals failed, actual: " +
            JSON.stringify([...set1.values()]) + ", expected: " +
            JSON.stringify([...set2.values()]));
    }
    assert(setEquals(set1, set2));
}
