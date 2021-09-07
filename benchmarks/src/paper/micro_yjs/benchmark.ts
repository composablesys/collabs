import { assert } from "chai";
import seedrandom from "seedrandom";
import * as Y from "yjs";
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

class MicroYjsBenchmark {
  private readonly totalWeight: number;
  private readonly weightIndexedOps: ((
    doc: Y.Doc,
    rng: seedrandom.prng
  ) => void)[];
  private readonly cumulativeWeights: number[];
  constructor(
    private readonly testName: string,
    ops: {
      [opName: string]: [(doc: Y.Doc, rng: seedrandom.prng) => void, number];
    },
    private readonly getState: (doc: Y.Doc) => any
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
    console.log("Starting micro_yjs test: " + this.testName);

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

      let startTime: bigint;
      let totalSentBytes = 0;
      let baseMemory = 0;

      // Setup
      // TODO: should this be included in memory?
      let yjss = new Array<Y.Doc>(USERS);
      let changes = new Array<Uint8Array>(USERS);
      let turn = -1;

      for (let i = 0; i < USERS; i++) {
        // TODO: deterministic actor ids (second arg)
        yjss[i] = new Y.Doc();
        yjss[i].on("update", (update: Uint8Array) => {
          // Yjs dispatches update events not just when i sends
          // a message, but also when it receives one for
          // the first time.  We only care when they actually
          // send the message.
          if (turn === i) {
            totalSentBytes += update.byteLength;
            changes[i] = update;
          }
        });
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
              ans[measurement] = await getMemoryUsed();
              break;
            case "network":
              ans[measurement] = totalSentBytes;
              break;
            case "save":
              // We add sleeps between measured things to make
              // them more independent; before adding this,
              // I've noticed changes to
              // save code that affected load times.
              await sleep(1000);
              // Just save and load user 0
              const saveStartTime = process.hrtime.bigint();
              const saveData = Y.encodeStateAsUpdate(yjss[0]);
              const saveTime = new Number(
                process.hrtime.bigint() - saveStartTime!
              ).valueOf();
              yjss[0] = undefined as unknown as Y.Doc;
              await sleep(1000);
              // Create a new Y.Doc for user 0, then load
              const loadStartTime = process.hrtime.bigint();
              yjss[0] = new Y.Doc();
              Y.applyUpdate(yjss[0], saveData);
              yjss[0].on("update", (update: Uint8Array) => {
                if (turn === 0) {
                  totalSentBytes += update.byteLength;
                  changes[0] = update;
                }
              });
              const loadTime = new Number(
                process.hrtime.bigint() - loadStartTime!
              ).valueOf();
              // Record
              ans = {
                saveTime,
                saveSize: saveData.length,
                loadTime,
              };
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
          turn = i;
          yjss[i].transact(() => this.getWeightedRandomOp(rng)(yjss[i], rng));
        }
        turn = -1;
        for (let i = 0; i < USERS; i++) {
          for (let j = 0; j < USERS; j++) {
            if (j != i) {
              Y.applyUpdate(yjss[j], changes[i]);
            }
          }
        }

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
          result[measurement] = await getMemoryUsed();
          break;
        case "network":
          result[measurement] = totalSentBytes;
          break;
        case "save":
          await sleep(1000);
          // Just save and load user 0
          const saveStartTime = process.hrtime.bigint();
          const saveData = Y.encodeStateAsUpdate(yjss[0]);
          const saveTime = new Number(
            process.hrtime.bigint() - saveStartTime!
          ).valueOf();
          yjss[0] = undefined as unknown as Y.Doc;
          await sleep(1000);
          // Create a new Y.Doc for user 0, then load
          const loadStartTime = process.hrtime.bigint();
          yjss[0] = new Y.Doc();
          Y.applyUpdate(yjss[0], saveData);
          yjss[0].on("update", (update: Uint8Array) => {
            if (turn === 0) {
              totalSentBytes += update.byteLength;
              changes[0] = update;
            }
          });
          const loadTime = new Number(
            process.hrtime.bigint() - loadStartTime!
          ).valueOf();
          // Record
          result = {
            saveTime,
            saveSize: saveData.length,
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
      let result0 = this.getState(yjss[0]);
      for (let i = 1; i < USERS; i++) {
        assert.deepStrictEqual(this.getState(yjss[i]), result0);
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
        "micro_yjs/" + oneRecord,
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

function Register() {
  return new MicroYjsBenchmark(
    "Register",
    {
      Set: [(doc, rng) => doc.getMap().set("v", rng()), 1],
    },
    (doc) => doc.getMap().get("v")
  );
}

function LwwMap() {
  return new MicroYjsBenchmark(
    "LwwMap",
    {
      Toggle: [
        (doc, rng) => {
          let key = Math.floor(rng() * 100);
          let map = doc.getMap();
          if (map.has(key + "")) map.delete(key + "");
          else map.set(key + "", 0);
        },
        0.5,
      ],
      Set: [
        (doc, rng) => {
          let key = Math.floor(rng() * 100);
          let map = doc.getMap();
          map.set(key + "", Math.floor(rng() * 100 - 50));
        },
        0.5,
      ],
    },
    (doc) => new Map(doc.getMap().entries())
  );
}

/**
 * Set is maintained at a rolling size of 100,
 * but many more elements are added overall.
 * Useful for memory benchmarking.
 * Note each op is an add+delete, unlike AddWinsSet().
 */
function LwwMapRolling() {
  let i = 0;
  return new MicroYjsBenchmark(
    "LwwMapRolling",
    {
      Roll: [
        (doc, rng) => {
          let map = doc.getMap();
          if (i >= 100) map.delete(i - 100 + "");
          map.set(i + "", Math.floor(rng() * 100 - 50));
          i++;
        },
        1.0,
      ],
    },
    (doc) => new Map(doc.getMap().entries())
  );
}

function TextLtr() {
  return new MicroYjsBenchmark(
    "TextLtr",
    {
      Op: [
        (doc, rng) => {
          let text = doc.getText();
          if (text.length > 100) text.delete(Math.floor(rng() * 100), 1);
          else text.insert(text.length, randomChar(rng));
        },
        1.0,
      ],
    },
    (doc) => doc.getText().toString()
  );
}

function TextRandom() {
  return new MicroYjsBenchmark(
    "TextRandom",
    {
      Op: [
        (doc, rng) => {
          let text = doc.getText();
          if (text.length > 100) text.delete(Math.floor(rng() * 100), 1);
          else
            text.insert(Math.floor(rng() * (text.length + 1)), randomChar(rng));
        },
        1.0,
      ],
    },
    (doc) => doc.getText().toString()
  );
}

export default async function microYjs(args: string[]) {
  let benchmark: MicroYjsBenchmark;
  switch (args[0]) {
    case "Register":
      benchmark = Register();
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
