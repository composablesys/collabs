const assert = require('assert');
import {TestingInOrderRuntimeGenerator} from "../runtime_for_testing";
import { CounterCrdt, MultRegisterCrdt, GSetCrdt } from "../../src/crdts/basic_crdts";

let runtimeGen = new TestingInOrderRuntimeGenerator();
let alice = runtimeGen.newRuntime();
let bob = runtimeGen.newRuntime();

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
    assert.equal(aliceCounter.value, 3);
    assert.equal(bobCounter.value, 3);

    bobCounter.add(-4);
    assert.equal(aliceCounter.value, -1);
    assert.equal(bobCounter.value, -1);

    aliceCounter.value = 11;
    assert.equal(aliceCounter.value, 11);
    assert.equal(bobCounter.value, 11);
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
    assert.equal(aliceRegister.value, 6);
    assert.equal(bobRegister.value, 6);

    bobRegister.mult(-4);
    assert.equal(aliceRegister.value, -24);
    assert.equal(bobRegister.value, -24);

    aliceRegister.value = 11;
    assert.equal(aliceRegister.value, 11);
    assert.equal(bobRegister.value, 11);
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
    assert.deepStrictEqual(aliceGSet.value, new Set());
    assert.deepStrictEqual(bobGSet.value, new Set());

    aliceGSet.add("element");
    assert.deepStrictEqual(aliceGSet.value, new Set(["element"]));
    assert.deepStrictEqual(bobGSet.value, new Set(["element"]));

    bobGSet.add(7);
    assert.deepStrictEqual(aliceGSet.value, new Set(["element", 7]));
    assert.deepStrictEqual(bobGSet.value, new Set(["element", 7]));

    aliceGSet.add(7);
    assert.deepStrictEqual(aliceGSet.value, new Set(["element", 7]));
    assert.deepStrictEqual(bobGSet.value, new Set(["element", 7]));
    console.log("...ok");
}

testCounter();
testMultRegister();
testGSet();
