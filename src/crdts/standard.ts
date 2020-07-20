import { CrdtRuntime } from "../crdt_runtime_interface";
import { Resettable, DefaultResettableCrdt, DefaultResetWinsCrdt, ResetWinsComponent, ObservedResetComponent } from "./resettable";
import { CounterInternal, MultRegisterInternal } from "./basic_crdts";
import { Crdt, CrdtInternal } from "./crdt_core";
import { SemidirectState, SemidirectInternal } from "./semidirect";
import { PairCrdtInternal, GrowOnlyMapInternal, HomapComponent, NoOpCrdtInternal } from "./components";

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
    protected translateDescriptionsResettable(descriptions: Array<[number, number]>): [string, number] {
        let description = descriptions[0];
        if (description[0] === 1) return ["add", description[1]];
        else return ["mult", description[1]];
    }
}

export class EnableWinsFlag extends DefaultResettableCrdt<null> {
    constructor(id: any, runtime: CrdtRuntime) {
        super(id, new NoOpCrdtInternal(() => null), null,
            runtime, undefined, true);
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
    protected translateDescriptionsResettable(descriptions: Array<string>): string {
        if (descriptions.length !== 1 || descriptions[0] !== "e") {
            throw new Error("Unrecognized descriptions: " +
                JSON.stringify(descriptions))
        }
        else return "enable";
    }
}


export class DisableWinsFlag extends DefaultResettableCrdt<null> {
    constructor(id: any, runtime: CrdtRuntime) {
        super(id, new NoOpCrdtInternal(() => null), null,
            runtime, undefined, true);
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
    protected translateDescriptionsResettable(descriptions: Array<string>): string {
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
    private static crdtInternal?: CrdtInternal<Map<any, SemidirectState<SemidirectState<null>>>> = undefined;
    constructor(id: any, runtime: CrdtRuntime) {
        if (!AddWinsSet.crdtInternal) {
            let enableWinsFlagInternal = ResetWinsComponent.addTo(
                ObservedResetComponent.addTo(
                    new NoOpCrdtInternal(() => null),
                    null, true
                ), null
            );
            AddWinsSet.crdtInternal = HomapComponent.addToCommuting(
                new GrowOnlyMapInternal<any, SemidirectState<SemidirectState<null>>>(
                    enableWinsFlagInternal,
                    () => enableWinsFlagInternal.create(),
                    (state) => state.internalState.isHistoryEmpty()
                )
            );
        }
        super(id, AddWinsSet.crdtInternal, null, runtime);
    }
    add(value: T) {
        // We want to do "e" (for enable) with key=value.
        this.applyOps([1, ["applyOp", value, [1, [2, "e"]]]]);
    }
    delete(value: T) {
        // Do an observed-reset on value, using its observed-reset
        // layer.
        // Skip if it's already disabled (hence op will do nothing).
        if (this.has(value)) {
            this.applyOps([1, ["applyOp", value, [1, [1, "reset"]]]]);
        }
    }
    /**
     * Deletes the value with strong delete-wins semantics
     * (delete wins over concurrent add operations, even if
     * this operation has already been dominated by an add
     * operation).
     */
    deleteStrong(value: T) {
        // Do a reset-wins reset on value, using its reset-wins layer.
        this.applyOps([1, ["applyOp", value, [2, "reset"]]]);
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
    get size() {
        return this.originalStateResetWins.size;
    }
    reset() {
        // Apply an observed-reset to each value using
        // a homap operation.
        // Note here we have to use a reset message, not operation;
        // it gets prepared as [].
        // Skip if we are already reset (okay due to observed-reset
        // semantics).
        if (this.size !== 0) this.applyOps([2, [1, [1, []]]]);
    }

    // TODO: translateDescriptionsResetWins, accounting
    // for the homap

    getUniversalResetMessage() {
        // Return the message induced by reset().
        // Note we have to add an extra [1, -] to account
        // for the wrapping usually done by
        // DefaultResetWinsCrdt.
        return [1, [2, [1, [1, []]]]];
    }
}

// // TODO: future feature: atomic grouping of operations
// // possibly across keys.  This could also be a general
// // Crdt feature.  Sort of like transactions.
// export class MapCrdt<K, S> extends
//         DefaultResetWinsCrdt<[Map<K, SemidirectState<SemidirectState<null>>>, Map<K, S>]>
//         implements Resettable {
//     constructor(id: any,
//             valueCrdtFactory: (key: string) => (Crdt<S> & Resettable),
//             runtime: CrdtRuntime) {
//         super(id,
//             new PairCrdtInternal(
//                 AddWinsSet.crdtInternalInstance,
//                 new GrowOnlyMapInternal<K, S>(
//                     valueCrdt.crdtInternal, undefined, true
//                 )
//             ), null, runtime
//         );
//     }
// }
