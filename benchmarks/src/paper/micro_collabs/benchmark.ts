import { assert } from "chai";
import * as collabs from "@collabs/collabs";
import * as tf from "@tensorflow/tfjs-node";
import {
  TensorAverageCollab,
  TensorCounterCollab,
} from "@collabs/tensor-average";
import seedrandom from "seedrandom";
import {
  getRecordedTrials,
  getWarmupTrials,
  getMemoryUsed,
  randomChar,
  record,
  sleep,
} from "../record";

const DEBUG = false;

const OPS = 200;
const ROUND_OPS = Math.ceil(OPS / 10);
const SEED = "42";
const USERS = 16;

class MicroCollabsBenchmark<C extends collabs.Collab> {
  private readonly totalWeight: number;
  private readonly weightIndexedOps: ((
    collab: C,
    rng: seedrandom.prng
  ) => void)[];
  private readonly cumulativeWeights: number[];

  constructor(
    private readonly testName: string,
    private readonly collabConstructor: (initToken: collabs.InitToken) => C,
    ops: {
      [opName: string]: [(collab: C, rng: seedrandom.prng) => void, number];
    },
    private readonly getState: (collab: C) => any,
    private readonly collabDestructor?: (collab: C) => void
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
    measurement: "time" | "memory" | "network" | "save",
    frequency: "whole" | "rounds"
  ) {
    console.log("Starting micro_collabs test: " + this.testName);

    let results = new Array<{ [measurement: string]: number }>(
      getRecordedTrials()
    );
    let roundResults = new Array<{ [measurement: string]: number }[]>(
      getRecordedTrials()
    );
    let roundOps = new Array<number>(Math.ceil(OPS / ROUND_OPS));
    let baseMemories = new Array<number>(getRecordedTrials());
    if (frequency === "rounds") {
      for (let i = 0; i < getRecordedTrials(); i++)
        roundResults[i] = new Array<{ [measurement: string]: number }>(
          Math.ceil(OPS / ROUND_OPS)
        );
    }

    let startingBaseline = 0;
    if (measurement === "memory") startingBaseline = await getMemoryUsed();

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      // Sleep between trials
      await sleep(1000);
      console.log("Starting trial " + trial);

      let rng = seedrandom(SEED);
      const replicaIdRng = seedrandom(SEED + SEED);

      let startTime: bigint;
      let startSentBytes = 0;
      let baseMemory = 0;

      // Setup
      // TODO: should this be included in memory?
      let generator = new collabs.TestingNetworkGenerator();
      let apps: collabs.CRDTApp[] = [];
      let collabList: C[] = [];
      for (let i = 0; i < USERS; i++) {
        apps[i] = generator.newApp(
          new collabs.ManualBatchingStrategy(),
          replicaIdRng
        );
        collabList[i] = apps[i].registerCollab("", this.collabConstructor);
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
          let ans: { [measurement: string]: number } = {};
          switch (measurement) {
            case "time":
              ans[measurement] = new Number(
                process.hrtime.bigint() - startTime!
              ).valueOf();
              break;
            case "memory":
              // Don't count the last message in TestingNetwork
              generator.lastMessage = undefined;
              ans[measurement] = await getMemoryUsed();
              break;
            case "network":
              ans[measurement] = generator.getTotalSentBytes() - startSentBytes;
              break;
            case "save":
              // Just save and load user 0
              let beforeSave: Object;
              if (DEBUG) beforeSave = this.getState(collabList[0]);
              // We add sleeps between measured things to make
              // them more independent; before adding this,
              // I've noticed changes to
              // save code that affected load times.
              await sleep(1000);
              const saveStartTime = process.hrtime.bigint();
              const saveData = apps[0].save();
              const saveTime = new Number(
                process.hrtime.bigint() - saveStartTime!
              ).valueOf();
              if (this.collabDestructor !== undefined) {
                this.collabDestructor(collabList[0]);
              }
              await sleep(1000);
              // Create a new runtime etc. for user 0, then load
              const loadStartTime = process.hrtime.bigint();
              apps[0] = generator.newApp(
                new collabs.ManualBatchingStrategy(),
                replicaIdRng
              );
              collabList[0] = apps[0].registerCollab(
                "",
                this.collabConstructor
              );
              apps[0].load(saveData);
              this.getState(collabList[0]); // Read the state
              const loadTime = new Number(
                process.hrtime.bigint() - loadStartTime!
              ).valueOf();
              // Record
              ans = {
                saveTime,
                saveSize: saveData.byteLength,
                loadTime,
              };
              if (DEBUG) {
                const afterSave = this.getState(collabList[0]);
                assert.deepStrictEqual(
                  beforeSave!,
                  afterSave,
                  "afterSave did not equal beforeSave"
                );
              }
              break;
          }
          if (trial >= 0) roundResults[trial][round] = ans;
          roundOps[round] = op;
          round++;
        }

        // Do one "op" (really one op per user).
        // Each user sends concurrently, then receives
        // each other's messages.
        for (let i = 0; i < USERS; i++) {
          this.getWeightedRandomOp(rng)(collabList[i], rng);
          apps[i].runtime.commitBatch();
        }
        for (let i = 0; i < USERS; i++) generator.release(apps[i]);

        // if (measurement === "memory") await sleep(0);
      }

      // Record result
      // TODO: de-duplicate code (shared with rounds measurements)
      let result: { [measurement: string]: number } = {};
      switch (measurement) {
        case "time":
          result[measurement] = new Number(
            process.hrtime.bigint() - startTime!
          ).valueOf();
          break;
        case "memory":
          // Don't count the last message in TestingNetwork
          generator.lastMessage = undefined;
          result[measurement] = await getMemoryUsed();
          break;
        case "network":
          result[measurement] = generator.getTotalSentBytes() - startSentBytes;
          break;
        case "save":
          // Just save and load user 0
          await sleep(1000);
          const saveStartTime = process.hrtime.bigint();
          const saveData = apps[0].save();
          const saveTime = new Number(
            process.hrtime.bigint() - saveStartTime!
          ).valueOf();
          if (this.collabDestructor !== undefined) {
            this.collabDestructor(collabList[0]);
          }
          collabList[0] = undefined as unknown as C;
          await sleep(1000);
          // Create a new runtime etc. for user 0, then load
          const loadStartTime = process.hrtime.bigint();
          apps[0] = generator.newApp(
            new collabs.ManualBatchingStrategy(),
            replicaIdRng
          );
          collabList[0] = apps[0].registerCollab("", this.collabConstructor);
          apps[0].load(saveData);
          this.getState(collabList[0]); // Read the state
          const loadTime = new Number(
            process.hrtime.bigint() - loadStartTime!
          ).valueOf();
          // Record
          result = {
            saveTime,
            saveSize: saveData.byteLength,
            loadTime,
          };
          break;
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
      let result0 = this.getState(collabList[0]);
      for (let i = 1; i < USERS; i++) {
        assert.deepStrictEqual(this.getState(collabList[i]), result0);
      }

      if (this.collabDestructor !== undefined) {
        collabList.forEach((collab) => this.collabDestructor?.(collab));
      }
    }

    let toRecord: string[];
    switch (measurement) {
      case "save":
        toRecord = ["saveTime", "loadTime", "saveSize"];
        break;
      default:
        toRecord = [measurement];
    }
    for (const oneRecord of toRecord) {
      record(
        "micro_collabs/" + oneRecord,
        this.testName,
        frequency,
        getRecordedTrials(),
        results.map((result) => result[oneRecord]),
        roundResults.map((trialResult) =>
          trialResult.map((result) => result[oneRecord])
        ),
        roundOps,
        oneRecord === "memory"
          ? baseMemories
          : new Array<number>(getRecordedTrials()).fill(0),
        startingBaseline
      );
    }
  }
}

/**
 * A trivial Collab that does nothing except send
 * empty messages.  Used for baseline measurements.
 */
class NoopCollabClass extends collabs.CPrimitive {
  noop() {
    super.sendPrimitive(new Uint8Array());
  }

  receivePrimitive() {}

  save() {
    return new Uint8Array();
  }

  load() {}

  canGc() {
    return true;
  }
}

function NoopCollab() {
  return new MicroCollabsBenchmark(
    "NoopCollab",
    (initToken) => new NoopCollabClass(initToken),
    { Noop: [(collab) => collab.noop(), 1] },
    () => null
  );
}

function DeepNoopCollab() {
  class DeepNoopCollab extends collabs.CObject {
    readonly child: collabs.Collab;
    readonly noop: NoopCollabClass;
    constructor(initToken: collabs.InitToken, index: number) {
      super(initToken);
      if (index === 0) {
        this.child = this.addChild(
          "child " + index,
          collabs.Pre(NoopCollabClass)()
        );
        this.noop = this.child as NoopCollabClass;
      } else {
        this.child = this.addChild(
          "child " + index,
          collabs.Pre(DeepNoopCollab)(index - 1)
        );
        this.noop = (this.child as DeepNoopCollab).noop;
      }
    }
  }
  return new MicroCollabsBenchmark(
    "DeepNoopCollab",
    (initToken) => new DeepNoopCollab(initToken, 10 - 1),
    { Noop: [(collab) => collab.noop.noop(), 1] },
    () => null
  );
}

function ICounter(
  name: string,
  counter: typeof collabs.CCounter,
  resetFraction: number
) {
  return new MicroCollabsBenchmark(
    name,
    (initToken) => new counter(initToken),
    {
      Add: [
        (collab, rng) => collab.add(Math.floor(rng() * 100 - 50)),
        1 - resetFraction,
      ],
      Reset: [(collab) => collab.reset(), resetFraction],
    },
    (collab) => collab.value
  );
}

function MultiValueRegister() {
  return new MicroCollabsBenchmark(
    "MultiValueRegister",
    (initToken) => new collabs.LwwCRegister<number>(initToken, 0),
    { Set: [(collab, rng) => (collab.value = rng()), 1] },
    (collab) => collab.conflicts()
  );
}

function LwwCRegister() {
  return new MicroCollabsBenchmark(
    "Register",
    (initToken) => new collabs.LwwCRegister<number>(initToken, 0),
    { Set: [(collab, rng) => (collab.value = rng()), 1] },
    (collab) => collab.value
  );
}

function NumberCollab() {
  return new MicroCollabsBenchmark(
    "NumberCollab",
    (initToken) => new collabs.CNumber(initToken, 1),
    {
      Add: [(collab, rng) => collab.add(Math.floor(rng() * 100 - 50)), 0.5],
      Mult: [(collab, rng) => collab.mult(Math.floor(8 * rng() - 4) / 2), 0.5],
    },
    (collab) => collab.value
  );
}

function EnableWinsFlag() {
  return new MicroCollabsBenchmark(
    "EnableWinsFlag",
    (initToken) => new collabs.TrueWinsCBoolean(initToken),
    {
      Enable: [(collab) => (collab.value = true), 0.5],
      Disable: [(collab) => (collab.value = false), 0.5],
    },
    (collab) => collab.value
  );
}

function AddWinsSet() {
  return new MicroCollabsBenchmark(
    "AddWinsSet",
    (initToken) => new collabs.AddWinsCSet<number>(initToken),
    {
      Toggle: [
        (collab, rng) => {
          let value = Math.floor(rng() * 100);
          if (collab.has(value)) collab.delete(value);
          else collab.add(value);
        },
        1.0,
      ],
    },
    (collab) => new Set(collab)
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
  return new MicroCollabsBenchmark(
    "AddWinsSetRolling",
    (initToken) => {
      i = 0;
      return new collabs.AddWinsCSet<number>(initToken);
    },
    {
      Roll: [
        (collab) => {
          if (i >= 100) collab.delete(i - 100);
          collab.add(i);
          i++;
        },
        1.0,
      ],
    },
    (collab) => {
      //console.log("AddWinsSetRolling total elements touched: " + i);
      return new Set(collab);
    }
  );
}

function AddWinsSetRollingGrow() {
  let i = 0;
  return new MicroCollabsBenchmark(
    "AddWinsSetRollingGrow",
    (initToken) => {
      i = 0;
      return new collabs.AddWinsCSet<number>(initToken);
    },
    {
      Roll: [
        (collab) => {
          collab.add(i);
          i++;
        },
        1.0,
      ],
    },
    (collab) => {
      //console.log("AddWinsSetRolling total elements touched: " + i);
      return new Set(collab);
    }
  );
}

function MapCollab() {
  return new MicroCollabsBenchmark(
    "MapCollab",
    (initToken) =>
      new collabs.MergingMutCMap<number, collabs.CCounter>(
        initToken,
        (valueInitToken) => new collabs.CCounter(valueInitToken),
        collabs.DefaultSerializer.getInstance(initToken.runtime)
      ),
    {
      Toggle: [
        (collab, rng) => {
          let key = Math.floor(rng() * 100);
          if (collab.has(key)) collab.delete(key);
          else collab.set(key);
        },
        0.5,
      ],
      ValueOp: [
        (collab, rng) => {
          let key = Math.floor(rng() * 100);
          if (!collab.has(key)) collab.set(key);
          collab.get(key)!.add(Math.floor(rng() * 100 - 50));
        },
        0.5,
      ],
    },
    (collab) => new Map([...collab].map((value) => [value[0], value[1].value]))
  );
}

/**
 * Set is maintained at a rolling size of 100,
 * but many more elements are added overall.
 * Useful for memory benchmarking.
 * Note each op is an add+delete, unlike AddWinsSet().
 */
function MapCollabRolling() {
  let i = 0;
  return new MicroCollabsBenchmark(
    "MapCollabRolling",
    (initToken) => {
      i = 0;
      return new collabs.MergingMutCMap<number, collabs.CCounter>(
        initToken,
        (valueInitToken) => new collabs.CCounter(valueInitToken),
        collabs.DefaultSerializer.getInstance(initToken.runtime)
      );
    },
    {
      Roll: [
        (collab, rng) => {
          if (i >= 100) collab.delete(i - 100);
          if (!collab.has(i)) collab.set(i);
          collab.get(i)!.add(Math.floor(rng() * 100 - 50));
          i++;
        },
        1.0,
      ],
    },
    (collab) => {
      //console.log("MapCollabRolling total elements touched: " + i);
      return new Map([...collab].map((value) => [value[0], value[1].value]));
    }
  );
}

function MapCollabRollingGrow() {
  let i = 0;
  return new MicroCollabsBenchmark(
    "MapCollabRollingGrow",
    (initToken) => {
      i = 0;
      return new collabs.MergingMutCMap<number, collabs.CCounter>(
        initToken,
        (valueInitToken) => new collabs.CCounter(valueInitToken),
        collabs.DefaultSerializer.getInstance(initToken.runtime)
      );
    },
    {
      Roll: [
        (collab, rng) => {
          if (!collab.has(i)) collab.set(i);
          collab.get(i)!.add(Math.floor(rng() * 100 - 50));
          i++;
        },
        1.0,
      ],
    },
    (collab) => {
      //console.log("MapCollabRolling total elements touched: " + i);
      return new Map([...collab].map((value) => [value[0], value[1].value]));
    }
  );
}

function LwwMap() {
  return new MicroCollabsBenchmark(
    "LwwMap",
    (initToken) => new collabs.LwwCMap<number, number>(initToken),
    {
      Toggle: [
        (collab, rng) => {
          let key = Math.floor(rng() * 100);
          if (collab.has(key)) collab.delete(key);
          else collab.set(key, 0);
        },
        0.5,
      ],
      ValueOp: [
        (collab, rng) => {
          let key = Math.floor(rng() * 100);
          collab.set(key, Math.floor(rng() * 100 - 50));
        },
        0.5,
      ],
    },
    (collab) => new Map(collab.entries())
  );
}

function LwwMapRolling() {
  let i = 0;
  return new MicroCollabsBenchmark(
    "LwwMapRolling",
    (initToken) => {
      i = 0;
      return new collabs.LwwCMap<number, number>(initToken);
    },
    {
      Roll: [
        (collab, rng) => {
          if (i >= 100) collab.delete(i - 100);
          collab.set(i, Math.floor(rng() * 100 - 50));
          i++;
        },
        1.0,
      ],
    },
    (collab) => new Map(collab.entries())
  );
}

function LwwMapRollingGrow() {
  let i = 0;
  return new MicroCollabsBenchmark(
    "LwwMapRollingGrow",
    (initToken) => {
      i = 0;
      return new collabs.LwwCMap<number, number>(initToken);
    },
    {
      Roll: [
        (collab, rng) => {
          collab.set(i, Math.floor(rng() * 100 - 50));
          i++;
        },
        1.0,
      ],
    },
    (collab) => new Map(collab.entries())
  );
}

function TextLtr() {
  return new MicroCollabsBenchmark(
    "TextLtr",
    (initToken) => new collabs.CText(initToken),
    {
      Op: [
        (collab, rng) => {
          if (collab.length > 100) collab.delete(Math.floor(rng() * 100));
          else collab.insert(collab.length, randomChar(rng));
        },
        1.0,
      ],
    },
    (collab) => collab.slice()
  );
}

function TextLtrGrow() {
  return new MicroCollabsBenchmark(
    "TextLtrGrow",
    (initToken) => new collabs.CText(initToken),
    {
      Op: [
        (collab, rng) => {
          collab.insert(collab.length, randomChar(rng));
        },
        1.0,
      ],
    },
    (collab) => collab.slice()
  );
}

function TextRandom() {
  return new MicroCollabsBenchmark(
    "TextRandom",
    (initToken) => new collabs.CText(initToken),
    {
      Op: [
        (collab, rng) => {
          if (collab.length > 100) collab.delete(Math.floor(rng() * 100));
          else
            collab.insert(
              Math.floor(rng() * (collab.length + 1)),
              randomChar(rng)
            );
        },
        1.0,
      ],
    },
    (collab) => collab.slice()
  );
}

function TextRandomGrow() {
  return new MicroCollabsBenchmark(
    "TextRandomGrow",
    (initToken) => new collabs.CText(initToken),
    {
      Op: [
        (collab, rng) => {
          collab.insert(
            Math.floor(rng() * (collab.length + 1)),
            randomChar(rng)
          );
        },
        1.0,
      ],
    },
    (collab) => collab.slice()
  );
}

function ITensor(
  name: "TensorAvg" | "TensorCounter",
  shape: number[],
  dtype: tf.NumericDataType,
  resetFraction: number
) {
  return new MicroCollabsBenchmark<TensorAverageCollab | TensorCounterCollab>(
    name,
    (initToken) =>
      name === "TensorAvg"
        ? new TensorAverageCollab(initToken, shape, dtype)
        : new TensorCounterCollab(initToken, shape, dtype),
    {
      Add: [
        (collab, rng) => {
          const toAdd = tf.rand(shape, () => 10 * rng() - 5, dtype);
          collab.add(toAdd);
          toAdd.dispose();
        },
        1 - resetFraction,
      ],
      Reset: [(collab) => collab.reset(), resetFraction],
    },
    (collab) => tf.tidy(() => collab.value.arraySync()),
    (collab) => collab.dispose()
  );
}

export default async function microCollabs(args: string[]) {
  let benchmark: MicroCollabsBenchmark<any>;
  switch (args[0]) {
    case "NoopCollab":
      benchmark = NoopCollab();
      break;
    case "DeepNoopCollab":
      benchmark = DeepNoopCollab();
      break;
    case "Counter":
      benchmark = ICounter(args[0], collabs.CCounter, 0);
      break;
    case "Counter-1":
      benchmark = ICounter(args[0], collabs.CCounter, 0.01);
      break;
    case "Counter-10":
      benchmark = ICounter(args[0], collabs.CCounter, 0.1);
      break;
    case "Counter-50":
      benchmark = ICounter(args[0], collabs.CCounter, 0.5);
      break;
    case "Counter-100":
      benchmark = ICounter(args[0], collabs.CCounter, 1);
      break;
    // case "CounterPure":
    //   benchmark = ICounter(args[0], collabs.CCounterPure, 0);
    //   break;
    // case "CounterPure-1":
    //   benchmark = ICounter(args[0], collabs.CCounterPure, 0.01);
    //   break;
    // case "CounterPure-10":
    //   benchmark = ICounter(args[0], collabs.CCounterPure, 0.1);
    //   break;
    // case "CounterPure-50":
    //   benchmark = ICounter(args[0], collabs.CCounterPure, 0.5);
    //   break;
    // case "CounterPure-100":
    //   benchmark = ICounter(args[0], collabs.CCounterPure, 1);
    //   break;
    case "MultiValueRegister":
      benchmark = MultiValueRegister();
      break;
    case "Register":
      benchmark = LwwCRegister();
      break;
    case "NumberCollab":
      benchmark = NumberCollab();
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
    case "MapCollab":
      benchmark = MapCollab();
      break;
    case "MapCollabRolling":
      benchmark = MapCollabRolling();
      break;
    case "MapCollabRollingGrow":
      benchmark = MapCollabRollingGrow();
      break;
    case "LwwMap":
      benchmark = LwwMap();
      break;
    case "LwwMapRolling":
      benchmark = LwwMapRolling();
      break;
    case "LwwMapRollingGrow":
      benchmark = LwwMapRollingGrow();
      break;
    case "TextLtr":
      benchmark = TextLtr();
      break;
    case "TextRandom":
      benchmark = TextRandom();
      break;
    case "TextLtrGrow":
      benchmark = TextLtrGrow();
      break;
    case "TextRandomGrow":
      benchmark = TextRandomGrow();
      break;
    case "TensorCounter":
      benchmark = ITensor("TensorCounter", [2, 2], "int32", 0);
      break;
    case "TensorCounter-1":
      benchmark = ITensor("TensorCounter", [2, 2], "int32", 0.01);
      break;
    case "TensorCounter-10":
      benchmark = ITensor("TensorCounter", [2, 2], "int32", 0.1);
      break;
    case "TensorCounter-50":
      benchmark = ITensor("TensorCounter", [2, 2], "int32", 0.5);
      break;
    case "TensorCounter-100":
      benchmark = ITensor("TensorCounter", [2, 2], "int32", 1);
      break;
    case "TensorAvg":
      benchmark = ITensor("TensorAvg", [2, 2], "int32", 0);
      break;
    case "TensorAvg-1":
      benchmark = ITensor("TensorAvg", [2, 2], "int32", 0.01);
      break;
    case "TensorAvg-10":
      benchmark = ITensor("TensorAvg", [2, 2], "int32", 0.1);
      break;
    case "TensorAvg-50":
      benchmark = ITensor("TensorAvg", [2, 2], "int32", 0.5);
      break;
    case "TensorAvg-100":
      benchmark = ITensor("TensorAvg", [2, 2], "int32", 1);
      break;
    // TODO: LwwMap<number, number>?
    // TODO: TreedocList<Counter>?  Make sure to enable GC
    // TODO: DeletingMutCSet, others
    default:
      throw new Error("Unrecognized benchmark arg: " + args[0]);
  }
  if (
    !(
      args[1] === "time" ||
      args[1] === "memory" ||
      args[1] === "network" ||
      args[1] === "save"
    )
  ) {
    throw new Error("Unrecognized metric arg: " + args[1]);
  }
  if (!(args[2] === "whole" || args[2] === "rounds")) {
    throw new Error("Unrecognized frequency: " + args[2]);
  }
  await benchmark.run(args[1], args[2]);
}
