import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { ITodoListInternal, ITodoList } from "../../interfaces/todo_list";
import { CollabsReplica } from "./replica";

class ResettingTodoListInternal
  extends collabs.CObject
  implements ITodoListInternal, collabs.Resettable
{
  private readonly text: collabs.CText;
  private readonly doneCollab: collabs.TrueWinsCBoolean;
  private readonly items: collabs.ResettingMutCList<ResettingTodoListInternal>;

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
        collabs.ConstructorAsFunction(ResettingTodoListInternal)
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
  getItem(index: number): ITodoListInternal {
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

export class CollabsResettingTodoList
  extends CollabsReplica
  implements ITodoList
{
  readonly rootInternal: ResettingTodoListInternal;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.rootInternal = this.app.registerCollab(
      "",
      collabs.Pre(ResettingTodoListInternal)()
    );
  }
}
