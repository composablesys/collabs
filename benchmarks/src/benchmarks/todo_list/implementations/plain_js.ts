import { Data } from "../../../implementation";
import { TodoListCRDT, TodoListReplica } from "../benchmark";

class PlainJsTodoListCRDT implements TodoListCRDT {
  private text: string;
  done: boolean;
  private items: PlainJsTodoListCRDT[];

  constructor(text: string) {
    this.text = text;
    this.done = false;
    this.items = [];
  }

  addItem(index: number, text: string): void {
    this.items.splice(index, 0, new PlainJsTodoListCRDT(text));
  }
  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }
  getItem(index: number): PlainJsTodoListCRDT {
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

/**
 * For debugging/presentation only - doesn't actually send messages
 * or generate saveData.
 */
export class PlainJS implements TodoListReplica {
  readonly rootTodoList = new PlainJsTodoListCRDT("");

  transact(doOps: () => void) {
    doOps();
  }

  receive(msg: Data): void {
    throw new Error("Method not implemented.");
  }

  save(): Data {
    throw new Error("Method not implemented.");
  }

  load(saveData: Data): void {
    throw new Error("Method not implemented.");
  }

  skipLoad(): void {}
}
