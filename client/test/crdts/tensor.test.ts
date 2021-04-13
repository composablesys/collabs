import * as tf from "@tensorflow/tfjs-node";
import { assert } from "chai";
import { EventEmitter } from "../../src/utils/EventEmitter";
import { Crdt, CrdtRuntime } from "../../src/crdts";
import {
  conversions,
  TensorAverageCrdt,
  TensorCounterCrdt,
  TensorCounterEventsRecord,
  TensorGCounterCrdt,
} from "../../src/crdts/tensor";
import { TestingNetworkGenerator } from "../../src/network";
import { debug } from "../debug";

describe("tensor", () => {
  let runtimeGen: TestingNetworkGenerator;
  let alice: CrdtRuntime;
  let bob: CrdtRuntime;

  beforeEach(() => {
    runtimeGen = new TestingNetworkGenerator();
    alice = runtimeGen.newRuntime();
    bob = runtimeGen.newRuntime();
    tf.engine().startScope();
  });

  afterEach(() => {
    tf.engine().endScope();
  });

  function assertTensorIsNaN<R extends tf.Rank>(actual: tf.Tensor<R>): void {
    assert(
      tf.all(actual.isNaN()).arraySync() === 1,
      failedAssertionMessage(actual, NaN)
    );
  }

  function assertTensorsStrictEqual<R extends tf.Rank>(
    actual: tf.Tensor<R>,
    expected: tf.Tensor<R> | number
  ): void {
    assert(
      tf.all(actual.equal(expected)).arraySync() === 1,
      failedAssertionMessage(actual, expected)
    );
  }

  function assertTensorsApproxEqual<R extends tf.Rank>(
    actual: tf.Tensor<R>,
    expected: tf.Tensor<R> | number,
    epsilon: number = 0.0001
  ): void {
    assert(
      tf.all(actual.sub(expected).abs().lessEqual(epsilon)).arraySync() === 1,
      failedAssertionMessage(actual, expected)
    );
  }

  function failedAssertionMessage(
    actual: tf.Tensor,
    expected: tf.Tensor | number
  ): string {
    return (
      "Expected all values in a to equal b.\n" +
      `  a: ${actual.toString(true)}\n` +
      `  b: ${
        typeof expected === "number"
          ? `Tensor of ${expected}`
          : (expected as tf.Tensor).toString(true)
      }\n`
    );
  }

  function addEventListeners(
    crdt: EventEmitter<TensorCounterEventsRecord>,
    name: string
  ): void {
    crdt.on("Add", (event) =>
      console.log(
        `${name}: ${event.timestamp.getSender()} added ${event.valueAdded.toString()}`
      )
    );
  }

  describe("conversions", () => {
    it("converts tensors back to their original value", () => {
      const tensor1 = tf.zeros([2, 2], "float32").add(1);
      const message = conversions.tfToProtobuf.tensor(tensor1);
      const tensor2 = conversions.protobufToTF.tensor(message);
      assert.strictEqual(tensor1.dtype, "float32");
      assertTensorsStrictEqual(tensor1, tensor2);
    });
  });

  describe("TensorGCounter", function () {
    this.slow(1000); // tensor operations on large tensors can be slow
    const shape = [100, 20, 10];
    let aliceCounter: TensorGCounterCrdt;
    let bobCounter: TensorGCounterCrdt;

    beforeEach(() => {
      aliceCounter = alice
        .groupParent("")
        .addChild("counterId", new TensorGCounterCrdt(shape, "float32"));
      bobCounter = bob
        .groupParent("")
        .addChild("counterId", new TensorGCounterCrdt(shape, "float32"));
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    it("is initially all zero", () => {
      assertTensorsStrictEqual(aliceCounter.value, 0);
      assertTensorsStrictEqual(bobCounter.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        const tensor1 = tf.zeros(shape).add(1);
        const tensor2 = tf.zeros(shape).add(2);
        const tensor3 = tf.zeros(shape).add(3);

        aliceCounter.add(tensor1);
        runtimeGen.releaseAll();
        assertTensorsStrictEqual(aliceCounter.value, tensor1);
        assertTensorsStrictEqual(bobCounter.value, tensor1);

        bobCounter.add(tensor2);
        const expected1 = tensor1.add(tensor2);
        runtimeGen.releaseAll();
        assertTensorsStrictEqual(aliceCounter.value, expected1);
        assertTensorsStrictEqual(bobCounter.value, expected1);

        aliceCounter.add(tensor3);
        const expected2 = expected1.add(tensor3);
        runtimeGen.releaseAll();
        assertTensorsStrictEqual(aliceCounter.value, expected2);
        assertTensorsStrictEqual(bobCounter.value, expected2);
      });

      it("works for concurrent updates", () => {
        const tensor1 = tf.zeros(shape).add(10);
        const tensor2 = tf.zeros(shape).add(20);
        const sum = tensor1.add(tensor2);

        aliceCounter.add(tensor1);
        assertTensorsStrictEqual(aliceCounter.value, tensor1);
        assertTensorsStrictEqual(bobCounter.value, 0);

        bobCounter.add(tensor2);
        assertTensorsStrictEqual(aliceCounter.value, tensor1);
        assertTensorsStrictEqual(bobCounter.value, tensor2);

        runtimeGen.releaseAll();
        assertTensorsStrictEqual(aliceCounter.value, sum);
        assertTensorsStrictEqual(bobCounter.value, sum);
      });

      it("throws an error for tensors containing negative values", () => {
        assert.throws(() => aliceCounter.add(tf.zeros(shape).add(-1)));
      });
    });
  });

  describe("TensorCounter", function () {
    this.slow(1000); // tensor operations on large tensors can be slow
    const shape = [100, 100];
    let aliceCounter: TensorCounterCrdt;
    let bobCounter: TensorCounterCrdt;

    beforeEach(() => {
      aliceCounter = alice
        .groupParent("")
        .addChild("counterId", new TensorCounterCrdt(shape, "float32"));
      bobCounter = bob
        .groupParent("")
        .addChild("counterId", new TensorCounterCrdt(shape, "float32"));
      if (debug) {
        addEventListeners(aliceCounter, "Alice");
        addEventListeners(bobCounter, "Bob");
      }
    });

    it("is initially all zero", () => {
      assertTensorsStrictEqual(aliceCounter.value, 0);
      assertTensorsStrictEqual(bobCounter.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        const tensor1 = tf.zeros(shape).add(-1);
        const tensor2 = tf.zeros(shape).add(1);
        const tensor3 = tf.randomNormal(shape);

        aliceCounter.add(tensor1);
        runtimeGen.releaseAll();
        assertTensorsApproxEqual(aliceCounter.value, tensor1);
        assertTensorsApproxEqual(bobCounter.value, tensor1);

        bobCounter.add(tensor2);
        const expected1 = tensor1.add(tensor2);
        runtimeGen.releaseAll();
        assertTensorsApproxEqual(aliceCounter.value, expected1);
        assertTensorsApproxEqual(bobCounter.value, expected1);

        aliceCounter.add(tensor3);
        const expected2 = expected1.add(tensor3);
        runtimeGen.releaseAll();
        assertTensorsApproxEqual(aliceCounter.value, expected2);
        assertTensorsApproxEqual(bobCounter.value, expected2);
      });

      it("works for concurrent updates", () => {
        const tensor1 = tf.zeros(shape).add(2);
        const tensor2 = tf.zeros(shape).add(-1);
        const sum = tensor1.add(tensor2);

        aliceCounter.add(tensor1);
        assertTensorsStrictEqual(aliceCounter.value, tensor1);
        assertTensorsStrictEqual(bobCounter.value, 0);

        bobCounter.add(tensor2);
        assertTensorsStrictEqual(aliceCounter.value, tensor1);
        assertTensorsStrictEqual(bobCounter.value, tensor2);

        runtimeGen.releaseAll();
        assertTensorsStrictEqual(aliceCounter.value, sum);
        assertTensorsStrictEqual(bobCounter.value, sum);
      });
    });
  });

  describe("TensorAverage", function () {
    this.slow(1000); // tensor operations on large tensors can be slow
    const shape = [100, 100];
    let aliceAvg: TensorAverageCrdt;
    let bobAvg: TensorAverageCrdt;

    beforeEach(() => {
      aliceAvg = alice
        .groupParent("")
        .addChild("avgId", new TensorAverageCrdt(shape, "float32"));
      bobAvg = bob
        .groupParent("")
        .addChild("avgId", new TensorAverageCrdt(shape, "float32"));
      if (debug) {
        addEventListeners(aliceAvg, "Alice");
        addEventListeners(bobAvg, "Bob");
      }
    });

    it("initially returns a tensor containing NaN", () => {
      assertTensorIsNaN(aliceAvg.value);
      assertTensorIsNaN(bobAvg.value);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        const tensor1 = tf.zeros(shape).add(-1);
        const tensor2 = tf.zeros(shape).add(1);
        const tensor3 = tf.randomNormal(shape);

        aliceAvg.add(tensor1);
        runtimeGen.releaseAll();
        assertTensorsApproxEqual(aliceAvg.value, tensor1);
        assertTensorsApproxEqual(bobAvg.value, tensor1);

        bobAvg.add(tensor2);
        runtimeGen.releaseAll();
        assertTensorsApproxEqual(aliceAvg.value, 0);
        assertTensorsApproxEqual(bobAvg.value, 0);

        aliceAvg.add(tensor3);
        const expected = tensor1.add(tensor2).add(tensor3).div(3);
        runtimeGen.releaseAll();
        assertTensorsApproxEqual(aliceAvg.value, expected);
        assertTensorsApproxEqual(bobAvg.value, expected);
      });

      it("works for concurrent updates", () => {
        const tensor1 = tf.zeros(shape).add(3);
        const tensor2 = tf.zeros(shape).add(-1);

        aliceAvg.add(tensor1);
        assertTensorsStrictEqual(aliceAvg.value, tensor1);
        assertTensorIsNaN(bobAvg.value);

        bobAvg.add(tensor2);
        assertTensorsStrictEqual(aliceAvg.value, tensor1);
        assertTensorsStrictEqual(bobAvg.value, tensor2);

        runtimeGen.releaseAll();
        assertTensorsStrictEqual(aliceAvg.value, 1);
        assertTensorsStrictEqual(bobAvg.value, 1);
      });
    });
  });
});
