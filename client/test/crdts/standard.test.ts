import { assert } from "chai";
import {
  AddEvent,
  AddWinsSet,
  Crdt,
  CrdtRuntime,
  DisableWinsFlag,
  EnableWinsFlag,
  GSet,
  LwwMap,
  MapCrdt,
  NewCrdtEvent,
  NumberCrdt,
  RuntimeCrdtGenerator,
  SetAddEvent,
} from "../../src/crdts";
import { debug } from "../debug";

import { TestingNetworkGenerator } from "../testing_network";

describe("standard", () => {
  let runtimeGen: TestingNetworkGenerator;
  let alice: CrdtRuntime;
  let bob: CrdtRuntime;

  beforeEach(() => {
    runtimeGen = new TestingNetworkGenerator();
    alice = runtimeGen.newRuntime("alice");
    bob = runtimeGen.newRuntime("bob");
  });

  describe("EnableWinsFlag", () => {
    let aliceFlag: EnableWinsFlag;
    let bobFlag: EnableWinsFlag;

    beforeEach(() => {
      aliceFlag = new EnableWinsFlag(alice, "ewFlagId");
      bobFlag = new EnableWinsFlag(bob, "ewFlagId");
      if (debug) {
        addEventListeners(aliceFlag, "Alice");
        addEventListeners(bobFlag, "Bob");
      }
    });

    function addEventListeners(flag: EnableWinsFlag, name: string): void {
      flag.addEventListener("Enable", (event) =>
        console.log(`${name}: ${event.timestamp.getSender()} enabled`)
      );
      flag.addEventListener("Disable", (event) =>
        console.log(`${name}: ${event.timestamp.getSender()} disabled`)
      );
    }

    it("is initially false", () => {
      assert.isFalse(aliceFlag.enabled);
      assert.isFalse(bobFlag.enabled);
    });

    it("works with non-concurrent updates", () => {
      aliceFlag.enable();
      assert.isTrue(aliceFlag.enabled);
      assert.isFalse(bobFlag.enabled);

      runtimeGen.releaseAll();
      assert.isTrue(aliceFlag.enabled);
      assert.isTrue(bobFlag.enabled);

      aliceFlag.disable();
      assert.isFalse(aliceFlag.enabled);
      assert.isTrue(bobFlag.enabled);

      runtimeGen.releaseAll();
      assert.isFalse(aliceFlag.enabled);
      assert.isFalse(bobFlag.enabled);
    });

    it("works with non-concurrent updates", () => {
      aliceFlag.enable();
      bobFlag.disable();
      assert.isTrue(aliceFlag.enabled);
      assert.isFalse(bobFlag.enabled);

      // Enable wins
      runtimeGen.releaseAll();
      assert.isTrue(aliceFlag.enabled);
      assert.isTrue(bobFlag.enabled);
    });
  });

  describe("DisableWinsFlag", () => {
    let aliceFlag: DisableWinsFlag;
    let bobFlag: DisableWinsFlag;

    beforeEach(() => {
      aliceFlag = new DisableWinsFlag(alice, "ewFlagId");
      bobFlag = new DisableWinsFlag(bob, "ewFlagId");
      if (debug) {
        addEventListeners(aliceFlag, "Alice");
        addEventListeners(bobFlag, "Bob");
      }
    });

    function addEventListeners(flag: DisableWinsFlag, name: string): void {
      flag.addEventListener("Enable", (event) =>
        console.log(`${name}: ${event.timestamp.getSender()} enabled`)
      );
      flag.addEventListener("Disable", (event) =>
        console.log(`${name}: ${event.timestamp.getSender()} disabled`)
      );
    }

    it("is initially true", () => {
      assert.isTrue(aliceFlag.enabled);
      assert.isTrue(bobFlag.enabled);
    });

    it("works with non-concurrent updates", () => {
      bobFlag.enable();
      runtimeGen.releaseAll();
      assert.isTrue(aliceFlag.enabled);
      assert.isTrue(bobFlag.enabled);

      aliceFlag.disable();
      runtimeGen.releaseAll();
      assert.isFalse(aliceFlag.enabled);
      assert.isFalse(bobFlag.enabled);
    });

    it("works with non-concurrent updates", () => {
      aliceFlag.enable();
      bobFlag.disable();
      assert.isTrue(aliceFlag.enabled);
      assert.isFalse(bobFlag.enabled);

      // Disable wins
      runtimeGen.releaseAll();
      assert.isFalse(aliceFlag.enabled);
      assert.isFalse(bobFlag.enabled);
    });
  });

  describe("NumberCrdt", () => {
    let aliceNumber: NumberCrdt;
    let bobNumber: NumberCrdt;

    beforeEach(() => init(0));

    function init(initialValue: number): void {
      aliceNumber = new NumberCrdt(alice, "numberId", initialValue);
      bobNumber = new NumberCrdt(bob, "numberId", initialValue);
      if (debug) {
        addEventListeners(aliceNumber, "Alice");
        addEventListeners(bobNumber, "Bob");
      }
    }

    function addEventListeners(number: NumberCrdt, name: string): void {
      number.addEventListener("Add", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${
            (event as AddEvent).valueAdded
          }`
        )
      );

      number.addEventListener("Mult", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} multed ${
            (event as AddEvent).valueAdded
          }`
        )
      );
      number.addEventListener("Reset", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} reset ${event.timestamp.getSender()}`
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
        init(1);

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

    describe("reset", () => {
      it("resets to the initial value", () => {
        aliceNumber.add(1);
        aliceNumber.reset();
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 0);
        assert.strictEqual(bobNumber.value, 0);
      });

      it("works with non-concurrent updates", () => {
        aliceNumber.add(3);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 3);
        assert.strictEqual(bobNumber.value, 3);

        aliceNumber.reset();
        aliceNumber.add(11);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 11);
        assert.strictEqual(bobNumber.value, 11);
      });

      it("lets concurrent adds survive", () => {
        aliceNumber.reset();
        bobNumber.add(10);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 10);
        assert.strictEqual(bobNumber.value, 10);
      });
    });

    describe("strongReset", () => {
      it("works with non-concurrent updates", () => {
        bobNumber.strongReset();
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 0);
        assert.strictEqual(bobNumber.value, 0);

        aliceNumber.add(6);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 6);
        assert.strictEqual(bobNumber.value, 6);
      });

      it("does not let concurrent add survive", () => {
        aliceNumber.strongReset();
        bobNumber.add(20);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceNumber.value, 0);
        assert.strictEqual(bobNumber.value, 0);
      });
    });

    it("works with lots of concurrency", () => {
      aliceNumber.add(3);
      bobNumber.add(7);
      aliceNumber.reset();
      runtimeGen.release(bob);
      assert.strictEqual(aliceNumber.value, 7);
      assert.strictEqual(bobNumber.value, 7);

      bobNumber.strongReset();
      runtimeGen.releaseAll();
      assert.strictEqual(aliceNumber.value, 0);
      assert.strictEqual(bobNumber.value, 0);
    });
  });

  describe("AddWinsSet", () => {
    let aliceSet: AddWinsSet<string>;
    let bobSet: AddWinsSet<string>;

    beforeEach(() => {
      aliceSet = new AddWinsSet<string>(alice, "awSetId");
      bobSet = new AddWinsSet<string>(bob, "awSetId");
      if (debug) {
        addEventListeners(aliceSet, "Alice");
        addEventListeners(bobSet, "Bob");
      }
    });

    function addEventListeners(set: AddWinsSet<string>, name: string): void {
      set.addEventListener("SetAdd", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} added ${
            (event as SetAddEvent<string>).valueAdded
          }`
        )
      );
      set.addEventListener("SetDelete", (event) =>
        console.log(
          `${name}: ${event.timestamp.getSender()} deleted ${
            (event as SetAddEvent<string>).valueAdded
          }`
        )
      );
    }

    it("is initially empty", () => {
      assert.deepStrictEqual(aliceSet.value, new Set());
      assert.deepStrictEqual(bobSet.value, new Set());
    });

    describe("add", () => {
      it("works with non-concurrent updates", () => {
        aliceSet.add("element");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set(["element"]));
        assert.deepStrictEqual(bobSet.value, new Set(["element"]));

        bobSet.add("7");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set(["element", "7"]));
        assert.deepStrictEqual(bobSet.value, new Set(["element", "7"]));

        aliceSet.add("7");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set(["element", "7"]));
        assert.deepStrictEqual(bobSet.value, new Set(["element", "7"]));
      });

      it("works with concurrent updates", () => {
        aliceSet.add("first");
        assert.deepStrictEqual(aliceSet.value, new Set(["first"]));
        assert.deepStrictEqual(bobSet.value, new Set([]));

        bobSet.add("second");
        assert.deepStrictEqual(aliceSet.value, new Set(["first"]));
        assert.deepStrictEqual(bobSet.value, new Set(["second"]));

        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set(["first", "second"]));
        assert.deepStrictEqual(bobSet.value, new Set(["first", "second"]));
      });
    });

    describe("delete", () => {
      it("deletes existing elements", () => {
        aliceSet.add("element");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set(["element"]));
        assert.deepStrictEqual(bobSet.value, new Set(["element"]));

        aliceSet.delete("element");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set([]));
        assert.deepStrictEqual(bobSet.value, new Set([]));
      });

      it("does not delete non-existing elements", () => {
        bobSet.delete("nonexistent");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set([]));
        assert.deepStrictEqual(bobSet.value, new Set([]));
      });

      it("does not delete concurrently added elements", () => {
        // Adds win over deletes
        aliceSet.add("concurrent");
        aliceSet.delete("concurrent");
        bobSet.add("concurrent");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set(["concurrent"]));
        assert.deepStrictEqual(bobSet.value, new Set(["concurrent"]));
      });
    });

    describe("strongDelete", () => {
      it("deletes existing elements", () => {
        aliceSet.add("element");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set(["element"]));
        assert.deepStrictEqual(bobSet.value, new Set(["element"]));

        aliceSet.strongDelete("element");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set([]));
        assert.deepStrictEqual(bobSet.value, new Set([]));
      });

      it("does not delete non-existing elements", () => {
        bobSet.strongDelete("nonexistent");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set([]));
        assert.deepStrictEqual(bobSet.value, new Set([]));
      });

      it("deletes concurrently added elements", () => {
        // Deletes win over adds
        aliceSet.add("concurrent");
        aliceSet.strongDelete("concurrent");
        bobSet.add("concurrent");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(aliceSet.value, new Set([]));
        assert.deepStrictEqual(bobSet.value, new Set([]));
      });
    });

    // TODO: test reset once it is implemented.
    //
    //   describe("reset", () => {
    //     it("lets concurrent adds survive", () => {
    //       bobSet.add("first");
    //       bobSet.add("second");
    //       runtimeGen.releaseAll();
    //       assert.deepStrictEqual(aliceSet.value, new Set(["first", "second"]));
    //       assert.deepStrictEqual(bobSet.value, new Set(["first", "second"]));
    //
    //       bobSet.reset();
    //       aliceSet.add("survivor");
    //       assert.deepStrictEqual(aliceSet.value, new Set(["survivor"]));
    //       assert.deepStrictEqual(bobSet.value, new Set([]));
    //
    //       runtimeGen.releaseAll();
    //       assert.deepStrictEqual(aliceSet.value, new Set(["survivor"]));
    //       assert.deepStrictEqual(bobSet.value, new Set(["survivor"]));
    //     });
    //   });
    //
    //   describe("strongReset", () => {
    //     it("does not let concurrent adds survive", () => {
    //       bobSet.add("first");
    //       bobSet.add("second");
    //       runtimeGen.releaseAll();
    //       assert.deepStrictEqual(aliceSet.value, new Set(["first", "second"]));
    //       assert.deepStrictEqual(bobSet.value, new Set(["first", "second"]));
    //
    //       bobSet.strongReset();
    //       aliceSet.add("survivor");
    //       assert.deepStrictEqual(aliceSet.value, new Set(["survivor"]));
    //       assert.deepStrictEqual(bobSet.value, new Set([]));
    //
    //       runtimeGen.releaseAll();
    //       assert.deepStrictEqual(aliceSet.value, new Set([]));
    //       assert.deepStrictEqual(bobSet.value, new Set([]));
    //     });
    //   });
  });

  describe("MapCrdt", () => {
    let aliceMap: MapCrdt<string, NumberCrdt>;
    let bobMap: MapCrdt<string, NumberCrdt>;

    beforeEach(() => {
      const valueConstructor = (parent: Crdt, id: string, key: string) =>
        new NumberCrdt(parent, id);
      aliceMap = new MapCrdt(alice, "map", valueConstructor);
      bobMap = new MapCrdt(bob, "map", valueConstructor);
      if (debug) {
        addEventListeners(aliceMap, "Alice");
        addEventListeners(bobMap, "Bob");
      }
    });

    function addEventListeners<K, V extends Object | null>(
      map: MapCrdt<any, any>,
      name: string
    ): void {
      // TODO: add listeners once map supports them.
    }

    it("is initially empty", () => {
      assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
      assert.deepStrictEqual(new Set(bobMap.keys()), new Set([]));
    });

    describe("addKey", () => {
      it("works with non-concurrent updates", () => {
        aliceMap.addKey("test");
        runtimeGen.releaseAll();
        assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["test"]));
        assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["test"]));
      });
    });

    describe("has", () => {
      it("returns true if the key is in the map", () => {
        aliceMap.addKey("test");
        assert.isTrue(aliceMap.has("test"));
        assert.isFalse(bobMap.has("test"));

        runtimeGen.releaseAll();
        assert.isTrue(aliceMap.has("test"));
        assert.isTrue(bobMap.has("test"));
      });

      it("returns false if the key is not in the map", () => {
        aliceMap.addKey("test");
        assert.isFalse(aliceMap.has("not in map"));
        assert.isFalse(bobMap.has("not in map"));

        runtimeGen.releaseAll();
        assert.isFalse(aliceMap.has("not in map"));
        assert.isFalse(bobMap.has("not in map"));
      });
    });

    describe("get", () => {
      it("returns the value if the key is in the map", () => {
        aliceMap.addKey("test");
        runtimeGen.releaseAll();
        const aliceTest = aliceMap.get("test") as NumberCrdt;
        const bobTest = bobMap.get("test") as NumberCrdt;
        assert.isOk(aliceTest);
        assert.isOk(bobTest);
        assert.strictEqual(aliceTest.value, 0);
        assert.strictEqual(bobTest.value, 0);
      });

      it("returns undefined if the key is not in the map", () => {
        aliceMap.addKey("test");
        runtimeGen.releaseAll();
        const aliceTest = aliceMap.get("not in map") as NumberCrdt;
        const bobTest = bobMap.get("not in map") as NumberCrdt;
        assert.isUndefined(aliceTest);
        assert.isUndefined(bobTest);
      });

      it("returns a CRDT that can be modified", () => {
        aliceMap.addKey("test");
        runtimeGen.releaseAll();
        const aliceTest = aliceMap.get("test") as NumberCrdt;
        const bobTest = bobMap.get("test") as NumberCrdt;
        aliceTest.add(3);
        bobTest.add(4);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceTest.value, 7);
        assert.strictEqual(bobTest.value, 7);
      });
    });

    describe("delete", () => {
      it("deletes existing elements", () => {
        bobMap.addKey("test");
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

      // TODO: make this test pass.
      it.skip("lets concurrent add survive", () => {
        aliceMap.addKey("register");
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

    // TODO: uncomment once reset is implemented
    //
    // describe("reset", () => {
    //   let aliceRegister: NumberCrdt;
    //   let bobRegister: NumberCrdt;
    //
    //   beforeEach(() => {
    //     aliceMap.addKey("register");
    //     runtimeGen.releaseAll();
    //     assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["register"]));
    //     assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["register"]));
    //
    //     bobRegister = bobMap.get("register")!;
    //     assert.isFalse(bobRegister === undefined);
    //     aliceRegister = aliceMap.get("register")!;
    //     assert.isFalse(aliceRegister === undefined);
    //   });
    //
    //   it("lets concurrent add survive", () => {
    //     aliceMap.reset();
    //     assert.deepStrictEqual(new Set(aliceMap.keys()), new Set([]));
    //     assert.strictEqual(aliceMap.get("register"), undefined);
    //     assert.strictEqual(aliceRegister!.value, 0);
    //
    //     bobRegister!.add(5);
    //     runtimeGen.releaseAll();
    //     assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["register"]));
    //     assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["register"]));
    //     assert.strictEqual(bobRegister!.value, 5);
    //     assert.strictEqual(aliceRegister, aliceMap.get("register"));
    //     assert.strictEqual(aliceRegister!.value, 5);
    //   });
    //
    //   it("lets causally later op survive", () => {
    //     bobMap.reset();
    //     bobRegister.add(7);
    //     runtimeGen.releaseAll();
    //     assert.deepStrictEqual(new Set(aliceMap.keys()), new Set(["register"]));
    //     assert.deepStrictEqual(new Set(bobMap.keys()), new Set(["register"]));
    //     assert.strictEqual(bobRegister.value, 7);
    //     assert.strictEqual(aliceRegister, aliceMap.get("register"));
    //     assert.strictEqual(aliceRegister.value, 7);
    //   });
    // });

    describe("value CRDT", () => {
      it("can be used as values in other CRDTs", () => {
        let aliceCounter = aliceMap.getForce("test");
        let bobCounter = bobMap.getForce("test");
        runtimeGen.releaseAll();

        let aliceSet = new GSet<NumberCrdt>(alice, "valueSet");
        let bobSet = new GSet<NumberCrdt>(bob, "valueSet");

        aliceSet.add(aliceCounter);
        assert.strictEqual(aliceSet.has(aliceCounter), true);
        runtimeGen.releaseAll();
        assert.strictEqual(bobSet.has(bobCounter), true);
      });
    });
  });

  describe("RuntimeCrdtGenerator", () => {
    let aliceGen: RuntimeCrdtGenerator<NumberCrdt>;
    let bobGen: RuntimeCrdtGenerator<NumberCrdt>;
    let aliceCounter: NumberCrdt;
    let bobCounter: NumberCrdt;

    beforeEach(() => {
      const generator = (parent: Crdt, id: string, _: Uint8Array) =>
        new NumberCrdt(parent, id);
      aliceGen = new RuntimeCrdtGenerator(alice, "gen", generator);
      bobGen = new RuntimeCrdtGenerator(bob, "gen", generator);
      aliceCounter = aliceGen.generate(new Uint8Array());
      bobGen.addEventListener(
        "NewCrdt",
        (event) => (bobCounter = (event as NewCrdtEvent<NumberCrdt>).newCrdt)
      );
    });

    describe("generate", () => {
      it("generates CRDTs that work", () => {
        aliceCounter.add(7);
        runtimeGen.releaseAll();
        assert.strictEqual(aliceCounter.value, 7);
        assert.isNotNull(bobCounter);
        assert.strictEqual(bobCounter.value, 7);
      });
    });
  });

  describe("LwwMap", () => {
    let aliceMap: LwwMap<string, number>;
    let bobMap: LwwMap<string, number>;
    // TODO implement tests
    it("is initially empty");
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
