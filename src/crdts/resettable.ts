import { Crdt, CrdtInternal, ResetSemantics } from "./crdt_core";
import { SemidirectState, SemidirectInternal } from "./semidirect";
import { CausalTimestamp, CrdtRuntime } from "../crdt_runtime_interface";

export class ResetWinsComponent<S> implements CrdtInternal<S> {
    constructor(public readonly originalCrdt: CrdtInternal<S>,
        public readonly resetInitialData: any) { }
    create(initialData?: any): S {
        return this.originalCrdt.create(initialData);
    }
    prepare(operation: string, _state: S) {
        if (operation !== "reset") {
            throw new Error("Unrecognized operation: " + operation);
        }
        return "reset";
    }
    /**
     * Returned description is always "reset".
     */
    effect(message: string, _state: S, _replicaId: any, _timestamp: CausalTimestamp): [S, string] {
        if (message !== "reset") {
            throw new Error("Unrecognized message: " + message);
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
            1
        );
    }
}

export class ObservedResetComponent<S> implements CrdtInternal<S> {
    constructor(public readonly originalCrdt: CrdtInternal<S>,
        public readonly resetInitialData: any) { }
    create(initialData?: any): S {
        return this.originalCrdt.create(initialData);
    }
    prepare(operation: string, _state: S) {
        if (operation !== "reset") {
            throw new Error("Unrecognized operation: " + operation);
        }
        return [];
    }
    /**
     * The returned description is ["reset", list
     * the descriptions returned by originalCrdt when processing
     * the messages appearing in message (i.e., the messages that
     * avoided being reset because they were concurrent to the
     * reset operation)].
     */
    effect(message: Array<[any, CausalTimestamp]>, _state: S,
            replicaId: any, _timestamp: CausalTimestamp): [S, Array<any>] {
        let resetState = this.originalCrdt.create(this.resetInitialData);
        let description = ["reset"];
        for (let concurrentMessage of message) {
            let result = this.originalCrdt.effect(concurrentMessage[0],
                resetState, replicaId, concurrentMessage[1]);
            resetState = result[0];
            description.push(result[1]);
        }
        return [resetState, description];
    }

    static addTo<S>(originalCrdt: CrdtInternal<S>,
            resetInitialData: any) : SemidirectInternal<S> {
        return new SemidirectInternal<S>(
            new ObservedResetComponent(originalCrdt, resetInitialData),
            originalCrdt,
            (m2: [any, CausalTimestamp], m1: Array<[any, CausalTimestamp]>) =>
                {m1.push(m2); return m1},
            2, true, true
        );
    }
}

export class DefaultResettableCrdt<S>
        extends Crdt<SemidirectState<SemidirectState<S>>> {
    public readonly originalCrdtInternal: CrdtInternal<S>;
    constructor(id: any, originalCrdtInternal: CrdtInternal<S>,
            resetInitialData: any,
            runtime: CrdtRuntime, initialData?: any) {
        let crdtWrapped = ResetWinsComponent.addTo(
            ObservedResetComponent.addTo(
                originalCrdtInternal,
                resetInitialData
            ), resetInitialData
        );
        super(id, crdtWrapped, runtime, initialData);
        this.originalCrdtInternal = originalCrdtInternal;
    }
    reset(semantics: ResetSemantics = ResetSemantics.ObservedReset): void {
        switch (semantics) {
            case ResetSemantics.ObservedReset:
                super.applyOps([1, [1, "reset"]]);
                break;
            case ResetSemantics.ResetWins:
                super.applyOps([2, "reset"]);
                break;
            case ResetSemantics.Custom:
                throw new Error("Unsupported reset semantics: Custom");
            default:
                throw new Error("Unsupported reset semantics: " + semantics);
        }
    }
    /**
     * Apply operations intended for this.originalCrdtInternal,
     * by translating them for the resettable CRDT and calling
     * super.applyOps.
     */
    protected applyOps(...operations: any) : any {
        let translatedOps: Array<any> = [];
        for (let operation of operations) {
            translatedOps.push([1, [2, operation]]);
        }
        return super.applyOps(...translatedOps);
    }
    /**
     * Subclasses that want to translate operations from
     * this.originalCrdtInternal should override
     * translateOriginalDescriptions instead of this method.
     *
     * Translates internal (semidirect product-based) descriptions
     * so that:
     * - The description of a reset-wins operation is
     * ["reset", ResetSemantics.ResetWins], regardless of whether it changed the state.
     * - The description of an observed-reset operation is
     * ["reset", ResetSemantics.ObservedReset, [TODO: un-reset
     * operations]]
     * - The description of an atomic sequence of originalCrdtInternal
     * operations is that returned by translateOriginalDescriptions(
     * list of originalCrdtInternal descriptions).
     */
    protected translateDescriptions(descriptions: Array<any>): any {
        if (descriptions.length === 1 && descriptions[0]) {
            let desc = descriptions[0];
            // Reset-wins description is [2, "reset"]
            if (desc[0] === 2 && desc[1] === "reset") {
                return ["reset", ResetSemantics.ResetWins];
            }
            // Observed reset description is [1, [1, "reset"]]
            if (desc[0] === 1 && desc[1][0] === 1 &&
                desc[1][1][0] === "reset") {
                // TODO: in the third array, put the translated
                // operations that didn't get reset.  Keep in
                // mind that these will be descriptions from the
                // innermost direct product.  What to do
                // about operations that were originally grouped
                // atomically, since translate expects those
                // to be delivered together?
                return ["reset", ResetSemantics.ObservedReset, []];
            }
        }
        // If we get to here, it's a sequence of originalCrdtInternal ops
        let translated = [];
        for (let desc of descriptions) {
            // Operation must be of the form [1, [2, desc]]
            // Exception: nulls get sent directly to null
            if (desc === null) translated.push(null);
            else {
                if (!(desc[0] === 1 && desc[1][0] === 2)) {
                    throw new Error("Unrecognized description: " + desc);
                }
                translated.push(desc[1][1]);
            }
        }
        return this.translateDescriptionsInternal(translated);
    }

    /**
     * Override this instead of translateDescriptions.
     * See Crdt.translateDescriptions.
     */
    protected translateDescriptionsInternal(descriptions: Array<any>): any {
        return descriptions[0];
    }

    get originalState(): S {
        return this.state.internalState.internalState;
    }
}
