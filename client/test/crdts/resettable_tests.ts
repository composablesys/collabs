import assert from 'assert';
import {TestingRuntimeGenerator} from "../runtime_for_testing";
import {IntRegisterCrdt} from "../../src/crdts/standard";

let runtimeGen = new TestingRuntimeGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");

function testResettableCounter() {
    // Test DefaultResettableCrdt by testing IntRegisterCrdt's
    // add and reset operations, since it's a simple example.
    console.log("testResettableCounter()...");

    let aliceCounter = new IntRegisterCrdt("resettableCounterId", alice);
    aliceCounter.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " did " + event.description));
    let bobCounter = new IntRegisterCrdt("resettableCounterId", bob);
    bobCounter.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " did " + event.description));
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

    // Observed reset tests
    aliceCounter.reset();
    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, 0);
    assert.equal(bobCounter.value, 0);

    bobCounter.add(7);
    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, 7);
    assert.equal(bobCounter.value, 7);

    // Concurrent add should survive
    aliceCounter.reset();
    bobCounter.add(10);
    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, 10);
    assert.equal(bobCounter.value, 10);

    // Reset-wins tests
    bobCounter.resetStrong();
    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, 0);
    assert.equal(bobCounter.value, 0);

    aliceCounter.add(6);
    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, 6);
    assert.equal(bobCounter.value, 6);

    // Concurrent add should not survive
    aliceCounter.resetStrong();
    bobCounter.add(20);
    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, 0);
    assert.equal(bobCounter.value, 0);

    // Lots of concurrency
    aliceCounter.add(3);
    bobCounter.add(7);
    aliceCounter.reset();
    runtimeGen.release(bob);
    assert.equal(aliceCounter.value, 7);
    assert.equal(bobCounter.value, 7);
    bobCounter.resetStrong();
    runtimeGen.releaseAll();
    assert.equal(aliceCounter.value, 0);
    assert.equal(bobCounter.value, 0);

    console.log("...ok");
}

testResettableCounter();
