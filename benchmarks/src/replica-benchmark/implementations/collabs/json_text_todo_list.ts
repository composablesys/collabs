import * as collabs from "@collabs/collabs";
import { JSONArray, JSONElement, JSONObject, TextWrapper } from "@collabs/json";
import { Data } from "../../../util";
import { ITodoList, ITodoListInternal } from "../../interfaces/todo_list";
import { CollabsReplica } from "./replica";

class JSONTextTodoListInternal implements ITodoListInternal {
  constructor(private readonly jsonObj: JSONObject) {}

  addItem(index: number, text: string): void {
    let item = (this.jsonObj.get("items")!.value as JSONArray).insert(index);
    item.setOrdinaryJS({
      items: [],
      done: false,
      text: new TextWrapper(text),
    });
  }

  deleteItem(index: number): void {
    (this.jsonObj.get("items")!.value as JSONArray).delete(index);
  }

  getItem(index: number): ITodoListInternal {
    return new JSONTextTodoListInternal(
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
    let textArray = this.jsonObj.get("text")!.value as collabs.CText;
    textArray.insert(index, text);
  }

  deleteText(index: number, count: number): void {
    let textList = this.jsonObj.get("text")!.value as collabs.CText;
    textList.delete(index, count);
  }

  get textSize(): number {
    return (this.jsonObj.get("text")!.value as collabs.CText).length;
  }

  getText(): string {
    return (this.jsonObj.get("text")!.value as collabs.CText).toString();
  }
}

export function CollabsJSONTextTodoList(causalityGuaranteed: boolean) {
  return class CollabsJSONTextTodoList
    extends CollabsReplica
    implements ITodoList
  {
    rootInternal!: ITodoListInternal;
    private readonly rootJSON: JSONElement;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.rootJSON = this.app.registerCollab("", JSONElement.NewJSON);
    }

    skipLoad() {
      this.app.load(
        collabs.Optional.of(CollabsJSONTextTodoList.getFakeInitialSaveData())
      );
      this.rootInternal = new JSONTextTodoListInternal(
        this.rootJSON.value as JSONObject
      );
    }

    load(savedState: Uint8Array): void {
      super.load(savedState);
      this.rootInternal = new JSONTextTodoListInternal(
        this.rootJSON.value as JSONObject
      );
    }

    private static _fakeInitialSaveData?: Uint8Array;
    private static getFakeInitialSaveData(): Uint8Array {
      if (this._fakeInitialSaveData === undefined) {
        // This is a trick to give us initial value
        // { items: [] }.
        const fakeInitialApp = new collabs.CRDTApp({ debugReplicaID: "INIT" });
        const fakeInitialJSON = fakeInitialApp.registerCollab(
          "",
          JSONElement.NewJSON
        );
        fakeInitialApp.load(collabs.Optional.empty());
        fakeInitialJSON.setOrdinaryJS({ items: [] });
        this._fakeInitialSaveData = fakeInitialApp.save();
      }
      return this._fakeInitialSaveData;
    }
  };
}
