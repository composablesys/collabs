import { assert } from "chai";
import {
  AddWinsCSet,
  Runtime,
  FalseWinsCBoolean,
  TrueWinsCBoolean,
  JsonCrdt,
  JsonCursor,
  LwwCMap,
  LwwCRegister,
  MergingMutCMap,
  CNumber,
  MNumber,
  TestingNetworkGenerator,
  DeletingMutCSet,
  CMapDeleteEvent,
  CMapSetEvent,
  CCounter,
} from "../../src";
import { debug } from "../debug";
import seedrandom from "seedrandom";

describe("standard", () => {
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

  describe("TrueWinsCBoolean", () => {
    let aliceFlag: TrueWinsCBoolean;
    let bobFlag: TrueWinsCBoolean;

    beforeEach(() => {
      aliceFlag = alice.registerCrdt("ewFlagId", new TrueWinsCBoolean());
      bobFlag = bob.registerCrdt("ewFlagId", new TrueWinsCBoolean());
      if (debug) {
        addEventListeners(aliceFlag, "Alice");
        addEventListeners(bobFlag, "Bob");
      }
    });

    function addEventListeners(flag: TrueWinsCBoolean, name: string): void {
      flag.on("Change", (event, caller) => {
        if (caller.value) {
          console.log(`${name}: ${event.timestamp.getSender()} enabled`);
        } else {
          console.log(`${name}: ${event.timestamp.getSender()} disabled`);
        }
      });
    }

    it("is initially false", () => {
      assert.isFalse(aliceFlag.value);
      assert.isFalse(bobFlag.value);
    });

    it("works with non-concurrent updates", () => {
      aliceFlag.value = true;
      assert.isTrue(aliceFlag.value);
      assert.isFalse(bobFlag.value);

      runtimeGen.releaseAll();
      assert.isTrue(aliceFlag.value);
      assert.isTrue(bobFlag.value);

      aliceFlag.value = false;
      assert.isFalse(aliceFlag.value);
      assert.isTrue(bobFlag.value);

      runtimeGen.releaseAll();
      assert.isFalse(aliceFlag.value);
      assert.isFalse(bobFlag.value);
    });

    it("works with non-concurrent updates", () => {
      aliceFlag.value = true;
      bobFlag.value = false;
      assert.isTrue(aliceFlag.value);
      assert.isFalse(bobFlag.value);

      // Enable wins
      runtimeGen.releaseAll();
      assert.isTrue(aliceFlag.value);
      assert.isTrue(bobFlag.value);
    });

    describe("enable", () => {
      it("emits a Set event", async () => {
        const promise = Promise.all([
          aliceFlag.nextEvent("Set"),
          bobFlag.nextEvent("Set"),
        ]);

        aliceFlag.value = true;
        runtimeGen.releaseAll();

        await promise;
      });
    });

    describe("disable", () => {
      it("emits a Set event", async () => {
        aliceFlag.value = true;
        runtimeGen.releaseAll();

        const promise = Promise.all([
          aliceFlag.nextEvent("Set"),
          bobFlag.nextEvent("Set"),
        ]);

        aliceFlag.value = false;
        runtimeGen.releaseAll();

        await promise;
      });
    });
  });

  describe("FalseWinsCBoolean", () => {
    let aliceFlag: FalseWinsCBoolean;
    let bobFlag: FalseWinsCBoolean;

    beforeEach(() => {
      aliceFlag = alice.registerCrdt("dwFlagId", new FalseWinsCBoolean());
      bobFlag = bob.registerCrdt("dwFlagId", new FalseWinsCBoolean());
      if (debug) {
        addEventListeners(aliceFlag, "Alice");
        addEventListeners(bobFlag, "Bob");
      }
    });

    function addEventListeners(flag: FalseWinsCBoolean, name: string): void {
      flag.on("Change", (event, caller) => {
        if (caller.value) {
          console.log(`${name}: ${event.timestamp.getSender()} enabled`);
        } else {
          console.log(`${name}: ${event.timestamp.getSender()} disabled`);
        }
      });
    }

    it("is initially true", () => {
      assert.isTrue(aliceFlag.value);
      assert.isTrue(bobFlag.value);
    });

    it("works with non-concurrent updates", () => {
      bobFlag.value = true;
      runtimeGen.releaseAll();
      assert.isTrue(aliceFlag.value);
      assert.isTrue(bobFlag.value);

      aliceFlag.value = false;
      runtimeGen.releaseAll();
      assert.isFalse(aliceFlag.value);
      assert.isFalse(bobFlag.value);
    });

    it("works with non-concurrent updates", () => {
      aliceFlag.value = true;
      bobFlag.value = false;
      assert.isTrue(aliceFlag.value);
      assert.isFalse(bobFlag.value);

      // Disable wins
      runtimeGen.releaseAll();
      assert.isFalse(aliceFlag.value);
      assert.isFalse(bobFlag.value);
    });

    describe("enable", () => {
      it("emits a Set event", async () => {
        aliceFlag.value = false;
        runtimeGen.releaseAll();

        const promise = Promise.all([
          aliceFlag.nextEvent("Set"),
          bobFlag.nextEvent("Set"),
        ]);

        aliceFlag.value = true;
        runtimeGen.releaseAll();

        await promise;
      });
    });

    describe("disable", () => {
      it("emits a Set event", async () => {
        const promise = Promise.all([
          aliceFlag.nextEvent("Set"),
          bobFlag.nextEvent("Set"),
        ]);

        aliceFlag.value = false;
        runtimeGen.releaseAll();

        await promise;
      });
    });
  });

  describe("Number", () => {
    let aliceNumber: CNumber;
    let bobNumber: CNumber;

    beforeEach(() => init(0));

    function init(initialValue: number, name = "numberId"): void {
      aliceNumber = alice.registerCrdt(name, new CNumber(initialValue));
      bobNumber = bob.registerCrdt(name, new CNumber(initialValue));
      if (debug) {
        addEventListeners(aliceNumber, "Alice");
        addEventListeners(bobNumber, "Bob");
      }
    }

    function addEventListeners(number: CNumber, name: string): void {
      number.on("Add", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${event.arg}`
        )
      );

      number.on("Mult", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} multed ${event.arg}`
        )
      );
      // number.on("Reset", (event) =>
      //   console.log(
      //     `${name}: ${event.timestamp.getSender()} reset ${event.timestamp.getSender()}`
      //   )
      // );
    }

    it("is initially 0", () => {
      assert.strictEqual(aliceNumber.value, 0);
      assert.strictEqual(bobNumber.value, 0);
    });

    describe("add", () => {
      it("works with non-concurrent updates", () => {
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

    // describe("reset", () => {
    //   it("resets to the initial value", () => {
    //     aliceNumber.add(1);
    //     aliceNumber.reset();
    //     runtimeGen.releaseAll();
    //     assert.strictEqual(aliceNumber.value, 0);
    //     assert.strictEqual(bobNumber.value, 0);
    //   });
    //
    //   it("works with non-concurrent updates", () => {
    //     aliceNumber.add(3);
    //     runtimeGen.releaseAll();
    //     assert.strictEqual(aliceNumber.value, 3);
    //     assert.strictEqual(bobNumber.value, 3);
    //
    //     aliceNumber.reset();
    //     aliceNumber.add(11);
    //     runtimeGen.releaseAll();
    //     assert.strictEqual(aliceNumber.value, 11);
    //     assert.strictEqual(bobNumber.value, 11);
    //   });
    //
    //   it("lets concurrent adds survive", () => {
    //     aliceNumber.reset();
    //     bobNumber.add(10);
    //     runtimeGen.releaseAll();
    //     assert.strictEqual(aliceNumber.value, 10);
    //     assert.strictEqual(bobNumber.value, 10);
    //   });
    // });

    describe("strongReset", () => {
      it.skip("works with non-concurrent updates", () => {
        // bobNumber.strongReset();
        // runtimeGen.releaseAll();
        // assert.strictEqual(aliceNumber.value, 0);
        // assert.strictEqual(bobNumber.value, 0);
        //
        // aliceNumber.add(6);
        // runtimeGen.releaseAll();
        // assert.strictEqual(aliceNumber.value, 6);
        // assert.strictEqual(bobNumber.value, 6);
      });

      it.skip("does not let concurrent add survive", () => {
        // aliceNumber.strongReset();
        // bobNumber.add(20);
        // runtimeGen.releaseAll();
        // assert.strictEqual(aliceNumber.value, 0);
        // assert.strictEqual(bobNumber.value, 0);
      });
    });

    // it("works with lots of concurrency", () => {
    //   aliceNumber.add(3);
    //   bobNumber.add(7);
    //   aliceNumber.reset();
    //   runtimeGen.release(bob);
    //   assert.strictEqual(aliceNumber.value, 7);
    //   assert.strictEqual(bobNumber.value, 7);
    //
    //   // TODO
    //   // bobNumber.strongReset();
    //   // runtimeGen.releaseAll();
    //   // assert.strictEqual(aliceNumber.value, 0);
    //   // assert.strictEqual(bobNumber.value, 0);
    // });
  });

  describe("Multiple Ops Number", () => {
    let aliceNumber: MNumber;
    let bobNumber: MNumber;

    beforeEach(() => init(0));

    function init(initialValue: number, name = "numberId"): void {
      aliceNumber = alice.registerCrdt(name, new MNumber(initialValue));
      bobNumber = bob.registerCrdt(name, new MNumber(initialValue));
      if (debug) {
        addEventListeners(aliceNumber, "Alice");
        addEventListeners(bobNumber, "Bob");
      }
    }

    function addEventListeners(number: MNumber, name: string): void {
      number.on("Add", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${event.added}`
        )
      );

      number.on("Mult", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} multed ${event.multed}`
        )
      );

      number.on("Min", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} minned ${event.compared}`
        )
      );

      number.on("Max", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} maxed ${event.compared}`
        )
      );
    }

    it("is initially 0", () => {
      assert.strictEqual(aliceNumber.value, 0);
      assert.strictEqual(bobNumber.value, 0);
    });

    describe("add", () => {
      it("works with non-concurrent updates", () => {
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
        aliceNumber.add(3);
        bobNumber.add(-4);
        assert.strictEqual(aliceNumber.value, 3);
        assert.strictEqual(bobNumber.value, -4);

        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, -1);
        assert.strictEqual(bobNumber.value, -1);
      });
    });

    describe("multiple ops", () => {
      it("works with non-concurrent updates", () => {
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

    // describe("reset", () => {
    //   it("resets to the initial value", () => {
    //     aliceNumber.add(1);
    //     aliceNumber.reset();
    //     runtimeGen.releaseAll();
    //     assert.strictEqual(aliceNumber.value, 0);
    //     assert.strictEqual(bobNumber.value, 0);
    //   });

    //   it("works with non-concurrent updates", () => {
    //     aliceNumber.add(3);
    //     runtimeGen.releaseAll();
    //     assert.strictEqual(aliceNumber.value, 3);
    //     assert.strictEqual(bobNumber.value, 3);

    //     aliceNumber.reset();
    //     aliceNumber.add(11);
    //     runtimeGen.releaseAll();
    //     assert.strictEqual(aliceNumber.value, 11);
    //     assert.strictEqual(bobNumber.value, 11);
    //   });

    //   it("lets concurrent adds survive", () => {
    //     aliceNumber.reset();
    //     bobNumber.add(10);
    //     runtimeGen.releaseAll();
    //     assert.strictEqual(aliceNumber.value, 10);
    //     assert.strictEqual(bobNumber.value, 10);
    //   });
    // });
  });

  describe("AddWinsCSet", () => {
    let aliceSet: AddWinsCSet<string>;
    let bobSet: AddWinsCSet<string>;

    beforeEach(() => {
      aliceSet = alice.registerCrdt("awSetId", new AddWinsCSet());
      bobSet = bob.registerCrdt("awSetId", new AddWinsCSet());
      if (debug) {
        addEventListeners(aliceSet, "Alice");
        addEventListeners(bobSet, "Bob");
      }
    });

    function addEventListeners(set: AddWinsCSet<string>, name: string): void {
      set.on("Add", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${event.value}`
        )
      );
      set.on("Delete", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} deleted ${event.value}`
        )
      );
    }

    it("is initially empty", () => {
      assert.deepStrictEqual(new Set(aliceSet), new Set());
      assert.deepStrictEqual(new Set(bobSet), new Set());
    });

    describe("add", () => {
      it("works with non-concurrent updates", () => {
        aliceSet.add("element");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["element"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["element"]));

        bobSet.add("7");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["element", "7"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["element", "7"]));

        aliceSet.add("7");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["element", "7"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["element", "7"]));
      });

      it("works with concurrent updates", () => {
        aliceSet.add("first");
        assert.deepStrictEqual(new Set(aliceSet), new Set(["first"]));
        assert.deepStrictEqual(new Set(bobSet), new Set([]));

        bobSet.add("second");
        assert.deepStrictEqual(new Set(aliceSet), new Set(["first"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["second"]));

        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["first", "second"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["first", "second"]));
      });
    });

    describe("delete", () => {
      it("deletes existing elements", () => {
        aliceSet.add("element");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["element"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["element"]));

        aliceSet.delete("element");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set([]));
        assert.deepStrictEqual(new Set(bobSet), new Set([]));
      });

      it("does not delete non-existing elements", () => {
        bobSet.delete("nonexistent");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set([]));
        assert.deepStrictEqual(new Set(bobSet), new Set([]));
      });

      it("does not delete concurrently added elements", () => {
        // Adds win over deletes
        aliceSet.add("concurrent");
        aliceSet.delete("concurrent");
        bobSet.add("concurrent");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["concurrent"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["concurrent"]));
      });
    });

    describe("strongDelete", () => {
      it.skip("deletes existing elements", () => {
        // aliceSet.add("element");
        // runtimeGen.releaseAll();
        // assert.deepStrictEqual(new Set(aliceSet), new Set(["element"]));
        // assert.deepStrictEqual(new Set(bobSet), new Set(["element"]));
        //
        // aliceSet.strongDelete("element");
        // runtimeGen.releaseAll();
        // assert.deepStrictEqual(new Set(aliceSet), new Set([]));
        // assert.deepStrictEqual(new Set(bobSet), new Set([]));
      });

      it.skip("does not delete non-existing elements", () => {
        // bobSet.strongDelete("nonexistent");
        // runtimeGen.releaseAll();
        // assert.deepStrictEqual(new Set(aliceSet), new Set([]));
        // assert.deepStrictEqual(new Set(bobSet), new Set([]));
      });

      it.skip("deletes concurrently added elements", () => {
        // // Deletes win over adds
        // aliceSet.add("concurrent");
        // aliceSet.strongDelete("concurrent");
        // bobSet.add("concurrent");
        // runtimeGen.releaseAll();
        // assert.deepStrictEqual(new Set(aliceSet), new Set([]));
        // assert.deepStrictEqual(new Set(bobSet), new Set([]));
      });
    });

    describe("reset", () => {
      it("lets concurrent adds survive", () => {
        bobSet.add("first");
        bobSet.add("second");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["first", "second"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["first", "second"]));

        bobSet.reset();
        aliceSet.add("survivor");
        assert.deepStrictEqual(
          new Set(aliceSet),
          new Set(["survivor", "first", "second"])
        );
        assert.deepStrictEqual(new Set(bobSet), new Set([]));

        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["survivor"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["survivor"]));
      });
    });

    // TODO: test strong reset once it is implemented.
    //   describe("strongReset", () => {
    //     it("does not let concurrent adds survive", () => {
    //       bobSet.add("first");
    //       bobSet.add("second");
    //       runtimeGen.releaseAll();
    //       assert.deepStrictEqual(new Set(aliceSet), new Set(["first", "second"]));
    //       assert.deepStrictEqual(new Set(bobSet), new Set(["first", "second"]));
    //
    //       bobSet.strongReset();
    //       aliceSet.add("survivor");
    //       assert.deepStrictEqual(new Set(aliceSet), new Set(["survivor"]));
    //       assert.deepStrictEqual(new Set(bobSet), new Set([]));
    //
    //       runtimeGen.releaseAll();
    //       assert.deepStrictEqual(new Set(aliceSet), new Set([]));
    //       assert.deepStrictEqual(new Set(bobSet), new Set([]));
    //     });
    //   });
    describe("gc", () => {
      it.skip("garbage collects deleted entries", async () => {
        for (let i = 0; i < 100; i++) {
          aliceSet.add(i + "");
        }
        runtimeGen.releaseAll();
        for (let i = 0; i < 100; i++) {
          if (i < 50) aliceSet.delete(i + "");
          else bobSet.delete(i + "");
        }
        runtimeGen.releaseAll();
        // TODO: use memtest to force gc
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // @ts-ignore private
        assert.strictEqual(aliceSet.booleanMap.size, 0);
        // @ts-ignore flagMap is private
        assert.strictEqual(bobSet.booleanMap.size, 0);
      });

      it("does not garbage collect non-deleted entries", async () => {
        for (let i = 0; i < 100; i++) {
          aliceSet.add(i + "");
        }
        runtimeGen.releaseAll();
        // Check nothing has happened synchronously
        assert.strictEqual(aliceSet.size, 100);
        assert.strictEqual(bobSet.size, 100);
        // @ts-ignore flagMap is private
        assert.strictEqual(aliceSet.booleanMap.size, 100);
        // @ts-ignore flagMap is private
        assert.strictEqual(bobSet.booleanMap.size, 100);

        // TODO: Wait for GC to actually run
        await new Promise((resolve) => setTimeout(resolve, 1000));
        assert.strictEqual(aliceSet.size, 100);
        assert.strictEqual(bobSet.size, 100);
        // @ts-ignore flagMap is private
        assert.strictEqual(aliceSet.booleanMap.size, 100);
        // @ts-ignore flagMap is private
        assert.strictEqual(bobSet.booleanMap.size, 100);
      });
    });
  });

  describe("MergingMutCMap", () => {
    let aliceMap: MergingMutCMap<string, CCounter>;
    let bobMap: MergingMutCMap<string, CCounter>;

    beforeEach(() => {
      const valueConstructor = () => new CCounter();
      aliceMap = alice.registerCrdt(
        "map",
        new MergingMutCMap(valueConstructor)
      );
      bobMap = bob.registerCrdt("map", new MergingMutCMap(valueConstructor));
      if (debug) {
        addEventListeners(aliceMap, "Alice");
        addEventListeners(bobMap, "Bob");
      }
    });

    function addEventListeners<K, V extends Object | null>(
      map: MergingMutCMap<any, any>,
      name: string
    ): void {
      // TODO: add listeners once map supports them.
    }

    it("is initially empty", () => {
      assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
      assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
    });

    describe("set", () => {
      it("works with non-concurrent updates", () => {
        aliceMap.set("test");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["test"]));
      });
    });

    describe("has", () => {
      it("returns true if the key is in the map", () => {
        aliceMap.set("test");
        assert.isTrue(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));

        runtimeGen.releaseAll();
        assert.isTrue(aliceMap.has("test"));
        assert.isTrue(bobMap.has("test"));
      });

      it("returns false if the key is not in the map", () => {
        aliceMap.set("test");
        assert.isFalse(aliceMap.has("not in map"));
        assert.isFalse(bobMap.has("not in map"));

        runtimeGen.releaseAll();
        assert.isFalse(aliceMap.has("not in map"));
        assert.isFalse(bobMap.has("not in map"));
      });
    });

    describe("get", () => {
      it("returns the value if the key is in the map", () => {
        aliceMap.set("test");
        runtimeGen.releaseAll();
        const aliceTest = aliceMap.get("test")!;
        const bobTest = bobMap.get("test")!;
        assert.isOk(aliceTest);
        assert.isOk(bobTest);
        assert.strictEqual(aliceTest.value, 0);
        assert.strictEqual(bobTest.value, 0);
      });

      it("returns undefined if the key is not in the map", () => {
        aliceMap.set("test");
        runtimeGen.releaseAll();
        const aliceTest = aliceMap.get("not in map");
        const bobTest = bobMap.get("not in map");
        assert.isUndefined(aliceTest);
        assert.isUndefined(bobTest);
      });

      it("returns a CRDT that can be modified", () => {
        aliceMap.set("test");
        runtimeGen.releaseAll();
        const aliceTest = aliceMap.get("test")!;
        const bobTest = bobMap.get("test")!;
        aliceTest.add(3);
        bobTest.add(4);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceTest.value, 7);
        assert.strictEqual(bobTest.value, 7);
      });
    });

    describe("delete", () => {
      it("deletes existing elements", () => {
        bobMap.set("test");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));

        bobMap.delete("test");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
        assert.isUndefined(aliceMap.get("test"));
        assert.isUndefined(bobMap.get("test"));
      });

      it("does not delete non-existing elements", () => {
        bobMap.delete("test");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
        assert.isUndefined(aliceMap.get("test"));
        assert.isUndefined(bobMap.get("test"));
      });

      it("lets concurrent value operation survive", () => {
        aliceMap.set("register");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["register"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["register"]));

        const bobRegister = bobMap.get("register");
        assert.isFalse(bobRegister === undefined);

        aliceMap.delete("register");
        bobRegister!.add(3);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["register"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["register"]));
        assert.strictEqual(bobRegister!.value, 3);

        const aliceRegister = aliceMap.get("register");
        assert.isFalse(aliceRegister === undefined);
        assert.strictEqual(aliceRegister!.value, 3);
      });
    });

    describe("reset", () => {
      let aliceRegister: CCounter;
      let bobRegister: CCounter;

      beforeEach(() => {
        aliceMap.set("register");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["register"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["register"]));

        bobRegister = bobMap.get("register")!;
        assert.isFalse(bobRegister === undefined);
        aliceRegister = aliceMap.get("register")!;
        assert.isFalse(aliceRegister === undefined);
      });

      it("lets concurrent add survive", () => {
        aliceMap.reset();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
        assert.strictEqual(aliceMap.get("register"), undefined);
        assert.strictEqual(aliceRegister!.value, 0);

        bobRegister!.add(5);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["register"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["register"]));
        assert.strictEqual(bobRegister!.value, 5);
        assert.strictEqual(aliceRegister, aliceMap.get("register"));
        assert.strictEqual(aliceRegister!.value, 5);
      });

      it("lets causally later op survive", () => {
        bobMap.reset();
        bobRegister.add(7);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["register"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["register"]));
        assert.strictEqual(bobRegister.value, 7);
        assert.strictEqual(aliceRegister, aliceMap.get("register"));
        assert.strictEqual(aliceRegister.value, 7);
      });
    });

    describe("value CRDT", () => {
      it("can be used as values in other CRDTs", () => {
        aliceMap.set("test");
        let aliceCounter = aliceMap.get("test")!;
        bobMap.set("test");
        let bobCounter = bobMap.get("test")!;
        runtimeGen.releaseAll();

        let aliceSet = alice.registerCrdt("valueSet", new AddWinsCSet());
        let bobSet = bob.registerCrdt("valueSet", new AddWinsCSet());

        aliceSet.add(aliceCounter);
        assert.strictEqual(aliceSet.has(aliceCounter), true);
        runtimeGen.releaseAll();
        assert.strictEqual(bobSet.has(bobCounter), true);
      });
    });
  });

  // TODO
  // describe("RuntimeCrdtGenerator", () => {
  //   let aliceGen: RuntimeCrdtGenerator<Number>;
  //   let bobGen: RuntimeCrdtGenerator<Number>;
  //   let aliceCounter: Number;
  //   let bobCounter: Number;
  //
  //   beforeEach(() => {
  //     const generator = (parent: Crdt, id: string, _: Uint8Array) =>
  //       new Number(parent, id);
  //     aliceGen = new RuntimeCrdtGenerator(alice, "gen", generator);
  //     bobGen = new RuntimeCrdtGenerator(bob, "gen", generator);
  //     aliceCounter = aliceGen.generate(new Uint8Array());
  //     bobGen.on("NewCrdt", (event) => (bobCounter = event.newCrdt));
  //   });
  //
  //   describe("generate", () => {
  //     it("generates CRDTs that work", () => {
  //       aliceCounter.add(7);
  //       runtimeGen.releaseAll();
  //       assert.strictEqual(aliceCounter.value, 7);
  //       assert.isNotNull(bobCounter);
  //       assert.strictEqual(bobCounter.value, 7);
  //     });
  //   });
  // });

  describe("LwwCMap", () => {
    let aliceMap: LwwCMap<string, number>;
    let bobMap: LwwCMap<string, number>;

    beforeEach(() => {
      aliceMap = alice.registerCrdt("lwwMap", new LwwCMap());
      bobMap = bob.registerCrdt("lwwMap", new LwwCMap());
      if (debug) {
        addEventListeners(aliceMap, "Alice");
        addEventListeners(bobMap, "Bob");
      }
    });

    function addEventListeners<K, V extends Object | null>(
      map: LwwCMap<any, any>,
      name: string
    ): void {
      // TODO: add listeners
    }

    it("is initially empty", () => {
      assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
      assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
      assert.deepStrictEqual(new Set(aliceMap.values()), new Set([]));
      assert.deepStrictEqual(new Set(bobMap.values()), new Set([]));
      assert.deepStrictEqual(new Set(aliceMap.entries()), new Set([]));
      assert.deepStrictEqual(new Set(bobMap.entries()), new Set([]));
    });

    describe("set", () => {
      it("works with non-concurrent updates", () => {
        aliceMap.set("test", 7);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["test"]));
        assert.deepStrictEqual(new Set(aliceMap.values()), new Set([7]));
        assert.deepStrictEqual(new Set(bobMap.values()), new Set([7]));
        assert.deepStrictEqual(
          new Set(aliceMap.entries()),
          new Set([["test", 7]])
        );
        assert.deepStrictEqual(
          new Set(bobMap.entries()),
          new Set([["test", 7]])
        );
      });
      it("emits right events", async () => {
        const promise = Promise.all([
          aliceMap.nextEvent("Set"),
          bobMap.nextEvent("Set"),
        ]);
        // function checkKeyAdd(event: KeyEvent<string>) {
        //   assert.strictEqual(event.key, "test");
        //   // TODO: this depends on the value getting through,
        //   // but it isn't set until after the add.
        //   // Will work once events are async.
        //   //assert.strictEqual(event.value, 7);
        // }
        // aliceMap.on("KeyAdd", checkKeyAdd);
        // bobMap.on("KeyAdd", checkKeyAdd);
        function checkValueChange(
          event: CMapSetEvent<string, number>,
          caller: LwwCMap<string, number>
        ) {
          assert.strictEqual(event.key, "test");
          assert.strictEqual(caller.get(event.key), 7);
        }
        aliceMap.on("Set", checkValueChange);
        bobMap.on("Set", checkValueChange);
        aliceMap.on("Delete", () =>
          assert.fail("Did not expect KeyDelete event from Alice")
        );
        bobMap.on("Delete", () => {
          assert.fail("Did not expect KeyDelete event from Bob");
        });

        aliceMap.set("test", 7);
        runtimeGen.releaseAll();

        await promise;
      });
    });

    describe("has", () => {
      it("returns true if the key is in the map", () => {
        aliceMap.set("test", 7);
        assert.isTrue(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));

        runtimeGen.releaseAll();
        assert.isTrue(aliceMap.has("test"));
        assert.isTrue(bobMap.has("test"));
      });

      it("returns false if the key is not in the map", () => {
        aliceMap.set("test", 7);
        assert.isFalse(aliceMap.has("not in map"));
        assert.isFalse(bobMap.has("not in map"));

        runtimeGen.releaseAll();
        assert.isFalse(aliceMap.has("not in map"));
        assert.isFalse(bobMap.has("not in map"));
      });
    });

    describe("get", () => {
      it("returns the value if the key is in the map", () => {
        aliceMap.set("test", 7);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceMap.get("test"), 7);
        assert.strictEqual(bobMap.get("test"), 7);
      });

      it("returns undefined if the key is not in the map", () => {
        aliceMap.set("test", 7);
        runtimeGen.releaseAll();
        assert.isUndefined(aliceMap.get("not in map"));
        assert.isUndefined(bobMap.get("not in map"));
      });
    });

    describe("delete", () => {
      it("deletes existing elements", () => {
        bobMap.set("test", 7);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));

        bobMap.delete("test");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
        assert.deepStrictEqual(new Set(aliceMap.values()), new Set([]));
        assert.deepStrictEqual(new Set(bobMap.values()), new Set([]));
        assert.deepStrictEqual(new Set(aliceMap.entries()), new Set([]));
        assert.deepStrictEqual(new Set(bobMap.entries()), new Set([]));
        assert.isUndefined(aliceMap.get("test"));
        assert.isUndefined(bobMap.get("test"));
      });

      it("does not delete non-existing elements", () => {
        bobMap.delete("test");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
        assert.deepStrictEqual(new Set(aliceMap.values()), new Set([]));
        assert.deepStrictEqual(new Set(bobMap.values()), new Set([]));
        assert.deepStrictEqual(new Set(aliceMap.entries()), new Set([]));
        assert.deepStrictEqual(new Set(bobMap.entries()), new Set([]));
        assert.isUndefined(aliceMap.get("test"));
        assert.isUndefined(bobMap.get("test"));
      });

      // TODO: for future observed-remove semantics,
      // this should no longer need the time interval
      it("lets later set survive", () => {
        aliceMap.set("register", 7);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["register"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["register"]));

        assert.strictEqual(bobMap.get("register"), 7);

        aliceMap.delete("register");
        let now = new Date().getTime();
        while (new Date().getTime() <= now) {
          // Loop; Bob will have a later time than now
        }
        bobMap.set("register", 3);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["register"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["register"]));
        assert.strictEqual(bobMap.get("register"), 3);
        assert.strictEqual(aliceMap.get("register"), 3);
      });

      it("emits right events", async () => {
        aliceMap.set("test", 7);
        runtimeGen.releaseAll();

        const promise = Promise.all([
          aliceMap.nextEvent("Delete"),
          bobMap.nextEvent("Delete"),
        ]);
        function checkKeyDelete(event: CMapDeleteEvent<string, number>) {
          assert.strictEqual(event.key, "test");
          // TODO: this depends on the value getting through,
          // but it isn't set until after the add.
          // Will work once events are async.
          //assert.strictEqual(event.value, 7);
        }
        aliceMap.on("Delete", checkKeyDelete);
        bobMap.on("Delete", checkKeyDelete);
        aliceMap.on("Set", () =>
          assert.fail("Did not expect Set event from Alice")
        );
        bobMap.on("Set", () => {
          assert.fail("Did not expect Set event from Bob");
        });
        // aliceMap.on("KeyAdd", () =>
        //   assert.fail("Did not expect KeyAdd event from Alice")
        // );
        // bobMap.on("KeyAdd", () => {
        //   assert.fail("Did not expect KeyAdd event from Bob");
        // });

        aliceMap.delete("test");
        runtimeGen.releaseAll();

        await promise;
      });
    });
    describe("gc", () => {
      it.skip("garbage collects deleted entries", async () => {
        for (let i = 0; i < 100; i++) {
          aliceMap.set(i + "", 10 * i);
        }
        runtimeGen.releaseAll();
        for (let i = 0; i < 100; i++) {
          if (i < 50) aliceMap.delete(i + "");
          else bobMap.delete(i + "");
        }
        runtimeGen.releaseAll();
        // TODO: use memtest to force gc
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // @ts-ignore internalMap is private
        assert.strictEqual(aliceMap.internalMap.size, 0);
        // @ts-ignore internalMap is private
        assert.strictEqual(bobMap.internalMap.size, 0);
      });

      it("does not garbage collect non-deleted entries", async () => {
        for (let i = 0; i < 100; i++) {
          aliceMap.set(i + "", 10 * i);
        }
        runtimeGen.releaseAll();
        // Check nothing has happened synchronously
        assert.strictEqual(aliceMap.size, 100);
        assert.strictEqual(bobMap.size, 100);
        // @ts-ignore internalMap is private
        assert.strictEqual(aliceMap.internalMap.size, 100);
        // @ts-ignore internalMap is private
        assert.strictEqual(bobMap.internalMap.size, 100);

        // TODO: Wait for GC to actually run
        await new Promise((resolve) => setTimeout(resolve, 1000));
        assert.strictEqual(aliceMap.size, 100);
        assert.strictEqual(bobMap.size, 100);
        // @ts-ignore internalMap is private
        assert.strictEqual(aliceMap.internalMap.size, 100);
        // @ts-ignore internalMap is private
        assert.strictEqual(bobMap.internalMap.size, 100);
      });
    });
  });

  describe("JsonCrdt", () => {
    let aliceJson: JsonCrdt;
    let aliceCursor: JsonCursor;
    let bobJson: JsonCrdt;
    let bobCursor: JsonCursor;

    beforeEach(() => {
      let aliceCrdt = new JsonCrdt();
      let bobCrdt = new JsonCrdt();
      aliceCursor = new JsonCursor(aliceCrdt);
      bobCursor = new JsonCursor(bobCrdt);
      aliceJson = alice.registerCrdt("cursor", aliceCrdt);
      bobJson = bob.registerCrdt("cursor", bobCrdt);
    });

    it("is initially empty", () => {
      assert.isEmpty(aliceCursor.keys());
      assert.isEmpty(bobCursor.keys());
      assert.isEmpty(aliceCursor.values());
      assert.isEmpty(bobCursor.values());
    });

    describe("add non-nested objects", () => {
      it("works with non-concurrent updates", () => {
        aliceCursor.set("test", 9);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceCursor.keys(), ["test"]);
        assert.deepStrictEqual(aliceCursor.values(), [9]);
        assert.deepStrictEqual(bobCursor.keys(), ["test"]);
        assert.deepStrictEqual(bobCursor.values(), [9]);
      });

      it("works with concurrent updates", () => {
        aliceCursor.set("test", 9);
        bobCursor.set("test", "testString");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceCursor.keys(), ["test"]);
        assert.deepStrictEqual(
          new Set(aliceCursor.get("test")),
          new Set([9, "testString"])
        );
        assert.deepStrictEqual(bobCursor.keys(), ["test"]);
        assert.deepStrictEqual(
          new Set(bobCursor.get("test")),
          new Set([9, "testString"])
        );

        bobCursor.set("test", 10);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceCursor.keys(), ["test"]);
        assert.deepStrictEqual(aliceCursor.get("test"), [10]);
        assert.deepStrictEqual(bobCursor.keys(), ["test"]);
        assert.deepStrictEqual(bobCursor.get("test"), [10]);
      });
    });

    describe("add nested objects", () => {
      it("works with non-concurrent updates", () => {
        bobCursor.setIsMap("testNested");
        runtimeGen.releaseAll();

        assert.lengthOf(aliceCursor.get("testNested"), 1);
        assert.lengthOf(bobCursor.get("testNested"), 1);
        assert.typeOf(aliceCursor.get("testNested")[0], "object");
        assert.typeOf(bobCursor.get("testNested")[0], "object");

        let aliceCursorNested = aliceCursor.get("testNested")[0] as JsonCursor;
        let bobCursorNested = bobCursor.get("testNested")[0] as JsonCursor;
        assert.deepStrictEqual(aliceCursorNested.keys(), []);
        assert.deepStrictEqual(bobCursorNested.keys(), []);

        aliceCursorNested.set("nestedVal", 20);
        runtimeGen.releaseAll();

        assert.deepStrictEqual(aliceCursorNested.keys(), ["nestedVal"]);
        assert.deepStrictEqual(aliceCursorNested.values(), [20]);
        assert.deepStrictEqual(bobCursorNested.keys(), ["nestedVal"]);
        assert.deepStrictEqual(bobCursorNested.values(), [20]);
      });

      it("works with concurrent updates", () => {
        aliceCursor.set("testNested", 7);
        bobCursor.setIsMap("testNested");
        runtimeGen.releaseAll();

        assert.lengthOf(aliceCursor.get("testNested"), 2);
        assert.lengthOf(bobCursor.get("testNested"), 2);

        aliceCursor.setIsMap("testNested");
        runtimeGen.releaseAll();

        assert.lengthOf(aliceCursor.get("testNested"), 1);
        assert.lengthOf(bobCursor.get("testNested"), 1);
        assert.typeOf(aliceCursor.get("testNested")[0], "object");
        assert.typeOf(bobCursor.get("testNested")[0], "object");

        let aliceCursorNested = aliceCursor.get("testNested")[0] as JsonCursor;
        let bobCursorNested = bobCursor.get("testNested")[0] as JsonCursor;
        assert.deepStrictEqual(aliceCursorNested.keys(), []);
        assert.deepStrictEqual(bobCursorNested.keys(), []);

        aliceCursorNested.set("nestedValNum", 20);
        bobCursorNested.set("nestedValString", "string");
        runtimeGen.releaseAll();

        assert.deepStrictEqual(
          new Set(aliceCursorNested.keys()),
          new Set(["nestedValNum", "nestedValString"])
        );
        assert.deepStrictEqual(aliceCursorNested.get("nestedValNum"), [20]);
        assert.deepStrictEqual(aliceCursorNested.get("nestedValString"), [
          "string",
        ]);
        assert.deepStrictEqual(
          new Set(aliceCursorNested.values()),
          new Set([20, "string"])
        );
        assert.deepStrictEqual(
          new Set(bobCursorNested.keys()),
          new Set(["nestedValNum", "nestedValString"])
        );
        assert.deepStrictEqual(bobCursorNested.get("nestedValNum"), [20]);
        assert.deepStrictEqual(bobCursorNested.get("nestedValString"), [
          "string",
        ]);
        assert.deepStrictEqual(
          new Set(bobCursorNested.values()),
          new Set([20, "string"])
        );

        // Test that keys only returns keys for top level of Json object
        assert.deepStrictEqual(aliceCursor.keys(), ["testNested"]);
        assert.deepStrictEqual(bobCursor.keys(), ["testNested"]);
      });
    });

    describe("delete non-nested objects", () => {
      it("works with non-concurrent updates", () => {
        aliceCursor.set("test", 9);
        runtimeGen.releaseAll();

        bobCursor.delete("test");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceCursor.get("test"), []);
        assert.deepStrictEqual(bobCursor.get("test"), []);
      });

      it("works with concurrent updates", () => {
        aliceCursor.set("testNum", 9);
        bobCursor.set("testStr", "string");
        runtimeGen.releaseAll();

        aliceCursor.delete("testStr");
        bobCursor.set("testNum", 10);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceCursor.keys(), ["testNum"]);
        assert.deepStrictEqual(aliceCursor.get("testNum"), [10]);
        assert.deepStrictEqual(bobCursor.keys(), ["testNum"]);
        assert.deepStrictEqual(bobCursor.get("testNum"), [10]);
      });
    });

    describe("delete nested objects", () => {
      it("works with non-concurrent updates", () => {
        bobCursor.setIsMap("testNested");
        runtimeGen.releaseAll();

        let aliceCursorNested = aliceCursor.get("testNested")[0] as JsonCursor;
        let bobCursorNested = bobCursor.get("testNested")[0] as JsonCursor;

        aliceCursorNested.set("nestedVal", 20);
        runtimeGen.releaseAll();

        bobCursor.set("non-nested", "string");
        bobCursor.delete("testNested");
        runtimeGen.releaseAll();

        assert.deepStrictEqual(aliceCursorNested.keys(), []);
        assert.deepStrictEqual(aliceCursorNested.values(), []);
        assert.deepStrictEqual(bobCursorNested.keys(), []);
        assert.deepStrictEqual(bobCursorNested.values(), []);

        assert.deepStrictEqual(aliceCursor.keys(), ["non-nested"]);
        assert.deepStrictEqual(aliceCursor.values(), ["string"]);
        assert.deepStrictEqual(bobCursor.keys(), ["non-nested"]);
        assert.deepStrictEqual(bobCursor.values(), ["string"]);
      });

      it("works with concurrent updates", () => {
        aliceCursor.setIsMap("testNested");
        bobCursor.set("non-nested", 16);
        runtimeGen.releaseAll();

        assert.deepStrictEqual(
          new Set(aliceCursor.keys()),
          new Set(["testNested", "non-nested"])
        );
        assert.includeDeepMembers(aliceCursor.values(), [16]);
        assert.deepStrictEqual(
          new Set(bobCursor.keys()),
          new Set(["testNested", "non-nested"])
        );
        assert.includeDeepMembers(bobCursor.values(), [16]);

        let aliceCursorNested = aliceCursor.get("testNested")[0] as JsonCursor;
        let bobCursorNested = bobCursor.get("testNested")[0] as JsonCursor;

        bobCursorNested.set("nestedValString", "string");
        runtimeGen.releaseAll();

        aliceCursorNested.set("nestedValNum", 20);
        bobCursor.delete("testNested");
        runtimeGen.releaseAll();

        assert.deepStrictEqual(aliceCursorNested.keys(), ["nestedValNum"]);
        assert.deepStrictEqual(aliceCursorNested.values(), [20]);
        assert.deepStrictEqual(bobCursorNested.keys(), ["nestedValNum"]);
        assert.deepStrictEqual(bobCursorNested.values(), [20]);

        // Internally, 'testNested' -> {} is removed
        assert.deepStrictEqual(
          new Set(aliceCursor.keys()),
          new Set(["non-nested"])
          // new Set(["testNested", "non-nested"])
        );
        assert.deepStrictEqual(
          new Set(bobCursor.keys()),
          new Set(["non-nested"])
          // new Set(["testNested", "non-nested"])
        );
      });
    });
  });

  describe("DeletingMutCSet", () => {
    let aliceSource: DeletingMutCSet<CNumber, []>;
    let bobSource: DeletingMutCSet<CNumber, []>;
    let aliceRegister: LwwCRegister<CNumber | undefined>;
    let bobRegister: LwwCRegister<CNumber | undefined>;

    beforeEach(() => {
      aliceSource = alice.registerCrdt(
        "source",
        new DeletingMutCSet(() => new CNumber())
      );
      bobSource = bob.registerCrdt(
        "source",
        new DeletingMutCSet(() => new CNumber())
      );
      aliceRegister = alice.registerCrdt(
        "register",
        new LwwCRegister<CNumber | undefined>(undefined)
      );
      bobRegister = bob.registerCrdt(
        "register",
        new LwwCRegister<CNumber | undefined>(undefined)
      );
    });

    it("returns new Crdt", () => {
      let newCrdt = aliceSource.add();
      assert.strictEqual(newCrdt.value, 0);
    });

    it("transfers new Crdt via register", () => {
      aliceRegister.value = aliceSource.add();
      aliceRegister.value.add(7);
      assert.strictEqual(aliceRegister.value.value, 7);

      runtimeGen.releaseAll();
      assert.strictEqual(bobRegister.value!.value, 7);
    });

    it("allows sequential creation", () => {
      let new1 = aliceSource.add();
      let new2 = aliceSource.add();
      new1.add(7);
      new2.add(-3);
      assert.strictEqual(new1.value, 7);
      assert.strictEqual(new2.value, -3);
    });

    it("allows concurrent creation", () => {
      let new1 = aliceSource.add();
      let new2 = bobSource.add();
      new1.add(7);
      new2.add(-3);
      assert.strictEqual(new1.value, 7);
      assert.strictEqual(new2.value, -3);

      runtimeGen.releaseAll();
      assert.strictEqual(new1.value, 7);
      assert.strictEqual(new2.value, -3);

      aliceRegister.value = new1;
      runtimeGen.releaseAll();
      let new1Bob = bobRegister.value!;
      bobRegister.value = new2;
      runtimeGen.releaseAll();
      let new2Alice = aliceRegister.value!;
      assert.strictEqual(new1Bob.value, 7);
      assert.strictEqual(new2Alice.value, -3);
    });

    // TODO: test deletion, freezing, getDescendant
  });
});

//
// function testOrthogonal() {
//     console.log("testOrthogonal()...");
//
//     let aliceOrthogonal = new OrthogonalCrdt("orthogonalId", alice);
//     aliceOrthogonal.onchange = (event => console.log(
//         "Alice: " + event.timestamp.getSender() + " set to " +
//         event.description));
//     let bobOrthogonal = new OrthogonalCrdt("orthogonalId", bob);
//     bobOrthogonal.onchange = (event => console.log(
//         "Bob: " + event.timestamp.getSender() + " set to " +
//         event.description));
//     assert.deepStrictEqual(aliceOrthogonal.value, [0, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0, false]);
//
//     aliceOrthogonal.rotate(1);
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [1, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [1, false]);
//
//     aliceOrthogonal.rotate(10);
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [11 % (2*Math.PI), false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [11 % (2*Math.PI), false]);
//     aliceOrthogonal.rotate(-10);
//     runtimeGen.releaseAll();
//
//     bobOrthogonal.reflectHorizontalAxis();
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [2*Math.PI - 1, true]);
//     assert.deepStrictEqual(bobOrthogonal.value, [2*Math.PI - 1, true]);
//
//     aliceOrthogonal.rotate(1.5);
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [0.5, true]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0.5, true]);
//
//     bobOrthogonal.reflect(0.5);
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [0.5, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0.5, false]);
//
//     // Out of order tests
//     aliceOrthogonal.reset();
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [0, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0, false]);
//
//     aliceOrthogonal.rotate(Math.PI/2);
//     assert.deepStrictEqual(aliceOrthogonal.value, [Math.PI/2, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0, false]);
//
//     bobOrthogonal.reflectHorizontalAxis();
//     assert.deepStrictEqual(aliceOrthogonal.value, [Math.PI/2, false]);
//     assert.deepStrictEqual(bobOrthogonal.value, [0, true]);
//
//     runtimeGen.releaseAll();
//     assert.deepStrictEqual(aliceOrthogonal.value, [3*Math.PI/2, true]);
//     assert.deepStrictEqual(bobOrthogonal.value, [3*Math.PI/2, true]);
//     console.log("...ok");
// }
//
