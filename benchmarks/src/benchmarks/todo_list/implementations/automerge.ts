import { Data } from "../../../implementation";
import { AutomergeReplica } from "../../../libraries";
import { TodoListCRDT, TodoListReplica } from "../benchmark";
import Automerge from "automerge";

class AutomergeTodoListCRDT implements TodoListCRDT {
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

  getItem(index: number): AutomergeTodoListCRDT {
    return new AutomergeTodoListCRDT(this.rootList, [...this.cursor, index]);
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
  implements TodoListReplica
{
  readonly rootTodoList: TodoListCRDT;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.rootTodoList = new AutomergeTodoListCRDT(this, []);
  }

  // Override
  skipLoad() {
    this.doc = Automerge.from([]);
  }
}
