// import * as collabs from "@collabs/collabs";
// import { JSONCollab, JSONCursor } from "@collabs/json-opt";
// import { Data } from "../../../util";
// import { ITodoListInternal, ITodoList } from "../../interfaces/todo_list";
// import { CollabsReplica } from "./replica";
//
// /**
//  * TODO: not working (throws errors).
//  */
// class JSONOptTodoListInternal implements ITodoListInternal {
//   private readonly items: JSONCursor;
//   private readonly ids: collabs.PrimitiveCList<string>;
//   private readonly text: collabs.PrimitiveCList<string>;
//
//   constructor(
//     private readonly collab: JSONCursor,
//     private readonly idGen: collabs.RgaDenseLocalList<undefined>,
//     private readonly runtime: collabs.IRuntime
//   ) {
//     this.items = this.collab.get("items")[0] as JSONCursor;
//     this.ids = this.collab.get("itemsIds")[0] as collabs.PrimitiveCList<string>;
//     this.text = this.collab.get("text")[0] as collabs.PrimitiveCList<string>;
//   }
//
//   addItem(index: number, text: string): void {
//     // Generate new id for this index
//     let id = this.idGen.createNewLocs(index, 1)[0];
//     let key: string = collabs.Bytes.stringify(this.idGen.serialize(id));
//     this.ids.insert(index, key);
//
//     // Update JSON Collab with new item
//     this.items.setIsMap(key);
//     let newItem = this.items.get(key)[0] as JSONCursor;
//     newItem.setIsMap("items");
//     newItem.setIsList("itemsIds");
//     newItem.set("done", false);
//     newItem.setIsList("text");
//
//     // Update text item
//     let textItem = newItem.get("text")[0] as collabs.PrimitiveCList<string>;
//     textItem.insert(0, ...text);
//   }
//
//   deleteItem(index: number): void {
//     let id: string = this.ids.get(index);
//     this.ids.delete(index);
//     this.items.delete(id);
//   }
//
//   getItem(index: number): ITodoListInternal {
//     let id: string = this.ids.get(index);
//     return new JSONOptTodoListInternal(
//       this.items.get(id)[0] as JSONCursor,
//       this.idGen,
//       this.runtime
//     );
//   }
//   get itemsSize(): number {
//     return this.ids.length;
//   }
//
//   get done(): boolean {
//     return this.collab.get("done")[0] as boolean;
//   }
//
//   set done(done: boolean) {
//     this.collab.set("done", done);
//   }
//
//   insertText(index: number, text: string): void {
//     this.text.insert(index, ...text);
//   }
//
//   deleteText(index: number, count: number): void {
//     this.text.delete(index, count);
//   }
//
//   get textSize(): number {
//     return this.text.length;
//   }
//
//   getText(): string {
//     return this.text.join("");
//   }
// }
//
// export class CollabsJSONOptTodoList
//   extends CollabsReplica
//   implements ITodoList
// {
//   rootInternal!: ITodoListInternal;
//   private readonly rootCursor: JSONCursor;
//
//   constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
//     super(onsend, replicaIdRng);
//
//     const rootJSON = this.app.registerCollab("", collabs.Pre(JSONCollab)());
//     this.rootCursor = new JSONCursor(rootJSON);
//   }
//
//   skipLoad() {
//     this.app.load(
//       collabs.Optional.of(CollabsJSONOptTodoList.getFakeInitialSaveData())
//     );
//     this.rootInternal = new JSONOptTodoListInternal(
//       this.rootCursor,
//       new collabs.RgaDenseLocalList<undefined>(this.app.runtime),
//       this.app.runtime
//     );
//   }
//
//   load(savedState: Uint8Array): void {
//     super.load(savedState);
//     this.rootInternal = new JSONOptTodoListInternal(
//       this.rootCursor,
//       new collabs.RgaDenseLocalList<undefined>(this.app.runtime),
//       this.app.runtime
//     );
//   }
//
//   private static _fakeInitialSaveData?: Uint8Array;
//   private static getFakeInitialSaveData(): Uint8Array {
//     if (this._fakeInitialSaveData === undefined) {
//       // This is a trick to give us an initial value.
//       // Need to find a better way as part
//       // of initial values generally.
//       const fakeInitialApp = new collabs.CRDTApp({ debugReplicaID: "INIT" });
//       const fakeInitialRootJSON = fakeInitialApp.registerCollab(
//         "",
//         collabs.Pre(JSONCollab)()
//       );
//       fakeInitialApp.load(collabs.Optional.empty());
//       const fakeInitialRootCursor = new JSONCursor(fakeInitialRootJSON);
//       fakeInitialRootCursor.setIsMap("items");
//       fakeInitialRootCursor.setIsList("itemsIds");
//       fakeInitialRootCursor.set("done", false);
//       fakeInitialRootCursor.setIsList("text");
//
//       this._fakeInitialSaveData = fakeInitialApp.save();
//     }
//     return this._fakeInitialSaveData;
//   }
// }
