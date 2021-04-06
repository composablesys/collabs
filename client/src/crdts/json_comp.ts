import { LwwRegister } from "./basic_crdts";
import { CompositeCrdt } from "./crdt_core";
import { TreedocList, List } from "./list";
import { Resettable } from "./mixins";
import { MapCrdt } from "./standard";

export type JsonValue =
  | string
  | number
  | null
  | MapCrdt<string, JsonCrdt>
  | TreedocList<JsonCrdt>;

export class JsonCrdt extends CompositeCrdt implements Resettable {
  private register: LwwRegister<JsonValue>;
  private nestedMap: MapCrdt<string, JsonCrdt>;
  private nestedList: TreedocList<JsonCrdt>;
  private makeThisExistent?: () => void;

  static New(): JsonCrdt {
    return new JsonCrdt();
  }

  private constructor(makeThisExistent?: () => void) {
    super();
    this.makeThisExistent = makeThisExistent;
    this.register = this.addChild("register", new LwwRegister<JsonValue>(null));
    this.nestedMap = this.addChild(
      "nestedMap",
      new MapCrdt(() => new JsonCrdt(this.makeMapExistent.bind(this)))
    );
    this.nestedList = this.addChild(
      "nestedList",
      new TreedocList(() => new JsonCrdt(this.makeListExistent.bind(this)))
    );
  }

  // TODO: eventually we can do these with events
  // instead, once we have runLocally.
  // But that seems better suited in an optimized version.
  // Note that that makes reset() sensitive to order.
  private makeMapExistent() {
    if (this.makeThisExistent) this.makeThisExistent();
    this.register.value = "map";
    // Note that we don't have to explicitly add the key
    // of the map value that is being made existent,
    // since this method is always called as part of
    // an operation by the calling value, which will
    // resurrect the value's key due to MapCrdt's
    // semantics.
  }

  private makeListExistent() {
    if (this.makeThisExistent) this.makeThisExistent();
    this.register.value = "list";
  }

  get value(): JsonValue {
    return this.register.value;
  }

  get type(): "number" | "string" | "null" | "MapCrdt" | "List" {
    let value = this.value;
    switch (typeof value) {
      case "number":
        return "number";
      case "string":
        return "string";
      case "object":
        if (value === null) return "null";
        if (value instanceof MapCrdt) return "MapCrdt";
        if (value instanceof List) return "List";
    }
    throw new Error(
      "this.value did not match any expected type: " + this.value
    );
  }

  // TODO: way to examine conflicts

  setPrimitive(value: number | string | null) {
    if (this.makeThisExistent) this.makeThisExistent();
    this.nestedMap.reset();
    this.nestedList.reset();
    this.register.value = value;
  }

  setIsMap() {
    if (this.makeThisExistent) this.makeThisExistent();
    this.register.value = this.nestedMap;
  }

  setIsList() {
    if (this.makeThisExistent) this.makeThisExistent();
    this.register.value = this.nestedList;
  }

  reset() {
    // TODO: use generic CompositeCrdt reset
    this.nestedMap.reset();
    this.nestedList.reset();
    this.register.reset();
  }

  asOrdinaryJS(): any {
    switch (this.type) {
      case "MapCrdt":
        let map = this.value as MapCrdt<string, JsonCrdt>;
        let ansMap: { [key: string]: any } = {};
        for (let key of map.keys()) {
          ansMap[key] = map.get(key)!.asOrdinaryJS();
        }
        return ansMap;
      case "List":
        let list = this.value as TreedocList<JsonCrdt>;
        let ansList: any[] = [];
        for (let i = 0; i < list.length; i++) {
          ansList.push(list.getAt(i).asOrdinaryJS());
        }
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
          this.setIsList();
          for (let i = 0; i < value.length; i++) {
            this.nestedList.insertAt(i)[1].setOrdinaryJS(value[i]);
          }
        } else {
          // Ordinary object; use map
          this.setIsMap();
          for (let entry of Object.entries(value)) {
            this.nestedMap.getForce(entry[0]).setOrdinaryJS(entry[1]);
          }
        }
    }
    throw new Error("Unsupported value: " + value);
  }
}
