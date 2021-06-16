import { assert } from "chai";
import {
  Runtime,
  ISequenceSource,
  TreedocSource,
  TreedocId,
  TestingNetworkGenerator,
} from "../../src";
import seedrandom from "seedrandom";
import { BitSet } from "../../src/util/bitset";
import util from "util";

describe("list", () => {
  let runtimeGen: TestingNetworkGenerator;
  let alice: Runtime;
  let bob: Runtime;
  let rng: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
    runtimeGen = new TestingNetworkGenerator();
    alice = runtimeGen.newRuntime("immediate", rng);
    bob = runtimeGen.newRuntime("immediate", rng);
  });

  describe("TreedocSource", () => {
    let source: TreedocSource;
    let aliceId: string;

    beforeEach(() => {
      source = alice.registerCrdt("treedocSourceId", new TreedocSource());
      aliceId = alice.replicaId;
    });

    it("compares sample correctly", () => {
      assert.isAbove(
        source.compare(
          new TreedocId(BitSet.parseBinary("01101100100110110010"), [
            [0, { sender: "alice", uniqueNumber: 1 }],
            [2, { sender: "alice", uniqueNumber: 2 }],
          ]),
          new TreedocId(BitSet.parseBinary("011010"), [
            [0, { sender: "alice", uniqueNumber: 1 }],
            [2, { sender: "alice", uniqueNumber: 2 }],
          ])
        ),
        0
      );

      let value = new TreedocId(BitSet.parseBinary("010"), [
        [0, { sender: "d\x19kg#\x0FaG~v%", uniqueNumber: 7 }],
        [2, { sender: "\x07H&\x13$:WYs\x05_", uniqueNumber: 13 }],
      ]);
      assert.strictEqual(source.compare(value, value), 0);
    });

    it("breaks ties by disambiguators", () => {
      assert.isAbove(
        source.compare(
          new TreedocId(BitSet.parseBinary("01101000100110110010"), [
            [0, { sender: "bob", uniqueNumber: 7 }],
            [19, { sender: "alice", uniqueNumber: 1 }],
          ]),
          new TreedocId(BitSet.parseBinary("01101000100110110010"), [
            [0, { sender: "alice", uniqueNumber: 1 }],
            [19, { sender: "alice", uniqueNumber: 11 }],
          ])
        ),
        0
      );
      assert.isAbove(
        source.compare(
          new TreedocId(BitSet.parseBinary("01101000100110110010"), [
            [0, { sender: "alice", uniqueNumber: 1 }],
            [2, { sender: "bob", uniqueNumber: 7 }],
            [19, { sender: "alice", uniqueNumber: 11 }],
          ]),
          new TreedocId(BitSet.parseBinary("01101000100110110010"), [
            [0, { sender: "alice", uniqueNumber: 1 }],
            [2, { sender: "alice", uniqueNumber: 5 }],
            [19, { sender: "alice", uniqueNumber: 11 }],
          ])
        ),
        0
      );
    });

    function checkCreatedId(
      beforePath: string | null,
      beforeDis: [index: number, sender: string, uniqueNumber: number][] | null,
      afterPath: string | null,
      afterDis: [index: number, sender: string, uniqueNumber: number][] | null,
      expectedPath: string,
      expectedDis: [index: number, sender: string, uniqueNumber: number][]
    ) {
      checkCreatedIds(beforePath, beforeDis, afterPath, afterDis, [
        expectedPath,
        expectedDis,
      ]);
    }

    function checkCreatedIds(
      beforePath: string | null,
      beforeDis: [index: number, sender: string, uniqueNumber: number][] | null,
      afterPath: string | null,
      afterDis: [index: number, sender: string, uniqueNumber: number][] | null,
      ...expected: [
        expectedPath: string,
        expectedDis: [index: number, sender: string, uniqueNumber: number][]
      ][]
    ) {
      let before =
        beforePath === null
          ? null
          : new TreedocId(
              BitSet.parseBinary(beforePath),
              beforeDis!.map((elem) => [
                elem[0],
                { sender: elem[1], uniqueNumber: elem[2] },
              ])
            );
      let after =
        afterPath === null
          ? null
          : new TreedocId(
              BitSet.parseBinary(afterPath),
              afterDis!.map((elem) => [
                elem[0],
                { sender: elem[1], uniqueNumber: elem[2] },
              ])
            );
      let expectedIds = expected.map((value) => {
        return {
          path: BitSet.parseBinary(value[0]),
          disambiguators: value[1].map((elem) => [
            elem[0],
            { sender: elem[1], uniqueNumber: elem[2] },
          ]) as readonly [number, { sender: string; uniqueNumber: number }][],
        };
      });
      let mid = source.createBetween(before, after, expected.length);
      assert.deepStrictEqual(
        mid,
        expectedIds,
        util.inspect([mid, expectedIds], {
          depth: null,
          maxArrayLength: null,
          maxStringLength: null,
          colors: true,
        })
      );
    }

    it("creates expected ids when non-mini-sibling leaves", () => {
      checkCreatedId(null, null, null, null, "0", [[0, aliceId, 0]]);
      checkCreatedId(null, null, "0", [[0, "bob", 3]], "00", [[1, aliceId, 1]]);
      checkCreatedId("0", [[0, "bob", 3]], null, null, "1", [[0, aliceId, 2]]);
      checkCreatedId(
        "01001111111111",
        [[13, "bob", 7]],
        "011010011",
        [[8, "charlie", 8]],
        "0101",
        [[3, aliceId, 3]]
      );
      checkCreatedId(
        "01001111010100",
        [
          [6, "eve", 7],
          [13, "bob", 67],
        ],
        "01001111000000",
        [[13, "charlie", 124]],
        "010011110000000",
        [[14, aliceId, 4]]
      );
      checkCreatedId(
        "01001111110100",
        [
          [6, "eve", 7],
          [13, "bob", 67],
        ],
        "01001111010000",
        [[13, "charlie", 124]],
        "0100111100",
        [[9, aliceId, 5]]
      );
      checkCreatedId(
        "01001111110100",
        [
          [6, "eve", 7],
          [13, "bob", 67],
        ],
        "01001111000000",
        [
          [8, "dave", 6],
          [13, "charlie", 3],
        ],
        "0100111100",
        [[9, aliceId, 6]]
      );
      checkCreatedId("0", [[0, "bob", 1]], "01", [[1, "bob", 2]], "010", [
        [2, aliceId, 7],
      ]);
      checkCreatedId("00", [[1, "bob", 2]], "0", [[0, "bob", 1]], "001", [
        [2, aliceId, 8],
      ]);
      checkCreatedId(
        "000000",
        [
          [3, "bob", 5],
          [5, "alice", 6],
        ],
        "00000010000",
        [
          [3, "bob", 5],
          [10, "charlie", 123],
        ],
        "000000100000",
        [
          [3, "bob", 5],
          [11, aliceId, 9],
        ]
      );
    });

    it("creates expected ids when descendants", () => {
      checkCreatedId(
        "0",
        [[0, "bob", 0]],
        "01",
        [
          [0, "bob", 0],
          [1, "bob", 1],
        ],
        "010",
        [
          [0, "bob", 0],
          [2, aliceId, 0],
        ]
      );
      checkCreatedId(
        "00",
        [
          [0, "bob", 0],
          [1, "bob", 1],
        ],
        "0",
        [[0, "bob", 0]],
        "001",
        [
          [0, "bob", 0],
          [2, aliceId, 1],
        ]
      );
      checkCreatedId(
        "000000",
        [
          [3, "bob", 0],
          [5, "alice", 1],
        ],
        "00000010000",
        [
          [3, "bob", 0],
          [5, "alice", 1],
          [10, "charlie", 567],
        ],
        "000000100000",

        [
          [3, "bob", 0],
          [5, "alice", 1],
          [11, aliceId, 2],
        ]
      );
    });

    it("creates expected ids when mini-siblings", () => {
      checkCreatedId(
        "010101",
        [
          [1, "bobpadd", 1],
          [5, "charlie", 2],
        ],
        "010101",
        [
          [1, "bobpadd", 1],
          [5, "davepad", 2],
        ],
        "0101011",
        [
          [1, "bobpadd", 1],
          [5, "charlie", 2],
          [6, aliceId, 0],
        ]
      );
      checkCreatedId(
        "01010111",
        [
          [1, "bobpadd", 1],
          [5, "charlie", 2],
        ],
        "010101",
        [
          [1, "bobpadd", 1],
          [5, "davepad", 6],
        ],
        "0101010",
        [
          [1, "bobpadd", 1],
          [5, "davepad", 6],
          [6, aliceId, 1],
        ]
      );
      checkCreatedId(
        "01010111",
        [
          [1, "bobpadd", 1],
          [5, "charlie", 6],
        ],
        "010101000",
        [
          [1, "bobpadd", 1],
          [5, "davepad", 8],
        ],
        "010101111",
        [
          [1, "bobpadd", 1],
          [5, "charlie", 6],
          [8, aliceId, 2],
        ]
      );
    });

    it("creates expected ids for bulk insertion", () => {
      checkCreatedIds(
        "01001111111111",
        [[13, "bob", 1]],
        "011010011",
        [[8, "charlie", 1]],
        ["0101", [[3, aliceId, 0]]],
        ["0101", [[3, aliceId, 1]]],
        ["0101", [[3, aliceId, 2]]]
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
          aliceSource = alice.registerCrdt("sourceId", entry[1]());
          bobSource = bob.registerCrdt("sourceId", entry[1]());
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
