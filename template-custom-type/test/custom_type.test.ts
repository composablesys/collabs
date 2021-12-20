import { assert } from "chai";
import { Pre, TestingNetworkGenerator, CRDTApp } from "@collabs/collabs";
import seedrandom = require("seedrandom");
import { CPair } from "../src";

describe("template-custom-type", () => {
  let runtimeGen: TestingNetworkGenerator;
  let alice: CRDTApp;
  let bob: CRDTApp;
  let rng: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
    // Use TestingNetworkGenerator to get Apps for various
    // test users.
    // It is recommended to use rng with a fixed seed so that
    // the tests are deterministic.
    runtimeGen = new TestingNetworkGenerator();
    alice = runtimeGen.newApp(undefined, rng);
    bob = runtimeGen.newApp(undefined, rng);
  });

  describe("CPair", () => {
    let alicePair: CPair<number, number>;
    let bobPair: CPair<number, number>;

    beforeEach(() => {
      // Register the Collabs you want to test, like in a normal app.
      alicePair = alice.registerCollab("pair", Pre(CPair)(0, 0));
      bobPair = bob.registerCollab("pair", Pre(CPair)(0, 0));
    });

    it("has initial values", () => {
      assert.strictEqual(alicePair.first, 0);
      assert.strictEqual(alicePair.second, 0);
      assert.strictEqual(bobPair.first, 0);
      assert.strictEqual(bobPair.second, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        alicePair.first = 3;
        // Messages are only released to non-sending users when
        // you call a "release*" method on runtimeGen.
        // Until then, their effects will only show up on the
        // sending replica (the one that called the method).
        runtimeGen.releaseAll();
        assert.strictEqual(alicePair.first, 3);
        assert.strictEqual(bobPair.first, 3);

        bobPair.first = 7;
        runtimeGen.releaseAll();
        assert.strictEqual(alicePair.first, 7);
        assert.strictEqual(bobPair.first, 7);

        alicePair.second = -2.5;
        runtimeGen.releaseAll();
        assert.strictEqual(alicePair.second, -2.5);
        assert.strictEqual(bobPair.second, -2.5);
      });

      it("works for concurrent updates on different entries", () => {
        alicePair.first = 11;
        assert.strictEqual(alicePair.first, 11);
        assert.strictEqual(alicePair.second, 0);
        assert.strictEqual(bobPair.first, 0);
        assert.strictEqual(bobPair.second, 0);

        // Here we delay releasing the first operation above
        // until after this next one, so that they are
        // concurrent.
        bobPair.second = 99;
        assert.strictEqual(alicePair.first, 11);
        assert.strictEqual(alicePair.second, 0);
        assert.strictEqual(bobPair.first, 0);
        assert.strictEqual(bobPair.second, 99);

        // Now we release all messages.  Besides testing that
        // what we get the intended values, it is essential
        // that these values are the same on all replicas.
        runtimeGen.releaseAll();
        assert.strictEqual(alicePair.first, 11);
        assert.strictEqual(alicePair.second, 99);
        assert.strictEqual(bobPair.first, 11);
        assert.strictEqual(bobPair.second, 99);
      });
    });
  });
});
