import * as tf from "@tensorflow/tfjs";
import { CausalTimestamp } from "../network";
import {
  CompositeCrdt,
  CrdtEvent,
  CrdtEventsRecord,
  PrimitiveCrdt,
} from "./crdt_core";
import * as proto from "../../generated/proto_compiled";
import { GCounter } from "./basic_crdts";

export interface TensorCounterEvent extends CrdtEvent {
  readonly valueAdded: tf.Tensor;
}

export interface TensorCounterEventsRecord extends CrdtEventsRecord {
  Add: TensorCounterEvent;
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

export class TensorGCounterCrdt extends PrimitiveCrdt<
  TensorGCounterState,
  TensorCounterEventsRecord
> {
  constructor(
    private readonly shape: number[],
    private readonly dtype: tf.NumericDataType
  ) {
    super(new TensorGCounterState());
  }

  add(toAdd: tf.Tensor) {
    checkShape(toAdd.shape, this.shape);
    checkDType(toAdd.dtype, this.dtype);
    const anyLessThanZero = (toAdd.less(0).any().arraySync() as number) === 1;
    if (anyLessThanZero) {
      throw new Error(
        "TensorGCounter.add: toAdd = " +
          toAdd.arraySync() +
          "; must only have nonnegative values (consider using TensorCounter instead)"
      );
    }

    const allEqualToZero = (toAdd.equal(0).all().arraySync() as number) === 1;
    if (allEqualToZero) return;

    if (this.state.idCounter === undefined) {
      // TODO: do this in constructor once we get
      // access to this.runtime there
      this.state.idCounter = this.runtime.getReplicaUniqueNumber();
    }
    const prOldTensor =
      this.state.P.get(
        this.keyString(this.runtime.getReplicaId(), this.state.idCounter!)
      ) ?? tf.zeros(this.shape);
    const prNewTensor = prOldTensor.add(toAdd);
    const prOld = conversions.tfToProtobuf.tensor(prOldTensor);
    const prNew = conversions.tfToProtobuf.tensor(prNewTensor);
    prNewTensor.dispose();
    const message = proto.TensorGCounterMessage.create({
      add: { prOld, prNew, idCounter: this.state.idCounter! },
    });
    super.send(proto.TensorGCounterMessage.encode(message).finish());
  }

  private keyString(sender: string, idCounter: number) {
    return idCounter + " " + sender;
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    const decoded = proto.TensorGCounterMessage.decode(message);
    switch (decoded.data) {
      case "add":
        const addMessage = decoded.add!;
        const keyString = this.keyString(
          timestamp.getSender(),
          addMessage.idCounter
        );
        const prNewTensor = conversions.protobufToTF.tensor(addMessage.prNew);
        const prOldTensor = conversions.protobufToTF.tensor(addMessage.prOld);
        if (!this.state.P.has(keyString)) {
          this.state.N.get(keyString)?.dispose();
          this.state.N.set(keyString, prOldTensor);
        }
        this.state.P.get(keyString)?.dispose();
        this.state.P.set(keyString, prNewTensor);
        const valueAdded = prNewTensor.sub(prOldTensor);
        this.emit("Add", {
          valueAdded,
          caller: this,
          timestamp,
        });
        valueAdded.dispose();
        break;
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
}

export class TensorCounterCrdt extends CompositeCrdt<TensorCounterEventsRecord> {
  private readonly plus: TensorGCounterCrdt;
  private readonly minus: TensorGCounterCrdt;

  constructor(
    private readonly shape: number[],
    private readonly dtype: tf.NumericDataType
  ) {
    super();
    this.plus = this.addChild("1", new TensorGCounterCrdt(shape, dtype));
    this.minus = this.addChild("2", new TensorGCounterCrdt(shape, dtype));
    this.plus.on("Add", (event) =>
      this.emit("Add", { ...event, caller: this })
    );
    this.minus.on("Add", (event) =>
      tf.tidy(() =>
        this.emit("Add", {
          timestamp: event.timestamp,
          valueAdded: event.valueAdded.neg(),
          caller: this,
        })
      )
    );
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
  }

  get value(): tf.Tensor {
    return this.plus.value.sub(this.minus.value);
  }
}

export class TensorAverageCrdt extends CompositeCrdt<TensorCounterEventsRecord> {
  private readonly numerator: TensorCounterCrdt;
  private readonly denominator: GCounter;

  constructor(
    private readonly shape: number[],
    private readonly dtype: tf.NumericDataType
  ) {
    super();
    this.numerator = this.addChild("1", new TensorCounterCrdt(shape, dtype));
    this.denominator = this.addChild("2", new GCounter());
    this.numerator.on("Add", (event) =>
      this.emit("Add", { ...event, caller: this })
    );
  }

  add(toAdd: tf.Tensor) {
    checkShape(toAdd.shape, this.shape);
    checkDType(toAdd.dtype, this.dtype);
    this.numerator.add(toAdd);
    this.denominator.add(1);
  }

  get value(): tf.Tensor {
    return this.numerator.value.div(this.denominator.value);
  }
}
