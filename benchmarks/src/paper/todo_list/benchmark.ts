import { crdts, network } from "compoventuals-client";
import seedrandom from "seedrandom";
import Automerge from "automerge";
import * as Y from "yjs";
import util from "util";
import { result10000 } from "./results";
import { assert } from "chai";
import zlib from "zlib";
import { getMemoryUsed, record, sleep } from "../record";

const DEBUG = false;

// Experiment params
const WARMUP = 5;
const TRIALS = 10;
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
  newTodoList(): ITodoList;
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
}

class TodoListBenchmark {
  constructor(
    private readonly testName: string,
    private readonly testFactory: ITestFactory
  ) {}

  private rng!: seedrandom.prng;

  async run(
    measurement: "time" | "memory" | "network",
    frequency: "whole" | "rounds"
  ) {
    console.log("Starting todo_list test: " + this.testName);

    let results = new Array<number>(TRIALS);
    let roundResults = new Array<number[]>(TRIALS);
    let roundOps = new Array<number>(Math.ceil(OPS / ROUND_OPS));
    if (frequency === "rounds") {
      for (let i = 0; i < TRIALS; i++)
        roundResults[i] = new Array<number>(Math.ceil(OPS / ROUND_OPS));
    }

    for (let trial = -WARMUP; trial < TRIALS; trial++) {
      if (trial !== -WARMUP) this.testFactory.cleanup();

      // Sleep between trials
      await sleep(1000);
      console.log("Starting trial " + trial);

      this.rng = seedrandom(SEED);

      let baseMemory = 0;
      let startTime: bigint;
      let startSentBytes = 0;

      if (measurement === "memory") baseMemory = await getMemoryUsed();

      // TODO: should we include setup in the time recording?
      let list = this.testFactory.newTodoList();

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
        if (
          frequency === "rounds" &&
          trial >= 0 &&
          op !== 0 &&
          op % ROUND_OPS === 0
        ) {
          // Record result
          switch (measurement) {
            case "time":
              roundResults[trial][round] = new Number(
                process.hrtime.bigint() - startTime!
              ).valueOf();

              break;
            case "memory":
              roundResults[trial][round] = (await getMemoryUsed()) - baseMemory;
              break;
            case "network":
              roundResults[trial][round] =
                this.testFactory.getSentBytes() - startSentBytes;
          }
          roundOps[round] = op;
          round++;
        }

        // Process one edit
        this.randomOp(list);
        this.testFactory.sendNextMessage();
      }

      if (trial >= 0) {
        // Record result
        let result = -1;
        switch (measurement) {
          case "time":
            result = new Number(process.hrtime.bigint() - startTime!).valueOf();
            break;
          case "memory":
            result = (await getMemoryUsed()) - baseMemory;
            break;
          case "network":
            result = this.testFactory.getSentBytes() - startSentBytes;
        }
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

    record(
      "todo_list/" + measurement,
      this.testName,
      frequency,
      TRIALS,
      results,
      roundResults,
      roundOps
    );
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

  return new TodoListBenchmark("Plain JS array", {
    newTodoList() {
      return new PlainJsTodoList("");
    },
    cleanup() {},
    sendNextMessage() {},
    getSentBytes() {
      return 0;
    },
  });
}

function compoCrdt() {
  class CrdtTodoList
    extends crdts.CompositeCrdt
    implements ITodoList, crdts.Resettable {
    private readonly text: crdts.TreedocPrimitiveList<string>;
    private readonly doneCrdt: crdts.EnableWinsFlag;
    private readonly items: crdts.TreedocList<CrdtTodoList>;

    constructor() {
      super();
      this.text = this.addChild(
        "text",
        new crdts.TreedocPrimitiveList(crdts.TextSerializer.instance)
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
      this.text.insertAtRange(index, [...text]);
    }
    deleteText(index: number, count: number): void {
      for (let i = 0; i < count; i++) {
        this.text.deleteAt(index);
      }
    }
    get textSize(): number {
      return this.text.length; // Assumes all text registers are one char
    }
    getText(): string {
      return this.text.asArray().join("");
    }

    reset() {
      this.text.reset();
      this.doneCrdt.reset();
      this.items.reset();
    }
  }

  let generator: network.TestingNetworkGenerator | null;
  let runtime: crdts.CrdtRuntime | null;
  let totalSentBytes: number;

  return new TodoListBenchmark("Compo Crdt", {
    newTodoList() {
      generator = new network.TestingNetworkGenerator();
      runtime = generator.newRuntime("manual");
      totalSentBytes = 0;
      let list = runtime.groupParent("").addChild("", new CrdtTodoList());
      this.sendNextMessage();
      return list;
    },
    cleanup() {
      generator = null;
      runtime = null;
    },
    sendNextMessage() {
      runtime!.commitAll();
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
  });
}

function compoJson() {
  class JsonTodoList implements ITodoList {
    constructor(private readonly jsonObj: crdts.JsonObject) {}
    addItem(index: number, text: string): void {
      let item = (this.jsonObj.get("items")!.value as crdts.JsonArray).insert(
        index
      );
      item.setOrdinaryJS({
        items: [],
        done: false,
        text: [...text],
      });
    }
    deleteItem(index: number): void {
      (this.jsonObj.get("items")!.value as crdts.JsonArray).delete(index);
    }
    getItem(index: number): ITodoList {
      return new JsonTodoList(
        (this.jsonObj.get("items")!.value as crdts.JsonArray).get(index)!
          .value as crdts.JsonObject
      );
    }
    get itemsSize(): number {
      return (this.jsonObj.get("items")!.value as crdts.JsonArray).length;
    }

    get done(): boolean {
      return this.jsonObj.get("done")!.value as boolean;
    }

    set done(done: boolean) {
      this.jsonObj.get("done")!.setPrimitive(done);
    }

    insertText(index: number, text: string): void {
      // TODO: use bulk ops
      let textArray = this.jsonObj.get("text")!.value as crdts.JsonArray;
      for (let i = 0; i < text.length; i++) {
        textArray.insert(index + i).setPrimitive(text[i]);
      }
    }
    deleteText(index: number, count: number): void {
      let textArray = this.jsonObj.get("text")!.value as crdts.JsonArray;
      for (let i = 0; i < count; i++) {
        textArray.delete(index);
      }
    }
    get textSize(): number {
      return (this.jsonObj.get("text")!.value as crdts.JsonArray).length;
    }
    getText(): string {
      return (this.jsonObj.get("text")!.value as crdts.JsonArray)
        .asArray()
        .map((element) => element.value)
        .join("");
    }
  }

  let generator: network.TestingNetworkGenerator | null;
  let runtime: crdts.CrdtRuntime | null;
  let totalSentBytes: number;

  return new TodoListBenchmark("Compo Json", {
    newTodoList() {
      generator = new network.TestingNetworkGenerator();
      runtime = generator.newRuntime("manual");
      totalSentBytes = 0;
      let list = runtime
        .groupParent("")
        .addChild("", crdts.JsonElement.NewJson());
      list.setOrdinaryJS({ items: [] });
      this.sendNextMessage();
      return new JsonTodoList(list.value as crdts.JsonObject);
    },
    cleanup() {
      generator = null;
      runtime = null;
    },
    sendNextMessage() {
      runtime!.commitAll();
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
  });
}

/**
 * Like Compo JSON but uses our dedicated text-editing
 * data structure.
 */
function compoJsonText() {
  class JsonTextTodoList implements ITodoList {
    constructor(private readonly jsonObj: crdts.JsonObject) {}
    addItem(index: number, text: string): void {
      let item = (this.jsonObj.get("items")!.value as crdts.JsonArray).insert(
        index
      );
      item.setOrdinaryJS({
        items: [],
        done: false,
        text: new crdts.TextWrapper(text),
      });
    }
    deleteItem(index: number): void {
      (this.jsonObj.get("items")!.value as crdts.JsonArray).delete(index);
    }
    getItem(index: number): ITodoList {
      return new JsonTextTodoList(
        (this.jsonObj.get("items")!.value as crdts.JsonArray).get(index)!
          .value as crdts.JsonObject
      );
    }
    get itemsSize(): number {
      return (this.jsonObj.get("items")!.value as crdts.JsonArray).length;
    }

    get done(): boolean {
      return this.jsonObj.get("done")!.value as boolean;
    }

    set done(done: boolean) {
      this.jsonObj.get("done")!.setPrimitive(done);
    }

    insertText(index: number, text: string): void {
      let textArray = this.jsonObj.get("text")!
        .value as crdts.TreedocPrimitiveList<string>;
      textArray.insertAtRange(index, [...text]);
    }
    deleteText(index: number, count: number): void {
      let textList = this.jsonObj.get("text")!
        .value as crdts.TreedocPrimitiveList<string>;
      for (let i = 0; i < count; i++) {
        textList.deleteAt(index);
      }
    }
    get textSize(): number {
      return (this.jsonObj.get("text")!
        .value as crdts.TreedocPrimitiveList<string>).length;
    }
    getText(): string {
      return (this.jsonObj.get("text")!
        .value as crdts.TreedocPrimitiveList<string>)
        .asArray()
        .join("");
    }
  }

  let generator: network.TestingNetworkGenerator | null;
  let runtime: crdts.CrdtRuntime | null;
  let totalSentBytes: number;

  return new TodoListBenchmark("Compo Json Text", {
    newTodoList() {
      generator = new network.TestingNetworkGenerator();
      runtime = generator.newRuntime("manual");
      totalSentBytes = 0;
      let list = runtime
        .groupParent("")
        .addChild("", crdts.JsonElement.NewJson());
      list.setOrdinaryJS({ items: [] });
      this.sendNextMessage();
      return new JsonTextTodoList(list.value as crdts.JsonObject);
    },
    cleanup() {
      generator = null;
      runtime = null;
    },
    sendNextMessage() {
      runtime!.commitAll();
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
        let textCrdt = new Automerge.Text();
        thisDoc.items.insertAt(index, {
          text: textCrdt,
          done: false,
          items: [],
        });
        textCrdt.insertAt!(0, ...text);
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
  });
}

function yjs() {
  let totalSentBytes: number;

  class YjsTodoList implements ITodoList {
    constructor(private readonly doc: Y.Doc) {}

    addItem(index: number, text: string): void {
      let item = new Y.Doc();
      this.doc.getArray<Y.Doc>("items").insert(index, [item]);
      item.getText("text").insert(0, text);
      item.getArray<Y.Doc>("items");
      item.getMap().set("done", false);
    }
    deleteItem(index: number): void {
      this.doc.getArray<Y.Doc>("items").delete(index);
    }
    getItem(index: number): ITodoList {
      return new YjsTodoList(this.doc.getArray<Y.Doc>("items").get(index));
    }
    get itemsSize(): number {
      return this.doc.getArray<Y.Doc>("items").length;
    }

    get done(): boolean {
      return this.doc.getMap().get("done");
    }
    set done(done: boolean) {
      this.doc.getMap().set("done", done);
    }

    insertText(index: number, text: string): void {
      this.doc.getText("text").insert(index, text);
    }
    deleteText(index: number, count: number): void {
      this.doc.getText("text").delete(index, count);
    }
    get textSize(): number {
      return this.doc.getText("text").length;
    }
    getText(): string {
      return this.doc.getText("text").toString();
    }
  }

  return new TodoListBenchmark("Yjs", {
    newTodoList() {
      let topDoc = new Y.Doc();
      totalSentBytes = 0;
      // TODO: use update instead?  updateV2 is marked experimental;
      // it is meant to be smaller in general.
      // Could similarly argue for/against Automerge's perf branch.
      topDoc.on("updateV2", (update: any) => {
        totalSentBytes += update.byteLength;
      });
      return new YjsTodoList(topDoc);
    },
    cleanup() {},
    sendNextMessage() {
      // TODO.  Currently they get sent right away.  Perhaps use transactions?
      // Although I think currently, each benchmark op corresponds to one
      // Yjs op.
    },
    getSentBytes() {
      return totalSentBytes;
    },
  });
}

// TODO: use two crdts, like in dmonad benchmarks?

export default async function todoList(args: string[]) {
  let benchmark: TodoListBenchmark;
  switch (args[0]) {
    case "plainJs":
      benchmark = plainJs();
      break;
    case "compoCrdt":
      benchmark = compoCrdt();
      break;
    case "compoJson":
      benchmark = compoJson();
      break;
    case "compoJsonText":
      benchmark = compoJsonText();
      break;
    case "yjs":
      benchmark = yjs();
      break;
    case "automerge":
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
