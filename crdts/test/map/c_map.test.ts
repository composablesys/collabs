import { InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CMap, CVar } from "../../src";
import { Source, Traces } from "../traces";

/**
 * V value type: array of conflicts; for each
 * conflict, [current value, CVar.conflicts()].
 */
class MapSource
  implements
    Source<
      CMap<string, CVar<string>, [string]>,
      Record<string, [string, string[]][]>
    >
{
  constructor(
    readonly rng: seedrandom.prng,
    readonly mode: "set/delete" | "op/op"
  ) {}

  pre(init: InitToken) {
    return new CMap<string, CVar<string>, [string]>(
      init,
      (valueInit, key, initialValue) =>
        new CVar(valueInit, `${key}:${initialValue}`)
    );
  }
  check(
    actual: CMap<string, CVar<string>, [string]>,
    expected: Record<string, [string, string[]][]>
  ): void {
    assert.deepStrictEqual(
      new Set(actual.keys()),
      new Set(Object.keys(expected))
    );
    for (const key of actual.keys()) {
      const value = actual.get(key);
      assert.isDefined(value, `"${key}" is in keys() but not present`);
      assert.deepStrictEqual(actual.get(key)!.value, expected[key][0][0]);
      assert.deepStrictEqual(actual.get(key)!.conflicts(), expected[key][0][1]);
      assert.deepStrictEqual(
        actual
          .getConflicts(key)
          .map((conflict) => [conflict.value, conflict.conflicts()]),
        expected[key]
      );
    }
  }
  op(c: CMap<string, CVar<string>, [string]>, n: number): void {
    switch (this.mode) {
      case "set/delete":
        // Test set/set and set/delete conflicts, with some value ops
        // for good measure.
        switch (n) {
          case 0:
            c.set("key", "init_op0");
            break;
          case 1: {
            const value = c.get("key");
            if (value !== undefined) {
              value.value = "op1";
            } else c.set("key", "init_op1");
            break;
          }
          case 2:
            if (c.has("key")) c.delete("key");
            else c.set("key", "init_op2").value = "op2";
            break;
          case 3:
            c.set("key", "init_op3");
            c.get("key")!.value = "op3";
            break;
          default: {
            const value = c.get("key");
            if (value !== undefined) {
              value.value = `op${n}`;
            } else c.set("key", `init_op${n}`);
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
  setupOp(c: CMap<string, CVar<string>, [string]>) {
    if (this.mode === "op/op") {
      // Create a value at key.
      // Do it here instead of in op 0 to avoid set/set conflicts,
      // which would otherwise give us different behavior from CVar's tests.
      c.set("key", "initial");
    }
  }
}

describe("CMap", () => {
  let rng!: seedrandom.prng;
  let source!: MapSource;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  describe("set/delete", () => {
    beforeEach(() => {
      source = new MapSource(rng, "set/delete");
    });

    it("initial", () => {
      Traces.initial(source, {});
    });

    it("singleOp", () => {
      Traces.singleOp(source, { key: [["key:init_op0", []]] });
    });

    it("sequential", () => {
      Traces.sequential(
        source,
        { key: [["key:init_op0", []]] },
        { key: [["op1", ["op1"]]] },
        {},
        { key: [["op3", ["op3"]]] }
      );
    });

    it("concurrent", () => {
      Traces.concurrent(
        source,
        { key: [["key:init_op0", []]] },
        { key: [["key:init_op1", []]] },
        // Conflict between CVars; op 0 wins.
        {
          key: [
            ["key:init_op0", []],
            ["key:init_op1", []],
          ],
        }
      );
    });

    it("diamond", () => {
      Traces.diamond(
        source,
        { key: [["key:init_op0", []]] },
        { key: [["op1", ["op1"]]] },
        {},
        // Delete wins over CVar operation.
        {},
        { key: [["op3", ["op3"]]] }
      );
    });

    it("partition", () => {
      Traces.partition(
        source,
        { key: [["op3", ["op3"]]] },
        { key: [["op7", ["op7"]]] },
        // The sets in ops 3 and 4 conflict; op 3 wins.
        {
          key: [
            ["op3", ["op3"]],
            ["op7", ["op7"]],
          ],
        }
      );
    });
  });

  describe("op/op", () => {
    beforeEach(() => {
      source = new MapSource(rng, "op/op");
    });

    it("initial", () => {
      Traces.initial(source, { key: [["key:initial", []]] });
    });

    it("singleOp", () => {
      Traces.singleOp(source, { key: [["op0", ["op0"]]] });
    });

    it("sequential", () => {
      Traces.sequential(
        source,
        { key: [["op0", ["op0"]]] },
        { key: [["op1", ["op1"]]] },
        { key: [["op2", ["op2"]]] },
        { key: [["op3", ["op3"]]] }
      );
    });

    it("concurrent", () => {
      Traces.concurrent(
        source,
        { key: [["op0", ["op0"]]] },
        { key: [["op1", ["op1"]]] },
        // op 0 is done by the lower replicaID, which wins the conflict.
        { key: [["op0", ["op0", "op1"]]] }
      );
    });

    it("diamond", () => {
      Traces.diamond(
        source,
        { key: [["op0", ["op0"]]] },
        { key: [["op1", ["op1"]]] },
        { key: [["op2", ["op2"]]] },
        // op 1 is done by the lower replicaID, which wins the conflict.
        { key: [["op1", ["op1", "op2"]]] },
        { key: [["op3", ["op3"]]] }
      );
    });

    it("partition", () => {
      Traces.partition(
        source,
        { key: [["op3", ["op3"]]] },
        { key: [["op7", ["op7"]]] },
        // op 3 is done by the lower replicaID, which wins the conflict.
        { key: [["op3", ["op3", "op7"]]] }
      );
    });
  });
});
