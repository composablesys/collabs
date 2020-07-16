import assert from 'assert';
import {TestingRuntimeGenerator} from "../runtime_for_testing";
import { EnableWinsFlag, DisableWinsFlag } from '../../src/crdts/standard';

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

testEwFlag();
testDwFlag();
