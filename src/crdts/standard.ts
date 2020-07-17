import {CrdtRuntime} from "../crdt_runtime_interface";
import {Resettable, DefaultResettableCrdt, ResetWinsComponent, ObservedResetComponent, DefaultResetWinsCrdt} from "./resettable";
import { CounterInternal, NoOpCrdtInternal, MultRegisterInternal, GcGrowOnlyMapInternal } from "./basic_crdts";
import { Crdt } from "./crdt_core";
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
        return this.originalStateResettable.internalState;
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
        this.reset();
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
        this.reset();
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

export class AddWinsSet<T> extends
        DefaultResetWinsCrdt<Map<T, SemidirectState<SemidirectState<null>>>>
        implements Resettable {
    /**
     * The CrdtInternal for this datatype (with key type T elided
     * so it can be static).  This only looks complicated
     * because we have to manually do the reset-wins and
     * observed-reset wrapping that EnableWinsFlag gets
     * automatically (via DefaultResettableCrdt).  Basically
     * it is just a GcGrowOnlyMapInternal<T, "EnableWinsFlagInternal">.
     */
    private static crdtInternal = new GcGrowOnlyMapInternal
        <any, SemidirectState<SemidirectState<null>>>(
        ResetWinsComponent.addTo(
            ObservedResetComponent.addTo(
                new NoOpCrdtInternal(() => null),
                null, true
            ), null
        ), null, (state) => state.internalState.isHistoryEmpty()
    );
    constructor(id: any, runtime: CrdtRuntime) {
        super(id, AddWinsSet.crdtInternal, null, runtime);
    }
    add(value: T) {
        // We want to do [value, "e"] (for enable).
        this.applyOps([value, [1, [2, "e"]]]);
    }
    delete(value: T) {
        // Do an observed-reset on value, using its observed-reset
        // layer.
        this.applyOps([value, [1, [1, "reset"]]]);
    }
    /**
     * Deletes the value with strong delete-wins semantics
     * (delete wins over concurrent add operations, even if
     * this operation has already been dominated by an add
     * operation).
     */
    deleteStrong(value: T) {
        // Do a reset-wins reset on value, using its reset-wins layer.
        this.applyOps([value, [2, "reset"]]);
    }
    has(value: T) {
        // Return if the entry at value is enabled.
        // Because the internal map garbage collects disabled
        // (removed) entries, we can just do:
        return this.originalStateResetWins.has(value);
    }
    values() {
        // Because the internal map garbage collects disabled
        // (removed) entries, we can just do:
        return this.originalStateResetWins.keys();
    }
    reset() {
        // TODO: more efficient approach: direct-product "reset"
        // operation which just applies reset to all keys on receipt
        // (regardless of whether they were initialized prior).
        let resets = [];
        for (let value of this.values()) {
            resets.push([value, [1, [1, "reset"]]]);
        }
        this.applyOps(...resets);
    }
    // TODO: translateDescriptionsResetWins

    // TODO.
    // Note we have to manually do the reset-wins wrapping
    // usually done by super.applyOps.
    getUniversalResetMessage() {
        throw new Error("Method not implemented.");
    }
}
