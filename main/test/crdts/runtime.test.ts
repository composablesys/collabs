import { assert } from "chai";
import { TestingNetworkGenerator } from "../../src";

describe("Runtime", () => {
  let runtimeGen: TestingNetworkGenerator;

  beforeEach(() => {
    runtimeGen = new TestingNetworkGenerator();
  });
  describe("replicaId", () => {
    it("generates without error on Node", () => {
      runtimeGen.newRuntime();
    });

    it("has length 11", () => {
      assert.strictEqual(runtimeGen.newRuntime().replicaId.length, 11);
    });

    it("is different each time", () => {
      assert.notStrictEqual(
        runtimeGen.newRuntime().replicaId,
        runtimeGen.newRuntime().replicaId
      );
    });
  });
});
