import {CrdtRuntime} from "../crdt_runtime_interface";
import {DefaultResettableCrdt, ResetWinsComponent, ObservedResetComponent} from "./resettable";
import { CounterInternal, NoOpCrdtInternal, MultRegisterInternal, GcGrowOnlyMapInternal } from "./basic_crdts";
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

export class AddWinsSet<T> extends
        Crdt<SemidirectState<Map<T, SemidirectState<SemidirectState<null>>>>> {
    /**
     * The CrdtInternal for this datatype (with key type T elided
     * so it can be static).  This only looks complicated
     * because we have to manually do the reset-wins and
     * observed-reset wrapping that EnableWinsFlag gets
     * automatically (via DefaultResettableCrdt).  Basically
     * it is just a GcGrowOnlyMapInternal<T, "EnableWinsFlagInternal">,
     * wrapped in a whole-set reset-wins layer.
     */
    private static crdtInternal = ResetWinsComponent.addTo(
        new GcGrowOnlyMapInternal
        <any, SemidirectState<SemidirectState<null>>>(
            ResetWinsComponent.addTo(
                ObservedResetComponent.addTo(
                    new NoOpCrdtInternal(() => null),
                    null, true
                ), null
            ), null, (state) => state.internalState.isHistoryEmpty()
        ), null
    );
    constructor(id: any, runtime: CrdtRuntime) {
        super(id, AddWinsSet.crdtInternal, runtime);
    }
    add(value: T) {
        // We want to do [value, "e"] (for enable).
        // Complicated because we have to account for the reset
        // wrapping.
        this.applyOps([1, [value, [1, [2, "e"]]]]);
    }
    delete(value: T) {
        // Do an observed-reset on value, using its observed-reset
        // layer.
        this.applyOps([1, [value, [1, [1, "reset"]]]]);
    }
    /**
     * Deletes the value with strong delete-wins semantics
     * (delete wins over concurrent add operations, even if
     * this operation has already been dominated by an add
     * operation).
     */
    deleteStrong(value: T) {
        // Do a reset-wins reset on value, using its reset-wins layer.
        this.applyOps([1, [value, [2, "reset"]]]);
    }
    has(value: T) {
        // Return if the entry at value is enabled.
        // Because the internal map garbage collects disabled
        // (removed) entries, we can just do:
        return this.state.internalState.has(value);
    }
    values() {
        // Because the internal map garbage collects disabled
        // (removed) entries, we can just do:
        return this.state.internalState.keys();
    }
    reset(semantics: ResetSemantics = ResetSemantics.ObservedReset): void {
        switch (semantics) {
            case ResetSemantics.ObservedReset:
                // TODO: more efficient approach
                // Observed-reset is equivalent to delete
                // on all keys we currently know of.
                let resets = [];
                for (let value of this.values()) {
                    resets.push([1, [value, [1, [1, "reset"]]]]);
                }
                this.applyOps(...resets);
                break;
            case ResetSemantics.ResetWins:
                this.applyOps([2, "reset"]);
                break;
            case ResetSemantics.PreserveState:
                break;
            case ResetSemantics.Custom:
                throw new Error("Unsupported reset semantics: Custom");
            default:
                throw new Error("Unsupported reset semantics: " + semantics);
        }
    }
    // TODO: translateDescriptions
}
