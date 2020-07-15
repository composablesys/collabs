import {CrdtRuntime} from "../crdt_runtime_interface";
import {DefaultResettableCrdt} from "./resettable";
import { CounterInternal } from "./basic_crdts";

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
