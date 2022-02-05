import * as collabs from "@collabs/collabs";
import { YataSave } from "../generated/proto_compiled";

type YataOpArgs<T> = [
  string,
  string,
  string,
  T,
  Record<string, any>,
  Record<string, any>?
];

export class YataOp<T> extends collabs.CObject {
  readonly creatorId: string;
  // TODO: readonly (broken only by initial values)
  public originId: string;
  // TODO: leftId, rightId need saving
  public leftId: string;
  public rightId: string;
  readonly _deleted: collabs.LwwCRegister<boolean>;
  readonly content: T;
  readonly pos: number;
  readonly attributes: collabs.LwwCMap<string, any>;
  // Doesn't need saving because it is only used on the
  // deleting replica, and any loading replica will
  // necessarily not be the deleter.
  public locallyDeleted: boolean;
  public readonly originAttributesAtInput: Record<string, any>;
  public readonly attributesArg: [string, any][];
  static readonly attributesMapCollabName = "attributes";
  static readonly deletedFlagCollabName = "deleted";

  sameFormatAsPrev(attrName: string) {
    return (
      this.attributes.get(attrName) === this.originAttributesAtInput[attrName]
    );
  }

  delete(): void {
    this.locallyDeleted = true;
    this._deleted.value = true;
  }

  get deleted(): boolean {
    return this._deleted.value;
  }

  constructor(
    initToken: collabs.InitToken,
    creatorId: string,
    originId: string,
    leftId: string,
    rightId: string,
    content: T,
    pos: number,
    originAttributesAtInput: Record<string, any>,
    attributes: [string, any][] = []
  ) {
    super(initToken);
    this.creatorId = creatorId;
    this.originId = originId;
    this.leftId = leftId;
    this.rightId = rightId;
    this._deleted = this.addChild(
      YataOp.deletedFlagCollabName,
      collabs.Pre(collabs.LwwCRegister)<boolean>(false)
    );
    this.locallyDeleted = false;
    this.content = content;
    this.pos = pos;
    this.attributes = this.addChild(
      YataOp.attributesMapCollabName,
      collabs.Pre(collabs.LwwCMap)(undefined, undefined)
    );
    this.attributesArg = attributes;
    this.originAttributesAtInput = originAttributesAtInput;
  }

  initAttributes(
    runLocallyLayer: collabs.RunLocallyLayer,
    meta: collabs.MessageMeta
  ) {
    runLocallyLayer.runLocally(meta, () => {
      for (const [key, value] of this.attributesArg) {
        this.attributes.set(key, value);
      }
    });
  }
}

interface YataEvent extends collabs.CollabEvent {
  uid: string;
  idx: number;
}

export interface YataInsertEvent<T> extends YataEvent {
  newOp: YataOp<T>;
}

export interface YataDeleteEvent<T> extends YataEvent {}

export interface YataFormatExistingEvent<T> extends YataEvent {
  key: string;
  value: any;
}

interface YataEventsRecord<T> extends collabs.CollabEventsRecord {
  Insert: YataInsertEvent<T>;
  Delete: YataDeleteEvent<T>;
  FormatExisting: YataFormatExistingEvent<T>;
}

type m1Args = [ids: string[], attributes: Record<string, any>];
type m2Args<T> = [
  uniqueNumber: number,
  replicaID: string,
  leftIntent: string,
  rightIntent: string,
  content: T,
  originAttributeEntries: Record<string, any>,
  attributeEntries?: Record<string, any>
];

export class YataLinear<T> extends collabs.SemidirectProductRev<
  YataEventsRecord<T>,
  collabs.Collab,
  m1Args,
  m2Args<T>
> {
  private start: string = "";
  private end: string = "";
  readonly defaultContent: T;
  public readonly opMap: collabs.DeletingMutCSet<YataOp<T>, YataOpArgs<T>>;
  protected lastEventType?: string;
  protected lastEventSender?: string;
  protected lastEventTime?: number;

  deletedMessageEventHandler =
    (yata: YataLinear<T>, uid: string) =>
    ({ meta }: collabs.CollabEvent, caller: collabs.LwwCRegister<boolean>) => {
      if (caller.value) {
        if (!yata.op(uid).locallyDeleted) {
          yata.emit("Delete", {
            uid,
            idx: yata.getIdxOfId(uid) + 1,
            meta,
          });
        }
      }
    };

  attributesSetEventHandler =
    (yata: YataLinear<T>, uid: string) =>
    ({ key, meta }: collabs.CMapSetEvent<string, any>) => {
      if (!yata.op(uid).deleted) {
        yata.emit("FormatExisting", {
          uid,
          idx: yata.getIdxOfId(uid),
          key,
          value: yata.op(uid).attributes.get(key),
          meta,
        });
      }
    };

  opMapAddEventHandler =
    (yata: YataLinear<T>) =>
    ({ value: newOp, meta }: collabs.CSetEvent<YataOp<T>>) => {
      // Link YataLinearOp list
      const uid = yata.idOf(newOp);
      yata.op(newOp.rightId).leftId = uid;
      yata.op(newOp.leftId).rightId = uid;
      // Copy initial attributes to the attributes map
      newOp.initAttributes(this.runLocallyLayer, meta);
      // Register event handler for YataOp.deleted "change" event
      newOp._deleted.on("Set", yata.deletedMessageEventHandler(yata, uid));
      // Register event handler for YataOp.attributes "set" event
      newOp.attributes.on("Set", yata.attributesSetEventHandler(yata, uid));
      const insertEvent = {
        uid,
        idx: yata.getIdxOfId(uid),
        newOp,
        meta,
      };
      yata.emit("Insert", insertEvent);
      yata.trackM2Event("Insert", insertEvent);
    };

  private readonly idSerializer: collabs.Serializer<YataOp<T>>;

  constructor(
    initToken: collabs.InitToken,
    defaultContent: T,
    initialContents: T[]
  ) {
    super(initToken);
    this.defaultContent = defaultContent;

    // 0
    const startArgs: YataOpArgs<T> = ["", "", "", defaultContent, {}];
    // Number.MAX_VALUE
    const endArgs: YataOpArgs<T> = ["", "", "", defaultContent, {}];
    // ((idx + 1) * Number.MAX_VALUE) / (initialContents.length + 1)
    const initialContentsArgs: YataOpArgs<T>[] = initialContents.map((c) => [
      "",
      "",
      "",
      c,
      {},
    ]);

    let inConstructor = true;
    let constructorIndex = 0;
    let startOp!: YataOp<T>;
    let endOp!: YataOp<T>;
    let initialContentOps: YataOp<T>[] = [];
    const outerThis = this;
    this.opMap = this.addSemidirectChild(
      "nodeMap",
      collabs.Pre(collabs.DeletingMutCSet)(
        (
          valueInitToken,
          replicaID,
          leftIntent,
          rightIntent,
          content,
          originAttributesMapAtInput,
          attributesMap = {}
        ) => {
          if (inConstructor) {
            let op: YataOp<T>;
            if (constructorIndex === 0) {
              // startOp
              op = startOp = new YataOp(
                valueInitToken,
                "",
                "",
                "",
                "",
                defaultContent,
                0,
                []
              );
            } else if (constructorIndex === 1) {
              // endOp
              op = endOp = new YataOp(
                valueInitToken,
                "",
                "",
                "",
                "",
                defaultContent,
                Number.MAX_VALUE,
                []
              );
            } else {
              // initialContent
              op = new YataOp(
                valueInitToken,
                "",
                "",
                "",
                "",
                content,
                ((constructorIndex - 1) * Number.MAX_VALUE) /
                  (initialContents.length + 1),
                []
              );
              initialContentOps.push(op);
            }
            constructorIndex++;
            return op;
          } else {
            const originId = leftIntent;
            let leftId = leftIntent;
            while (this.op(leftId).rightId !== rightIntent) {
              const o_id = this.op(leftId).rightId;
              const o = this.op(this.op(leftId).rightId);
              const i_origin = this.op(originId);
              const o_origin = this.op(o.originId);
              if (
                (o.pos < i_origin.pos || i_origin.pos <= o_origin.pos) &&
                (o.originId !== originId || o.creatorId < replicaID)
              ) {
                leftId = o_id;
              } else {
                if (i_origin.pos >= o_origin.pos) {
                  break;
                }
              }
            }
            const rightId = this.op(leftId).rightId;
            // TODO: Replace this with a binary tree (rbtree)
            const pos = (this.op(leftId).pos + this.op(rightId).pos) / 2;
            const originAttributesEntriesAtCreate = [
              ...this.op(originId).attributes.entries(),
            ];
            for (const [key, value] of originAttributesEntriesAtCreate) {
              if (
                attributesMap[key] !== value &&
                attributesMap[key] === originAttributesMapAtInput[key]
              ) {
                attributesMap[key] = value;
              }
            }
            return new YataOp<T>(
              valueInitToken,
              replicaID,
              originId,
              leftId,
              rightId,
              content,
              pos,
              originAttributesMapAtInput,
              Object.entries(attributesMap)
            );
          }
        },
        [startArgs, endArgs, ...initialContentsArgs]
      )
    );
    inConstructor = false;
    this.opMap.on("Add", this.opMapAddEventHandler(this));
    this.idSerializer = new collabs.CollabSerializer(this.opMap);

    // Configure the initial ops (like in valueConstructor).
    this.START = this.idOf(startOp);
    this.END = this.idOf(endOp);
    const idOfFn = (c: YataOp<T>) => this.idOf(c);
    const uids = [this.START]
      .concat(initialContentOps.map(idOfFn))
      .concat([this.END]);
    initialContentOps.forEach((op, idx) => {
      op.originId = uids[idx];
      op.leftId = uids[idx];
      op.rightId = uids[idx + 2];
    });
    startOp.rightId = uids[1];
    endOp.originId = uids[uids.length - 2];
    endOp.leftId = uids[uids.length - 2];

    const addInitialContentOpEventHandlers =
      (yata: YataLinear<T>) => (op: YataOp<T>, uid: string) => {
        // Register event handler for YataOp.deleted "change" event
        op._deleted.on("Any", yata.deletedMessageEventHandler(yata, uid));
        // Register event handler for YataOp.attributes "set" event
        op.attributes.on("Set", yata.attributesSetEventHandler(yata, uid));
      };
    initialContentOps.forEach((op) =>
      addInitialContentOpEventHandlers(this)(op, idOfFn(op))
    );
  }

  // OPT: ids are actually just names converted to Uint8Arrays,
  // so this redundantly converts string -> Uint8Array -> string.
  private idOf(op: YataOp<T>): string {
    return collabs.bytesAsString(this.idSerializer.serialize(op));
  }

  private getById(id: string): YataOp<T> {
    return this.idSerializer.deserialize(collabs.stringAsBytes(id));
  }

  private delete(id: string): void {
    this.op(id).delete();
  }

  m1(ids: string[], attributes: Record<string, any>) {
    // Formatting operation
    for (const id of ids) {
      for (const attr in attributes) {
        this.op(id).attributes.set(attr, attributes[attr]);
      }
    }
  }

  m2(...args: m2Args<T>): void {
    // Insertion operation
    this.opMap.pureAdd(...args);
  }

  protected action(
    m2TargetPath: string[],
    m2Timestamp: collabs.CRDTMeta | null,
    m2Message: collabs.m2Start<m2Args<T>>, // User-defined
    m2TrackedEvents: [string, any][],
    m1TargetPath: string[],
    m1Timestamp: collabs.CRDTMeta,
    m1Message: collabs.m1Start<m1Args> // User-defined
  ) {
    // Conflict resolution function
    let newM1 = m1Message;
    for (let [name, event] of m2TrackedEvents) {
      if (name === "Insert") {
        const insertion = (event as YataInsertEvent<string>).newOp;
        const insertionUid = (event as YataInsertEvent<string>).uid;
        if (m1Message.args[0].includes(insertion.originId)) {
          for (const [attrName, _] of Object.entries(m1Message.args[1])) {
            if (insertion.sameFormatAsPrev(attrName)) {
              newM1.args[0] = newM1.args[0].concat([insertionUid]);
            }
          }
        }
      }
    }
    return { m1TargetPath, m1Message: newM1 };
  }

  private insert(
    replicaID: string,
    leftIntent: string,
    rightIntent: string,
    content: T,
    originAttributeEntries: Record<string, any>,
    attributeEntries?: Record<string, any>
  ): void {
    this.m2(
      this.runtime.getReplicaUniqueNumber(),
      replicaID,
      leftIntent,
      rightIntent,
      content,
      originAttributeEntries,
      attributeEntries
    );
  }

  private changeAttributes(id: string, attributes: Record<string, any>): void {
    this.m1([id], attributes);
  }

  // TODO: Make iterative instead of recursive
  private toArrayNode(
    nodeId: string
  ): { insert: T; attributes: Record<string, any> }[] {
    const node = this.op(nodeId);
    if (node.pos === 0) return [];
    const arr = this.toArrayNode(node.leftId);
    if (!node.deleted) {
      const formats: Record<string, any> = {};
      const it = node.attributes.entries();
      let result = it.next();
      while (!result.done) {
        formats[result.value[0] as string] = result.value[1];
        result = it.next();
      }
      arr.push({
        insert: node.content,
        attributes: formats,
      });
    }
    return arr;
  }

  private toIdArrayNode(nodeId: string): string[] {
    const node = this.op(nodeId);
    if (node.pos === Number.MAX_VALUE) return [this.END];
    const array = this.toIdArrayNode(node.rightId);
    if (!node.deleted) {
      array.unshift(nodeId);
    }
    return array;
  }

  toIdArray(): string[] {
    const arr = this.toIdArrayNode(this.START);
    return arr;
  }

  op(id: string): YataOp<T> {
    const yataOp = this.getById(id);
    if (!yataOp) {
      throw new Error(`There is no Yata operation with id ${id}`);
    }
    return yataOp;
  }

  get START(): string {
    return this.start;
  }

  set START(s: string) {
    this.start = s;
  }

  get END(): string {
    return this.end;
  }

  set END(e: string) {
    this.end = e;
  }

  toArray(): { insert: T; attributes: Record<string, any> }[] {
    return this.toArrayNode(this.op(this.END).leftId);
  }

  getIdAtIdx(idx: number): string {
    return this.toIdArray()[idx + 1];
  }

  insertByIdx(
    replicaID: string,
    idx: number,
    content: T,
    attributeObj?: Record<string, any>
  ): void {
    let idLeftOfCursor = this.getIdAtIdx(idx - 1); // TODO: Optimize idx to id conversion with a binary tree (rbtree)
    console.log("idx:", idx);
    console.log("idLeftOfCursor:", idLeftOfCursor);
    this.insert(
      replicaID,
      idLeftOfCursor,
      this.op(idLeftOfCursor).rightId,
      content,
      Object.fromEntries([...this.op(idLeftOfCursor).attributes.entries()])!,
      attributeObj
    );
    // if (attributeObj) {
    //     this.changeAttributes(uid, attributeObj);
    // }
  }

  deleteByIdx(idx: number, len: number): void {
    const id1 = this.getIdAtIdx(idx);
    const id2 = this.getIdAtIdx(idx + len);
    let id = id1;
    while (id !== id2) {
      if (!this.op(id).deleted) {
        this.delete(id);
      }
      id = this.op(id).rightId;
    }
  }

  changeAttributeByIdx(
    idx: number,
    len: number,
    attributes: Record<string, any>
  ): void {
    const id1 = this.getIdAtIdx(idx);
    const id2 = this.getIdAtIdx(idx + len);
    let id = id1;
    while (id !== id2) {
      if (!this.op(id).deleted) {
        this.changeAttributes(id, attributes);
      }
      id = this.op(id).rightId;
    }
  }

  getIdxOfId(id: string): number {
    if (id === this.START) return -1;
    const prev = this.getIdxOfId(this.op(id).leftId);
    if (this.op(id).deleted) return prev;
    return 1 + prev;
  }

  toOpArray(): YataOp<T>[] {
    const getOpFn = (id: string) => this.op(id);
    return this.toIdArray().map(getOpFn);
  }

  protected saveSemidirectProductRev(): Uint8Array {
    // Note we also include deleted ids.
    const idArray: string[] = [];
    let op = this.START;
    while (true) {
      idArray.push(op);
      if (op === this.END) break;
      else op = this.getById(op)!.rightId;
    }
    const saveData = YataSave.create({
      idArray,
    });
    return YataSave.encode(saveData).finish();
  }

  protected loadSemidirectProductRev(saveData: collabs.Optional<Uint8Array>) {
    if (!saveData.isPresent) return;
    // Set leftId, rightId's based on saved order.
    const message = YataSave.decode(saveData.get());
    for (let i = 0; i < message.idArray.length - 1; i++) {
      const left = message.idArray[i];
      const right = message.idArray[i + 1];
      this.getById(left)!.rightId = right;
      this.getById(right)!.leftId = left;
    }
  }
}
