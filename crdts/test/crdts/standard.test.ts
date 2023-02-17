import {
  CLazyMap,
  CollabID,
  EventEmitter,
  EventsRecord,
  InitToken,
  MapDeleteEvent,
  MapSetEvent,
  Optional,
} from "@collabs/core";
import { assert } from "chai";
import {
  CBoolean,
  CCounter,
  CMap,
  CRuntime,
  CSet,
  CValueMap,
  CValueSet,
  CVar,
  TestingRuntimes,
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

  describe("CBoolean", () => {
    let aliceFlag: CBoolean;
    let bobFlag: CBoolean;

    function addEventListeners(flag: CBoolean, name: string): void {
      flag.on("Set", (event, caller) => {
        if (caller.value) {
          console.log(`${name}: ${event.meta.senderID} enabled`);
        } else {
          console.log(`${name}: ${event.meta.senderID} disabled`);
        }
      });
    }

    describe("true wins", () => {
      beforeEach(() => {
        aliceFlag = alice.registerCollab(
          "ewFlagId",
          (init) => new CBoolean(init, { winner: true })
        );
        bobFlag = bob.registerCollab(
          "ewFlagId",
          (init) => new CBoolean(init, { winner: true })
        );
        if (debug) {
          addEventListeners(aliceFlag, "Alice");
          addEventListeners(bobFlag, "Bob");
        }
      });

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
            nextEvent(aliceFlag, "Set"),
            nextEvent(bobFlag, "Set"),
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
            nextEvent(aliceFlag, "Set"),
            nextEvent(bobFlag, "Set"),
          ]);

          aliceFlag.value = false;
          runtimeGen.releaseAll();

          await promise;
        });
      });
    });

    describe("false wins", () => {
      beforeEach(() => {
        aliceFlag = alice.registerCollab(
          "dwFlagId",
          (init) => new CBoolean(init, { winner: false, initialValue: true })
        );
        bobFlag = bob.registerCollab(
          "dwFlagId",
          (init) => new CBoolean(init, { winner: false, initialValue: true })
        );
        if (debug) {
          addEventListeners(aliceFlag, "Alice");
          addEventListeners(bobFlag, "Bob");
        }
      });

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
            nextEvent(aliceFlag, "Set"),
            nextEvent(bobFlag, "Set"),
          ]);

          aliceFlag.value = true;
          runtimeGen.releaseAll();

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
          runtimeGen.releaseAll();

          await promise;
        });
      });
    });
  });

  describe("CValueSet", () => {
    let aliceSet: CValueSet<string>;
    let bobSet: CValueSet<string>;

    beforeEach(() => {
      aliceSet = alice.registerCollab("awSetId", (init) => new CValueSet(init));
      bobSet = bob.registerCollab("awSetId", (init) => new CValueSet(init));
      if (debug) {
        addEventListeners(aliceSet, "Alice");
        addEventListeners(bobSet, "Bob");
      }
    });

    function addEventListeners(set: CValueSet<string>, name: string): void {
      set.on("Add", (event) =>
        console.log(`${name}: ${event.meta.senderID} added ${event.value}`)
      );
      set.on("Delete", (event) =>
        console.log(`${name}: ${event.meta.senderID} deleted ${event.value}`)
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

    describe("clear", () => {
      it("lets concurrent adds survive", () => {
        bobSet.add("first");
        bobSet.add("second");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceSet), new Set(["first", "second"]));
        assert.deepStrictEqual(new Set(bobSet), new Set(["first", "second"]));

        bobSet.clear();
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

      it.skip("does not garbage collect non-deleted entries", async () => {
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

  describe("CLazyMap", () => {
    let aliceMap: CLazyMap<string, CVar<number>>;
    let bobMap: CLazyMap<string, CVar<number>>;

    beforeEach(() => {
      const valueConstructor = (valueInitToken: InitToken) =>
        new CVar(valueInitToken, 0);
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

    function addEventListeners<K, V extends Object | null>(
      map: CLazyMap<any, any>,
      name: string
    ): void {
      // TODO: add listeners
    }

    it("is initially empty", () => {
      assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
      assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
    });

    describe("has", () => {
      it("returns true if the key is nontrivial", () => {
        aliceMap.get("test").value = 1; // Mutate it nontrivially
        assert.isTrue(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));

        runtimeGen.releaseAll();
        assert.isTrue(aliceMap.has("test"));
        assert.isTrue(bobMap.has("test"));
      });

      it("returns false if the key is trivial", () => {
        aliceMap.get("test"); // Don't actually mutate it
        assert.isFalse(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));

        runtimeGen.releaseAll();
        assert.isFalse(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));
      });
    });

    describe("get", () => {
      it("returns the value", () => {
        const aliceTest = aliceMap.get("test");
        const bobTest = bobMap.get("test");
        assert.isOk(aliceTest);
        assert.isOk(bobTest);
        assert.strictEqual(aliceTest.value, 0);
        assert.strictEqual(bobTest.value, 0);
      });

      it("returns a CRDT that can be modified", () => {
        aliceMap.set("test");
        runtimeGen.releaseAll();
        const aliceTest = aliceMap.get("test")!;
        const bobTest = bobMap.get("test")!;
        aliceTest.value = 3;
        bobTest.value = 4;
        runtimeGen.releaseAll();
        const winner = alice.replicaID < bob.replicaID ? 3 : 4;
        assert.strictEqual(aliceTest.value, winner);
        assert.strictEqual(bobTest.value, winner);
      });
    });

    describe("gc", () => {
      it("deletes elements that canGC", () => {
        bobMap.get("test").value = 1; // Make nontrivial.
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));

        bobMap.get("test").clear();
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
      });

      it("lets concurrent value operation survive", () => {
        aliceMap.get("variable").value = 1;
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));

        const bobVariable = bobMap.get("variable");

        aliceMap.get("variable").clear();
        bobVariable.value = 3;
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));
        assert.strictEqual(bobVariable.value, 3);

        const aliceVariable = aliceMap.get("variable");
        assert.strictEqual(aliceVariable.value, 3);
      });
    });

    describe("value CRDT", () => {
      it("CollabID can be used as values in other CRDTs", () => {
        let aliceSet = alice.registerCollab(
          "valueSet",
          (init) => new CValueSet(init)
        );
        let bobSet = bob.registerCollab(
          "valueSet",
          (init) => new CValueSet(init)
        );

        let aliceCounter = aliceMap.get("test");
        let bobCounter = bobMap.get("test");

        aliceSet.add(aliceMap.idOf(aliceCounter));
        assert.strictEqual(aliceSet.has(aliceMap.idOf(aliceCounter)), true);
        runtimeGen.releaseAll();
        assert.strictEqual(bobSet.has(bobMap.idOf(bobCounter)), true);
      });
    });
  });

  describe("CMap", () => {
    let aliceMap: CMap<string, CVar<number>, [number]>;
    let bobMap: CMap<string, CVar<number>, [number]>;

    beforeEach(() => {
      const valueConstructor = (
        valueInitToken: InitToken,
        _key: string,
        initialValue: number
      ) => new CVar(valueInitToken, initialValue);
      aliceMap = alice.registerCollab(
        "map",
        (init) => new CMap(init, valueConstructor)
      );
      bobMap = bob.registerCollab(
        "map",
        (init) => new CMap(init, valueConstructor)
      );
      if (debug) {
        addEventListeners(aliceMap, "Alice");
        addEventListeners(bobMap, "Bob");
      }
    });

    function addEventListeners<K, V extends Object | null>(
      map: CMap<any, any, any>,
      name: string
    ): void {
      // TODO: add listeners
    }

    it("is initially empty", () => {
      assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
      assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
    });

    describe("has", () => {
      it("returns true if the key is set", () => {
        aliceMap.set("test", 1);
        assert.isTrue(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));

        runtimeGen.releaseAll();
        assert.isTrue(aliceMap.has("test"));
        assert.isTrue(bobMap.has("test"));
      });

      it("returns false if the key is deleted", () => {
        aliceMap.set("test", 1);
        aliceMap.delete("test");
        runtimeGen.releaseAll();
        assert.isFalse(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));
      });
    });

    describe("get", () => {
      it("returns the value", () => {
        aliceMap.set("test", 1);
        runtimeGen.releaseAll();

        const aliceTest = aliceMap.get("test")!;
        const bobTest = bobMap.get("test")!;
        assert.isOk(aliceTest);
        assert.isOk(bobTest);
        assert.strictEqual(aliceTest.value, 1);
        assert.strictEqual(bobTest.value, 1);
      });

      it("returns a CRDT that can be modified", () => {
        aliceMap.set("test", 7);
        runtimeGen.releaseAll();
        const aliceTest = aliceMap.get("test")!;
        const bobTest = bobMap.get("test")!;
        aliceTest.value = 3;
        bobTest.value = 4;
        runtimeGen.releaseAll();
        const winner = alice.replicaID < bob.replicaID ? 3 : 4;
        assert.strictEqual(aliceTest.value, winner);
        assert.strictEqual(bobTest.value, winner);
      });
    });

    describe("delete", () => {
      it("does not delete elements that canGC", () => {
        bobMap.set("test", 1);
        bobMap.get("test")!.value = 3; // Make it nontrivial.
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));

        bobMap.get("test")!.clear();
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["test"]));
      });

      it("lets concurrent set survive", () => {
        aliceMap.set("variable", 1);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));

        aliceMap.delete("variable");
        bobMap.set("variable", 2);
        const bobVariable = bobMap.get("variable")!;
        bobVariable.value = 3;

        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));
        assert.strictEqual(bobVariable.value, 3);

        const aliceVariable = aliceMap.get("variable")!;
        assert.strictEqual(aliceVariable.value, 3);
      });
    });

    describe("value CRDT", () => {
      it("CollabID can be used as values in other CRDTs", () => {
        let aliceSet = alice.registerCollab(
          "valueSet",
          (init) => new CValueSet(init)
        );
        let bobSet = bob.registerCollab(
          "valueSet",
          (init) => new CValueSet(init)
        );

        aliceMap.set("test", 11);
        runtimeGen.releaseAll();

        let aliceCounter = aliceMap.get("test")!;
        let bobCounter = bobMap.get("test")!;

        aliceSet.add(aliceMap.idOf(aliceCounter));
        assert.strictEqual(aliceSet.has(aliceMap.idOf(aliceCounter)), true);
        runtimeGen.releaseAll();
        assert.strictEqual(bobSet.has(bobMap.idOf(bobCounter)), true);
      });
    });
  });

  describe("CValueMap", () => {
    let aliceMap: CValueMap<string, number>;
    let bobMap: CValueMap<string, number>;

    beforeEach(() => {
      aliceMap = alice.registerCollab("lwwMap", (init) => new CValueMap(init));
      bobMap = bob.registerCollab("lwwMap", (init) => new CValueMap(init));
      if (debug) {
        addEventListeners(aliceMap, "Alice");
        addEventListeners(bobMap, "Bob");
      }
    });

    function addEventListeners<K, V extends Object | null>(
      map: CValueMap<any, any>,
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
          event: MapSetEvent<string, number>,
          caller: CValueMap<string, number>
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
        aliceMap.set("variable", 7);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));

        assert.strictEqual(bobMap.get("variable"), 7);

        aliceMap.delete("variable");
        let now = new Date().getTime();
        while (new Date().getTime() <= now) {
          // Loop; Bob will have a later time than now
        }
        bobMap.set("variable", 3);
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["variable"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["variable"]));
        assert.strictEqual(bobMap.get("variable"), 3);
        assert.strictEqual(aliceMap.get("variable"), 3);
      });

      it("emits right events", async () => {
        aliceMap.set("test", 7);
        runtimeGen.releaseAll();

        const promise = Promise.all([
          nextEvent(aliceMap, "Delete"),
          nextEvent(bobMap, "Delete"),
        ]);
        function checkKeyDelete(event: MapDeleteEvent<string, number>) {
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

      it.skip("does not garbage collect non-deleted entries", async () => {
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

  describe("CSet", () => {
    let aliceSource: CSet<CCounter, []>;
    let bobSource: CSet<CCounter, []>;
    let aliceVariable: CVar<Optional<CollabID<CCounter>>>;
    let bobVariable: CVar<Optional<CollabID<CCounter>>>;

    beforeEach(() => {
      aliceSource = alice.registerCollab(
        "source",
        (init) =>
          new CSet(init, (valueInitToken) => new CCounter(valueInitToken))
      );
      bobSource = bob.registerCollab(
        "source",
        (init) =>
          new CSet(init, (valueInitToken) => new CCounter(valueInitToken))
      );
      aliceVariable = alice.registerCollab(
        "variable",
        (init) => new CVar(init, Optional.empty())
      );
      bobVariable = bob.registerCollab(
        "variable",
        (init) => new CVar(init, Optional.empty())
      );
    });

    it("returns new Collab", () => {
      let newCollab = aliceSource.add();
      assert.strictEqual(newCollab.value, 0);
    });

    it("transfers new Collab via variable", () => {
      aliceVariable.set(Optional.of(aliceSource.idOf(aliceSource.add())));
      aliceSource.fromID(aliceVariable.value.get())!.add(7);
      assert.strictEqual(
        aliceSource.fromID(aliceVariable.value.get())!.value,
        7
      );

      runtimeGen.releaseAll();
      assert.strictEqual(bobSource.fromID(bobVariable.value.get())!.value, 7);
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

      aliceVariable.set(Optional.of(aliceSource.idOf(new1)));
      runtimeGen.releaseAll();
      let new1Bob = bobSource.fromID(bobVariable.value.get())!;
      bobVariable.set(Optional.of(bobSource.idOf(new2)));
      runtimeGen.releaseAll();
      let new2Alice = aliceSource.fromID(aliceVariable.value.get())!;
      assert.strictEqual(new1Bob.value, 7);
      assert.strictEqual(new2Alice.value, -3);
    });

    // TODO: test deletion, freezing, getDescendant
  });
});
