import {
  CObject,
  Collab,
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  DefaultSerializer,
  Serializer,
  LazyMutCMap,
  OptionalLWWCVariable,
  Pre,
  PrimitiveCList,
  TextSerializer,
  AddWinsCSet,
} from "@collabs/collabs";

export interface JSONEvent extends CollabEvent {
  readonly key: string;
  readonly value: Collab;
}

export interface JSONEventsRecord extends CollabEventsRecord {
  Add: JSONEvent;
  Delete: JSONEvent;
}

enum InternalType {
  Nested,
  List,
}

export class JSONCollab extends CObject<JSONEventsRecord> {
  private readonly internalMap: LazyMutCMap<
    string,
    OptionalLWWCVariable<number | string | boolean | InternalType>
  >;
  private readonly LazyMutCMap: LazyMutCMap<string, PrimitiveCList<string>>;
  private readonly keySet: AddWinsCSet<string>;
  private readonly internalNestedKeys: Map<string, Set<string>>;

  constructor(initToken: InitToken) {
    super(initToken);

    let keySerializer: Serializer<string> = DefaultSerializer.getInstance();
    this.internalMap = this.addChild(
      "internalMap",
      Pre(LazyMutCMap)(
        Pre(OptionalLWWCVariable)<string | number | boolean>(keySerializer)
      )
    );

    this.LazyMutCMap = this.addChild(
      "LazyMutCMap",
      (childInitToken) =>
        new LazyMutCMap(
          childInitToken,
          (valueInitToken) =>
            new PrimitiveCList(valueInitToken, TextSerializer.instance),
          keySerializer
        )
    );
    this.keySet = this.addChild("keySet", Pre(AddWinsCSet)(keySerializer));

    this.internalNestedKeys = new Map();

    // Update LazyMutCMap if any keys are added or deleted
    this.keySet.on("Add", (event) => {
      let keys = event.value.split(":");
      keys?.pop();
      let key = keys.pop() || "";
      let cursor = keys.join(":");
      this.addKey(cursor + ":", key);
    });

    this.keySet.on("Delete", (event) => {
      let keys = event.value.split(":");
      keys?.pop();
      let key = keys.pop() || "";
      let cursor = keys.join(":");
      this.deleteKey(cursor + ":", key);
    });
  }

  addKey(cursor: string, key: string) {
    let keys = this.internalNestedKeys.get(cursor);
    if (keys !== undefined) {
      keys.add(key);
    } else {
      this.internalNestedKeys.set(cursor, new Set([key]));
    }
  }

  deleteKey(cursor: string, key: string) {
    this.internalNestedKeys.delete(cursor + ":" + key);
    this.internalNestedKeys.get(cursor)?.delete(key);
  }

  set(key: string, val: number | string | boolean | InternalType) {
    // Reset an existing map or list
    this.deleteSubKeys(key);
    if (val === InternalType.List) {
      this.LazyMutCMap.delete(key);
    }

    if (!this.keySet.has(key)) this.keySet.add(key);
    let mvr = this.internalMap.get(key);
    mvr.set(val);
  }

  get(
    key: string
  ): (number | string | boolean | PrimitiveCList<string> | JSONCursor)[] {
    let vals: any[] = [];
    if (this.keySet.has(key)) {
      let mvr = this.internalMap.get(key);
      for (let val of mvr.conflicts()) {
        switch (val) {
          case InternalType.Nested:
            vals.push(new JSONCursor(this, key));
            break;

          case InternalType.List:
            vals.push(this.LazyMutCMap.get(key));
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
    let nestedKeys = this.internalNestedKeys.get(key);
    if (nestedKeys !== undefined) {
      for (let subkey of [...nestedKeys]) {
        this.delete(key + subkey + ":");
      }
    }
  }

  delete(key: string) {
    this.keySet.delete(key);
    this.internalMap.getIfPresent(key)?.clear();
    this.deleteSubKeys(key);
  }

  keys(cursor: string): string[] {
    let keys = this.internalNestedKeys.get(cursor);
    if (keys !== undefined) {
      return [...keys];
    } else {
      return [];
    }
  }

  values(
    cursor: string
  ): (number | string | boolean | PrimitiveCList<string> | JSONCursor)[] {
    let vals: (
      | number
      | string
      | boolean
      | PrimitiveCList<string>
      | JSONCursor
    )[] = [];

    for (let key of this.keys(cursor)) {
      vals.push(...this.get(cursor + key + ":"));
    }

    return vals;
  }

  hasKey(key: string): boolean {
    return this.keySet.has(key);
  }

  setIsMap(key: string) {
    this.set(key, InternalType.Nested);
  }

  setIsList(key: string) {
    this.set(key, InternalType.List);
  }

  addExtChild(name: string, child: Pre<Collab>) {
    this.addChild(name, child);
  }
}

export class JSONCursor {
  private internal: JSONCollab;
  private cursor: string;

  static new(): Pre<JSONCursor> {
    return (initToken: InitToken) => new JSONCursor(new JSONCollab(initToken));
  }

  constructor(internal: JSONCollab, cursor?: string) {
    this.internal = internal;

    if (!cursor) cursor = ":";
    this.cursor = cursor;
  }

  get(
    key: string
  ): (number | string | boolean | PrimitiveCList<string> | JSONCursor)[] {
    return this.internal.get(this.cursor + key + ":");
  }

  set(key: string, val: number | string | boolean) {
    this.internal.addKey(this.cursor, key);
    this.internal.set(this.cursor + key + ":", val);
  }

  setIsMap(key: string) {
    this.internal.addKey(this.cursor, key);
    this.internal.setIsMap(this.cursor + key + ":");
  }

  setIsList(key: string) {
    this.internal.addKey(this.cursor, key);
    this.internal.setIsList(this.cursor + key + ":");
  }

  delete(key: string) {
    this.internal.delete(this.cursor + key + ":");
  }

  keys(): string[] {
    return this.internal.keys(this.cursor);
  }

  values(): (
    | number
    | string
    | boolean
    | PrimitiveCList<string>
    | JSONCursor
  )[] {
    return this.internal.values(this.cursor);
  }
}
