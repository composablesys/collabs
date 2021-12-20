import { assert } from "chai";
import { TestingNetworkGenerator } from "../../src";

describe("Runtime", () => {
  let appGen: TestingNetworkGenerator;

  beforeEach(() => {
    appGen = new TestingNetworkGenerator();
  });
  describe("replicaID", () => {
    it("generates without error on Node", () => {
      appGen.newApp();
    });

    it("has length 11", () => {
      assert.strictEqual(appGen.newApp().runtime.replicaID.length, 11);
    });

    it("is different each time", () => {
      assert.notStrictEqual(
        appGen.newApp().runtime.replicaID,
        appGen.newApp().runtime.replicaID
      );
    });
  });
});
