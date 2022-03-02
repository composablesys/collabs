import * as collabs from "@collabs/collabs";
import { JSONCollab, JSONCursor } from "@collabs/json-opt";
import { Data } from "../../../implementation";
import { CollabsReplica } from "../../../libraries";
import { TodoListCRDT, TodoListReplica } from "../benchmark";

/**
 * TODO: not working (throws errors).
 */
class JSONOptTodoListCRDT implements TodoListCRDT {
  private readonly items: JSONCursor;
  private readonly ids: collabs.PrimitiveCList<string>;
  private readonly text: collabs.PrimitiveCList<string>;

  constructor(
    private readonly collab: JSONCursor,
    private readonly idGen: collabs.RgaDenseLocalList<undefined>,
    private readonly runtime: collabs.Runtime
  ) {
    this.items = this.collab.get("items")[0] as JSONCursor;
    this.ids = this.collab.get("itemsIds")[0] as collabs.PrimitiveCList<string>;
    this.text = this.collab.get("text")[0] as collabs.PrimitiveCList<string>;
  }

  addItem(index: number, text: string): void {
    // Generate new id for this index
    let id = this.idGen.createNewLocs(index, 1)[0];
    let key: string = collabs.bytesAsString(this.idGen.serialize(id));
    this.ids.insert(index, key);

    // Update JSON Collab with new item
    this.items.setIsMap(key);
    let newItem = this.items.get(key)[0] as JSONCursor;
    newItem.setIsMap("items");
    newItem.setIsList("itemsIds");
    newItem.set("done", false);
    newItem.setIsList("text");

    // Update text item
    let textItem = newItem.get("text")[0] as collabs.PrimitiveCList<string>;
    textItem.insert(0, ...text);
  }

  deleteItem(index: number): void {
    let id: string = this.ids.get(index);
    this.ids.delete(index);
    this.items.delete(id);
  }

  getItem(index: number): TodoListCRDT {
    let id: string = this.ids.get(index);
    return new JSONOptTodoListCRDT(
      this.items.get(id)[0] as JSONCursor,
      this.idGen,
      this.runtime
    );
  }
  get itemsSize(): number {
    return this.ids.length;
  }

  get done(): boolean {
    return this.collab.get("done")[0] as boolean;
  }

  set done(done: boolean) {
    this.collab.set("done", done);
  }

  insertText(index: number, text: string): void {
    this.text.insert(index, ...text);
  }

  deleteText(index: number, count: number): void {
    this.text.delete(index, count);
  }

  get textSize(): number {
    return this.text.length;
  }

  getText(): string {
    return this.text.join("");
  }
}

export class JSONOptTodoList extends CollabsReplica implements TodoListReplica {
  rootTodoList!: TodoListCRDT;
  private readonly rootCursor: JSONCursor;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    const rootJSON = this.app.registerCollab("", collabs.Pre(JSONCollab)());
    this.rootCursor = new JSONCursor(rootJSON);
  }

  skipLoad() {
    this.app.load(
      collabs.Optional.of(JSONOptTodoList.getFakeInitialSaveData())
    );
    this.rootTodoList = new JSONOptTodoListCRDT(
      this.rootCursor,
      new collabs.RgaDenseLocalList<undefined>(this.app.runtime),
      this.app.runtime
    );
  }

  load(saveData: Uint8Array): void {
    super.load(saveData);
    this.rootTodoList = new JSONOptTodoListCRDT(
      this.rootCursor,
      new collabs.RgaDenseLocalList<undefined>(this.app.runtime),
      this.app.runtime
    );
  }

  private static _fakeInitialSaveData?: Uint8Array;
  private static getFakeInitialSaveData(): Uint8Array {
    if (this._fakeInitialSaveData === undefined) {
      // TODO: This is a hack to give us initial value.
      // Need to find a better way as part
      // of initial values generally.
      const fakeInitialApp = new collabs.CRDTApp({ debugReplicaId: "INIT" });
      const fakeInitialRootJSON = fakeInitialApp.registerCollab(
        "",
        collabs.Pre(JSONCollab)()
      );
      const fakeInitialRootCursor = new JSONCursor(fakeInitialRootJSON);
      fakeInitialRootCursor.setIsMap("items");
      fakeInitialRootCursor.setIsList("itemsIds");
      fakeInitialRootCursor.set("done", false);
      fakeInitialRootCursor.setIsList("text");

      this._fakeInitialSaveData = fakeInitialApp.save();
    }
    return this._fakeInitialSaveData;
  }
}
