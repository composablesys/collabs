import { CBoolean, CList, CObject, CText, InitToken } from "@collabs/collabs";
import { Data } from "../../../util";
import { ITodoList, ITodoListInternal } from "../../interfaces/todo_list";
import { CollabsReplica } from "./replica";

class TodoListInternal extends CObject implements ITodoListInternal {
  private readonly text: CText;
  private readonly doneCollab: CBoolean;
  private readonly items: CList<TodoListInternal, []>;

  constructor(init: InitToken) {
    super(init);
    this.text = this.registerCollab("text", (init) => new CText(init));
    this.doneCollab = this.registerCollab("done", (init) => new CBoolean(init));
    this.items = this.registerCollab(
      "items",
      (init) => new CList(init, (valueInit) => new TodoListInternal(valueInit))
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

      this.rootInternal = this.runtime.registerCollab(
        "",
        (init) => new TodoListInternal(init)
      );
    }
  };
}
