import { DefaultElementSerializer, TextSerializer } from "../../util";
import { CompositeCrdt } from "../core";
import { Resettable } from "../helper_crdts";
import { TreedocList, TreedocPrimitiveList } from "../list";
import { RiakCrdtMap } from "../map";
import { LwwRegister } from "../register";

// TODO: remove makeExistent stuff?  Very expensive and rarely useful.

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | JsonArray
  | TreedocPrimitiveList<string>;

export class JsonObject extends CompositeCrdt implements Resettable {
  private readonly internalMap: RiakCrdtMap<string, JsonElement>;
  /**
   * Internal use only
   */
  constructor(private readonly makeThisExistent: () => void) {
    super();
    // Note that adding the key explicitly is redundant, since a value
    // only ever calls makeThisExistent as part of an operation, and
    // that operation suffices to revive its map key, due to RiakCrdtMap's
    // semantics.
    this.internalMap = this.addChild(
      "nestedMap",
      new RiakCrdtMap(
        () => new JsonElement(makeThisExistent),
        DefaultElementSerializer.getInstance()
      )
    );
  }

  get(key: string): JsonElement | undefined {
    return this.internalMap.get(key);
  }

  addKey(key: string): void {
    this.makeThisExistent();
    this.internalMap.addKey(key);
  }

  has(key: string): boolean {
    return this.internalMap.has(key);
  }

  delete(key: string) {
    // TODO: return whether actually deleted?  Semantically difficult.
    // TODO: comment for now because it seems to make semantic sense.
    // this.makeThisExistent();
    this.internalMap.delete(key);
  }

  reset() {
    // TODO: comment for now to avoid recursion & expensive resets
    // this.makeThisExistent();
    this.internalMap.reset();
  }

  keys() {
    return this.internalMap.keys();
  }

  values() {
    return this.internalMap.values();
  }

  asMap(): Map<string, JsonElement> {
    return new Map(this.internalMap);
  }

  asObject(): { [key: string]: JsonElement } {
    let ans: { [key: string]: JsonElement } = {};
    for (let entry of this.asMap()) {
      ans[entry[0]] = entry[1];
    }
    return ans;
  }
}

export class JsonArray extends CompositeCrdt implements Resettable {
  private readonly internalList: TreedocList<JsonElement>;
  constructor(private readonly makeThisExistent: () => void) {
    super();
    this.internalList = this.addChild(
      "nestedMap",
      new TreedocList(() => new JsonElement(makeThisExistent))
    );
  }

  insert(index: number): JsonElement {
    this.makeThisExistent();
    return this.internalList.insertAt(index)[1];
  }

  insertRange(index: number, count: number): JsonElement[] {
    this.makeThisExistent();
    return this.internalList
      .insertAtRange(index, count)
      .map((value) => value[1]);
  }

  delete(index: number): void {
    // TODO: comment for now because it seems to make semantic sense.
    // this.makeThisExistent();
    this.internalList.deleteAt(index);
  }

  get(index: number): JsonElement {
    return this.internalList.getAt(index);
  }

  reset(): void {
    // TODO: comment for now to avoid recursion & expensive resets
    // this.makeThisExistent();
    this.internalList.reset();
  }

  get length(): number {
    return this.internalList.length;
  }

  asArray(): JsonElement[] {
    return this.internalList.asArray();
  }
}

export class TextWrapper {
  constructor(public text: string) {}
}

// TODO: only call makeThisExistent once per meta-op.
// E.g. currently a reset on a big object will call it once per
// sub-reset, each causing a call up the whole chain.

export class JsonElement extends CompositeCrdt implements Resettable {
  private register: LwwRegister<JsonValue>;
  private object: JsonObject;
  private array: JsonArray;
  private text: TreedocPrimitiveList<string>;
  private makeThisExistent: () => void;

  static NewJson(): JsonElement {
    return new JsonElement(() => {});
  }

  /**
   * Internal use only
   */
  constructor(makeThisExistent: () => void) {
    super();
    this.makeThisExistent = makeThisExistent;
    this.register = this.addChild("register", new LwwRegister<JsonValue>(null));
    this.object = this.addChild(
      "object",
      new JsonObject(() => this.setIsObject())
    );
    this.array = this.addChild("array", new JsonArray(() => this.setIsArray()));
    this.text = this.addChild(
      "text",
      new TreedocPrimitiveList(TextSerializer.instance)
    );
  }

  get value(): JsonValue {
    return this.register.value;
  }

  get type():
    | "number"
    | "string"
    | "boolean"
    | "null"
    | "JsonObject"
    | "JsonArray"
    | "Text" {
    let value = this.value;
    switch (typeof value) {
      case "number":
        return "number";
      case "string":
        return "string";
      case "boolean":
        return "boolean";
      case "object":
        if (value === null) return "null";
        if (value === this.object) return "JsonObject";
        if (value === this.array) return "JsonArray";
        if (value === this.text) return "Text";
    }
    throw new Error(
      "this.value did not match any expected type: " + this.value
    );
  }

  // TODO: way to examine conflicts

  setPrimitive(value: number | string | boolean | null) {
    this.makeThisExistent();
    this.object.reset();
    this.array.reset();
    this.register.value = value;
  }

  setIsObject() {
    this.makeThisExistent();
    this.array.reset();
    this.register.value = this.object;
  }

  setIsArray() {
    this.makeThisExistent();
    this.object.reset();
    this.register.value = this.array;
  }

  setIsText() {
    this.makeThisExistent();
    this.object.reset();
    this.register.value = this.text;
  }

  reset() {
    // TODO: use generic CompositeCrdt reset
    this.object.reset();
    this.array.reset();
    this.text.reset();
    this.register.reset();
  }

  asOrdinaryJS(): any {
    switch (this.value) {
      case this.object:
        let ansMap: { [key: string]: any } = {};
        for (let key of this.object.keys()) {
          ansMap[key] = this.object.get(key)!.asOrdinaryJS();
        }
        return ansMap;
      case this.array:
        let ansList: any[] = [];
        for (let i = 0; i < this.array.length; i++) {
          ansList.push(this.array.get(i).asOrdinaryJS());
        }
        return ansList;
      case this.text:
        return new TextWrapper(this.text.asArray().join(""));
      default:
        return this.value;
    }
  }

  // TODO: nesting will lead to quadratic calls
  // to make-existent up the chain, as well as
  // resets.  Really just need one each.
  // Could have a private recursive version and a
  // public top-level version that does one reset.
  setOrdinaryJS(value: any) {
    this.reset();
    switch (typeof value) {
      case "number":
      case "string":
      case "boolean":
        this.setPrimitive(value);
        return;
      case "object":
        if (value === null) this.setPrimitive(null);
        else if (value instanceof TextWrapper) {
          this.setIsText();
          this.text.insertAtRange(0, [...value.text]);
        } else if (Array.isArray(value)) {
          this.setIsArray();
          this.array.insertRange(0, value.length);
          for (let i = 0; i < value.length; i++) {
            this.array.get(i).setOrdinaryJS(value[i]);
          }
        } else {
          // Ordinary object; use map
          this.setIsObject();
          for (let entry of Object.entries(value)) {
            this.object.addKey(entry[0]);
            this.object.get(entry[0])!.setOrdinaryJS(entry[1]);
          }
        }
        return;
    }
    throw new Error("Unsupported value: " + value);
  }
}
