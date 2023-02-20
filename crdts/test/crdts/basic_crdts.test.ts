import { assert } from "chai";
import { CCounter, CRuntime, CVar, TestingRuntimes } from "../../src";
import { debug } from "../debug";
import seedrandom = require("seedrandom");

describe("basic_crdts", () => {
  let runtimeGen: TestingRuntimes;
  let alice: CRuntime;
  let bob: CRuntime;
  let rng: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
    runtimeGen = new TestingRuntimes();
    alice = runtimeGen.newRuntime(rng);
    bob = runtimeGen.newRuntime(rng);
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
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    function addEventListeners(counter: CCounter, name: string): void {
      counter.on("Add", (event) =>
        console.log(`${name}: ${event.meta.senderID} added ${event.added}`)
      );
    }

    it("is initially 0", () => {
      assert.strictEqual(aliceCounter.value, 0);
      assert.strictEqual(bobCounter.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        aliceCounter.add(3);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 3);
        assert.strictEqual(bobCounter.value, 3);

        bobCounter.add(-4);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -1);
        assert.strictEqual(bobCounter.value, -1);

        aliceCounter.add(12);
        runtimeGen.releaseAll();
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

        runtimeGen.releaseAll();
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
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    function addEventListeners(counter: CCounter, name: string): void {
      counter.on("Add", (event) =>
        console.log(`${name}: ${event.meta.senderID} added ${event.added}`)
      );
    }

    it("is initially 0", () => {
      assert.strictEqual(aliceCounter.value, 0);
      assert.strictEqual(bobCounter.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        aliceCounter.add(3);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 3);
        assert.strictEqual(bobCounter.value, 3);

        bobCounter.add(-4);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -1);
        assert.strictEqual(bobCounter.value, -1);

        aliceCounter.add(-3);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -4);
        assert.strictEqual(bobCounter.value, -4);

        bobCounter.add(4);
        runtimeGen.releaseAll();
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

        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -6);
        assert.strictEqual(bobCounter.value, -6);
      });
    });
  });

  describe("CVar", () => {
    let aliceVar: CVar<string>;
    let bobVar: CVar<string>;

    beforeEach(() => {
      aliceVar = alice.registerCollab(
        "varId",
        (init) => new CVar(init, "initial")
      );
      bobVar = bob.registerCollab("varId", (init) => new CVar(init, "initial"));
      if (debug) {
        addEventListeners(aliceVar, "Alice");
        addEventListeners(bobVar, "Bob");
      }
    });

    function addEventListeners<T>(cvar: CVar<T>, name: string): void {
      // TODO
      // cvar.on("Set", (event) =>
      //   console.log(
      //     `${name}: ${event.meta.senderID} set to ${event.value}`
      //   )
      // );
    }

    it('is initially "initial"', () => {
      assert.strictEqual(aliceVar.value, "initial");
      assert.strictEqual(bobVar.value, "initial");
    });

    describe("setter", () => {
      it("works with non-concurrent updates", () => {
        aliceVar.value = "second";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceVar.value, "second");
        assert.strictEqual(bobVar.value, "second");

        aliceVar.value = "third";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceVar.value, "third");
        assert.strictEqual(bobVar.value, "third");

        aliceVar.value = "third";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceVar.value, "third");
        assert.strictEqual(bobVar.value, "third");

        bobVar.value = "bob's";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceVar.value, "bob's");
        assert.strictEqual(bobVar.value, "bob's");
      });

      it("works with concurrent updates", () => {
        aliceVar.value = "concA";
        bobVar.value = "concB";
        runtimeGen.releaseAll();
        const winner = alice.replicaID < bob.replicaID ? "concA" : "concB";
        assert.strictEqual(aliceVar.value, winner);
        assert.strictEqual(bobVar.value, winner);

        aliceVar.value = "concA2";
        assert.strictEqual(aliceVar.value, "concA2");

        bobVar.value = "concB2";
        assert.strictEqual(bobVar.value, "concB2");

        runtimeGen.releaseAll();
        const winner2 = alice.replicaID < bob.replicaID ? "concA2" : "concB2";
        assert.strictEqual(aliceVar.value, winner2);
        assert.strictEqual(bobVar.value, winner2);
      });

      it("works with redundant writes", () => {
        aliceVar.value = "redundant";
        bobVar.value = "redundant";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceVar.value, "redundant");
        assert.strictEqual(bobVar.value, "redundant");
      });

      it("works with overwrites", () => {
        aliceVar.value = "redundant";
        aliceVar.value = "overwrite";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceVar.value, "overwrite");
        assert.strictEqual(bobVar.value, "overwrite");
      });
    });

    describe("clear", () => {
      it("works with concurrent clear", () => {
        aliceVar.clear();
        assert.strictEqual(aliceVar.value, "initial");

        bobVar.value = "conc";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceVar.value, "conc");
        assert.strictEqual(bobVar.value, "conc");
      });
    });
  });
});
