import assert from 'assert';
import { AddEvent, Counter } from '../../src/crdts';
import { TestingNetworkGenerator } from '../runtime_for_testing';

let runtimeGen = new TestingNetworkGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");

function testCounterResets() {
    // Test Counter's resets
    console.log("testResettableCounter()...");

    let aliceCounter = new Counter(alice, "counterReset");
    aliceCounter.addEventListener("Add", event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    aliceCounter.addEventListener("Reset", event => console.log(
        "Alice: " + event.timestamp.getSender() + " reset"
    ));
    let bobCounter = new Counter(bob, "counterReset");
    bobCounter.addEventListener("Add", event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
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

// TODO: test AddAbilitiesViaHistory, AddAbilitiesViaChildren

testCounterResets();
