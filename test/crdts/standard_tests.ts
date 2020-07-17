import assert from 'assert';
import {TestingRuntimeGenerator} from "../runtime_for_testing";
import { EnableWinsFlag, DisableWinsFlag, IntRegisterCrdt, UnresettableIntRegisterCrdt, AddWinsSet } from '../../src/crdts/standard';

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

function testAwSet() {
    console.log("testAwSet()...");

    let aliceSet = new AddWinsSet<string>("awSetId", alice);
    aliceSet.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " did " +
         JSON.stringify(event.description)));
    let bobSet = new AddWinsSet<string>("awSetId", bob);
    bobSet.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " did " +
         JSON.stringify(event.description)));
    assertSetEquals(new Set(aliceSet.values()), new Set());
    assertSetEquals(new Set(bobSet.values()), new Set());

    aliceSet.add("element");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["element"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element"]));

    bobSet.add("7");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["element", "7"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element", "7"]));

    aliceSet.add("7");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["element", "7"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element", "7"]));

    // Out of order test
    aliceSet.add("first");
    assertSetEquals(new Set(aliceSet.values()), new Set(["element", "7", "first"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element", "7"]));

    bobSet.add("second");
    assertSetEquals(new Set(aliceSet.values()), new Set(["element", "7", "first"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element", "7", "second"]));

    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["element", "7", "first", "second"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["element", "7", "first", "second"]));

    // Delete tests on single element (copying EwFlag tests)
    aliceSet.delete("element");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["7", "first", "second"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["7", "first", "second"]));

    bobSet.delete("nonexistent");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["7", "first", "second"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["7", "first", "second"]));

    aliceSet.add("concurrent");
    aliceSet.delete("concurrent");
    bobSet.add("concurrent");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["7", "first", "second", "concurrent"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["7", "first", "second", "concurrent"]));

    // Observed-reset test
    bobSet.reset();
    assertSetEquals(new Set(bobSet.values()), new Set());
    aliceSet.add("survivor");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["survivor"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["survivor"]));

    // Reset-wins test
    aliceSet.resetStrong();
    aliceSet.add("alice's");
    bobSet.reset();
    bobSet.add("bob's");
    assertSetEquals(new Set(aliceSet.values()), new Set(["alice's"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["bob's"]));
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["alice's"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["alice's"]));

    console.log("...ok");
}

testEwFlag();
testDwFlag();
testIntRegister();
testFromPaper();
testUnresettableIntRegister();
testAwSet();



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
