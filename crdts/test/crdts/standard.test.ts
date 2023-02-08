import {
  CLazyMap,
  CMapDeleteEvent,
  CMapSetEvent,
  CollabID,
  CollabIDSerializer,
  EventEmitter,
  EventsRecord,
  InitToken,
  Optional,
  OptionalSerializer,
} from "@collabs/core";
import { assert } from "chai";
import {
  AddWinsCSet,
  CCounter,
  CRDTApp,
  CVar,
  DeletingMutCSet,
  FalseWinsCBoolean,
  LWWCMap,
  ResettableCCounter,
  TestingCRDTAppGenerator,
  TrueWinsCBoolean,
} from "../../src";
import { debug } from "../debug";
import seedrandom = require("seedrandom");

function nextEvent<Events extends EventsRecord, K extends keyof Events>(
  emitter: EventEmitter<Events>,
  eventName: keyof Events
) {
  return new Promise<K>((resolve) => {
    emitter.once(eventName, resolve);
  });
}

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
      aliceFlag = alice.registerCollab(
        "ewFlagId",
        (init) => new TrueWinsCBoolean(init)
      );
      bobFlag = bob.registerCollab(
        "ewFlagId",
        (init) => new TrueWinsCBoolean(init)
      );
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
          nextEvent(aliceFlag, "Set"),
          nextEvent(bobFlag, "Set"),
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
          nextEvent(aliceFlag, "Set"),
          nextEvent(bobFlag, "Set"),
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
      aliceFlag = alice.registerCollab(
        "dwFlagId",
        (init) => new FalseWinsCBoolean(init)
      );
      bobFlag = bob.registerCollab(
        "dwFlagId",
        (init) => new FalseWinsCBoolean(init)
      );
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
          nextEvent(aliceFlag, "Set"),
          nextEvent(bobFlag, "Set"),
        ]);

        aliceFlag.value = true;
        appGen.releaseAll();

        await promise;
      });
    });

    describe("disable", () => {
      it("emits a Set event", async () => {
        const promise = Promise.all([
          nextEvent(aliceFlag, "Set"),
          nextEvent(bobFlag, "Set"),
        ]);

        aliceFlag.value = false;
        appGen.releaseAll();

        await promise;
      });
    });
  });

  describe("AddWinsCSet", () => {
    let aliceSet: AddWinsCSet<string>;
    let bobSet: AddWinsCSet<string>;

    beforeEach(() => {
      aliceSet = alice.registerCollab(
        "awSetId",
        (init) => new AddWinsCSet(init)
      );
      bobSet = bob.registerCollab("awSetId", (init) => new AddWinsCSet(init));
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

  describe("CLazyMap", () => {
    let aliceMap: CLazyMap<string, ResettableCCounter>;
    let bobMap: CLazyMap<string, ResettableCCounter>;

    beforeEach(() => {
      const valueConstructor = (valueInitToken: InitToken) =>
        new ResettableCCounter(valueInitToken);
      aliceMap = alice.registerCollab(
        "map",
        (init) => new CLazyMap(init, valueConstructor)
      );
      bobMap = bob.registerCollab(
        "map",
        (init) => new CLazyMap(init, valueConstructor)
      );
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
      map: CLazyMap<any, any>,
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
          (init) => new AddWinsCSet(init, new CollabIDSerializer(aliceMap))
        );
        let bobSet = bob.registerCollab(
          "valueSet",
          (init) => new AddWinsCSet(init, new CollabIDSerializer(bobMap))
        );

        load();

        let aliceCounter = aliceMap.get("test");
        let bobCounter = bobMap.get("test");

        aliceSet.add(CollabID.of(aliceCounter, aliceMap));
        assert.strictEqual(
          aliceSet.has(CollabID.of(aliceCounter, aliceMap)),
          true
        );
        appGen.releaseAll();
        assert.strictEqual(bobSet.has(CollabID.of(bobCounter, bobMap)), true);
      });
    });
  });

  describe("LWWCMap", () => {
    let aliceMap: LWWCMap<string, number>;
    let bobMap: LWWCMap<string, number>;

    beforeEach(() => {
      aliceMap = alice.registerCollab("lwwMap", (init) => new LWWCMap(init));
      bobMap = bob.registerCollab("lwwMap", (init) => new LWWCMap(init));
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
          nextEvent(aliceMap, "Set"),
          nextEvent(bobMap, "Set"),
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
          nextEvent(aliceMap, "Delete"),
          nextEvent(bobMap, "Delete"),
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
    let aliceSource: DeletingMutCSet<CCounter, []>;
    let bobSource: DeletingMutCSet<CCounter, []>;
    let aliceVariable: CVar<Optional<CollabID<CCounter>>>;
    let bobVariable: CVar<Optional<CollabID<CCounter>>>;

    beforeEach(() => {
      aliceSource = alice.registerCollab(
        "source",
        (init) =>
          new DeletingMutCSet(
            init,
            (valueInitToken) => new CCounter(valueInitToken)
          )
      );
      bobSource = bob.registerCollab(
        "source",
        (init) =>
          new DeletingMutCSet(
            init,
            (valueInitToken) => new CCounter(valueInitToken)
          )
      );
      aliceVariable = alice.registerCollab(
        "variable",
        (init) =>
          new CVar(
            init,
            Optional.empty(),
            OptionalSerializer.getInstance(new CollabIDSerializer(aliceSource))
          )
      );
      bobVariable = bob.registerCollab(
        "variable",
        (init) =>
          new CVar(
            init,
            Optional.empty(),
            OptionalSerializer.getInstance(new CollabIDSerializer(bobSource))
          )
      );
      alice.load(Optional.empty());
      bob.load(Optional.empty());
    });

    it("returns new Collab", () => {
      let newCollab = aliceSource.add();
      assert.strictEqual(newCollab.value, 0);
    });

    it("transfers new Collab via variable", () => {
      aliceVariable.set(
        Optional.of(CollabID.of(aliceSource.add(), aliceSource))
      );
      aliceVariable.value.get().get()!.add(7);
      assert.strictEqual(aliceVariable.value.get().get()!.value, 7);

      appGen.releaseAll();
      assert.strictEqual(bobVariable.value.get().get()!.value, 7);
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

      aliceVariable.set(Optional.of(CollabID.of(new1, aliceSource)));
      appGen.releaseAll();
      let new1Bob = bobVariable.value.get().get()!;
      bobVariable.set(Optional.of(CollabID.of(new2, bobSource)));
      appGen.releaseAll();
      let new2Alice = aliceVariable.value.get().get()!;
      assert.strictEqual(new1Bob.value, 7);
      assert.strictEqual(new2Alice.value, -3);
    });

    // TODO: test deletion, freezing, getDescendant
  });
});
