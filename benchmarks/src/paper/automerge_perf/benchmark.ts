import * as crdts from "@collabs/collabs";
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
import { assert } from "chai";

// Based on https://github.com/automerge/automerge-perf/blob/master/edit-by-index/baseline.js

const DEBUG = false;

const OPS = edits.length;
const ROUND_OPS = 25978;
const SEED = "42";

interface ITestFactory {
  setup(rng: seedrandom.prng): void;
  /**
   * Free old state so that it can be GC'd.
   */
  cleanup(): void;
  processEdit(edit: [number, number, string | undefined]): void;
  /**
   * Reset this on each call to setup()
   */
  getSentBytes(): number;
  /**
   * Return undefined if you don't want to check for
   * correctness.
   */
  getText(): string | undefined;
  /**
   * Save the current state as saveData.  Also return
   * the length of the saveData in bytes.
   *
   * Load will be called soon after save.
   *
   * This will be timed, so don't do excessive extra work
   * that wouldn't be part of normal saving.
   */
  save(): [saveData: any, byteLength: number];
  /**
   * Like setup, but also load the state from
   * saveData.  In particular, use a new replica id
   * (rng is provided for this).
   *
   * This will be timed, so don't do excessive extra work
   * that wouldn't be part of normal loading.
   *
   * Don't worry about resetting getSentBytes since it
   * won't be measured anyway.
   */
  load(saveData: any, rng: seedrandom.prng): void;
}

class AutomergePerfBenchmark {
  constructor(
    private readonly testName: string,
    private readonly testFactory: ITestFactory
  ) {}

  async run(
    measurement: "time" | "memory" | "network" | "save",
    frequency: "whole" | "rounds"
  ) {
    console.log("Starting automerge_perf test: " + this.testName);

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
      if (trial !== -getWarmupTrials()) this.testFactory.cleanup();

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

      const replicaIdRng = seedrandom(SEED);
      // TODO: should we include setup in the time recording?
      this.testFactory.setup(replicaIdRng);

      switch (measurement) {
        case "time":
          startTime = process.hrtime.bigint();
          break;
        case "network":
          startSentBytes = this.testFactory.getSentBytes();
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
              ans[measurement] =
                this.testFactory.getSentBytes() - startSentBytes;
              break;
            case "save":
              let beforeSave: string | undefined;
              if (DEBUG) beforeSave = this.testFactory.getText();
              // We add sleeps between measured things to make
              // them more independent; before adding this,
              // I've noticed changes to
              // save code that affected load times.
              await sleep(1000);
              const saveStartTime = process.hrtime.bigint();
              const [saveData, saveSize] = this.testFactory.save();
              const saveTime = new Number(
                process.hrtime.bigint() - saveStartTime!
              ).valueOf();
              this.testFactory.cleanup();
              await sleep(1000);
              const loadStartTime = process.hrtime.bigint();
              this.testFactory.load(saveData, replicaIdRng);
              this.testFactory.getText(); // Read the state
              const loadTime = new Number(
                process.hrtime.bigint() - loadStartTime!
              ).valueOf();
              ans = {
                saveTime,
                saveSize,
                loadTime,
              };
              if (DEBUG) {
                const afterSave = this.testFactory.getText();
                assert.strictEqual(
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

        // Process one edit
        this.testFactory.processEdit(edits[op]);
        // if (measurement === "memory") await sleep(0);
      }

      // // For profiling save times:
      // console.log("saving repeatedly");
      // while (true) {
      //   this.testFactory.save();
      // }

      // const textStartTime = process.hrtime.bigint();
      // const text = this.testFactory.getText();
      // const textTime = new Number(
      //   process.hrtime.bigint() - textStartTime!
      // ).valueOf();
      // console.log("getText() time: " + textTime);

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
          result[measurement] =
            this.testFactory.getSentBytes() - startSentBytes;
          break;
        case "save":
          await sleep(1000);
          const saveStartTime = process.hrtime.bigint();
          const [saveData, saveSize] = this.testFactory.save();
          const saveTime = new Number(
            process.hrtime.bigint() - saveStartTime!
          ).valueOf();
          this.testFactory.cleanup();
          await sleep(1000);
          const loadStartTime = process.hrtime.bigint();

          // // For profiling load times:
          // console.log("Loading repeatedly");
          // while (true) {
          //   this.testFactory.cleanup();
          //   this.testFactory.load(saveData, replicaIdRng);
          // }

          this.testFactory.load(saveData, replicaIdRng);
          this.testFactory.getText(); // Read the state
          const loadTime = new Number(
            process.hrtime.bigint() - loadStartTime!
          ).valueOf();
          result = {
            saveTime,
            saveSize,
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

      let textResult = this.testFactory.getText();
      if (textResult !== undefined) {
        // Check result
        if (textResult != finalText) {
          assert.strictEqual(
            textResult,
            finalText,
            "textResult does not equal final text"
          );
        }
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
        "automerge_perf/" + oneRecord,
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

// TODO: record document size over time, to plot memory against

function plainJsArray() {
  let chars: string[];
  return new AutomergePerfBenchmark("Plain JS array", {
    setup() {
      chars = [];
    },
    cleanup() {
      chars = [];
    },
    processEdit(edit) {
      chars.splice(...(edit as [number, number, string]));
    },
    getSentBytes() {
      return 0;
    },
    getText() {
      return chars.join("");
    },
    save() {
      const saveData = this.getText()!;
      return [saveData, saveData.length];
    },
    load(saveData: string) {
      chars = [...saveData];
    },
  });
}

function resettingLww() {
  let generator: crdts.TestingNetworkGenerator | null;
  let runtime: crdts.Runtime | null;
  let list: crdts.ResettingMutCList<crdts.LwwCRegister<string>> | null;

  return new AutomergePerfBenchmark("Resetting Lww", {
    setup(rng) {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime(new crdts.ManualBatchingStrategy(), rng);
      list = runtime.registerCrdt(
        "text",
        (initToken) =>
          new crdts.ResettingMutCList(
            initToken,
            (valueInitToken) => new crdts.LwwCRegister(valueInitToken, "")
          )
      );
    },
    cleanup() {
      generator = null;
      runtime = null;
      list = null;
    },
    processEdit(edit) {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list!.insert(edit[0]).value = edit[2];
      } else {
        // Delete character at edit[0]
        list!.delete(edit[0]);
      }
      runtime!.commitBatch();
    },
    getSentBytes() {
      return generator!.getTotalSentBytes();
    },
    getText() {
      return list!.map((lww) => lww.value).join("");
    },
    save() {
      const saveData = runtime!.save();
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array, rng) {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime(new crdts.ManualBatchingStrategy(), rng);
      list = runtime.registerCrdt(
        "text",
        (initToken) =>
          new crdts.ResettingMutCList(
            initToken,
            (valueInitToken) => new crdts.LwwCRegister(valueInitToken, "")
          )
      );
      runtime.load(saveData);
    },
  });
}

function deletingLww() {
  let generator: crdts.TestingNetworkGenerator | null;
  let runtime: crdts.Runtime | null;
  let list: crdts.DeletingMutCList<crdts.LwwCRegister<string>, []> | null;

  return new AutomergePerfBenchmark("Deleting Lww", {
    setup(rng) {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime(new crdts.ManualBatchingStrategy(), rng);
      list = runtime.registerCrdt(
        "text",
        (initToken) =>
          new crdts.DeletingMutCList(
            initToken,
            (valueInitToken) => new crdts.LwwCRegister(valueInitToken, "")
          )
      );
    },
    cleanup() {
      generator = null;
      runtime = null;
      list = null;
    },
    processEdit(edit) {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list!.insert(edit[0]).value = edit[2];
      } else {
        // Delete character at edit[0]
        list!.delete(edit[0]);
      }
      runtime!.commitBatch();
    },
    getSentBytes() {
      return generator!.getTotalSentBytes();
    },
    getText() {
      return list!.map((lww) => lww.value).join("");
    },
    save() {
      const saveData = runtime!.save();
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array, rng) {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime(new crdts.ManualBatchingStrategy(), rng);
      list = runtime.registerCrdt(
        "text",
        (initToken) =>
          new crdts.DeletingMutCList(
            initToken,
            (valueInitToken) => new crdts.LwwCRegister(valueInitToken, "")
          )
      );
      runtime.load(saveData);
    },
  });
}

function textCrdt() {
  let generator: crdts.TestingNetworkGenerator | null;
  let runtime: crdts.Runtime | null;
  let list: crdts.CText | null;

  return new AutomergePerfBenchmark("TextCrdt", {
    setup(rng) {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime(new crdts.ManualBatchingStrategy(), rng);
      list = runtime.registerCrdt("text", crdts.Pre(crdts.CText)());
    },
    cleanup() {
      generator = null;
      runtime = null;
      list = null;
    },
    processEdit(edit) {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list!.insert(edit[0], edit[2]);
      } else {
        // Delete character at edit[0]
        list!.delete(edit[0]);
      }
      runtime!.commitBatch();
    },
    getSentBytes() {
      return generator!.getTotalSentBytes();
    },
    getText() {
      return list!.toString();
    },
    save() {
      const saveData = runtime!.save();
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array, rng) {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime(new crdts.ManualBatchingStrategy(), rng);
      list = runtime.registerCrdt("text", crdts.Pre(crdts.CText)());
      runtime.load(saveData);
    },
  });
}

function automerge() {
  let state: { text: Automerge.Text } | null;
  let totalSentBytes: number;

  return new AutomergePerfBenchmark("Automerge", {
    setup() {
      state = Automerge.from({ text: new Automerge.Text() });
      totalSentBytes = 0;
    },
    cleanup() {
      state = null;
    },
    processEdit(edit) {
      let newState = Automerge.change(state!, (doc) => {
        if (edit[1] > 0) doc.text.deleteAt!(edit[0], edit[1]);
        if (edit.length > 2) doc.text.insertAt!(edit[0], edit[2]!);
      });
      let message = JSON.stringify(Automerge.getChanges(state!, newState));
      totalSentBytes += message.length;
      state = newState;
    },
    getSentBytes() {
      return totalSentBytes;
    },
    getText() {
      return state!.text.join(""); // TODO: use toString() instead?
    },
    save() {
      // TODO: Readme says this is a Uint8Array, but
      // TypeScript says it is a string.  Not a problem,
      // but we should make sure length accurately gives
      // the byte length, not the uint16 length.
      const saveData = Automerge.save(state!);
      return [saveData, saveData.length];
    },
    load(saveData: string) {
      state = Automerge.load(saveData);
    },
  });
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
  let list: crdts.LwwCMap<number, string> | null;

  return new AutomergePerfBenchmark("LwwMap", {
    setup(rng) {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime(new crdts.ManualBatchingStrategy(), rng);
      list = runtime.registerCrdt(
        "text",
        (initToken) => new crdts.LwwCMap<number, string>(initToken)
      );
    },
    cleanup() {
      generator = null;
      runtime = null;
      list = null;
    },
    processEdit(edit) {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list!.set(edit[0], edit[2]);
      } else {
        // Delete character at edit[0]
        list!.delete(edit[0]);
      }
      runtime!.commitBatch();
    },
    getSentBytes() {
      return generator!.getTotalSentBytes();
    },
    getText() {
      return undefined;
    },
    save() {
      const saveData = runtime!.save();
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array, rng) {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime(new crdts.ManualBatchingStrategy(), rng);
      list = runtime.registerCrdt(
        "text",
        (initToken) => new crdts.LwwCMap<number, string>(initToken)
      );
      runtime.load(saveData);
    },
  });
}

function yjs() {
  let doc: Y.Doc | null;
  let totalSentBytes: number;

  return new AutomergePerfBenchmark("Yjs", {
    setup() {
      doc = new Y.Doc();
      totalSentBytes = 0;
      doc.on("update", (update: any) => {
        totalSentBytes += update.byteLength;
      });
    },
    cleanup() {
      doc = null;
    },
    processEdit(edit) {
      doc!.transact(() => {
        if (edit[2] !== undefined) {
          doc!.getText("text").insert(edit[0], edit[2]);
        } else {
          doc!.getText("text").delete(edit[0], 1);
        }
      });
    },
    getSentBytes() {
      return totalSentBytes;
    },
    getText() {
      return doc!.getText("text").toString();
    },
    save() {
      // TODO: also try encodeStateAsUpdateV2 and applyUpdateV2,
      // use whichever is better.
      const saveData = Y.encodeStateAsUpdate(doc!);
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array) {
      // Proceed like newTodoList, but without doing any
      // operations or recording sent bytes.
      doc = new Y.Doc();
      Y.applyUpdate(doc, saveData);
    },
  });
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

function richText() {
  // Copied from rich text demo.  TODO: way to reuse same file.
  interface RichCharEventsRecord extends crdts.CrdtEventsRecord {
    Format: { key: string } & crdts.CrdtEvent;
  }

  class RichChar extends crdts.CObject<RichCharEventsRecord> {
    private readonly attributes: crdts.LwwCMap<string, any>;

    /**
     * char comes from a Quill Delta's insert field, split
     * into single characters if a string.  So it is either
     * a single char, or (for an embed) a JSON-serializable
     * object with a single property.
     */
    constructor(
      initToken: crdts.CrdtInitToken,
      readonly char: string | object
    ) {
      super(initToken);

      this.attributes = this.addChild("", crdts.Pre(crdts.LwwCMap)());

      // Events
      this.attributes.on("Set", (e) => {
        this.emit("Format", {
          key: e.key,
          meta: e.meta,
        });
      });
      this.attributes.on("Delete", (e) => {
        this.emit("Format", { key: e.key, meta: e.meta });
      });
    }

    getAttribute(attribute: string): any | null {
      return this.attributes.get(attribute) ?? null;
    }

    /**
     * null attribute deletes the existing one.
     */
    setAttribute(attribute: string, value: any | null) {
      if (value === null) {
        this.attributes.delete(attribute);
      } else {
        this.attributes.set(attribute, value);
      }
    }
  }

  interface RichTextEventsRecord extends crdts.CrdtEventsRecord {
    Insert: { startIndex: number; count: number } & crdts.CrdtEvent;
    Delete: { startIndex: number; count: number } & crdts.CrdtEvent;
    Format: { index: number; key: string } & crdts.CrdtEvent;
  }

  class RichText extends crdts.CObject<RichTextEventsRecord> {
    readonly text: crdts.DeletingMutCList<RichChar, [char: string | object]>;

    constructor(
      initToken: crdts.CrdtInitToken,
      initialChars: (string | object)[] = []
    ) {
      super(initToken);

      this.text = this.addChild(
        "",
        crdts.Pre(crdts.DeletingMutCList)(
          (valueInitToken, char) => {
            const richChar = new RichChar(valueInitToken, char);
            richChar.on("Format", (e) => {
              this.emit("Format", { index: this.text.indexOf(richChar), ...e });
            });
            return richChar;
          },
          initialChars.map((value) => [value])
        )
      );
      this.text.on("Insert", (e) => {
        this.emit("Insert", e);
      });
      this.text.on("Delete", (e) => this.emit("Delete", e));
    }

    get(index: number): RichChar {
      return this.text.get(index);
    }

    get length(): number {
      return this.text.length;
    }

    insert(
      index: number,
      char: string | object,
      attributes?: Record<string, any>
    ) {
      const richChar = this.text.insert(index, char);
      this.formatChar(richChar, attributes);
    }

    delete(startIndex: number, count: number) {
      this.text.delete(startIndex, count);
    }

    /**
     * null attribute deletes the existing one.
     */
    format(index: number, newAttributes?: Record<string, any>) {
      this.formatChar(this.get(index), newAttributes);
    }

    private formatChar(
      richChar: RichChar,
      newAttributes?: Record<string, any>
    ) {
      if (newAttributes) {
        for (const entry of Object.entries(newAttributes)) {
          richChar.setAttribute(...entry);
        }
      }
    }

    asArray(): (string | object)[] {
      return [...this.text].map((richChar) => richChar.char);
    }
  }

  let generator: crdts.TestingNetworkGenerator | null;
  let runtime: crdts.Runtime | null;
  let list: RichText | null;

  return new AutomergePerfBenchmark("RichText", {
    setup(rng) {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime(new crdts.ManualBatchingStrategy(), rng);
      list = runtime.registerCrdt("text", crdts.Pre(RichText)());
    },
    cleanup() {
      generator = null;
      runtime = null;
      list = null;
    },
    processEdit(edit) {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list!.insert(edit[0], edit[2]);
      } else {
        // Delete character at edit[0]
        list!.delete(edit[0], 1);
      }
      runtime!.commitBatch();
    },
    getSentBytes() {
      return generator!.getTotalSentBytes();
    },
    getText() {
      return list!.asArray().join("");
    },
    save() {
      const saveData = runtime!.save();
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array, rng) {
      generator = new crdts.TestingNetworkGenerator();
      runtime = generator.newRuntime(new crdts.ManualBatchingStrategy(), rng);
      list = runtime.registerCrdt("text", crdts.Pre(RichText)());
      runtime.load(saveData);
    },
  });
}

export default async function automergePerf(args: string[]) {
  let benchmark: AutomergePerfBenchmark;
  switch (args[0]) {
    case "plainJsArray":
      benchmark = plainJsArray();
      break;
    case "resettingLww":
      benchmark = resettingLww();
      break;
    case "deletingLww":
      benchmark = deletingLww();
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
    case "richText":
      benchmark = richText();
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
