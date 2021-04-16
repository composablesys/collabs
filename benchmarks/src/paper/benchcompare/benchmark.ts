import { assert } from "chai";
import { crdts, network } from "compoventuals-client";
import Automerge from "automerge";
import seedrandom from "seedrandom";
import { getIsTestRun, getMemoryUsed, record, sleep } from "../record";

const WARMUP = 5;
const TRIALS = 10;
const OPS = 1000;
const ROUND_OPS = 100;
const SEED = "42";
const USERS = 16;

class CompareBenchmark {
  constructor(
    private readonly testName: string,
    private readonly setupFun: (rng: seedrandom.prng) => void,
    private readonly getSentBytes: () => number
  ) {}

  private generateRandomOps(rng: seedrandom.prng) {
    const rand = rng()
    return rand;
  }

  async run(
    measurement: "time" | "memory" | "network",
    frequency: "whole" | "rounds"
  ) {
    console.log("Starting micro_crdts test: " + this.testName);

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
      let originDoc = Automerge.from({ value : [] })
      let automerges = new Map<number, any>();
      for (let i = 0; i < USERS; i++) {
        let doc = Automerge.init();
        Automerge.merge(originDoc, doc)
        automerges.set(i, doc);
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
        case "network":
          startSentBytes = this.getSentBytes();
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
              ans = await getMemoryUsed();
              break;
            case "network":
              ans = this.getSentBytes() - startSentBytes;
          }
          if (trial >= 0) roundResults[trial][round] = ans;
          roundOps[round] = op;
          round++;
        }

        // Do one "op" (really one op per user).
        // Each user sends concurrently, then receives
        // each other's messages.
        for (let i = 0; i < USERS; i++) {
          let op = this.generateRandomOps(rng);
          let doc = automerges.get(i);
          doc = Automerge.change(doc, 'Add a random value', d => {
            doc.value.push(0, {val : op})
          })
          automerges.set(i, doc);
        }

        for(let i = 0; i < USERS; i++) {
          originDoc = Automerge.merge(originDoc, automerges.get(i));
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
          result = this.getSentBytes() - startSentBytes;
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

function automerge() {
  let totalSentBytes: number;
  return new CompareBenchmark(
    "Automerge",
    () => {totalSentBytes = 0},
    () => totalSentBytes
  )
}


export default async function benchCompare(args: string[]) {
  let benchmark: CompareBenchmark;
  switch (args[0]) {
    case "compareBench":
      benchmark = automerge();
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
