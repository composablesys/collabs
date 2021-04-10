import { assert } from "chai";
import {
  CrdtRuntime,
  ISequenceSource,
  TreedocSource,
  TreedocList,
} from "../../src/crdts";
import { BitSet } from "../../src/utils/bitset";
import { TestingNetworkGenerator } from "../../src/network";
import seedrandom from "seedrandom";

describe("list", () => {
  let runtimeGen: TestingNetworkGenerator;
  let alice: CrdtRuntime;
  let bob: CrdtRuntime;
  let rng: seedrandom.prng;

  beforeEach(() => {
    runtimeGen = new TestingNetworkGenerator();
    alice = runtimeGen.newRuntime();
    bob = runtimeGen.newRuntime();
    rng = rng = seedrandom("42");
  });

  describe("TreedocSource", () => {
    let source: TreedocSource;
    let aliceId: string;

    beforeEach(() => {
      source = alice
        .groupParent("")
        .addChild("treedocSourceId", new TreedocSource());
      aliceId = alice.getReplicaId();
    });

    it("compares sample correctly", () => {
      assert.isAbove(
        source.compare(
          {
            path: BitSet.parseBinary("01101100100110110010"),
            disambiguators: [
              [0, "alice"],
              [2, "alice"],
            ],
          },
          {
            path: BitSet.parseBinary("011010"),
            disambiguators: [
              [0, "alice"],
              [2, "alice"],
            ],
          }
        ),
        0
      );
    });

    it("breaks ties by disambiguators", () => {
      assert.isAbove(
        source.compare(
          {
            path: BitSet.parseBinary("01101000100110110010"),
            disambiguators: [
              [0, "bob"],
              [19, "alice"],
            ],
          },
          {
            path: BitSet.parseBinary("01101000100110110010"),
            disambiguators: [
              [0, "alice"],
              [19, "alice"],
            ],
          }
        ),
        0
      );
      assert.isAbove(
        source.compare(
          {
            path: BitSet.parseBinary("01101000100110110010"),
            disambiguators: [
              [0, "alice"],
              [2, "bob"],
              [19, "alice"],
            ],
          },
          {
            path: BitSet.parseBinary("01101000100110110010"),
            disambiguators: [
              [0, "alice"],
              [2, "alice"],
              [19, "alice"],
            ],
          }
        ),
        0
      );
    });

    function checkCreatedId(
      beforePath: string | null,
      beforeDis: [index: number, value: string][] | null,
      afterPath: string | null,
      afterDis: [index: number, value: string][] | null,
      expectedPath: string,
      expectedDis: [index: number, value: string][]
    ) {
      checkCreatedIds(beforePath, beforeDis, afterPath, afterDis, [
        expectedPath,
        expectedDis,
      ]);
    }

    function checkCreatedIds(
      beforePath: string | null,
      beforeDis: [index: number, value: string][] | null,
      afterPath: string | null,
      afterDis: [index: number, value: string][] | null,
      ...expected: [
        expectedPath: string,
        expectedDis: [index: number, value: string][]
      ][]
    ) {
      let before =
        beforePath === null
          ? null
          : {
              path: BitSet.parseBinary(beforePath),
              disambiguators: beforeDis!,
            };
      let after =
        afterPath === null
          ? null
          : {
              path: BitSet.parseBinary(afterPath),
              disambiguators: afterDis!,
            };
      let expectedIds = expected.map((value) => {
        return {
          path: BitSet.parseBinary(value[0]),
          disambiguators: value[1],
        };
      });
      let mid = source.createBetween(before, after, expected.length);
      assert.deepStrictEqual(mid, expectedIds);
    }

    it("creates expected ids when non-mini-sibling leaves", () => {
      checkCreatedId(null, null, null, null, "0", [[0, aliceId]]);
      checkCreatedId(null, null, "0", [[0, "bob"]], "00", [[1, aliceId]]);
      checkCreatedId("0", [[0, "bob"]], null, null, "01", [[1, aliceId]]);
      checkCreatedId(
        "01001111111111",
        [[13, "bob"]],
        "011010011",
        [[8, "charlie"]],
        "0110100110",
        [[9, aliceId]]
      );
      checkCreatedId(
        "01001111111111",
        [
          [6, "eve"],
          [13, "bob"],
        ],
        "011010011",
        [
          [7, "dave"],
          [8, "charlie"],
        ],
        "0110100110",
        [
          [7, "dave"],
          [9, aliceId],
        ]
      );
    });

    it("creates expected ids when descendants", () => {
      checkCreatedId("0", [[0, "bob"]], "01", [[1, "bob"]], "010", [
        [2, aliceId],
      ]);
      checkCreatedId("00", [[1, "bob"]], "0", [[0, "bob"]], "001", [
        [2, aliceId],
      ]);
      checkCreatedId(
        "000000",
        [
          [3, "bob"],
          [5, "alice"],
        ],
        "00000010000",
        [
          [3, "bob"],
          [5, "alice"],
          [10, "charlie"],
        ],
        "000000100000",

        [
          [3, "bob"],
          [5, "alice"],
          [11, aliceId],
        ]
      );
      checkCreatedId(
        "000000",
        [
          [3, "bob"],
          [5, "alice"],
        ],
        "00000010000",
        [
          [3, "bob"],
          [10, "charlie"],
        ],
        "000000100000",
        [
          [3, "bob"],
          [11, aliceId],
        ]
      );
    });

    it("creates expected ids when mini-siblings", () => {
      checkCreatedId(
        "010101",
        [
          [1, "bob"],
          [5, "charlie"],
        ],
        "010101",
        [
          [1, "bob"],
          [5, "dave"],
        ],
        "0101011",
        [
          [1, "bob"],
          [5, "charlie"],
          [6, aliceId],
        ]
      );
    });

    it("creates expected ids for bulk insertion", () => {
      checkCreatedIds(
        "01001111111111",
        [[13, "bob"]],
        "011010011",
        [[8, "charlie"]],
        ["011010011000", [[9, aliceId]]],
        ["011010011001", [[9, aliceId]]],
        ["011010011010", [[9, aliceId]]]
      );
    });
  });

  describe("ISequenceSource generic tests", () => {
    const sequenceSources = {
      TreedocSource: () => new TreedocSource(),
    };
    for (let entry of Object.entries(sequenceSources)) {
      describe(entry[0], () => {
        let aliceSource: ISequenceSource<any>;
        let bobSource: ISequenceSource<any>;

        function checkOrder(source: ISequenceSource<any>, seqIds: any[]) {
          for (let i = 0; i < seqIds.length; i++) {
            if (seqIds[i] === null) continue;
            for (let j = 0; j < seqIds.length; j++) {
              if (seqIds[j] === null) continue;
              assert.strictEqual(
                Math.sign(source.compare(seqIds[i], seqIds[j])),
                Math.sign(i - j),
                "i = " +
                  i +
                  ", j = " +
                  j +
                  ", seqIds[i] = " +
                  JSON.stringify(seqIds[i]) +
                  ", seqIds[j] = " +
                  JSON.stringify(seqIds[j])
              );
            }
          }
        }

        function transfer(
          from: ISequenceSource<any>,
          to: ISequenceSource<any>,
          seqIds: any[]
        ) {
          return seqIds.map((value) =>
            to.deserialize(from.serialize(value), to.runtime)
          );
        }

        beforeEach(() => {
          aliceSource = alice.groupParent("").addChild("sourceId", entry[1]());
          bobSource = bob.groupParent("").addChild("sourceId", entry[1]());
        });

        it("works for basic insertion", () => {
          let mid = aliceSource.createBetween(null, null, 1)[0];
          checkOrder(aliceSource, [mid]);
        });

        it("transfers basic insertion", () => {
          let mid = aliceSource.createBetween(null, null, 1)[0];
          runtimeGen.releaseAll();
          checkOrder(bobSource, transfer(aliceSource, bobSource, [mid]));
        });

        it("works for LtR insertions", () => {
          let lastSeqId = null;
          let seqIds: any[] = [];
          for (let i = 0; i < 100; i++) {
            lastSeqId = aliceSource.createBetween(lastSeqId, null, 1)[0];
            seqIds.push(lastSeqId);
          }
          checkOrder(aliceSource, seqIds);
          runtimeGen.releaseAll();
          checkOrder(bobSource, transfer(aliceSource, bobSource, seqIds));
        });

        it("works for RtL insertions", () => {
          let lastSeqId = null;
          let seqIdsRev: any[] = [];
          for (let i = 0; i < 100; i++) {
            lastSeqId = aliceSource.createBetween(null, lastSeqId, 1)[0];
            seqIdsRev.push(lastSeqId);
          }
          let seqIds = seqIdsRev.reverse();
          checkOrder(aliceSource, seqIds);
          runtimeGen.releaseAll();
          checkOrder(bobSource, transfer(aliceSource, bobSource, seqIds));
        });

        it("works for random insertions", () => {
          let seqIds: any[] = [];
          for (let i = 0; i < 100; i++) {
            let randIndex = 1 + Math.floor(rng() * (seqIds.length - 1));
            let newId = aliceSource.createBetween(
              seqIds[randIndex - 1] ?? null,
              seqIds[randIndex] ?? null,
              1
            )[0];
            seqIds.splice(randIndex, 0, newId);
          }
          checkOrder(aliceSource, seqIds);
          runtimeGen.releaseAll();
          checkOrder(bobSource, transfer(aliceSource, bobSource, seqIds));
        });

        it("works for concurrent insertions", () => {
          let [left, right] = aliceSource.createBetween(null, null, 2);
          runtimeGen.releaseAll();
          let [bobLeft, bobRight] = transfer(aliceSource, bobSource, [
            left,
            right,
          ]);

          let aliceMid = aliceSource.createBetween(left, right, 1)[0];
          let bobMid = bobSource.createBetween(bobLeft, bobRight, 1)[0];
          runtimeGen.releaseAll();

          let aliceMidBob = transfer(aliceSource, bobSource, [aliceMid])[0];
          let bobMidAlice = transfer(bobSource, aliceSource, [bobMid])[0];
          assert.notStrictEqual(aliceSource.compare(aliceMid, bobMidAlice), 0);
          assert.strictEqual(
            Math.sign(aliceSource.compare(aliceMid, bobMidAlice)),
            Math.sign(bobSource.compare(aliceMidBob, bobMid))
          );

          let ordered: any[];
          if (aliceSource.compare(aliceMid, bobMidAlice) < 0) {
            ordered = [aliceMid, bobMidAlice];
          } else {
            ordered = [bobMidAlice, aliceMid];
          }

          checkOrder(aliceSource, ordered);
          runtimeGen.releaseAll();
          checkOrder(bobSource, transfer(aliceSource, bobSource, ordered));
        });

        it("works for insertions between concurrent insertions", () => {
          let [left, right] = aliceSource.createBetween(null, null, 2);
          runtimeGen.releaseAll();
          let [bobLeft, bobRight] = transfer(aliceSource, bobSource, [
            left,
            right,
          ]);

          let aliceMid = aliceSource.createBetween(left, right, 1)[0];
          let bobMid = bobSource.createBetween(bobLeft, bobRight, 1)[0];
          runtimeGen.releaseAll();

          // let aliceMidBob = transfer(aliceSource, bobSource, [aliceMid])[0];
          let bobMidAlice = transfer(bobSource, aliceSource, [bobMid])[0];

          let [leftAlice, rightAlice] =
            aliceSource.compare(aliceMid, bobMidAlice) < 0
              ? [aliceMid, bobMidAlice]
              : [bobMidAlice, aliceMid];
          let aliceMidMid = aliceSource.createBetween(
            leftAlice,
            rightAlice,
            1
          )[0];

          let ordered = [left, leftAlice, aliceMidMid, rightAlice, right];
          checkOrder(aliceSource, ordered);
          runtimeGen.releaseAll();
          checkOrder(bobSource, transfer(aliceSource, bobSource, ordered));
        });
      });
    }
  });
});

// TODO: generic List tests, applied to TreedocList.
// Check length equality at each step.
