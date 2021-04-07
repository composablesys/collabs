import { crdts, network } from "compoventuals-client";
import framework from "../../../framework";
import seedrandom from "seedrandom";
import Automerge from "automerge";
import * as Y from "yjs";
import util from "util";
import { result10000 } from "./results";
import { assert } from "chai";

// Experiment params
const TRIALS = 1; // TODO: make 5 or 10 for real paper
const SEED = "42";
const ROUND_OPS = 1000;
const ROUNDS = 10;

// Helper funcs
async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function getMemoryUsed(): Promise<number> {
  await sleep(100); // Sleep a bit to help the GC?
  global.gc();
  return process.memoryUsage().heapUsed;
}

const suite = framework.newSuite("paper/todo_list");

/**
 * Interface used by the benchmark.
 */
interface ITodoList {
  addItem(index: number, text: string): void;
  deleteItem(index: number): void;
  getItem(index: number): ITodoList;
  readonly itemsSize: number;

  // Note used at top-level; default to false there
  done: boolean;

  // Not used at top-level; default to "" there
  insertText(index: number, text: string): void;
  deleteText(index: number, count: number): void;
  readonly textSize: number;
  getText(): string;
}

interface ITestFactory {
  newTodoList(): ITodoList;
  // resets on each newTodoList
  getSentBytes(): number;
}

class TodoListBenchmark {
  constructor(
    private readonly testName: string,
    private readonly testFactory: ITestFactory
  ) {}

  private rng!: seedrandom.prng;
  private totalTime = 0;
  private totalSentBytes = 0;
  private maxMemory = 0;

  private baseMemory = 0;

  private op = 0;

  private roundStartOps = 0;
  private roundStartTime = 0;
  private roundStartSentBytes = 0;
  private list!: ITodoList;

  add() {
    // TODO: real benchmarking (warmup, multiple runs,
    // record CPU, memory, network separately & incrementally,
    // record results in a file/using framework),
    // breathing room for GC in all benchmarks
    suite.addBenchmark(this.testName, async () => {
      this.baseMemory = await getMemoryUsed();

      console.log("Starting todo_list test: " + this.testName);

      // Warmup
      console.log("Warmup");
      this.rng = seedrandom(SEED);
      this.list = this.testFactory.newTodoList();
      for (let i = 0; i < ROUND_OPS; i++) {
        this.randomOp();
      }
      await sleep(0);

      for (let trial = 0; trial < TRIALS; trial++) {
        this.rng = seedrandom(SEED);
        this.list = this.testFactory.newTodoList();

        this.roundStartOps = 0;
        this.roundStartTime = 0;
        this.roundStartSentBytes = 0;

        console.log("Starting trial " + trial);
        for (this.op = 0; this.op < ROUND_OPS * ROUNDS; this.op++) {
          if (this.op % ROUND_OPS === 0) {
            if (this.op !== 0) {
              await this.record();
            }
            // Prepare for next measurement
            this.roundStartOps = this.op;
            this.roundStartSentBytes = this.testFactory.getSentBytes();
            this.roundStartTime = Date.now();
          }
          // Process one edit
          this.randomOp();
          // TODO: Let event loop rollover between ops - more
          // realistic?  Also gives GC some breathing
          // room.
          // This slows down the tests a lot, though.
          //await sleep(0);
        }
        // Record final result
        await this.record();

        // Print trial totals
        console.log(
          `Trial ${trial} finished for test ${this.testName}\n  total time = ${this.totalTime} ms\n  max memory = ${this.maxMemory}\n  total sent bytes = ${this.totalSentBytes}`
        );

        // Check equality
        assert.deepStrictEqual(
          this.toObject(this.list),
          result10000,
          "resulting object did not equal result10000"
        );
      }
    });
  }

  private choice(options: number) {
    return Math.floor(this.rng() * options);
  }

  private randomItem(startList: ITodoList, excludeStart: boolean): ITodoList {
    if (excludeStart) {
      if (startList.itemsSize === 0) {
        throw new Error("excludeStart is true but startList has no items");
      }
    } else if (startList.itemsSize === 0 || this.choice(2) === 0) {
      return startList;
    }
    return this.randomItem(
      startList.getItem(this.choice(startList.itemsSize)),
      false
    );
  }

  /**
   * Like randomItem(startList, false), but instead of returning the item,
   * it returns
   * its parent and its index within the parent.
   */
  private randomItemLocation(
    startList: ITodoList
  ): [parent: ITodoList, index: number] {
    if (startList.itemsSize === 0) {
      throw new Error("startList has no items");
    }
    let randomIndex = this.choice(startList.itemsSize);
    let child = startList.getItem(randomIndex);
    if (child.itemsSize === 0 || this.choice(2))
      return [startList, randomIndex];
    else return this.randomItemLocation(child);
  }

  private randomText(): string {
    let length = 10 + this.choice(41); //10 to 50
    let ans = "";
    while (ans.length < length) {
      ans += this.rng().toPrecision(Math.min(21, length - ans.length));
    }
    return ans;
  }

  private randomOp() {
    // If the top-level list is empty, only "create item" ops are allowed
    let opChoice = this.rng();
    if (this.list.itemsSize === 0) opChoice = 0;
    if (opChoice < 0.25) {
      // Create item
      let parent = this.randomItem(this.list, false);
      let index = this.choice(parent.itemsSize + 1);
      parent.addItem(index, this.randomText());
    } else if (opChoice < 0.45) {
      // Insert text in existing item
      let item = this.randomItem(this.list, true);
      item.insertText(this.choice(item.textSize + 1), this.randomText());
    } else if (opChoice < 0.65) {
      // Delete text in existing item
      let item = this.randomItem(this.list, true);
      item.deleteText(this.choice(item.textSize + 1), this.choice(41) + 10);
    } else if (opChoice < 0.85) {
      // Toggle "done" on existing item
      let item = this.randomItem(this.list, true);
      item.done = !item.done;
    } else {
      // Delete an existing item
      let [parent, index] = this.randomItemLocation(this.list);
      parent.deleteItem(index);
    }
  }

  private async record() {
    // Make measurements
    let roundEndTime = Date.now();
    let roundEndMemory = await getMemoryUsed();
    let roundEndSentBytes = this.testFactory.getSentBytes();

    console.log("Ops so far: " + this.op);

    let edits = this.op - this.roundStartOps;
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
        RoundStartOp: this.roundStartOps + "",
        RoundEndOp: this.op + "",
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
        RoundStartOp: this.roundStartOps + "",
        RoundEndOp: this.op + "",
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
        RoundStartOp: this.roundStartOps + "",
        RoundEndOp: this.op + "",
        Edits: edits + "",
      }
    );

    // TODO: compare against known-good (sequential normal JS object)
    // answers, instead of just printing as an object.
    console.log("Current state:");
    console.log(
      util.inspect(this.toObject(this.list), {
        depth: null,
        maxArrayLength: null,
        maxStringLength: null,
        colors: true,
      })
    );
    console.log("Total items: " + this.totalItems(this.list));
    console.log("Max depth: " + (this.maxDepth(this.list) - 1));

    // TODO: record document size over time, to plot memory against
  }

  private toObject(list: ITodoList): Object {
    let obj = {
      text: list.getText(),
      done: list.done,
      items: [] as Object[],
    };
    for (let i = 0; i < list.itemsSize; i++) {
      obj.items.push(this.toObject(list.getItem(i)));
    }
    return obj;
  }

  private totalItems(list: ITodoList): number {
    let total = list.itemsSize;
    for (let i = 0; i < list.itemsSize; i++) {
      total += this.totalItems(list.getItem(i));
    }
    return total;
  }

  private maxDepth(list: ITodoList): number {
    let maxSub = 0;
    for (let i = 0; i < list.itemsSize; i++) {
      maxSub = Math.max(maxSub, this.maxDepth(list.getItem(i)));
    }
    return 1 + maxSub;
  }
}

class PlainJsTodoList implements ITodoList {
  private text: string;
  done: boolean;
  private items: PlainJsTodoList[];

  constructor(text: string) {
    this.text = text;
    this.done = false;
    this.items = [];
  }

  addItem(index: number, text: string): void {
    this.items.splice(index, 0, new PlainJsTodoList(text));
  }
  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }
  getItem(index: number): PlainJsTodoList {
    return this.items[index];
  }
  get itemsSize(): number {
    return this.items.length;
  }

  insertText(index: number, text: string): void {
    this.text = this.text.slice(0, index) + text + this.text.slice(index);
  }
  deleteText(index: number, count: number): void {
    this.text = this.text.slice(0, index) + this.text.slice(index + count);
  }
  get textSize(): number {
    return this.text.length;
  }
  getText(): string {
    return this.text;
  }
}

function plainJs() {
  new TodoListBenchmark("Plain JS array", {
    newTodoList() {
      return new PlainJsTodoList("");
    },
    getSentBytes() {
      return 0;
    },
  }).add();
}

class CrdtTodoList
  extends crdts.CompositeCrdt
  implements ITodoList, crdts.Resettable {
  private readonly text: crdts.TreedocList<crdts.LwwRegister<string>>;
  private readonly doneCrdt: crdts.EnableWinsFlag;
  private readonly items: crdts.TreedocList<CrdtTodoList>;

  constructor() {
    super();
    this.text = this.addChild(
      "text",
      new crdts.TreedocList(() => new crdts.LwwRegister(""), true)
    );
    this.doneCrdt = this.addChild("done", new crdts.EnableWinsFlag());
    this.items = this.addChild(
      "items",
      new crdts.TreedocList(() => new CrdtTodoList(), true)
    );
  }

  addItem(index: number, text: string): void {
    let item = this.items.insertAt(index)[1];
    item.insertText(0, text);
  }
  deleteItem(index: number): void {
    this.items.deleteAt(index);
  }
  getItem(index: number): CrdtTodoList {
    return this.items.getAt(index);
  }
  get itemsSize(): number {
    return this.items.length;
  }

  set done(done: boolean) {
    this.doneCrdt.value = done;
  }
  get done(): boolean {
    return this.doneCrdt.value;
  }

  insertText(index: number, text: string): void {
    for (let i = 0; i < text.length; i++) {
      let reg = this.text.insertAt(index + i)[1];
      reg.value = text[i];
    }
  }
  deleteText(index: number, count: number): void {
    let upper = Math.min(index + count, this.textSize);
    for (let i = index; i < upper; i++) {
      this.text.deleteAt(index);
    }
  }
  get textSize(): number {
    return this.text.length; // Assumes all text registers are one char
  }
  getText(): string {
    return this.text
      .asArray()
      .map((register) => register.value)
      .join("");
  }

  reset() {
    this.text.reset();
    this.doneCrdt.reset();
    this.items.reset();
  }
}

function compoCrdt() {
  let generator: network.TestingNetworkGenerator;
  let runtime: crdts.CrdtRuntime;

  new TodoListBenchmark("Compo Crdt", {
    newTodoList() {
      generator = new network.TestingNetworkGenerator();
      runtime = generator.newRuntime();
      let list = runtime.groupParent("").addChild("", new CrdtTodoList());
      return list;
    },
    getSentBytes() {
      return generator.getTotalSentBytes();
    },
  }).add();
}

//
// function automerge() {
//   let state: { text: Automerge.Text };
//   let totalSentBytes: number;
//
//   new TodoListBenchmark(
//     "Automerge",
//     () => {
//       state = Automerge.from({ text: new Automerge.Text() });
//       totalSentBytes = 0;
//     },
//     (edit) => {
//       let newState = Automerge.change(state, (doc) => {
//         if (edit[1] > 0) doc.text.deleteAt!(edit[0], edit[1]);
//         if (edit.length > 2) doc.text.insertAt!(edit[0], edit[2]!);
//       });
//       let message = JSON.stringify(Automerge.getChanges(state, newState));
//       totalSentBytes += message.length;
//       state = newState;
//     },
//     () => totalSentBytes,
//     () => state.text.join("")
//   ).add();
// }
//
// function yjs() {
//   let doc: Y.Doc;
//   let totalSentBytes: number;
//
//   new TodoListBenchmark(
//     "Yjs",
//     () => {
//       doc = new Y.Doc();
//       totalSentBytes = 0;
//       doc.on("updateV2", (update: any) => {
//         totalSentBytes += update.byteLength;
//       });
//     },
//     (edit) => {
//       if (edit[2] !== undefined) {
//         doc.getText("text").insert(edit[0], edit[2]);
//       } else {
//         doc.getText("text").delete(edit[0], 1);
//       }
//     },
//     () => totalSentBytes,
//     () => doc.getText("text").toString()
//   ).add();
// }

plainJs();
compoCrdt();
// yjs();
// automerge();
