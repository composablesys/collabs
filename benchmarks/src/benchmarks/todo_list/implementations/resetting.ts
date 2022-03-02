import * as collabs from "@collabs/collabs";
import { Data } from "../../../implementation";
import { CollabsReplica } from "../../../libraries";
import { TodoListCRDT, TodoListReplica } from "../benchmark";

class ResettingTodoListCRDT
  extends collabs.CObject
  implements TodoListCRDT, collabs.Resettable
{
  private readonly text: collabs.CText;
  private readonly doneCollab: collabs.TrueWinsCBoolean;
  private readonly items: collabs.ResettingMutCList<ResettingTodoListCRDT>;

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
        collabs.ConstructorAsFunction(ResettingTodoListCRDT)
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
  getItem(index: number): ResettingTodoListCRDT {
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

export class Resetting extends CollabsReplica implements TodoListReplica {
  readonly rootTodoList: TodoListCRDT;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.rootTodoList = this.app.registerCollab(
      "",
      collabs.Pre(ResettingTodoListCRDT)()
    );
  }
}
