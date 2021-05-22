import { crdts, network } from "compoventuals-client";
import { edits, finalText } from "./editing-trace";
import framework from "../../../framework";
import Automerge from "automerge";
import * as Y from "yjs";

// Based on https://github.com/automerge/automerge-perf/blob/master/edit-by-index/baseline.js

const TRIALS = 1; // TODO: make 5 or 10 for real paper

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function getMemoryUsed(): Promise<number> {
  await sleep(100); // Sleep a bit to help the GC?
  global.gc();
  return process.memoryUsage().heapUsed;
}

const suite = framework.newSuite("paper/automerge_perf");

class AutomergePerfBenchmark {
  constructor(
    private readonly testName: string,
    private readonly setupFun: () => void,
    private readonly processEdit: (
      edit: [number, number, string | undefined]
    ) => void,
    private readonly getSentBytes: () => number,
    private readonly getFinalText?: () => string
  ) {}

  private totalTime = 0;
  private totalSentBytes = 0;
  private maxMemory = 0;

  private baseMemory = 0;

  private edit = 0;

  private roundStartEdits = 0;
  private roundStartTime = 0;
  private roundStartSentBytes = 0;

  add() {
    // TODO: real benchmarking (warmup, multiple runs,
    // record CPU, memory, network separately & incrementally,
    // record results in a file/using framework),
    // breathing room for GC in all benchmarks
    suite.addBenchmark(this.testName, async () => {
      this.baseMemory = await getMemoryUsed();

      console.log("Starting automerge_perf test: " + this.testName);

      // Warmup
      console.log("Warmup");
      this.setupFun();
      for (let i = 0; i < 10000; i++) {
        this.processEdit(edits[i]);
      }
      await sleep(0);

      for (let trial = 0; trial < TRIALS; trial++) {
        this.setupFun();

        this.roundStartEdits = 0;
        this.roundStartTime = 0;
        this.roundStartSentBytes = 0;

        console.log("Starting trial " + trial);
        for (this.edit = 0; this.edit < edits.length; this.edit++) {
          if (this.edit % 10000 === 0) {
            if (this.edit !== 0) {
              await this.record();
            }
            // Prepare for next measurement
            this.roundStartEdits = this.edit;
            this.roundStartSentBytes = this.getSentBytes();
            this.roundStartTime = Date.now();
          }
          // Process one edit
          this.processEdit(edits[this.edit]);
          // TODO: Let event loop rollover between ops - more
          // realistic?  Also gives GC some breathing
          // room.
          // This slows down the tests a lot, though.
          //await sleep(0);
        }
        // Record final result
        await this.record();

        if (this.getFinalText) {
          let result = this.getFinalText();
          if (result != finalText) {
            // TODO: show difference?
            throw new Error("result does not equal final text");
          }
        }

        // Print trial totals
        console.log(
          `Trial ${trial} finished for test ${this.testName}\n  total time = ${this.totalTime} ms\n  max memory = ${this.maxMemory}\n  total sent bytes = ${this.totalSentBytes}`
        );
      }
    });
  }

  private async record() {
    // Make measurements
    let roundEndTime = Date.now();
    let roundEndMemory = await getMemoryUsed();
    let roundEndSentBytes = this.getSentBytes();

    console.log("Edits applied so far: " + this.edit);

    let edits = this.edit - this.roundStartEdits;
    let roundTime = roundEndTime - this.roundStartTime;
    let roundMemory = roundEndMemory - this.baseMemory;
    let roundSentBytes = roundEndSentBytes - this.roundStartSentBytes;

    // Adjust cumulative results
    this.totalTime += roundTime;
    this.totalSentBytes += roundSentBytes;
    this.maxMemory = Math.max(this.maxMemory, roundMemory);

    // Record results
    // TODO: do this later in case disk IO messes it up
    // somehow?
    suite.recordResult(
      this.testName + "-Cpu",
      "Time (sec)",
      roundTime / 1000,
      0,
      1,
      {
        RoundStartEdit: this.roundStartEdits + "",
        RoundEndEdit: this.edit + "",
        Edits: edits + "",
      }
    );
    suite.recordResult(
      this.testName + "-Memory",
      "Memory (bytes)",
      roundMemory,
      0,
      1,
      {
        RoundStartEdit: this.roundStartEdits + "",
        RoundEndEdit: this.edit + "",
        Edits: edits + "",
      }
    );
    suite.recordResult(
      this.testName + "-SentBytes",
      "SentBytes",
      roundSentBytes,
      0,
      1,
      {
        RoundStartEdit: this.roundStartEdits + "",
        RoundEndEdit: this.edit + "",
        Edits: edits + "",
      }
    );
  }
}

// TODO: record document size over time, to plot memory against

function trivial() {
  new AutomergePerfBenchmark(
    "Trivial",
    () => {},
    () => {},
    () => 0
  ).add();
}

function plainJsArray() {
  let chars: string[];
  new AutomergePerfBenchmark(
    "Plain JS array",
    () => {
      chars = [];
    },
    (edit) => chars.splice(...(edit as [number, number, string])),
    () => 0,
    () => chars.join("")
  ).add();
}

function treedocLww() {
  let generator: network.TestingNetworkGenerator;
  let runtime: crdts.CrdtRuntime;
  let list: crdts.TreedocList<crdts.LwwRegister<string>>;

  new AutomergePerfBenchmark(
    "TreedocList<LwwRegister>",
    () => {
      generator = new network.TestingNetworkGenerator();
      runtime = generator.newRuntime("manual");
      list = runtime.registerCrdt(
        "",
        new crdts.TreedocList<crdts.LwwRegister<string>>(
          () => new crdts.LwwRegister(""),
          true
        )
      );
    },
    (edit) => {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list.insertAt(edit[0])[1].value = edit[2];
      } else {
        // Delete character at edit[0]
        list.deleteAt(edit[0]);
      }
      runtime.commitBatch();
    },
    () => generator.getTotalSentBytes(),
    () =>
      list
        .asArray()
        .map((lww) => lww.value)
        .join("")
  ).add();
}

function treedocPrimitiveLww() {
  let generator: network.TestingNetworkGenerator;
  let runtime: crdts.CrdtRuntime;
  let list: crdts.TreedocPrimitiveList<string>;

  new AutomergePerfBenchmark(
    "TreedocPrimitiveList",
    () => {
      generator = new network.TestingNetworkGenerator();
      runtime = generator.newRuntime("manual");
      list = runtime.registerCrdt("", new crdts.TreedocPrimitiveList<string>());
    },
    (edit) => {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list.insertAt(edit[0], edit[2]);
      } else {
        // Delete character at edit[0]
        list.deleteAt(edit[0]);
      }
      runtime.commitBatch();
    },
    () => generator.getTotalSentBytes(),
    () => list.asArray().join("")
  ).add();
}

function automerge() {
  let state: { text: Automerge.Text };
  let totalSentBytes: number;

  new AutomergePerfBenchmark(
    "Automerge",
    () => {
      state = Automerge.from({ text: new Automerge.Text() });
      totalSentBytes = 0;
    },
    (edit) => {
      let newState = Automerge.change(state, (doc) => {
        if (edit[1] > 0) doc.text.deleteAt!(edit[0], edit[1]);
        if (edit.length > 2) doc.text.insertAt!(edit[0], edit[2]!);
      });
      let message = JSON.stringify(Automerge.getChanges(state, newState));
      totalSentBytes += message.length;
      state = newState;
    },
    () => totalSentBytes,
    () => state.text.join("") // TODO: use toString() instead?
  ).add();
}

function mapLww() {
  let generator: network.TestingNetworkGenerator;
  let runtime: crdts.CrdtRuntime;
  let list: crdts.LwwMap<number, string>;

  new AutomergePerfBenchmark(
    "LwwMap",
    () => {
      generator = new network.TestingNetworkGenerator();
      runtime = generator.newRuntime();
      list = runtime.registerCrdt("", new crdts.LwwMap<number, string>());
    },
    (edit) => {
      if (edit[2] !== undefined) {
        // Insert edit[2] at edit[0]
        list.set(edit[0], edit[2]);
      } else {
        // Delete character at edit[0]
        list.delete(edit[0]);
      }
    },
    () => generator.getTotalSentBytes()
  ).add();
}

function yjs() {
  let doc: Y.Doc;
  let totalSentBytes: number;

  new AutomergePerfBenchmark(
    "Yjs",
    () => {
      doc = new Y.Doc();
      totalSentBytes = 0;
      doc.on("updateV2", (update: any) => {
        totalSentBytes += update.byteLength;
      });
    },
    (edit) => {
      if (edit[2] !== undefined) {
        doc.getText("text").insert(edit[0], edit[2]);
      } else {
        doc.getText("text").delete(edit[0], 1);
      }
    },
    () => totalSentBytes,
    () => doc.getText("text").toString()
  ).add();
}

// TODO: delta-crdts
// TODO: use two crdts, like in dmonad benchmarks?
// Might run out of memory with Automerge.

trivial();
plainJsArray();
treedocLww();
treedocPrimitiveLww();
mapLww();
yjs();
automerge();
