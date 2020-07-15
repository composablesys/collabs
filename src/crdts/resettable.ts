import { Crdt, CrdtInternal } from "./crdt_core";
import { SemidirectState, SemidirectInternal } from "./semidirect";
import { NoOpCrdtInternal } from "./basic_crdts";
import { CausalTimestamp, CrdtRuntime } from "../crdt_runtime_interface";

export enum ResetSemantics {
    /**
     * Undo the effect of causally prior operations but do not
     * affect concurrent operations.
     */
    ObservedReset,
    /**
     * Undo the effect of both causally prior operations and
     * concurrent operations.
     */
    ResetWins,
    /**
     * A custom remove semantics specific to the Crdt (e.g.,
     * the Riak counter's anomalous reset semantics).
     */
    Custom
}

/**
 * Interface describing a Crdt with reset operations sufficient
 * to be used in a Map Crdt with removable keys.
 * TODO: move to file defining Map Crdt.
 */
export interface Resettable {
    /**
     * Perform a reset operation appropriate for the removal
     * of this value's key from a map.
     *
     * If semantics
     * is not supported, an error should be thrown; however, it's
     * best practice to never throw an error if semantics is not
     * specified (i.e., the default semantics should always be
     * supported).
     *
     * @param semantics The ResetSemantics to use.  If this is
     * undefined, a default semantics should be used.
     */
    reset(semantics?: ResetSemantics): void;
    /**
     * Returns whether or not the Crdt is in a reset state
     * i.e., its key should be considered not present in the
     * map.  The precise meaning of this is CRDT-specific,
     * but intuitively, it means that every operation occurring
     * since the last remove() call has been cancelled by the removal's
     * concurrency semantics.  It should also be true at creation time
     * until unreset() is called (TODO: which a map using this CRDT
     * will do to provoke a key-init message).
     *
     * E.g.:
     * - For ObservedReset, this should be true if
     * there has been an operation not causally dominated by a reset
     * operation.
     * - For ResetWins, this should be true if there has been an
     * operation causally greater than all reset operations.
     */
    isReset(): boolean;
    /**
     * Perform an operation whose sequential semantics is to
     * set isRemoved() to true without changing the actual
     * Crdt state.  Whether this actually sets isRemoved() to true
     * depends on the semantics of concurrent removals.  E.g.,
     * a concurrent RemoveWins operation should cancel an
     * unremove operation, hence isRemoved() will remain false.
     * This is called when a map key is initialized, including
     * when it is re-initialized causally
     * after having been removed.
     *
     * TODO: issue with calling reset() then unreset() to perform
     * a reset that doesn't remove its key: doesn't work in the case
     * of concurrent reset-wins, since they'll kill each other's
     * unreset operations.  We could support this use case by
     * having a state union of two crdts, the original one and one
     * just for unreset operations, with reset-but-not-remove operations
     * performing resets on the original crdt only, while remove
     * operations perform resets on both crdts.  Non-reset operations
     * on the original crdt would have an accompanying unreset
     * operation.  However, this might double our state size while
     * only being useful in the niche case of wanting to
     * distinguish between reset-wins resets and key removal.
     */
    unreset(): void;
}

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
        extends Crdt<SemidirectState<SemidirectState<S>>>
        implements Resettable {
    public readonly originalCrdtInternal: CrdtInternal<S>;
    constructor(id: any, originalCrdtInternal: CrdtInternal<S>,
            resetInitialData: any,
            runtime: CrdtRuntime, initialData?: any) {
        let crdtWrapped = ResetWinsComponent.addTo(
            ObservedResetComponent.addTo(
                NoOpCrdtInternal.addTo(originalCrdtInternal),
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
                throw new Error("ResetSemantics.Custom is not supported");
            default:
                throw new Error("Unrecognized semantics: " + semantics);
        }
    }
    isReset(): boolean {
        return this.state.internalState.isHistoryEmpty();
    }
    unreset(): void {
        super.applyOps([1, [2, [2, "unreset"]]]);
    }
    /**
     * Apply operations intended for this.originalCrdtInternal,
     * by translating them for the resettable CRDT and calling
     * super.applyOps.
     */
    protected applyOps(...operations: any) : any {
        let translatedOps: Array<any> = [];
        for (let operation of operations) {
            translatedOps.push([1, [2, [1, operation]]]);
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
     * - The description of an unreset() operation is "unreset",
     * regradless of whether it changed the state.
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
            // Unreset description is [1, [2, [2, "unreset"]]]
            if (desc[0] === 1 && desc[1][0] === 2 &&
                desc[1][1][0] === 2 && desc[1][1][1] === "unreset") {
                return "unreset";
            }
        }
        // If we get to here, it's a sequence of originalCrdtInternal ops
        let translated = [];
        for (let desc of descriptions) {
            // Operation must be of the form [1, [2, [1, desc]]]
            // Exception: nulls get sent directly to null
            if (desc === null) translated.push(null);
            else {
                if (!(desc[0] === 1 && desc[1][0] === 2 &&
                    desc[1][1][0] === 1)) {
                    throw new Error("Unrecognized description: " + desc);
                }
                translated.push(desc[1][1][1]);
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
