import { assert } from "chai";
import { debug } from "../debug";
import {
  CCounter,
  LWWCVariable,
  OptionalLWWCVariable,
  CRDTApp,
  TestingCRDTAppGenerator,
  ResettableCCounter,
} from "../../src";
import { Pre, Optional } from "@collabs/core";
import seedrandom = require("seedrandom");
import {
  AddComponent,
  CNumberState,
  MultComponent,
} from "../../src/number/number";

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

  describe("AddComponent", () => {
    let aliceCounter: AddComponent;
    let bobCounter: AddComponent;

    beforeEach(() => {
      aliceCounter = alice.registerCollab(
        "counterId",
        Pre(AddComponent)(new CNumberState(0))
      );
      bobCounter = bob.registerCollab(
        "counterId",
        Pre(AddComponent)(new CNumberState(0))
      );
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    function addEventListeners(counter: AddComponent, name: string): void {
      counter.on("Add", (event) =>
        console.log(`${name}: ${event.meta.sender} added ${event.arg}`)
      );
    }

    it("is initially 0", () => {
      assert.strictEqual(aliceCounter.state.value, 0);
      assert.strictEqual(bobCounter.state.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        aliceCounter.add(3);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.state.value, 3);
        assert.strictEqual(bobCounter.state.value, 3);

        bobCounter.add(-4);
        appGen.releaseAll();
        assert.strictEqual(aliceCounter.state.value, -1);
        assert.strictEqual(bobCounter.state.value, -1);

        aliceCounter.add(12);
        appGen.releaseAll();
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

        appGen.releaseAll();
        assert.strictEqual(aliceCounter.state.value, -3);
        assert.strictEqual(bobCounter.state.value, -3);
      });
    });
  });

  describe("CCounter", () => {
    let aliceCounter: CCounter;
    let bobCounter: CCounter;

    beforeEach(() => {
      aliceCounter = alice.registerCollab("counterId", Pre(CCounter)());
      bobCounter = bob.registerCollab("counterId", Pre(CCounter)());
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
        Pre(ResettableCCounter)()
      );
      bobCounter = bob.registerCollab(
        "resettableCounterId",
        Pre(ResettableCCounter)()
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
        console.log(`${name}: ${event.meta.sender} added ${event.arg}`)
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

  describe("MultComponent", () => {
    let aliceVariable: MultComponent;
    let bobVariable: MultComponent;

    beforeEach(() => {
      aliceVariable = alice.registerCollab(
        "multId",
        Pre(MultComponent)(new CNumberState(2))
      );
      bobVariable = bob.registerCollab(
        "multId",
        Pre(MultComponent)(new CNumberState(2))
      );
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceVariable, "Alice");
        addEventListeners(bobVariable, "Bob");
      }
    });

    function addEventListeners(comp: MultComponent, name: string): void {
      comp.on("Mult", (event) =>
        console.log(`${name}: ${event.meta.sender} multed ${event.arg}`)
      );
    }

    it("is initially 2", () => {
      assert.strictEqual(aliceVariable.state.value, 2);
      assert.strictEqual(bobVariable.state.value, 2);
    });

    describe("mult", () => {
      it("works for non-concurrent updates", () => {
        aliceVariable.mult(3);
        appGen.releaseAll();
        assert.strictEqual(aliceVariable.state.value, 6);
        assert.strictEqual(bobVariable.state.value, 6);

        bobVariable.mult(-4);
        appGen.releaseAll();
        assert.strictEqual(aliceVariable.state.value, -24);
        assert.strictEqual(bobVariable.state.value, -24);
      });

      it("works with concurrent updates", () => {
        aliceVariable.mult(2);
        assert.strictEqual(aliceVariable.state.value, 4);
        assert.strictEqual(bobVariable.state.value, 2);

        bobVariable.mult(-8);
        assert.strictEqual(aliceVariable.state.value, 4);
        assert.strictEqual(bobVariable.state.value, -16);

        appGen.releaseAll();
        assert.strictEqual(aliceVariable.state.value, -32);
        assert.strictEqual(bobVariable.state.value, -32);
      });
    });

    describe("reset", () => {
      // TODO: implement these.
      it("works with concurrent updates");
      it("works with non-concurrent updates");
      it("lets concurrent mults survive");
    });
  });
  //
  // describe("GPlainSet", () => {
  //   let aliceGPlainSet: GPlainSet<any>;
  //   let bobGPlainSet: GPlainSet<any>;
  //
  //   beforeEach(() => {
  //     aliceGPlainSet = alice.registerCollab("gsetId", new GPlainSet());
  //     bobGPlainSet = bob.registerCollab("gsetId", new GPlainSet());
  // alice.load(Optional.empty());
  // bob.load(Optional.empty());
  //     if (debug) {
  //       addEventListeners(aliceGPlainSet, "Alice");
  //       addEventListeners(bobGPlainSet, "Bob");
  //     }
  //   });
  //
  //   function addEventListeners<T>(gSet: GPlainSet<T>, name: string): void {
  //     gSet.on("Add", (event) =>
  //       console.log(
  //         `${name}: ${event.meta.sender} added ${event.value}`
  //       )
  //     );
  //   }
  //
  //   it("is initially empty", () => {
  //     assert.isEmpty(new Set(aliceGPlainSet));
  //     assert.isEmpty(new Set(bobGPlainSet));
  //   });
  //
  //   describe("add", () => {
  //     it("works with non-concurrent updates", () => {
  //       aliceGPlainSet.add("element");
  //       appGen.releaseAll();
  //       assert.deepStrictEqual(new Set(aliceGPlainSet), new Set(["element"]));
  //       assert.deepStrictEqual(new Set(bobGPlainSet), new Set(["element"]));
  //
  //       bobGPlainSet.add(7);
  //       appGen.releaseAll();
  //       assert.deepStrictEqual(
  //         new Set(aliceGPlainSet),
  //         new Set(["element", 7])
  //       );
  //       assert.deepStrictEqual(new Set(bobGPlainSet), new Set(["element", 7]));
  //
  //       aliceGPlainSet.add(7);
  //       appGen.releaseAll();
  //       assert.deepStrictEqual(
  //         new Set(aliceGPlainSet),
  //         new Set(["element", 7])
  //       );
  //       assert.deepStrictEqual(new Set(bobGPlainSet), new Set(["element", 7]));
  //     });
  //
  //     it("works with concurrent updates", () => {
  //       aliceGPlainSet.add("first");
  //       assert.deepStrictEqual(new Set(aliceGPlainSet), new Set(["first"]));
  //       assert.deepStrictEqual(new Set(bobGPlainSet), new Set());
  //
  //       bobGPlainSet.add("second");
  //       assert.deepStrictEqual(new Set(aliceGPlainSet), new Set(["first"]));
  //       assert.deepStrictEqual(new Set(bobGPlainSet), new Set(["second"]));
  //
  //       appGen.releaseAll();
  //       assert.deepStrictEqual(
  //         new Set(aliceGPlainSet),
  //         new Set(["first", "second"])
  //       );
  //       assert.deepStrictEqual(
  //         new Set(bobGPlainSet),
  //         new Set(["first", "second"])
  //       );
  //     });
  //   });
  // });

  describe("OptionalLWWCVariable", () => {
    let aliceMvr: OptionalLWWCVariable<string>;
    let bobMvr: OptionalLWWCVariable<string>;

    beforeEach(() => {
      aliceMvr = alice.registerCollab("mvrId", Pre(OptionalLWWCVariable)());
      bobMvr = bob.registerCollab("mvrId", Pre(OptionalLWWCVariable)());
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceMvr, "Alice");
        addEventListeners(bobMvr, "Bob");
      }
    });

    function addEventListeners<T>(
      mvr: OptionalLWWCVariable<T>,
      name: string
    ): void {
      mvr.on("Set", (event) =>
        console.log(`${name}: ${event.meta.sender} set`)
      );
    }

    it("initially is empty", () => {
      assert.deepStrictEqual(new Set(aliceMvr.conflicts()), new Set([]));
      assert.deepStrictEqual(new Set(bobMvr.conflicts()), new Set([]));
    });

    describe("setter", () => {
      it("works with non-concurrent updates", () => {
        aliceMvr.set("second");
        appGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceMvr.conflicts()),
          new Set(["second"])
        );
        assert.deepStrictEqual(
          new Set(bobMvr.conflicts()),
          new Set(["second"])
        );

        aliceMvr.set("third");
        appGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceMvr.conflicts()),
          new Set(["third"])
        );
        assert.deepStrictEqual(new Set(bobMvr.conflicts()), new Set(["third"]));

        bobMvr.set("bob's");
        appGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceMvr.conflicts()),
          new Set(["bob's"])
        );
        assert.deepStrictEqual(new Set(bobMvr.conflicts()), new Set(["bob's"]));
      });

      it("works with concurrent updates", () => {
        aliceMvr.set("concA");
        bobMvr.set("concB");
        appGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceMvr.conflicts()),
          new Set(["concA", "concB"])
        );
        assert.deepStrictEqual(
          new Set(bobMvr.conflicts()),
          new Set(["concB", "concA"])
        );

        aliceMvr.set("concA2");
        assert.deepStrictEqual(
          new Set(aliceMvr.conflicts()),
          new Set(["concA2"])
        );
        bobMvr.set("concB2");
        assert.deepStrictEqual(
          new Set(bobMvr.conflicts()),
          new Set(["concB2"])
        );
        appGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceMvr.conflicts()),
          new Set(["concA2", "concB2"])
        );
        assert.deepStrictEqual(
          new Set(bobMvr.conflicts()),
          new Set(["concB2", "concA2"])
        );
      });

      it("merges redundant writes", () => {
        aliceMvr.set("redundant");
        bobMvr.set("redundant");
        appGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceMvr.conflicts()),
          new Set(["redundant"])
        );
        assert.deepStrictEqual(
          new Set(bobMvr.conflicts()),
          new Set(["redundant"])
        );
      });

      it("keeps overwrites of redundant writes", () => {
        aliceMvr.set("redundant");
        bobMvr.set("redundant");
        aliceMvr.set("overwrite");
        appGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceMvr.conflicts()),
          new Set(["redundant", "overwrite"])
        );
        assert.deepStrictEqual(
          new Set(bobMvr.conflicts()),
          new Set(["redundant", "overwrite"])
        );
      });
    });

    describe("clear", () => {
      it("works with concurrent updates", () => {
        aliceMvr.clear();
        assert.deepStrictEqual(new Set(aliceMvr.conflicts()), new Set([]));

        bobMvr.set("conc");
        appGen.releaseAll();
        assert.deepStrictEqual(
          new Set(aliceMvr.conflicts()),
          new Set(["conc"])
        );
        assert.deepStrictEqual(new Set(bobMvr.conflicts()), new Set(["conc"]));
      });

      // TODO
      it.skip("works with concurrent clears");
      it.skip("lets concurrent writes survive");
    });
  });

  describe("LWWCVariable", () => {
    let aliceLWW: LWWCVariable<string>;
    let bobLWW: LWWCVariable<string>;

    beforeEach(() => {
      aliceLWW = alice.registerCollab("lwwId", Pre(LWWCVariable)("initial"));
      bobLWW = bob.registerCollab("lwwId", Pre(LWWCVariable)("initial"));
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceLWW, "Alice");
        addEventListeners(bobLWW, "Bob");
      }
    });

    function addEventListeners<T>(lww: LWWCVariable<T>, name: string): void {
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
