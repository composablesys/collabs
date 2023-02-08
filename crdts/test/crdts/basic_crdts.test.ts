import { Optional } from "@collabs/core";
import { assert } from "chai";
import {
  CCounter,
  CRDTApp,
  CVar,
  ResettableCCounter,
  TestingCRDTAppGenerator,
} from "../../src";
import { debug } from "../debug";
import seedrandom = require("seedrandom");

describe("basic_crdts", () => {
  let appGen: TestingCRDTAppGenerator;
  let alice: CRDTApp;
  let bob: CRDTApp;
  let rng: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
    appGen = new TestingCRDTAppGenerator();
    alice = appGen.newApp(undefined, rng);
    bob = appGen.newApp(undefined, rng);
  });

  describe("CCounter", () => {
    let aliceCounter: CCounter;
    let bobCounter: CCounter;

    beforeEach(() => {
      aliceCounter = alice.registerCollab(
        "counterId",
        (init) => new CCounter(init)
      );
      bobCounter = bob.registerCollab(
        "counterId",
        (init) => new CCounter(init)
      );
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    function addEventListeners(counter: CCounter, name: string): void {
      counter.on("Add", (event) =>
        console.log(`${name}: ${event.meta.sender} added ${event.added}`)
      );
    }

    it("is initially 0", () => {
      assert.strictEqual(aliceCounter.value, 0);
      assert.strictEqual(bobCounter.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        aliceCounter.add(3);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 3);
        assert.strictEqual(bobCounter.value, 3);

        bobCounter.add(-4);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -1);
        assert.strictEqual(bobCounter.value, -1);

        aliceCounter.add(12);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 11);
        assert.strictEqual(bobCounter.value, 11);
      });

      it("works for concurrent updates", () => {
        aliceCounter.add(2);
        assert.strictEqual(aliceCounter.value, 2);
        assert.strictEqual(bobCounter.value, 0);

        bobCounter.add(-5);
        assert.strictEqual(aliceCounter.value, 2);
        assert.strictEqual(bobCounter.value, -5);

        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -3);
        assert.strictEqual(bobCounter.value, -3);
      });
    });
  });

  describe("CCounter", () => {
    let aliceCounter: CCounter;
    let bobCounter: CCounter;

    beforeEach(() => {
      aliceCounter = alice.registerCollab(
        "counterId",
        (init) => new CCounter(init)
      );
      bobCounter = bob.registerCollab(
        "counterId",
        (init) => new CCounter(init)
      );
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    function addEventListeners(counter: CCounter, name: string): void {
      counter.on("Add", (event) =>
        console.log(`${name}: ${event.meta.sender} added ${event.added}`)
      );
    }

    it("is initially 0", () => {
      assert.strictEqual(aliceCounter.value, 0);
      assert.strictEqual(bobCounter.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        aliceCounter.add(3);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 3);
        assert.strictEqual(bobCounter.value, 3);

        bobCounter.add(-4);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -1);
        assert.strictEqual(bobCounter.value, -1);

        aliceCounter.add(-3);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -4);
        assert.strictEqual(bobCounter.value, -4);

        bobCounter.add(4);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 0);
        assert.strictEqual(bobCounter.value, 0);
      });

      it("works for concurrent updates", () => {
        aliceCounter.add(2);
        aliceCounter.add(-7);
        assert.strictEqual(aliceCounter.value, -5);
        assert.strictEqual(bobCounter.value, 0);

        bobCounter.add(-5);
        bobCounter.add(4);
        assert.strictEqual(aliceCounter.value, -5);
        assert.strictEqual(bobCounter.value, -1);

        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -6);
        assert.strictEqual(bobCounter.value, -6);
      });
    });
  });

  describe("ResettableCCounter", () => {
    let aliceCounter: ResettableCCounter;
    let bobCounter: ResettableCCounter;

    beforeEach(() => {
      aliceCounter = alice.registerCollab(
        "resettableCounterId",
        (init) => new ResettableCCounter(init)
      );
      bobCounter = bob.registerCollab(
        "resettableCounterId",
        (init) => new ResettableCCounter(init)
      );
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    function addEventListeners(
      counter: ResettableCCounter,
      name: string
    ): void {
      counter.on("Add", (event) =>
        console.log(`${name}: ${event.meta.sender} added ${event.added}`)
      );
      counter.on("Reset", (event) =>
        console.log(`${name}: ${event.meta.sender} reset`)
      );
    }

    it("is initially 0", () => {
      assert.strictEqual(aliceCounter.value, 0);
      assert.strictEqual(bobCounter.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        aliceCounter.add(3);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 3);
        assert.strictEqual(bobCounter.value, 3);

        bobCounter.add(-4);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -1);
        assert.strictEqual(bobCounter.value, -1);

        aliceCounter.add(-3);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -4);
        assert.strictEqual(bobCounter.value, -4);

        bobCounter.add(4);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 0);
        assert.strictEqual(bobCounter.value, 0);
      });

      it("works for concurrent updates", () => {
        aliceCounter.add(2);
        aliceCounter.add(-7);
        assert.strictEqual(aliceCounter.value, -5);
        assert.strictEqual(bobCounter.value, 0);

        bobCounter.add(-5);
        bobCounter.add(4);
        assert.strictEqual(aliceCounter.value, -5);
        assert.strictEqual(bobCounter.value, -1);

        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -6);
        assert.strictEqual(bobCounter.value, -6);
      });
    });

    describe("reset", () => {
      it("works for non-concurrent updates", () => {
        bobCounter.add(20);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 20);
        assert.strictEqual(bobCounter.value, 20);

        aliceCounter.reset();
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 0);
        assert.strictEqual(bobCounter.value, 0);

        bobCounter.add(7);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 7);
        assert.strictEqual(bobCounter.value, 7);
      });

      it("works for non-concurrent reset followed by add", () => {
        aliceCounter.add(-1);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -1);
        assert.strictEqual(bobCounter.value, -1);

        aliceCounter.reset();
        assert.strictEqual(aliceCounter.value, 0);
        assert.strictEqual(bobCounter.value, -1);

        aliceCounter.add(11);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 11);
        assert.strictEqual(bobCounter.value, 11);
      });

      it("lets concurrent adds survive", () => {
        aliceCounter.add(10);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 10);
        assert.strictEqual(bobCounter.value, 10);

        aliceCounter.reset();
        bobCounter.add(10);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 10);
        assert.strictEqual(bobCounter.value, 10);
      });
    });

    describe("gc", () => {
      it("allows garbage collection when reset", () => {
        aliceCounter.add(10);
        aliceCounter.add(-1);
        bobCounter.add(11);
        bobCounter.add(-2);
        appGen.releaseAll();

        aliceCounter.reset();
        appGen.releaseAll();

        assert.isTrue(aliceCounter.canGC());
        assert.isTrue(bobCounter.canGC());
      });

      it("does not allow garbage collection when not reset", () => {
        aliceCounter.add(10);
        aliceCounter.add(-1);
        aliceCounter.reset();
        bobCounter.add(11);
        bobCounter.add(-2);
        appGen.releaseAll();

        assert.isFalse(aliceCounter.canGC());
        assert.isFalse(bobCounter.canGC());
      });

      it.skip("works with recreating gc'd Counter", () => {
        // TODO
      });
    });

    it("works with lots of concurrency", () => {
      aliceCounter.add(3);
      bobCounter.add(7);
      aliceCounter.reset();
      appGen.release(bob);
      assert.strictEqual(aliceCounter.value, 7);
      assert.strictEqual(bobCounter.value, 7);
    });
  });

  describe("CVar", () => {
    let aliceLWW: CVar<string>;
    let bobLWW: CVar<string>;

    beforeEach(() => {
      aliceLWW = alice.registerCollab(
        "lwwId",
        (init) => new CVar(init, "initial")
      );
      bobLWW = bob.registerCollab("lwwId", (init) => new CVar(init, "initial"));
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceLWW, "Alice");
        addEventListeners(bobLWW, "Bob");
      }
    });

    function addEventListeners<T>(lww: CVar<T>, name: string): void {
      // TODO
      // lww.on("LWW", (event) =>
      //   console.log(
      //     `${name}: ${event.meta.sender} set to ${event.value}`
      //   )
      // );
    }

    it('is initially "initial"', () => {
      assert.strictEqual(aliceLWW.value, "initial");
      assert.strictEqual(bobLWW.value, "initial");
    });

    describe("setter", () => {
      it("works with non-concurrent updates", () => {
        aliceLWW.value = "second";
        appGen.releaseAll();
        assert.strictEqual(aliceLWW.value, "second");
        assert.strictEqual(bobLWW.value, "second");

        aliceLWW.value = "third";
        appGen.releaseAll();
        assert.strictEqual(aliceLWW.value, "third");
        assert.strictEqual(bobLWW.value, "third");

        aliceLWW.value = "third";
        appGen.releaseAll();
        assert.strictEqual(aliceLWW.value, "third");
        assert.strictEqual(bobLWW.value, "third");

        bobLWW.value = "bob's";
        appGen.releaseAll();
        assert.strictEqual(aliceLWW.value, "bob's");
        assert.strictEqual(bobLWW.value, "bob's");
      });

      it("works with concurrent updates", () => {
        aliceLWW.value = "concA";
        let now = new Date().getTime();
        while (new Date().getTime() <= now) {
          // Loop; Bob will have a later time than now
        }
        bobLWW.value = "concB";
        appGen.releaseAll();
        assert.strictEqual(aliceLWW.value, "concB");
        assert.strictEqual(bobLWW.value, "concB");

        aliceLWW.value = "concA2";
        assert.strictEqual(aliceLWW.value, "concA2");

        now = new Date().getTime();
        while (new Date().getTime() <= now) {
          // Loop; Bob will have a later time than now
        }
        bobLWW.value = "concB2";
        assert.strictEqual(bobLWW.value, "concB2");

        appGen.releaseAll();
        assert.strictEqual(aliceLWW.value, "concB2");
        assert.strictEqual(bobLWW.value, "concB2");
      });

      it("works with redundant writes", () => {
        aliceLWW.value = "redundant";
        bobLWW.value = "redundant";
        appGen.releaseAll();
        assert.strictEqual(aliceLWW.value, "redundant");
        assert.strictEqual(bobLWW.value, "redundant");
      });

      it("works with overwrites", () => {
        aliceLWW.value = "redundant";
        aliceLWW.value = "overwrite";
        appGen.releaseAll();
        assert.strictEqual(aliceLWW.value, "overwrite");
        assert.strictEqual(bobLWW.value, "overwrite");
      });
    });

    describe("clear", () => {
      it("works with concurrent clear", () => {
        aliceLWW.clear();
        assert.strictEqual(aliceLWW.value, "initial");

        bobLWW.value = "conc";
        appGen.releaseAll();
        assert.strictEqual(aliceLWW.value, "conc");
        assert.strictEqual(bobLWW.value, "conc");
      });
    });
  });
});
