import Automerge from "automerge";
import { Data } from "../../../util";
import { ITodoListInternal, ITodoList } from "../../interfaces/todo_list";
import { AutomergeReplica } from "./replica";

class AutomergeTodoListInternal implements ITodoListInternal {
  /**
   * @param cursor series of indices to use in rootList to access this item
   */
  constructor(
    private readonly rootList: AutomergeTodoList,
    private readonly cursor: readonly number[]
  ) {}

  private getThis(doc: any): any {
    let thisObj = doc;
    for (let index of this.cursor) {
      thisObj = thisObj.items[index];
    }
    return thisObj;
  }

  addItem(index: number, text: string): void {
    this.rootList.doc = Automerge.change(this.rootList.doc, (doc) => {
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
    this.rootList.doc = Automerge.change(this.rootList.doc, (doc) => {
      let thisDoc = this.getThis(doc);
      thisDoc.items.deleteAt(index);
    });
  }

  getItem(index: number): AutomergeTodoListInternal {
    return new AutomergeTodoListInternal(this.rootList, [
      ...this.cursor,
      index,
    ]);
  }

  get itemsSize(): number {
    return this.getThis(this.rootList.doc).items.length;
  }

  get done(): boolean {
    return this.getThis(this.rootList.doc).done;
  }

  set done(done: boolean) {
    this.rootList.doc = Automerge.change(this.rootList.doc, (doc) => {
      let thisDoc = this.getThis(doc);
      thisDoc.done = done;
    });
  }

  insertText(index: number, text: string): void {
    this.rootList.doc = Automerge.change(this.rootList.doc, (doc) => {
      let thisDoc = this.getThis(doc);
      (thisDoc.text as Automerge.Text).insertAt!(index, ...text);
    });
  }

  deleteText(index: number, count: number): void {
    this.rootList.doc = Automerge.change(this.rootList.doc, (doc) => {
      let thisDoc = this.getThis(doc);
      (thisDoc.text as Automerge.Text).deleteAt!(index, count);
    });
  }

  get textSize(): number {
    return (this.getThis(this.rootList.doc).text as Automerge.Text).length;
  }

  getText(): string {
    return (this.getThis(this.rootList.doc).text as Automerge.Text).toString();
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

  // Override
  skipLoad() {
    this.doc = Automerge.from([]);
  }
}
