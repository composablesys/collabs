import assert = require('assert');
import {TestingRuntimeGenerator} from "../runtime_for_testing";
import {IntRegisterCrdt} from "../../src/crdts/basic_semidirects";

let runtimeGen = new TestingRuntimeGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");

function testIntRegister() {
    console.log("testIntRegister()...");

    let aliceIntRegister = new IntRegisterCrdt("intRegisterId", alice);
    aliceIntRegister.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    let bobIntRegister = new IntRegisterCrdt("intRegisterId", bob);
    bobIntRegister.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    assert.equal(aliceIntRegister.value, 0);
    assert.equal(bobIntRegister.value, 0);

    aliceIntRegister.add(3);
    runtimeGen.releaseAll();
    assert.equal(aliceIntRegister.value, 3);
    assert.equal(bobIntRegister.value, 3);

    bobIntRegister.mult(-4);
    runtimeGen.releaseAll();
    assert.equal(aliceIntRegister.value, -12);
    assert.equal(bobIntRegister.value, -12);

    aliceIntRegister.add(7);
    runtimeGen.releaseAll();
    assert.equal(aliceIntRegister.value, -5);
    assert.equal(bobIntRegister.value, -5);

    // Out of order tests
    aliceIntRegister.add(2);
    assert.equal(aliceIntRegister.value, -3);
    assert.equal(bobIntRegister.value, -5);

    bobIntRegister.mult(5);
    assert.equal(aliceIntRegister.value, -3);
    assert.equal(bobIntRegister.value, -25);

    runtimeGen.releaseAll();
    assert.equal(aliceIntRegister.value, -15);
    assert.equal(bobIntRegister.value, -15);
    console.log("...ok");
}

function testFromPaper() {
    // The +/x example from the figure in the paper
    console.log("testFromPaper()...");

    let aliceIntRegister = new IntRegisterCrdt("intRegisterId2", alice, 1);
    aliceIntRegister.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    let bobIntRegister = new IntRegisterCrdt("intRegisterId2", bob, 1);
    bobIntRegister.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    assert.equal(aliceIntRegister.value, 1);
    assert.equal(bobIntRegister.value, 1);

    aliceIntRegister.mult(2);
    aliceIntRegister.add(1);
    bobIntRegister.mult(3);
    bobIntRegister.add(4);
    assert.equal(aliceIntRegister.value, 3);
    assert.equal(bobIntRegister.value, 7);

    runtimeGen.releaseAll();
    assert.equal(aliceIntRegister.value, 17);
    assert.equal(bobIntRegister.value, 17);
    console.log("...ok");
}

testIntRegister();
testFromPaper();
