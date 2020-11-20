import assert from 'assert';
import {TestingNetworkGenerator} from "../testing_network";
import { Counter, AddEvent, MultEvent, MultRegister, GSet, MultiValueRegister, SetAddEvent, MvrEvent, LwwRegister, LwwEvent,/*, GSet, MultiValueRegister*/
CounterNonResettable} from "../../src/crdts";

let runtimeGen = new TestingNetworkGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");

function testCounterNonResettable() {
    console.log("testCounterNonResettable()...");

    let aliceCounter = new CounterNonResettable(alice, "counterId");
    aliceCounter.addEventListener("Add", event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    let bobCounter = new CounterNonResettable(bob, "counterId");
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

    aliceCounter.add(12);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 11);
    assert.strictEqual(bobCounter.value, 11);

    // Concurrent test
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

function testCounter() {
    // Test Counter, including resets
    console.log("testCounter()...");

    let aliceCounter = new Counter(alice, "counterReset");
    aliceCounter.addEventListener("Add", event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    aliceCounter.addEventListener("Reset", event => console.log(
        "Alice: " + event.timestamp.getSender() + " reset"));
    aliceCounter.addEventListener("StrongReset", event => console.log(
        "Alice: " + event.timestamp.getSender() + " strong reset"));
    let bobCounter = new Counter(bob, "counterReset");
    bobCounter.addEventListener("Add", event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    bobCounter.addEventListener("Reset", event => console.log(
        "Bob: " + event.timestamp.getSender() + " reset"));
    bobCounter.addEventListener("StrongReset", event => console.log(
        "Bob: " + event.timestamp.getSender() + " strong reset"));
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

    aliceCounter.reset();
    aliceCounter.add(11);
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

    // Observed reset tests
    aliceCounter.reset();
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 0);
    assert.strictEqual(bobCounter.value, 0);

    bobCounter.add(7);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 7);
    assert.strictEqual(bobCounter.value, 7);

    // Concurrent add should survive
    aliceCounter.reset();
    bobCounter.add(10);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 10);
    assert.strictEqual(bobCounter.value, 10);

    // Reset-wins tests
    bobCounter.strongReset();
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 0);
    assert.strictEqual(bobCounter.value, 0);

    aliceCounter.add(6);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 6);
    assert.strictEqual(bobCounter.value, 6);

    // Concurrent add should not survive
    aliceCounter.strongReset();
    bobCounter.add(20);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 0);
    assert.strictEqual(bobCounter.value, 0);

    // Lots of concurrency
    aliceCounter.add(3);
    bobCounter.add(7);
    aliceCounter.reset();
    runtimeGen.release(bob);
    assert.strictEqual(aliceCounter.value, 7);
    assert.strictEqual(bobCounter.value, 7);
    bobCounter.strongReset();
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 0);
    assert.strictEqual(bobCounter.value, 0);

    console.log("...ok");
}

function testMultRegister() {
    console.log("testMultRegister()...");

    let aliceRegister = new MultRegister(alice, "multId", 2);
    aliceRegister.addEventListener("Mult", event => console.log(
        "Alice: " + event.timestamp.getSender() + " multed " + (event as MultEvent).valueMulted));
    let bobRegister = new MultRegister(bob, "multId", 2);
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

    // Concurrent test
    aliceRegister.mult(2);
    assert.strictEqual(aliceRegister.value, 22);
    assert.strictEqual(bobRegister.value, 11);

    bobRegister.mult(-8);
    assert.strictEqual(aliceRegister.value, 22);
    assert.strictEqual(bobRegister.value, -88);

    runtimeGen.releaseAll();
    assert.strictEqual(aliceRegister.value, -176);
    assert.strictEqual(bobRegister.value, -176);

    // TODO: reset tests

    console.log("...ok");
}

function testGSet() {
    console.log("testGSet()...");

    let aliceGSet = new GSet(alice, "gsetId");
    aliceGSet.addEventListener("SetAdd", event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + (event as SetAddEvent<string>).valueAdded));
    let bobGSet = new GSet(bob, "gsetId");
    bobGSet.addEventListener("SetAdd", event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + (event as SetAddEvent<string>).valueAdded));
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

    // Concurrent test
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

    // TODO: test with Crdt values

    // Reset test
    aliceMvr.reset();
    assertSetEquals(aliceMvr.valueSet, new Set(["initial"]));
    bobMvr.value = "conc";
    runtimeGen.releaseAll();
    assertSetEquals(aliceMvr.valueSet, new Set(["conc"]));
    assertSetEquals(bobMvr.valueSet, new Set(["conc"]));

    console.log("...ok");
}

function testLwwRegister() {
    console.log("testLwwRegister()...");

    let aliceLww = new LwwRegister<string>(alice, "lwwId", "initial");
    aliceLww.addEventListener("Lww", event => console.log(
        "Alice: " + event.timestamp.getSender() + " set to " + (event as LwwEvent<string>).value));
    let bobLww = new LwwRegister<string>(bob, "lwwId", "initial");
    bobLww.addEventListener("Lww", event => console.log(
        "Bob: " + event.timestamp.getSender() + " set to " + (event as LwwEvent<string>).value));
    assert.strictEqual(aliceLww.value, "initial");
    assert.strictEqual(bobLww.value, "initial");

    aliceLww.value = "second";
    runtimeGen.releaseAll();
    assert.strictEqual(aliceLww.value, "second");
    assert.strictEqual(bobLww.value, "second");

    aliceLww.value = "third";
    runtimeGen.releaseAll();
    assert.strictEqual(aliceLww.value, "third");
    assert.strictEqual(bobLww.value, "third");

    aliceLww.value = "third";
    runtimeGen.releaseAll();
    assert.strictEqual(aliceLww.value, "third");
    assert.strictEqual(bobLww.value, "third");

    bobLww.value = "bob's";
    runtimeGen.releaseAll();
    assert.strictEqual(aliceLww.value, "bob's");
    assert.strictEqual(bobLww.value, "bob's");

    // Concurrent test
    // Bob will have later time
    aliceLww.value = "concA";
    let now = new Date().getTime();
    while(new Date().getTime() <= now + 1) {}
    bobLww.value = "concB";
    runtimeGen.releaseAll();
    assert.strictEqual(aliceLww.value, "concB");
    assert.strictEqual(bobLww.value, "concB");

    aliceLww.value = "concA2";
    assert.strictEqual(aliceLww.value, "concA2");
    now = new Date().getTime();
    while(new Date().getTime() <= now + 1) {}
    bobLww.value = "concB2";
    assert.strictEqual(bobLww.value, "concB2");;
    runtimeGen.releaseAll();
    assert.strictEqual(aliceLww.value, "concB2");
    assert.strictEqual(bobLww.value, "concB2");

    // Multiple adds are redundant, unless they're overwritten
    aliceLww.value = "redundant";
    bobLww.value = "redundant";
    runtimeGen.releaseAll();
    assert.strictEqual(aliceLww.value, "redundant");
    assert.strictEqual(bobLww.value, "redundant");

    aliceLww.value = "overwrite";
    runtimeGen.releaseAll();
    assert.strictEqual(aliceLww.value, "overwrite");
    assert.strictEqual(bobLww.value, "overwrite");

    // Reset test
    aliceLww.reset();
    assert.strictEqual(aliceLww.value, "initial");
    bobLww.value = "conc";
    runtimeGen.releaseAll();
    assert.strictEqual(aliceLww.value, "conc");
    assert.strictEqual(bobLww.value, "conc");

    console.log("...ok");
}

testCounterNonResettable();
testCounter();
testMultRegister();
testGSet();
testMvr();
testLwwRegister();

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
