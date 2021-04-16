import Automerge from "automerge";
import { assert } from "chai";
import seedrandom from "seedrandom";
import { getIsTestRun, getMemoryUsed, record, sleep } from "../record";

const WARMUP = 5;
const TRIALS = 10;
const OPS = 100;
const ROUND_OPS = 10;
const SEED = "42";
const USERS = 16;

class CompareBenchmark {
  constructor(
    private readonly testName: string,
    private readonly setupFun: (rng: seedrandom.prng) => void
  ) {}

  private generateRandomOps(rng: seedrandom.prng) {
    const rand = rng();
    return rand;
  }

  async run(
    measurement: "time" | "memory" | "network",
    frequency: "whole" | "rounds"
  ) {
    console.log("Starting bench_compare test: " + this.testName);

    if (getIsTestRun()) return;

    let results = new Array<number>(TRIALS);
    let roundResults = new Array<number[]>(TRIALS);
    let roundOps = new Array<number>(Math.ceil(OPS / ROUND_OPS));
    let baseMemories = new Array<number>(TRIALS);
    if (frequency === "rounds") {
      for (let i = 0; i < TRIALS; i++)
        roundResults[i] = new Array<number>(Math.ceil(OPS / ROUND_OPS));
    }

    let startingBaseline = 0;
    if (measurement === "memory") startingBaseline = await getMemoryUsed();

    for (let trial = -WARMUP; trial < TRIALS; trial++) {
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

      this.setupFun(seedrandom(SEED));

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
            d.value = this.generateRandomOps(rng);
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

        if (measurement === "memory") await sleep(0);
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
      "beanch_compare/" + measurement,
      this.testName,
      frequency,
      TRIALS,
      results,
      roundResults,
      roundOps,
      measurement === "memory"
        ? baseMemories
        : new Array<number>(TRIALS).fill(0),
      startingBaseline
    );
  }
}

function automergeRegister() {
  let totalSentBytes: number;
  return new CompareBenchmark("automergeRegister", () => {});
}

// TODO: Automerge.Counter; Automerge our map, list tests

export default async function benchCompare(args: string[]) {
  let benchmark: CompareBenchmark;
  switch (args[0]) {
    case "automergeRegister":
      benchmark = automergeRegister();
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
