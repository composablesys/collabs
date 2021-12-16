import { assert } from "chai";
import { CRDTApp, TestingNetworkGenerator, RgaDenseLocalList } from "../../src";
import seedrandom from "seedrandom";
import util from "util";

describe("list", () => {
  let appGen: TestingNetworkGenerator;
  let alice: CRDTApp;
  let bob: CRDTApp;
  let rng: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
    appGen = new TestingNetworkGenerator();
    alice = appGen.newApp(undefined, rng);
    bob = appGen.newApp(undefined, rng);
  });

  describe("DenseLocalList generic tests", () => {
    it.skip("Rga");
    // const sequenceSources = {
    //   TreedocDenseLocalList: (app: CRDTApp) =>
    //     new TreedocDenseLocalList(app),
    //   // TODO: actualy use RgaDenseLocalList
    //   // RgaDenseLocalList: (app: CRDTApp) => new RgaDenseLocalList(app),
    // };
    // for (let entry of Object.entries(sequenceSources)) {
    //   describe(entry[0], () => {
    //     let aliceSource: TreedocDenseLocalList<any>;
    //     let bobSource: TreedocDenseLocalList<any>;
    //
    //     function checkOrder(source: TreedocDenseLocalList<any>, seqIds: any[]) {
    //       for (let i = 0; i < seqIds.length; i++) {
    //         if (seqIds[i] === null) continue;
    //         for (let j = 0; j < seqIds.length; j++) {
    //           if (seqIds[j] === null) continue;
    //           assert.strictEqual(
    //             Math.sign(source.compare(seqIds[i], seqIds[j])),
    //             Math.sign(i - j),
    //             "i = " +
    //               i +
    //               ", j = " +
    //               j +
    //               ", seqIds[i] = " +
    //               JSON.stringify(seqIds[i]) +
    //               ", seqIds[j] = " +
    //               JSON.stringify(seqIds[j])
    //           );
    //         }
    //       }
    //     }
    //
    //     function transfer(
    //       from: TreedocDenseLocalList<any>,
    //       to: TreedocDenseLocalList<any>,
    //       seqIds: TreedocLoc[]
    //     ): TreedocLoc[] {
    //       return seqIds.map((value) =>
    //         to.deserializeInternal(from.serializeInternal(value), to.app)
    //       );
    //     }
    //
    //     beforeEach(() => {
    //       aliceSource = new TreedocDenseLocalList(alice);
    //       bobSource = new TreedocDenseLocalList(bob);
    //     });
    //
    //     it("works for basic insertion", () => {
    //       let mid = aliceSource.createBetween(null, null, 1)[0];
    //       checkOrder(aliceSource, [mid]);
    //     });
    //
    //     it("transfers basic insertion", () => {
    //       let mid = aliceSource.createBetween(null, null, 1)[0];
    //       appGen.releaseAll();
    //       checkOrder(bobSource, transfer(aliceSource, bobSource, [mid]));
    //     });
    //
    //     it("works for LtR insertions", () => {
    //       let lastSeqId = null;
    //       let seqIds: any[] = [];
    //       for (let i = 0; i < 100; i++) {
    //         lastSeqId = aliceSource.createBetween(lastSeqId, null, 1)[0];
    //         seqIds.push(lastSeqId);
    //       }
    //       checkOrder(aliceSource, seqIds);
    //       appGen.releaseAll();
    //       checkOrder(bobSource, transfer(aliceSource, bobSource, seqIds));
    //     });
    //
    //     it("works for RtL insertions", () => {
    //       let lastSeqId = null;
    //       let seqIdsRev: any[] = [];
    //       for (let i = 0; i < 100; i++) {
    //         lastSeqId = aliceSource.createBetween(null, lastSeqId, 1)[0];
    //         seqIdsRev.push(lastSeqId);
    //       }
    //       let seqIds = seqIdsRev.reverse();
    //       checkOrder(aliceSource, seqIds);
    //       appGen.releaseAll();
    //       checkOrder(bobSource, transfer(aliceSource, bobSource, seqIds));
    //     });
    //
    //     it("works for random insertions", () => {
    //       let seqIds: any[] = [];
    //       for (let i = 0; i < 100; i++) {
    //         let randIndex = 1 + Math.floor(rng() * (seqIds.length - 1));
    //         let newId = aliceSource.createBetween(
    //           seqIds[randIndex - 1] ?? null,
    //           seqIds[randIndex] ?? null,
    //           1
    //         )[0];
    //         seqIds.splice(randIndex, 0, newId);
    //       }
    //       checkOrder(aliceSource, seqIds);
    //       appGen.releaseAll();
    //       checkOrder(bobSource, transfer(aliceSource, bobSource, seqIds));
    //     });
    //
    //     it("works for concurrent insertions", () => {
    //       let [left, right] = aliceSource.createBetween(null, null, 2);
    //       appGen.releaseAll();
    //       let [bobLeft, bobRight] = transfer(aliceSource, bobSource, [
    //         left,
    //         right,
    //       ]);
    //
    //       let aliceMid = aliceSource.createBetween(left, right, 1)[0];
    //       let bobMid = bobSource.createBetween(bobLeft, bobRight, 1)[0];
    //       appGen.releaseAll();
    //
    //       let aliceMidBob = transfer(aliceSource, bobSource, [aliceMid])[0];
    //       let bobMidAlice = transfer(bobSource, aliceSource, [bobMid])[0];
    //       assert.notStrictEqual(aliceSource.compare(aliceMid, bobMidAlice), 0);
    //       assert.strictEqual(
    //         Math.sign(aliceSource.compare(aliceMid, bobMidAlice)),
    //         Math.sign(bobSource.compare(aliceMidBob, bobMid))
    //       );
    //
    //       let ordered: any[];
    //       if (aliceSource.compare(aliceMid, bobMidAlice) < 0) {
    //         ordered = [aliceMid, bobMidAlice];
    //       } else {
    //         ordered = [bobMidAlice, aliceMid];
    //       }
    //
    //       checkOrder(aliceSource, ordered);
    //       appGen.releaseAll();
    //       checkOrder(bobSource, transfer(aliceSource, bobSource, ordered));
    //     });
    //
    //     it("works for insertions between concurrent insertions", () => {
    //       let [left, right] = aliceSource.createBetween(null, null, 2);
    //       appGen.releaseAll();
    //       let [bobLeft, bobRight] = transfer(aliceSource, bobSource, [
    //         left,
    //         right,
    //       ]);
    //
    //       let aliceMid = aliceSource.createBetween(left, right, 1)[0];
    //       let bobMid = bobSource.createBetween(bobLeft, bobRight, 1)[0];
    //       appGen.releaseAll();
    //
    //       // let aliceMidBob = transfer(aliceSource, bobSource, [aliceMid])[0];
    //       let bobMidAlice = transfer(bobSource, aliceSource, [bobMid])[0];
    //
    //       let [leftAlice, rightAlice] =
    //         aliceSource.compare(aliceMid, bobMidAlice) < 0
    //           ? [aliceMid, bobMidAlice]
    //           : [bobMidAlice, aliceMid];
    //       let aliceMidMid = aliceSource.createBetween(
    //         leftAlice,
    //         rightAlice,
    //         1
    //       )[0];
    //
    //       let ordered = [left, leftAlice, aliceMidMid, rightAlice, right];
    //       checkOrder(aliceSource, ordered);
    //       appGen.releaseAll();
    //       checkOrder(bobSource, transfer(aliceSource, bobSource, ordered));
    //     });
    //   });
    // }
  });
});

// TODO: generic List tests, applied to TreedocList.
// Check length equality at each step.
