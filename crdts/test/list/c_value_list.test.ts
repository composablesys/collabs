import { InitToken, ReplicaIDs } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CRuntime, CValueList, TestingRuntimes } from "../../src";
import { EventView } from "../event_view";
import { Source, Traces } from "../traces";
import { IListView } from "./views";

class ValueListSource implements Source<CValueList<string>, string[]> {
  constructor(
    readonly rng: seedrandom.prng,
    readonly mode: "push" | "unshift LtR" | "unshift RtL" | "insert"
  ) {}

  pre(init: InitToken) {
    const list = new CValueList<string>(init);
    new IListView(list, false);
    return list;
  }
  check(actual: CValueList<string>, expected: string[]): void {
    assert.deepStrictEqual([...actual], expected);
    assert.strictEqual(actual.length, expected.length);
    for (let i = 0; i < actual.length; i++) {
      assert.strictEqual(actual.get(i), expected[i]);
    }
    EventView.check(actual);
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

  describe("unit", () => {
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

      new IListView(aliceList, true);
      new IListView(bobList, true);
    });

    it("inserts once", () => {
      const ans = [0];
      aliceList.insert(0, 0);
      runtimeGen.releaseAll();
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);

      checkPositions(alice, aliceList);
    });

    it("inserts LtR", () => {
      const ans = [0, 1, 2, 3, 4];
      for (let i = 0; i < 5; i++) {
        aliceList.insert(i, i);
        runtimeGen.releaseAll();
      }
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);

      checkPositions(alice, aliceList);
    });

    it("inserts RtL", () => {
      const ans = [4, 3, 2, 1, 0];
      for (let i = 0; i < 5; i++) {
        aliceList.insert(0, i);
        runtimeGen.releaseAll();
      }
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);

      checkPositions(alice, aliceList);
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

      checkPositions(alice, aliceList);
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

      checkPositions(alice, aliceList);
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

      checkPositions(alice, aliceList);
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

        checkPositions(alice, aliceList);
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

        checkPositions(alice, aliceList);
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

        checkPositions(alice, aliceList);
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

        checkPositions(alice, aliceList);
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

        checkPositions(alice, aliceList);
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

        checkPositions(alice, aliceList);
      });

      it("at other node going right", () => {
        const charlie = runtimeGen.newRuntime(rng);
        const charlieList = charlie.registerCollab(
          "list",
          (init) => new CValueList<number>(init)
        );
        new IListView(charlieList, true);

        charlieList.insert(0, 0);
        runtimeGen.releaseAll();

        aliceList.insert(1, 1);
        bobList.insert(1, 2);
        runtimeGen.releaseAll();

        const ans = aliceList.get(1) === 1 ? [0, 1, 2] : [0, 2, 1];
        assert.deepStrictEqual(aliceList.slice(), ans);
        assert.deepStrictEqual(bobList.slice(), ans);
        assert.deepStrictEqual(charlieList.slice(), ans);

        checkPositions(alice, aliceList);
      });

      it("at other node going left", () => {
        const charlie = runtimeGen.newRuntime(rng);
        const charlieList = charlie.registerCollab(
          "list",
          (init) => new CValueList<number>(init)
        );
        new IListView(charlieList, true);

        charlieList.insert(0, 0);
        runtimeGen.releaseAll();

        aliceList.insert(0, 1);
        bobList.insert(0, 2);
        runtimeGen.releaseAll();

        const ans = aliceList.get(1) === 1 ? [2, 1, 0] : [1, 2, 0];
        assert.deepStrictEqual(aliceList.slice(), ans);
        assert.deepStrictEqual(bobList.slice(), ans);
        assert.deepStrictEqual(charlieList.slice(), ans);

        checkPositions(alice, aliceList);
      });
    });
  });

  describe("fuzz", () => {
    let runtimeGen!: TestingRuntimes;
    let runtimes!: CRuntime[];
    let lists!: CValueList<number>[];

    function doBeforeEach(numUsers: number) {
      beforeEach(() => {
        runtimeGen = new TestingRuntimes();
        runtimes = [];
        lists = [];
        for (let i = 0; i < numUsers; i++) {
          const runtime = runtimeGen.newRuntime(rng);
          runtimes.push(runtime);
          const list = runtime.registerCollab(
            "list",
            (init) => new CValueList<number>(init)
          );
          lists.push(list);
          new IListView(list, false);
        }
      });
    }

    describe("sequential", () => {
      for (const numUsers of [1, 10]) {
        describe(`${numUsers} users`, () => {
          doBeforeEach(numUsers);

          it("random", () => {
            // Insert at random indices. Sequentially but split across users.
            const ans: number[] = [];
            for (let i = 0; i < 100; i++) {
              const list = lists[Math.floor(rng() * lists.length)];
              const index = Math.floor(rng() * (list.length + 1));
              const value = rng();
              ans.splice(index, 0, value);
              list.insert(index, value);
              runtimeGen.releaseAll();
            }

            for (const list of lists) {
              assert.deepStrictEqual(list.slice(), ans);
              EventView.check(list);
            }

            checkPositions(runtimes[0], lists[0]);
          });

          it("random LtR runs", () => {
            // Insert short LtR runs at random indices.
            const ans: number[] = [];
            for (let i = 0; i < 20; i++) {
              const list = lists[Math.floor(rng() * lists.length)];
              const index = Math.floor(rng() * (list.length + 1));
              const values = new Array(5).fill(0).map(() => rng());
              ans.splice(index, 0, ...values);
              for (let j = 0; j < 5; j++) {
                list.insert(index + j, values[j]);
              }
              runtimeGen.releaseAll();
            }

            for (const list of lists) {
              assert.deepStrictEqual(list.slice(), ans);
              EventView.check(list);
            }

            checkPositions(runtimes[0], lists[0]);
          });

          it("random RtL runs", () => {
            // Insert short RtL runs at random indices.
            const ans: number[] = [];
            for (let i = 0; i < 20; i++) {
              const list = lists[Math.floor(rng() * lists.length)];
              const index = Math.floor(rng() * (list.length + 1));
              const values = new Array(5).fill(0).map(() => rng());
              ans.splice(index, 0, ...values);
              for (let j = 0; j < 5; j++) {
                list.insert(index, values[4 - j]);
              }
              runtimeGen.releaseAll();
            }

            for (const list of lists) {
              assert.deepStrictEqual(list.slice(), ans);
              EventView.check(list);
            }

            checkPositions(runtimes[0], lists[0]);
          });

          it("random LtR bulk", () => {
            // Insert short LtR runs at random indices.
            // This time, use same insert call.
            const ans: number[] = [];
            for (let i = 0; i < 20; i++) {
              const list = lists[Math.floor(rng() * lists.length)];
              const index = Math.floor(rng() * (list.length + 1));
              const values = new Array(5).fill(0).map(() => rng());
              ans.splice(index, 0, ...values);
              list.insert(index, ...values);
              runtimeGen.releaseAll();
            }

            for (const list of lists) {
              assert.deepStrictEqual(list.slice(), ans);
              EventView.check(list);
            }

            checkPositions(runtimes[0], lists[0]);
          });

          it("biased", () => {
            // Bias towards large indices exponentially.
            const ans: number[] = [];
            for (let i = 0; i < 100; i++) {
              const list = lists[Math.floor(rng() * lists.length)];
              const biased = Math.log2(1 + rng() * 31) / 5;
              const index = Math.floor(biased * (list.length + 1));
              const value = rng();
              ans.splice(index, 0, value);
              list.insert(index, value);
              runtimeGen.releaseAll();
            }

            for (const list of lists) {
              assert.deepStrictEqual(list.slice(), ans);
              EventView.check(list);
            }

            checkPositions(runtimes[0], lists[0]);
          });
        });
      }
    });
  });

  /**
   * Checks position-related queries (getByPosition, hasPosition, indexOfPosition)
   * for positions in list.
   *
   * Assumes that list is the only Collab in runtime and it has name "list".
   */
  function checkPositions(runtime: CRuntime, list: CValueList<any>) {
    // Check that present positions have the correct value, presence, and index.
    for (let i = 0; i < list.length; i++) {
      const pos = list.getPosition(i);
      assert.strictEqual(list.getByPosition(pos), list.get(i));
      assert(list.hasPosition(pos));
      assert.strictEqual(list.indexOfPosition(pos), i);
    }

    // In a copy of the list, delete the middle half of positions and
    // check that they have the correct value (undefined), presence, and index.
    const copyRuntime = new CRuntime({
      debugReplicaID: ReplicaIDs.pseudoRandom(rng),
      autoTransactions: "op",
    });
    const copy = copyRuntime.registerCollab(
      "list",
      (init) => new CValueList(init)
    );
    copyRuntime.load(runtime.save());

    const start = Math.floor((list.length * 1) / 4);
    const end = Math.floor((list.length * 3) / 4);
    const deleted = [...list.positions()].slice(start, end);
    copy.delete(start, end - start);

    for (let i = 0; i < deleted.length; i++) {
      const pos = deleted[i];
      assert.strictEqual(copy.getByPosition(pos), undefined);
      assert.isFalse(copy.hasPosition(pos));
      assert.strictEqual(copy.indexOfPosition(pos), -1);
      assert.strictEqual(copy.indexOfPosition(pos, "none"), -1);
      assert.strictEqual(copy.indexOfPosition(pos, "left"), start - 1);
      assert.strictEqual(copy.indexOfPosition(pos, "right"), start);
    }
  }

  describe("iterator fail fast", () => {
    let aliceList!: CValueList<number>;

    beforeEach(() => {
      const alice = new CRuntime({
        debugReplicaID: ReplicaIDs.pseudoRandom(rng),
      });
      aliceList = alice.registerCollab("list", (init) => new CValueList(init));

      // Don't register an EventView: it creates simultaneous iterators,
      // which cause false negatives.
    });

    it("delete", () => {
      for (let iterI = 0; iterI < 5; iterI++) {
        // deleteI = 4 is a false negative, since it stops the iterator.
        for (let deleteI = 0; deleteI < 4; deleteI++) {
          aliceList.clear();
          aliceList.insert(0, ...new Array(5).fill(17));
          assert.throws(
            () => {
              for (const entry of aliceList.entries()) {
                if (entry[0] === iterI) aliceList.delete(deleteI);
              }
            },
            undefined,
            undefined,
            `iterI: ${iterI}, deleteI: ${deleteI}`
          );

          // Okay to start a new iterator afterwards.
          assert.doesNotThrow(() => [...aliceList.entries()]);
        }
      }
    });

    it("insert", () => {
      for (let iterI = 0; iterI < 5; iterI++) {
        for (let insertI = 0; insertI < 5; insertI++) {
          aliceList.clear();
          aliceList.insert(0, ...new Array(5).fill(17));
          assert.throws(
            () => {
              for (const entry of aliceList.entries()) {
                if (entry[0] === iterI) aliceList.insert(insertI, 18);
              }
            },
            undefined,
            undefined,
            `iterI: ${iterI}, insertI: ${insertI}`
          );

          // Okay to start a new iterator afterwards.
          assert.doesNotThrow(() => [...aliceList.entries()]);
        }
      }
    });
  });
});
