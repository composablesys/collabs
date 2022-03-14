import {
  CObject,
  InitToken,
  CText,
  DefaultSerializer,
  LWWCVariable,
  LazyMutCMap,
  Pre,
  AddWinsCSet,
  DeletingMutCList,
  CollabID,
  Serializer,
  Collab,
  Runtime,
} from "@collabs/collabs";

// TODO: remove makeExistent stuff?  Very expensive and rarely useful.

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray
  | CText;

type SerializableJSONValue =
  | string
  | number
  | boolean
  | null
  | CollabID<JSONObject | JSONArray | CText>;

class JSONValueSerializer implements Serializer<JSONValue> {
  private readonly internalSerializer =
    DefaultSerializer.getInstance<SerializableJSONValue>();

  private constructor(private readonly runtime: Runtime) {}

  serialize(value: JSONValue): Uint8Array {
    const serializableValue: SerializableJSONValue =
      value instanceof Collab ? CollabID.fromCollab(value) : value;
    return this.internalSerializer.serialize(serializableValue);
  }

  deserialize(message: Uint8Array): JSONValue {
    const serializableValue = this.internalSerializer.deserialize(message);
    if (serializableValue instanceof CollabID) {
      return serializableValue.get(this.runtime)!;
    } else return serializableValue;
  }

  static instancesByRuntime = new Map<Runtime, JSONValueSerializer>();

  static getInstance(runtime: Runtime) {
    let instance = this.instancesByRuntime.get(runtime);
    if (instance === undefined) {
      instance = new JSONValueSerializer(runtime);
      this.instancesByRuntime.set(runtime, instance);
    }
    return instance;
  }
}

export class JSONObject extends CObject {
  private readonly internalMap: LazyMutCMap<string, JSONElement>;
  private readonly keySet: AddWinsCSet<string>;
  /**
   * Internal use only
   */
  constructor(
    initToken: InitToken,
    private readonly makeThisExistent: () => void
  ) {
    super(initToken);
    // Note that adding the key explicitly is redundant, since a value
    // only ever calls makeThisExistent as part of an operation, and
    // that operation suffices to revive its map key, due to MergingMutCMap's
    // semantics.
    this.internalMap = this.addChild(
      "nestedMap",
      Pre(LazyMutCMap)(
        (valueInitToken) => new JSONElement(valueInitToken, makeThisExistent),
        DefaultSerializer.getInstance()
      )
    );
    this.keySet = this.addChild("keySet", Pre(AddWinsCSet)());
  }

  get(key: string): JSONElement | undefined {
    if (this.keySet.has(key)) {
      return this.internalMap.get(key);
    } else return undefined;
  }

  addKey(key: string): void {
    this.makeThisExistent();
    this.keySet.add(key);
  }

  has(key: string): boolean {
    return this.keySet.has(key);
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
    this.keySet.clear();
    for (const value of this.internalMap.values()) {
      value.reset();
    }
  }

  keys() {
    return this.internalMap.keys();
  }

  values() {
    return this.internalMap.values();
  }

  asMap(): Map<string, JSONElement> {
    const entries: [string, JSONElement][] = [];
    for (const key of this.keySet) {
      entries.push([key, this.internalMap.get(key)]);
    }
    return new Map(entries);
  }

  asObject(): { [key: string]: JSONElement } {
    let ans: { [key: string]: JSONElement } = {};
    for (let entry of this.asMap()) {
      ans[entry[0]] = entry[1];
    }
    return ans;
  }
}

export class JSONArray extends CObject {
  private readonly internalList: DeletingMutCList<JSONElement, []>;
  constructor(
    initToken: InitToken,
    private readonly makeThisExistent: () => void
  ) {
    super(initToken);
    this.internalList = this.addChild(
      "nestedMap",
      Pre(DeletingMutCList)(
        (valueInitToken) => new JSONElement(valueInitToken, makeThisExistent)
      )
    );
  }

  insert(index: number): JSONElement {
    this.makeThisExistent();
    return this.internalList.insert(index);
  }

  insertRange(index: number, count: number): JSONElement[] {
    this.makeThisExistent();
    const elements = new Array<JSONElement>(count);
    for (let i = 0; i < count; i++) {
      elements[i] = this.internalList.insert(index);
    }
    return elements;
  }

  delete(index: number): void {
    // TODO: comment for now because it seems to make semantic sense.
    // this.makeThisExistent();
    this.internalList.delete(index);
  }

  get(index: number): JSONElement {
    return this.internalList.get(index);
  }

  reset(): void {
    // TODO: comment for now to avoid recursion & expensive resets
    // this.makeThisExistent();
    this.internalList.clear();
  }

  get length(): number {
    return this.internalList.length;
  }

  asArray(): JSONElement[] {
    return this.internalList.slice();
  }
}

export class TextWrapper {
  constructor(public text: string) {}
}

// TODO: only call makeThisExistent once per meta-op.
// E.g. currently a reset on a big object will call it once per
// sub-reset, each causing a call up the whole chain.

export class JSONElement extends CObject {
  private variable: LWWCVariable<JSONValue>;
  private object: JSONObject;
  private array: JSONArray;
  private text: CText;
  private makeThisExistent: () => void;

  static NewJSON(initToken: InitToken): JSONElement {
    return new JSONElement(initToken, () => {});
  }

  /**
   * Internal use only
   */
  constructor(initToken: InitToken, makeThisExistent: () => void) {
    super(initToken);
    this.makeThisExistent = makeThisExistent;
    this.variable = this.addChild(
      "variable",
      (childInitToken) =>
        new LWWCVariable<JSONValue>(
          childInitToken,
          null,
          JSONValueSerializer.getInstance(this.runtime)
        )
    );
    this.object = this.addChild(
      "object",
      Pre(JSONObject)(() => this.setIsObject())
    );
    this.array = this.addChild(
      "array",
      Pre(JSONArray)(() => this.setIsArray())
    );
    this.text = this.addChild("text", Pre(CText)());
  }

  get value(): JSONValue {
    return this.variable.value;
  }

  get type():
    | "number"
    | "string"
    | "boolean"
    | "null"
    | "JSONObject"
    | "JSONArray"
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
        if (value === this.object) return "JSONObject";
        if (value === this.array) return "JSONArray";
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
    this.variable.value = value;
  }

  setIsObject() {
    this.makeThisExistent();
    this.array.reset();
    this.variable.value = this.object;
  }

  setIsArray() {
    this.makeThisExistent();
    this.object.reset();
    this.variable.value = this.array;
  }

  setIsText() {
    this.makeThisExistent();
    this.object.reset();
    this.variable.value = this.text;
  }

  reset() {
    // TODO: use generic CObject reset
    this.object.reset();
    this.array.reset();
    this.text.clear();
    this.variable.clear();
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
        return new TextWrapper(this.text.join(""));
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
          if (value.text.length > 0) this.text.insert(0, ...value.text);
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
