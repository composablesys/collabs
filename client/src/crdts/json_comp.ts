import { LwwRegister } from "./basic_crdts";
import { CompositeCrdt } from "./crdt_core";
import { TreedocList } from "./list";
import { Resettable } from "./mixins";
import { MapCrdt } from "./standard";
import { DefaultElementSerializer } from "./utils";

// TODO: disable GC by default, since users might store objects elsewhere.

export type JsonValue = string | number | null | JsonObject | JsonArray;

export class JsonObject extends CompositeCrdt implements Resettable {
  private readonly internalMap: MapCrdt<string, JsonElement>;
  /**
   * Internal use only
   */
  constructor(private readonly makeThisExistent: () => void) {
    super();
    // Note that adding the key explicitly is redundant, since a value
    // only ever calls makeThisExistent as part of an operation, and
    // that operation suffices to revive its map key, due to MapCrdt's
    // semantics.
    this.internalMap = this.addChild(
      "nestedMap",
      new MapCrdt(
        () => new JsonElement(makeThisExistent),
        DefaultElementSerializer.getInstance(),
        true
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

  getForce(key: string): JsonElement {
    return this.internalMap.getForce(key);
  }

  has(key: string): boolean {
    return this.internalMap.has(key);
  }

  delete(key: string) {
    // TODO: return whether actually deleted?  Semantically difficult.
    this.makeThisExistent();
    this.internalMap.delete(key);
  }

  reset() {
    this.makeThisExistent();
    this.internalMap.reset();
  }

  keys() {
    return this.internalMap.keys();
  }

  values() {
    return this.internalMap.values();
  }

  asMap(): Map<string, JsonElement> {
    return this.internalMap.value;
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
      new TreedocList(() => new JsonElement(makeThisExistent), true)
    );
  }

  insert(index: number): JsonElement {
    this.makeThisExistent();
    return this.internalList.insertAt(index)[1];
  }

  delete(index: number): void {
    this.makeThisExistent();
    this.internalList.deleteAt(index);
  }

  get(index: number): JsonElement {
    return this.internalList.getAt(index);
  }

  reset(): void {
    this.makeThisExistent();
    this.internalList.reset();
  }

  get length(): number {
    return this.internalList.length;
  }

  asArray(): JsonElement[] {
    return this.internalList.asArray();
  }
}

// TODO: only call makeThisExistent once per meta-op.
// E.g. currently a reset on a big object will call it once per
// sub-reset, each causing a call up the whole chain.

export class JsonElement extends CompositeCrdt implements Resettable {
  private register: LwwRegister<JsonValue>;
  private object: JsonObject;
  private array: JsonArray;
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
    this.object = new JsonObject(() => this.setIsObject());
    this.array = new JsonArray(() => this.setIsArray());
  }

  get value(): JsonValue {
    return this.register.value;
  }

  get type(): "number" | "string" | "null" | "JsonObject" | "JsonArray" {
    let value = this.value;
    switch (typeof value) {
      case "number":
        return "number";
      case "string":
        return "string";
      case "object":
        if (value === null) return "null";
        if (value instanceof JsonObject) return "JsonObject";
        if (value instanceof JsonArray) return "JsonArray";
    }
    throw new Error(
      "this.value did not match any expected type: " + this.value
    );
  }

  // TODO: way to examine conflicts

  setPrimitive(value: number | string | null) {
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

  reset() {
    // TODO: use generic CompositeCrdt reset
    this.object.reset();
    this.array.reset();
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
    switch (value.type) {
      case "number":
      case "string":
        this.setPrimitive(value);
        return;
      case "object":
        if (value === null) this.setPrimitive(null);
        else if (Array.isArray(value)) {
          this.setIsArray();
          for (let i = 0; i < value.length; i++) {
            this.array.insert(i).setOrdinaryJS(value[i]);
          }
        } else {
          // Ordinary object; use map
          this.setIsObject();
          for (let entry of Object.entries(value)) {
            this.object.getForce(entry[0]).setOrdinaryJS(entry[1]);
          }
        }
    }
    throw new Error("Unsupported value: " + value);
  }
}
