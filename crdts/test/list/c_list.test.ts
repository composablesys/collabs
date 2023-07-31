import { CollabID, InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CList, CRuntime, CVar, TestingRuntimes } from "../../src";
import { EventView } from "../event_view";
import { Source, Traces } from "../traces";
import { CListView } from "./views";

/**
 * V value type: for each CVar, [current value, CVar.conflicts()].
 */
class ListSource
  implements Source<CList<CVar<string>, [string]>, [string, string[]][]>
{
  private archivedID?: CollabID<CVar<string>>;

  constructor(
    readonly rng: seedrandom.prng,
    readonly mode: "insert/delete" | "op/op" | "move" | "archive"
  ) {}

  pre(init: InitToken) {
    const list = new CList<CVar<string>, [string]>(
      init,
      (valueInit, initialValue) => new CVar(valueInit, initialValue)
    );
    new CListView(list, false);
    return list;
  }
  check(
    actual: CList<CVar<string>, [string]>,
    expected: [string, string[]][]
  ): void {
    assert.deepStrictEqual(
      [...actual].map((cvar) => [cvar.value, cvar.conflicts()]),
      expected
    );
    assert.strictEqual(actual.length, expected.length);
    for (let i = 0; i < actual.length; i++) {
      assert.deepStrictEqual(actual.get(i).value, expected[i][0]);
      assert.deepStrictEqual(actual.get(i).conflicts(), expected[i][1]);
    }
    EventView.check(actual);
  }
  op(c: CList<CVar<string>, [string]>, n: number): void {
    switch (this.mode) {
      case "insert/delete":
        // Test insert/insert and insert/delete conflicts, with some value ops
        // for good measure.
        switch (n) {
          case 0:
            c.push("init_op0");
            break;
          case 1: {
            if (c.length > 0) {
              c.get(0).value = "op1";
            } else c.push("init_op1");
            break;
          }
          case 2:
            if (c.length > 0) c.delete(0);
            else c.push("init_op2").value = "op2";
            break;
          case 3:
            c.unshift("init_op3");
            c.get(0).value = "op3";
            break;
          default: {
            if (c.length > 0) {
              c.get(0).value = `op${n}`;
            } else c.push(`init_op${n}`);
          }
        }
        break;
      case "op/op":
        // Test that concurrent operations on a value work as usual
        // (in particular, the CMap doesn't mess up its merging).
        // These ops are the same as for CVar, just performed on the value at index 0.
        const value = c.get(0);
        value.value = `op${n}`;
        break;
      case "move":
        switch (n) {
          case 0:
            // Move the last 2 elements to the end.
            c.move(0, c.length, 2);
            break;
          case 1:
            // Move index 1 over its successor.
            c.move(1, 3);
            break;
          case 2:
            // Do an internal op on every value.
            for (const [, cvar] of c.entries()) {
              cvar.value += "_op2";
            }
            break;
          case 3:
            // Insert and delete stuff.
            c.delete(c.length - 1);
            c.push("op3");
            break;
          default:
            // Do an internal op on the first value.
            c.get(0).value = `op${n}`;
        }
        break;
      case "archive":
        switch (n) {
          case 0:
            // Hack: Store the archived value's CollabID on this Source so
            // that we can restore it later.
            // (Hack b/c careless about scope.)
            this.archivedID = c.idOf(c.get(2));
            c.archive(2);
            break;
          case 1: {
            // Mutate archived value.
            const archived = c.fromID(this.archivedID!)!;
            assert.isDefined(archived);
            archived.value += "_op1";
            break;
          }
          case 2: {
            // Restore archived value.
            const archived = c.fromID(this.archivedID!)!;
            assert.isDefined(archived);
            c.restore(archived);
            break;
          }
          default:
            c.get(2).value = `op${n}`;
        }
        break;
    }
  }
  setupOp(c: CList<CVar<string>, [string]>) {
    switch (this.mode) {
      case "op/op":
        // Create a value at 0.
        // Do it here instead of in op 0 to avoid set/set conflicts,
        // which would otherwise give us different behavior from CVar's tests.
        c.push("initial");
        break;
      case "move":
      case "archive":
        // Create some elements to do ops within.
        for (let i = 0; i < 5; i++) c.push(`s${i}`);
        break;
    }
  }
}

describe("CList", () => {
  let rng!: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  describe("traces", () => {
    let source!: ListSource;

    describe("insert/delete", () => {
      beforeEach(() => {
        source = new ListSource(rng, "insert/delete");
      });

      it("initial", () => {
        Traces.initial(source, []);
      });

      it("singleOp", () => {
        Traces.singleOp(source, [["init_op0", []]]);
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          [["init_op0", []]],
          [["op1", ["op1"]]],
          [],
          [["op3", ["op3"]]]
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          [["init_op0", []]],
          [["init_op1", []]],
          // Both added. Op 0 has lower replicaID.
          [
            ["init_op0", []],
            ["init_op1", []],
          ]
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          [["init_op0", []]],
          [["op1", ["op1"]]],
          [],
          // Delete wins over CVar operation.
          [],
          [["op3", ["op3"]]]
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          [["op3", ["op3"]]],
          [["op7", ["op7"]]],
          // The inserts in ops 3 and 4 both occur; op 3 has lower replicaID.
          [
            ["op3", ["op3"]],
            ["op7", ["op7"]],
          ]
        );
      });
    });

    describe("op/op", () => {
      beforeEach(() => {
        source = new ListSource(rng, "op/op");
      });

      it("initial", () => {
        Traces.initial(source, [["initial", []]]);
      });

      it("singleOp", () => {
        Traces.singleOp(source, [["op0", ["op0"]]]);
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          [["op0", ["op0"]]],
          [["op1", ["op1"]]],
          [["op2", ["op2"]]],
          [["op3", ["op3"]]]
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          [["op0", ["op0"]]],
          [["op1", ["op1"]]],
          // op 0 is done by the lower replicaID, which wins the conflict.
          [["op0", ["op0", "op1"]]]
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          [["op0", ["op0"]]],
          [["op1", ["op1"]]],
          [["op2", ["op2"]]],
          // op 1 is done by the lower replicaID, which wins the conflict.
          [["op1", ["op1", "op2"]]],
          [["op3", ["op3"]]]
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          [["op3", ["op3"]]],
          [["op7", ["op7"]]],
          // op 3 is done by the lower replicaID, which wins the conflict.
          [["op3", ["op3", "op7"]]]
        );
      });
    });

    describe("move", () => {
      beforeEach(() => {
        source = new ListSource(rng, "move");
      });

      it("initial", () => {
        Traces.initial(source, [
          ["s0", []],
          ["s1", []],
          ["s2", []],
          ["s3", []],
          ["s4", []],
        ]);
      });

      it("singleOp", () => {
        Traces.singleOp(source, [
          ["s2", []],
          ["s3", []],
          ["s4", []],
          ["s0", []],
          ["s1", []],
        ]);
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          [
            ["s2", []],
            ["s3", []],
            ["s4", []],
            ["s0", []],
            ["s1", []],
          ],
          [
            ["s2", []],
            ["s4", []],
            ["s3", []],
            ["s0", []],
            ["s1", []],
          ],
          [
            ["s2_op2", ["s2_op2"]],
            ["s4_op2", ["s4_op2"]],
            ["s3_op2", ["s3_op2"]],
            ["s0_op2", ["s0_op2"]],
            ["s1_op2", ["s1_op2"]],
          ],
          [
            ["s2_op2", ["s2_op2"]],
            ["s4_op2", ["s4_op2"]],
            ["s3_op2", ["s3_op2"]],
            ["s0_op2", ["s0_op2"]],
            ["op3", []],
          ]
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          [
            ["s2", []],
            ["s3", []],
            ["s4", []],
            ["s0", []],
            ["s1", []],
          ],
          [
            ["s0", []],
            ["s2", []],
            ["s1", []],
            ["s3", []],
            ["s4", []],
          ],
          // s0: op 0 has the lower senderID, so its move wins.
          // s1: No conflict, use op 0.
          [
            ["s2", []],
            ["s3", []],
            ["s4", []],
            ["s0", []],
            ["s1", []],
          ]
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          [
            ["s2", []],
            ["s3", []],
            ["s4", []],
            ["s0", []],
            ["s1", []],
          ],
          [
            ["s2", []],
            ["s4", []],
            ["s3", []],
            ["s0", []],
            ["s1", []],
          ],
          [
            ["s2_op2", ["s2_op2"]],
            ["s3_op2", ["s3_op2"]],
            ["s4_op2", ["s4_op2"]],
            ["s0_op2", ["s0_op2"]],
            ["s1_op2", ["s1_op2"]],
          ],
          // Move and internal ops both occur.
          [
            ["s2_op2", ["s2_op2"]],
            ["s4_op2", ["s4_op2"]],
            ["s3_op2", ["s3_op2"]],
            ["s0_op2", ["s0_op2"]],
            ["s1_op2", ["s1_op2"]],
          ],
          [
            ["s2_op2", ["s2_op2"]],
            ["s4_op2", ["s4_op2"]],
            ["s3_op2", ["s3_op2"]],
            ["s0_op2", ["s0_op2"]],
            ["op3", []],
          ]
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          [
            ["s2_op2", ["s2_op2"]],
            ["s4_op2", ["s4_op2"]],
            ["s3_op2", ["s3_op2"]],
            ["s0_op2", ["s0_op2"]],
            ["op3", []],
          ],
          [
            ["op7", ["op7"]],
            ["s1", []],
            ["s2", []],
            ["s3", []],
            ["s4", []],
          ],
          // The internal op from op 7 occurs in addition to the left partition.
          // It affects the element w/ s0, but loses
          // to op 2's own set.
          [
            ["s2_op2", ["s2_op2"]],
            ["s4_op2", ["s4_op2"]],
            ["s3_op2", ["s3_op2"]],
            ["s0_op2", ["s0_op2", "op7"]],
            ["op3", []],
          ]
        );
      });
    });

    describe("archive", () => {
      beforeEach(() => {
        source = new ListSource(rng, "archive");
      });

      it("initial", () => {
        Traces.initial(source, [
          ["s0", []],
          ["s1", []],
          ["s2", []],
          ["s3", []],
          ["s4", []],
        ]);
      });

      it("singleOp", () => {
        Traces.singleOp(source, [
          ["s0", []],
          ["s1", []],
          ["s3", []],
          ["s4", []],
        ]);
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          [
            ["s0", []],
            ["s1", []],
            ["s3", []],
            ["s4", []],
          ],
          // Still archived.
          [
            ["s0", []],
            ["s1", []],
            ["s3", []],
            ["s4", []],
          ],
          // Restore archived value, with internal op.
          [
            ["s0", []],
            ["s1", []],
            ["s2_op1", ["s2_op1"]],
            ["s3", []],
            ["s4", []],
          ],
          [
            ["s0", []],
            ["s1", []],
            ["op3", ["op3"]],
            ["s3", []],
            ["s4", []],
          ]
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          [
            ["s0", []],
            ["s1", []],
            ["s3", []],
            ["s4", []],
          ],
          [
            ["s0", []],
            ["s1", []],
            ["s2_op1", ["s2_op1"]],
            ["s3", []],
            ["s4", []],
          ],
          // Still archived.
          [
            ["s0", []],
            ["s1", []],
            ["s3", []],
            ["s4", []],
          ]
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          [
            ["s0", []],
            ["s1", []],
            ["s3", []],
            ["s4", []],
          ],
          // Still archived.
          [
            ["s0", []],
            ["s1", []],
            ["s3", []],
            ["s4", []],
          ],
          // Restore original value.
          [
            ["s0", []],
            ["s1", []],
            ["s2", []],
            ["s3", []],
            ["s4", []],
          ],
          // Restore and internal op both take effect.
          [
            ["s0", []],
            ["s1", []],
            ["s2_op1", ["s2_op1"]],
            ["s3", []],
            ["s4", []],
          ],
          [
            ["s0", []],
            ["s1", []],
            ["op3", ["op3"]],
            ["s3", []],
            ["s4", []],
          ]
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          [
            ["s0", []],
            ["s1", []],
            ["op3", ["op3"]],
            ["s3", []],
            ["s4", []],
          ],
          [
            ["s0", []],
            ["s1", []],
            ["op7", ["op7"]],
            ["s3", []],
            ["s4", []],
          ],
          // Op 3 wins over op 7 in the CVar.
          [
            ["s0", []],
            ["s1", []],
            ["op3", ["op3", "op7"]],
            ["s3", []],
            ["s4", []],
          ]
        );
      });
    });
  });

  describe("unit", () => {
    let runtimeGen: TestingRuntimes;
    let alice: CRuntime;
    let bob: CRuntime;
    let aliceList: CList<CVar<number>, [number]>;
    let bobList: CList<CVar<number>, [number]>;

    function values(list: CList<CVar<number>, [number]>): number[] {
      return list.slice().map((cvar) => cvar.value);
    }

    beforeEach(() => {
      runtimeGen = new TestingRuntimes();
      alice = runtimeGen.newRuntime({ rng });
      bob = runtimeGen.newRuntime({ rng });

      aliceList = alice.registerCollab(
        "list",
        (init) =>
          new CList(
            init,
            (valueInit, initialValue) => new CVar(valueInit, initialValue)
          )
      );
      bobList = bob.registerCollab(
        "list",
        (init) =>
          new CList(
            init,
            (valueInit, initialValue) => new CVar(valueInit, initialValue)
          )
      );

      new CListView(aliceList, true);
      new CListView(bobList, true);
    });

    afterEach(() => {
      EventView.check(aliceList);
      EventView.check(bobList);
    });

    describe("ordering", () => {
      // These tests are a subset of the CValueList ordering tests.
      // In theory these aren't exercising anything that CValueList didn't
      // already test, but we want to make sure CList is not using
      // CTotalOrder/LocalList incorrectly.

      it("inserts once", () => {
        const ans = [0];
        aliceList.insert(0, 0);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(values(aliceList), ans);
        assert.deepStrictEqual(values(bobList), ans);
      });

      it("inserts LtR", () => {
        const ans = [0, 1, 2, 3, 4];
        for (let i = 0; i < 5; i++) {
          aliceList.insert(i, i);
          runtimeGen.releaseAll();
        }
        assert.deepStrictEqual(values(aliceList), ans);
        assert.deepStrictEqual(values(bobList), ans);
      });

      it("inserts RtL", () => {
        const ans = [4, 3, 2, 1, 0];
        for (let i = 0; i < 5; i++) {
          aliceList.insert(0, i);
          runtimeGen.releaseAll();
        }
        assert.deepStrictEqual(values(aliceList), ans);
        assert.deepStrictEqual(values(bobList), ans);
      });

      it("inserts LtR, then in middle", () => {
        const ans = [0, 1, 10, 2, 3, 4];
        for (let i = 0; i < 5; i++) {
          aliceList.insert(i, i);
          runtimeGen.releaseAll();
        }
        aliceList.insert(2, 10);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(values(aliceList), ans);
        assert.deepStrictEqual(values(bobList), ans);
      });

      it("inserts RtL, then in middle", () => {
        const ans = [4, 3, 10, 2, 1, 0];
        for (let i = 0; i < 5; i++) {
          aliceList.insert(0, i);
          runtimeGen.releaseAll();
        }
        aliceList.insert(2, 10);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(values(aliceList), ans);
        assert.deepStrictEqual(values(bobList), ans);
      });

      it("deletes one element", () => {
        const ans = [0, 1, 3, 4];
        for (let i = 0; i < 5; i++) {
          aliceList.insert(i, i);
          runtimeGen.releaseAll();
        }
        aliceList.delete(2);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(values(aliceList), ans);
        assert.deepStrictEqual(values(bobList), ans);
      });

      describe("inserts sequentially", () => {
        it("LtR", () => {
          const ans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          for (let i = 0; i < 5; i++) {
            aliceList.insert(i, i);
            runtimeGen.releaseAll();
          }
          for (let i = 5; i < 10; i++) {
            bobList.insert(i, i);
            runtimeGen.releaseAll();
          }
          assert.deepStrictEqual(values(aliceList), ans);
          assert.deepStrictEqual(values(bobList), ans);
        });

        it("RtL", () => {
          const ans = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
          for (let i = 0; i < 5; i++) {
            aliceList.insert(0, i);
            runtimeGen.releaseAll();
          }
          for (let i = 5; i < 10; i++) {
            bobList.insert(0, i);
            runtimeGen.releaseAll();
          }
          assert.deepStrictEqual(values(aliceList), ans);
          assert.deepStrictEqual(values(bobList), ans);
        });

        it("alternating", () => {
          const ans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          for (let i = 0; i < 5; i++) {
            aliceList.insert(2 * i, 2 * i);
            runtimeGen.releaseAll();
            bobList.insert(2 * i + 1, 2 * i + 1);
            runtimeGen.releaseAll();
          }
          assert.deepStrictEqual(values(aliceList), ans);
          assert.deepStrictEqual(values(bobList), ans);
        });
      });
    });

    describe("archive", () => {
      beforeEach(() => {
        for (let i = 0; i < 5; i++) aliceList.push(i);
        runtimeGen.releaseAll();
      });

      it("restore wins", () => {
        function go(
          charlieList: CList<CVar<number>, [number]>,
          daveList: CList<CVar<number>, [number]>
        ) {
          const charlie2 = charlieList.get(2);
          const dave2 = daveList.get(2);

          charlieList.archive(2);
          runtimeGen.releaseAll();

          // Concurrent non-redundant archive & restore.
          charlieList.restore(charlie2);
          charlieList.archive(2);
          daveList.restore(dave2);
          runtimeGen.releaseAll();

          const ans = [0, 1, 2, 3, 4];
          assert.deepStrictEqual(values(charlieList), ans);
          assert.deepStrictEqual(values(daveList), ans);
        }

        // Try in both orders, to ensure it's not a lucky
        // senderID tiebreaker.
        go(aliceList, bobList);
        go(bobList, aliceList);
      });

      it("redundant restore wins", () => {
        function go(
          charlieList: CList<CVar<number>, [number]>,
          daveList: CList<CVar<number>, [number]>
        ) {
          charlieList.archive(2);
          daveList.restore(daveList.get(2));
          runtimeGen.releaseAll();

          const ans = [0, 1, 2, 3, 4];
          assert.deepStrictEqual(values(charlieList), ans);
          assert.deepStrictEqual(values(daveList), ans);
        }

        // Try in both orders, to ensure it's not a lucky
        // senderID tiebreaker.
        go(aliceList, bobList);
        go(bobList, aliceList);
      });

      it("move vs archive", () => {
        const bobValue = bobList.get(2);

        aliceList.archive(2);
        bobList.move(2, 5);
        runtimeGen.releaseAll();

        bobList.restore(bobValue);
        runtimeGen.releaseAll();

        // Should be restored in the moved position.
        const ans = [0, 1, 3, 4, 2];
        assert.deepStrictEqual(values(aliceList), ans);
        assert.deepStrictEqual(values(bobList), ans);
      });

      it("bulk archive", () => {
        aliceList.archive(1, 3);
        runtimeGen.releaseAll();

        const ans = [0, 4];
        assert.deepStrictEqual(values(aliceList), ans);
        assert.deepStrictEqual(values(bobList), ans);
      });
    });

    it("bulk delete", () => {
      for (let i = 0; i < 5; i++) aliceList.push(i);
      runtimeGen.releaseAll();

      aliceList.delete(1, 3);
      runtimeGen.releaseAll();

      const ans = [0, 4];
      assert.deepStrictEqual(values(aliceList), ans);
      assert.deepStrictEqual(values(bobList), ans);
    });
  });
});
