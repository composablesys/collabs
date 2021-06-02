import * as tf from "@tensorflow/tfjs-node";
import { assert } from "chai";
import { crdts, network } from "compoventuals-client";
import seedrandom from "seedrandom";
import {
  getRecordedTrials,
  getWarmupTrials,
  getMemoryUsed,
  randomChar,
  record,
  sleep,
} from "../record";

const OPS = 200;
const ROUND_OPS = Math.ceil(OPS / 10);
const SEED = "42";
const USERS = 16;

class MicroCrdtsBenchmark<C extends crdts.Crdt> {
  private readonly totalWeight: number;
  private readonly weightIndexedOps: ((
    crdt: C,
    rng: seedrandom.prng
  ) => void)[];
  private readonly cumulativeWeights: number[];

  constructor(
    private readonly testName: string,
    private readonly crdtConstructor: () => C,
    ops: {
      [opName: string]: [(crdt: C, rng: seedrandom.prng) => void, number];
    },
    private readonly getState: (crdt: C) => any,
    private readonly crdtDestructor?: (crdt: C) => void
  ) {
    // Init ability to choose random ops with given weights
    this.cumulativeWeights = [];
    this.weightIndexedOps = [];
    let cumulativeWeight = 0;
    let index = 0;
    for (let op of Object.values(ops)) {
      if (op[1] < 0) throw new Error("Negative weight: " + op[1]);
      this.weightIndexedOps[index] = op[0];
      cumulativeWeight += op[1];
      this.cumulativeWeights[index] = cumulativeWeight;
      index++;
    }
    this.totalWeight = cumulativeWeight;
  }

  private getWeightedRandomOp(rng: seedrandom.prng) {
    const rand = rng() * this.totalWeight;
    for (let i = 0; i < this.weightIndexedOps.length; i++) {
      if (rand < this.cumulativeWeights[i]) return this.weightIndexedOps[i];
    }
    throw new Error("rand out of range");
  }

  async run(
    measurement: "time" | "memory" | "network",
    frequency: "whole" | "rounds"
  ) {
    console.log("Starting micro_crdts test: " + this.testName);

    let results = new Array<number>(getRecordedTrials());
    let roundResults = new Array<number[]>(getRecordedTrials());
    let roundOps = new Array<number>(Math.ceil(OPS / ROUND_OPS));
    let baseMemories = new Array<number>(getRecordedTrials());
    if (frequency === "rounds") {
      for (let i = 0; i < getRecordedTrials(); i++)
        roundResults[i] = new Array<number>(Math.ceil(OPS / ROUND_OPS));
    }

    let startingBaseline = 0;
    if (measurement === "memory") startingBaseline = await getMemoryUsed();

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      // Sleep between trials
      await sleep(1000);
      console.log("Starting trial " + trial);

      let rng = seedrandom(SEED);

      let startTime: bigint;
      let startSentBytes = 0;
      let baseMemory = 0;

      // Setup
      // TODO: should this be included in memory?
      let generator = new network.TestingNetworkGenerator();
      let runtimes: crdts.CrdtRuntime[] = [];
      let crdts: C[] = [];
      for (let i = 0; i < USERS; i++) {
        runtimes[i] = generator.newRuntime("manual", rng);
        crdts[i] = this.crdtConstructor();
        runtimes[i].registerCrdt("", crdts[i]);
      }

      if (measurement === "memory") {
        baseMemory = await getMemoryUsed();
        if (trial >= 0) baseMemories[trial] = baseMemory;
      }

      switch (measurement) {
        case "time":
          startTime = process.hrtime.bigint();
          break;
        case "network":
          startSentBytes = generator.getTotalSentBytes();
      }

      let round = 0;
      let op: number;
      for (op = 0; op < OPS; op++) {
        if (frequency === "rounds" && op !== 0 && op % ROUND_OPS === 0) {
          // Record result
          let ans = -1;
          switch (measurement) {
            case "time":
              ans = new Number(process.hrtime.bigint() - startTime!).valueOf();
              break;
            case "memory":
              // Don't count the last message in TestingNetwork
              generator.lastMessage = undefined;
              ans = await getMemoryUsed();
              break;
            case "network":
              ans = generator.getTotalSentBytes() - startSentBytes;
          }
          if (trial >= 0) roundResults[trial][round] = ans;
          roundOps[round] = op;
          round++;
        }

        // Do one "op" (really one op per user).
        // Each user sends concurrently, then receives
        // each other's messages.
        for (let i = 0; i < USERS; i++) {
          this.getWeightedRandomOp(rng)(crdts[i], rng);
          runtimes[i].commitBatch();
        }
        for (let i = 0; i < USERS; i++) generator.release(runtimes[i]);

        // if (measurement === "memory") await sleep(0);
      }

      // Record result
      let result = -1;
      switch (measurement) {
        case "time":
          result = new Number(process.hrtime.bigint() - startTime!).valueOf();
          break;
        case "memory":
          // Don't count the last message in TestingNetwork
          generator.lastMessage = undefined;
          result = await getMemoryUsed();
          break;
        case "network":
          result = generator.getTotalSentBytes() - startSentBytes;
      }
      if (trial >= 0) {
        switch (frequency) {
          case "whole":
            results[trial] = result;
            break;
          case "rounds":
            roundResults[trial][round] = result;
            roundOps[round] = op;
            break;
        }
      }

      // Check results are all the same
      let result0 = this.getState(crdts[0]);
      for (let i = 1; i < USERS; i++) {
        assert.deepStrictEqual(this.getState(crdts[i]), result0);
      }

      if (this.crdtDestructor !== undefined) {
        crdts.forEach((crdt) => this.crdtDestructor?.(crdt));
      }
    }

    record(
      "micro_crdts/" + measurement,
      this.testName,
      frequency,
      getRecordedTrials(),
      results,
      roundResults,
      roundOps,
      measurement === "memory"
        ? baseMemories
        : new Array<number>(getRecordedTrials()).fill(0),
      startingBaseline
    );
  }
}

function NoopCrdt() {
  return new MicroCrdtsBenchmark(
    "NoopCrdt",
    () => new crdts.NoopCrdt(),
    { Noop: [(crdt) => crdt.noop(), 1] },
    () => null
  );
}

function DeepNoopCrdt() {
  class DeepNoopCrdt extends crdts.CompositeCrdt {
    readonly child: crdts.Crdt;
    readonly noop: crdts.NoopCrdt;
    constructor(index: number) {
      super();
      if (index === 0) {
        this.child = this.addChild("child " + index, new crdts.NoopCrdt());
        this.noop = this.child as crdts.NoopCrdt;
      } else {
        this.child = this.addChild(
          "child " + index,
          new DeepNoopCrdt(index - 1)
        );
        this.noop = (this.child as DeepNoopCrdt).noop;
      }
    }
  }
  return new MicroCrdtsBenchmark(
    "DeepNoopCrdt",
    () => new DeepNoopCrdt(10 - 1),
    { Noop: [(crdt) => crdt.noop.noop(), 1] },
    () => null
  );
}

function ICounter(
  name: string,
  counter: typeof crdts.Counter | typeof crdts.CounterPure,
  resetFraction: number
) {
  return new MicroCrdtsBenchmark(
    name,
    () => new counter(),
    {
      Add: [
        (crdt, rng) => crdt.add(Math.floor(rng() * 100 - 50)),
        1 - resetFraction,
      ],
      Reset: [(crdt) => crdt.reset(), resetFraction],
    },
    (crdt) => crdt.value
  );
}

function MultiValueRegister() {
  return new MicroCrdtsBenchmark(
    "MultiValueRegister",
    () => new crdts.MultiValueRegister<number>(),
    { Set: [(crdt, rng) => (crdt.value = rng()), 1] },
    (crdt) => crdt.valueSet
  );
}

function LwwRegister() {
  return new MicroCrdtsBenchmark(
    "Register",
    () => new crdts.LwwRegister<number>(0),
    { Set: [(crdt, rng) => (crdt.value = rng()), 1] },
    (crdt) => crdt.value
  );
}

function NumberCrdt() {
  return new MicroCrdtsBenchmark(
    "NumberCrdt",
    () => new crdts.NumberCrdt(1),
    {
      Add: [(crdt, rng) => crdt.add(Math.floor(rng() * 100 - 50)), 0.5],
      Mult: [(crdt, rng) => crdt.mult(Math.floor(8 * rng() - 4) / 2), 0.5],
    },
    (crdt) => crdt.value
  );
}

function EnableWinsFlag() {
  return new MicroCrdtsBenchmark(
    "EnableWinsFlag",
    () => new crdts.EnableWinsFlag(),
    {
      Enable: [(crdt) => crdt.enable(), 0.5],
      Disable: [(crdt) => crdt.disable(), 0.5],
    },
    (crdt) => crdt.value
  );
}

function AddWinsSet() {
  return new MicroCrdtsBenchmark(
    "AddWinsSet",
    () => new crdts.AddWinsSet<number>(),
    {
      Toggle: [
        (crdt, rng) => {
          let value = Math.floor(rng() * 100);
          if (crdt.has(value)) crdt.delete(value);
          else crdt.add(value);
        },
        1.0,
      ],
    },
    (crdt) => crdt.value
  );
}

/**
 * Set is maintained at a rolling size of 100,
 * but many more elements are added overall.
 * Useful for memory benchmarking.
 * Note each op is an add+delete, unlike AddWinsSet().
 */
function AddWinsSetRolling() {
  let i = 0;
  return new MicroCrdtsBenchmark(
    "AddWinsSetRolling",
    () => {
      i = 0;
      return new crdts.AddWinsSet<number>();
    },
    {
      Roll: [
        (crdt) => {
          if (i >= 100) crdt.delete(i - 100);
          crdt.add(i);
          i++;
        },
        1.0,
      ],
    },
    (crdt) => {
      //console.log("AddWinsSetRolling total elements touched: " + i);
      return crdt.value;
    }
  );
}

function AddWinsSetRollingGrow() {
  let i = 0;
  return new MicroCrdtsBenchmark(
    "AddWinsSetRollingGrow",
    () => {
      i = 0;
      return new crdts.AddWinsSet<number>();
    },
    {
      Roll: [
        (crdt) => {
          crdt.add(i);
          i++;
        },
        1.0,
      ],
    },
    (crdt) => {
      //console.log("AddWinsSetRolling total elements touched: " + i);
      return crdt.value;
    }
  );
}

function MapCrdt() {
  return new MicroCrdtsBenchmark(
    "MapCrdt",
    () =>
      new crdts.MapCrdt<number, crdts.Counter>(
        () => new crdts.Counter(),
        crdts.DefaultElementSerializer.getInstance(),
        true
      ),
    {
      Toggle: [
        (crdt, rng) => {
          let key = Math.floor(rng() * 100);
          if (crdt.has(key)) crdt.delete(key);
          else crdt.addKey(key);
        },
        0.5,
      ],
      ValueOp: [
        (crdt, rng) => {
          let key = Math.floor(rng() * 100);
          crdt.getForce(key).add(Math.floor(rng() * 100 - 50));
        },
        0.5,
      ],
    },
    (crdt) =>
      new Map([...crdt.value].map((value) => [value[0], value[1].value]))
  );
}

/**
 * Set is maintained at a rolling size of 100,
 * but many more elements are added overall.
 * Useful for memory benchmarking.
 * Note each op is an add+delete, unlike AddWinsSet().
 */
function MapCrdtRolling() {
  let i = 0;
  return new MicroCrdtsBenchmark(
    "MapCrdtRolling",
    () => {
      i = 0;
      return new crdts.MapCrdt<number, crdts.Counter>(
        () => new crdts.Counter(),
        crdts.DefaultElementSerializer.getInstance(),
        true
      );
    },
    {
      Roll: [
        (crdt, rng) => {
          if (i >= 100) crdt.delete(i - 100);
          crdt.getForce(i).add(Math.floor(rng() * 100 - 50));
          i++;
        },
        1.0,
      ],
    },
    (crdt) => {
      //console.log("MapCrdtRolling total elements touched: " + i);
      return new Map(
        [...crdt.value].map((value) => [value[0], value[1].value])
      );
    }
  );
}

function MapCrdtRollingGrow() {
  let i = 0;
  return new MicroCrdtsBenchmark(
    "MapCrdtRollingGrow",
    () => {
      i = 0;
      return new crdts.MapCrdt<number, crdts.Counter>(
        () => new crdts.Counter(),
        crdts.DefaultElementSerializer.getInstance(),
        true
      );
    },
    {
      Roll: [
        (crdt, rng) => {
          crdt.getForce(i).add(Math.floor(rng() * 100 - 50));
          i++;
        },
        1.0,
      ],
    },
    (crdt) => {
      //console.log("MapCrdtRolling total elements touched: " + i);
      return new Map(
        [...crdt.value].map((value) => [value[0], value[1].value])
      );
    }
  );
}

function LwwMap() {
  return new MicroCrdtsBenchmark(
    "LwwMap",
    () => new crdts.LwwMap<number, number>(),
    {
      Toggle: [
        (crdt, rng) => {
          let key = Math.floor(rng() * 100);
          if (crdt.has(key)) crdt.delete(key);
          else crdt.set(key, 0);
        },
        0.5,
      ],
      ValueOp: [
        (crdt, rng) => {
          let key = Math.floor(rng() * 100);
          crdt.set(key, Math.floor(rng() * 100 - 50));
        },
        0.5,
      ],
    },
    (crdt) => new Map(crdt.entries())
  );
}

function LwwMapRolling() {
  let i = 0;
  return new MicroCrdtsBenchmark(
    "LwwMapRolling",
    () => {
      i = 0;
      return new crdts.LwwMap<number, number>();
    },
    {
      Roll: [
        (crdt, rng) => {
          if (i >= 100) crdt.delete(i - 100);
          crdt.set(i, Math.floor(rng() * 100 - 50));
          i++;
        },
        1.0,
      ],
    },
    (crdt) => new Map(crdt.entries())
  );
}

function LwwMapRollingGrow() {
  let i = 0;
  return new MicroCrdtsBenchmark(
    "LwwMapRollingGrow",
    () => {
      i = 0;
      return new crdts.LwwMap<number, number>();
    },
    {
      Roll: [
        (crdt, rng) => {
          crdt.set(i, Math.floor(rng() * 100 - 50));
          i++;
        },
        1.0,
      ],
    },
    (crdt) => new Map(crdt.entries())
  );
}

function TreedocPrimitiveListLtr() {
  return new MicroCrdtsBenchmark(
    "TextLtr",
    () => new crdts.TreedocPrimitiveList<string>(),
    {
      Op: [
        (crdt, rng) => {
          if (crdt.length > 100) crdt.deleteAt(Math.floor(rng() * 100));
          else crdt.insertAt(crdt.length, randomChar(rng));
        },
        1.0,
      ],
    },
    (crdt) => crdt.asArray()
  );
}

function TreedocPrimitiveListLtrGrow() {
  return new MicroCrdtsBenchmark(
    "TextLtrGrow",
    () => new crdts.TreedocPrimitiveList<string>(),
    {
      Op: [
        (crdt, rng) => {
          crdt.insertAt(crdt.length, randomChar(rng));
        },
        1.0,
      ],
    },
    (crdt) => crdt.asArray()
  );
}

function TreedocPrimitiveListRandom() {
  return new MicroCrdtsBenchmark(
    "TextRandom",
    () => new crdts.TreedocPrimitiveList<string>(),
    {
      Op: [
        (crdt, rng) => {
          if (crdt.length > 100) crdt.deleteAt(Math.floor(rng() * 100));
          else
            crdt.insertAt(
              Math.floor(rng() * (crdt.length + 1)),
              randomChar(rng)
            );
        },
        1.0,
      ],
    },
    (crdt) => crdt.asArray()
  );
}

function TreedocPrimitiveListRandomGrow() {
  return new MicroCrdtsBenchmark(
    "TextRandomGrow",
    () => new crdts.TreedocPrimitiveList<string>(),
    {
      Op: [
        (crdt, rng) => {
          crdt.insertAt(Math.floor(rng() * (crdt.length + 1)), randomChar(rng));
        },
        1.0,
      ],
    },
    (crdt) => crdt.asArray()
  );
}
//
// function ITensor(
//   name: "TensorAvg" | "TensorCounter",
//   shape: number[],
//   dtype: tf.NumericDataType,
//   resetFraction: number
// ) {
//   return new MicroCrdtsBenchmark<
//     crdts.TensorAverageCrdt | crdts.TensorCounterCrdt
//   >(
//     name,
//     () =>
//       name === "TensorAvg"
//         ? new crdts.TensorAverageCrdt(shape, dtype)
//         : new crdts.TensorCounterCrdt(shape, dtype),
//     {
//       Add: [
//         (crdt, rng) => {
//           const toAdd = tf.rand(shape, () => 10 * rng() - 5, dtype);
//           crdt.add(toAdd);
//           toAdd.dispose();
//         },
//         1 - resetFraction,
//       ],
//       Reset: [(crdt) => crdt.reset(), resetFraction],
//     },
//     (crdt) => tf.tidy(() => crdt.value.arraySync()),
//     (crdt) => crdt.dispose()
//   );
// }

export default async function microCrdts(args: string[]) {
  let benchmark: MicroCrdtsBenchmark<any>;
  switch (args[0]) {
    case "NoopCrdt":
      benchmark = NoopCrdt();
      break;
    case "DeepNoopCrdt":
      benchmark = DeepNoopCrdt();
      break;
    case "Counter":
      benchmark = ICounter(args[0], crdts.Counter, 0);
      break;
    case "Counter-1":
      benchmark = ICounter(args[0], crdts.Counter, 0.01);
      break;
    case "Counter-10":
      benchmark = ICounter(args[0], crdts.Counter, 0.1);
      break;
    case "Counter-50":
      benchmark = ICounter(args[0], crdts.Counter, 0.5);
      break;
    case "Counter-100":
      benchmark = ICounter(args[0], crdts.Counter, 1);
      break;
    case "CounterPure":
      benchmark = ICounter(args[0], crdts.CounterPure, 0);
      break;
    case "CounterPure-1":
      benchmark = ICounter(args[0], crdts.CounterPure, 0.01);
      break;
    case "CounterPure-10":
      benchmark = ICounter(args[0], crdts.CounterPure, 0.1);
      break;
    case "CounterPure-50":
      benchmark = ICounter(args[0], crdts.CounterPure, 0.5);
      break;
    case "CounterPure-100":
      benchmark = ICounter(args[0], crdts.CounterPure, 1);
      break;
    case "MultiValueRegister":
      benchmark = MultiValueRegister();
      break;
    case "Register":
      benchmark = LwwRegister();
      break;
    case "NumberCrdt":
      benchmark = NumberCrdt();
      break;
    case "EnableWinsFlag":
      benchmark = EnableWinsFlag();
      break;
    case "AddWinsSet":
      benchmark = AddWinsSet();
      break;
    case "AddWinsSetRolling":
      benchmark = AddWinsSetRolling();
      break;
    case "AddWinsSetRollingGrow":
      benchmark = AddWinsSetRollingGrow();
      break;
    case "MapCrdt":
      benchmark = MapCrdt();
      break;
    case "MapCrdtRolling":
      benchmark = MapCrdtRolling();
      break;
    case "MapCrdtRollingGrow":
      benchmark = MapCrdtRollingGrow();
      break;
    case "LwwMap":
      benchmark = LwwMap();
      break;
    case "LwwMapRolling":
      benchmark = LwwMapRolling();
      break;
    case "TextLtr":
      benchmark = TreedocPrimitiveListLtr();
      break;
    case "TextRandom":
      benchmark = TreedocPrimitiveListRandom();
      break;
    case "LwwMapRollingGrow":
      benchmark = LwwMapRollingGrow();
      break;
    case "TextLtrGrow":
      benchmark = TreedocPrimitiveListLtrGrow();
      break;
    case "TextRandomGrow":
      benchmark = TreedocPrimitiveListRandomGrow();
      break;
    // case "TensorCounter":
    //   benchmark = ITensor("TensorCounter", [2, 2], "int32", 0);
    //   break;
    // case "TensorCounter-1":
    //   benchmark = ITensor("TensorCounter", [2, 2], "int32", 0.01);
    //   break;
    // case "TensorCounter-10":
    //   benchmark = ITensor("TensorCounter", [2, 2], "int32", 0.1);
    //   break;
    // case "TensorCounter-50":
    //   benchmark = ITensor("TensorCounter", [2, 2], "int32", 0.5);
    //   break;
    // case "TensorCounter-100":
    //   benchmark = ITensor("TensorCounter", [2, 2], "int32", 1);
    //   break;
    // case "TensorAvg":
    //   benchmark = ITensor("TensorAvg", [2, 2], "int32", 0);
    //   break;
    // case "TensorAvg-1":
    //   benchmark = ITensor("TensorAvg", [2, 2], "int32", 0.01);
    //   break;
    // case "TensorAvg-10":
    //   benchmark = ITensor("TensorAvg", [2, 2], "int32", 0.1);
    //   break;
    // case "TensorAvg-50":
    //   benchmark = ITensor("TensorAvg", [2, 2], "int32", 0.5);
    //   break;
    // case "TensorAvg-100":
    //   benchmark = ITensor("TensorAvg", [2, 2], "int32", 1);
    //   break;
    // TODO: LwwMap<number, number>?
    // TODO: TreedocList<Counter>?  Make sure to enable GC
    default:
      throw new Error("Unrecognized benchmark arg: " + args[0]);
  }
  if (!(args[1] === "time" || args[1] === "memory" || args[1] === "network")) {
    throw new Error("Unrecognized metric arg: " + args[1]);
  }
  if (!(args[2] === "whole" || args[2] === "rounds")) {
    throw new Error("Unrecognized frequency: " + args[2]);
  }
  await benchmark.run(args[1], args[2]);
}
