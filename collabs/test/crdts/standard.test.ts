import { assert } from "chai";
import {
  AddWinsCSet,
  CRDTApp,
  FalseWinsCBoolean,
  TrueWinsCBoolean,
  LWWCMap,
  LWWCVariable,
  CNumber,
  TestingCRDTAppGenerator,
  DeletingMutCSet,
  CMapDeleteEvent,
  CMapSetEvent,
  InitToken,
  Pre,
  Optional,
  LazyMutCMap,
  ResettableCCounter,
  CollabSerializer,
  OptionalLWWCVariable,
} from "../../src";
import { debug } from "../debug";
import seedrandom = require("seedrandom");

describe("standard", () => {
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

  describe("TrueWinsCBoolean", () => {
    let aliceFlag: TrueWinsCBoolean;
    let bobFlag: TrueWinsCBoolean;

    beforeEach(() => {
      aliceFlag = alice.registerCollab("ewFlagId", Pre(TrueWinsCBoolean)());
      bobFlag = bob.registerCollab("ewFlagId", Pre(TrueWinsCBoolean)());
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceFlag, "Alice");
        addEventListeners(bobFlag, "Bob");
      }
    });

    function addEventListeners(flag: TrueWinsCBoolean, name: string): void {
      flag.on("Set", (event, caller) => {
        if (caller.value) {
          console.log(`${name}: ${event.meta.sender} enabled`);
        } else {
          console.log(`${name}: ${event.meta.sender} disabled`);
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

      appGen.releaseAll();
      assert.isTrue(aliceFlag.value);
      assert.isTrue(bobFlag.value);

      aliceFlag.value = false;
      assert.isFalse(aliceFlag.value);
      assert.isTrue(bobFlag.value);

      appGen.releaseAll();
      assert.isFalse(aliceFlag.value);
      assert.isFalse(bobFlag.value);
    });

    it("works with non-concurrent updates", () => {
      aliceFlag.value = true;
      bobFlag.value = false;
      assert.isTrue(aliceFlag.value);
      assert.isFalse(bobFlag.value);

      // Enable wins
      appGen.releaseAll();
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
        appGen.releaseAll();

        await promise;
      });
    });

    describe("disable", () => {
      it("emits a Set event", async () => {
        aliceFlag.value = true;
        appGen.releaseAll();

        const promise = Promise.all([
          aliceFlag.nextEvent("Set"),
          bobFlag.nextEvent("Set"),
        ]);

        aliceFlag.value = false;
        appGen.releaseAll();

        await promise;
      });
    });
  });

  describe("FalseWinsCBoolean", () => {
    let aliceFlag: FalseWinsCBoolean;
    let bobFlag: FalseWinsCBoolean;

    beforeEach(() => {
      aliceFlag = alice.registerCollab("dwFlagId", Pre(FalseWinsCBoolean)());
      bobFlag = bob.registerCollab("dwFlagId", Pre(FalseWinsCBoolean)());
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceFlag, "Alice");
        addEventListeners(bobFlag, "Bob");
      }
    });

    function addEventListeners(flag: FalseWinsCBoolean, name: string): void {
      flag.on("Set", (event, caller) => {
        if (caller.value) {
          console.log(`${name}: ${event.meta.sender} enabled`);
        } else {
          console.log(`${name}: ${event.meta.sender} disabled`);
        }
      });
    }

    it("is initially true", () => {
      assert.isTrue(aliceFlag.value);
      assert.isTrue(bobFlag.value);
    });

    it("works with non-concurrent updates", () => {
      bobFlag.value = true;
      appGen.releaseAll();
      assert.isTrue(aliceFlag.value);
      assert.isTrue(bobFlag.value);

      aliceFlag.value = false;
      appGen.releaseAll();
      assert.isFalse(aliceFlag.value);
      assert.isFalse(bobFlag.value);
    });

    it("works with non-concurrent updates", () => {
      aliceFlag.value = true;
      bobFlag.value = false;
      assert.isTrue(aliceFlag.value);
      assert.isFalse(bobFlag.value);

      // Disable wins
      appGen.releaseAll();
      assert.isFalse(aliceFlag.value);
      assert.isFalse(bobFlag.value);
    });

    describe("enable", () => {
      it("emits a Set event", async () => {
        aliceFlag.value = false;
        appGen.releaseAll();

        const promise = Promise.all([
          aliceFlag.nextEvent("Set"),
          bobFlag.nextEvent("Set"),
        ]);

        aliceFlag.value = true;
        appGen.releaseAll();

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
        appGen.releaseAll();

        await promise;
      });
    });
  });

  describe("Number", () => {
    let aliceNumber: CNumber;
    let bobNumber: CNumber;

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

  describe("AddWinsCSet", () => {
    let aliceSet: AddWinsCSet<string>;
    let bobSet: AddWinsCSet<string>;

    beforeEach(() => {
      aliceSet = alice.registerCollab("awSetId", Pre(AddWinsCSet)());
      bobSet = bob.registerCollab("awSetId", Pre(AddWinsCSet)());
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceSet, "Alice");
        addEventListeners(bobSet, "Bob");
      }
    });

    function addEventListeners(set: AddWinsCSet<string>, name: string): void {
      set.on("Add", (event) =>
        console.log(`${name}: ${event.meta.sender} added ${event.value}`)
      );
      set.on("Delete", (event) =>
        console.log(`${name}: ${event.meta.sender} deleted ${event.value}`)
      );
    }

    it("is initially empty", () => {
      assert.deepStrictEqual(new Set(aliceSet), new Set());
      assert.deepStrictEqual(new Set(bobSet), new Set());
    });

    describe("add", () => {
      it("works with non-concurrent updates", () => {
        aliceSet.add("element");
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["element"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["element"]));

        bobSet.add("7");
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["element", "7"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["element", "7"]));

        aliceSet.add("7");
        appGen.releaseAll();
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

        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["first", "second"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["first", "second"]));
      });
    });

    describe("delete", () => {
      it("deletes existing elements", () => {
        aliceSet.add("element");
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["element"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["element"]));

        aliceSet.delete("element");
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set([]));
        assert.deepStrictEqual(new Set(bobSet), new Set([]));
      });

      it("does not delete non-existing elements", () => {
        bobSet.delete("nonexistent");
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set([]));
        assert.deepStrictEqual(new Set(bobSet), new Set([]));
      });

      it("does not delete concurrently added elements", () => {
        // Adds win over deletes
        aliceSet.add("concurrent");
        aliceSet.delete("concurrent");
        bobSet.add("concurrent");
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["concurrent"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["concurrent"]));
      });
    });

    describe("clear", () => {
      it("lets concurrent adds survive", () => {
        bobSet.add("first");
        bobSet.add("second");
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["first", "second"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["first", "second"]));

        bobSet.clear();
        aliceSet.add("survivor");
        assert.deepStrictEqual(
          new Set(aliceSet),
          new Set(["survivor", "first", "second"])
        );
        assert.deepStrictEqual(new Set(bobSet), new Set([]));

        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["survivor"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["survivor"]));
      });
    });

    describe("gc", () => {
      it.skip("garbage collects deleted entries", async () => {
        for (let i = 0; i < 100; i++) {
          aliceSet.add(i + "");
        }
        appGen.releaseAll();
        for (let i = 0; i < 100; i++) {
          if (i < 50) aliceSet.delete(i + "");
          else bobSet.delete(i + "");
        }
        appGen.releaseAll();
        // TODO: use memtest to force gc
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // @ts-ignore private
        assert.strictEqual(aliceSet.booleanMap.size, 0);
        // @ts-ignore flagMap is private
        assert.strictEqual(bobSet.booleanMap.size, 0);
      });

      it.skip("does not garbage collect non-deleted entries", async () => {
        for (let i = 0; i < 100; i++) {
          aliceSet.add(i + "");
        }
        appGen.releaseAll();
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

  describe("LazyMutCMap", () => {
    let aliceMap: LazyMutCMap<string, ResettableCCounter>;
    let bobMap: LazyMutCMap<string, ResettableCCounter>;

    beforeEach(() => {
      const valueConstructor = (valueInitToken: InitToken) =>
        new ResettableCCounter(valueInitToken);
      aliceMap = alice.registerCollab(
        "map",
        Pre(LazyMutCMap)(valueConstructor)
      );
      bobMap = bob.registerCollab("map", Pre(LazyMutCMap)(valueConstructor));
      if (debug) {
        addEventListeners(aliceMap, "Alice");
        addEventListeners(bobMap, "Bob");
      }
    });

    function load() {
      alice.load(Optional.empty());
      bob.load(Optional.empty());
    }

    function addEventListeners<K, V extends Object | null>(
      map: LazyMutCMap<any, any>,
      name: string
    ): void {
      // TODO: add listeners
    }

    it("is initially empty", () => {
      load();
      assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
      assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
    });

    describe("has", () => {
      it("returns true if the key is nontrivial", () => {
        load();

        aliceMap.get("test").add(1); // Mutate it nontrivially
        assert.isTrue(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));

        appGen.releaseAll();
        assert.isTrue(aliceMap.has("test"));
        assert.isTrue(bobMap.has("test"));
      });

      it("returns false if the key is trivial", () => {
        load();

        aliceMap.get("test"); // Don't actually mutate it
        assert.isFalse(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));

        appGen.releaseAll();
        assert.isFalse(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));
      });
    });

    describe("get", () => {
      it("returns the value", () => {
        load();

        const aliceTest = aliceMap.get("test");
        const bobTest = bobMap.get("test");
        assert.isOk(aliceTest);
        assert.isOk(bobTest);
        assert.strictEqual(aliceTest.value, 0);
        assert.strictEqual(bobTest.value, 0);
      });

      it("returns a CRDT that can be modified", () => {
        load();

        aliceMap.set("test");
        appGen.releaseAll();
        const aliceTest = aliceMap.get("test")!;
        const bobTest = bobMap.get("test")!;
        aliceTest.add(3);
        bobTest.add(4);
        appGen.releaseAll();
        assert.strictEqual(aliceTest.value, 7);
        assert.strictEqual(bobTest.value, 7);
      });
    });

    describe("gc", () => {
      it("deletes elements that canGC", () => {
        load();

        bobMap.get("test").add(1); // Make nontrivial.
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));

        bobMap.get("test").reset();
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
      });

      it("lets concurrent value operation survive", () => {
        load();

        aliceMap.get("variable").add(1);
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));

        const bobVariable = bobMap.get("variable");

        aliceMap.get("variable").reset();
        bobVariable.add(3);
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));
        assert.strictEqual(bobVariable.value, 3);

        const aliceVariable = aliceMap.get("variable");
        assert.strictEqual(aliceVariable.value, 3);
      });
    });

    describe("value CRDT", () => {
      it("can be used as values in other CRDTs", () => {
        let aliceSet = alice.registerCollab(
          "valueSet",
          Pre(AddWinsCSet)(new CollabSerializer(aliceMap))
        );
        let bobSet = bob.registerCollab(
          "valueSet",
          Pre(AddWinsCSet)(new CollabSerializer(bobMap))
        );

        load();

        aliceMap.set("test");
        let aliceCounter = aliceMap.get("test")!;
        bobMap.set("test");
        let bobCounter = bobMap.get("test")!;
        appGen.releaseAll();

        aliceSet.add(aliceCounter);
        assert.strictEqual(aliceSet.has(aliceCounter), true);
        appGen.releaseAll();
        assert.strictEqual(bobSet.has(bobCounter), true);
      });
    });
  });

  describe("LWWCMap", () => {
    let aliceMap: LWWCMap<string, number>;
    let bobMap: LWWCMap<string, number>;

    beforeEach(() => {
      aliceMap = alice.registerCollab("lwwMap", Pre(LWWCMap)());
      bobMap = bob.registerCollab("lwwMap", Pre(LWWCMap)());
      alice.load(Optional.empty());
      bob.load(Optional.empty());
      if (debug) {
        addEventListeners(aliceMap, "Alice");
        addEventListeners(bobMap, "Bob");
      }
    });

    function addEventListeners<K, V extends Object | null>(
      map: LWWCMap<any, any>,
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
        appGen.releaseAll();
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
          caller: LWWCMap<string, number>
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
        appGen.releaseAll();

        await promise;
      });
    });

    describe("has", () => {
      it("returns true if the key is in the map", () => {
        aliceMap.set("test", 7);
        assert.isTrue(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));

        appGen.releaseAll();
        assert.isTrue(aliceMap.has("test"));
        assert.isTrue(bobMap.has("test"));
      });

      it("returns false if the key is not in the map", () => {
        aliceMap.set("test", 7);
        assert.isFalse(aliceMap.has("not in map"));
        assert.isFalse(bobMap.has("not in map"));

        appGen.releaseAll();
        assert.isFalse(aliceMap.has("not in map"));
        assert.isFalse(bobMap.has("not in map"));
      });
    });

    describe("get", () => {
      it("returns the value if the key is in the map", () => {
        aliceMap.set("test", 7);
        appGen.releaseAll();
        assert.strictEqual(aliceMap.get("test"), 7);
        assert.strictEqual(bobMap.get("test"), 7);
      });

      it("returns undefined if the key is not in the map", () => {
        aliceMap.set("test", 7);
        appGen.releaseAll();
        assert.isUndefined(aliceMap.get("not in map"));
        assert.isUndefined(bobMap.get("not in map"));
      });
    });

    describe("delete", () => {
      it("deletes existing elements", () => {
        bobMap.set("test", 7);
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));

        bobMap.delete("test");
        appGen.releaseAll();
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
        appGen.releaseAll();
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
        aliceMap.set("variable", 7);
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));

        assert.strictEqual(bobMap.get("variable"), 7);

        aliceMap.delete("variable");
        let now = new Date().getTime();
        while (new Date().getTime() <= now) {
          // Loop; Bob will have a later time than now
        }
        bobMap.set("variable", 3);
        appGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));
        assert.strictEqual(bobMap.get("variable"), 3);
        assert.strictEqual(aliceMap.get("variable"), 3);
      });

      it("emits right events", async () => {
        aliceMap.set("test", 7);
        appGen.releaseAll();

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
        appGen.releaseAll();

        await promise;
      });
    });
    describe("gc", () => {
      it.skip("garbage collects deleted entries", async () => {
        for (let i = 0; i < 100; i++) {
          aliceMap.set(i + "", 10 * i);
        }
        appGen.releaseAll();
        for (let i = 0; i < 100; i++) {
          if (i < 50) aliceMap.delete(i + "");
          else bobMap.delete(i + "");
        }
        appGen.releaseAll();
        // TODO: use memtest to force gc
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // @ts-ignore internalMap is private
        assert.strictEqual(aliceMap.internalMap.size, 0);
        // @ts-ignore internalMap is private
        assert.strictEqual(bobMap.internalMap.size, 0);
      });

      it.skip("does not garbage collect non-deleted entries", async () => {
        for (let i = 0; i < 100; i++) {
          aliceMap.set(i + "", 10 * i);
        }
        appGen.releaseAll();
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

  describe("DeletingMutCSet", () => {
    let aliceSource: DeletingMutCSet<CNumber, []>;
    let bobSource: DeletingMutCSet<CNumber, []>;
    let aliceVariable: OptionalLWWCVariable<CNumber>;
    let bobVariable: OptionalLWWCVariable<CNumber>;

    beforeEach(() => {
      aliceSource = alice.registerCollab(
        "source",
        Pre(DeletingMutCSet)((valueInitToken) => new CNumber(valueInitToken))
      );
      bobSource = bob.registerCollab(
        "source",
        Pre(DeletingMutCSet)((valueInitToken) => new CNumber(valueInitToken))
      );
      aliceVariable = alice.registerCollab(
        "variable",
        Pre(OptionalLWWCVariable)(new CollabSerializer(aliceSource))
      );
      bobVariable = bob.registerCollab(
        "variable",
        Pre(OptionalLWWCVariable)(new CollabSerializer(bobSource))
      );
      alice.load(Optional.empty());
      bob.load(Optional.empty());
    });

    it("returns new Collab", () => {
      let newCollab = aliceSource.add();
      assert.strictEqual(newCollab.value, 0);
    });

    it("transfers new Collab via variable", () => {
      aliceVariable.set(aliceSource.add());
      aliceVariable.value.get().add(7);
      assert.strictEqual(aliceVariable.value.get().value, 7);

      appGen.releaseAll();
      assert.strictEqual(bobVariable.value.get().value, 7);
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

      appGen.releaseAll();
      assert.strictEqual(new1.value, 7);
      assert.strictEqual(new2.value, -3);

      aliceVariable.set(new1);
      appGen.releaseAll();
      let new1Bob = bobVariable.value.get();
      bobVariable.set(new2);
      appGen.releaseAll();
      let new2Alice = aliceVariable.value.get();
      assert.strictEqual(new1Bob.value, 7);
      assert.strictEqual(new2Alice.value, -3);
    });

    // TODO: test deletion, freezing, getDescendant
  });
});
