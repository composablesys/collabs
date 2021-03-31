import { assert } from "chai";
import {
  CrdtRuntime,
  ISequenceSource,
  NaiveStatelessTreeSource,
} from "../../src/crdts";
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

  describe("NaiveStatelessTreeSource", () => {
    let source: NaiveStatelessTreeSource;

    beforeEach(() => {
      source = alice
        .groupParent("")
        .addChild("naiveSourceId", new NaiveStatelessTreeSource());
    });

    it("compares sample correctly", () => {
      assert.isAbove(
        source.compare(
          {
            path: new Uint8Array([42, 7, 99]),
            sender: "",
            senderCounter: 0,
          },
          {
            path: new Uint8Array([23]),
            sender: "",
            senderCounter: 0,
          }
        ),
        0
      );
    });

    it("breaks ties by sender", () => {
      assert.isAbove(
        source.compare(
          {
            path: new Uint8Array([42, 7, 99]),
            sender: "zoo",
            senderCounter: 0,
          },
          {
            path: new Uint8Array([42, 7, 99]),
            sender: "aardvark",
            senderCounter: 0,
          }
        ),
        0
      );
    });

    it("breaks ties by senderCounter", () => {
      assert.isAbove(
        source.compare(
          {
            path: new Uint8Array([42, 7, 99]),
            sender: "name",
            senderCounter: 12345,
          },
          {
            path: new Uint8Array([42, 7, 99]),
            sender: "name",
            senderCounter: 37,
          }
        ),
        0
      );
    });

    function checkCreatedPath(
      beforePath: number[],
      afterPath: number[],
      expectedPath: number[]
    ) {
      let before = {
        path: new Uint8Array(beforePath),
        sender: "name",
        senderCounter: 17,
      };
      let after = {
        path: new Uint8Array(afterPath),
        sender: "name",
        senderCounter: 17,
      };
      let mid = source.createBetween(before, after, 1)[0];
      assert.deepStrictEqual([...mid.path], expectedPath);
    }

    it("creates expected paths", () => {
      checkCreatedPath([], [100], [50]);
      checkCreatedPath([], [101], [50]);
      checkCreatedPath([7, 7, 7], [9], [8]);
      checkCreatedPath([1, 2, 3, 4, 5], [1, 2, 3, 4, 7], [1, 2, 3, 4, 6]);
      checkCreatedPath([0, 255, 255], [1, 0, 0, 0, 7], [1]);
      checkCreatedPath([0, 255, 255, 255], [1], [0, 255, 255, 255, 128]);
      checkCreatedPath([17, 255, 255, 40], [18], [17, 255, 255, 148]);
      checkCreatedPath([], [1], [0, 128]);
      checkCreatedPath([0, 128], [1], [0, 192]);
      checkCreatedPath([0, 255], [1], [0, 255, 128]);
      checkCreatedPath([], [0, 128], [0, 64]);
    });
  });

  describe("ISequenceSource generic tests", () => {
    const sequenceSources = {
      NaiveStatelessTreeSource: () => new NaiveStatelessTreeSource(),
    };
    for (let entry of Object.entries(sequenceSources)) {
      describe(entry[0], () => {
        let aliceSource: ISequenceSource<any>;
        let bobSource: ISequenceSource<any>;

        function checkOrder(source: ISequenceSource<any>, seqIds: any[]) {
          for (let i = 0; i < seqIds.length; i++) {
            for (let j = 0; j < seqIds.length; j++) {
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

        it("has start < end", () => {
          checkOrder(aliceSource, [aliceSource.start, aliceSource.end]);
        });

        it("works for basic insertion", () => {
          let mid = aliceSource.createBetween(
            aliceSource.start,
            aliceSource.end,
            1
          )[0];
          checkOrder(aliceSource, [aliceSource.start, mid, aliceSource.end]);
        });

        it("transfers basic insertion", () => {
          let mid = aliceSource.createBetween(
            aliceSource.start,
            aliceSource.end,
            1
          )[0];
          runtimeGen.releaseAll();
          checkOrder(
            bobSource,
            transfer(aliceSource, bobSource, [
              aliceSource.start,
              mid,
              aliceSource.end,
            ])
          );
        });

        it("works for LtR insertions", () => {
          let lastSeqId = aliceSource.start;
          let seqIds: any[] = [];
          for (let i = 0; i < 100; i++) {
            lastSeqId = aliceSource.createBetween(
              lastSeqId,
              aliceSource.end,
              1
            )[0];
            seqIds.push(lastSeqId);
          }
          checkOrder(aliceSource, seqIds);
          runtimeGen.releaseAll();
          checkOrder(bobSource, transfer(aliceSource, bobSource, seqIds));
        });

        it("works for RtL insertions", () => {
          let lastSeqId = aliceSource.end;
          let seqIdsRev: any[] = [];
          for (let i = 0; i < 100; i++) {
            lastSeqId = aliceSource.createBetween(
              aliceSource.start,
              lastSeqId,
              1
            )[0];
            seqIdsRev.push(lastSeqId);
          }
          let seqIds = seqIdsRev.reverse();
          checkOrder(aliceSource, seqIds);
          runtimeGen.releaseAll();
          checkOrder(bobSource, transfer(aliceSource, bobSource, seqIds));
        });

        it("works for random insertions", () => {
          let seqIds = [aliceSource.start, aliceSource.end];
          for (let i = 0; i < 100; i++) {
            let randIndex = 1 + Math.floor(rng() * (seqIds.length - 1));
            let newId = aliceSource.createBetween(
              seqIds[randIndex - 1],
              seqIds[randIndex],
              1
            )[0];
            seqIds.splice(randIndex, 0, newId);
          }
          checkOrder(aliceSource, seqIds);
          runtimeGen.releaseAll();
          checkOrder(bobSource, transfer(aliceSource, bobSource, seqIds));
        });

        it("works for concurrent insertions", () => {
          let [left, right] = aliceSource.createBetween(
            aliceSource.start,
            aliceSource.end,
            2
          );
          runtimeGen.releaseAll();
          let [bobLeft, bobRight] = transfer(aliceSource, bobSource, [
            left,
            right,
          ]);

          let aliceMid = aliceSource.createBetween(left, right, 1)[0];
          let bobMid = aliceSource.createBetween(bobLeft, bobRight, 1)[0];
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
            ordered = [
              aliceSource.start,
              aliceMid,
              bobMidAlice,
              aliceSource.end,
            ];
          } else {
            ordered = [
              aliceSource.start,
              bobMidAlice,
              aliceMid,
              aliceSource.end,
            ];
          }

          checkOrder(aliceSource, ordered);
          runtimeGen.releaseAll();
          checkOrder(bobSource, transfer(aliceSource, bobSource, ordered));
        });
      });
    }
  });
});
