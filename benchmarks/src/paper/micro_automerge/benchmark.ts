import Automerge from "automerge";
import { assert } from "chai";
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

class MicroAutomergeBenchmark {
  private readonly totalWeight: number;
  private readonly weightIndexedOps: ((
    doc: any,
    rng: seedrandom.prng
  ) => void)[];
  private readonly cumulativeWeights: number[];
  constructor(
    private readonly testName: string,
    ops: {
      [opName: string]: [(doc: any, rng: seedrandom.prng) => void, number];
    }
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
    console.log("Starting micro_automerge test: " + this.testName);

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
      let automerges = new Array<any>(USERS);
      let changes = new Array<string>(USERS);

      for (let i = 0; i < USERS; i++) {
        // TODO: deterministic actor ids (second arg)
        automerges[i] = Automerge.init();
      }

      if (measurement === "memory") {
        baseMemory = await getMemoryUsed();
        if (trial >= 0) baseMemories[trial] = baseMemory;
      }

      switch (measurement) {
        case "time":
          startTime = process.hrtime.bigint();
          break;
      }

      let round = 0;
      let op: number;
      let totalSentBytes = 0;
      for (op = 0; op < OPS; op++) {
        if (frequency === "rounds" && op !== 0 && op % ROUND_OPS === 0) {
          // Record result
          let ans = -1;
          switch (measurement) {
            case "time":
              ans = new Number(process.hrtime.bigint() - startTime!).valueOf();
              break;
            case "memory":
              ans = await getMemoryUsed();
              break;
            case "network":
              ans = totalSentBytes - startSentBytes;
          }
          if (trial >= 0) roundResults[trial][round] = ans;
          roundOps[round] = op;
          round++;
        }

        // Do one "op" (really one op per user).
        // Each user sends concurrently, then receives
        // each other's messages.
        for (let i = 0; i < USERS; i++) {
          let doc = automerges[i];
          let newDoc = Automerge.change(doc, (d: any) => {
            this.getWeightedRandomOp(rng)(d, rng);
          });
          let message = JSON.stringify(Automerge.getChanges(doc!, newDoc!));
          totalSentBytes += message.length;
          changes[i] = message;
          automerges[i] = newDoc;
        }

        for (let i = 0; i < USERS; i++) {
          for (let j = 0; j < USERS; j++) {
            if (j != i) {
              automerges[j] = Automerge.applyChanges(
                automerges[j],
                JSON.parse(changes[i])
              );
            }
          }
        }

        // if (measurement === "memory") await sleep(0);
      }

      // Record result
      let result = -1;
      switch (measurement) {
        case "time":
          result = new Number(process.hrtime.bigint() - startTime!).valueOf();
          break;
        case "memory":
          result = await getMemoryUsed();
          break;
        case "network":
          result = totalSentBytes - startSentBytes;
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
      let result0 = automerges[0];
      for (let i = 1; i < USERS; i++) {
        assert.deepStrictEqual(automerges[i], result0);
      }
    }

    record(
      "micro_automerge/" + measurement,
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

function Register() {
  return new MicroAutomergeBenchmark("Register", {
    Set: [(doc, rng) => (doc.v = rng()), 1],
  });
}

function Counter() {
  return new MicroAutomergeBenchmark("Counter", {
    Add: [
      (doc, rng) => {
        let counter: Automerge.Counter | undefined = doc.v;
        if (counter === undefined) {
          counter = new Automerge.Counter(Math.floor(rng() * 100 - 50));
          doc.v = counter;
          // Doesn't like if you increment a new counter
          return;
        }
        counter.increment(Math.floor(rng() * 100 - 50));
      },
      1,
    ],
  });
}

function CounterMap() {
  return new MicroAutomergeBenchmark("CounterMap", {
    Toggle: [
      (doc, rng) => {
        let key = Math.floor(rng() * 100);
        if (doc[key]) delete doc[key];
        else doc[key] = new Automerge.Counter();
      },
      0.5,
    ],
    ValueOp: [
      (doc, rng) => {
        let key = Math.floor(rng() * 100);
        let value = doc[key] as Automerge.Counter;
        if (value === undefined) {
          value = new Automerge.Counter(Math.floor(rng() * 100 - 50));
          doc[key] = value;
          // Doesn't like if you increment a new counter
          return;
        }
        value.increment(Math.floor(rng() * 100 - 50));
      },
      0.5,
    ],
  });
}

/**
 * Set is maintained at a rolling size of 100,
 * but many more elements are added overall.
 * Useful for memory benchmarking.
 * Note each op is an add+delete, unlike AddWinsSet().
 */
function CounterMapRolling() {
  let i = 0;
  return new MicroAutomergeBenchmark("CounterMapRolling", {
    Roll: [
      (doc, rng) => {
        if (i >= 100) delete doc[i - 100];
        doc[i] = new Automerge.Counter(Math.floor(rng() * 100 - 50));
        i++;
      },
      1.0,
    ],
  });
}

function LwwMap() {
  return new MicroAutomergeBenchmark("LwwMap", {
    Toggle: [
      (doc, rng) => {
        let key = Math.floor(rng() * 100);
        if (doc[key]) delete doc[key];
        else doc[key] = 0;
      },
      0.5,
    ],
    ValueOp: [
      (doc, rng) => {
        let key = Math.floor(rng() * 100);
        doc[key] = Math.floor(rng() * 100 - 50);
      },
      0.5,
    ],
  });
}

function LwwMapRolling() {
  let i = 0;
  return new MicroAutomergeBenchmark("LwwMapRolling", {
    Roll: [
      (doc, rng) => {
        if (i >= 100) delete doc[i - 100];
        doc[i] = Math.floor(rng() * 100 - 50);
        i++;
      },
      1.0,
    ],
  });
}

function TextLtr() {
  return new MicroAutomergeBenchmark("TextLtr", {
    Op: [
      (doc, rng) => {
        let text = doc.v as Automerge.Text | undefined;
        if (text === undefined) {
          text = new Automerge.Text();
          doc.v = text;
        }
        if (text.length > 100) text.deleteAt!(Math.floor(rng() * 100));
        else text.insertAt!(text.length, randomChar(rng));
      },
      1.0,
    ],
  });
}

function TextRandom() {
  return new MicroAutomergeBenchmark("TextRandom", {
    Op: [
      (doc, rng) => {
        let text = doc.v as Automerge.Text | undefined;
        if (text === undefined) {
          text = new Automerge.Text();
          doc.v = text;
        }
        if (text.length > 100) text.deleteAt!(Math.floor(rng() * 100));
        else
          text.insertAt!(
            Math.floor(rng() * (text.length + 1)),
            randomChar(rng)
          );
      },
      1.0,
    ],
  });
}

export default async function microAutomerge(args: string[]) {
  let benchmark: MicroAutomergeBenchmark;
  switch (args[0]) {
    case "Register":
      benchmark = Register();
      break;
    case "Counter":
      benchmark = Counter();
      break;
    case "CounterMap":
      benchmark = CounterMap();
      break;
    case "CounterMapRolling":
      benchmark = CounterMapRolling();
      break;
    case "LwwMap":
      benchmark = LwwMap();
      break;
    case "LwwMapRolling":
      benchmark = LwwMapRolling();
      break;
    case "TextLtr":
      benchmark = TextLtr();
      break;
    case "TextRandom":
      benchmark = TextRandom();
      break;
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
