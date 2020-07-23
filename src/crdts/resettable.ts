import { Crdt, CrdtInternal } from "./crdt_core";
import { SemidirectState, SemidirectInternal } from "./semidirect";
import { CausalTimestamp, CrdtRuntime } from "../crdt_runtime_interface";

// TODO: how to do garbage collection of reset-wins operations?
// E.g. for flags in a set: garbage collection will fail if
// there are reset-wins ops in the history, as it should, but
// we would like to garbage collect anyway once all the reset-wins
// are causally stable.
export class ResetWinsComponent<S> implements CrdtInternal<S> {
    constructor(public readonly originalCrdt: CrdtInternal<S>,
        public readonly resetInitialData: any) { }
    create(initialData?: any): S {
        return this.originalCrdt.create(initialData);
    }
    prepare(operation: string, _state: S) {
        if (operation !== "reset") {
            throw new Error("Unrecognized operation: " +
                JSON.stringify(operation));
        }
        return "reset";
    }
    /**
     * Returned description is always "reset".
     */
    effect(message: string, _state: S, _replicaId: any, _timestamp: CausalTimestamp): [S, string] {
        if (message !== "reset") {
            throw new Error("Unrecognized message: " +
                JSON.stringify(message));
        }
        // Note we should return a clone of the reset state, not
        // a fixed "reset state", since the returned state may
        // be mutated later.
        return [this.originalCrdt.create(this.resetInitialData), "reset"];
    }

    static addTo<S>(originalCrdt: CrdtInternal<S>,
            resetInitialData: any) : SemidirectInternal<S> {
        return new SemidirectInternal<S>(
            originalCrdt, new ResetWinsComponent(originalCrdt,
            resetInitialData),
            (_m2 : string, _m1: any) => null,
            1, false, false, true
        );
    }
}

export class DefaultResetWinsCrdt<S>
        extends Crdt<SemidirectState<S>> {
    public readonly originalCrdtInternalResetWins: CrdtInternal<S>;
    /**
     * [constructor description]
     * @param id                    [description]
     * @param originalCrdtInternal  [description]
     * @param resetInitialData      [description]
     * @param runtime               [description]
     * @param initialData           [description]
     */
    constructor(id: any, originalCrdtInternal: CrdtInternal<S>,
            resetInitialData: any,
            runtime: CrdtRuntime, initialData?: any) {
        let crdtWrapped = ResetWinsComponent.addTo(
            originalCrdtInternal, resetInitialData
        );
        super(id, crdtWrapped, runtime, initialData);
        this.originalCrdtInternalResetWins = originalCrdtInternal;
    }
    resetStrong() {
        super.applyOp([2, "reset"]);
    }
    getUniversalResetStrongMessage() {
        return [2, "reset"];
    }
    /**
     * Apply operations intended for this.originalCrdtInternal,
     * by translating them for the resettable CRDT and calling
     * super.applyOps.
     */
    protected applyOp(operation: any) : any {
        return super.applyOp([1, operation]);
    }
    /**
     * Subclasses that want to translate operations from
     * this.originalCrdtInternal should override
     * translateDescriptionsResetWins instead of this method.
     *
     * Translates internal (semidirect product-based) descriptions
     * so that:
     * - The description of a reset-wins operation is
     * ["resetStrong"], regardless of whether it changed the state.
     * - The description of an operation that gets killed by
     * a concurrent reset-wins is skipped.
     * - The description of an originalCrdtInternal
     * operations is unchanged, except for null descriptions,
     * which are skipped.
     * Then returns the result of passing this list to
     * translateDescriptionsResetWins, or null if all
     * descriptions are null.
     */
    protected translateDescriptions(descriptions: Array<any>): any {
        let translated = [];
        for (let desc of descriptions) {
            if (desc === null) continue;
            // Reset-wins description is [2, "reset"]
            else if (desc[0] === 2 && desc[1] === "reset") {
                translated.push(["resetStrong"]);
            }
            // originalCrdtOperation is of the form [1, desc]
            else if (desc[0] === 1) {
                translated.push(desc[1]);
            }
            else {
                throw new Error("Unrecognized description: " + JSON.stringify(desc));
            }
        }
        if (translated.length === 0) return null;
        else return this.translateDescriptionsResetWins(translated);
    }

    /**
     * Override this instead of translateDescriptions.
     * See Crdt.translateDescriptions.
     */
    protected translateDescriptionsResetWins(descriptions: Array<any>): any {
        return descriptions[0];
    }

    get originalStateResetWins(): S {
        return this.state.internalState;
    }
}

// TODO: rename originalCrdtInternal (above) and originalCrdt
// to reflect reset-wins vs reset, to avoid confusion.

export class ObservedResetComponent<S> implements CrdtInternal<S> {
    constructor(public readonly originalCrdt: CrdtInternal<S>,
        public readonly resetInitialData: any) { }
    create(initialData?: any): S {
        return this.originalCrdt.create(initialData);
    }
    prepare(operation: string, _state: S) {
        if (operation !== "reset") {
            throw new Error("Unrecognized operation: " +
                JSON.stringify(operation));
        }
        return [];
    }
    /**
     * The returned description is ["reset", list of
     * the descriptions returned by originalCrdt when processing
     * the messages appearing in message (i.e., the messages that
     * avoided being reset because they were concurrent to the
     * reset operation)].
     */
    effect(message: Array<[any, CausalTimestamp]>, _state: S,
            replicaId: any, _timestamp: CausalTimestamp): [S, [string, Array<any>]] {
        let resetState = this.originalCrdt.create(this.resetInitialData);
        let descriptions = [];
        for (let concurrentMessage of message) {
            let result = this.originalCrdt.effect(concurrentMessage[0],
                resetState, replicaId, concurrentMessage[1]);
            resetState = result[0];
            descriptions.push(result[1]);
        }
        return [resetState, ["reset", descriptions]];
    }

    static addTo<S>(originalCrdt: CrdtInternal<S>,
            resetInitialData: any, keepOnlyMaximal = false) : SemidirectInternal<S> {
        return new SemidirectInternal<S>(
            new ObservedResetComponent(originalCrdt, resetInitialData),
            originalCrdt,
            (m2: [any, CausalTimestamp], m1: Array<[any, CausalTimestamp]>) =>
                {m1.push(m2); return m1},
            2, true, true, keepOnlyMaximal
        );
    }
}

export class DefaultResettableCrdt<S>
        extends DefaultResetWinsCrdt<SemidirectState<S>> {
    public readonly originalCrdtInternal: CrdtInternal<S>;
    /**
     * [constructor description]
     * @param id                    [description]
     * @param originalCrdtInternal  [description]
     * @param resetInitialData      [description]
     * @param runtime               [description]
     * @param initialData           [description]
     * @param keepOnlyMaximal=false Store only causally maximal
     * messages in the history, to save space (although possibly
     * at some CPU cost).  This is only allowed if the state
     * only ever depends on the causally maximal messages.
     */
    constructor(id: any, originalCrdtInternal: CrdtInternal<S>,
            resetInitialData: any,
            runtime: CrdtRuntime, initialData?: any,
            keepOnlyMaximal = false) {
        let crdtWrapped = ObservedResetComponent.addTo(
            originalCrdtInternal,
            resetInitialData, keepOnlyMaximal
        );
        super(id, crdtWrapped, resetInitialData, runtime, initialData);
        this.originalCrdtInternal = originalCrdtInternal;
    }
    reset() {
        // Ignore the op if we're already reset (okay given
        // observe-reset semantics).
        if (!this.state.internalState.isHistoryEmpty()) {
            super.applyOp([1, "reset"]);
        }
    }
    getUniversalResetMessage() {
        // Note here we have to account for the reset-wins layer
        // (it's not wrapped automatically like in super.applyOps).
        return [1, [1, []]];
    }
    /**
     * Apply operations intended for this.originalCrdtInternal,
     * by translating them for the resettable CRDT and calling
     * super.applyOps.
     */
    protected applyOp(operation: any) : any {
        return super.applyOp([2, operation]);
    }
    /**
     * Subclasses that want to translate operations from
     * this.originalCrdtInternal should override
     * translateDescriptionsResettable instead of this method.
     *
     * Translates internal (semidirect product-based) descriptions
     * so that:
     * - The description of an observed-reset operation is
     * ["reset", [TODO: re-applied ops]].
     * - The description of an originalCrdtInternal
     * is unchanged, except for null descriptions, which
     * are skipped.
     * Then returns the result of passing this list to
     * translateDescriptionsResettable, or null if all
     * descriptions are null.
     */
    protected translateDescriptionsResetWins(descriptions: Array<any>): any {
        let translated = [];
        for (let desc of descriptions) {
            if (desc === null) continue;
            // Reset-strong (already translated by DefaultResetWinsCrdt)
            // description is "resetStrong"
            else if (desc[0] === "resetStrong") {
                translated.push(desc);
            }
            // Observed reset description is [1, ["reset",
            // list of re-applied ops]]
            else if (desc[0] === 1 && desc[1][0] === "reset") {
                // TODO: in the second entry, put the translated
                // operations that didn't get reset.  Keep in
                // mind that these will be descriptions from the
                // innermost semidirect product.  What to do
                // about operations that were originally grouped
                // atomically, since translate expects those
                // to be delivered together?
                translated.push(["reset", desc[1][1]]);
            }
            // originalCrdtOperation is of the form [2, desc]
            else if (desc[0] === 2) {
                translated.push(desc[1]);
            }
            else {
                throw new Error("Unrecognized description: " + JSON.stringify(desc));
            }
        }
        if (translated.length === 0) return null;
        else return this.translateDescriptionsResettable(translated);
    }

    /**
     * Override this instead of translateDescriptions.
     * See Crdt.translateDescriptions.
     */
    protected translateDescriptionsResettable(descriptions: Array<any>): any {
        return descriptions[0];
    }

    get originalStateResettable(): S {
        return this.state.internalState.internalState;
    }
}
