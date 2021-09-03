import { assert } from "chai";
import { JsonCrdt, JsonCursor } from "../src/json_opt";
import { Pre, Runtime, TestingNetworkGenerator } from "compoventuals";
import seedrandom from "seedrandom";

describe("JsonCrdt", () => {
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

  let aliceJson: JsonCrdt;
  let aliceCursor: JsonCursor;
  let bobJson: JsonCrdt;
  let bobCursor: JsonCursor;

  beforeEach(() => {
    aliceJson = alice.registerCrdt("cursor", Pre(JsonCrdt)());
    bobJson = bob.registerCrdt("cursor", Pre(JsonCrdt)());
    aliceCursor = new JsonCursor(aliceJson);
    bobCursor = new JsonCursor(bobJson);
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
