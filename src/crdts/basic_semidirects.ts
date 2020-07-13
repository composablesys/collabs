import { Crdt } from "./crdt_core";
import { SemidirectState, SemidirectCrdtInternal } from "./semidirect";
import { CounterInternal, MultRegisterInternal } from "./basic_crdts";
import { CrdtRuntime } from "../crdt_runtime_interface";

export class IntRegisterCrdt extends Crdt<SemidirectCrdtInternal<number>, SemidirectState<number>> {
    // semidirectInstance completely describes this semidirect product
    static semidirectInstance = new SemidirectCrdtInternal<number>(
        CounterInternal.instance, MultRegisterInternal.instance,
        (m2: number, m1: number) => m2*m1
    );
    constructor(id: any, runtime: CrdtRuntime, initialData?: any) {
        super(id, IntRegisterCrdt.semidirectInstance, runtime, initialData);
    }
    increment() {
        this.add(1);
    }
    decrement() {
        this.add(-1);
    }
    add(n: number) {
        this.applyOp([1,n]);
    }
    mult(n: number) {
        this.applyOp([2,n]);
    }
    get value() : number {
        return this.state.internalState;
    }
    protected translateDescription(description: [number, number]): [string, number] {
        if (description[0] === 1) return ["add", description[1]];
        else return ["mult", description[1]];
    }
}
