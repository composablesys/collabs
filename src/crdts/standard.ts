import {CrdtRuntime} from "../crdt_runtime_interface";
import {DefaultResettableCrdt} from "./resettable";
import { CounterInternal, NoOpCrdtInternal } from "./basic_crdts";
import { ResetSemantics } from "./crdt_core";

export class ResettableCounterCrdt extends DefaultResettableCrdt<number> {
    constructor(id: any, runtime: CrdtRuntime,
            initialValue: number = 0, resetValue: number = 0) {
        super(id, CounterInternal.instance, resetValue, runtime, initialValue);
    }
    increment() {
        this.add(1);
    }
    decrement() {
        this.add(-1);
    }
    add(n: number) {
        this.applyOps(n);
    }
    get value() : number {
        return this.originalState;
    }
    /**
     * Performs an equivalent add.  As a consequence,
     * counter.value += n and counter.value -= n work
     * as expected (converted to CRDT additions).
     */
    set value(newValue: number) {
        this.add(newValue - this.value);
    }
}

export class EnableWinsFlag extends DefaultResettableCrdt<null> {
    constructor(id: any, runtime: CrdtRuntime) {
        super(id, new NoOpCrdtInternal(() => null), null, runtime);
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
    /**
     * Performs an equivalent add.  As a consequence,
     * counter.value += n and counter.value -= n work
     * as expected (converted to CRDT additions).
     */
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
