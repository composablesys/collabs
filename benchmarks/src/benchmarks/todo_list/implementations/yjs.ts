import { Data } from "../../../implementation";
import { YjsReplica } from "../../../libraries";
import { TodoListCRDT, TodoListReplica } from "../benchmark";
import * as Y from "yjs";

class YjsTodoListCRDT implements TodoListCRDT {
  private readonly textCollab: Y.Text;
  private readonly items: Y.Array<Y.Map<any>>;
  constructor(
    private readonly rootList: YjsTodoList,
    private readonly map: Y.Map<any>
  ) {
    this.textCollab = map.get("text");
    this.items = map.get("items");
  }

  addItem(index: number, text: string): void {
    let item = new Y.Map<any>();
    item.set("text", new Y.Text(text));
    item.set("items", new Y.Array<Y.Map<any>>());
    item.set("done", false);
    this.items.insert(index, [item]);
  }
  deleteItem(index: number): void {
    this.items.delete(index);
  }
  getItem(index: number): TodoListCRDT {
    return new YjsTodoListCRDT(this.rootList, this.items.get(index));
  }
  get itemsSize(): number {
    return this.items.length;
  }

  get done(): boolean {
    return this.map.get("done");
  }
  set done(done: boolean) {
    this.map.set("done", done);
  }

  insertText(index: number, text: string): void {
    this.textCollab.insert(index, text);
  }
  deleteText(index: number, count: number): void {
    this.textCollab.delete(index, count);
  }
  get textSize(): number {
    return this.textCollab.length;
  }
  getText(): string {
    return this.textCollab.toString();
  }
}

export class YjsTodoList extends YjsReplica implements TodoListReplica {
  rootTodoList!: TodoListCRDT;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);
  }

  skipLoad() {
    Y.applyUpdate(this.doc, YjsTodoList.getFakeInitialSaveData());
    this.rootTodoList = new YjsTodoListCRDT(this, this.doc.getMap());
  }

  load(saveData: Uint8Array): void {
    super.load(saveData);
    this.rootTodoList = new YjsTodoListCRDT(this, this.doc.getMap());
  }

  private static _fakeInitialSaveData?: Uint8Array;
  private static getFakeInitialSaveData(): Uint8Array {
    if (this._fakeInitialSaveData === undefined) {
      // TODO: This is a hack to give us initial value
      // { items: [] }.
      // See https://discuss.yjs.dev/t/initial-offline-value-of-a-shared-document/465/6
      const fakeInitialDoc = new Y.Doc();
      fakeInitialDoc.clientID = 0;
      fakeInitialDoc.transact(() => {
        fakeInitialDoc.getMap().set("items", new Y.Array());
      });
      this._fakeInitialSaveData = Y.encodeStateAsUpdate(fakeInitialDoc);
    }
    return this._fakeInitialSaveData;
  }
}
