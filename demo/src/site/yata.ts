import * as crdts from 'compoventuals-client';
import {Crdt, CrdtEvent, CrdtEventsRecord, PrimitiveCrdt, ResettableEventsRecord} from "compoventuals-client";

class YataLinearOp<T> extends crdts.CompositeCrdt {
    readonly _creatorId: string;
    readonly _originId: string;
    public _leftId: string;
    public _rightId: string;
    readonly _deleted: crdts.LwwRegister<boolean>;
    readonly _content: T;
    readonly _pos: number;
    readonly attributes: crdts.LwwPlainMap<string, any>;
    private readonly attributesArg?: IterableIterator<[string, any]> | [string, any][];

    get rightId (): string {
        return this._rightId;
    }

    set rightId (id: string) {
        this._rightId = id;
    }

    get leftId (): string {
        return this._leftId;
    }

    set leftId (id: string) {
        this._leftId = id;
    }

    delete (): void {
        this._deleted.value = true;
    }

    get creatorId ():string {
        return this._creatorId;
    }

    get originId ():string {
        return this._originId;
    }

    get deleted (): boolean {
        return this._deleted.value;
    }

    get content (): T {
        return this._content;
    }

    get pos (): number {
        return this._pos;
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
        this._creatorId = creatorId;
        this._originId = originId;
        this._leftId = leftId;
        this._rightId = rightId;
        this._deleted = this.addChild("deleted", new crdts.LwwRegister(false));
        this._content = content;
        this._pos = pos;
        this.attributes = this.addChild("attributes",
            new crdts.LwwPlainMap());
        if (attributes) {
            this.attributesArg = attributes;
        }
    }

    init(name: string, parent: crdts.CrdtParent) {
        super.init(name, parent);
        for (let entry in this.attributesArg) {
            this.attributes.set(entry[0], entry[1]);
        }
    }
}

export class YataLinear<T> extends crdts.CompositeCrdt {
    private start: string = '';
    private end: string = '';
    readonly defaultContent: T;
    public opMap: crdts.YjsCrdtSet<YataLinearOp<T>, [string, string, string, T, [string, any][]?]>;
    private idRightOfCursor: string = '';
    private startOp: YataLinearOp<T>;
    private endOp: YataLinearOp<T>;

    constructor (
        defaultContent: T
    ) {
        super();
        this.defaultContent = defaultContent
        this.startOp = new YataLinearOp('', '', '', '', defaultContent, 0);
        this.endOp = new YataLinearOp('', '', '', '', defaultContent, 1);
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
                    console.log("wat dis? left id is", leftId);
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
                        console.log("Compare leftId:", leftId, "and o_id:", o_id);
                        leftId = o_id;
                    } else {
                        console.log("i_origin.pos =", i_origin.pos, "o_origin.pos", o_origin.pos);
                        if (i_origin.pos >= o_origin.pos) {
                            break;
                        }
                    }
                }
                const rightId = this.op(leftId).rightId;
                // const id = ????
                // this.op(leftId).rightId = id;
                // this.op(rightId).leftId = id;
                const pos = (this.op(leftId).pos + this.op(rightId).pos) / 2;
                // const finalAttrEntries = attributeEntries ? attributeEntries : Array.from(this.op(leftId).attributes.entries());
                // return new YataLinearOp<T>(replicaId, originId, leftId, rightId, content, pos);
                return new YataLinearOp<T>(replicaId, originId, leftId, rightId, content, pos, attributeEntries);
            }, [
                this.startOp,
                this.endOp
            ]));
    }

    init(name: string, parent: crdts.CrdtParent) {
        super.init(name, parent);
        this.START = this.opMap.uidOf(this.startOp);
        this.END = this.opMap.uidOf(this.endOp);
        console.log(`START: ${this.START} | END: ${this.END}`);
        this.opMap.getByUid(this.START)!.rightId = this.END;
        this.opMap.getByUid(this.END)!.leftId = this.START;
        this.idRightOfCursor = this.END;
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
            console.log("About to change", attr, "to", attributes[attr]);
            this.op(id).attributes.set(attr, attributes[attr]);
        }
        // let entry = attributes.next();
        // while (!entry.done) {
        //     this.op(id).attributes[entry[0]].value = entry[1].value;
        //     entry = attributes.next();
        // }
    }

    private toArrayNode (nodeId: string): {content:T, attributes: Record<string, any>}[] {
        const node = this.op(nodeId)
        if (node.pos === 0) return [];
        const arr = this.toArrayNode(node.leftId);
        if (!node.deleted) {
            console.log("toArrayNode", node.content, Object.fromEntries(node.attributes.entries()));
            arr.push({
                content: node.content,
                attributes: Object.fromEntries(node.attributes.entries())
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
        return this.toIdArrayNode(this.START);
    }

    op(id:string): YataLinearOp<T> {
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
        replicaUniqueNumber: number,
        idx: number,
        content: T,
        attributeObj?: Record<string, any>
    ): void {
        let idLeftOfCursor = this.getIdAtIdx(idx - 1);
        this.insert(
            replicaId,
            idLeftOfCursor,
            this.op(idLeftOfCursor).rightId,
            content,
            attributeObj ? Object.entries(attributeObj) : undefined
        );
    }

    deleteByIdx (
        replicaId: string,
        replicaUniqueNumber: number,
        idx: number,
        len: number,
    ): void {
        const id1 = this.getIdAtIdx(idx);
        const id2 = this.getIdAtIdx(idx + len);
        let id = id1;
        while (id !== id2) {
            this.delete(id);
            id = this.op(id).rightId;
        }
        this.delete(id);
    }

    changeAttributeByIdx(
        replicaId: string,
        replicaUniqueNumber: number,
        idx: number,
        len: number,
        attributes: Record<string, any>
    ): void {
        console.log("Change attribute by idx", idx, len, attributes);
        const id1 = this.getIdAtIdx(idx);
        const id2 = this.getIdAtIdx(idx + len);
        let id = id1;
        while (id !== id2) {
            this.changeAttributes(id, attributes);
            id = this.op(id).rightId;
        }
    };

    getIdxOfId (id: string): number {
        if (id === this.START) return -1;
        const prev = this.getIdxOfId(this.op(id).leftId);
        if (this.op(id).deleted) return prev;
        return 1 + prev;
    }
}

// TODO:
//  1. Link text-change event with attribute changes. DONE
//  2. Make a toArray function that also includes attributes