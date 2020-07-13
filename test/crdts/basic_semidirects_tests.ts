const assert = require('assert');
import {TestingInOrderRuntimeGenerator} from "../runtime_for_testing";
import {IntRegisterCrdt} from "../../src/crdts/basic_semidirects";

let runtimeGen = new TestingInOrderRuntimeGenerator();
let alice = runtimeGen.newRuntime();
let bob = runtimeGen.newRuntime();

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
    assert.equal(aliceIntRegister.value, 3);
    assert.equal(bobIntRegister.value, 3);

    bobIntRegister.mult(-4);
    assert.equal(aliceIntRegister.value, -12);
    assert.equal(bobIntRegister.value, -12);

    aliceIntRegister.add(7);
    assert.equal(aliceIntRegister.value, -5);
    assert.equal(bobIntRegister.value, -5);
    console.log("...ok");
}

testIntRegister();
