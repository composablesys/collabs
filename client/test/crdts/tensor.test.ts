import * as tf from "@tensorflow/tfjs-node";
import { assert } from "chai";
import { CrdtRuntime } from "../../src/crdts";
import { TensorCounterCrdt, TensorGCounterCrdt } from "../../src/crdts/tensor";
import { TestingNetworkGenerator } from "../../src/network";

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

  function assertTensorsEqual<R extends tf.Rank>(
    a: tf.Tensor<R>,
    b: tf.Tensor<R> | tf.TensorLike
  ): void {
    assert.strictEqual(
      tf.all(a.equal(b)).arraySync(),
      1,
      "Expected all values in a to equal b.\n" +
        `  a: ${a.toString(true)}` +
        `  b: ${
          typeof b === "number"
            ? `Tensor of ${b}`
            : (b as tf.Tensor).toString(true)
        }\n`
    );
  }

  describe("TensorGCounter", function () {
    this.slow(1000); // tensor operations on large tensors can be slow
    const shape = [100, 20, 10];
    let aliceCounter: TensorGCounterCrdt;
    let bobCounter: TensorGCounterCrdt;

    beforeEach(() => {
      aliceCounter = alice
        .groupParent("")
        .addChild("counterId", new TensorGCounterCrdt(shape));
      bobCounter = bob
        .groupParent("")
        .addChild("counterId", new TensorGCounterCrdt(shape));
    });

    it("is initially all zero", () => {
      assertTensorsEqual(aliceCounter.value, 0);
      assertTensorsEqual(bobCounter.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        const tensor1 = tf.zeros(shape).add(1);
        const tensor2 = tf.zeros(shape).add(2);
        const tensor3 = tf.zeros(shape).add(3);

        aliceCounter.add(tensor1);
        runtimeGen.releaseAll();
        assertTensorsEqual(aliceCounter.value, tensor1);
        assertTensorsEqual(bobCounter.value, tensor1);

        bobCounter.add(tensor2);
        const expected1 = tensor1.add(tensor2);
        runtimeGen.releaseAll();
        assertTensorsEqual(aliceCounter.value, expected1);
        assertTensorsEqual(bobCounter.value, expected1);

        aliceCounter.add(tensor3);
        const expected2 = expected1.add(tensor3);
        runtimeGen.releaseAll();
        assertTensorsEqual(aliceCounter.value, expected2);
        assertTensorsEqual(bobCounter.value, expected2);
      });

      it("works for concurrent updates", () => {
        const tensor1 = tf.zeros(shape).add(10);
        const tensor2 = tf.zeros(shape).add(20);
        const sum = tensor1.add(tensor2);

        aliceCounter.add(tensor1);
        assertTensorsEqual(aliceCounter.value, tensor1);
        assertTensorsEqual(bobCounter.value, 0);

        bobCounter.add(tensor2);
        assertTensorsEqual(aliceCounter.value, tensor1);
        assertTensorsEqual(bobCounter.value, tensor2);

        runtimeGen.releaseAll();
        assertTensorsEqual(aliceCounter.value, sum);
        assertTensorsEqual(bobCounter.value, sum);
      });

      it("throws an error for tensors containing negative values", () => {
        assert.throws(() => aliceCounter.add(tf.zeros(shape).add(-1)));
      });
    });
  });

  describe("TensorCounter", function () {
    this.slow(1000); // tensor operations on large tensors can be slow
    const shape = [2, 2];
    let aliceCounter: TensorCounterCrdt;
    let bobCounter: TensorCounterCrdt;

    beforeEach(() => {
      aliceCounter = alice
        .groupParent("")
        .addChild("counterId", new TensorCounterCrdt(shape));
      bobCounter = bob
        .groupParent("")
        .addChild("counterId", new TensorCounterCrdt(shape));
    });

    it("is initially all zero", () => {
      assertTensorsEqual(aliceCounter.value, 0);
      assertTensorsEqual(bobCounter.value, 0);
    });

    describe("add", () => {
      it("works for non-concurrent updates", () => {
        const tensor1 = tf.zeros(shape).add(-1);
        const tensor2 = tf.zeros(shape).add(1);
        const tensor3 = tf.randomNormal(shape);

        aliceCounter.add(tensor1);
        runtimeGen.releaseAll();
        assertTensorsEqual(aliceCounter.value, tensor1);
        assertTensorsEqual(bobCounter.value, tensor1);

        bobCounter.add(tensor2);
        const expected1 = tensor1.add(tensor2);
        runtimeGen.releaseAll();
        assertTensorsEqual(aliceCounter.value, expected1);
        assertTensorsEqual(bobCounter.value, expected1);

        aliceCounter.add(tensor3);
        const expected2 = expected1.add(tensor3);
        runtimeGen.releaseAll();
        assertTensorsEqual(aliceCounter.value, expected2);
        assertTensorsEqual(bobCounter.value, expected2);
      });

      it("works for concurrent updates", () => {
        const tensor1 = tf.zeros(shape).add(2);
        const tensor2 = tf.zeros(shape).add(-1);
        const sum = tensor1.add(tensor2);

        aliceCounter.add(tensor1);
        assertTensorsEqual(aliceCounter.value, tensor1);
        assertTensorsEqual(bobCounter.value, 0);

        bobCounter.add(tensor2);
        assertTensorsEqual(aliceCounter.value, tensor1);
        assertTensorsEqual(bobCounter.value, tensor2);

        runtimeGen.releaseAll();
        assertTensorsEqual(aliceCounter.value, sum);
        assertTensorsEqual(bobCounter.value, sum);
      });
    });
  });
});
