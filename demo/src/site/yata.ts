import * as crdts from 'compoventuals-client';
import {
    CrdtEvent,
    CrdtEventsRecord, MapKeyEvent,
    SetEvent
} from "compoventuals-client";

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
    public attributesArg?: [string, any][];

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
        attributes?: [string, any][],
    ) {
        super();
        this.creatorId = creatorId;
        this.originId = originId;
        this.leftId = leftId;
        this.rightId = rightId;
        this._deleted = this.addChild("deleted", new crdts.LwwRegister(false));
        this.locallyDeleted = false;
        this.content = content;
        this.pos = pos;
        this.attributes = this.addChild("attributes",
            new crdts.LwwPlainMap());
        if (attributes) {
            this.attributesArg = attributes;
        }
    }

    init(name: string, parent: crdts.CrdtParent) {
        super.init(name, parent);
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

export class YataLinear<T> extends crdts.CompositeCrdt<YataEventsRecord<T>> {
    private start: string = '';
    private end: string = '';
    readonly defaultContent: T;
    public opMap: crdts.YjsCrdtSet<YataOp<T>, [string, string, string, T, [string, any][]?]>;
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
        yata.emit("Insert", {
            uid,
            idx: yata.getIdxOfId(uid),
            newOp,
            timestamp,
            isLocal
        })
    };

    constructor (
        defaultContent: T,
        initialContents: T[],
    ) {
        super();
        this.defaultContent = defaultContent;
        this.startOp = new YataOp('', '', '', '', defaultContent, 0);
        this.endOp = new YataOp('', '', '', '', defaultContent, 1);
        this.initialContentOps = initialContents.map(c =>
            new YataOp('', '', '', '', c, 1 / (initialContents.length + 1)));
        this.opMap = this.addChild(
            "nodeMap",
            new crdts.YjsCrdtSet((
                replicaId: string,
                leftIntent: string,
                rightIntent: string,
                content: T,
                attributeEntries?: [string, any][]
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
                return new YataOp<T>(replicaId, originId, leftId, rightId, content, pos, attributeEntries);
            }, [
                this.startOp,
                this.endOp,
                ...this.initialContentOps
            ]));
        this.opMap.on("Add", this.opMapAddEventHandler(this));
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

    private insert (
        replicaId: string,
        leftIntent: string,
        rightIntent: string,
        content: T,
        attributeEntries?: [string, any][]
    ): string {
        return this.opMap.uidOf(this.opMap.create(replicaId, leftIntent, rightIntent, content, attributeEntries));
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
        if (node.pos === 1) return [this.END];
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
            content
        );
        if (attributeObj) {
            this.changeAttributes(uid, attributeObj);
        }
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
