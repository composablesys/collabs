import assert from 'assert';
import { AddEvent, Crdt, GSetCrdt, MultEvent, SetAddEvent } from '../../src/crdts';
import { AddWinsSet, DisableWinsFlag, EnableWinsFlag, LwwMap, MapCrdt, NewCrdtEvent, NumberCrdt, RuntimeCrdtGenerator, SetDeleteEvent } from '../../src/crdts/standard';
import { TestingNetworkGenerator } from '../runtime_for_testing';

let runtimeGen = new TestingNetworkGenerator();
let alice = runtimeGen.newRuntime("alice");
let bob = runtimeGen.newRuntime("bob");

function testEwFlag() {
    console.log("testEwFlag()...");

    let aliceFlag = new EnableWinsFlag(alice, "ewFlagId");
    aliceFlag.addEventListener("Enable", event => console.log(
        "Alice: " + event.timestamp.getSender() + " enabled"));
    aliceFlag.addEventListener("Disable", event => console.log(
        "Alice: " + event.timestamp.getSender() + " disabled"));
    let bobFlag = new EnableWinsFlag(bob, "ewFlagId");
    bobFlag.addEventListener("Enable", event => console.log(
        "Bob: " + event.timestamp.getSender() + " enabled"));
    bobFlag.addEventListener("Disable", event => console.log(
        "Bob: " + event.timestamp.getSender() + " disabled"));
    assert.strictEqual(aliceFlag.enabled, false);
    assert.strictEqual(bobFlag.enabled, false);

    aliceFlag.enable();
    runtimeGen.releaseAll();
    assert.strictEqual(aliceFlag.enabled, true);
    assert.strictEqual(bobFlag.enabled, true);

    aliceFlag.disable();
    runtimeGen.releaseAll();
    assert.strictEqual(aliceFlag.enabled, false);
    assert.strictEqual(bobFlag.enabled, false);

    aliceFlag.enable();
    bobFlag.disable();
    runtimeGen.releaseAll();
    assert.strictEqual(aliceFlag.enabled, true);
    assert.strictEqual(bobFlag.enabled, true);

    console.log("...ok");
}

function testDwFlag() {
    console.log("testDwFlag()...");

    let aliceFlag = new DisableWinsFlag(alice, "dwFlagId");
    aliceFlag.addEventListener("Enable", event => console.log(
        "Alice: " + event.timestamp.getSender() + " enabled"));
    aliceFlag.addEventListener("Disable", event => console.log(
        "Alice: " + event.timestamp.getSender() + " disabled"));
    let bobFlag = new DisableWinsFlag(bob, "dwFlagId");
    bobFlag.addEventListener("Enable", event => console.log(
        "Bob: " + event.timestamp.getSender() + " enabled"));
    bobFlag.addEventListener("Disable", event => console.log(
        "Bob: " + event.timestamp.getSender() + " disabled"));
    assert.strictEqual(aliceFlag.enabled, true);
    assert.strictEqual(bobFlag.enabled, true);

    aliceFlag.disable();
    runtimeGen.releaseAll();
    assert.strictEqual(aliceFlag.enabled, false);
    assert.strictEqual(bobFlag.enabled, false);

    bobFlag.enable();
    runtimeGen.releaseAll();
    assert.strictEqual(aliceFlag.enabled, true);
    assert.strictEqual(bobFlag.enabled, true);

    aliceFlag.disable();
    runtimeGen.releaseAll();
    assert.strictEqual(aliceFlag.enabled, false);
    assert.strictEqual(bobFlag.enabled, false);

    aliceFlag.enable();
    bobFlag.disable();
    assert.strictEqual(aliceFlag.enabled, true);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceFlag.enabled, false);
    assert.strictEqual(bobFlag.enabled, false);

    console.log("...ok");
}

function testNumber() {
    console.log("testNumber()...");

    let aliceNumber = new NumberCrdt(alice, "numberId", 0, false);
    aliceNumber.addEventListener("Add", event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    aliceNumber.addEventListener("Mult", event => console.log(
        "Alice: " + event.timestamp.getSender() + " multed " + (event as MultEvent).valueMulted));
    let bobNumber = new NumberCrdt(bob, "numberId", 0, false);
    bobNumber.addEventListener("Add", event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    bobNumber.addEventListener("Mult", event => console.log(
        "Bob: " + event.timestamp.getSender() + " multed " + (event as MultEvent).valueMulted));
    assert.strictEqual(aliceNumber.value, 0);
    assert.strictEqual(bobNumber.value, 0);

    aliceNumber.add(3);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceNumber.value, 3);
    assert.strictEqual(bobNumber.value, 3);

    bobNumber.mult(-4);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceNumber.value, -12);
    assert.strictEqual(bobNumber.value, -12);

    aliceNumber.add(7);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceNumber.value, -5);
    assert.strictEqual(bobNumber.value, -5);

    // Out of order tests
    aliceNumber.add(2);
    assert.strictEqual(aliceNumber.value, -3);
    assert.strictEqual(bobNumber.value, -5);

    bobNumber.mult(5);
    assert.strictEqual(aliceNumber.value, -3);
    assert.strictEqual(bobNumber.value, -25);

    runtimeGen.releaseAll();
    assert.strictEqual(aliceNumber.value, -15);
    assert.strictEqual(bobNumber.value, -15);
    console.log("...ok");
}

function testFromPaper() {
    // The +/x example from the figure in the paper
    console.log("testFromPaper()...");

    let aliceNumber = new NumberCrdt(alice, "numberId2", 1);
    aliceNumber.addEventListener("Add", event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    aliceNumber.addEventListener("Mult", event => console.log(
        "Alice: " + event.timestamp.getSender() + " multed " + (event as MultEvent).valueMulted));
    let bobNumber = new NumberCrdt(bob, "numberId2", 1);
    bobNumber.addEventListener("Add", event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + (event as AddEvent).valueAdded));
    bobNumber.addEventListener("Mult", event => console.log(
        "Bob: " + event.timestamp.getSender() + " multed " + (event as MultEvent).valueMulted));
    assert.strictEqual(aliceNumber.value, 1);
    assert.strictEqual(bobNumber.value, 1);

    aliceNumber.mult(2);
    aliceNumber.add(1);
    bobNumber.mult(3);
    bobNumber.add(4);
    assert.strictEqual(aliceNumber.value, 3);
    assert.strictEqual(bobNumber.value, 7);

    runtimeGen.releaseAll();
    assert.strictEqual(aliceNumber.value, 17);
    assert.strictEqual(bobNumber.value, 17);
    console.log("...ok");
}
//
// function testOrthogonal() {
//     console.log("testOrthogonal()...");
//
//     let aliceOrthogonal = new OrthogonalCrdt("orthogonalId", alice);
//     aliceOrthogonal.onchange = (event => console.log(
//         "Alice: " + event.timestamp.getSender() + " set to " +
//         event.description));
//     let bobOrthogonal = new OrthogonalCrdt("orthogonalId", bob);
//     bobOrthogonal.onchange = (event => console.log(
//         "Bob: " + event.timestamp.getSender() + " set to " +
//         event.description));
//     assert.deepStrictEqual(aliceOrthogonal.value, [0, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0, false]);
//
//     aliceOrthogonal.rotate(1);
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [1, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [1, false]);
//
//     aliceOrthogonal.rotate(10);
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [11 % (2*Math.PI), false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [11 % (2*Math.PI), false]);
//     aliceOrthogonal.rotate(-10);
//     runtimeGen.releaseAll();
//
//     bobOrthogonal.reflectHorizontalAxis();
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [2*Math.PI - 1, true]);
//     assert.deepStrictEqual(bobOrthogonal.value, [2*Math.PI - 1, true]);
//
//     aliceOrthogonal.rotate(1.5);
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [0.5, true]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0.5, true]);
//
//     bobOrthogonal.reflect(0.5);
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [0.5, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0.5, false]);
//
//     // Out of order tests
//     aliceOrthogonal.reset();
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [0, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0, false]);
//
//     aliceOrthogonal.rotate(Math.PI/2);
//     assert.deepStrictEqual(aliceOrthogonal.value, [Math.PI/2, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0, false]);
//
//     bobOrthogonal.reflectHorizontalAxis();
//     assert.deepStrictEqual(aliceOrthogonal.value, [Math.PI/2, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0, true]);
//
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [3*Math.PI/2, true]);
//     assert.deepStrictEqual(bobOrthogonal.value, [3*Math.PI/2, true]);
//     console.log("...ok");
// }
//
// class BiCounter extends CrdtObject<string, NumberCrdt> {
//     a: NumberCrdt;
//     b: NumberCrdt;
//     constructor(crdtId: any, runtime: CrdtRuntime) {
//         super(crdtId, runtime);
//         this.startPredefinedPropertyCreation();
//         this.a = new NumberCrdt("a", this, 1);
//         this.b = new NumberCrdt("b", this, 1);
//         this.endPredefinedPropertyCreation();
//     }
// }

function testAwSet() {
    console.log("testAwSet()...");

    let aliceSet = new AddWinsSet<string>(alice, "awSetId");
    aliceSet.addEventListener("SetAdd", event => console.log(
        "Alice: " + event.timestamp.getSender() + " added " + (event as SetAddEvent<string>).valueAdded));
    aliceSet.addEventListener("SetDelete", event => console.log(
        "Alice: " + event.timestamp.getSender() + " deleted " + (event as SetDeleteEvent<string>).valueDeleted));
    let bobSet = new AddWinsSet<string>(bob, "awSetId");
    bobSet.addEventListener("SetAdd", event => console.log(
        "Bob: " + event.timestamp.getSender() + " added " + (event as SetAddEvent<string>).valueAdded));
    bobSet.addEventListener("SetDelete", event => console.log(
        "Bob: " + event.timestamp.getSender() + " deleted " + (event as SetDeleteEvent<string>).valueDeleted));
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
    // TODO
    // bobSet.reset();
    // assertSetEquals(new Set(bobSet.values()), new Set());
    // aliceSet.add("survivor");
    // runtimeGen.releaseAll();
    // assertSetEquals(new Set(aliceSet.values()), new Set(["survivor"]));
    // assertSetEquals(new Set(bobSet.values()), new Set(["survivor"]));
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

    let aliceMap = new MapCrdt<string, NumberCrdt>(
        alice, "map",
        (parent: Crdt, id: string, _) => new NumberCrdt(parent, id)
    );
    // TODO: event listeners
    let bobMap = new MapCrdt<string, NumberCrdt>(
        bob, "map",
        (parent: Crdt, id: string, _) => new NumberCrdt(parent, id)
    );

    assertSetEquals(new Set(aliceMap.keys()), new Set([]));
    assertSetEquals(new Set(bobMap.keys()), new Set([]));

    // Inits go through
    aliceMap.addKey("test");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["test"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["test"]));
    assert(aliceMap.has("test"));
    assert(bobMap.has("test"));

    let aliceTest = aliceMap.get("test") as NumberCrdt;
    assert(aliceTest);
    let bobTest = bobMap.get("test") as NumberCrdt;
    assert(bobTest);
    assert.strictEqual(aliceTest.value, 0);
    assert.strictEqual(bobTest.value, 0);

    // Value ops work
    aliceTest.add(3);
    bobTest.add(4);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceTest.value, 7);
    assert.strictEqual(bobTest.value, 7);

    // Delete works
    bobMap.delete("test");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set([]));
    assertSetEquals(new Set(bobMap.keys()), new Set([]));
    assert(aliceMap.get("test") === undefined);
    assert(bobMap.get("test") === undefined);

    aliceMap.addKey("register");
    runtimeGen.releaseAll();
    assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
    assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));

    // TODO
//     // Concurrent operation revives key
//     let bobRegister = bobMap.get("register") as NumberCrdt;
//     aliceMap.delete("register");
//     bobRegister.add(3);
//     runtimeGen.releaseAll();
//     assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
//     assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));
//     assert.strictEqual(bobRegister.value, 3);
//     assert.strictEqual((aliceMap.get("register") as NumberCrdt).value, 3);
//
//     // Reset tests
//     // Concurrent op revives
//     let aliceRegister = aliceMap.get("register") as NumberCrdt;
//     aliceMap.reset();
//     assertSetEquals(new Set(aliceMap.keys()), new Set([]));
//     assert.strictEqual(aliceMap.get("register"), undefined);
//     assert.strictEqual(aliceRegister.value, 0);
//     bobRegister.add(5);
//     runtimeGen.releaseAll();
//     assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
//     assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));
//     assert.strictEqual(bobRegister.value, 5);
//     assert.strictEqual(aliceRegister, aliceMap.get("register"));
//     assert.strictEqual(aliceRegister.value, 5);
//
//     // Causally later op revives
//     bobMap.reset();
//     bobRegister.add(7);
//     runtimeGen.releaseAll();
//     assertSetEquals(new Set(aliceMap.keys()), new Set(["register"]));
//     assertSetEquals(new Set(bobMap.keys()), new Set(["register"]));
//     assert.strictEqual(bobRegister.value, 7);
//     assert.strictEqual(aliceRegister, aliceMap.get("register"));
//     assert.strictEqual(aliceRegister.value, 7);
//
//     // TODO: strong delete, strong resets, nesting?
//     console.log("...ok");
}

function testCrdtSetValues() {
    console.log("testCrdtSetValues()...");

    // Test that we can use Crdts as set values and the
    // references are handled correctly across replicas.

    let aliceMap = new MapCrdt<string, NumberCrdt>(
        alice, "valueMap",
        (parent: Crdt, id: string, _) => new NumberCrdt(parent, id)
    );
    let bobMap = new MapCrdt<string, NumberCrdt>(
        bob, "valueMap",
        (parent: Crdt, id: string, _) => new NumberCrdt(parent, id)
    );
    let aliceCounter = aliceMap.getForce("test");
    let bobCounter = bobMap.getForce("test");
    runtimeGen.releaseAll();

    let aliceSet = new GSetCrdt<NumberCrdt>(alice, "valueSet");
    let bobSet = new GSetCrdt<NumberCrdt>(bob, "valueSet");

    aliceSet.add(aliceCounter);
    assert.strictEqual(aliceSet.has(aliceCounter), true);
    runtimeGen.releaseAll();
    assert.strictEqual(bobSet.has(bobCounter), true);

    console.log("...ok");
}

function testRuntimeCrdtGenerator() {
    console.log("testRuntimeCrdtGenerator()...");

    let generator = (parent: Crdt, id: string, _: Uint8Array) => new NumberCrdt(parent, id);
    let aliceGen = new RuntimeCrdtGenerator(
        alice, "gen", generator
    );
    let bobGen = new RuntimeCrdtGenerator(
        bob, "gen", generator
    );

    let bobCounter: NumberCrdt | null = null;
    bobGen.addEventListener(
        "NewCrdt",
        event => (bobCounter = (event as NewCrdtEvent<NumberCrdt>).newCrdt)
    );
    let aliceCounter = aliceGen.generate(new Uint8Array());
    aliceCounter.add(7);
    runtimeGen.releaseAll();
    assert.strictEqual(aliceCounter.value, 7);
    assert.notStrictEqual(bobCounter, null);
    assert.strictEqual(bobCounter!.value, 7);

    console.log("...ok");
}

function testLwwMap() {
    console.log("testLwwMap()...");

    let aliceMap = new LwwMap<string, number>(alice, "lwwMap");
    let bobMap = new LwwMap<string, number>(bob, "lwwMap");

    console.log("...ok");
}

testEwFlag();
testDwFlag();
testNumber();
testFromPaper();
// testOrthogonal();
testAwSet();
testMap();
testCrdtSetValues();
testRuntimeCrdtGenerator();
testLwwMap();


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
