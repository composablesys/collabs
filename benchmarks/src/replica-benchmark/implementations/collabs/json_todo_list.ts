import * as collabs from "@collabs/collabs";
import { JSONArray, JSONElement, JSONObject } from "@collabs/json";
import { Data } from "../../../util";
import { ITodoListInternal, ITodoList } from "../../interfaces/todo_list";
import { CollabsReplica } from "./replica";

class JSONTodoListInternal implements ITodoListInternal {
  constructor(private readonly jsonObj: JSONObject) {}

  addItem(index: number, text: string): void {
    let item = (this.jsonObj.get("items")!.value as JSONArray).insert(index);
    item.setOrdinaryJS({
      items: [],
      done: false,
      text: [...text],
    });
  }

  deleteItem(index: number): void {
    (this.jsonObj.get("items")!.value as JSONArray).delete(index);
  }

  getItem(index: number): ITodoListInternal {
    return new JSONTodoListInternal(
      (this.jsonObj.get("items")!.value as JSONArray).get(index)!
        .value as JSONObject
    );
  }

  get itemsSize(): number {
    return (this.jsonObj.get("items")!.value as JSONArray).length;
  }

  get done(): boolean {
    return this.jsonObj.get("done")!.value as boolean;
  }

  set done(done: boolean) {
    this.jsonObj.get("done")!.setPrimitive(done);
  }

  insertText(index: number, text: string): void {
    // TODO: use bulk ops
    let textArray = this.jsonObj.get("text")!.value as JSONArray;
    for (let i = 0; i < text.length; i++) {
      textArray.insert(index + i).setPrimitive(text[i]);
    }
  }

  deleteText(index: number, count: number): void {
    let textArray = this.jsonObj.get("text")!.value as JSONArray;
    for (let i = 0; i < count; i++) {
      textArray.delete(index);
    }
  }

  get textSize(): number {
    return (this.jsonObj.get("text")!.value as JSONArray).length;
  }

  getText(): string {
    return (this.jsonObj.get("text")!.value as JSONArray)
      .asArray()
      .map((element) => element.value)
      .join("");
  }
}

export class CollabsJSONTodoList extends CollabsReplica implements ITodoList {
  rootInternal!: ITodoListInternal;
  private readonly rootJSON: JSONElement;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.rootJSON = this.app.registerCollab("", JSONElement.NewJSON);
  }

  skipLoad() {
    this.app.load(
      collabs.Optional.of(CollabsJSONTodoList.getFakeInitialSaveData())
    );
    this.rootInternal = new JSONTodoListInternal(
      this.rootJSON.value as JSONObject
    );
  }

  load(saveData: Uint8Array): void {
    super.load(saveData);
    this.rootInternal = new JSONTodoListInternal(
      this.rootJSON.value as JSONObject
    );
  }

  private static _fakeInitialSaveData?: Uint8Array;
  private static getFakeInitialSaveData(): Uint8Array {
    if (this._fakeInitialSaveData === undefined) {
      // TODO: This is a hack to give us initial value
      // { items: [] }. Need to find a better way as part
      // of initial values generally.
      const fakeInitialApp = new collabs.CRDTApp({ debugReplicaId: "INIT" });
      const fakeInitialJSON = fakeInitialApp.registerCollab(
        "",
        JSONElement.NewJSON
      );
      fakeInitialJSON.setOrdinaryJS({ items: [] });
      this._fakeInitialSaveData = fakeInitialApp.save();
    }
    return this._fakeInitialSaveData;
  }
}
