import { assert } from "chai";
import { debug } from "../debug";
import {
  CCounter,
  LwwCRegister,
  OptionalLwwCRegister,
  Pre,
  CRDTApp,
  TestingCRDTAppGenerator,
  Optional,
} from "../../src";
import seedrandom from "seedrandom";
import {
  AddComponent,
  CNumberState,
  MultComponent,
} from "../../src/crdts/number/number";

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
        console.log(`${name}: ${event.meta.sender} added ${event.arg}`)
      );
      counter.on("Reset", (event) =>
        console.log(`${name}: ${event.meta.sender} reset`)
      );
      // TODO
      // counter.on("StrongReset", (event) =>
      //   console.log(`${name}: ${event.meta.sender} strong reset`)
      // );
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

    describe("strong reset", () => {
      it.skip("works with non-concurrent updates", () => {
        // aliceCounter.add(10);
        // appGen.releaseAll();
        // assert.strictEqual(aliceCounter.value, 10);
        // assert.strictEqual(bobCounter.value, 10);
        //
        // bobCounter.strongReset();
        // appGen.releaseAll();
        // assert.strictEqual(aliceCounter.value, 0);
        // assert.strictEqual(bobCounter.value, 0);
        //
        // aliceCounter.add(6);
        // appGen.releaseAll();
        // assert.strictEqual(aliceCounter.value, 6);
        // assert.strictEqual(bobCounter.value, 6);
      });

      it.skip("wins over concurrent add", () => {
        // aliceCounter.add(10);
        // appGen.releaseAll();
        // assert.strictEqual(aliceCounter.value, 10);
        // assert.strictEqual(bobCounter.value, 10);
        //
        // aliceCounter.strongReset();
        // bobCounter.add(20);
        // appGen.releaseAll();
        // assert.strictEqual(aliceCounter.value, 0);
        // assert.strictEqual(bobCounter.value, 0);
      });
    });

    it("works with lots of concurrency", () => {
      aliceCounter.add(3);
      bobCounter.add(7);
      aliceCounter.reset();
      appGen.release(bob);
      assert.strictEqual(aliceCounter.value, 7);
      assert.strictEqual(bobCounter.value, 7);

      // TODO
      // bobCounter.strongReset();
      // appGen.releaseAll();
      // assert.strictEqual(aliceCounter.value, 0);
      // assert.strictEqual(bobCounter.value, 0);
    });
  });

  describe("MultComponent", () => {
    let aliceRegister: MultComponent;
    let bobRegister: MultComponent;

    beforeEach(() => {
      aliceRegister = alice.registerCollab(
        "multId",
        Pre(MultComponent)(new CNumberState(2))
      );
      bobRegister = bob.registerCollab(
        "multId",
        Pre(MultComponent)(new CNumberState(2))
      );
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceRegister, "Alice");
        addEventListeners(bobRegister, "Bob");
      }
    });

    function addEventListeners(register: MultComponent, name: string): void {
      register.on("Mult", (event) =>
        console.log(`${name}: ${event.meta.sender} multed ${event.arg}`)
      );
    }

    it("is initially 2", () => {
      assert.strictEqual(aliceRegister.state.value, 2);
      assert.strictEqual(bobRegister.state.value, 2);
    });

    describe("mult", () => {
      it("works for non-concurrent updates", () => {
        aliceRegister.mult(3);
        appGen.releaseAll();
        assert.strictEqual(aliceRegister.state.value, 6);
        assert.strictEqual(bobRegister.state.value, 6);

        bobRegister.mult(-4);
        appGen.releaseAll();
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

        appGen.releaseAll();
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

  describe("OptionalLwwCRegister", () => {
    let aliceMvr: OptionalLwwCRegister<string>;
    let bobMvr: OptionalLwwCRegister<string>;

    beforeEach(() => {
      aliceMvr = alice.registerCollab("mvrId", Pre(OptionalLwwCRegister)());
      bobMvr = bob.registerCollab("mvrId", Pre(OptionalLwwCRegister)());
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceMvr, "Alice");
        addEventListeners(bobMvr, "Bob");
      }
    });

    function addEventListeners<T>(
      mvr: OptionalLwwCRegister<T>,
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

    describe("reset", () => {
      it("works with concurrent updates", () => {
        aliceMvr.reset();
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
      it("works with concurrent resets");
      it("lets concurrent writes survive");
    });
  });

  describe("LwwCRegister", () => {
    let aliceLww: LwwCRegister<string>;
    let bobLww: LwwCRegister<string>;

    beforeEach(() => {
      aliceLww = alice.registerCollab("lwwId", Pre(LwwCRegister)("initial"));
      bobLww = bob.registerCollab("lwwId", Pre(LwwCRegister)("initial"));
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceLww, "Alice");
        addEventListeners(bobLww, "Bob");
      }
    });

    function addEventListeners<T>(lww: LwwCRegister<T>, name: string): void {
      // TODO
      // lww.on("Lww", (event) =>
      //   console.log(
      //     `${name}: ${event.meta.sender} set to ${event.value}`
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
        appGen.releaseAll();
        assert.strictEqual(aliceLww.value, "second");
        assert.strictEqual(bobLww.value, "second");

        aliceLww.value = "third";
        appGen.releaseAll();
        assert.strictEqual(aliceLww.value, "third");
        assert.strictEqual(bobLww.value, "third");

        aliceLww.value = "third";
        appGen.releaseAll();
        assert.strictEqual(aliceLww.value, "third");
        assert.strictEqual(bobLww.value, "third");

        bobLww.value = "bob's";
        appGen.releaseAll();
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
        appGen.releaseAll();
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

        appGen.releaseAll();
        assert.strictEqual(aliceLww.value, "concB2");
        assert.strictEqual(bobLww.value, "concB2");
      });

      it("works with redundant writes", () => {
        aliceLww.value = "redundant";
        bobLww.value = "redundant";
        appGen.releaseAll();
        assert.strictEqual(aliceLww.value, "redundant");
        assert.strictEqual(bobLww.value, "redundant");
      });

      it("works with overwrites", () => {
        aliceLww.value = "redundant";
        aliceLww.value = "overwrite";
        appGen.releaseAll();
        assert.strictEqual(aliceLww.value, "overwrite");
        assert.strictEqual(bobLww.value, "overwrite");
      });
    });

    describe("reset", () => {
      it("works with concurrent reset", () => {
        aliceLww.reset();
        assert.strictEqual(aliceLww.value, "initial");

        bobLww.value = "conc";
        appGen.releaseAll();
        assert.strictEqual(aliceLww.value, "conc");
        assert.strictEqual(bobLww.value, "conc");
      });
    });
  });
});
