import { assert } from "chai";
import { debug } from "../debug";
import {
  AddEvent,
  Counter,
  CounterPureBase,
  CrdtRuntime,
  GSet,
  LwwEvent,
  LwwRegister,
  MultEvent,
  MultiValueRegister,
  MultRegister,
  MvrEvent,
  SetAddEvent,
} from "../../src/crdts";
import { TestingNetworkGenerator } from "../../src/network";

describe("basic_crdts", () => {
  let runtimeGen: TestingNetworkGenerator;
  let alice: CrdtRuntime;
  let bob: CrdtRuntime;

  beforeEach(() => {
    runtimeGen = new TestingNetworkGenerator();
    alice = runtimeGen.newRuntime("alice");
    bob = runtimeGen.newRuntime("bob");
  });

  describe("CounterPureBase", () => {
    let aliceCounter: CounterPureBase;
    let bobCounter: CounterPureBase;

    beforeEach(() => {
      aliceCounter = new CounterPureBase(alice, "counterId");
      bobCounter = new CounterPureBase(bob, "counterId");
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    function addEventListeners(counter: CounterPureBase, name: string): void {
      counter.addEventListener("Add", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${
            (event as AddEvent).valueAdded
          }`
        )
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

  describe("Counter", () => {
    let aliceCounter: Counter;
    let bobCounter: Counter;

    beforeEach(() => {
      aliceCounter = new Counter(alice, "counterId");
      bobCounter = new Counter(bob, "counterId");
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    function addEventListeners(counter: Counter, name: string): void {
      counter.addEventListener("Add", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${
            (event as AddEvent).valueAdded
          }`
        )
      );
      counter.addEventListener("Reset", (event) =>
        console.log(`${name}: ${event.timestamp.getSender()} reset`)
      );
      counter.addEventListener("StrongReset", (event) =>
        console.log(`${name}: ${event.timestamp.getSender()} strong reset`)
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

    describe("strong reset", () => {
      it("works with non-concurrent updates", () => {
        aliceCounter.add(10);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 10);
        assert.strictEqual(bobCounter.value, 10);

        bobCounter.strongReset();
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 0);
        assert.strictEqual(bobCounter.value, 0);

        aliceCounter.add(6);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 6);
        assert.strictEqual(bobCounter.value, 6);
      });

      it("wins over concurrent add", () => {
        aliceCounter.add(10);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 10);
        assert.strictEqual(bobCounter.value, 10);

        aliceCounter.strongReset();
        bobCounter.add(20);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 0);
        assert.strictEqual(bobCounter.value, 0);
      });
    });

    it("works with lots of concurrency", () => {
      aliceCounter.add(3);
      bobCounter.add(7);
      aliceCounter.reset();
      runtimeGen.release(bob);
      assert.strictEqual(aliceCounter.value, 7);
      assert.strictEqual(bobCounter.value, 7);

      bobCounter.strongReset();
      runtimeGen.releaseAll();
      assert.strictEqual(aliceCounter.value, 0);
      assert.strictEqual(bobCounter.value, 0);
    });
  });

  describe("MultRegister", () => {
    let aliceRegister: MultRegister;
    let bobRegister: MultRegister;

    beforeEach(() => {
      aliceRegister = new MultRegister(alice, "multId", 2);
      bobRegister = bobRegister = new MultRegister(bob, "multId", 2);
      if (debug) {
        addEventListeners(aliceRegister, "Alice");
        addEventListeners(bobRegister, "Bob");
      }
    });

    function addEventListeners(register: MultRegister, name: string): void {
      register.addEventListener("Mult", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} multed ${
            (event as MultEvent).valueMulted
          }`
        )
      );
    }

    it("is initially 2", () => {
      assert.strictEqual(aliceRegister.value, 2);
      assert.strictEqual(bobRegister.value, 2);
    });

    describe("mult", () => {
      it("works for non-concurrent updates", () => {
        aliceRegister.mult(3);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceRegister.value, 6);
        assert.strictEqual(bobRegister.value, 6);

        bobRegister.mult(-4);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceRegister.value, -24);
        assert.strictEqual(bobRegister.value, -24);
      });

      it("works with concurrent updates", () => {
        aliceRegister.mult(2);
        assert.strictEqual(aliceRegister.value, 4);
        assert.strictEqual(bobRegister.value, 2);

        bobRegister.mult(-8);
        assert.strictEqual(aliceRegister.value, 4);
        assert.strictEqual(bobRegister.value, -16);

        runtimeGen.releaseAll();
        assert.strictEqual(aliceRegister.value, -32);
        assert.strictEqual(bobRegister.value, -32);
      });
    });

    describe("setter", () => {
      it("works with non-concurrent updates", () => {
        aliceRegister.value = 11;
        runtimeGen.releaseAll();
        assert.strictEqual(aliceRegister.value, 11);
        assert.strictEqual(bobRegister.value, 11);
      });
    });

    describe("reset", () => {
      // TODO: implement these.
      it("works with concurrent updates");
      it("works with non-concurrent updates");
      it("lets concurrent mults survive");
    });
  });

  describe("GSet", () => {
    let aliceGSet: GSet<any>;
    let bobGSet: GSet<any>;

    beforeEach(() => {
      aliceGSet = new GSet(alice, "gsetId");
      bobGSet = new GSet(bob, "gsetId");
      if (debug) {
        addEventListeners(aliceGSet, "Alice");
        addEventListeners(bobGSet, "Bob");
      }
    });

    function addEventListeners<T>(gSet: GSet<T>, name: string): void {
      gSet.addEventListener("SetAdd", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${
            (event as SetAddEvent<T>).valueAdded
          }`
        )
      );
    }

    it("is initially empty", () => {
      assert.isEmpty(aliceGSet.value);
      assert.isEmpty(bobGSet.value);
    });

    describe("add", () => {
      it("works with non-concurrent updates", () => {
        aliceGSet.add("element");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceGSet.value, new Set(["element"]));
        assert.deepStrictEqual(bobGSet.value, new Set(["element"]));

        bobGSet.add(7);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceGSet.value, new Set(["element", 7]));
        assert.deepStrictEqual(bobGSet.value, new Set(["element", 7]));

        aliceGSet.add(7);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceGSet.value, new Set(["element", 7]));
        assert.deepStrictEqual(bobGSet.value, new Set(["element", 7]));
      });

      it("works with concurrent updates", () => {
        aliceGSet.add("first");
        assert.deepStrictEqual(aliceGSet.value, new Set(["first"]));
        assert.deepStrictEqual(bobGSet.value, new Set());

        bobGSet.add("second");
        assert.deepStrictEqual(aliceGSet.value, new Set(["first"]));
        assert.deepStrictEqual(bobGSet.value, new Set(["second"]));

        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceGSet.value, new Set(["first", "second"]));
        assert.deepStrictEqual(bobGSet.value, new Set(["first", "second"]));
      });
    });
  });

  describe("MultiValueRegister", () => {
    let aliceMvr: MultiValueRegister<string>;
    let bobMvr: MultiValueRegister<string>;

    beforeEach(() => {
      aliceMvr = new MultiValueRegister<string>(alice, "mvrId", "initial");
      bobMvr = new MultiValueRegister<string>(bob, "mvrId", "initial");
      if (debug) {
        addEventListeners(aliceMvr, "Alice");
        addEventListeners(bobMvr, "Bob");
      }
    });

    function addEventListeners<T>(
      mvr: MultiValueRegister<T>,
      name: string
    ): void {
      mvr.addEventListener("Mvr", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} set to ${
            (event as MvrEvent<T>).valueAdded
          }`
        )
      );
    }

    it('initially contains "initial"', () => {
      assert.deepStrictEqual(aliceMvr.valueSet, new Set(["initial"]));
      assert.deepStrictEqual(bobMvr.valueSet, new Set(["initial"]));
    });

    describe("setter", () => {
      it("works with non-concurrent updates", () => {
        aliceMvr.value = "second";
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.valueSet, new Set(["second"]));
        assert.deepStrictEqual(bobMvr.valueSet, new Set(["second"]));

        aliceMvr.value = "third";
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.valueSet, new Set(["third"]));
        assert.deepStrictEqual(bobMvr.valueSet, new Set(["third"]));

        bobMvr.value = "bob's";
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.valueSet, new Set(["bob's"]));
        assert.deepStrictEqual(bobMvr.valueSet, new Set(["bob's"]));
      });

      it("works with concurrent updates", () => {
        aliceMvr.value = "concA";
        bobMvr.value = "concB";
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.valueSet, new Set(["concA", "concB"]));
        assert.deepStrictEqual(bobMvr.valueSet, new Set(["concB", "concA"]));

        aliceMvr.value = "concA2";
        assert.deepStrictEqual(aliceMvr.valueSet, new Set(["concA2"]));
        bobMvr.value = "concB2";
        assert.deepStrictEqual(bobMvr.valueSet, new Set(["concB2"]));
        runtimeGen.releaseAll();
        assert.deepStrictEqual(
          aliceMvr.valueSet,
          new Set(["concA2", "concB2"])
        );
        assert.deepStrictEqual(bobMvr.valueSet, new Set(["concB2", "concA2"]));
      });

      it("merges redundant writes", () => {
        aliceMvr.value = "redundant";
        bobMvr.value = "redundant";
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.valueSet, new Set(["redundant"]));
        assert.deepStrictEqual(bobMvr.valueSet, new Set(["redundant"]));
      });

      it("keeps overwrites of redundant writes", () => {
        aliceMvr.value = "redundant";
        bobMvr.value = "redundant";
        aliceMvr.value = "overwrite";
        runtimeGen.releaseAll();
        assert.deepStrictEqual(
          aliceMvr.valueSet,
          new Set(["redundant", "overwrite"])
        );
        assert.deepStrictEqual(
          bobMvr.valueSet,
          new Set(["redundant", "overwrite"])
        );
      });
    });

    describe("reset", () => {
      it("works with non-concurrent updates", () => {
        aliceMvr.reset();
        assert.deepStrictEqual(aliceMvr.valueSet, new Set(["initial"]));

        bobMvr.value = "conc";
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceMvr.valueSet, new Set(["conc"]));
        assert.deepStrictEqual(bobMvr.valueSet, new Set(["conc"]));
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
      aliceLww = new LwwRegister<string>(alice, "lwwId", "initial");
      bobLww = new LwwRegister<string>(bob, "lwwId", "initial");
      if (debug) {
        addEventListeners(aliceLww, "Alice");
        addEventListeners(bobLww, "Bob");
      }
    });

    function addEventListeners<T>(lww: LwwRegister<T>, name: string): void {
      lww.addEventListener("Lww", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} set to ${
            (event as LwwEvent<string>).value
          }`
        )
      );
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
      it("works with non-concurrent reset", () => {
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
