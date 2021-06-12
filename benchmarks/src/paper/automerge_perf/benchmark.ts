import * as crdts from "compoventuals-client";
import { edits, finalText } from "./editing-trace";
import Automerge from "automerge";
import * as Y from "yjs";
import {
  getMemoryUsed,
  record,
  sleep,
  getRecordedTrials,
  getWarmupTrials,
} from "../record";
import seedrandom from "seedrandom";

// Based on https://github.com/automerge/automerge-perf/blob/master/edit-by-index/baseline.js

const OPS = edits.length;
const ROUND_OPS = 25978;
const SEED = "42";

class AutomergePerfBenchmark {
  constructor(
    private readonly testName: string,
    private readonly setupFun: (rng: seedrandom.prng) => void,
    private readonly cleanupFun: () => void,
    private readonly processEdit: (
      edit: [number, number, string | undefined]
    ) => void,
    private readonly getSentBytes: () => number,
    private readonly getFinalText?: () => string
  ) {}

  async run(
    measurement: "time" | "memory" | "network",
    frequency: "whole" | "rounds"
  ) {
    console.log("Starting automerge_perf test: " + this.testName);

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
      if (trial !== -getWarmupTrials()) this.cleanupFun();

      // Sleep between trials
      await sleep(1000);
      console.log("Starting trial " + trial);

      let startTime: bigint;
      let startSentBytes = 0;
      let baseMemory = 0;

      if (measurement === "memory") {
        baseMemory = await getMemoryUsed();
        if (trial >= 0) baseMemories[trial] = baseMemory;
      }

      // TODO: should we include setup in the time recording?
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
      for (op = 0; op < edits.length; op++) {
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

        // Process one edit
        this.processEdit(edits[op]);
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

      if (this.getFinalText) {
        // Check result
        let result = this.getFinalText();
        if (result != finalText) {
          throw new Error("result does not equal final text");
        }
      }
    }

    record(
      "automerge_perf/" + measurement,
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

// TODO: record document size over time, to plot memory against

function trivial() {
  return new AutomergePerfBenchmark(
    "Trivial",
    () => {},
    () => {},
    () => {},
    () => 0
  );
}

function plainJsArray() {
  let chars: string[];
  return new AutomergePerfBenchmark(
    "Plain JS array",
    () => {
      chars = [];
    },
    () => {
      chars = [];
    },
    (edit) => chars.splice(...(edit as [number, number, string])),
    () => 0,
    () => chars.join("")
  );
}

function treedocLww() {
  let generator: crdts.TestingNetworkGenerator | null;
  let runtime: crdts.Runtime | null;
  let list: crdts.TreedocList<crdts.LwwRegister<string>> | null;

  return new AutomergePerfBenchmark(
    "TreedocList<LwwRegister>",
    (rng) => {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime("manual", rng);
      list = runtime.registerCrdt(
        "text",
        new crdts.TreedocList<crdts.LwwRegister<string>>(
          () => new crdts.LwwRegister("")
        )
      );
    },
    () => {
      generator = null;
      runtime = null;
      list = null;
    },
    (edit) => {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list!.insertAt(edit[0])[1].value = edit[2];
      } else {
        // Delete character at edit[0]
        list!.deleteAt(edit[0]);
      }
      runtime!.commitBatch();
    },
    () => generator!.getTotalSentBytes(),
    () =>
      list!
        .asArray()
        .map((lww) => lww.value)
        .join("")
  );
}

function textCrdt() {
  let generator: crdts.TestingNetworkGenerator | null;
  let runtime: crdts.Runtime | null;
  let list: crdts.TreedocPrimitiveList<string> | null;

  return new AutomergePerfBenchmark(
    "TextCrdt",
    (rng) => {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime("manual", rng);
      list = runtime.registerCrdt(
        "text",
        new crdts.TreedocPrimitiveList<string>()
      );
    },
    () => {
      generator = null;
      runtime = null;
      list = null;
    },
    (edit) => {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list!.insertAt(edit[0], edit[2]);
      } else {
        // Delete character at edit[0]
        list!.deleteAt(edit[0]);
      }
      runtime!.commitBatch();
    },
    () => generator!.getTotalSentBytes(),
    () => list!.asArray().join("")
  );
}

function automerge() {
  let state: { text: Automerge.Text } | null;
  let totalSentBytes: number;

  return new AutomergePerfBenchmark(
    "Automerge",
    () => {
      state = Automerge.from({ text: new Automerge.Text() });
      totalSentBytes = 0;
    },
    () => {
      state = null;
    },
    (edit) => {
      let newState = Automerge.change(state!, (doc) => {
        if (edit[1] > 0) doc.text.deleteAt!(edit[0], edit[1]);
        if (edit.length > 2) doc.text.insertAt!(edit[0], edit[2]!);
      });
      let message = JSON.stringify(Automerge.getChanges(state!, newState));
      totalSentBytes += message.length;
      state = newState;
    },
    () => totalSentBytes,
    () => state!.text.join("") // TODO: use toString() instead?
  );
}

// function automergeNoText() {
//   let state: { text: string[] } | null;
//   let totalSentBytes: number;
//
//   return new AutomergePerfBenchmark(
//     "AutomergeNoText",
//     () => {
//       state = Automerge.from({ text: [] });
//       totalSentBytes = 0;
//     },
//     () => {
//       state = null;
//     },
//     (edit) => {
//       let newState = Automerge.change(state!, (doc) => {
//         // @ts-ignore deleteAt exists
//         if (edit[1] > 0) doc.text.deleteAt!(edit[0], edit[1]);
//         // @ts-ignore insertAt exists
//         if (edit.length > 2) doc.text.insertAt!(edit[0], edit[2]!);
//       });
//       let message = JSON.stringify(Automerge.getChanges(state!, newState));
//       totalSentBytes += message.length;
//       state = newState;
//     },
//     () => totalSentBytes,
//     () => state!.text.join("")
//   );
// }

function mapLww() {
  let generator: crdts.TestingNetworkGenerator | null;
  let runtime: crdts.Runtime | null;
  let list: crdts.LwwPlainMap<number, string> | null;

  return new AutomergePerfBenchmark(
    "LwwMap",
    (rng) => {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime("manual", rng);
      list = runtime.registerCrdt(
        "text",
        new crdts.LwwPlainMap<number, string>()
      );
    },
    () => {
      generator = null;
      runtime = null;
      list = null;
    },
    (edit) => {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list!.set(edit[0], edit[2]);
      } else {
        // Delete character at edit[0]
        list!.delete(edit[0]);
      }
      runtime!.commitBatch();
    },
    () => generator!.getTotalSentBytes()
  );
}

function yjs() {
  let doc: Y.Doc | null;
  let totalSentBytes: number;

  return new AutomergePerfBenchmark(
    "Yjs",
    () => {
      doc = new Y.Doc();
      totalSentBytes = 0;
      doc.on("update", (update: any) => {
        totalSentBytes += update.byteLength;
      });
    },
    () => {
      doc = null;
    },
    (edit) => {
      doc!.transact(() => {
        if (edit[2] !== undefined) {
          doc!.getText("text").insert(edit[0], edit[2]);
        } else {
          doc!.getText("text").delete(edit[0], 1);
        }
      });
    },
    () => totalSentBytes,
    () => doc!.getText("text").toString()
  );
}

// Removed; according to dmonad benchmarks, takes 20,000 seconds!
// function deltaCrdts() {
//   let doc: any;
//   let totalSentBytes: number;
//
//   return new AutomergePerfBenchmark(
//     "deltaCrdts",
//     () => {
//       doc = DeltaCRDT("rga")("1");
//       totalSentBytes = 0;
//     },
//     () => {
//       doc = null;
//     },
//     (edit) => {
//       let message: Uint8Array;
//       if (edit[2] !== undefined) {
//         message = deltaCodec.encode(doc.insertAt(edit[0], edit[2]));
//       } else {
//         message = deltaCodec.encode(doc.removeAt(edit[0], edit[1]));
//       }
//       totalSentBytes += message.byteLength;
//     },
//     () => totalSentBytes,
//     () => doc.value().join("")
//   );
// }

// TODO: use two crdts, like in dmonad benchmarks?

export default async function automergePerf(args: string[]) {
  let benchmark: AutomergePerfBenchmark;
  switch (args[0]) {
    case "trivial":
      benchmark = trivial();
      break;
    case "plainJsArray":
      benchmark = plainJsArray();
      break;
    case "treedocLww":
      benchmark = treedocLww();
      break;
    case "textCrdt":
      benchmark = textCrdt();
      break;
    case "mapLww":
      benchmark = mapLww();
      break;
    case "yjs":
      benchmark = yjs();
      break;
    case "automerge":
      benchmark = automerge();
      break;
    // case "automergeNoText":
    //   benchmark = automergeNoText();
    //   break;
    // case "deltaCrdts":
    //   benchmark = deltaCrdts();
    //   break;
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
