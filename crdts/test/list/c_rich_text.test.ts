import { InitToken, ReplicaIDs } from "@collabs/core";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { CRichText, CRuntime, RichTextRange, TestingRuntimes } from "../../src";
import { EventView } from "../event_view";
import { Source, Traces } from "../traces";
import { CRichTextView } from "./views";

// Instead of RichTextRange[], we use an alternative
// format that's easier to write out by hand.
class RichTextSource
  implements Source<CRichText, [values: string, format: Record<string, any>][]>
{
  constructor(
    readonly rng: seedrandom.prng,
    readonly mode: "insert" | "delete" | "format"
  ) {}

  pre(init: InitToken) {
    const text = new CRichText(init);
    new CRichTextView(text, false);
    return text;
  }
  check(
    actual: CRichText,
    expected: [values: string, format: Record<string, any>][]
  ): void {
    const ranges = this.asRanges(expected);
    assert.deepStrictEqual(actual.formatted(), ranges);
    let index = 0;
    for (const range of ranges) {
      assert.strictEqual(range.index, index);
      for (const char of range.values) {
        assert.strictEqual(actual.charAt(index), char);
        assert.deepStrictEqual(actual.getFormat(index), range.format);
        index++;
      }
    }
    assert.strictEqual(actual.length, index);
    EventView.check(actual);
  }
  private asRanges(
    expected: [values: string, format: Record<string, any>][]
  ): RichTextRange[] {
    const ranges: RichTextRange[] = [];
    let index = 0;
    for (const [values, format] of expected) {
      ranges.push({ index, values, format });
      index += values.length;
    }
    return ranges;
  }
  op(c: CRichText, n: number): void {
    // Each mode tests its operations in conflict with format operations.
    // (We expect insert & delete to already be okay,
    // since they just use CValueList.)
    switch (n) {
      case 0:
        c.format(2, 5, "bold", true);
        break;
      case 1:
      case 3:
        switch (this.mode) {
          case "insert":
            c.insert(n + 3, `op${n}`, {});
            break;
          case "delete":
            c.delete((n + 3) % c.length);
            break;
          case "format":
            c.format(0, 5, "bold", true);
            break;
        }
        break;
      case 2:
        c.format(3, c.length, "bold", undefined);
        break;
      default:
        const startIndex = n % c.length;
        const endIndex = Math.min(startIndex + 4, c.length);
        c.format(startIndex, endIndex, "bold", n % 2 === 0 ? true : undefined);
    }
  }
  setupOp(c: CRichText): void {
    // Create some elements to do ops within.
    c.insert(0, "initial", {});
  }
}

describe("CRichText", () => {
  let rng!: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
  });

  describe("traces", () => {
    let source!: RichTextSource;

    describe("insert", () => {
      beforeEach(() => {
        source = new RichTextSource(rng, "insert");
      });

      it("initial", () => {
        Traces.initial(source, [["initial", {}]]);
        // Also try with truly empty state (no setupOp).
        Traces.initial(source, [], false);
      });

      it("singleOp", () => {
        Traces.singleOp(source, [
          // inITIal
          ["in", {}],
          ["iti", { bold: true }],
          ["al", {}],
        ]);
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          [
            // inITIal
            ["in", {}],
            ["iti", { bold: true }],
            ["al", {}],
          ],
          [
            // inITop1Ial
            ["in", {}],
            ["it", { bold: true }],
            ["op1", {}],
            ["i", { bold: true }],
            ["al", {}],
          ],
          [
            // inItop1ial
            ["in", {}],
            ["i", { bold: true }],
            ["top1ial", {}],
          ],
          [
            // inItopop31ial
            ["in", {}],
            ["i", { bold: true }],
            ["topop31ial", {}],
          ]
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          [
            // inITIal
            ["in", {}],
            ["iti", { bold: true }],
            ["al", {}],
          ],
          [["initop1ial", {}]],
          [
            // inITOP1Ial
            ["in", {}],
            ["itop1i", { bold: true }],
            ["al", {}],
          ]
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          [
            // inITIal
            ["in", {}],
            ["iti", { bold: true }],
            ["al", {}],
          ],
          [
            // inITop1Ial
            ["in", {}],
            ["it", { bold: true }],
            ["op1", {}],
            ["i", { bold: true }],
            ["al", {}],
          ],
          [
            // inItial
            ["in", {}],
            ["i", { bold: true }],
            ["tial", {}],
          ],
          [
            // inItop1ial
            ["in", {}],
            ["i", { bold: true }],
            ["top1ial", {}],
          ],
          [
            // inItopop31ial
            ["in", {}],
            ["i", { bold: true }],
            ["topop31ial", {}],
          ]
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          [
            // inItopop31ial
            ["in", {}],
            ["i", { bold: true }],
            ["topop31ial", {}],
          ],
          [
            // initIaL
            ["init", {}],
            ["i", { bold: true }],
            ["a", {}],
            ["l", { bold: true }],
          ],
          [
            // All chars that were bolded at some point:
            // - "it": bolded by 0, unbolded by 7; 7's Lamport wins.
            // - 3rd "i": bolded by 4 (and 0), unbolded by 2; 2's Lamport wins.
            // - "l": bolded by 6, unbolded by 2;
            // 2's Lamport wins because of 1's extra format op.
            // So result is initopop31ial.
            ["initopop31ial", {}],
          ]
        );
      });
    });

    describe("delete", () => {
      beforeEach(() => {
        source = new RichTextSource(rng, "delete");
      });

      it("initial", () => {
        Traces.initial(source, [["initial", {}]]);
      });

      it("singleOp", () => {
        Traces.singleOp(source, [
          // inITIal
          ["in", {}],
          ["iti", { bold: true }],
          ["al", {}],
        ]);
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          [
            // inITIal
            ["in", {}],
            ["iti", { bold: true }],
            ["al", {}],
          ],
          [
            // inITal
            ["in", {}],
            ["it", { bold: true }],
            ["al", {}],
          ],
          [
            // inItal
            ["in", {}],
            ["i", { bold: true }],
            ["tal", {}],
          ],
          [
            // nItal
            ["n", {}],
            ["i", { bold: true }],
            ["tal", {}],
          ]
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          [
            // inITIal
            ["in", {}],
            ["iti", { bold: true }],
            ["al", {}],
          ],
          [["inital", {}]],
          [
            // inITal
            ["in", {}],
            ["it", { bold: true }],
            ["al", {}],
          ]
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          [
            // inITIal
            ["in", {}],
            ["iti", { bold: true }],
            ["al", {}],
          ],
          [
            // inITal
            ["in", {}],
            ["it", { bold: true }],
            ["al", {}],
          ],
          [
            // inItial
            ["in", {}],
            ["i", { bold: true }],
            ["tial", {}],
          ],
          [
            // inItal
            ["in", {}],
            ["i", { bold: true }],
            ["tal", {}],
          ],
          [
            // nItal
            ["n", {}],
            ["i", { bold: true }],
            ["tal", {}],
          ]
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          [
            // nItal
            ["n", {}],
            ["i", { bold: true }],
            ["tal", {}],
          ],
          [
            // initIaL
            ["init", {}],
            ["i", { bold: true }],
            ["a", {}],
            ["l", { bold: true }],
          ],
          [
            // All chars that were bolded at some point:
            // - "it": bolded by 0, unbolded by 7; 7's Lamport wins.
            // - 3rd "i": deleted by 1.
            // - "l": bolded by 6, unbolded by 2; 6 and 2 Lamports tie => 6 wins
            // by senderID tiebreaker. (Here we depend on the load-save behavior
            // described in Manager.setup's setupOp comment.)
            // So result is nitaL.
            ["nita", {}],
            ["l", { bold: true }],
          ]
        );
      });
    });

    describe("format", () => {
      beforeEach(() => {
        source = new RichTextSource(rng, "format");
      });

      it("initial", () => {
        Traces.initial(source, [["initial", {}]]);
      });

      it("singleOp", () => {
        Traces.singleOp(source, [
          // inITIal
          ["in", {}],
          ["iti", { bold: true }],
          ["al", {}],
        ]);
      });

      it("sequential", () => {
        Traces.sequential(
          source,
          [
            // inITIal
            ["in", {}],
            ["iti", { bold: true }],
            ["al", {}],
          ],
          [
            // INITIal
            ["initi", { bold: true }],
            ["al", {}],
          ],
          [
            // INItial
            ["ini", { bold: true }],
            ["tial", {}],
          ],
          [
            // INITIal
            ["initi", { bold: true }],
            ["al", {}],
          ]
        );
      });

      it("concurrent", () => {
        Traces.concurrent(
          source,
          [
            // inITIal
            ["in", {}],
            ["iti", { bold: true }],
            ["al", {}],
          ],
          [
            // INITIal
            ["initi", { bold: true }],
            ["al", {}],
          ],
          [
            // INITIal
            ["initi", { bold: true }],
            ["al", {}],
          ]
        );
      });

      it("diamond", () => {
        Traces.diamond(
          source,
          [
            // inITIal
            ["in", {}],
            ["iti", { bold: true }],
            ["al", {}],
          ],
          [
            // INITIal
            ["initi", { bold: true }],
            ["al", {}],
          ],
          [
            // inItial
            ["in", {}],
            ["i", { bold: true }],
            ["tial", {}],
          ],
          [
            // Lamport timestamps tie for 2 and 1; 2 wins by senderID tiebreaker.
            // (Here we depend on the load-save behavior
            // described in Manager.setup's setupOp comment.)
            // So result is INItial.
            ["ini", { bold: true }],
            ["tial", {}],
          ],
          [
            // INITIal
            ["initi", { bold: true }],
            ["al", {}],
          ]
        );
      });

      it("partition", () => {
        Traces.partition(
          source,
          [
            // INITIal
            ["initi", { bold: true }],
            ["al", {}],
          ],
          [
            // initIaL
            ["init", {}],
            ["i", { bold: true }],
            ["a", {}],
            ["l", { bold: true }],
          ],
          [
            // All chars that were bolded at some point:
            // - "init": Last bolded by 3, last unbolded by 7; 7 wins by senderID tiebreaker.
            // - 3rd "i": Only bolded.
            // - "a": Unbolded by end of both partitions.
            // - "l": bolded by 6, unbolded by 2;
            // 6 wins by senderID tiebreaker.
            // (Here we depend on the load-save behavior
            // described in Manager.setup's setupOp comment.)
            //
            // So result is initIaL.
            ["init", {}],
            ["i", { bold: true }],
            ["a", {}],
            ["l", { bold: true }],
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
      alice = runtimeGen.newRuntime({ rng });
      bob = runtimeGen.newRuntime({ rng });

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

    afterEach(() => {
      EventView.check(aliceText);
      EventView.check(bobText);
    });

    /**
     * Checks that alice and bob's saves give the same richText state
     * when loaded on a new replica.
     */
    function checkSaves() {
      for (const [runtime, richText] of [
        [alice, aliceText],
        [bob, bobText],
      ] as [CRuntime, CRichText<Format>][]) {
        const checker = new CRuntime({
          debugReplicaID: ReplicaIDs.pseudoRandom(rng),
          allowRedundantLoads: true,
        });
        const checkerText = checker.registerCollab(
          "richText",
          (init) => new CRichText(init, { noGrowAtEnd: ["link"] })
        );
        new CRichTextView(checkerText, false);

        checker.load(runtime.save());
        assert.deepStrictEqual(checkerText.formatted(), richText.formatted());
        EventView.check(checkerText);
      }
    }

    it("inserts plain", () => {
      const text = "one two three";
      aliceText.insert(0, text, {});
      runtimeGen.releaseAll();
      const ans = [{ index: 0, values: text, format: {} }];
      assert.deepStrictEqual(aliceText.formatted(), ans);
      assert.deepStrictEqual(bobText.formatted(), ans);
      checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
      });

      it("whole", () => {
        aliceText.format(0, 13, "bold", true);
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one two three", format: { bold: true } },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
          checkSaves();
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
          checkSaves();
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
          checkSaves();
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
          checkSaves();
        });
      });
    });

    describe("formats multiple", () => {
      const text = "one two three";
      beforeEach(() => {
        alice.transact(() => {
          // Do this in a transaction so we know that it increases
          // Lamport timestamp by exactly one.
          aliceText.insert(0, text, {});
        });
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
          checkSaves();
        } else {
          const ans = [
            { index: 0, values: "one ", format: { link: url } },
            { index: 4, values: "two ", format: { link: url2 } },
            { index: 8, values: "three", format: { link: url2, bold: true } },
          ];
          assert.deepStrictEqual(aliceText.formatted(), ans);
          assert.deepStrictEqual(bobText.formatted(), ans);
          checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
      });

      it("bold then unbold", () => {
        aliceText.format(0, 8, "bold", true);
        runtimeGen.releaseAll();
        bobText.format(0, 8, "bold", undefined);
        runtimeGen.releaseAll();
        const ans = [{ index: 0, values: "one two three", format: {} }];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
        checkSaves();
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
        checkSaves();
      });

      it("bold/unbold same transaction", () => {
        alice.transact(() => {
          aliceText.format(0, 8, "bold", true);
          aliceText.format(4, 13, "bold", undefined);
        });
        runtimeGen.releaseAll();
        const ans = [
          { index: 0, values: "one ", format: { bold: true } },
          { index: 4, values: "two three", format: {} },
        ];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
        checkSaves();
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
        checkSaves();
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
        checkSaves();
      });

      it("link then unlink", () => {
        aliceText.format(0, 8, "link", url);
        runtimeGen.releaseAll();
        bobText.format(0, 8, "link", undefined);
        runtimeGen.releaseAll();
        const ans = [{ index: 0, values: "one two three", format: {} }];
        assert.deepStrictEqual(aliceText.formatted(), ans);
        assert.deepStrictEqual(bobText.formatted(), ans);
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
        checkSaves();
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
          const runtime = runtimeGen.newRuntime({ rng });
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

          it("messages", () => {
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
                [...list.entries()].map(([, value, format]) => ({
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

          it("messages", () => {
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

          it("saves", () => {
            // Random ops (insert, delete, format). 5 times, each user performs
            // 5 operations independently (so they're all concurrent), then
            // we merge and cross-check them.
            for (let i = 0; i < 5; i++) {
              for (const text of texts) {
                for (let j = 0; j < 5; j++) randomOp(text);
              }

              const saves: Uint8Array[] = [];
              for (const runtime of runtimes) {
                saves.push(runtime.save());
              }
              for (const runtime of runtimes) {
                for (const save of saves) {
                  runtime.load(save);
                }
              }

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
