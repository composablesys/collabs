import { CLazyMap, InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CRuntime, CValueSet, CVar, TestingRuntimes } from "../../src";
import { debug } from "../debug";

describe("CLazyMap old tests", () => {
  let runtimeGen: TestingRuntimes;
  let alice: CRuntime;
  let bob: CRuntime;
  let rng: seedrandom.prng;

  let aliceMap: CLazyMap<string, CVar<number>>;
  let bobMap: CLazyMap<string, CVar<number>>;

  beforeEach(() => {
    rng = seedrandom("42");
    runtimeGen = new TestingRuntimes();
    alice = runtimeGen.newRuntime(rng);
    bob = runtimeGen.newRuntime(rng);

    const valueConstructor = (valueInitToken: InitToken) =>
      new CVar(valueInitToken, 0);
    aliceMap = alice.registerCollab(
      "map",
      (init) => new CLazyMap(init, valueConstructor)
    );
    bobMap = bob.registerCollab(
      "map",
      (init) => new CLazyMap(init, valueConstructor)
    );
    if (debug) {
      addEventListeners(aliceMap, "Alice");
      addEventListeners(bobMap, "Bob");
    }
  });

  function addEventListeners<K, V extends Object | null>(
    map: CLazyMap<any, any>,
    name: string
  ): void {
    // TODO: add listeners
  }

  it("is initially empty", () => {
    assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
    assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
  });

  describe("has", () => {
    it("returns true if the key is nontrivial", () => {
      aliceMap.get("test").value = 1; // Mutate it nontrivially
      assert.isTrue(aliceMap.has("test"));
      assert.isFalse(bobMap.has("test"));

      runtimeGen.releaseAll();
      assert.isTrue(aliceMap.has("test"));
      assert.isTrue(bobMap.has("test"));
    });

    it("returns false if the key is trivial", () => {
      aliceMap.get("test"); // Don't actually mutate it
      assert.isFalse(aliceMap.has("test"));
      assert.isFalse(bobMap.has("test"));

      runtimeGen.releaseAll();
      assert.isFalse(aliceMap.has("test"));
      assert.isFalse(bobMap.has("test"));
    });
  });

  describe("get", () => {
    it("returns the value", () => {
      const aliceTest = aliceMap.get("test");
      const bobTest = bobMap.get("test");
      assert.isOk(aliceTest);
      assert.isOk(bobTest);
      assert.strictEqual(aliceTest.value, 0);
      assert.strictEqual(bobTest.value, 0);
    });

    it("returns a CRDT that can be modified", () => {
      aliceMap.set("test");
      runtimeGen.releaseAll();
      const aliceTest = aliceMap.get("test")!;
      const bobTest = bobMap.get("test")!;
      aliceTest.value = 3;
      bobTest.value = 4;
      runtimeGen.releaseAll();
      const winner = alice.replicaID < bob.replicaID ? 3 : 4;
      assert.strictEqual(aliceTest.value, winner);
      assert.strictEqual(bobTest.value, winner);
    });
  });

  describe("gc", () => {
    it("deletes elements that canGC", () => {
      bobMap.get("test").value = 1; // Make nontrivial.
      runtimeGen.releaseAll();
      assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));

      bobMap.get("test").clear();
      runtimeGen.releaseAll();
      assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
      assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
    });

    it("lets concurrent value operation survive", () => {
      aliceMap.get("variable").value = 1;
      runtimeGen.releaseAll();
      assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
      assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));

      const bobVariable = bobMap.get("variable");

      aliceMap.get("variable").clear();
      bobVariable.value = 3;
      runtimeGen.releaseAll();
      assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
      assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));
      assert.strictEqual(bobVariable.value, 3);

      const aliceVariable = aliceMap.get("variable");
      assert.strictEqual(aliceVariable.value, 3);
    });
  });

  describe("value CRDT", () => {
    it("CollabID can be used as values in other CRDTs", () => {
      let aliceSet = alice.registerCollab(
        "valueSet",
        (init) => new CValueSet(init)
      );
      let bobSet = bob.registerCollab(
        "valueSet",
        (init) => new CValueSet(init)
      );

      let aliceCounter = aliceMap.get("test");
      let bobCounter = bobMap.get("test");

      aliceSet.add(aliceMap.idOf(aliceCounter));
      assert.strictEqual(aliceSet.has(aliceMap.idOf(aliceCounter)), true);
      runtimeGen.releaseAll();
      assert.strictEqual(bobSet.has(bobMap.idOf(bobCounter)), true);
    });
  });
});
