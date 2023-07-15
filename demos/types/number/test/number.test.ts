import { CRuntime, TestingRuntimes } from "@collabs/collabs";
import { assert } from "chai";
import { CNumber } from "../src";
import { debug } from "./debug";
import seedrandom = require("seedrandom");

// TODO: these take a suspiciously long time to run.

describe("Number", () => {
  let runtimeGen: TestingRuntimes;
  let alice: CRuntime;
  let bob: CRuntime;
  let rng: seedrandom.prng;
  let aliceNumber: CNumber;
  let bobNumber: CNumber;

  beforeEach(() => {
    rng = seedrandom("42");
    runtimeGen = new TestingRuntimes();
    alice = runtimeGen.newRuntime({ rng });
    bob = runtimeGen.newRuntime({ rng });
  });

  function init(initialValue: number, name = "numberId"): void {
    aliceNumber = alice.registerCollab(
      name,
      (init) => new CNumber(init, initialValue)
    );
    bobNumber = bob.registerCollab(
      name,
      (init) => new CNumber(init, initialValue)
    );
    if (debug) {
      addEventListeners(aliceNumber, "Alice");
      addEventListeners(bobNumber, "Bob");
    }
  }

  function addEventListeners(number: CNumber, name: string): void {
    number.on("Add", (event) =>
      console.log(`${name}: ${event.meta.senderID} added ${event.arg}`)
    );

    number.on("Mult", (event) =>
      console.log(`${name}: ${event.meta.senderID} multed ${event.arg}`)
    );

    number.on("Min", (event) =>
      console.log(`${name}: ${event.meta.senderID} minned ${event.arg}`)
    );

    number.on("Max", (event) =>
      console.log(`${name}: ${event.meta.senderID} maxed ${event.arg}`)
    );
  }

  it("is initially 0", () => {
    init(0);

    assert.strictEqual(aliceNumber.value, 0);
    assert.strictEqual(bobNumber.value, 0);
  });

  describe("add", () => {
    it("works with non-concurrent updates", () => {
      init(0);

      aliceNumber.add(3);
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 3);
      assert.strictEqual(bobNumber.value, 3);

      bobNumber.add(-4);
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -1);
      assert.strictEqual(bobNumber.value, -1);
    });

    it("works with concurrent updates", () => {
      init(0);

      aliceNumber.add(3);
      bobNumber.add(-4);
      assert.strictEqual(aliceNumber.value, 3);
      assert.strictEqual(bobNumber.value, -4);

      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -1);
      assert.strictEqual(bobNumber.value, -1);
    });
  });

  describe("add and mult", () => {
    it("works with non-concurrent updates", () => {
      init(0);

      aliceNumber.add(3);
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 3);
      assert.strictEqual(bobNumber.value, 3);

      bobNumber.mult(-4);
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -12);
      assert.strictEqual(bobNumber.value, -12);

      aliceNumber.add(7);
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -5);
      assert.strictEqual(bobNumber.value, -5);
    });

    it("works with concurrent updates", () => {
      init(0);

      aliceNumber.add(2);
      assert.strictEqual(aliceNumber.value, 2);
      assert.strictEqual(bobNumber.value, 0);

      bobNumber.add(1);
      bobNumber.mult(5);
      assert.strictEqual(aliceNumber.value, 2);
      assert.strictEqual(bobNumber.value, 5);

      // Arbitration order places multiplication last
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 15);
      assert.strictEqual(bobNumber.value, 15);
    });

    it("works with the example from the paper", () => {
      // See https://arxiv.org/abs/2004.04303, §3.1
      init(1, "numberIdPaper");

      aliceNumber.mult(2);
      aliceNumber.add(1);
      bobNumber.mult(3);
      bobNumber.add(4);
      assert.strictEqual(aliceNumber.value, 3);
      assert.strictEqual(bobNumber.value, 7);

      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 17);
      assert.strictEqual(bobNumber.value, 17);
    });
  });

  describe("multiple ops", () => {
    it("works with non-concurrent updates", () => {
      init(0);

      aliceNumber.add(3);
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 3);
      assert.strictEqual(bobNumber.value, 3);

      bobNumber.mult(-4);
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -12);
      assert.strictEqual(bobNumber.value, -12);

      aliceNumber.min(10);
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -12);
      assert.strictEqual(bobNumber.value, -12);

      aliceNumber.max(-5);
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -5);
      assert.strictEqual(bobNumber.value, -5);
    });

    it("works with concurrent updates", () => {
      init(0);

      aliceNumber.add(2);
      assert.strictEqual(aliceNumber.value, 2);
      assert.strictEqual(bobNumber.value, 0);

      bobNumber.add(1);
      bobNumber.mult(5);
      assert.strictEqual(aliceNumber.value, 2);
      assert.strictEqual(bobNumber.value, 5);

      // Arbitration order places multiplication last
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 15);
      assert.strictEqual(bobNumber.value, 15);

      aliceNumber.min(2);
      bobNumber.mult(5);
      assert.strictEqual(aliceNumber.value, 2);
      assert.strictEqual(bobNumber.value, 75);

      // Arbitration order places multiplication last
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 10);
      assert.strictEqual(bobNumber.value, 10);

      aliceNumber.max(3);
      bobNumber.add(5);
      assert.strictEqual(aliceNumber.value, 10);
      assert.strictEqual(bobNumber.value, 15);

      // Arbitration order places addition last
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 15);
      assert.strictEqual(bobNumber.value, 15);
    });
  });
});
