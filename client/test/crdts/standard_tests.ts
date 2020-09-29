import assert from 'assert';
import {TestingRuntimeGenerator} from "../runtime_for_testing";
import { EnableWinsFlag, DisableWinsFlag, IntRegisterCrdt, UnresettableIntRegisterCrdt, AddWinsSet, CrdtObject, MapCrdt, OrthogonalCrdt } from '../../src/crdts/standard';
import { CrdtRuntime } from '../../src/crdt_runtime_interface';

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

function testOrthogonal() {
    console.log("testOrthogonal()...");

    let aliceOrthogonal = new OrthogonalCrdt("orthogonalId", alice);
    aliceOrthogonal.onchange = (event => console.log(
        "Alice: " + event.timestamp.getSender() + " set to " +
        event.description));
    let bobOrthogonal = new OrthogonalCrdt("orthogonalId", bob);
    bobOrthogonal.onchange = (event => console.log(
        "Bob: " + event.timestamp.getSender() + " set to " +
        event.description));
    assert.deepStrictEqual(aliceOrthogonal.value, [0, false]);
    assert.deepStrictEqual(bobOrthogonal.value, [0, false]);

    aliceOrthogonal.rotate(1);
    runtimeGen.releaseAll();
    assert.deepStrictEqual(aliceOrthogonal.value, [1, false]);
    assert.deepStrictEqual(bobOrthogonal.value, [1, false]);

    aliceOrthogonal.rotate(10);
    runtimeGen.releaseAll();
    assert.deepStrictEqual(aliceOrthogonal.value, [11 % (2*Math.PI), false]);
    assert.deepStrictEqual(bobOrthogonal.value, [11 % (2*Math.PI), false]);
    aliceOrthogonal.rotate(-10);
    runtimeGen.releaseAll();

    bobOrthogonal.reflectHorizontalAxis();
    runtimeGen.releaseAll();
    assert.deepStrictEqual(aliceOrthogonal.value, [2*Math.PI - 1, true]);
    assert.deepStrictEqual(bobOrthogonal.value, [2*Math.PI - 1, true]);

    aliceOrthogonal.rotate(1.5);
    runtimeGen.releaseAll();
    assert.deepStrictEqual(aliceOrthogonal.value, [0.5, true]);
    assert.deepStrictEqual(bobOrthogonal.value, [0.5, true]);

    bobOrthogonal.reflect(0.5);
    runtimeGen.releaseAll();
    assert.deepStrictEqual(aliceOrthogonal.value, [0.5, false]);
    assert.deepStrictEqual(bobOrthogonal.value, [0.5, false]);

    // Out of order tests
    aliceOrthogonal.reset();
    runtimeGen.releaseAll();
    assert.deepStrictEqual(aliceOrthogonal.value, [0, false]);
    assert.deepStrictEqual(bobOrthogonal.value, [0, false]);

    aliceOrthogonal.rotate(Math.PI/2);
    assert.deepStrictEqual(aliceOrthogonal.value, [Math.PI/2, false]);
    assert.deepStrictEqual(bobOrthogonal.value, [0, false]);

    bobOrthogonal.reflectHorizontalAxis();
    assert.deepStrictEqual(aliceOrthogonal.value, [Math.PI/2, false]);
    assert.deepStrictEqual(bobOrthogonal.value, [0, true]);

    runtimeGen.releaseAll();
    assert.deepStrictEqual(aliceOrthogonal.value, [3*Math.PI/2, true]);
    assert.deepStrictEqual(bobOrthogonal.value, [3*Math.PI/2, true]);
    console.log("...ok");
}

class BiCounter extends CrdtObject<string, IntRegisterCrdt> {
    a: IntRegisterCrdt;
    b: IntRegisterCrdt;
    constructor(crdtId: any, runtime: CrdtRuntime) {
        super(crdtId, runtime);
        this.startPredefinedPropertyCreation();
        this.a = new IntRegisterCrdt("a", this, 1);
        this.b = new IntRegisterCrdt("b", this, 1);
        this.endPredefinedPropertyCreation();
    }
}

function testCrdtObject() {
    console.log("testCrdtObject()...");

    let aliceBi = new BiCounter("biId", alice);
    let bobBi = new BiCounter("biId", bob);

    // Do testFromPaper() on each counter
    aliceBi.a.onchange = (event => console.log(
        "Alice a: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    bobBi.a.onchange = (event => console.log(
        "Bob a: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    aliceBi.b.onchange = (event => console.log(
        "Alice b: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    bobBi.b.onchange = (event => console.log(
        "Bob b: " + event.timestamp.getSender() + " " +
        event.description[0] + "ed " + event.description[1]));
    assert.equal(aliceBi.a.value, 1);
    assert.equal(bobBi.a.value, 1);

    aliceBi.a.mult(2);
    aliceBi.a.add(1);
    bobBi.a.mult(3);
    bobBi.a.add(4);
    assert.equal(aliceBi.a.value, 3);
    assert.equal(bobBi.a.value, 7);

    runtimeGen.releaseAll();
    assert.equal(aliceBi.a.value, 17);
    assert.equal(bobBi.a.value, 17);

    assert.equal(aliceBi.b.value, 1);
    assert.equal(bobBi.b.value, 1);

    aliceBi.b.mult(2);
    aliceBi.b.add(1);
    bobBi.b.mult(3);
    bobBi.b.add(4);
    assert.equal(aliceBi.b.value, 3);
    assert.equal(bobBi.b.value, 7);

    runtimeGen.releaseAll();
    assert.equal(aliceBi.b.value, 17);
    assert.equal(bobBi.b.value, 17);

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
    // TODO: test deleteStrong

    // Observed-reset test
    bobSet.reset();
    assertSetEquals(new Set(bobSet.values()), new Set());
    aliceSet.add("survivor");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceSet.values()), new Set(["survivor"]));
    assertSetEquals(new Set(bobSet.values()), new Set(["survivor"]));
    //
    // // Reset-wins test
    // aliceSet.resetStrong();
    // aliceSet.add("alice's");
    // bobSet.reset();
    // bobSet.add("bob's");
    // assertSetEquals(new Set(aliceSet.values()), new Set(["alice's"]));
    // assertSetEquals(new Set(bobSet.values()), new Set(["bob's"]));
    // runtimeGen.releaseAll();
    // assertSetEquals(new Set(aliceSet.values()), new Set(["alice's"]));
    // assertSetEquals(new Set(bobSet.values()), new Set(["alice's"]));

    console.log("...ok");
}

function testMap() {
    console.log("testMap()...");

    let aliceMap = new MapCrdt<string, IntRegisterCrdt>("map", alice,
            (key: string, internalRuntime: CrdtRuntime) => new IntRegisterCrdt(key, internalRuntime));
    let bobMap = new MapCrdt<string, IntRegisterCrdt>("map", bob,
            (key: string, internalRuntime: CrdtRuntime) => new IntRegisterCrdt(key, internalRuntime));

    assertSetEquals(new Set(aliceMap.keys()), new Set([]));
    assertSetEquals(new Set(bobMap.keys()), new Set([]));

    // Inits go through
    aliceMap.init("test");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["test"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["test"]));
    assert(aliceMap.has("test"));
    assert(bobMap.has("test"));

    let aliceTest = aliceMap.get("test") as IntRegisterCrdt;
    assert(aliceTest);
    let bobTest = bobMap.get("test") as IntRegisterCrdt;
    assert(bobTest);
    assert.equal(aliceTest.value, 0);
    assert.equal(bobTest.value, 0);

    // Value ops work
    aliceTest.add(3);
    bobTest.add(4);
    runtimeGen.releaseAll();
    assert.equal(aliceTest.value, 7);
    assert.equal(bobTest.value, 7);

    // Delete works
    bobMap.delete("test");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set([]));
    assertSetEquals(new Set(bobMap.keys()), new Set([]));
    assert(aliceMap.get("test") === undefined);
    assert(bobMap.get("test") === undefined);

    aliceMap.init("register");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));

    // Concurrent operation revives key
    let bobRegister = bobMap.get("register") as IntRegisterCrdt;
    aliceMap.delete("register");
    bobRegister.add(3);
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));
    assert.equal(bobRegister.value, 3);
    assert.equal((aliceMap.get("register") as IntRegisterCrdt).value, 3);

    // Reset tests
    // Concurrent op revives
    let aliceRegister = aliceMap.get("register") as IntRegisterCrdt;
    aliceMap.reset();
    assertSetEquals(new Set(aliceMap.keys()), new Set([]));
    assert.equal(aliceMap.get("register"), undefined);
    assert.equal(aliceRegister.value, 0);
    bobRegister.add(5);
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));
    assert.equal(bobRegister.value, 5);
    assert.equal(aliceRegister, aliceMap.get("register"));
    assert.equal(aliceRegister.value, 5);

    // Causally later op revives
    bobMap.reset();
    bobRegister.add(7);
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));
    assert.equal(bobRegister.value, 7);
    assert.equal(aliceRegister, aliceMap.get("register"));
    assert.equal(aliceRegister.value, 7);

    // TODO: strong delete, strong resets, nesting?
    console.log("...ok");
}

testEwFlag();
testDwFlag();
testIntRegister();
testFromPaper();
testUnresettableIntRegister();
testOrthogonal();
testCrdtObject();
testAwSet();
testMap();


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
