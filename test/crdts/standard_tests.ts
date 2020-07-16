import assert from 'assert';
import {TestingRuntimeGenerator} from "../runtime_for_testing";
import { EnableWinsFlag, DisableWinsFlag, IntRegisterCrdt, UnresettableIntRegisterCrdt } from '../../src/crdts/standard';

let runtimeGen = new TestingRuntimeGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");

function testEwFlag() {
    console.log("testEwFlag()...");

    let aliceFlag = new EnableWinsFlag("ewFlagId", alice);
    aliceFlag.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " did " + event.description));
    let bobFlag = new EnableWinsFlag("ewFlagId", bob);
    bobFlag.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " did " + event.description));
    assert.equal(aliceFlag.enabled, false);
    assert.equal(bobFlag.enabled, false);

    aliceFlag.enable();
    runtimeGen.releaseAll();
    assert.equal(aliceFlag.enabled, true);
    assert.equal(bobFlag.enabled, true);

    aliceFlag.disable();
    runtimeGen.releaseAll();
    assert.equal(aliceFlag.enabled, false);
    assert.equal(bobFlag.enabled, false);

    aliceFlag.enable();
    bobFlag.disable();
    runtimeGen.releaseAll();
    assert.equal(aliceFlag.enabled, true);
    assert.equal(bobFlag.enabled, true);

    console.log("...ok");
}

function testDwFlag() {
    console.log("testDwFlag()...");

    let aliceFlag = new DisableWinsFlag("dwFlagId", alice);
    aliceFlag.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " did " + event.description));
    let bobFlag = new DisableWinsFlag("dwFlagId", bob);
    bobFlag.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " did " + event.description));
    assert.equal(aliceFlag.enabled, true);
    assert.equal(bobFlag.enabled, true);

    aliceFlag.disable();
    runtimeGen.releaseAll();
    assert.equal(aliceFlag.enabled, false);
    assert.equal(bobFlag.enabled, false);

    bobFlag.enable();
    runtimeGen.releaseAll();
    assert.equal(aliceFlag.enabled, true);
    assert.equal(bobFlag.enabled, true);

    aliceFlag.disable();
    runtimeGen.releaseAll();
    assert.equal(aliceFlag.enabled, false);
    assert.equal(bobFlag.enabled, false);

    aliceFlag.enable();
    bobFlag.disable();
    assert.equal(aliceFlag.enabled, true);
    runtimeGen.releaseAll();
    assert.equal(aliceFlag.enabled, false);
    assert.equal(bobFlag.enabled, false);

    console.log("...ok");
}

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

function testUnresettableIntRegister() {
    console.log("testIntRegister()...");

    let aliceIntRegister = new UnresettableIntRegisterCrdt("intRegisterId3", alice);
    aliceIntRegister.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    let bobIntRegister = new UnresettableIntRegisterCrdt("intRegisterId3", bob);
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

testEwFlag();
testDwFlag();
testIntRegister();
testFromPaper();
testUnresettableIntRegister();
