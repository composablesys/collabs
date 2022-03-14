import { assert } from "chai";
import { TestingCRDTAppGenerator, randomReplicaID } from "../src";

// Reproduce a basic test from @collabs/core to make sure
// everything is loading properly.
describe("crdts", () => {
  describe("randomReplicaID", () => {
    describe("replicaID", () => {
      it("generates without error on Node", () => {
        randomReplicaID();
      });

      it("has length 10", () => {
        assert.strictEqual(randomReplicaID().length, 10);
      });

      it("is different each time", () => {
        assert.notStrictEqual(randomReplicaID(), randomReplicaID());
      });
    });
  });
});

// Reproduce a basic test from @collabs/crdts to make sure
// everything is loading properly.
describe("crdts", () => {
  describe("TestingCRDTAppGenerator", () => {
    let appGen: TestingCRDTAppGenerator;

    beforeEach(() => {
      appGen = new TestingCRDTAppGenerator();
    });
    describe("replicaID", () => {
      it("generates without error on Node", () => {
        appGen.newApp();
      });

      it("has length 10", () => {
        assert.strictEqual(appGen.newApp().runtime.replicaID.length, 10);
      });

      it("is different each time", () => {
        assert.notStrictEqual(
          appGen.newApp().runtime.replicaID,
          appGen.newApp().runtime.replicaID
        );
      });
    });
  });
});
