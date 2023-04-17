import { InitToken } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CRichText, CRuntime, CValueList, TestingRuntimes } from "../../src";
import { EventView } from "../event_view";
import { Source, Traces } from "../traces";
import { CRichTextView, IListView } from "./views";

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

describe("CRichText", () => {
  let rng!: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  describe.skip("traces", () => {
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
    interface Format {
      // Technically these should be "true" instead of "boolean", since
      // we use not-present instead of false, but it makes
      // the type inference more annoying.
      bold: boolean;
      italic: boolean;
      link: string;
    }
    const url = "https://collabs.readthedocs.io/en/latest/";
    const url2 = "https://github.com/composablesys/collabs";

    let runtimeGen: TestingRuntimes;
    let alice: CRuntime;
    let bob: CRuntime;
    // The types below also work out if you omit Format (use the
    // default Record<string, any>) - an API "test".
    let aliceText: CRichText<Format>;
    let bobText: CRichText<Format>;

    beforeEach(() => {
      runtimeGen = new TestingRuntimes();
      alice = runtimeGen.newRuntime(rng);
      bob = runtimeGen.newRuntime(rng);

      aliceText = alice.registerCollab(
        "richText",
        (init) => new CRichText(init, { noGrowAtEnd: ["link"] })
      );
      bobText = bob.registerCollab(
        "richText",
        (init) => new CRichText(init, { noGrowAtEnd: ["link"] })
      );

      new CRichTextView(aliceText, true);
      new CRichTextView(bobText, true);
    });

    it("inserts plain", () => {
      const text = "one two three";
      aliceText.insert(0, text, {});
      runtimeGen.releaseAll();
      const ans = [{ index: 0, values: text, format: {} }];
      assert.deepStrictEqual(aliceText.formatted(), ans);
      assert.deepStrictEqual(bobText.formatted(), ans);
    });

    describe("formats once", () => {
      const text = "one two three";
      beforeEach(() => {
        aliceText.insert(0, text, {});
        runtimeGen.releaseAll();
      });

      it("middle", () => {
        aliceText.format(4, 8, "bold", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: {} },
          { index: 4, values: "two ", format: { bold: true } },
          { index: 8, values: "three", format: {} },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("start", () => {
        aliceText.format(0, 4, "bold", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { bold: true } },
          { index: 4, values: "two three", format: {} },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("end", () => {
        aliceText.format(8, 13, "bold", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one two ", format: {} },
          { index: 8, values: "three", format: { bold: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("whole", () => {
        aliceText.format(0, 13, "bold", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one two three", format: { bold: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });
    });

    describe("formats and inserts concurrently", () => {
      const text = "one two three";
      beforeEach(() => {
        aliceText.insert(0, text, {});
        runtimeGen.releaseAll();
      });

      // In each test, concurrent to format, insert at the beginning, middle,
      // and end of the span. Only middle and end should be affected.

      it("middle", () => {
        aliceText.format(4, 8, "bold", true);
        bobText.insert(8, "end", {});
        bobText.insert(6, "mid", {});
        bobText.insert(4, "beg", {});
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one beg", format: {} },
          { index: 7, values: "twmido end", format: { bold: true } },
          { index: 17, values: "three", format: {} },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("start", () => {
        aliceText.format(0, 4, "bold", true);
        bobText.insert(4, "end", {});
        bobText.insert(2, "mid", {});
        bobText.insert(0, "beg", {});
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "beg", format: {} },
          { index: 3, values: "onmide end", format: { bold: true } },
          { index: 13, values: "two three", format: {} },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("end", () => {
        aliceText.format(8, 13, "bold", true);
        bobText.insert(13, "end", {});
        bobText.insert(10, "mid", {});
        bobText.insert(8, "beg", {});
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one two beg", format: {} },
          { index: 11, values: "thmidreeend", format: { bold: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("whole", () => {
        aliceText.format(0, 13, "bold", true);
        bobText.insert(13, "end", {});
        bobText.insert(4, "mid", {});
        bobText.insert(0, "beg", {});
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "beg", format: {} },
          { index: 3, values: "one midtwo threeend", format: { bold: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      describe("link (no grow)", () => {
        // In each test, concurrent to format, insert at the beginning, middle,
        // and end of the span. Only middle should be affected.

        it("middle", () => {
          aliceText.format(4, 8, "link", url);
          bobText.insert(8, "end", {});
          bobText.insert(6, "mid", {});
          bobText.insert(4, "beg", {});
          runtimeGen.releaseAll();
          const ans = [
            { index: 0, values: "one beg", format: {} },
            { index: 7, values: "twmido ", format: { link: url } },
            { index: 14, values: "endthree", format: {} },
          ];
          assert.deepStrictEqual(aliceText.formatted(), ans);
          assert.deepStrictEqual(bobText.formatted(), ans);
        });

        it("start", () => {
          aliceText.format(0, 4, "link", url);
          bobText.insert(4, "end", {});
          bobText.insert(2, "mid", {});
          bobText.insert(0, "beg", {});
          runtimeGen.releaseAll();
          const ans = [
            { index: 0, values: "beg", format: {} },
            { index: 3, values: "onmide ", format: { link: url } },
            { index: 10, values: "endtwo three", format: {} },
          ];
          assert.deepStrictEqual(aliceText.formatted(), ans);
          assert.deepStrictEqual(bobText.formatted(), ans);
        });

        it("end", () => {
          aliceText.format(8, 13, "link", url);
          bobText.insert(13, "end", {});
          bobText.insert(10, "mid", {});
          bobText.insert(8, "beg", {});
          runtimeGen.releaseAll();
          const ans = [
            { index: 0, values: "one two beg", format: {} },
            { index: 11, values: "thmidree", format: { link: url } },
            { index: 19, values: "end", format: {} },
          ];
          assert.deepStrictEqual(aliceText.formatted(), ans);
          assert.deepStrictEqual(bobText.formatted(), ans);
        });

        it("whole", () => {
          aliceText.format(0, 13, "link", url);
          bobText.insert(13, "end", {});
          bobText.insert(4, "mid", {});
          bobText.insert(0, "beg", {});
          runtimeGen.releaseAll();
          const ans = [
            { index: 0, values: "beg", format: {} },
            { index: 3, values: "one midtwo three", format: { link: url } },
            { index: 19, values: "end", format: {} },
          ];
          assert.deepStrictEqual(aliceText.formatted(), ans);
          assert.deepStrictEqual(bobText.formatted(), ans);
        });
      });
    });

    describe("formats multiple", () => {
      const text = "one two three";
      beforeEach(() => {
        aliceText.insert(0, text, {});
        runtimeGen.releaseAll();
      });

      it("bold/bold neighboring merge", () => {
        aliceText.format(0, 4, "bold", true);
        bobText.format(4, 8, "bold", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one two ", format: { bold: true } },
          { index: 8, values: "three", format: {} },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("bold/bold overlapping merge", () => {
        aliceText.format(0, 8, "bold", true);
        bobText.format(4, 13, "bold", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one two three", format: { bold: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link/link neighboring merge", () => {
        aliceText.format(0, 4, "link", url);
        bobText.format(4, 8, "link", url);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one two ", format: { link: url } },
          { index: 8, values: "three", format: {} },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link/link overlapping merge", () => {
        aliceText.format(0, 8, "link", url);
        bobText.format(4, 13, "link", url);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one two three", format: { link: url } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link/link LWW", () => {
        // alice has the higher Lamport timestamp because she already did
        // an insert operation.
        aliceText.format(0, 4, "link", url);
        bobText.format(0, 4, "link", url2);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { link: url } },
          { index: 4, values: "two three", format: {} },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link/link LWW (tiebreaker)", () => {
        // bob does some other format op first to increase his Lamport timestamp
        // to tie alice's.
        bobText.format(8, 13, "bold", true);

        aliceText.format(0, 4, "link", url);
        bobText.format(0, 4, "link", url2);
        runtimeGen.releaseAll();
        // Same Lamport timestamps, so winner uses senderID tiebreaker.
        const urlWin = alice.replicaID > bob.replicaID ? url : url2;
        const ans = [
          { index: 0, values: "one ", format: { link: urlWin } },
          { index: 4, values: "two ", format: {} },
          { index: 8, values: "three", format: { bold: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link/link overlapping LWW", () => {
        // alice has the higher Lamport timestamp because she already did
        // an insert operation.
        aliceText.format(0, 8, "link", url);
        bobText.format(4, 13, "link", url2);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one two ", format: { link: url } },
          { index: 8, values: "three", format: { link: url2 } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link/link overlapping LWW (tiebreaker)", () => {
        // bob does some other format op first to increase his Lamport timestamp
        // to tie alice's.
        bobText.format(8, 13, "bold", true);

        aliceText.format(0, 8, "link", url);
        bobText.format(4, 13, "link", url2);
        runtimeGen.releaseAll();
        // Same Lamport timestamps, so winner uses senderID tiebreaker.
        if (alice.replicaID > bob.replicaID) {
          const ans = [
            { index: 0, values: "one two ", format: { link: url } },
            { index: 8, values: "three", format: { link: url2, bold: true } },
          ];
          assert.deepStrictEqual(aliceText.formatted(), ans);
          assert.deepStrictEqual(bobText.formatted(), ans);
        } else {
          const ans = [
            { index: 0, values: "one ", format: { link: url } },
            { index: 4, values: "two ", format: { link: url2 } },
            { index: 8, values: "three", format: { link: url2, bold: true } },
          ];
          assert.deepStrictEqual(aliceText.formatted(), ans);
          assert.deepStrictEqual(bobText.formatted(), ans);
        }
      });

      it("bold/italic overlapping", () => {
        aliceText.format(0, 8, "bold", true);
        bobText.format(4, 13, "italic", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { bold: true } },
          { index: 4, values: "two ", format: { italic: true, bold: true } },
          { index: 8, values: "three", format: { italic: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("bold/link overlapping 1", () => {
        aliceText.format(0, 8, "bold", true);
        bobText.format(4, 13, "link", url);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { bold: true } },
          { index: 4, values: "two ", format: { link: url, bold: true } },
          { index: 8, values: "three", format: { link: url } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("bold/link overlapping 2", () => {
        aliceText.format(0, 8, "link", url);
        bobText.format(4, 13, "bold", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { link: url } },
          { index: 4, values: "two ", format: { link: url, bold: true } },
          { index: 8, values: "three", format: { bold: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("bold then unbold", () => {
        aliceText.format(0, 8, "bold", true);
        runtimeGen.releaseAll();
        bobText.format(0, 8, "bold", undefined);
        runtimeGen.releaseAll();
        const ans = [{ index: 0, values: "one two three", format: {} }];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("bold/unbold overlapping", () => {
        aliceText.format(0, 8, "bold", true);
        runtimeGen.releaseAll();
        bobText.format(4, 13, "bold", undefined);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { bold: true } },
          { index: 4, values: "two three", format: {} },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("bold/unbold split", () => {
        // alice has the higher Lamport timestamp because she already did
        // an insert operation.
        aliceText.insert(4, "1.5 ", { bold: true });
        aliceText.format(4, 8, "bold", undefined);
        bobText.format(0, 13, "bold", true);
        // bob's bold loses to Alice's unbold, so its effective
        // range is "split" when alice receives it. This makes the
        // events more interesting (tested by the CRichTextView).
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { bold: true } },
          { index: 4, values: "1.5 ", format: {} },
          { index: 8, values: "two three", format: { bold: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link/link split", () => {
        // alice has the higher Lamport timestamp because she already did
        // an insert operation.
        aliceText.insert(4, "1.5 ", { link: url });
        aliceText.format(4, 8, "link", url2);
        bobText.format(0, 13, "link", url);
        // bob's url loses to Alice's url2, so its effective
        // range is "split" when alice receives it. This makes the
        // events more interesting (tested by the CRichTextView).
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { link: url } },
          { index: 4, values: "1.5 ", format: { link: url2 } },
          { index: 8, values: "two three", format: { link: url } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link then unlink", () => {
        aliceText.format(0, 8, "link", url);
        runtimeGen.releaseAll();
        bobText.format(0, 8, "link", undefined);
        runtimeGen.releaseAll();
        const ans = [{ index: 0, values: "one two three", format: {} }];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link/unlink overlapping", () => {
        aliceText.format(0, 8, "link", url);
        runtimeGen.releaseAll();
        bobText.format(4, 13, "link", undefined);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { link: url } },
          { index: 4, values: "two three", format: {} },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link/italic/bold overlapping", () => {
        // Put link first with its end matching bold's start,
        // to exercise closedEndSpans.
        aliceText.format(0, 8, "link", url);
        aliceText.format(4, 10, "italic", true);
        runtimeGen.releaseAll();
        bobText.format(7, 13, "bold", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { link: url } },
          { index: 4, values: "two", format: { link: url, italic: true } },
          {
            index: 7,
            values: " ",
            format: { link: url, italic: true, bold: true },
          },
          { index: 8, values: "th", format: { italic: true, bold: true } },
          { index: 10, values: "ree", format: { bold: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("link/italic/link overlapping", () => {
        // Put link first with its end matching the second link's start,
        // to exercise closedEndSpans.
        aliceText.format(0, 8, "link", url);
        runtimeGen.releaseAll();
        bobText.format(7, 13, "link", url2);
        bobText.format(4, 10, "italic", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { link: url } },
          { index: 4, values: "two", format: { link: url, italic: true } },
          {
            index: 7,
            values: " th",
            format: { link: url2, italic: true },
          },
          { index: 10, values: "ree", format: { link: url2 } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("bold/unbold/italic overlapping", () => {
        aliceText.format(0, 8, "bold", true);
        aliceText.format(4, 10, "bold", undefined);
        runtimeGen.releaseAll();
        bobText.format(8, 13, "italic", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { bold: true } },
          { index: 4, values: "two ", format: {} },
          {
            index: 8,
            values: "three",
            format: { italic: true },
          },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });

      it("bold/link/unlink overlapping", () => {
        aliceText.format(0, 8, "bold", true);
        aliceText.format(4, 10, "link", url);
        runtimeGen.releaseAll();
        bobText.format(8, 13, "link", undefined);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { bold: true } },
          { index: 4, values: "two ", format: { link: url, bold: true } },
          {
            index: 8,
            values: "three",
            format: {},
          },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
      });
    });
  });

  describe("fuzz", () => {
    // Type true.
    const normalFormats = ["bold", "italic"];
    // Type string.
    const noGrowFormats = ["link", "author"];

    let runtimeGen!: TestingRuntimes;
    let runtimes!: CRuntime[];
    let texts!: CRichText[];

    function doBeforeEach(numUsers: number) {
      beforeEach(() => {
        runtimeGen = new TestingRuntimes();
        runtimes = [];
        texts = [];
        for (let i = 0; i < numUsers; i++) {
          const runtime = runtimeGen.newRuntime(rng);
          runtimes.push(runtime);
          const text = runtime.registerCollab(
            "text",
            (init) => new CRichText(init, { noGrowAtEnd: noGrowFormats })
          );
          texts.push(text);
          new CRichTextView(text, false);
        }
      });
    }

    function randomOp(
      text: CRichText,
      ans?: { value: string; format: Record<string, any> }[]
    ) {
      if (text.length === 0) {
        // Add some text to work with.
        text.insert(0, "starting", {});
        if (ans) {
          for (let j = 0; j < "starting".length; j++) {
            ans.push({ value: "starting"[j], format: {} });
          }
        }
      }
      switch (Math.floor(rng() * 3)) {
        case 0: {
          // Insert with random format.
          const format: Record<string, any> = {};
          for (const boolKey of normalFormats) {
            if (Math.floor(rng() * 2) === 0) {
              format[boolKey] = true;
            }
          }
          for (const stringKey of noGrowFormats) {
            if (Math.floor(rng() * 2) === 0) {
              format[stringKey] = rng() + "";
            }
          }
          const index = Math.floor(rng() * (text.length + 1));
          const char = String.fromCharCode(65 + Math.floor(rng() * 26));
          text.insert(index, char, format);
          if (ans) ans.splice(index, 0, { value: char, format });
          break;
        }
        case 1: {
          // Delete.
          const index = Math.floor(rng() * text.length);
          text.delete(index);
          if (ans) ans.splice(index, 1);
          break;
        }
        case 2: {
          // Format.
          let key: string;
          let value: any;
          if (Math.floor(rng() * 2) === 0) {
            key = normalFormats[Math.floor(rng() * 2)];
            value = Math.floor(rng() * 2) === 0 ? true : undefined;
          } else {
            key = noGrowFormats[Math.floor(rng() * 2)];
            value = Math.floor(rng() * 2) === 0 ? rng() + "" : undefined;
          }
          const startIndex = Math.floor(rng() * text.length);
          const endIndex =
            startIndex + Math.floor(rng() * (text.length - startIndex));
          text.format(startIndex, endIndex, key, value);
          if (ans) {
            for (let i = startIndex; i < endIndex; i++) {
              if (value === undefined) delete ans[i].format[key];
              else ans[i].format[key] = value;
            }
          }
          break;
        }
      }
    }

    describe("sequential", () => {
      for (const numUsers of [1, 10]) {
        describe(`${numUsers} users`, () => {
          doBeforeEach(numUsers);

          it("random", () => {
            // Random ops (insert, delete, format). Sequentially but split across users.
            const ans: { value: string; format: Record<string, any> }[] = [];
            for (let i = 0; i < 100; i++) {
              const text = texts[Math.floor(rng() * texts.length)];
              randomOp(text, ans);
              runtimeGen.releaseAll();
            }

            const formatted = texts[0].formatted();
            for (const list of texts) {
              assert.deepStrictEqual(
                [...list.entries()].map(([, , value, format]) => ({
                  value,
                  format,
                })),
                ans
              );
              assert.deepStrictEqual(list.formatted(), formatted);
              EventView.check(list);
            }
          });
        });
      }
    });

    describe("concurrent", () => {
      for (const numUsers of [2, 10]) {
        describe(`${numUsers} users`, () => {
          doBeforeEach(numUsers);

          it("random", () => {
            // Random ops (insert, delete, format). 5 times, each user performs
            // 5 operations independently (so they're all concurrent), then
            // we releaseAll and cross-check.
            for (let i = 0; i < 5; i++) {
              for (const text of texts) {
                for (let j = 0; j < 5; j++) randomOp(text);
              }

              runtimeGen.releaseAll();

              const formatted = texts[0].formatted();
              for (const list of texts) {
                assert.deepStrictEqual(list.formatted(), formatted);
                EventView.check(list);
              }
            }
          });
        });
      }
    });
  });
});
