import seedrandom from "seedrandom";
import util from "util";
import { result10000 } from "./results";
import { assert } from "chai";
import { getRecordedTrials, getWarmupTrials, record } from "../../record";
import { getMemoryUsed, sleep } from "../../util";
import {
  byteLength,
  Data,
  Implementation,
  Replica,
} from "../../implementation";
import { AutomergeTodoList } from "./implementations/automerge";
import { YjsTodoList } from "./implementations/yjs";
import { JSONTodoList } from "./implementations/json";
import { JSONTextTodoList } from "./implementations/json_text";
import { JSONOptTodoList } from "./implementations/json_opt";
import { Deleting } from "./implementations/deleting";
import { PlainJS } from "./implementations/plain_js";
import { Resetting } from "./implementations/resetting";

// Experiment params.
const DEBUG = false;
const SEED = "42";
const OPS = 10000;

export interface TodoListCRDT {
  addItem(index: number, text: string): void;
  deleteItem(index: number): void;
  getItem(index: number): TodoListCRDT;
  readonly itemsSize: number;

  // Not used at top-level; default to false there
  done: boolean;

  // Not used at top-level; default to "" there
  insertText(index: number, text: string): void;
  deleteText(index: number, count: number): void;
  readonly textSize: number;
  getText(): string;
}

export interface TodoListReplica extends Replica {
  readonly rootTodoList: TodoListCRDT;
}

/**
 * Helper for manipuliating TodoListCRDT.
 */
class TodoListCRDTHelper {
  constructor(readonly rng: seedrandom.prng) {}

  private choice(options: number) {
    return Math.floor(this.rng() * options);
  }

  private randomItem(
    startList: TodoListCRDT,
    excludeStart: boolean
  ): TodoListCRDT {
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
    startList: TodoListCRDT
  ): [parent: TodoListCRDT, index: number] {
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

  randomOp(replica: TodoListReplica) {
    replica.transact(() => {
      const list = replica.rootTodoList;
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
    });
  }

  toObject(list: TodoListCRDT, topLevel: boolean): Object {
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

  totalItems(list: TodoListCRDT): number {
    let total = list.itemsSize;
    for (let i = 0; i < list.itemsSize; i++) {
      total += this.totalItems(list.getItem(i));
    }
    return total;
  }

  maxDepth(list: TodoListCRDT): number {
    let maxSub = 0;
    for (let i = 0; i < list.itemsSize; i++) {
      maxSub = Math.max(maxSub, this.maxDepth(list.getItem(i)));
    }
    return 1 + maxSub;
  }
}

class TodoListBenchmark {
  constructor(
    private readonly implementationName: string,
    private readonly implementation: Implementation<TodoListReplica>,
    private readonly benchmarkName: string
  ) {}

  /**
   * Benchmark cost of a single user's sending all the ops.
   */
  async send(measurement: "time" | "memory" | "network") {
    const values = new Array<number>(getRecordedTrials());
    values.fill(0);
    let bases = new Array<number>(getRecordedTrials());
    bases.fill(0);

    for (let trial = -getWarmupTrials(); trial < getRecordedTrials(); trial++) {
      await sleep(1000); // Sleep between trials
      console.log("Starting trial " + trial);

      const helper = new TodoListCRDTHelper(seedrandom(SEED));

      const replicaIDRng = seedrandom(SEED + SEED);
      let bytesSent: number;
      let onSend: (msg: Data) => void = () => {};
      if (measurement === "network") {
        onSend = (msg) => {
          bytesSent += byteLength(msg);
        };
      }
      const sender = new this.implementation(onSend, replicaIDRng);
      sender.skipLoad();

      // Prep measurement.
      let startTime: bigint;
      if (trial >= 0) {
        switch (measurement) {
          case "time":
            startTime = process.hrtime.bigint();
            break;
          case "memory":
            bases[trial] = await getMemoryUsed();
            break;
          case "network":
            bytesSent = 0;
            break;
        }
      }

      // Send all edits.
      for (let op = 0; op < OPS; op++) {
        helper.randomOp(sender);
      }

      // Take measurement.
      if (trial >= 0) {
        switch (measurement) {
          case "time":
            values[trial] = new Number(
              process.hrtime.bigint() - startTime!
            ).valueOf();
            break;
          case "memory":
            values[trial] = await getMemoryUsed();
            break;
          case "network":
            values[trial] = bytesSent!;
            break;
        }
      }

      if (DEBUG) {
        console.log("Current state:");
        console.log(
          util.inspect(helper.toObject(sender.rootTodoList, true), {
            depth: null,
            maxArrayLength: null,
            maxStringLength: null,
            colors: true,
          })
        );
        console.log("Total items: " + helper.totalItems(sender.rootTodoList));
        console.log("Max depth: " + (helper.maxDepth(sender.rootTodoList) - 1));
      }

      // Check result.
      assert.deepStrictEqual(
        helper.toObject(sender.rootTodoList, true),
        result10000,
        "resulting object did not equal result10000"
      );
    }

    // Record measurements.
    record(
      "todo_list/" + this.benchmarkName,
      this.implementationName,
      "",
      values,
      measurement === "memory" ? bases : undefined
    );
  }
}

const implementations: {
  [name: string]: Implementation<TodoListReplica>;
} = {
  Automerge: AutomergeTodoList,
  Deleting: Deleting,
  JSONOpt: JSONOptTodoList,
  JSONText: JSONTextTodoList,
  JSON: JSONTodoList,
  PlainJS: PlainJS,
  Resetting: Resetting,
  Yjs: YjsTodoList,
};

export default async function todo_list(args: string[]) {
  const implementation = implementations[args[1]];
  if (implementation === undefined) {
    throw new Error("Unrecognized implementation name: " + args[1]);
  }
  const benchmark = new TodoListBenchmark(args[1], implementation, args[0]);

  console.log("Starting todo_list test: " + args);

  switch (args[0]) {
    case "SendTime":
      await benchmark.send("time");
      break;
    case "SendMemory":
      await benchmark.send("memory");
      break;
    case "Network":
      await benchmark.send("network");
      break;
    // TODO
    // case "Save":
    //   await benchmark.save();
    //   break;
    // case "ReceiveTime":
    //   await benchmark.receive("time");
    //   break;
    // case "ReceiveMemory":
    //   await benchmark.receive("memory");
    //   break;
    // case "OfflineReceiveTime":
    // case "OfflineReceiveMemory":
    //   if (args.length !== 5) {
    //     throw new Error(
    //       'Not enough args, needs: ("coarse" | "fine"), numUsers, concOpStart, concOps'
    //     );
    //   }
    //   if (!(args[2] === "coarse" || args[2] === "fine")) {
    //     throw new Error("Bad concType: " + args[2] + " (needs: coarse | fine)");
    //   }
    //   await benchmark.offlineReceive(
    //     args[0] === "OfflineReceiveTime" ? "time" : "memory",
    //     args[2],
    //     parseInt(args[3]),
    //     parseInt(args[4]),
    //     parseInt(args[5])
    //   );
    //   break;
    default:
      throw new Error("Unrecognized sub-benchmark: " + args[0]);
  }
}
