import * as crdts from 'compoventuals-client';

class YataLinearOp<T> extends crdts.CompositeCrdt {
    readonly _creatorId: string; // Fixed
    readonly _originId: string; // Fixed
    public _leftId: string;
    public _rightId: string;
    readonly _deleted: crdts.LwwRegister<boolean>;
    // TODO: consider: deleted should store the client id of the last delete.
    // TODO: consider: add a "causes" field to facilitate concurrently
    //  performing sets of causal operations. For example, we can
    //  model "moves" as a deletion which then causes an insertion.
    //  We can prevent duplication from concurrent moving operations
    //  if only one deletion is kept and anything caused by the
    //  discarded deletion is also discarded.
    readonly _content: T; // Fixed
    readonly _pos: number; // Fixed

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
    ) {
        super();
        this._creatorId = creatorId;
        this._originId = originId;
        this._leftId = leftId;
        this._rightId = rightId;
        this._deleted = this.addChild("deleted", new crdts.LwwRegister(false));
        this._content = content;
        this._pos = pos;
    }

    init(name: string, parent: crdts.CrdtParent) {
        super.init(name, parent);
    }
}

export class YataLinear<T> extends crdts.CompositeCrdt {
    private start: string = '';
    private end: string = '';
    readonly defaultContent: T;
    public opMap: crdts.YjsCrdtSet<YataLinearOp<T>, [string, string, string, T]>;
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
                        if (i_origin.pos > o_origin.pos) {
                            break;
                        }
                    }
                }
                const rightId = this.op(leftId).rightId;
                // const id = ????
                // this.op(leftId).rightId = id;
                // this.op(rightId).leftId = id;
                const pos = (this.op(leftId).pos + this.op(rightId).pos) / 2;
                return new YataLinearOp<T>(replicaId, originId, leftId, rightId, content, pos)
            }, [
                this.startOp,
                this.endOp
            ]));
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

    init(name: string, parent: crdts.CrdtParent) {
        super.init(name, parent);
        this.START = this.opMap.uidOf(this.startOp);
        this.END = this.opMap.uidOf(this.endOp);
        console.log(`START: ${this.START} | END: ${this.END}`);
        this.opMap.getByUid(this.START)!.rightId = this.END;
        this.opMap.getByUid(this.END)!.leftId = this.START;
        this.idRightOfCursor = this.END;
    }

    insert (
        replicaId: string,
        leftIntent: string,
        rightIntent: string,
        content: T,
    ): string {
        return this.opMap.uidOf(this.opMap.create(replicaId, leftIntent, rightIntent, content));
    }

    delete (id: string): void {
        console.log("deleted id:", id);
        this.op(id).delete();
    }

    private toArrayNode (nodeId: string): T[] {
        const node = this.op(nodeId)
        if (node.pos === 0) return [];
        const arr = this.toArrayNode(node.leftId);
        if (!node.deleted) {
            arr.push(node.content);
        }
        return arr;
    }
    
    toArray (): T[] {
        return this.toArrayNode(this.op(this.END).leftId);
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

    private toIdArray (): string[] {
        console.log("To Id Array");
        return this.toIdArrayNode(this.START);
    }

    getIdAtIdx (idx: number): string {
        console.log("Get Id At Idx");
        return this.toIdArray()[idx + 1];
    }

    insertByIdx (
        replicaId: string,
        idx: number,
        content: T,
    ): void {
        const leftIntentId = this.getIdAtIdx(idx - 1);
        this.idRightOfCursor = this.op(
            this.insert(
                replicaId,
                leftIntentId,
                this.op(leftIntentId).rightId,
                content,
            )
        ).rightId;
    }

    deleteByIdx (
        idx: number,
    ): void {
        const id = this.getIdAtIdx(idx);
        this.delete(id);
        this.idRightOfCursor = this.op(id).rightId;
    }

    getIdxOfId (id: string): number {
        if (id === this.START) return -1;
        const prev = this.getIdxOfId(this.op(id).leftId);
        if (this.op(id).deleted) return prev;
        return 1 + prev;
    }

    getCursorIdx (): number {
        return this.getIdxOfId(this.idRightOfCursor);
    }

    // TODO: Make composable so the type can be CRDT of T or T?
    // TODO: Then also make a fromArray.
}