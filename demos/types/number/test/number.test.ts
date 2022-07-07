import { assert } from "chai";
import seedrandom = require("seedrandom");
import {
  Pre,
  Optional,
  CRDTApp,
  TestingCRDTAppGenerator,
} from "@collabs/collabs";
import { CNumber } from "../src";
import { debug } from "./debug";

describe("Number", () => {
  let appGen: TestingCRDTAppGenerator;
  let alice: CRDTApp;
  let bob: CRDTApp;
  let rng: seedrandom.prng;
  let aliceNumber: CNumber;
  let bobNumber: CNumber;

  beforeEach(() => {
    rng = seedrandom("42");
    appGen = new TestingCRDTAppGenerator();
    alice = appGen.newApp(undefined, rng);
    bob = appGen.newApp(undefined, rng);
  });

  function init(initialValue: number, name = "numberId"): void {
    aliceNumber = alice.registerCollab(name, Pre(CNumber)(initialValue));
    bobNumber = bob.registerCollab(name, Pre(CNumber)(initialValue));
    alice.load(Optional.empty());
    bob.load(Optional.empty());
    if (debug) {
      addEventListeners(aliceNumber, "Alice");
      addEventListeners(bobNumber, "Bob");
    }
  }

  function addEventListeners(number: CNumber, name: string): void {
    number.on("Add", (event) =>
      console.log(`${name}: ${event.meta.sender} added ${event.arg}`)
    );

    number.on("Mult", (event) =>
      console.log(`${name}: ${event.meta.sender} multed ${event.arg}`)
    );

    number.on("Min", (event) =>
      console.log(`${name}: ${event.meta.sender} minned ${event.arg}`)
    );

    number.on("Max", (event) =>
      console.log(`${name}: ${event.meta.sender} maxed ${event.arg}`)
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
      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 3);
      assert.strictEqual(bobNumber.value, 3);

      bobNumber.add(-4);
      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -1);
      assert.strictEqual(bobNumber.value, -1);
    });

    it("works with concurrent updates", () => {
      init(0);

      aliceNumber.add(3);
      bobNumber.add(-4);
      assert.strictEqual(aliceNumber.value, 3);
      assert.strictEqual(bobNumber.value, -4);

      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -1);
      assert.strictEqual(bobNumber.value, -1);
    });
  });

  describe("add and mult", () => {
    it("works with non-concurrent updates", () => {
      init(0);

      aliceNumber.add(3);
      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 3);
      assert.strictEqual(bobNumber.value, 3);

      bobNumber.mult(-4);
      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -12);
      assert.strictEqual(bobNumber.value, -12);

      aliceNumber.add(7);
      appGen.releaseAll();
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
      appGen.releaseAll();
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

      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 17);
      assert.strictEqual(bobNumber.value, 17);
    });
  });

  describe("multiple ops", () => {
    it("works with non-concurrent updates", () => {
      init(0);

      aliceNumber.add(3);
      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 3);
      assert.strictEqual(bobNumber.value, 3);

      bobNumber.mult(-4);
      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -12);
      assert.strictEqual(bobNumber.value, -12);

      aliceNumber.min(10);
      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, -12);
      assert.strictEqual(bobNumber.value, -12);

      aliceNumber.max(-5);
      appGen.releaseAll();
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
      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 15);
      assert.strictEqual(bobNumber.value, 15);

      aliceNumber.min(2);
      bobNumber.mult(5);
      assert.strictEqual(aliceNumber.value, 2);
      assert.strictEqual(bobNumber.value, 75);

      // Arbitration order places multiplication last
      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 10);
      assert.strictEqual(bobNumber.value, 10);

      aliceNumber.max(3);
      bobNumber.add(5);
      assert.strictEqual(aliceNumber.value, 10);
      assert.strictEqual(bobNumber.value, 15);

      // Arbitration order places addition last
      appGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 15);
      assert.strictEqual(bobNumber.value, 15);
    });
  });

  // describe("reset", () => {
  //   it("resets to the initial value", () => {
  //     aliceNumber.add(1);
  //     aliceNumber.reset();
  //     appGen.releaseAll();
  //     assert.strictEqual(aliceNumber.value, 0);
  //     assert.strictEqual(bobNumber.value, 0);
  //   });

  //   it("works with non-concurrent updates", () => {
  //     aliceNumber.add(3);
  //     appGen.releaseAll();
  //     assert.strictEqual(aliceNumber.value, 3);
  //     assert.strictEqual(bobNumber.value, 3);

  //     aliceNumber.reset();
  //     aliceNumber.add(11);
  //     appGen.releaseAll();
  //     assert.strictEqual(aliceNumber.value, 11);
  //     assert.strictEqual(bobNumber.value, 11);
  //   });

  //   it("lets concurrent adds survive", () => {
  //     aliceNumber.reset();
  //     bobNumber.add(10);
  //     appGen.releaseAll();
  //     assert.strictEqual(aliceNumber.value, 10);
  //     assert.strictEqual(bobNumber.value, 10);
  //   });
  // });
});
