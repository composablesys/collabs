import { Crdt, CompositeCrdt, CrdtEvent, CrdtEventsRecord } from "./crdt_core";
import { MultiValueRegister } from "./basic_crdts";
import { MapCrdt } from "./standard";
import { DefaultElementSerializer, ElementSerializer } from "./utils";

export interface JsonEvent extends CrdtEvent {
  readonly key: string;
  readonly value: Crdt;
}

export interface JsonEventsRecord extends CrdtEventsRecord {
  Add: JsonEvent;
  Delete: JsonEvent;
}

export class JsonCrdt extends CompositeCrdt<JsonEventsRecord> {
  private readonly internalMap: MapCrdt<
    string,
    MultiValueRegister<number | string | {}>
  >;

  constructor() {
    super();

    let keySerializer: ElementSerializer<string> = DefaultElementSerializer.getInstance();
    this.internalMap = this.addChild(
      "internalMap",
      new MapCrdt(() => new MultiValueRegister(), keySerializer, true)
    );
  }

  set(key: string, val: number | string | {}) {
    this.deleteSubKeys(key);
    let mvr = this.internalMap.getForce(key);
    mvr.value = val;
  }

  get(key: string): (number | string | JsonCursor)[] {
    let vals: any[] = [];
    let mvr = this.internalMap.get(key);
    if (mvr) {
      for (let val of mvr.valueSet) {
        switch (typeof val) {
          case "object":
            vals.push(new JsonCursor(this, key));
            break;

          default:
            vals.push(val);
            break;
        }
      }
    }
    return vals;
  }

  deleteSubKeys(key: string) {
    for (let anyKey of this.internalMap.keys()) {
      if (anyKey.substring(0, key.length) == key && anyKey != key) {
        this.internalMap.delete(anyKey);
      }
    }
  }

  delete(key: string) {
    this.internalMap.delete(key);
    this.deleteSubKeys(key);
  }

  keys(cursor: string): string[] {
    let keys = [];

    for (let anyKey of this.internalMap.keys()) {
      if (anyKey.substring(0, cursor.length) == cursor && anyKey != cursor) {
        keys.push(anyKey.substring(cursor.length).split(":")[0]);
      }
    }

    return keys;
  }

  values(cursor: string): (number | string | JsonCursor)[] {
    let vals: (number | string | JsonCursor)[] = [];

    for (let key of this.keys(cursor)) {
      vals.push(...this.get(cursor + key + ":"));
    }

    return vals;
  }

  hasKey(key: string): boolean {
    return this.internalMap.has(key);
  }

  setIsMap(key: string) {
    this.set(key, {});
    this.deleteSubKeys(key);
  }
}

export class JsonCursor {
  private internal: JsonCrdt;
  private cursor: string;

  constructor(internal?: JsonCrdt, cursor?: string) {
    if (!internal) internal = new JsonCrdt();
    this.internal = internal;

    if (!cursor) cursor = "";
    this.cursor = cursor;
  }

  get(key: string): (number | string | JsonCursor)[] {
    return this.internal.get(this.cursor + key + ":");
  }

  set(key: string, val: number | string) {
    this.internal.set(this.cursor + key + ":", val);
  }

  setIsMap(key: string) {
    this.internal.setIsMap(this.cursor + key + ":");
  }

  delete(key: string) {
    this.internal.delete(this.cursor + key + ":");
  }

  keys(): string[] {
    return this.internal.keys(this.cursor);
  }

  values(): (number | string | JsonCursor)[] {
    return this.internal.values(this.cursor);
  }
}
