import {CrdtRuntime} from "../crdt_runtime_interface";
import {DefaultResettableCrdt} from "./resettable";
import { CounterInternal, NoOpCrdtInternal, MultRegisterInternal } from "./basic_crdts";
import { ResetSemantics, Crdt } from "./crdt_core";
import { SemidirectState, SemidirectInternal } from "./semidirect";

export class UnresettableIntRegisterCrdt extends Crdt<SemidirectState<number>> {
    // semidirectInstance completely describes this semidirect product
    static semidirectInstance = new SemidirectInternal<number>(
        CounterInternal.instance, MultRegisterInternal.instance,
        (m2: number, m1: number) => m2*m1, 1
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
        this.applyOps([1,n]);
    }
    mult(n: number) {
        this.applyOps([2,n]);
    }
    get value() : number {
        return this.state.internalState;
    }
    protected translateDescriptions(descriptions: Array<[number, number]>): [string, number] {
        let description = descriptions[0];
        if (description[0] === 1) return ["add", description[1]];
        else return ["mult", description[1]];
    }
}

export class IntRegisterCrdt extends DefaultResettableCrdt<SemidirectState<number>> {
    static semidirectInstance = new SemidirectInternal<number>(
        CounterInternal.instance, MultRegisterInternal.instance,
        (m2: number, m1: number) => m2*m1, 1
    );
    constructor(id: any, runtime: CrdtRuntime,
            initialValue: number = 0, resetValue: number = 0) {
        super(id, IntRegisterCrdt.semidirectInstance, resetValue, runtime, initialValue);
    }
    increment() {
        this.add(1);
    }
    decrement() {
        this.add(-1);
    }
    add(n: number) {
        this.applyOps([1, n]);
    }
    mult(n: number) {
        this.applyOps([2, n]);
    }
    get value() : number {
        return this.originalState.internalState;
    }
    /**
     * Performs an equivalent add.  As a consequence,
     * counter.value += n and counter.value -= n work
     * as expected (converted to CRDT additions).
     */
    set value(newValue: number) {
        this.add(newValue - this.value);
    }
    protected translateDescriptionsInternal(descriptions: Array<[number, number]>): [string, number] {
        let description = descriptions[0];
        if (description[0] === 1) return ["add", description[1]];
        else return ["mult", description[1]];
    }
}

export class EnableWinsFlag extends DefaultResettableCrdt<null> {
    constructor(id: any, runtime: CrdtRuntime) {
        super(id, new NoOpCrdtInternal(() => null), null, runtime,
            undefined, true);
    }
    enable() {
        this.applyOps("e");
    }
    disable() {
        this.reset(ResetSemantics.ObservedReset);
    }
    get enabled() : boolean {
        return !this.state.internalState.isHistoryEmpty();
    }
    set enabled(newValue: boolean) {
        if (newValue) this.enable();
        else this.disable();
    }
    // TODO: would also like to translate observed-resets to
    // disable (but only if it actually worked).  Perhaps add noop indicator out front?
    // (Need to add a no-op crdt at the top level)
    protected translateDescriptionsInternal(descriptions: Array<string>): string {
        if (descriptions.length !== 1 || descriptions[0] !== "e") {
            throw new Error("Unrecognized descriptions: " +
                JSON.stringify(descriptions))
        }
        else return "enable";
    }
}


export class DisableWinsFlag extends DefaultResettableCrdt<null> {
    constructor(id: any, runtime: CrdtRuntime) {
        super(id, new NoOpCrdtInternal(() => null), null, runtime,
            undefined, true);
    }
    enable() {
        this.reset(ResetSemantics.ObservedReset);
    }
    disable() {
        this.applyOps("d");
    }
    get enabled() : boolean {
        return this.state.internalState.isHistoryEmpty();
    }
    set enabled(newValue: boolean) {
        if (newValue) this.enable();
        else this.disable();
    }
    // TODO: would also like to translate observed-resets to
    // enable (but only if it actually worked).  Perhaps add noop indicator out front?
    // (Need to add a no-op crdt at the top level)
    protected translateDescriptionsInternal(descriptions: Array<string>): string {
        if (descriptions.length !== 1 || descriptions[0] !== "d") {
            throw new Error("Unrecognized descriptions: " +
                JSON.stringify(descriptions))
        }
        else return "disable";
    }
}
