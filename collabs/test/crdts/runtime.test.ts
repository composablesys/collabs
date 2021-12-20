import { assert } from "chai";
import { TestingNetworkGenerator } from "../../src";

describe("Runtime", () => {
  let appGen: TestingNetworkGenerator;

  beforeEach(() => {
    appGen = new TestingNetworkGenerator();
  });
  describe("replicaId", () => {
    it("generates without error on Node", () => {
      appGen.newApp();
    });

    it("has length 11", () => {
      assert.strictEqual(appGen.newApp().runtime.replicaId.length, 11);
    });

    it("is different each time", () => {
      assert.notStrictEqual(
        appGen.newApp().runtime.replicaId,
        appGen.newApp().runtime.replicaId
      );
    });
  });
});
