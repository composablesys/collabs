import { Optional } from "@collabs/core";
import { assert } from "chai";
import { CRDTApp, CValueList, TestingCRDTAppGenerator } from "../../src";
import seedrandom = require("seedrandom");

describe("CValueList", () => {
  let rng: seedrandom.prng;
  let appGen: TestingCRDTAppGenerator;
  let alice: CRDTApp;
  let bob: CRDTApp;
  let aliceList: CValueList<number>;
  let bobList: CValueList<number>;

  beforeEach(() => {
    rng = seedrandom("42");
    appGen = new TestingCRDTAppGenerator();
    alice = appGen.newApp(undefined, rng);
    bob = appGen.newApp(undefined, rng);

    aliceList = alice.registerCollab("list", (init) => new CValueList(init));
    bobList = bob.registerCollab("list", (init) => new CValueList(init));
    alice.load(Optional.empty());
    bob.load(Optional.empty());
  });

  it("inserts once", () => {
    const ans = [0];
    aliceList.insert(0, 0);
    appGen.releaseAll();
    assert.deepStrictEqual(aliceList.slice(), ans);
    assert.deepStrictEqual(bobList.slice(), ans);
  });

  it("inserts LtR", () => {
    const ans = [0, 1, 2, 3, 4];
    for (let i = 0; i < 5; i++) {
      aliceList.insert(i, i);
      appGen.releaseAll();
    }
    assert.deepStrictEqual(aliceList.slice(), ans);
    assert.deepStrictEqual(bobList.slice(), ans);
  });

  it("inserts RtL", () => {
    const ans = [4, 3, 2, 1, 0];
    for (let i = 0; i < 5; i++) {
      aliceList.insert(0, i);
      appGen.releaseAll();
    }
    assert.deepStrictEqual(aliceList.slice(), ans);
    assert.deepStrictEqual(bobList.slice(), ans);
  });

  it("inserts LtR, then in middle", () => {
    const ans = [0, 1, 10, 2, 3, 4];
    for (let i = 0; i < 5; i++) {
      aliceList.insert(i, i);
      appGen.releaseAll();
    }
    aliceList.insert(2, 10);
    appGen.releaseAll();
    assert.deepStrictEqual(aliceList.slice(), ans);
    assert.deepStrictEqual(bobList.slice(), ans);
  });

  it("inserts RtL, then in middle", () => {
    const ans = [4, 3, 10, 2, 1, 0];
    for (let i = 0; i < 5; i++) {
      aliceList.insert(0, i);
      appGen.releaseAll();
    }
    aliceList.insert(2, 10);
    appGen.releaseAll();
    assert.deepStrictEqual(aliceList.slice(), ans);
    assert.deepStrictEqual(bobList.slice(), ans);
  });

  it("deletes one element", () => {
    const ans = [0, 1, 3, 4];
    for (let i = 0; i < 5; i++) {
      aliceList.insert(i, i);
      appGen.releaseAll();
    }
    aliceList.delete(2);
    appGen.releaseAll();
    assert.deepStrictEqual(aliceList.slice(), ans);
    assert.deepStrictEqual(bobList.slice(), ans);
  });

  describe("inserts sequentially", () => {
    it("LtR", () => {
      const ans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < 5; i++) {
        aliceList.insert(i, i);
        appGen.releaseAll();
      }
      for (let i = 5; i < 10; i++) {
        bobList.insert(i, i);
        appGen.releaseAll();
      }
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
    });

    it("RtL", () => {
      const ans = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
      for (let i = 0; i < 5; i++) {
        aliceList.insert(0, i);
        appGen.releaseAll();
      }
      for (let i = 5; i < 10; i++) {
        bobList.insert(0, i);
        appGen.releaseAll();
      }
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
    });

    it("alternating", () => {
      const ans = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let i = 0; i < 5; i++) {
        aliceList.insert(2 * i, 2 * i);
        appGen.releaseAll();
        bobList.insert(2 * i + 1, 2 * i + 1);
        appGen.releaseAll();
      }
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
    });
  });

  describe("inserts concurrently", () => {
    it("at root", () => {
      aliceList.insert(0, 1);
      bobList.insert(0, 2);
      appGen.releaseAll();

      assert.deepStrictEqual(aliceList.slice(), bobList.slice());
      const ans = aliceList.slice();
      if (ans[0] === 1) {
        assert.deepStrictEqual(ans, [1, 2]);
      } else {
        assert.deepStrictEqual(ans, [2, 1]);
      }
    });

    it("at alice node going right", () => {
      aliceList.insert(0, 0);
      appGen.releaseAll();

      aliceList.insert(1, 1);
      bobList.insert(1, 2);
      appGen.releaseAll();

      const ans = aliceList.get(1) === 1 ? [0, 1, 2] : [0, 2, 1];
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
    });

    it("at alice node going left", () => {
      aliceList.insert(0, 0);
      appGen.releaseAll();

      aliceList.insert(0, 1);
      bobList.insert(0, 2);
      appGen.releaseAll();

      const ans = aliceList.get(1) === 1 ? [2, 1, 0] : [1, 2, 0];
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
    });

    it("at other node going right", () => {
      const charlie = appGen.newApp(undefined, rng);
      const charlieList = charlie.registerCollab(
        "list",
        (init) => new CValueList<number>(init)
      );
      charlie.load(Optional.empty());

      charlieList.insert(0, 0);
      appGen.releaseAll();

      aliceList.insert(1, 1);
      bobList.insert(1, 2);
      appGen.releaseAll();

      const ans = aliceList.get(1) === 1 ? [0, 1, 2] : [0, 2, 1];
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
      assert.deepStrictEqual(charlieList.slice(), ans);
    });

    it("at other node going left", () => {
      const charlie = appGen.newApp(undefined, rng);
      const charlieList = charlie.registerCollab(
        "list",
        (init) => new CValueList<number>(init)
      );
      charlie.load(Optional.empty());

      charlieList.insert(0, 0);
      appGen.releaseAll();

      aliceList.insert(0, 1);
      bobList.insert(0, 2);
      appGen.releaseAll();

      const ans = aliceList.get(1) === 1 ? [2, 1, 0] : [1, 2, 0];
      assert.deepStrictEqual(aliceList.slice(), ans);
      assert.deepStrictEqual(bobList.slice(), ans);
      assert.deepStrictEqual(charlieList.slice(), ans);
    });
  });
});
