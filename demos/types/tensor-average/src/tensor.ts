import {
  CObject,
  CollabEvent,
  CollabEventsRecord,
  CPrimitive,
  InitToken,
  Message,
  MessageMeta,
  Optional,
  ResettableCCounter,
} from "@collabs/collabs";
import * as tf from "@tensorflow/tfjs";
import * as proto from "../generated/proto_compiled";

export interface TensorCounterEventsRecord extends CollabEventsRecord {
  Add: CollabEvent & {
    readonly valueAdded: tf.Tensor;
  };
  // TODO: informative event (equivalent add)
  Reset: CollabEvent;
}

export class TensorGCounterState {
  P = new Map<string, tf.Tensor>();
  N = new Map<string, tf.Tensor>();
  idCounter?: number;
}

export const conversions = {
  protobufToTF: {
    dtype(dtype: proto.Tensor.DType): tf.NumericDataType {
      const conversion: Record<proto.Tensor.DType, tf.NumericDataType> = {
        [proto.Tensor.DType.float32]: "float32",
        [proto.Tensor.DType.int32]: "int32",
        [proto.Tensor.DType.complex64]: "complex64",
        [proto.Tensor.DType.bool]: "bool",
      };
      return conversion[dtype];
    },

    tensor(tensor: proto.ITensor): tf.Tensor {
      const shape = tensor.shape;
      if (shape === undefined || shape === null) {
        throw new Error("shape was not defined: " + shape);
      }
      const dtype = this.dtype(tensor.dtype);
      const data = this.tensorData(dtype, tensor.data);
      return tf.tensor(data, shape, dtype);
    },

    tensorData(dtype: tf.NumericDataType, data: Uint8Array): tf.TypedArray {
      type Conversion = {
        [key in tf.NumericDataType]: (data: Uint8Array) => tf.DataTypeMap[key];
      };
      const bufferSlice = (data: Uint8Array) =>
        data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
      const conversion: Conversion = {
        bool: (data) => data,
        float32: (data) => new Float32Array(bufferSlice(data)),
        complex64: (data) => new Float32Array(bufferSlice(data)),
        int32: (data) => new Int32Array(bufferSlice(data)),
      };
      return conversion[dtype](data);
    },
  },

  tfToProtobuf: {
    dtype(dtype: tf.DataType): proto.Tensor.DType {
      if (dtype === "string") {
        throw new Error("DType must be numerical");
      }
      const conversion: Record<tf.NumericDataType, proto.Tensor.DType> = {
        float32: proto.Tensor.DType.float32,
        int32: proto.Tensor.DType.int32,
        complex64: proto.Tensor.DType.complex64,
        bool: proto.Tensor.DType.bool,
      };
      return conversion[dtype];
    },

    tensor(tensor: tf.Tensor): proto.Tensor {
      return proto.Tensor.create({
        shape: tensor.shape,
        dtype: this.dtype(tensor.dtype),
        data: this.tensorData(tensor.dataSync()),
      });
    },

    tensorData(data: tf.TypedArray): Uint8Array {
      if (data instanceof Uint8Array) {
        return data;
      }
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    },
  },
};

function checkShape(actual: number[], expected: number[]): void {
  // JSON.stringify is a commonly used way to check for deep equality
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `Expected the tensor to have shape ${expected}, but got ${actual}`
    );
  }
}

function checkDType(actual: tf.DataType, expected: tf.DataType): void {
  if (actual !== expected) {
    throw new Error(
      `Expected the tensor to have dtype ${expected}, but got ${actual}`
    );
  }
}

function tensorsEqual<R extends tf.Rank>(
  a: tf.Tensor<R> | number,
  b: tf.Tensor<R> | number
): boolean {
  return tf.tidy(() => (tf.equal(a, b).all().arraySync() as number) === 1);
}

export class TensorGCounterCollab extends CPrimitive<TensorCounterEventsRecord> {
  // TODO: refactor state as proper vars
  readonly state: TensorGCounterState;
  constructor(
    init: InitToken,
    private readonly shape: number[],
    private readonly dtype: tf.NumericDataType
  ) {
    super(init);
    this.state = new TensorGCounterState();
  }

  add(toAdd: tf.Tensor) {
    checkShape(toAdd.shape, this.shape);
    checkDType(toAdd.dtype, this.dtype);
    this.checkPositive(toAdd);
    if (tensorsEqual(toAdd, 0)) return;

    if (this.state.idCounter === undefined) {
      // TODO: do this in constructor once we get
      // access to this.runtime there
      this.state.idCounter = this.runtime.getReplicaUniqueNumber();
    }
    const ownId = this.keyString(this.runtime.replicaID, this.state.idCounter!);
    const prOldValue = this.state.P.get(ownId);
    const prOldTensor = prOldValue ?? tf.zeros(this.shape);
    const prNewTensor = prOldTensor.add(toAdd);
    const prOld = conversions.tfToProtobuf.tensor(prOldTensor);
    prOldValue ?? prOldTensor.dispose();
    const prNew = conversions.tfToProtobuf.tensor(prNewTensor);
    prNewTensor.dispose();
    const message = proto.TensorGCounterMessage.create({
      add: { prOld, prNew, idCounter: this.state.idCounter! },
    });
    this.sendPrimitive(proto.TensorGCounterMessage.encode(message).finish());
  }

  reset(): void {
    const message = proto.TensorGCounterMessage.create({
      reset: {
        V: Object.fromEntries(
          [...this.state.P.entries()].map(([replica, tensor]) => [
            replica,
            conversions.tfToProtobuf.tensor(tensor),
          ])
        ),
      },
    });
    this.sendPrimitive(proto.TensorGCounterMessage.encode(message).finish());
  }

  /** Clears the memory taken by the tensors */
  dispose(): void {
    [...this.state.N.values(), ...this.state.P.values()].forEach((tensor) =>
      tensor.dispose()
    );
  }

  private checkPositive(tensor: tf.Tensor): void {
    tf.tidy(() => {
      const anyNegative = (tensor.less(0).any().arraySync() as number) === 1;
      if (anyNegative) {
        throw new Error(
          "TensorGCounter.add: toAdd = " +
            tensor.arraySync() +
            "; must only have nonnegative values (consider using TensorCounter instead)"
        );
      }
    });
  }

  private keyString(sender: string, idCounter: number) {
    return idCounter + " " + sender;
  }

  protected receivePrimitive(message: Message, meta: MessageMeta): void {
    const decoded = proto.TensorGCounterMessage.decode(<Uint8Array>message);
    switch (decoded.data) {
      case "add":
        const addMessage = decoded.add!;
        const keyString = this.keyString(meta.sender, addMessage.idCounter);
        const prNewTensor = conversions.protobufToTF.tensor(addMessage.prNew);
        const prOldTensor = conversions.protobufToTF.tensor(addMessage.prOld);
        const valueAdded = prNewTensor.sub(prOldTensor);
        if (!this.state.P.has(keyString)) {
          this.state.N.get(keyString)?.dispose();
          this.state.N.set(keyString, prOldTensor);
        } else {
          prOldTensor.dispose();
        }
        this.state.P.get(keyString)?.dispose();
        this.state.P.set(keyString, prNewTensor);
        this.emit("Add", {
          valueAdded,
          meta,
        });
        valueAdded.dispose();
        break;

      case "reset":
        const resetMessage = decoded.reset!;
        for (const [replica, value] of Object.entries(resetMessage.V!)) {
          const received = conversions.protobufToTF.tensor(value);
          const oldNValue = this.state.N.get(replica);
          if (oldNValue !== undefined) {
            const newNValue = tf.maximum(oldNValue, received);
            this.state.N.set(replica, newNValue);
            oldNValue.dispose();
            const pValue = this.state.P.get(replica);
            if (pValue !== undefined && tensorsEqual(newNValue, pValue)) {
              this.state.N.delete(replica);
              this.state.P.delete(replica);
              newNValue.dispose();
              pValue.dispose();
            }
          }
          received.dispose();
        }
        this.emit("Reset", {
          meta,
        });
        break;

      default:
        throw new Error("Unknown decoded.data: " + decoded.data);
    }
  }

  get value(): tf.Tensor {
    return this.sum([...this.state.N.values(), ...this.state.P.values()]);
  }

  private sum(tensors: tf.Tensor[]): tf.Tensor {
    return tf.tidy(() =>
      tensors.reduce((acc, tensor) => acc.add(tensor), tf.zeros(this.shape))
    );
  }

  canGC() {
    return this.state.P.size === 0 && this.state.N.size === 0;
  }

  // TODO: implement
  save(): Uint8Array {
    return new Uint8Array();
  }
  load(saveData: Optional<Uint8Array>): void {}
}

export class TensorCounterCollab extends CObject<TensorCounterEventsRecord> {
  private readonly plus: TensorGCounterCollab;
  private readonly minus: TensorGCounterCollab;

  constructor(
    init: InitToken,
    private readonly shape: number[],
    private readonly dtype: tf.NumericDataType
  ) {
    super(init);
    this.plus = this.addChild(
      "1",
      (init) => new TensorGCounterCollab(init, shape, dtype)
    );
    this.minus = this.addChild(
      "2",
      (init) => new TensorGCounterCollab(init, shape, dtype)
    );
    this.plus.on("Add", (event) => this.emit("Add", event));
    this.minus.on("Add", (event) =>
      tf.tidy(() =>
        this.emit("Add", {
          meta: event.meta,
          valueAdded: event.valueAdded.neg(),
        })
      )
    );
    this.minus.on("Reset", (event) => this.emit("Reset", event));
  }

  add(toAdd: tf.Tensor) {
    checkShape(toAdd.shape, this.shape);
    checkDType(toAdd.dtype, this.dtype);
    const [positive, negative] = tf.tidy(() => {
      const zeros = tf.zeros(this.shape, toAdd.dtype);
      const positive = tf.where(toAdd.greater(0), toAdd, zeros);
      const negative = tf.where(toAdd.lessEqual(0), toAdd.neg(), zeros);
      return [positive, negative];
    });
    this.plus.add(positive);
    this.minus.add(negative);
    positive.dispose();
    negative.dispose();
  }

  reset(): void {
    this.plus.reset();
    this.minus.reset();
  }

  get value(): tf.Tensor {
    return this.plus.value.sub(this.minus.value);
  }

  /** Clears the memory taken by the tensors */
  dispose(): void {
    this.plus.dispose();
    this.minus.dispose();
  }
}

export class TensorAverageCollab extends CObject<TensorCounterEventsRecord> {
  private readonly numerator: TensorCounterCollab;
  private readonly denominator: ResettableCCounter;

  constructor(
    init: InitToken,
    private readonly shape: number[],
    private readonly dtype: tf.NumericDataType
  ) {
    super(init);
    this.numerator = this.addChild(
      "1",
      (init) => new TensorCounterCollab(init, shape, dtype)
    );
    this.denominator = this.addChild(
      "2",
      (init) => new ResettableCCounter(init)
    );
    this.numerator.on("Add", (event) => this.emit("Add", event));
    this.denominator.on("Reset", (event) => this.emit("Reset", event));
  }

  add(toAdd: tf.Tensor) {
    checkShape(toAdd.shape, this.shape);
    checkDType(toAdd.dtype, this.dtype);
    this.numerator.add(toAdd);
    this.denominator.add(1);
  }

  reset(): void {
    this.numerator.reset();
    this.denominator.reset();
  }

  get value(): tf.Tensor {
    return this.numerator.value.div(this.denominator.value);
  }

  /** Clears the memory taken by the tensors */
  dispose(): void {
    this.numerator.dispose();
  }
}
