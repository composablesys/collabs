import assert from 'assert';
import {TestingNetworkGenerator} from "../runtime_for_testing";
import { CounterCrdt, AddEvent, MultEvent, MultRegisterCrdt, GSetCrdt, MultiValueRegister, GSetAddEvent, MvrEvent/*, GSetCrdt, MultiValueRegister*/ } from "../../src/crdts";

let runtimeGen = new TestingNetworkGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");

function testCounter() {
    console.log("testCounter()...");

    let aliceCounter = new CounterCrdt(alice, "counterId");
    aliceCounter.addEventListener("Add", event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    let bobCounter = new CounterCrdt(bob, "counterId");
    bobCounter.addEventListener("Add", event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    assert.strictEqual(aliceCounter.value, 0);
    assert.strictEqual(bobCounter.value, 0);

    aliceCounter.add(3);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 3);
    assert.strictEqual(bobCounter.value, 3);

    bobCounter.add(-4);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, -1);
    assert.strictEqual(bobCounter.value, -1);

    aliceCounter.value = 11;
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 11);
    assert.strictEqual(bobCounter.value, 11);

    // Out of order test
    aliceCounter.add(2);
    assert.strictEqual(aliceCounter.value, 13);
    assert.strictEqual(bobCounter.value, 11);

    bobCounter.add(-5);
    assert.strictEqual(aliceCounter.value, 13);
    assert.strictEqual(bobCounter.value, 6);

    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 8);
    assert.strictEqual(bobCounter.value, 8);
    console.log("...ok");
}

function testMultRegister() {
    console.log("testMultRegister()...");

    let aliceRegister = new MultRegisterCrdt(alice, "multId", 2);
    aliceRegister.addEventListener("Mult", event => console.log(
        "Alice: " + event.timestamp.getSender() + " multed " + (event as MultEvent).valueMulted));
    let bobRegister = new MultRegisterCrdt(bob, "multId", 2);
    bobRegister.addEventListener("Mult", event => console.log(
        "Bob: " + event.timestamp.getSender() + " multed " + (event as MultEvent).valueMulted));
    assert.strictEqual(aliceRegister.value, 2);
    assert.strictEqual(bobRegister.value, 2);

    aliceRegister.mult(3);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceRegister.value, 6);
    assert.strictEqual(bobRegister.value, 6);

    bobRegister.mult(-4);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceRegister.value, -24);
    assert.strictEqual(bobRegister.value, -24);

    aliceRegister.value = 11;
    runtimeGen.releaseAll();
    assert.strictEqual(aliceRegister.value, 11);
    assert.strictEqual(bobRegister.value, 11);

    // Out of order test
    aliceRegister.mult(2);
    assert.strictEqual(aliceRegister.value, 22);
    assert.strictEqual(bobRegister.value, 11);

    bobRegister.mult(-8);
    assert.strictEqual(aliceRegister.value, 22);
    assert.strictEqual(bobRegister.value, -88);

    runtimeGen.releaseAll();
    assert.strictEqual(aliceRegister.value, -176);
    assert.strictEqual(bobRegister.value, -176);
    console.log("...ok");
}

function testGSet() {
    console.log("testGSet()...");

    let aliceGSet = new GSetCrdt(alice, "gsetId");
    aliceGSet.addEventListener("GSetAdd", event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + (event as GSetAddEvent<string>).valueAdded));
    let bobGSet = new GSetCrdt(bob, "gsetId");
    bobGSet.addEventListener("GSetAdd", event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + (event as GSetAddEvent<string>).valueAdded));
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

    let aliceMvr = new MultiValueRegister<string>(alice, "mvrId", "initial");
    aliceMvr.addEventListener("Mvr", event => console.log(
        "Alice: " + event.timestamp.getSender() + " set to " + (event as MvrEvent<string>).valueAdded));
    let bobMvr = new MultiValueRegister<string>(bob, "mvrId", "initial");
    bobMvr.addEventListener("Mvr", event => console.log(
        "Bob: " + event.timestamp.getSender() + " set to " + (event as MvrEvent<string>).valueAdded));
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

    // // Reset test
    // aliceMvr.reset();
    // assertSetEquals(aliceMvr.valueSet, new Set());
    // bobMvr.value = "conc";
    // runtimeGen.releaseAll();
    // assertSetEquals(aliceMvr.valueSet, new Set(["conc"]));
    // assertSetEquals(bobMvr.valueSet, new Set(["conc"]));

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
