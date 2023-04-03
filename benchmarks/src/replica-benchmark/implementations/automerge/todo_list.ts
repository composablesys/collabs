import * as automerge from "@automerge/automerge";
import { Data } from "../../../util";
import { ITodoList, ITodoListInternal } from "../../interfaces/todo_list";
import { AutomergeReplica } from "./replica";

class AutomergeTodoListInternal implements ITodoListInternal {
  /**
   * @param cursor series of indices to use in replica to access this item
   */
  constructor(
    private readonly replica: AutomergeReplica<any>,
    private readonly cursor: readonly number[]
  ) {}

  private getThis(doc: any): any {
    let thisObj = doc;
    for (const index of this.cursor) {
      thisObj = thisObj.items[index];
    }
    return thisObj;
  }

  addItem(index: number, text: string): void {
    this.replica.doc = automerge.change(this.replica.doc, (d) => {
      const thisDoc = this.getThis(d);
      thisDoc.items.insertAt(index, {
        text: new automerge.Text(text),
        done: false,
        items: [],
      });
    });
  }

  deleteItem(index: number): void {
    this.replica.doc = automerge.change(this.replica.doc, (d) => {
      const thisDoc = this.getThis(d);
      thisDoc.items.deleteAt(index, 1);
    });
  }

  getItem(index: number): AutomergeTodoListInternal {
    return new AutomergeTodoListInternal(this.replica, [...this.cursor, index]);
  }

  get itemsSize(): number {
    return this.getThis(this.replica.doc).items.length;
  }

  get done(): boolean {
    return this.getThis(this.replica.doc).done;
  }

  set done(done: boolean) {
    this.replica.doc = automerge.change(this.replica.doc, (d) => {
      const thisDoc = this.getThis(d);
      thisDoc.done = done;
    });
  }

  insertText(index: number, text: string): void {
    this.replica.doc = automerge.change(this.replica.doc, (d) => {
      const thisDoc = this.getThis(d);
      (thisDoc.text as automerge.Text).insertAt(index, ...text);
    });
  }

  deleteText(index: number, count: number): void {
    this.replica.doc = automerge.change(this.replica.doc, (d) => {
      const thisDoc = this.getThis(d);
      (thisDoc.text as automerge.Text).deleteAt(index, count);
    });
  }

  get textSize(): number {
    return (this.getThis(this.replica.doc).text as automerge.Text).length;
  }

  getText(): string {
    return (this.getThis(this.replica.doc).text as automerge.Text).toString();
  }
}

export class AutomergeTodoList
  extends AutomergeReplica<any>
  implements ITodoList
{
  readonly rootInternal: ITodoListInternal;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.rootInternal = new AutomergeTodoListInternal(this, []);
  }

  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({
    items: [],
  });

  skipLoad() {
    this.doc = automerge.load(AutomergeTodoList.fakeInitialSave, this.actorId);
  }
}
