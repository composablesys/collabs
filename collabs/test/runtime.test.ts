import { assert } from "chai";
import { TestingRuntimes } from "../src";

// Reproduce a basic test from @collabs/crdts to make sure
// everything is loading properly.
describe("crdts", () => {
  describe("TestingRuntimes", () => {
    let runtimeGen: TestingRuntimes;

    beforeEach(() => {
      runtimeGen = new TestingRuntimes();
    });
    describe("replicaID", () => {
      it("generates without error on Node", () => {
        runtimeGen.newRuntime();
      });

      it("has length 10", () => {
        assert.strictEqual(runtimeGen.newRuntime().replicaID.length, 10);
      });

      it("is different each time", () => {
        assert.notStrictEqual(
          runtimeGen.newRuntime().replicaID,
          runtimeGen.newRuntime().replicaID
        );
      });
    });
  });
});
