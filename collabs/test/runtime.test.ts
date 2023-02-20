import { assert } from "chai";
import { Bytes, TestingRuntimes } from "../src";

// Reproduce a basic test from @collabs/core to make sure
// everything is loading properly.
describe("core", () => {
  describe("Bytes", () => {
    it("parse inverts stringify", () => {
      const start = new Uint8Array(5);
      start.fill(7);

      const stringified = Bytes.stringify(start);
      const parsed = Bytes.parse(stringified);

      assert.isTrue(
        Bytes.equals(start, parsed),
        `parsed != start (stringified: ${stringified}`
      );
    });
  });
});

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
