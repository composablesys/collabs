import assert from 'assert';
import { AddEvent, MultEvent } from '../../src/crdts';
import { NumberCrdt } from '../../src/crdts/standard';
import { TestingNetworkGenerator } from '../runtime_for_testing';

let runtimeGen = new TestingNetworkGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");

function testResettableCounter() {
    // Test DefaultResettableCrdt by testing IntRegisterCrdt's
    // add and reset operations, since it's a simple example.
    console.log("testResettableCounter()...");

    let aliceCounter = new NumberCrdt(alice, "numberId2", 0, true);
    aliceCounter.addEventListener("Add", event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    aliceCounter.addEventListener("Mult", event => console.log(
        "Alice: " + event.timestamp.getSender() + " multed " + (event as MultEvent).valueMulted));
    aliceCounter.addEventListener("Reset", event => console.log(
        "Alice: " + event.timestamp.getSender() + " reset"
    ));
    let bobCounter = new NumberCrdt(bob, "numberId2", 0, true);
    bobCounter.addEventListener("Add", event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    bobCounter.addEventListener("Mult", event => console.log(
        "Bob: " + event.timestamp.getSender() + " multed " + (event as MultEvent).valueMulted));
    bobCounter.addEventListener("Reset", event => console.log(
        "Bob: " + event.timestamp.getSender() + " reset"
    ));
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

    // TODO: strong resets
    // // Reset-wins tests
    // bobCounter.resetStrong();
    // runtimeGen.releaseAll();
    // assert.strictEqual(aliceCounter.value, 0);
    // assert.strictEqual(bobCounter.value, 0);
    //
    // aliceCounter.add(6);
    // runtimeGen.releaseAll();
    // assert.strictEqual(aliceCounter.value, 6);
    // assert.strictEqual(bobCounter.value, 6);

    // // Concurrent add should not survive
    // aliceCounter.resetStrong();
    // bobCounter.add(20);
    // runtimeGen.releaseAll();
    // assert.strictEqual(aliceCounter.value, 0);
    // assert.strictEqual(bobCounter.value, 0);
    //
    // // Lots of concurrency
    // aliceCounter.add(3);
    // bobCounter.add(7);
    // aliceCounter.reset();
    // runtimeGen.release(bob);
    // assert.strictEqual(aliceCounter.value, 7);
    // assert.strictEqual(bobCounter.value, 7);
    // bobCounter.resetStrong();
    // runtimeGen.releaseAll();
    // assert.strictEqual(aliceCounter.value, 0);
    // assert.strictEqual(bobCounter.value, 0);

    console.log("...ok");
}

testResettableCounter();
