import { prng } from "seedrandom";
import { ITodoListInternal, ITodoList } from "../interfaces/todo_list";
import { Trace } from "../replica_benchmark";
import { result10000 } from "./todo_list_trace_results";

/**
 * Number of ops to do in one-replica benchmarks.
 */
const OPS = 10000;

export class TodoListTrace implements Trace<ITodoList> {
  doOp(replica: ITodoList, rng: prng): void {
    this.randomOp(replica.rootInternal, rng);
  }

  getState(replica: ITodoList): unknown {
    return this.toObject(replica.rootInternal, true);
  }

  readonly numOps = OPS;

  readonly correctState = result10000;

  private choice(options: number, rng: seedrandom.prng) {
    return Math.floor(rng() * options);
  }

  private randomItem(
    startList: ITodoListInternal,
    excludeStart: boolean,
    rng: seedrandom.prng
  ): ITodoListInternal {
    if (excludeStart) {
      if (startList.itemsSize === 0) {
        throw new Error("excludeStart is true but startList has no items");
      }
    } else if (startList.itemsSize === 0 || this.choice(2, rng) === 0) {
      return startList;
    }
    return this.randomItem(
      startList.getItem(this.choice(startList.itemsSize, rng)),
      false,
      rng
    );
  }

  /**
   * Like randomItem(startList, false), but instead of returning the item,
   * it returns
   * its parent and its index within the parent.
   */
  private randomItemLocation(
    startList: ITodoListInternal,
    rng: seedrandom.prng
  ): [parent: ITodoListInternal, index: number] {
    if (startList.itemsSize === 0) {
      throw new Error("startList has no items");
    }
    let randomIndex = this.choice(startList.itemsSize, rng);
    let child = startList.getItem(randomIndex);
    if (child.itemsSize === 0 || this.choice(2, rng))
      return [startList, randomIndex];
    else return this.randomItemLocation(child, rng);
  }

  private randomText(rng: seedrandom.prng): string {
    let length = 10 + this.choice(41, rng); //10 to 50
    let ans = "";
    while (ans.length < length) {
      ans += rng().toPrecision(Math.min(21, length - ans.length));
    }
    return ans;
  }

  private randomOp(list: ITodoListInternal, rng: seedrandom.prng) {
    // If the top-level list is empty, only "create item" ops are allowed
    let opChoice = rng();
    if (list.itemsSize === 0) opChoice = 0;
    if (opChoice < 0.25) {
      // Create item
      let parent = this.randomItem(list, false, rng);
      let index = this.choice(parent.itemsSize + 1, rng);
      parent.addItem(index, this.randomText(rng));
    } else if (opChoice < 0.45) {
      // Insert text in existing item
      let item = this.randomItem(list, true, rng);
      item.insertText(
        this.choice(item.textSize + 1, rng),
        this.randomText(rng)
      );
    } else if (opChoice < 0.65) {
      // Delete text in existing item
      let item = this.randomItem(list, true, rng);
      // TODO: skip if item.textSize is 0.  Not changing
      // for now to avoid re-running benchmarks.
      let index = this.choice(item.textSize, rng);
      let count = Math.min(this.choice(41, rng) + 10, item.textSize - index);
      item.deleteText(index, count);
    } else if (opChoice < 0.85) {
      // Toggle "done" on existing item
      let item = this.randomItem(list, true, rng);
      item.done = !item.done;
    } else {
      // Delete an existing item
      let [parent, index] = this.randomItemLocation(list, rng);
      parent.deleteItem(index);
    }
  }

  private toObject(list: ITodoListInternal, topLevel: boolean): Object {
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

  totalItems(list: ITodoListInternal): number {
    let total = list.itemsSize;
    for (let i = 0; i < list.itemsSize; i++) {
      total += this.totalItems(list.getItem(i));
    }
    return total;
  }

  maxDepth(list: ITodoListInternal): number {
    let maxSub = 0;
    for (let i = 0; i < list.itemsSize; i++) {
      maxSub = Math.max(maxSub, this.maxDepth(list.getItem(i)));
    }
    return 1 + maxSub;
  }
}
