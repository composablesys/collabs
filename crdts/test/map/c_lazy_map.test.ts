import { CLazyMap, InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CRuntime, CValueSet, CVar, TestingRuntimes } from "../../src";
import { Source, Traces } from "../traces";
/**
 * V value type: for each value CVar, [current value, CVar.conflicts()].
 */
class LazyMapSource
  implements
    Source<CLazyMap<string, CVar<string>>, Record<string, [string, string[]]>>
{
  constructor(
    readonly rng: seedrandom.prng,
    readonly mode: "presence" | "op/op"
  ) {}

  pre(init: InitToken) {
    return new CLazyMap<string, CVar<string>>(
      init,
      (valueInit) => new CVar(valueInit, "initial")
    );
  }
  check(
    actual: CLazyMap<string, CVar<string>>,
    expected: Record<string, [string, string[]]>
  ): void {
    assert.deepStrictEqual(
      new Set(actual.keys()),
      new Set(Object.keys(expected))
    );
    for (const key of actual.keys()) {
      const value = actual.get(key);
      assert(!value.canGC(), `"${key}" is in keys() but not present (canGC)`);
      assert.strictEqual(value, actual.get(key));
      assert.deepStrictEqual(value.value, expected[key][0]);
      assert.deepStrictEqual(value.conflicts(), expected[key][1]);
    }
  }
  op(c: CLazyMap<string, CVar<string>>, n: number): void {
    switch (this.mode) {
      case "presence":
        // Test presence conflicts by messing with internal set & clear.
        switch (n) {
          case 0:
            c.get("key").value = "op0";
            break;
          case 1: {
            // Don't touch key, so we can test whether op 2's
            // clear is merged properly.
            c.get("other").value = "op1";
            break;
          }
          case 2:
            c.get("key").clear();
            break;
          case 3:
            c.get("key").value = "op3";
            c.get("other").clear();
            break;
          default: {
            c.get("key").value = `op${n}`;
            // Should have no effect.
            c.get("other");
          }
        }
        break;
      case "op/op":
        // Test that concurrent operations on a value work as usual
        // (in particular, the CMap doesn't mess up its merging).
        // These ops are the same as for CVar, just performed on the value at "key".
        const value = c.get("key")!;
        value.value = `op${n}`;
        break;
    }
  }
}

describe("CLazyMap", () => {
  let rng!: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  describe("traces", () => {
    let source!: LazyMapSource;

    describe("presence", () => {
      beforeEach(() => {
        source = new LazyMapSource(rng, "presence");
      });

      it("initial", () => {
        Traces.initial(source, {});
      });

      it("singleOp", () => {
        Traces.singleOp(source, { key: ["op0", ["op0"]] });
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          { key: ["op0", ["op0"]] },
          { key: ["op0", ["op0"]], other: ["op1", ["op1"]] },
          { other: ["op1", ["op1"]] },
          { key: ["op3", ["op3"]] }
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          { key: ["op0", ["op0"]] },
          { other: ["op1", ["op1"]] },
          { key: ["op0", ["op0"]], other: ["op1", ["op1"]] }
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          { key: ["op0", ["op0"]] },
          { key: ["op0", ["op0"]], other: ["op1", ["op1"]] },
          {},
          // key remains cleared, so not present.
          { other: ["op1", ["op1"]] },
          { key: ["op3", ["op3"]] }
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          { key: ["op3", ["op3"]] },
          { key: ["op7", ["op7"]] },
          // The sets in ops 3 and 7 conflict; op 3 wins.
          {
            key: ["op3", ["op3", "op7"]],
          }
        );
      });
    });

    describe("op/op", () => {
      beforeEach(() => {
        source = new LazyMapSource(rng, "op/op");
      });

      it("initial", () => {
        Traces.initial(source, {});
      });

      it("singleOp", () => {
        Traces.singleOp(source, { key: ["op0", ["op0"]] });
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          { key: ["op0", ["op0"]] },
          { key: ["op1", ["op1"]] },
          { key: ["op2", ["op2"]] },
          { key: ["op3", ["op3"]] }
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          { key: ["op0", ["op0"]] },
          { key: ["op1", ["op1"]] },
          // op 0 is done by the lower replicaID, which wins the conflict.
          { key: ["op0", ["op0", "op1"]] }
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          { key: ["op0", ["op0"]] },
          { key: ["op1", ["op1"]] },
          { key: ["op2", ["op2"]] },
          // op 1 is done by the lower replicaID, which wins the conflict.
          { key: ["op1", ["op1", "op2"]] },
          { key: ["op3", ["op3"]] }
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          { key: ["op3", ["op3"]] },
          { key: ["op7", ["op7"]] },
          // op 3 is done by the lower replicaID, which wins the conflict.
          { key: ["op3", ["op3", "op7"]] }
        );
      });
    });
  });

  describe("unit", () => {
    let runtimeGen!: TestingRuntimes;
    let alice!: CRuntime;
    let bob!: CRuntime;

    let aliceMap!: CLazyMap<string, CVar<number>>;
    let bobMap!: CLazyMap<string, CVar<number>>;

    beforeEach(() => {
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
    });

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
});
