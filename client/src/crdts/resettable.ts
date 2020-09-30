import { Crdt, CrdtRuntime } from "./crdt_core";
import { SemidirectProduct } from "./semidirect";

export class ResetWrapperCrdt<S extends Object = any> extends SemidirectProduct<S> {
    /**
     * [constructor description]
     * @param parentOrRuntime       [description]
     * @param id                    [description]
     * @param keepOnlyMaximal=false Store only causally maximal
     * messages in the history, to save space (although possibly
     * at some CPU cost).  This is only allowed if the state
     * only ever depends on the causally maximal messages.
     */
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        keepOnlyMaximal = false
    ) {
        super(parentOrRuntime, id, true, true, keepOnlyMaximal);
        // TODO: call setup
    }

    reset() {
        // TODO
    }
}

export class OptionalResettableCrdt<S extends Object = any> extends Crdt<S> {
    resettable: boolean
    resetWrapperCrdt?: ResetWrapperCrdt<S>;
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        initialState: S,
        resettable = true,
        keepOnlyMaximal = false
    ) {
        if (resettable) {
            let resetWrapperCrdt = new ResetWrapperCrdt(
                parentOrRuntime, id + "_reset", keepOnlyMaximal
            );
            super(resetWrapperCrdt, id, initialState);
            this.resetWrapperCrdt = resetWrapperCrdt;
        }
        else super(parentOrRuntime, id, initialState);
        this.resettable = resettable;
    }

    reset() {
        if (this.resetWrapperCrdt) {
            this.resetWrapperCrdt.reset();
        }
    }

    isResettable() {
        return this.isResettable;
    }
}

// TODO: optional resettable semidirect.
