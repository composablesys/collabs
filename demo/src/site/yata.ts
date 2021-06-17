import { crdts, network } from 'compoventuals-client';

const START = 'start';
const END = 'end';

class YataLinearOp<T> extends crdts.CompositeCrdt {
    readonly _creatorId: crdts.LwwRegister<string>; // Fixed
    readonly _originId: crdts.LwwRegister<string>; // Fixed
    readonly _leftId: crdts.LwwRegister<string>;
    readonly _rightId: crdts.LwwRegister<string>;
    readonly _deleted: crdts.LwwRegister<boolean>;
    // TODO: consider: deleted should store the client id of the last delete.
    // TODO: consider: add a "causes" field to facilitate concurrently
    //  performing sets of causal operations. For example, we can
    //  model "moves" as a deletion which then causes an insertion.
    //  We can prevent duplication from concurrent moving operations
    //  if only one deletion is kept and anything caused by the
    //  discarded deletion is also discarded.
    readonly _content: crdts.LwwRegister<T>; // Fixed
    readonly _pos: crdts.LwwRegister<number>; // Fixed
    readonly _initialized: crdts.LwwRegister<boolean>; // Fixed

    private get initialized (): boolean {
        return this._initialized.value;
    }

    private set initialized (initVal: boolean) {
        this._initialized.value = initVal
    }

    private throwErrorIfUninitialized (attemptedMethodName: string): void {
        if (!this.initialized) {
            throw new Error(`Attempted ${attemptedMethodName} when YataLinearOperation is uninitialized!!`);
        }
    }

    get rightId (): string {
        this.throwErrorIfUninitialized("get rightId");
        return this._rightId.value;
    }

    set rightId (id: string) {
        this.throwErrorIfUninitialized("set rightId");
        this._rightId.value = id;
    }

    get leftId (): string {
        this.throwErrorIfUninitialized("get leftId");
        return this._leftId.value;
    }

    set leftId (id: string) {
        this.throwErrorIfUninitialized("set leftId");
        this._leftId.value = id;
    }

    delete (): void {
        this.throwErrorIfUninitialized("delete");
        this._deleted.value = true;
    }

    get creatorId ():string {
        this.throwErrorIfUninitialized("get creatorId");
        return this._creatorId.value;
    }

    get originId ():string {
        this.throwErrorIfUninitialized("get originId");
        return this._originId.value;
    }

    get deleted (): boolean {
        this.throwErrorIfUninitialized("get deleted");
        return this._deleted.value;
    }

    get content (): T {
        this.throwErrorIfUninitialized("get content");
        return this._content.value;
    }

    get pos (): number {
        return this._pos.value;
    }

    initialize (
        creatorId: string,
        originId: string,
        leftId: string,
        rightId: string,
        content: T,
        pos: number,
    ): void {
        console.log("Initializing Yata Op")
        if (!this.initialized) {
            this._creatorId.value = creatorId;
            this._originId.value = originId;
            this._leftId.value = leftId;
            this._rightId.value = rightId;
            this._content.value = content;
            this._pos.value = pos;
            this.initialized = true;
        } else {
            throw new Error("Yata Linear Op Initialized Twice!!");
        }
    }
    
    constructor (
        defaultContent: T,
    ) {
        super();
        this._creatorId = this.addChild("creatorId", new crdts.LwwRegister(''));
        this._originId = this.addChild("originId", new crdts.LwwRegister(''));
        this._leftId = this.addChild("leftId", new crdts.LwwRegister(''));
        this._rightId = this.addChild("rightId", new crdts.LwwRegister(''));
        this._deleted = this.addChild("deleted", new crdts.LwwRegister(false));
        this._content = this.addChild("content", new crdts.LwwRegister(defaultContent));
        this._pos = this.addChild("pos", new crdts.LwwRegister(0));
        this._initialized = this.addChild("initialized", new crdts.LwwRegister(false));
    }

    init(name: string, parent: crdts.CrdtParent) {
        super.init(name, parent);
    }
}

export class YataLinear<T> extends crdts.CompositeCrdt {
    readonly defaultContent: T;
    public opMap: crdts.LazyMap<string, YataLinearOp<T>>;
    private idRightOfCursor = END;

    constructor (
        defaultContent: T
    ) {
        super();
        this.defaultContent = defaultContent
        this.opMap = this.addChild(
            "nodeMap",
            new crdts.LazyMap<string, YataLinearOp<T>>(
                () => new YataLinearOp<T>(this.defaultContent)));
    }

    op(id:string): YataLinearOp<T> {
        return this.opMap.get(id);
    }

    init(name: string, parent: crdts.CrdtParent) {
        super.init(name, parent);
        // this.nodeMap = this.addChild(
        //     "nodeMap",
        //     new crdts.LazyMap<string, YataLinearNode<T>>(
        //         () => new YataLinearNode<T>(this.defaultContent)));
        this.op(START).initialize('', START, START, END, this.defaultContent, 0);
        this.op(END).initialize('', START, START, END, this.defaultContent, 1);
    }


    insert (
        replicaId: string,
        replicaUniqueNumber: number,
        leftIntent: string,
        rightIntent: string,
        content: T,
    ): void {
        const originId = leftIntent;
        let leftId = leftIntent;
        console.log(leftId);
        console.log("Left Right Id", this.op(leftId).rightId);
        console.log("Right Intent", rightIntent);
        while (this.op(leftId).rightId !== rightIntent) {
            console.log("nein");
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
        const id = `${replicaId}${replicaUniqueNumber}`
        this.op(id)
            .initialize(
                replicaId,
                originId,
                leftId,
                rightId,
                content,
                (this.op(leftId).pos + this.op(rightId).pos) / 2,
            )
        this.op(leftId).rightId = id;
        this.op(rightId).leftId = id;
    }

    delete (id: string): void {
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
        return this.toArrayNode(this.op(END).leftId);
    }

    private toIdArrayNode (nodeId: string): string[] {
        const node = this.op(nodeId)
        if (node.pos === 1) return [END];
        const array = this.toIdArrayNode(node.rightId)
        if (!node.deleted) {
            array.unshift(nodeId);
        }
        return array;
    }

    private toIdArray (): string[] {
        return this.toIdArrayNode(START);
    }

    getIdAtIdx (idx: number): string {
        return this.toIdArray()[idx + 1];
    }

    insertByIdx (
        replicaId: string,
        replicaUniqueNumber: number,
        idx: number,
        content: T,
    ): void {
        const leftIntentId = this.getIdAtIdx(idx - 1);
        this.insert(
            replicaId,
            replicaUniqueNumber,
            leftIntentId,
            this.op(leftIntentId).rightId,
            content,
        )
        this.idRightOfCursor = this.op(`${replicaId}${replicaUniqueNumber}`).rightId;
    }

    deleteByIdx (
        idx: number,
    ): void {
        const id = this.getIdAtIdx(idx);
        this.delete(id);
        this.idRightOfCursor = this.op(id).rightId;
    }

    getIdxOfId (id: string): number {
        if (id === START) return -1;
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