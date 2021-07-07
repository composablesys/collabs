import * as crdts from 'compoventuals-client';
import {
    CausalTimestamp,
    CrdtEvent,
    CrdtEventsRecord, MapKeyEvent,
    SetEvent, YjsCrdtSet, DefaultElementSerializer, arrayAsString, PrimitiveCrdt
} from "compoventuals-client";
import {
    YjsCrdtSetMessage
} from "compoventuals-client/generated/proto_compiled";
// import {DefaultElementSerializer} from "compoventuals-client/src";

export class YataOp<T> extends crdts.CompositeCrdt {
    readonly creatorId: string;
    public originId: string;
    public leftId: string;
    public rightId: string;
    readonly _deleted: crdts.LwwRegister<boolean>;
    readonly content: T;
    readonly pos: number;
    readonly attributes: crdts.LwwPlainMap<string, any>;
    public locallyDeleted: boolean;
    public leftAttributesAtInput: Record<string, any>;
    public attributesArg: [string, any][];
    static readonly attributesMapCrdtName = "attributes";
    static readonly deletedFlagCrdtName = "deleted";

    delete (): void {
        this.locallyDeleted = true;
        this._deleted.value = true;
    }

    get deleted (): boolean {
        return this._deleted.value;
    }

    constructor (
        creatorId: string,
        originId: string,
        leftId: string,
        rightId: string,
        content: T,
        pos: number,
        leftAttributesAtInput: Record<string, any>,
        attributes: [string, any][] = [],
    ) {
        super();
        this.creatorId = creatorId;
        this.originId = originId;
        this.leftId = leftId;
        this.rightId = rightId;
        this._deleted = this.addChild(YataOp.deletedFlagCrdtName, new crdts.LwwRegister(false));
        this.locallyDeleted = false;
        this.content = content;
        this.pos = pos;
        this.attributes = this.addChild(YataOp.attributesMapCrdtName,
            new crdts.LwwPlainMap(undefined, undefined));
        this.attributesArg = attributes;
        this.leftAttributesAtInput = leftAttributesAtInput;
    }

    init(name: string, parent: crdts.CrdtParent) {
        super.init(name, parent);
        this.runtime.localOnly();
        for (const [key, value] of this.attributesArg) {
            this.attributes.set(key, value);
        }
        this.runtime.notLocalOnly();
    }
}

interface YataEvent extends CrdtEvent {
    uid: string;
    idx: number;
    isLocal: boolean;
}

export interface YataInsertEvent<T> extends YataEvent {
    newOp: YataOp<T>;
}

export interface YataDeleteEvent<T> extends YataEvent {}

export interface YataFormatExistingEvent<T> extends YataEvent {
    key: string;
    value: any;
}

interface YataEventsRecord<T> extends CrdtEventsRecord {
    Insert: YataInsertEvent<T>;
    Delete: YataDeleteEvent<T>;
    FormatExisting: YataFormatExistingEvent<T>;
}

export class YataLinear<T> extends crdts.SemidirectProductRev<YataEventsRecord<T>> {
    private start: string = '';
    private end: string = '';
    readonly defaultContent: T;
    public opMap: crdts.YjsCrdtSet<YataOp<T>, [string, string, string, T, Record<string, any>, Record<string, any>?]>;
    private startOp: YataOp<T>;
    private endOp: YataOp<T>;
    readonly initialContentOps: YataOp<T>[];
    protected lastEventType?: string;
    protected lastEventSender?: string;
    protected lastEventTime?: number;

    deletedChangeEventHandler = (yata: YataLinear<T>, uid: string) => ({timestamp}:CrdtEvent) => {
        if (!yata.op(uid).locallyDeleted) {
            yata.emit("Delete", {
                uid,
                idx: yata.getIdxOfId(uid) + 1,
                isLocal: timestamp.getSender() === yata.runtime.replicaId,
                timestamp
            })
        }
    }

    attributesSetEventHandler = (yata: YataLinear<T>, uid: string) => ({key, timestamp}:MapKeyEvent<string>) => {
        if (!yata.op(uid).deleted) {
            yata.emit("FormatExisting", {
                uid,
                idx: yata.getIdxOfId(uid),
                isLocal: timestamp.getSender() === yata.runtime.replicaId,
                key,
                value: yata.op(uid).attributes.get(key),
                timestamp
            })
        }
    }

    opMapAddEventHandler = (yata: YataLinear<T>) => ({value: newOp, timestamp}:SetEvent<YataOp<T>>) => {
        // Link YataLinearOp list
        const uid = yata.opMap.uidOf(newOp);
        yata.op(newOp.rightId).leftId = uid;
        yata.op(newOp.leftId).rightId = uid;
        // Register event handler for YataOp.deleted "change" event
        newOp._deleted.on("Change", yata.deletedChangeEventHandler(yata, uid));
        // Register event handler for YataOp.attributes "set" event
        newOp.attributes.on("Set", yata.attributesSetEventHandler(yata, uid));
        const isLocal = timestamp.getSender() === yata.runtime.replicaId;
        const insertEvent = {
            uid,
            idx: yata.getIdxOfId(uid),
            newOp,
            timestamp,
            isLocal
        };
        yata.emit("Insert", insertEvent)
        yata.trackM2Event(timestamp, "Insert", insertEvent);
    };

    constructor (
        defaultContent: T,
        initialContents: T[],
    ) {
        super();
        this.defaultContent = defaultContent;
        this.startOp = new YataOp('', '', '', '', defaultContent, 0, []);
        this.endOp = new YataOp('', '', '', '', defaultContent, Number.MAX_VALUE, []);
        this.initialContentOps = initialContents.map((c, idx) =>
            new YataOp('', '', '', '', c, (idx + 1) * Number.MAX_VALUE / (initialContents.length + 1), []));
        this.opMap = this.addChild(
            "nodeMap",
            new crdts.YjsCrdtSet((
                replicaId: string,
                leftIntent: string,
                rightIntent: string,
                content: T,
                leftAttributesMapAtInput: Record<string, any>,
                attributesMap: Record<string, any> = {}
            ) => {
                const originId = leftIntent;
                let leftId = leftIntent;
                while (this.op(leftId).rightId !== rightIntent) {
                    const o_id = this.op(leftId).rightId;
                    const o = this.op(this.op(leftId).rightId);
                    const i_origin = this.op(originId);
                    const o_origin = this.op(o.originId);
                    if (
                        (o.pos < i_origin.pos
                            || i_origin.pos <= o_origin.pos)
                        &&
                        (o.originId !== originId
                            || o.creatorId < replicaId)
                    ) {
                        leftId = o_id;
                    } else {
                        if (i_origin.pos >= o_origin.pos) {
                            break;
                        }
                    }
                }
                const rightId = this.op(leftId).rightId;
                const pos = (this.op(leftId).pos + this.op(rightId).pos) / 2;
                const leftAttributesEntriesAtCreate = [...this.op(leftId).attributes.entries()];
                for (const [key, value] of leftAttributesEntriesAtCreate) {
                    if (attributesMap[key] !== value && attributesMap[key] === leftAttributesMapAtInput[key]) {
                        attributesMap[key] = value;
                    }
                }
                return new YataOp<T>(replicaId, originId, leftId, rightId, content, pos, leftAttributesMapAtInput, Object.entries(attributesMap));
            }, [
                this.startOp,
                this.endOp,
                ...this.initialContentOps
            ]));
        this.opMap.on("Add", this.opMapAddEventHandler(this));
        this.setupHistory(true);
    }

    init(name: string, parent: crdts.CrdtParent) {
        super.init(name, parent);
        this.START = this.opMap.uidOf(this.startOp);
        this.END = this.opMap.uidOf(this.endOp);
        const uidOfFn = (c:YataOp<T>) => this.opMap.uidOf(c);
        const uids = [this.START].concat(this.initialContentOps.map(uidOfFn)).concat([this.END]);
        this.initialContentOps
            .forEach((op, idx) => {
            op.originId = uids[idx];
            op.leftId = uids[idx];
            op.rightId = uids[idx + 2];
        })
        this.opMap.getByUid(this.START)!.rightId = uids[1];
        this.opMap.getByUid(this.END)!.originId = uids[uids.length - 2];
        this.opMap.getByUid(this.END)!.leftId = uids[uids.length - 2];

        const addInitialContentOpEventHandlers = (yata: YataLinear<T>) => (op: YataOp<T>, uid: string) => {
            // Register event handler for YataOp.deleted "change" event
            op._deleted.on("Change", yata.deletedChangeEventHandler(yata, uid));
            // Register event handler for YataOp.attributes "set" event
            op.attributes.on("Set", yata.attributesSetEventHandler(yata, uid));
        }
        this.initialContentOps.forEach(op => addInitialContentOpEventHandlers(this)(op, uidOfFn(op)));
    }

    protected m1Criteria(targetPath: string[], timestamp: CausalTimestamp, message: Uint8Array): boolean {
        if (targetPath[targetPath.length - 3] === YataOp.attributesMapCrdtName) {
            return true;
        }
        return false;
    }

    protected m2Criteria(targetPath: string[], timestamp: CausalTimestamp, message: Uint8Array): boolean {
        // return targetPath[targetPath.length - 3] !== YataOp.attributesMapCrdtName
        //   && targetPath[targetPath.length - 3] !== YataOp.deletedFlagCrdtName;

        if (targetPath[targetPath.length - 3] !== YataOp.attributesMapCrdtName
          && targetPath[targetPath.length - 3] !== YataOp.deletedFlagCrdtName) {
            return true;
        }
        return false;
    }

    protected action(m2TargetPath: string[], m2Timestamp: CausalTimestamp, m2Message: Uint8Array, m2TrackedEvents: [string, any][], m1TargetPath: string[], m1Timestamp: CausalTimestamp, m1Message: Uint8Array): { m1TargetPath: string[]; m1Message: Uint8Array } | null {
        // m1: attribute change
        // m2: insertion
        // 1. Check if insertion is adjacent to attribute change
        // 2. If it is, then this.receive an attribute change message to the inserted character
        const uidOfFormattedOp = m1TargetPath[m1TargetPath.length - 1] // This is the uid of the op.
        let m2Insertion: YataInsertEvent<string>;
        for (let event of m2TrackedEvents) {
            if (event[0] === "Insert") {
                m2Insertion = event[1] as YataInsertEvent<string>;
            }
        }
        const uidOfInsertion = m2Insertion!.uid;
        // Assumptions:
        //  1. the formatted operation had been previously inserted because it just has to be.
        //  2. the m2's found here had effected the local crdt state.
        if (this.op(uidOfFormattedOp)!.rightId === uidOfInsertion) {
            const m1TargetPathReplay = m1TargetPath.slice().concat(["nodeMap"]);
            const attrName = m1TargetPathReplay[1].substring(2);
            // Check if the value of this attribute in this insertion is the same as the one to its left at write time.
            if (this.op(uidOfInsertion).attributes.get(attrName) === this.op(uidOfInsertion).leftAttributesAtInput[attrName]) {
                m1TargetPathReplay[m1TargetPathReplay.length - 2] = uidOfInsertion;
                this.receive(m1TargetPathReplay, m1Timestamp, m1Message);
            }
        }
        return { m1TargetPath, m1Message};
    }

    private insert (
        replicaId: string,
        leftIntent: string,
        rightIntent: string,
        content: T,
        leftAttributeEntries: Record<string, any>,
        attributeEntries?: Record<string, any>
    ): string {
        return this.opMap.uidOf(this.opMap.create(replicaId, leftIntent, rightIntent, content, leftAttributeEntries, attributeEntries));
    }

    private delete (id: string): void {
        this.op(id).delete();
    }

    private changeAttributes (id: string, attributes: Record<string, any>): void {
        for (const attr in attributes) {
            this.op(id).attributes.set(attr, attributes[attr]);
        }
    }

    private toArrayNode (nodeId: string): {content:T, attributes: Record<string, any>}[] {
        const node = this.op(nodeId)
        if (node.pos === 0) return [];
        const arr = this.toArrayNode(node.leftId);
        if (!node.deleted) {
            const formats:Record<string, any> = {};
            const it = node.attributes.entries();
            let result = it.next();
            while (!result.done) {
                formats[result.value[0] as string] = result.value[1];
                result = it.next();
            }
            arr.push({
                content: node.content,
                attributes: formats
            });
        }
        return arr;
    }

    private toIdArrayNode (nodeId: string): string[] {
        const node = this.op(nodeId)
        if (node.pos === Number.MAX_VALUE) return [this.END];
        const array = this.toIdArrayNode(node.rightId)
        if (!node.deleted) {
            array.unshift(nodeId);
        }
        return array;
    }

    toIdArray (): string[] {
        const arr = this.toIdArrayNode(this.START);
        return arr;
    }

    op(id:string): YataOp<T> {
        const yataOp =  this.opMap.getByUid(id);
        if (!yataOp) {
            throw new Error(`There is no Yata operation with id ${id}`);
        }
        return yataOp;
    }

    get START (): string {
        return this.start;
    }

    set START (s: string) {
        this.start = s;
    }

    get END (): string {
        return this.end;
    }

    set END (e: string) {
        this.end = e;
    }

    toArray (): {content:T, attributes: Record<string, any>}[] {
        return this.toArrayNode(this.op(this.END).leftId);
    }

    getIdAtIdx (idx: number): string {
        return this.toIdArray()[idx + 1];
    }

    insertByIdx (
        replicaId: string,
        idx: number,
        content: T,
        attributeObj?: Record<string, any>
    ): void {
        let idLeftOfCursor = this.getIdAtIdx(idx - 1);
        const uid = this.insert(
            replicaId,
            idLeftOfCursor,
            this.op(idLeftOfCursor).rightId,
            content,
            Object.fromEntries([...this.op(idLeftOfCursor).attributes.entries()]),
            attributeObj
        );
        // if (attributeObj) {
        //     this.changeAttributes(uid, attributeObj);
        // }
    }

    deleteByIdx (
        idx: number,
        len: number,
    ): void {
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
    };

    getIdxOfId (id: string): number {
        if (id === this.START) return -1;
        const prev = this.getIdxOfId(this.op(id).leftId);
        if (this.op(id).deleted) return prev;
        return 1 + prev;
    }

    toOpArray (): YataOp<T>[] {
        const getOpFn = (id: string) => this.op(id);
        return this.toIdArray().map(getOpFn);
    }
}
