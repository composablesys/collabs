import { InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CRuntime, CValueList, TestingRuntimes } from "../../src";
import { Source, Traces } from "../traces";

class ValueListSource implements Source<CValueList<string>, string[]> {
  constructor(
    readonly rng: seedrandom.prng,
    readonly mode: "push" | "unshift LtR" | "unshift RtL" | "insert"
  ) {}

  pre(init: InitToken) {
    return new CValueList<string>(init);
  }
  check(actual: CValueList<string>, expected: string[]): void {
    assert.deepStrictEqual([...actual], expected);
    assert.strictEqual(actual.length, expected.length);
    for (let i = 0; i < actual.length; i++) {
      assert.strictEqual(actual.get(i), expected[i]);
    }
  }
  op(c: CValueList<string>, n: number): void {
    switch (this.mode) {
      case "push":
        c.push(`${n}_0`, `${n}_1`, `${n}_2`, `${n}_3`);
        break;
      case "unshift LtR":
        // Do LtR insertions within each op, to test itemization.
        c.unshift(`${n}_0`, `${n}_1`, `${n}_2`, `${n}_3`);
        break;
      case "unshift RtL":
        // Same sequences as unshift LtR, but inserted RtL.
        // In all of the traces tested, this gives the same answers.
        for (let i = 3; i >= 0; i--) {
          c.unshift(`${n}_${i}`);
        }
        break;
      case "insert":
        // Insert in the middle.
        c.insert(
          Math.floor(c.length / 2),
          `${n}_0`,
          `${n}_1`,
          `${n}_2`,
          `${n}_3`
        );
        break;
    }
    // Always delete the middle element. We hope to break up
    // waypoints with mixed up values & deletions.
    c.delete(Math.floor(c.length / 2));
  }
}

describe("CValueList", () => {
  let rng!: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  describe("traces", () => {
    let source!: ValueListSource;

    describe("push", () => {
      beforeEach(() => {
        source = new ValueListSource(rng, "push");
      });

      it("initial", () => {
        Traces.initial(source, []);
      });

      it("singleOp", () => {
        Traces.singleOp(source, ["0_0", "0_1", "0_3"]);
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          ["0_0", "0_1", "0_3"],
          ["0_0", "0_1", "0_3", "1_1", "1_2", "1_3"],
          ["0_0", "0_1", "0_3", "1_1", "1_2", "2_0", "2_1", "2_2", "2_3"],
          [
            "0_0",
            "0_1",
            "0_3",
            "1_1",
            "1_2",
            "2_0",
            "2_2",
            "2_3",
            "3_0",
            "3_1",
            "3_2",
            "3_3",
          ]
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          ["0_0", "0_1", "0_3"],
          ["1_0", "1_1", "1_3"],
          // Op 0 has lesser sender than op 1, so its waypoint is sorted first.
          ["0_0", "0_1", "0_3", "1_0", "1_1", "1_3"]
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          ["0_0", "0_1", "0_3"],
          ["0_0", "0_1", "0_3", "1_1", "1_2", "1_3"],
          ["0_0", "0_1", "0_3", "2_1", "2_2", "2_3"],
          // Op 1 has lesser sender than op 2, so its waypoint is sorted first.
          ["0_0", "0_1", "0_3", "1_1", "1_2", "1_3", "2_1", "2_2", "2_3"],
          [
            "0_0",
            "0_1",
            "0_3",
            "1_1",
            "1_2",
            "1_3",
            "2_2",
            "2_3",
            "3_0",
            "3_1",
            "3_2",
            "3_3",
          ]
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          [
            "0_0",
            "0_1",
            "0_3",
            "1_1",
            "1_2",
            "2_0",
            "2_2",
            "2_3",
            "3_0",
            "3_1",
            "3_2",
            "3_3",
          ],
          [
            "4_0",
            "4_1",
            "4_3",
            "5_1",
            "5_2",
            "6_0",
            "6_2",
            "6_3",
            "7_0",
            "7_1",
            "7_2",
            "7_3",
          ],
          // Op 0 has lesser sender than op 4, so its waypoint is sorted first.
          // The rest in each partition are "attached" and don't interleave.
          [
            "0_0",
            "0_1",
            "0_3",
            "1_1",
            "1_2",
            "2_0",
            "2_2",
            "2_3",
            "3_0",
            "3_1",
            "3_2",
            "3_3",
            "4_0",
            "4_1",
            "4_3",
            "5_1",
            "5_2",
            "6_0",
            "6_2",
            "6_3",
            "7_0",
            "7_1",
            "7_2",
            "7_3",
          ]
        );
      });
    });

    for (const unshiftMode of <("unshift LtR" | "unshift RtL")[]>[
      "unshift LtR",
      "unshift RtL",
    ]) {
      describe(unshiftMode, () => {
        beforeEach(() => {
          source = new ValueListSource(rng, unshiftMode);
        });

        it("initial", () => {
          Traces.initial(source, []);
        });

        it("singleOp", () => {
          Traces.singleOp(source, ["0_0", "0_1", "0_3"]);
        });

        it("sequential", () => {
          Traces.sequential(
            source,
            ["0_0", "0_1", "0_3"],
            ["1_0", "1_1", "1_2", "0_0", "0_1", "0_3"],
            ["2_0", "2_1", "2_2", "2_3", "1_0", "1_2", "0_0", "0_1", "0_3"],
            [
              "3_0",
              "3_1",
              "3_2",
              "3_3",
              "2_0",
              "2_1",
              "2_3",
              "1_0",
              "1_2",
              "0_0",
              "0_1",
              "0_3",
            ]
          );
        });

        it("concurrent", () => {
          Traces.concurrent(
            source,
            ["0_0", "0_1", "0_3"],
            ["1_0", "1_1", "1_3"],
            // Op 0 has lesser sender than op 1, so its waypoint is sorted first.
            ["0_0", "0_1", "0_3", "1_0", "1_1", "1_3"]
          );
        });

        it("diamond", () => {
          Traces.diamond(
            source,
            ["0_0", "0_1", "0_3"],
            ["1_0", "1_1", "1_2", "0_0", "0_1", "0_3"],
            ["2_0", "2_1", "2_2", "0_0", "0_1", "0_3"],
            // Op 1 has lesser sender than op 2, so its waypoint is sorted first.
            ["1_0", "1_1", "1_2", "2_0", "2_1", "2_2", "0_0", "0_1", "0_3"],
            [
              "3_0",
              "3_1",
              "3_2",
              "3_3",
              "1_0",
              "1_1",
              "2_0",
              "2_1",
              "2_2",
              "0_0",
              "0_1",
              "0_3",
            ]
          );
        });

        it("partition", () => {
          Traces.partition(
            source,
            [
              "3_0",
              "3_1",
              "3_2",
              "3_3",
              "2_0",
              "2_1",
              "2_3",
              "1_0",
              "1_2",
              "0_0",
              "0_1",
              "0_3",
            ],
            [
              "7_0",
              "7_1",
              "7_2",
              "7_3",
              "6_0",
              "6_1",
              "6_3",
              "5_0",
              "5_2",
              "4_0",
              "4_1",
              "4_3",
            ],
            // Op 0 has lesser sender than op 4, so its waypoint is sorted first.
            // The rest in each partition are "attached" and don't interleave.
            [
              "3_0",
              "3_1",
              "3_2",
              "3_3",
              "2_0",
              "2_1",
              "2_3",
              "1_0",
              "1_2",
              "0_0",
              "0_1",
              "0_3",
              "7_0",
              "7_1",
              "7_2",
              "7_3",
              "6_0",
              "6_1",
              "6_3",
              "5_0",
              "5_2",
              "4_0",
              "4_1",
              "4_3",
            ]
          );
        });
      });
    }

    describe("insert", () => {
      beforeEach(() => {
        source = new ValueListSource(rng, "insert");
      });

      it("initial", () => {
        Traces.initial(source, []);
      });

      it("singleOp", () => {
        Traces.singleOp(source, ["0_0", "0_1", "0_3"]);
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          ["0_0", "0_1", "0_3"],
          ["0_0", "1_0", "1_1", "1_3", "0_1", "0_3"],
          ["0_0", "1_0", "1_1", "2_0", "2_1", "2_3", "1_3", "0_1", "0_3"],
          [
            "0_0",
            "1_0",
            "1_1",
            "2_0",
            "3_0",
            "3_1",
            "3_3",
            "2_1",
            "2_3",
            "1_3",
            "0_1",
            "0_3",
          ]
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          ["0_0", "0_1", "0_3"],
          ["1_0", "1_1", "1_3"],
          // Op 0 has lesser sender than op 1, so its waypoint is sorted first.
          ["0_0", "0_1", "0_3", "1_0", "1_1", "1_3"]
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          ["0_0", "0_1", "0_3"],
          ["0_0", "1_0", "1_1", "1_3", "0_1", "0_3"],
          ["0_0", "2_0", "2_1", "2_3", "0_1", "0_3"],
          // Op 1 has lesser sender than op 2, so its waypoint is sorted first.
          ["0_0", "1_0", "1_1", "1_3", "2_0", "2_1", "2_3", "0_1", "0_3"],
          [
            "0_0",
            "1_0",
            "1_1",
            "1_3",
            "3_0",
            "3_1",
            "3_3",
            "2_0",
            "2_1",
            "2_3",
            "0_1",
            "0_3",
          ]
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          [
            "0_0",
            "1_0",
            "1_1",
            "2_0",
            "3_0",
            "3_1",
            "3_3",
            "2_1",
            "2_3",
            "1_3",
            "0_1",
            "0_3",
          ],
          [
            "4_0",
            "5_0",
            "5_1",
            "6_0",
            "7_0",
            "7_1",
            "7_3",
            "6_1",
            "6_3",
            "5_3",
            "4_1",
            "4_3",
          ],
          // Op 0 has lesser sender than op 4, so its waypoint is sorted first.
          // The rest in each partition are "attached" and don't interleave.
          [
            "0_0",
            "1_0",
            "1_1",
            "2_0",
            "3_0",
            "3_1",
            "3_3",
            "2_1",
            "2_3",
            "1_3",
            "0_1",
            "0_3",
            "4_0",
            "5_0",
            "5_1",
            "6_0",
            "7_0",
            "7_1",
            "7_3",
            "6_1",
            "6_3",
            "5_3",
            "4_1",
            "4_3",
          ]
        );
      });
    });
  });

  describe("ordering", () => {
    let runtimeGen: TestingRuntimes;
    let alice: CRuntime;
    let bob: CRuntime;
    let aliceList: CValueList<number>;
    let bobList: CValueList<number>;

    beforeEach(() => {
      runtimeGen = new TestingRuntimes();
      alice = runtimeGen.newRuntime(rng);
      bob = runtimeGen.newRuntime(rng);

      aliceList = alice.registerCollab("list", (init) => new CValueList(init));
      bobList = bob.registerCollab("list", (init) => new CValueList(init));
    });

    it("inserts once", () => {
      const ans = [0];
      aliceList.insert(0, 0);
      runtimeGen.releaseAll();
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
    });

    it("inserts LtR", () => {
      const ans = [0, 1, 2, 3, 4];
      for (let i = 0; i < 5; i++) {
        aliceList.insert(i, i);
        runtimeGen.releaseAll();
      }
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
    });

    it("inserts RtL", () => {
      const ans = [4, 3, 2, 1, 0];
      for (let i = 0; i < 5; i++) {
        aliceList.insert(0, i);
        runtimeGen.releaseAll();
      }
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
    });

    it("inserts LtR, then in middle", () => {
      const ans = [0, 1, 10, 2, 3, 4];
      for (let i = 0; i < 5; i++) {
        aliceList.insert(i, i);
        runtimeGen.releaseAll();
      }
      aliceList.insert(2, 10);
      runtimeGen.releaseAll();
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
    });

    it("inserts RtL, then in middle", () => {
      const ans = [4, 3, 10, 2, 1, 0];
      for (let i = 0; i < 5; i++) {
        aliceList.insert(0, i);
        runtimeGen.releaseAll();
      }
      aliceList.insert(2, 10);
      runtimeGen.releaseAll();
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
    });

    it("deletes one element", () => {
      const ans = [0, 1, 3, 4];
      for (let i = 0; i < 5; i++) {
        aliceList.insert(i, i);
        runtimeGen.releaseAll();
      }
      aliceList.delete(2);
      runtimeGen.releaseAll();
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
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
        assert.deepStrictEqual(aliceList.slice(), ans);
        assert.deepStrictEqual(bobList.slice(), ans);
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
        assert.deepStrictEqual(aliceList.slice(), ans);
        assert.deepStrictEqual(bobList.slice(), ans);
      });

      it("alternating", () => {
        const ans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 5; i++) {
          aliceList.insert(2 * i, 2 * i);
          runtimeGen.releaseAll();
          bobList.insert(2 * i + 1, 2 * i + 1);
          runtimeGen.releaseAll();
        }
        assert.deepStrictEqual(aliceList.slice(), ans);
        assert.deepStrictEqual(bobList.slice(), ans);
      });
    });

    describe("inserts concurrently", () => {
      it("at root", () => {
        aliceList.insert(0, 1);
        bobList.insert(0, 2);
        runtimeGen.releaseAll();

        assert.deepStrictEqual(aliceList.slice(), bobList.slice());
        const ans = aliceList.slice();
        if (ans[0] === 1) {
          assert.deepStrictEqual(ans, [1, 2]);
        } else {
          assert.deepStrictEqual(ans, [2, 1]);
        }
      });

      it("at alice node going right", () => {
        aliceList.insert(0, 0);
        runtimeGen.releaseAll();

        aliceList.insert(1, 1);
        bobList.insert(1, 2);
        runtimeGen.releaseAll();

        const ans = aliceList.get(1) === 1 ? [0, 1, 2] : [0, 2, 1];
        assert.deepStrictEqual(aliceList.slice(), ans);
        assert.deepStrictEqual(bobList.slice(), ans);
      });

      it("at alice node going left", () => {
        aliceList.insert(0, 0);
        runtimeGen.releaseAll();

        aliceList.insert(0, 1);
        bobList.insert(0, 2);
        runtimeGen.releaseAll();

        const ans = aliceList.get(1) === 1 ? [2, 1, 0] : [1, 2, 0];
        assert.deepStrictEqual(aliceList.slice(), ans);
        assert.deepStrictEqual(bobList.slice(), ans);
      });

      it("at other node going right", () => {
        const charlie = runtimeGen.newRuntime(rng);
        const charlieList = charlie.registerCollab(
          "list",
          (init) => new CValueList<number>(init)
        );

        charlieList.insert(0, 0);
        runtimeGen.releaseAll();

        aliceList.insert(1, 1);
        bobList.insert(1, 2);
        runtimeGen.releaseAll();

        const ans = aliceList.get(1) === 1 ? [0, 1, 2] : [0, 2, 1];
        assert.deepStrictEqual(aliceList.slice(), ans);
        assert.deepStrictEqual(bobList.slice(), ans);
        assert.deepStrictEqual(charlieList.slice(), ans);
      });

      it("at other node going left", () => {
        const charlie = runtimeGen.newRuntime(rng);
        const charlieList = charlie.registerCollab(
          "list",
          (init) => new CValueList<number>(init)
        );

        charlieList.insert(0, 0);
        runtimeGen.releaseAll();

        aliceList.insert(0, 1);
        bobList.insert(0, 2);
        runtimeGen.releaseAll();

        const ans = aliceList.get(1) === 1 ? [2, 1, 0] : [1, 2, 0];
        assert.deepStrictEqual(aliceList.slice(), ans);
        assert.deepStrictEqual(bobList.slice(), ans);
        assert.deepStrictEqual(charlieList.slice(), ans);
      });
    });
  });
});
