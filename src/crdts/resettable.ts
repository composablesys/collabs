import { Crdt, CrdtInternal } from "./crdt_core";
import { SemidirectState, SemidirectInternal } from "./semidirect";
import { CausalTimestamp, CrdtRuntime } from "../crdt_runtime_interface";

export interface Resettable {
    /**
     * Perform an observed-reset operation on this Crdt,
     * which undoes the effect of causally prior operations
     * but leaves concurrent messages unchanged.
     * The semantics need not be exactly observed-reset but
     * should be similar in spirit (e.g., the Riak map's
     * anomolous counter reset semantics).
     */
    reset(): void;
    /**
     * Perform a reset-wins operation on this Crdt,
     * which undoes the effect of causally prior and concurrent
     * operations.
     */
    resetStrong(): void;
    /**
     * @return A message (not operation) that can be applied to
     * any instance of this Crdt to cause an observed-reset operation.
     * This message is used by MapCrdt to reset every value when
     * the map itself is reset.
     * As with reset(), the semantics need not be exactly
     * observed-reset; however, it is required that applying this
     * message to a Crdt that was initialized concurrently has
     * does not change its state.  If a message with these
     * properties does not exist, an error should be thrown,
     * which will be passed to the caller of MapCrdt.reset().
     */
    getUniversalResetMessage(): any;
    /**
     * A message (not operation) that can be applied to any
     * instance of this Crdt to cause a reset-wins (strong
     * reset) operation.
     * This message is used by MapCrdt to strong-reset every value
     * when the map itself is strong-reset.
     * If a message with these
     * properties does not exist, an error should be thrown,
     * which will be passed to the caller of MapCrdt.resetStrong().
     */
    getUniversalResetStrongMessage(): any;
}

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
        super.applyOps([2, "reset"]);
    }
    getUniversalResetStrongMessage() {
        return [2, "reset"];
    }
    /**
     * Apply operations intended for this.originalCrdtInternal,
     * by translating them for the resettable CRDT and calling
     * super.applyOps.
     */
    protected applyOps(...operations: any) : any {
        return super.applyOps(...operations.map((op: any) => [1, op]));
    }
    /**
     * Subclasses that want to translate operations from
     * this.originalCrdtInternal should override
     * translateDescriptionsResetWins instead of this method.
     *
     * Translates internal (semidirect product-based) descriptions
     * so that:
     * - The description of a reset-wins operation is
     * "resetStrong", regardless of whether it changed the state.
     * - The description of an operation that gets killed by
     * a concurrent reset-wins is null.
     * - The description of an atomic sequence of originalCrdtInternal
     * operations is that returned by translateDescriptionsResetWins(
     * list of originalCrdtInternal descriptions).
     */
    protected translateDescriptions(descriptions: Array<any>): any {
        if (descriptions.length === 1) {
            let desc = descriptions[0];
            // Operation killed by a concurrent-reset wins is null
            if (desc === null) return null;
            // Reset-wins description is [2, "reset"]
            if (desc[0] === 2 && desc[1] === "reset") {
                return "resetStrong";
            }
        }
        // If we get to here, it's a sequence of originalCrdtInternal ops
        let translated = [];
        for (let desc of descriptions) {
            // Operation must be of the form [1, desc]
            if (!(desc[0] === 1)) {
                throw new Error("Unrecognized description: " + JSON.stringify(desc));
            }
            translated.push(desc[1]);
        }
        return this.translateDescriptionsResetWins(translated);
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
        extends DefaultResetWinsCrdt<SemidirectState<S>>
        implements Resettable {
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
            super.applyOps([1, "reset"]);
        }
    }
    getUniversalResetMessage() {
        // Note here we have to account for the reset-wins layer
        // (it's not wrapped automatically like in super.applyOps).
        return [1, [1, "reset"]];
    }
    /**
     * Apply operations intended for this.originalCrdtInternal,
     * by translating them for the resettable CRDT and calling
     * super.applyOps.
     */
    protected applyOps(...operations: any) : any {
        return super.applyOps(...operations.map((op: any) => [2, op]));
    }
    /**
     * Subclasses that want to translate operations from
     * this.originalCrdtInternal should override
     * translateDescriptionsResettable instead of this method.
     *
     * Translates internal (semidirect product-based) descriptions
     * so that:
     * - The description of an observed-reset operation is
     * ["reset", [TODO: re-applied ops]]
     * - The description of an atomic sequence of originalCrdtInternal
     * operations is that returned by translateDescriptionsResettable(
     * list of originalCrdtInternal descriptions).
     */
    protected translateDescriptionsResetWins(descriptions: Array<any>): any {
        if (descriptions.length === 1) {
            let desc = descriptions[0];
            // Observed reset description is [1, ["reset",
            // list of re-applied ops]]
            if (desc[0] === 1 && desc[1][0] === "reset") {
                // TODO: in the second entry, put the translated
                // operations that didn't get reset.  Keep in
                // mind that these will be descriptions from the
                // innermost semidirect product.  What to do
                // about operations that were originally grouped
                // atomically, since translate expects those
                // to be delivered together?
                return ["reset", desc[1][1]];
            }
        }
        // If we get to here, it's a sequence of originalCrdtInternal ops
        let translated = [];
        for (let desc of descriptions) {
            // Operation must be of the form [2, desc]
            if (!(desc[0] === 2)) {
                throw new Error("Unrecognized description: " + JSON.stringify(desc));
            }
            translated.push(desc[1]);
        }
        return this.translateDescriptionsResettable(translated);
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
