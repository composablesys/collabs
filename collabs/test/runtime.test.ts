import { assert } from "chai";
import { ReplicaIDs, TestingRuntimes } from "../src";

// Reproduce a basic test from @collabs/core to make sure
// everything is loading properly.
describe("crdts", () => {
  describe("ReplicaIDs.random", () => {
    describe("replicaID", () => {
      it("generates without error on Node", () => {
        ReplicaIDs.random();
      });

      it("has length 10", () => {
        assert.strictEqual(ReplicaIDs.random().length, 10);
      });

      it("is different each time", () => {
        assert.notStrictEqual(ReplicaIDs.random(), ReplicaIDs.random());
      });
    });
  });
});

// Reproduce a basic test from @collabs/crdts to make sure
// everything is loading properly.
describe("crdts", () => {
  describe("TestingRuntimes", () => {
    let appGen: TestingRuntimes;

    beforeEach(() => {
      appGen = new TestingRuntimes();
    });
    describe("replicaID", () => {
      it("generates without error on Node", () => {
        appGen.newRuntime();
      });

      it("has length 10", () => {
        assert.strictEqual(appGen.newRuntime().replicaID.length, 10);
      });

      it("is different each time", () => {
        assert.notStrictEqual(
          appGen.newRuntime().replicaID,
          appGen.newRuntime().replicaID
        );
      });
    });
  });
});
