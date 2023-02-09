import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { ITodoList, ITodoListInternal } from "../../interfaces/todo_list";
import { CollabsReplica } from "./replica";

class TodoListInternal extends collabs.CObject implements ITodoListInternal {
  private readonly text: collabs.CText;
  private readonly doneCollab: collabs.TrueWinsCBoolean;
  private readonly items: collabs.CList<TodoListInternal, []>;

  constructor(init: collabs.InitToken) {
    super(init);
    this.text = this.addChild("text", (init) => new collabs.CText(init));
    this.doneCollab = this.addChild(
      "done",
      (init) => new collabs.TrueWinsCBoolean(init)
    );
    this.items = this.addChild(
      "items",
      (init) =>
        new collabs.CList(init, (valueInit) => new TodoListInternal(valueInit))
    );
  }

  addItem(index: number, text: string): void {
    let item = this.items.insert(index);
    item.insertText(0, text);
  }
  deleteItem(index: number): void {
    this.items.delete(index);
  }
  getItem(index: number): TodoListInternal {
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
    this.text.insert(index, text);
  }
  deleteText(index: number, count: number): void {
    this.text.delete(index, count);
  }
  get textSize(): number {
    return this.text.length; // Assumes all text variables are one char
  }
  getText(): string {
    return this.text.toString();
  }
}

export function CollabsTodoList(causalityGuaranteed: boolean) {
  return class CollabsTodoList extends CollabsReplica implements ITodoList {
    readonly rootInternal: TodoListInternal;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.rootInternal = this.app.registerCollab(
        "",
        (init) => new TodoListInternal(init)
      );
    }
  };
}
