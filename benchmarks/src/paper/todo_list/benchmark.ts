import * as collabs from "@collabs/collabs";
import { JSONElement, JSONArray, JSONObject, TextWrapper } from "@collabs/json";
import { JSONCollab, JSONCursor } from "@collabs/json-opt";
import seedrandom from "seedrandom";
import Automerge from "automerge";
import * as Y from "yjs";
import util from "util";
import { result10000 } from "./results";
import { assert } from "chai";
import zlib from "zlib";
import {
  getRecordedTrials,
  getWarmupTrials,
  getMemoryUsed,
  record,
  sleep,
} from "../record";

const DEBUG = false;

// Experiment params
const SEED = "42";
const ROUND_OPS = 1000;
const OPS = 10000;

const GZIP = false;

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
  newTodoList(rng: seedrandom.prng): ITodoList;
  /**
   * Free old state so that it can be GC'd.
   */
  cleanup(): void;
  /**
   * Cause a message summarizing the most recent changes to be "sent"
   * and its size records in getSentBytes().  This is called after each
   * op.
   */
  sendNextMessage(): void;
  /**
   * Reset this on each call to newTodoList()
   */
  getSentBytes(): number;
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
   * Like newTodoList, but also load the state from
   * saveData.  In particular, use a new replica id
   * (rng is provided for this).
   *
   * This will be timed, so don't do excessive extra work
   * that wouldn't be part of normal loading.
   *
   * Don't worry about resetting getSentBytes since it
   * won't be measured anyway.
   */
  load(saveData: any, rng: seedrandom.prng): ITodoList;
}

class TodoListBenchmark {
  constructor(
    private readonly testName: string,
    private readonly testFactory: ITestFactory
  ) {}

  private rng!: seedrandom.prng;

  async run(
    measurement: "time" | "memory" | "network" | "save",
    frequency: "whole" | "rounds"
  ) {
    console.log("Starting todo_list test: " + this.testName);

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

      this.rng = seedrandom(SEED);
      const replicaIDRng = seedrandom(SEED + SEED);

      let startTime: bigint;
      let startSentBytes = 0;
      let baseMemory = 0;

      if (measurement === "memory") {
        baseMemory = await getMemoryUsed();
        if (trial >= 0) baseMemories[trial] = baseMemory;
      }

      // TODO: should we include setup in the time recording?
      let list = this.testFactory.newTodoList(replicaIDRng);

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
              let beforeSave: Object;
              if (DEBUG) beforeSave = this.toObject(list, true);
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
              list = this.testFactory.load(saveData, replicaIDRng);
              this.toObject(list, true); // Read the state
              const loadTime = new Number(
                process.hrtime.bigint() - loadStartTime!
              ).valueOf();
              ans = {
                saveTime,
                saveSize,
                loadTime,
              };
              if (DEBUG) {
                const afterSave = this.toObject(list, true);
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

        // Process one edit
        this.randomOp(list);
        this.testFactory.sendNextMessage();
        //if (measurement === "memory") await sleep(0);
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
          list = this.testFactory.load(saveData, replicaIDRng);
          this.toObject(list, true); // Read the state
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

      if (DEBUG) {
        console.log("Current state:");
        console.log(
          util.inspect(this.toObject(list, true), {
            depth: null,
            maxArrayLength: null,
            maxStringLength: null,
            colors: true,
          })
        );
      }
      console.log("Total items: " + this.totalItems(list));
      console.log("Max depth: " + (this.maxDepth(list) - 1));

      // TODO: record document size over time, to plot memory against?

      // Check equality
      assert.deepStrictEqual(
        this.toObject(list, true),
        result10000,
        "resulting object did not equal result10000"
      );
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
        "todo_list/" + oneRecord,
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

  private randomOp(list: ITodoList) {
    // If the top-level list is empty, only "create item" ops are allowed
    let opChoice = this.rng();
    if (list.itemsSize === 0) opChoice = 0;
    if (opChoice < 0.25) {
      // Create item
      let parent = this.randomItem(list, false);
      let index = this.choice(parent.itemsSize + 1);
      parent.addItem(index, this.randomText());
    } else if (opChoice < 0.45) {
      // Insert text in existing item
      let item = this.randomItem(list, true);
      item.insertText(this.choice(item.textSize + 1), this.randomText());
    } else if (opChoice < 0.65) {
      // Delete text in existing item
      let item = this.randomItem(list, true);
      // TODO: skip if item.textSize is 0.  Not changing
      // for now to avoid re-running benchmarks.
      let index = this.choice(item.textSize);
      let count = Math.min(this.choice(41) + 10, item.textSize - index);
      item.deleteText(index, count);
    } else if (opChoice < 0.85) {
      // Toggle "done" on existing item
      let item = this.randomItem(list, true);
      item.done = !item.done;
    } else {
      // Delete an existing item
      let [parent, index] = this.randomItemLocation(list);
      parent.deleteItem(index);
    }
  }

  private toObject(list: ITodoList, topLevel: boolean): Object {
    let obj: any;
    if (topLevel) {
      obj = { items: [] };
    } else {
      obj = {
        text: list.getText(),
        done: list.done,
        items: [],
      };
    }
    for (let i = 0; i < list.itemsSize; i++) {
      obj.items.push(this.toObject(list.getItem(i), false));
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

function plainJs() {
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

  let topList: PlainJsTodoList;
  return new TodoListBenchmark("Plain JS array", {
    newTodoList() {
      topList = new PlainJsTodoList("");
      return topList;
    },
    cleanup() {},
    sendNextMessage() {},
    getSentBytes() {
      return 0;
    },
    save() {
      const saveData = JSON.stringify(topList!);
      return [saveData, saveData.length];
    },
    load(saveData: string) {
      // TODO: it's actually not the class itself, just
      // an identical plain Object.
      topList = JSON.parse(saveData) as PlainJsTodoList;
      return topList;
    },
  });
}

function compoResetting() {
  class CollabTodoList
    extends collabs.CObject
    implements ITodoList, collabs.Resettable
  {
    private readonly text: collabs.CText;
    private readonly doneCollab: collabs.TrueWinsCBoolean;
    private readonly items: collabs.ResettingMutCList<CollabTodoList>;

    constructor(initToken: collabs.InitToken) {
      super(initToken);
      this.text = this.addChild("text", collabs.Pre(collabs.CText)());
      this.doneCollab = this.addChild(
        "done",
        collabs.Pre(collabs.TrueWinsCBoolean)()
      );
      this.items = this.addChild(
        "items",
        collabs.Pre(collabs.ResettingMutCList)(
          collabs.ConstructorAsFunction(CollabTodoList)
        )
      );
    }

    addItem(index: number, text: string): void {
      let item = this.items.insert(index);
      item.insertText(0, text);
    }
    deleteItem(index: number): void {
      this.items.delete(index);
    }
    getItem(index: number): CollabTodoList {
      return this.items.get(index);
    }
    get itemsSize(): number {
      return this.items.length;
    }

    set done(done: boolean) {
      this.doneCollab.value = done;
    }
    get done(): boolean {
      return this.doneCollab.value;
    }

    insertText(index: number, text: string): void {
      this.text.insert(index, ...text);
    }
    deleteText(index: number, count: number): void {
      this.text.delete(index, count);
    }
    get textSize(): number {
      return this.text.length; // Assumes all text registers are one char
    }
    getText(): string {
      return this.text.join("");
    }

    reset() {
      this.text.reset();
      this.doneCollab.reset();
      this.items.reset();
    }
  }

  let generator: collabs.TestingCRDTAppGenerator | null;
  let app: collabs.CRDTApp | null;
  let totalSentBytes: number;

  return new TodoListBenchmark("Compo Resetting", {
    newTodoList(rng) {
      generator = new collabs.TestingCRDTAppGenerator();
      app = generator.newApp(new collabs.ManualBatchingStrategy(), rng);
      totalSentBytes = 0;
      let list = app.registerCollab("", collabs.Pre(CollabTodoList)());
      // Since newTodoList was called, no saveData to load.
      app.load(collabs.Optional.empty());
      // TODO: this seems unnecessary
      this.sendNextMessage();
      return list;
    },
    cleanup() {
      generator = null;
      app = null;
    },
    sendNextMessage() {
      app!.runtime.commitBatch();
      totalSentBytes += generator!.lastMessage
        ? GZIP
          ? zlib.gzipSync(generator!.lastMessage).byteLength
          : generator!.lastMessage.byteLength
        : 0;
      generator!.lastMessage = undefined;
    },
    getSentBytes() {
      return totalSentBytes;
    },
    save() {
      const saveData = app!.save();
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array, rng) {
      // Proceed like newTodoList, but without doing any
      // operations.
      generator = new collabs.TestingCRDTAppGenerator();
      app = generator.newApp(new collabs.ManualBatchingStrategy(), rng);
      let list = app.registerCollab("", collabs.Pre(CollabTodoList)());
      app.load(collabs.Optional.of(saveData));
      return list;
    },
  });
}

function compoDeleting() {
  class CollabTodoList
    extends collabs.CObject
    implements ITodoList, collabs.Resettable
  {
    private readonly text: collabs.CText;
    private readonly doneCollab: collabs.TrueWinsCBoolean;
    private readonly items: collabs.DeletingMutCList<CollabTodoList, []>;

    constructor(initToken: collabs.InitToken) {
      super(initToken);
      this.text = this.addChild("text", collabs.Pre(collabs.CText)());
      this.doneCollab = this.addChild(
        "done",
        collabs.Pre(collabs.TrueWinsCBoolean)()
      );
      this.items = this.addChild(
        "items",
        collabs.Pre(collabs.DeletingMutCList)(
          collabs.ConstructorAsFunction(CollabTodoList)
        )
      );
    }

    addItem(index: number, text: string): void {
      let item = this.items.insert(index);
      item.insertText(0, text);
    }
    deleteItem(index: number): void {
      this.items.delete(index);
    }
    getItem(index: number): CollabTodoList {
      return this.items.get(index);
    }
    get itemsSize(): number {
      return this.items.length;
    }

    set done(done: boolean) {
      this.doneCollab.value = done;
    }
    get done(): boolean {
      return this.doneCollab.value;
    }

    insertText(index: number, text: string): void {
      this.text.insert(index, ...text);
    }
    deleteText(index: number, count: number): void {
      this.text.delete(index, count);
    }
    get textSize(): number {
      return this.text.length; // Assumes all text registers are one char
    }
    getText(): string {
      return this.text.join("");
    }

    reset() {
      this.text.reset();
      this.doneCollab.reset();
      this.items.reset();
    }
  }

  let generator: collabs.TestingCRDTAppGenerator | null;
  let app: collabs.CRDTApp | null;
  let totalSentBytes: number;

  return new TodoListBenchmark("Compo Deleting", {
    newTodoList(rng) {
      generator = new collabs.TestingCRDTAppGenerator();
      app = generator.newApp(new collabs.ManualBatchingStrategy(), rng);
      totalSentBytes = 0;
      let list = app.registerCollab("", collabs.Pre(CollabTodoList)());
      // Since newTodoList was called, no saveData to load.
      app.load(collabs.Optional.empty());
      // TODO: this seems unnecessary
      this.sendNextMessage();
      return list;
    },
    cleanup() {
      generator = null;
      app = null;
    },
    sendNextMessage() {
      app!.runtime.commitBatch();
      totalSentBytes += generator!.lastMessage
        ? GZIP
          ? zlib.gzipSync(generator!.lastMessage).byteLength
          : generator!.lastMessage.byteLength
        : 0;
      generator!.lastMessage = undefined;
    },
    getSentBytes() {
      return totalSentBytes;
    },
    save() {
      const saveData = app!.save();
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array, rng) {
      // Proceed like newTodoList, but without doing any
      // operations.
      generator = new collabs.TestingCRDTAppGenerator();
      app = generator.newApp(new collabs.ManualBatchingStrategy(), rng);
      let list = app.registerCollab("", collabs.Pre(CollabTodoList)());
      app.load(collabs.Optional.of(saveData));
      return list;
    },
  });
}

function compoJSON() {
  class JSONTodoList implements ITodoList {
    constructor(private readonly jsonObj: JSONObject) {}
    addItem(index: number, text: string): void {
      let item = (this.jsonObj.get("items")!.value as JSONArray).insert(index);
      item.setOrdinaryJS({
        items: [],
        done: false,
        text: [...text],
      });
    }
    deleteItem(index: number): void {
      (this.jsonObj.get("items")!.value as JSONArray).delete(index);
    }
    getItem(index: number): ITodoList {
      return new JSONTodoList(
        (this.jsonObj.get("items")!.value as JSONArray).get(index)!
          .value as JSONObject
      );
    }
    get itemsSize(): number {
      return (this.jsonObj.get("items")!.value as JSONArray).length;
    }

    get done(): boolean {
      return this.jsonObj.get("done")!.value as boolean;
    }

    set done(done: boolean) {
      this.jsonObj.get("done")!.setPrimitive(done);
    }

    insertText(index: number, text: string): void {
      // TODO: use bulk ops
      let textArray = this.jsonObj.get("text")!.value as JSONArray;
      for (let i = 0; i < text.length; i++) {
        textArray.insert(index + i).setPrimitive(text[i]);
      }
    }
    deleteText(index: number, count: number): void {
      let textArray = this.jsonObj.get("text")!.value as JSONArray;
      for (let i = 0; i < count; i++) {
        textArray.delete(index);
      }
    }
    get textSize(): number {
      return (this.jsonObj.get("text")!.value as JSONArray).length;
    }
    getText(): string {
      return (this.jsonObj.get("text")!.value as JSONArray)
        .asArray()
        .map((element) => element.value)
        .join("");
    }
  }

  let generator: collabs.TestingCRDTAppGenerator | null;
  let app: collabs.CRDTApp | null;
  let totalSentBytes: number;

  return new TodoListBenchmark("Compo JSON", {
    newTodoList(rng) {
      generator = new collabs.TestingCRDTAppGenerator();
      app = generator.newApp(new collabs.ManualBatchingStrategy(), rng);
      totalSentBytes = 0;
      let list = app.registerCollab("", JSONElement.NewJSON);
      // Since newTodoList was called, no saveData to load.
      app.load(collabs.Optional.empty());

      list.setOrdinaryJS({ items: [] });
      this.sendNextMessage();
      return new JSONTodoList(list.value as JSONObject);
    },
    cleanup() {
      generator = null;
      app = null;
    },
    sendNextMessage() {
      app!.runtime.commitBatch();
      totalSentBytes += generator!.lastMessage
        ? GZIP
          ? zlib.gzipSync(generator!.lastMessage).byteLength
          : generator!.lastMessage.byteLength
        : 0;
      generator!.lastMessage = undefined;
    },
    getSentBytes() {
      return totalSentBytes;
    },
    save() {
      const saveData = app!.save();
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array, rng) {
      // Proceed like newTodoList, but without doing any
      // operations.
      generator = new collabs.TestingCRDTAppGenerator();
      app = generator.newApp(new collabs.ManualBatchingStrategy(), rng);
      let list = app.registerCollab("", JSONElement.NewJSON);
      app.load(collabs.Optional.of(saveData));
      return new JSONTodoList(list.value as JSONObject);
    },
  });
}

/**
 * Like Compo JSON but uses our dedicated text-editing
 * data structure.
 */
function compoJSONText() {
  class JSONTextTodoList implements ITodoList {
    constructor(private readonly jsonObj: JSONObject) {}
    addItem(index: number, text: string): void {
      let item = (this.jsonObj.get("items")!.value as JSONArray).insert(index);
      item.setOrdinaryJS({
        items: [],
        done: false,
        text: new TextWrapper(text),
      });
    }
    deleteItem(index: number): void {
      (this.jsonObj.get("items")!.value as JSONArray).delete(index);
    }
    getItem(index: number): ITodoList {
      return new JSONTextTodoList(
        (this.jsonObj.get("items")!.value as JSONArray).get(index)!
          .value as JSONObject
      );
    }
    get itemsSize(): number {
      return (this.jsonObj.get("items")!.value as JSONArray).length;
    }

    get done(): boolean {
      return this.jsonObj.get("done")!.value as boolean;
    }

    set done(done: boolean) {
      this.jsonObj.get("done")!.setPrimitive(done);
    }

    insertText(index: number, text: string): void {
      let textArray = this.jsonObj.get("text")!.value as collabs.CText;
      textArray.insert(index, ...text);
    }
    deleteText(index: number, count: number): void {
      let textList = this.jsonObj.get("text")!.value as collabs.CText;
      textList.delete(index, count);
    }
    get textSize(): number {
      return (this.jsonObj.get("text")!.value as collabs.CText).length;
    }
    getText(): string {
      return (this.jsonObj.get("text")!.value as collabs.CText).join("");
    }
  }

  let generator: collabs.TestingCRDTAppGenerator | null;
  let app: collabs.CRDTApp | null;
  let totalSentBytes: number;

  return new TodoListBenchmark("Compo JSON Text", {
    newTodoList(rng) {
      generator = new collabs.TestingCRDTAppGenerator();
      app = generator.newApp(new collabs.ManualBatchingStrategy(), rng);
      totalSentBytes = 0;
      let list = app.registerCollab("", JSONElement.NewJSON);
      // Since newTodoList was called, no saveData to load.
      app.load(collabs.Optional.empty());

      list.setOrdinaryJS({ items: [] });
      this.sendNextMessage();
      return new JSONTextTodoList(list.value as JSONObject);
    },
    cleanup() {
      generator = null;
      app = null;
    },
    sendNextMessage() {
      app!.runtime.commitBatch();
      totalSentBytes += generator!.lastMessage
        ? GZIP
          ? zlib.gzipSync(generator!.lastMessage).byteLength
          : generator!.lastMessage.byteLength
        : 0;
      generator!.lastMessage = undefined;
    },
    getSentBytes() {
      return totalSentBytes;
    },
    save() {
      const saveData = app!.save();
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array, rng) {
      // Proceed like newTodoList, but without doing any
      // operations.
      generator = new collabs.TestingCRDTAppGenerator();
      app = generator.newApp(new collabs.ManualBatchingStrategy(), rng);
      let list = app.registerCollab("", JSONElement.NewJSON);
      app.load(collabs.Optional.of(saveData));
      return new JSONTextTodoList(list.value as JSONObject);
    },
  });
}

function automerge() {
  let lastDoc: Automerge.FreezeObject<any> | null;
  let theDoc: Automerge.FreezeObject<any> | null;
  let totalSentBytes = 0;

  class AutomergeTodoList implements ITodoList {
    /**
     * @param cursor series of indices to use in theDoc to access this item
     */
    constructor(private readonly cursor: readonly number[]) {}

    private getThis(doc: any): any {
      let thisObj = doc;
      for (let index of this.cursor) {
        thisObj = thisObj.items[index];
      }
      return thisObj;
    }

    addItem(index: number, text: string): void {
      theDoc = Automerge.change(theDoc, (doc) => {
        let thisDoc = this.getThis(doc);
        let textCollab = new Automerge.Text();
        thisDoc.items.insertAt(index, {
          text: textCollab,
          done: false,
          items: [],
        });
        textCollab.insertAt!(0, ...text);
      });
    }
    deleteItem(index: number): void {
      theDoc = Automerge.change(theDoc, (doc) => {
        let thisDoc = this.getThis(doc);
        thisDoc.items.deleteAt(index);
      });
    }
    getItem(index: number): AutomergeTodoList {
      return new AutomergeTodoList([...this.cursor, index]);
    }
    get itemsSize(): number {
      return this.getThis(theDoc).items.length;
    }

    get done(): boolean {
      return this.getThis(theDoc).done;
    }
    set done(done: boolean) {
      theDoc = Automerge.change(theDoc, (doc) => {
        let thisDoc = this.getThis(doc);
        thisDoc.done = done;
      });
    }

    insertText(index: number, text: string): void {
      theDoc = Automerge.change(theDoc, (doc) => {
        let thisDoc = this.getThis(doc);
        (thisDoc.text as Automerge.Text).insertAt!(index, ...text);
      });
    }
    deleteText(index: number, count: number): void {
      theDoc = Automerge.change(theDoc, (doc) => {
        let thisDoc = this.getThis(doc);
        (thisDoc.text as Automerge.Text).deleteAt!(index, count);
      });
    }
    get textSize(): number {
      return (this.getThis(theDoc).text as Automerge.Text).length;
    }
    getText(): string {
      return (this.getThis(theDoc).text as Automerge.Text).toString();
    }
  }

  return new TodoListBenchmark("Automerge", {
    newTodoList() {
      // TODO: use rng'd actorId (input as second argument
      // to from and load), in same format as Automerge
      // uses internally.
      theDoc = Automerge.from({
        items: [],
      });
      lastDoc = theDoc;
      totalSentBytes = 0;
      return new AutomergeTodoList([]);
    },
    cleanup() {
      theDoc = null;
      lastDoc = null;
    },
    sendNextMessage() {
      let message = JSON.stringify(Automerge.getChanges(lastDoc!, theDoc!));
      if (GZIP) totalSentBytes += zlib.gzipSync(message).byteLength;
      // TODO: really should use byte length.  Probably
      // okay though as it sticks to ascii.
      else totalSentBytes += message.length;
      lastDoc = theDoc;
    },
    getSentBytes() {
      return totalSentBytes;
    },
    save() {
      // TODO: Readme says this is a Uint8Array, but
      // TypeScript says it is a string.  Not a problem,
      // but we should make sure length accurately gives
      // the byte length, not the uint16 length.
      const saveData = Automerge.save(theDoc!);
      return [saveData, saveData.length];
    },
    load(saveData: string) {
      theDoc = Automerge.load(saveData);
      lastDoc = theDoc;
      return new AutomergeTodoList([]);
    },
  });
}

function automergeNoText() {
  let lastDoc: Automerge.FreezeObject<any> | null;
  let theDoc: Automerge.FreezeObject<any> | null;
  let totalSentBytes = 0;

  class AutomergeTodoList implements ITodoList {
    /**
     * @param cursor series of indices to use in theDoc to access this item
     */
    constructor(private readonly cursor: readonly number[]) {}

    private getThis(doc: any): any {
      let thisObj = doc;
      for (let index of this.cursor) {
        thisObj = thisObj.items[index];
      }
      return thisObj;
    }

    addItem(index: number, text: string): void {
      theDoc = Automerge.change(theDoc, (doc) => {
        let thisDoc = this.getThis(doc);
        thisDoc.items.insertAt(index, {
          text: [...text],
          done: false,
          items: [],
        });
      });
    }
    deleteItem(index: number): void {
      theDoc = Automerge.change(theDoc, (doc) => {
        let thisDoc = this.getThis(doc);
        thisDoc.items.deleteAt(index);
      });
    }
    getItem(index: number): AutomergeTodoList {
      return new AutomergeTodoList([...this.cursor, index]);
    }
    get itemsSize(): number {
      return this.getThis(theDoc).items.length;
    }

    get done(): boolean {
      return this.getThis(theDoc).done;
    }
    set done(done: boolean) {
      theDoc = Automerge.change(theDoc, (doc) => {
        let thisDoc = this.getThis(doc);
        thisDoc.done = done;
      });
    }

    insertText(index: number, text: string): void {
      theDoc = Automerge.change(theDoc, (doc) => {
        let thisDoc = this.getThis(doc);
        (thisDoc.text as string[]).splice(index, 0, ...text);
      });
    }
    deleteText(index: number, count: number): void {
      theDoc = Automerge.change(theDoc, (doc) => {
        let thisDoc = this.getThis(doc);
        (thisDoc.text as string[]).splice(index, count);
      });
    }
    get textSize(): number {
      return (this.getThis(theDoc).text as string[]).length;
    }
    getText(): string {
      return (this.getThis(theDoc).text as string[]).join("");
    }
  }

  return new TodoListBenchmark("AutomergeNoText", {
    newTodoList() {
      theDoc = Automerge.from({
        items: [],
      });
      lastDoc = theDoc;
      totalSentBytes = 0;
      return new AutomergeTodoList([]);
    },
    cleanup() {
      theDoc = null;
      lastDoc = null;
    },
    sendNextMessage() {
      let message = JSON.stringify(Automerge.getChanges(lastDoc!, theDoc!));
      if (GZIP) totalSentBytes += zlib.gzipSync(message).byteLength;
      // TODO: really should use byte length.  Probably
      // okay though as it sticks to ascii.
      else totalSentBytes += message.length;
      lastDoc = theDoc;
    },
    getSentBytes() {
      return totalSentBytes;
    },
    save() {
      // TODO: Readme says this is a Uint8Array, but
      // TypeScript says it is a string.  Not a problem,
      // but we should make sure length accurately gives
      // the byte length, not the uint16 length.
      const saveData = Automerge.save(theDoc!);
      return [saveData, saveData.length];
    },
    load(saveData: string) {
      theDoc = Automerge.load(saveData);
      lastDoc = theDoc;
      return new AutomergeTodoList([]);
    },
  });
}

function yjs() {
  let topDoc: Y.Doc | null;
  let totalSentBytes: number;

  class YjsTodoList implements ITodoList {
    private readonly textCollab: Y.Text;
    private readonly items: Y.Array<Y.Map<any>>;
    constructor(private readonly map: Y.Map<any>) {
      this.textCollab = map.get("text");
      this.items = map.get("items");
    }

    addItem(index: number, text: string): void {
      topDoc!.transact(() => {
        let item = new Y.Map<any>();
        item.set("text", new Y.Text(text));
        item.set("items", new Y.Array<Y.Map<any>>());
        item.set("done", false);
        this.items.insert(index, [item]);
      });
    }
    deleteItem(index: number): void {
      topDoc!.transact(() => {
        this.items.delete(index);
      });
    }
    getItem(index: number): ITodoList {
      return new YjsTodoList(this.items.get(index));
    }
    get itemsSize(): number {
      return this.items.length;
    }

    get done(): boolean {
      return this.map.get("done");
    }
    set done(done: boolean) {
      topDoc!.transact(() => {
        this.map.set("done", done);
      });
    }

    insertText(index: number, text: string): void {
      topDoc!.transact(() => {
        this.textCollab.insert(index, text);
      });
    }
    deleteText(index: number, count: number): void {
      topDoc!.transact(() => {
        this.textCollab.delete(index, count);
      });
    }
    get textSize(): number {
      return this.textCollab.length;
    }
    getText(): string {
      return this.textCollab.toString();
    }
  }

  return new TodoListBenchmark("Yjs", {
    newTodoList() {
      topDoc = new Y.Doc();
      totalSentBytes = 0;
      topDoc.on("update", (update: any) => {
        totalSentBytes += update.byteLength;
      });
      topDoc.getMap().set("items", new Y.Array<Y.Map<any>>());
      return new YjsTodoList(topDoc.getMap());
    },
    cleanup() {
      topDoc = null;
    },
    sendNextMessage() {},
    getSentBytes() {
      return totalSentBytes;
    },
    save() {
      // TODO: also try encodeStateAsUpdateV2 and applyUpdateV2,
      // use whichever is better.
      const saveData = Y.encodeStateAsUpdate(topDoc!);
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array) {
      // Proceed like newTodoList, but without doing any
      // operations or recording sent bytes.
      topDoc = new Y.Doc();
      Y.applyUpdate(topDoc, saveData);
      return new YjsTodoList(topDoc.getMap());
    },
  });
}

function compoJSONOpt() {
  class JSONCollabTodoList implements ITodoList {
    private readonly items: JSONCursor;
    private readonly ids: collabs.PrimitiveCList<string>;
    private readonly text: collabs.PrimitiveCList<string>;
    constructor(
      private readonly collab: JSONCursor,
      private readonly idGen: collabs.RgaDenseLocalList<undefined>,
      private readonly runtime: collabs.Runtime
    ) {
      this.items = this.collab.get("items")[0] as JSONCursor;
      this.ids = this.collab.get(
        "itemsIds"
      )[0] as collabs.PrimitiveCList<string>;
      this.text = this.collab.get("text")[0] as collabs.PrimitiveCList<string>;
    }
    addItem(index: number, text: string): void {
      // Generate new id for this index
      let id = this.idGen.createNewLocs(index, 1)[0];
      let key: string = collabs.bytesAsString(this.idGen.serialize(id));
      this.ids.insert(index, key);

      // Update JSON Collab with new item
      this.items.setIsMap(key);
      let newItem = this.items.get(key)[0] as JSONCursor;
      newItem.setIsMap("items");
      newItem.setIsList("itemsIds");
      newItem.set("done", false);
      newItem.setIsList("text");

      // Update text item
      let textItem = newItem.get("text")[0] as collabs.PrimitiveCList<string>;
      textItem.insert(0, ...text);
    }
    deleteItem(index: number): void {
      let id: string = this.ids.get(index);
      this.ids.delete(index);
      this.items.delete(id);
    }
    getItem(index: number): ITodoList {
      let id: string = this.ids.get(index);
      return new JSONCollabTodoList(
        this.items.get(id)[0] as JSONCursor,
        this.idGen,
        this.runtime
      );
    }
    get itemsSize(): number {
      return this.ids.length;
    }

    get done(): boolean {
      return this.collab.get("done")[0] as boolean;
    }

    set done(done: boolean) {
      this.collab.set("done", done);
    }

    insertText(index: number, text: string): void {
      this.text.insert(index, ...text);
    }
    deleteText(index: number, count: number): void {
      this.text.delete(index, count);
    }
    get textSize(): number {
      return this.text.length;
    }
    getText(): string {
      return this.text.join("");
    }
  }

  let generator: collabs.TestingCRDTAppGenerator | null;
  let app: collabs.CRDTApp | null;
  let totalSentBytes: number;

  return new TodoListBenchmark("Compo JSON Opt", {
    newTodoList(rng) {
      generator = new collabs.TestingCRDTAppGenerator();
      app = generator.newApp(new collabs.ManualBatchingStrategy(), rng);
      totalSentBytes = 0;

      let collab = app.registerCollab("", collabs.Pre(JSONCollab)());
      let cursor = new JSONCursor(collab);
      // Since newTodoList was called, no saveData to load.
      app.load(collabs.Optional.empty());

      this.sendNextMessage();
      cursor.setIsMap("items");
      cursor.setIsList("itemsIds");
      cursor.set("done", false);
      cursor.setIsList("text");

      let idGen = new collabs.RgaDenseLocalList<undefined>(app.runtime);
      return new JSONCollabTodoList(cursor, idGen, collab.runtime);
    },
    cleanup() {
      generator = null;
      app = null;
    },
    sendNextMessage() {
      app!.runtime.commitBatch();
      totalSentBytes += generator!.lastMessage
        ? GZIP
          ? zlib.gzipSync(generator!.lastMessage).byteLength
          : generator!.lastMessage.byteLength
        : 0;
      generator!.lastMessage = undefined;
    },
    getSentBytes() {
      return totalSentBytes;
    },
    save() {
      const saveData = app!.save();
      return [saveData, saveData.byteLength];
    },
    load(saveData: Uint8Array, rng) {
      // Proceed like newTodoList, but without doing any
      // operations.
      generator = new collabs.TestingCRDTAppGenerator();
      app = generator.newApp(new collabs.ManualBatchingStrategy(), rng);

      let collab = app.registerCollab("", collabs.Pre(JSONCollab)());
      let cursor = new JSONCursor(collab);

      let idGen = new collabs.RgaDenseLocalList<undefined>(app.runtime);

      app.load(collabs.Optional.of(saveData));

      return new JSONCollabTodoList(cursor, idGen, collab.runtime);
    },
  });
}

// TODO: use two collabs, like in dmonad benchmarks?

export default async function todoList(args: string[]) {
  let benchmark: TodoListBenchmark;
  switch (args[0]) {
    case "plainJs":
      benchmark = plainJs();
      break;
    case "compoResetting":
      benchmark = compoResetting();
      break;
    case "compoDeleting":
      benchmark = compoDeleting();
      break;
    case "compoJSON":
      benchmark = compoJSON();
      break;
    case "compoJSONText":
      benchmark = compoJSONText();
      break;
    case "yjs":
      benchmark = yjs();
      break;
    case "automerge":
      benchmark = automerge();
      break;
    case "automergeNoText":
      benchmark = automergeNoText();
      break;
    case "compoJSONOpt":
      benchmark = compoJSONOpt();
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
