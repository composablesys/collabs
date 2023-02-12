import { assert } from "chai";
import { TestingRuntimes } from "../../src";

describe("IRuntime", () => {
  let appGen: TestingRuntimes;

  beforeEach(() => {
    appGen = new TestingRuntimes();
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
