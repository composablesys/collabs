import { assert } from "chai";
import { debug } from "../debug";
import {
  AddOnlyNumber,
  GPlainSet,
  LwwRegister,
  Runtime,
  TestingNetworkGenerator,
} from "../../src";
import seedrandom from "seedrandom";
import {
  AddComponent,
  DefaultNumberState,
  MultComponent,
} from "../../src/crdt/number/default_number";
import { MultiValueRegister } from "../../src/crdt/register/multi_value_register";

describe("basic_crdts", () => {
  let runtimeGen: TestingNetworkGenerator;
  let alice: Runtime;
  let bob: Runtime;
  let rng: seedrandom.prng;

  beforeEach(() => {
    rng = seedrandom("42");
    runtimeGen = new TestingNetworkGenerator();
    alice = runtimeGen.newRuntime("immediate", rng);
    bob = runtimeGen.newRuntime("immediate", rng);
  });

  describe("AddComponent", () => {
    let aliceCounter: AddComponent;
    let bobCounter: AddComponent;

    beforeEach(() => {
      aliceCounter = alice.registerCrdt(
        "counterId",
        new AddComponent(new DefaultNumberState(0))
      );
      bobCounter = bob.registerCrdt(
        "counterId",
        new AddComponent(new DefaultNumberState(0))
      );
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    function addEventListeners(counter: AddComponent, name: string): void {
      counter.on("Add", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${event.added}`
        )
      );
    }

    it("is initially 0", () => {
      assert.strictEqual(aliceCounter.state.value, 0);
      assert.strictEqual(bobCounter.state.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        aliceCounter.add(3);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.state.value, 3);
        assert.strictEqual(bobCounter.state.value, 3);

        bobCounter.add(-4);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.state.value, -1);
        assert.strictEqual(bobCounter.state.value, -1);

        aliceCounter.add(12);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.state.value, 11);
        assert.strictEqual(bobCounter.state.value, 11);
      });

      it("works for concurrent updates", () => {
        aliceCounter.add(2);
        assert.strictEqual(aliceCounter.state.value, 2);
        assert.strictEqual(bobCounter.state.value, 0);

        bobCounter.add(-5);
        assert.strictEqual(aliceCounter.state.value, 2);
        assert.strictEqual(bobCounter.state.value, -5);

        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.state.value, -3);
        assert.strictEqual(bobCounter.state.value, -3);
      });
    });
  });

  describe("AddOnlyNumber", () => {
    let aliceCounter: AddOnlyNumber;
    let bobCounter: AddOnlyNumber;

    beforeEach(() => {
      aliceCounter = alice.registerCrdt("counterId", new AddOnlyNumber());
      bobCounter = bob.registerCrdt("counterId", new AddOnlyNumber());
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    function addEventListeners(counter: AddOnlyNumber, name: string): void {
      counter.on("Add", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${event.added}`
        )
      );
      counter.on("Reset", (event) =>
        console.log(`${name}: ${event.timestamp.getSender()} reset`)
      );
      // TODO
      // counter.on("StrongReset", (event) =>
      //   console.log(`${name}: ${event.timestamp.getSender()} strong reset`)
      // );
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

    describe("reset", () => {
      it("works for non-concurrent updates", () => {
        bobCounter.add(20);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 20);
        assert.strictEqual(bobCounter.value, 20);

        aliceCounter.reset();
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 0);
        assert.strictEqual(bobCounter.value, 0);

        bobCounter.add(7);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 7);
        assert.strictEqual(bobCounter.value, 7);
      });

      it("works for non-concurrent reset followed by add", () => {
        aliceCounter.add(-1);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, -1);
        assert.strictEqual(bobCounter.value, -1);

        aliceCounter.reset();
        assert.strictEqual(aliceCounter.value, 0);
        assert.strictEqual(bobCounter.value, -1);

        aliceCounter.add(11);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 11);
        assert.strictEqual(bobCounter.value, 11);
      });

      it("lets concurrent adds survive", () => {
        aliceCounter.add(10);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 10);
        assert.strictEqual(bobCounter.value, 10);

        aliceCounter.reset();
        bobCounter.add(10);
        runtimeGen.releaseAll();
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
        runtimeGen.releaseAll();

        aliceCounter.reset();
        runtimeGen.releaseAll();

        assert.isTrue(aliceCounter.canGc());
        assert.isTrue(bobCounter.canGc());
      });

      it("does not allow garbage collection when not reset", () => {
        aliceCounter.add(10);
        aliceCounter.add(-1);
        aliceCounter.reset();
        bobCounter.add(11);
        bobCounter.add(-2);
        runtimeGen.releaseAll();

        assert.isFalse(aliceCounter.canGc());
        assert.isFalse(bobCounter.canGc());
      });

      it.skip("works with recreating gc'd Counter", () => {
        // TODO
      });
    });

    describe("strong reset", () => {
      it.skip("works with non-concurrent updates", () => {
        // aliceCounter.add(10);
        // runtimeGen.releaseAll();
        // assert.strictEqual(aliceCounter.value, 10);
        // assert.strictEqual(bobCounter.value, 10);
        //
        // bobCounter.strongReset();
        // runtimeGen.releaseAll();
        // assert.strictEqual(aliceCounter.value, 0);
        // assert.strictEqual(bobCounter.value, 0);
        //
        // aliceCounter.add(6);
        // runtimeGen.releaseAll();
        // assert.strictEqual(aliceCounter.value, 6);
        // assert.strictEqual(bobCounter.value, 6);
      });

      it.skip("wins over concurrent add", () => {
        // aliceCounter.add(10);
        // runtimeGen.releaseAll();
        // assert.strictEqual(aliceCounter.value, 10);
        // assert.strictEqual(bobCounter.value, 10);
        //
        // aliceCounter.strongReset();
        // bobCounter.add(20);
        // runtimeGen.releaseAll();
        // assert.strictEqual(aliceCounter.value, 0);
        // assert.strictEqual(bobCounter.value, 0);
      });
    });

    it("works with lots of concurrency", () => {
      aliceCounter.add(3);
      bobCounter.add(7);
      aliceCounter.reset();
      runtimeGen.release(bob);
      assert.strictEqual(aliceCounter.value, 7);
      assert.strictEqual(bobCounter.value, 7);

      // TODO
      // bobCounter.strongReset();
      // runtimeGen.releaseAll();
      // assert.strictEqual(aliceCounter.value, 0);
      // assert.strictEqual(bobCounter.value, 0);
    });
  });

  describe("MultComponent", () => {
    let aliceRegister: MultComponent;
    let bobRegister: MultComponent;

    beforeEach(() => {
      aliceRegister = alice.registerCrdt(
        "multId",
        new MultComponent(new DefaultNumberState(2))
      );
      bobRegister = bob.registerCrdt(
        "multId",
        new MultComponent(new DefaultNumberState(2))
      );
      if (debug) {
        addEventListeners(aliceRegister, "Alice");
        addEventListeners(bobRegister, "Bob");
      }
    });

    function addEventListeners(register: MultComponent, name: string): void {
      register.on("Mult", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} multed ${event.multed}`
        )
      );
    }

    it("is initially 2", () => {
      assert.strictEqual(aliceRegister.state.value, 2);
      assert.strictEqual(bobRegister.state.value, 2);
    });

    describe("mult", () => {
      it("works for non-concurrent updates", () => {
        aliceRegister.mult(3);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceRegister.state.value, 6);
        assert.strictEqual(bobRegister.state.value, 6);

        bobRegister.mult(-4);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceRegister.state.value, -24);
        assert.strictEqual(bobRegister.state.value, -24);
      });

      it("works with concurrent updates", () => {
        aliceRegister.mult(2);
        assert.strictEqual(aliceRegister.state.value, 4);
        assert.strictEqual(bobRegister.state.value, 2);

        bobRegister.mult(-8);
        assert.strictEqual(aliceRegister.state.value, 4);
        assert.strictEqual(bobRegister.state.value, -16);

        runtimeGen.releaseAll();
        assert.strictEqual(aliceRegister.state.value, -32);
        assert.strictEqual(bobRegister.state.value, -32);
      });
    });

    describe("reset", () => {
      // TODO: implement these.
      it("works with concurrent updates");
      it("works with non-concurrent updates");
      it("lets concurrent mults survive");
    });
  });

  describe("GPlainSet", () => {
    let aliceGPlainSet: GPlainSet<any>;
    let bobGPlainSet: GPlainSet<any>;

    beforeEach(() => {
      aliceGPlainSet = alice.registerCrdt("gsetId", new GPlainSet());
      bobGPlainSet = bob.registerCrdt("gsetId", new GPlainSet());
      if (debug) {
        addEventListeners(aliceGPlainSet, "Alice");
        addEventListeners(bobGPlainSet, "Bob");
      }
    });

    function addEventListeners<T>(gSet: GPlainSet<T>, name: string): void {
      gSet.on("Add", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${event.value}`
        )
      );
    }

    it("is initially empty", () => {
      assert.isEmpty(new Set(aliceGPlainSet));
      assert.isEmpty(new Set(bobGPlainSet));
    });

    describe("add", () => {
      it("works with non-concurrent updates", () => {
        aliceGPlainSet.add("element");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceGPlainSet), new Set(["element"]));
        assert.deepStrictEqual(new Set(bobGPlainSet), new Set(["element"]));

        bobGPlainSet.add(7);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceGPlainSet),
          new Set(["element", 7])
        );
        assert.deepStrictEqual(new Set(bobGPlainSet), new Set(["element", 7]));

        aliceGPlainSet.add(7);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceGPlainSet),
          new Set(["element", 7])
        );
        assert.deepStrictEqual(new Set(bobGPlainSet), new Set(["element", 7]));
      });

      it("works with concurrent updates", () => {
        aliceGPlainSet.add("first");
        assert.deepStrictEqual(new Set(aliceGPlainSet), new Set(["first"]));
        assert.deepStrictEqual(new Set(bobGPlainSet), new Set());

        bobGPlainSet.add("second");
        assert.deepStrictEqual(new Set(aliceGPlainSet), new Set(["first"]));
        assert.deepStrictEqual(new Set(bobGPlainSet), new Set(["second"]));

        runtimeGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceGPlainSet),
          new Set(["first", "second"])
        );
        assert.deepStrictEqual(
          new Set(bobGPlainSet),
          new Set(["first", "second"])
        );
      });
    });
  });

  describe("MultiValueRegister", () => {
    let aliceMvr: MultiValueRegister<string>;
    let bobMvr: MultiValueRegister<string>;

    beforeEach(() => {
      aliceMvr = alice.registerCrdt("mvrId", new MultiValueRegister());
      bobMvr = bob.registerCrdt("mvrId", new MultiValueRegister());
      if (debug) {
        addEventListeners(aliceMvr, "Alice");
        addEventListeners(bobMvr, "Bob");
      }
    });

    function addEventListeners<T>(
      mvr: MultiValueRegister<T>,
      name: string
    ): void {
      mvr.on("Change", (event) =>
        console.log(`${name}: ${event.timestamp.getSender()} set`)
      );
    }

    it("initially is empty", () => {
      assert.deepStrictEqual(aliceMvr.conflicts(), new Set([]));
      assert.deepStrictEqual(bobMvr.conflicts(), new Set([]));
    });

    describe("setter", () => {
      it("works with non-concurrent updates", () => {
        aliceMvr.set("second");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.conflicts(), new Set(["second"]));
        assert.deepStrictEqual(bobMvr.conflicts(), new Set(["second"]));

        aliceMvr.set("third");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.conflicts(), new Set(["third"]));
        assert.deepStrictEqual(bobMvr.conflicts(), new Set(["third"]));

        bobMvr.set("bob's");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.conflicts(), new Set(["bob's"]));
        assert.deepStrictEqual(bobMvr.conflicts(), new Set(["bob's"]));
      });

      it("works with concurrent updates", () => {
        aliceMvr.set("concA");
        bobMvr.set("concB");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(
          aliceMvr.conflicts(),
          new Set(["concA", "concB"])
        );
        assert.deepStrictEqual(bobMvr.conflicts(), new Set(["concB", "concA"]));

        aliceMvr.set("concA2");
        assert.deepStrictEqual(aliceMvr.conflicts(), new Set(["concA2"]));
        bobMvr.set("concB2");
        assert.deepStrictEqual(bobMvr.conflicts(), new Set(["concB2"]));
        runtimeGen.releaseAll();
        assert.deepStrictEqual(
          aliceMvr.conflicts(),
          new Set(["concA2", "concB2"])
        );
        assert.deepStrictEqual(
          bobMvr.conflicts(),
          new Set(["concB2", "concA2"])
        );
      });

      it("merges redundant writes", () => {
        aliceMvr.set("redundant");
        bobMvr.set("redundant");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.conflicts(), new Set(["redundant"]));
        assert.deepStrictEqual(bobMvr.conflicts(), new Set(["redundant"]));
      });

      it("keeps overwrites of redundant writes", () => {
        aliceMvr.set("redundant");
        bobMvr.set("redundant");
        aliceMvr.set("overwrite");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(
          aliceMvr.conflicts(),
          new Set(["redundant", "overwrite"])
        );
        assert.deepStrictEqual(
          bobMvr.conflicts(),
          new Set(["redundant", "overwrite"])
        );
      });
    });

    describe("reset", () => {
      it("works with concurrent updates", () => {
        aliceMvr.reset();
        assert.deepStrictEqual(aliceMvr.conflicts(), new Set([]));

        bobMvr.set("conc");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.conflicts(), new Set(["conc"]));
        assert.deepStrictEqual(bobMvr.conflicts(), new Set(["conc"]));
      });

      // TODO
      it("works with concurrent resets");
      it("lets concurrent writes survive");
    });
  });

  describe("LwwRegister", () => {
    let aliceLww: LwwRegister<string>;
    let bobLww: LwwRegister<string>;

    beforeEach(() => {
      aliceLww = alice.registerCrdt("lwwId", new LwwRegister("initial"));
      bobLww = bob.registerCrdt("lwwId", new LwwRegister("initial"));
      if (debug) {
        addEventListeners(aliceLww, "Alice");
        addEventListeners(bobLww, "Bob");
      }
    });

    function addEventListeners<T>(lww: LwwRegister<T>, name: string): void {
      // TODO
      // lww.on("Lww", (event) =>
      //   console.log(
      //     `${name}: ${event.timestamp.getSender()} set to ${event.value}`
      //   )
      // );
    }

    it('is initially "initial"', () => {
      assert.strictEqual(aliceLww.value, "initial");
      assert.strictEqual(bobLww.value, "initial");
    });

    describe("setter", () => {
      it("works with non-concurrent updates", () => {
        aliceLww.value = "second";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceLww.value, "second");
        assert.strictEqual(bobLww.value, "second");

        aliceLww.value = "third";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceLww.value, "third");
        assert.strictEqual(bobLww.value, "third");

        aliceLww.value = "third";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceLww.value, "third");
        assert.strictEqual(bobLww.value, "third");

        bobLww.value = "bob's";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceLww.value, "bob's");
        assert.strictEqual(bobLww.value, "bob's");
      });

      it("works with concurrent updates", () => {
        aliceLww.value = "concA";
        let now = new Date().getTime();
        while (new Date().getTime() <= now) {
          // Loop; Bob will have a later time than now
        }
        bobLww.value = "concB";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceLww.value, "concB");
        assert.strictEqual(bobLww.value, "concB");

        aliceLww.value = "concA2";
        assert.strictEqual(aliceLww.value, "concA2");

        now = new Date().getTime();
        while (new Date().getTime() <= now) {
          // Loop; Bob will have a later time than now
        }
        bobLww.value = "concB2";
        assert.strictEqual(bobLww.value, "concB2");

        runtimeGen.releaseAll();
        assert.strictEqual(aliceLww.value, "concB2");
        assert.strictEqual(bobLww.value, "concB2");
      });

      it("works with redundant writes", () => {
        aliceLww.value = "redundant";
        bobLww.value = "redundant";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceLww.value, "redundant");
        assert.strictEqual(bobLww.value, "redundant");
      });

      it("works with overwrites", () => {
        aliceLww.value = "redundant";
        aliceLww.value = "overwrite";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceLww.value, "overwrite");
        assert.strictEqual(bobLww.value, "overwrite");
      });
    });

    describe("reset", () => {
      it("works with concurrent reset", () => {
        aliceLww.reset();
        assert.strictEqual(aliceLww.value, "initial");

        bobLww.value = "conc";
        runtimeGen.releaseAll();
        assert.strictEqual(aliceLww.value, "conc");
        assert.strictEqual(bobLww.value, "conc");
      });
    });
  });
});
