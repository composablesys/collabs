import { CausalTimestamp } from "../network";
import { Crdt, CrdtRuntime } from "./crdt_core";
import { SemidirectProduct } from "./semidirect";

class ResetComponentMessage extends Uint8Array {
    readonly isResetComponentMessage = true;
    replay: [string[], CausalTimestamp, Uint8Array][] = [];
}

export class ResetComponent<S extends Object> extends Crdt<S> {
    constructor(
        parent: ResetWrapperCrdt<S>,
        id: string,
        readonly targetCrdt: Crdt & HardResettable
    ) {
        super(parent, id, null as unknown as S);
    }

    reset() {
        super.send(new Uint8Array());
    }

    receiveInternal(
        _timestamp: CausalTimestamp,
        message: Uint8Array | ResetComponentMessage
    ): boolean {
        this.targetCrdt.hardReset();
        if ("isResetComponentMessage" in message) {
            // Replay message.replay
            for (let toReplay of message.replay) {
                this.targetCrdt.receive(...toReplay);
            }
        }
        return true;
    }
}

export interface HardResettable {
    /**
     * This should be called by ResetWrapperCrdt only!
     * This method should reset the Crdt's state
     * to a value depending only on its constructor
     * arguments (e.g., a fresh copy of the initial
     * state set in the constructor).  More specifically,
     * the resulting state must be the same on all replicas
     * even if they have received different messages
     * so far, including possibly different numbers of
     * previous hardReset() calls.
     */
    hardReset(): void;
}

export class ResetWrapperCrdt<S extends Object = any> extends SemidirectProduct<S> {
    resetComponent!: ResetComponent<S>;
    /**
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
    }

    setup(targetCrdt: Crdt & HardResettable) {
        this.resetComponent = new ResetComponent(
            this, this.id + "_comp", targetCrdt
        );
        super.setup(
            this.resetComponent, targetCrdt,
            this.action.bind(this), targetCrdt.state
        );
    }

    action(
        m2TargetPath: string[],
        m2Timestamp: CausalTimestamp | null,
        m2Message: Uint8Array,
        m1TargetPath: string[],
        _m1Timestamp: CausalTimestamp,
        m1Message: Uint8Array
    ): [string[], Uint8Array] | null {
        if (!("isResetComponentMessage" in m1Message)) {
            m1Message = new ResetComponentMessage();
        }
        (m1Message as ResetComponentMessage).replay.push(
            [m2TargetPath, m2Timestamp!, m2Message]
        );
        return [m1TargetPath, m1Message];
    }

    reset() {
        this.resetComponent.reset();
    }
}

export abstract class OptionalResettableCrdt<S extends Object = any> extends Crdt<S> implements HardResettable {
    public readonly resettable: boolean
    resetWrapperCrdt?: ResetWrapperCrdt<S>;
    /**
     * @param keepOnlyMaximal=false Store only causally maximal
     * messages in the history, to save space (although possibly
     * at some CPU cost).  This is only allowed if the state
     * only ever depends on the causally maximal messages.
     */
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
            resetWrapperCrdt.setup(this);
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

    abstract hardReset(): void;
}

/**
 * [space description]
 * @param  althoughpossibly*atsomeCPUcost [description]
 * @return                                [description]
 */
export abstract class OptionalResettableSemirectProduct<S extends Object = any> extends SemidirectProduct<S> implements HardResettable {
    public readonly resettable: boolean
    resetWrapperCrdt?: ResetWrapperCrdt<S>;
    /**
     * For more parameter descriptions, see
     * SemidirectProduct.
     * @param keepOnlyMaximal=false Store only causally maximal
     * messages in the history, to save space (although possibly
     * at some CPU cost).  This is only allowed if the state
     * only ever depends on the causally maximal messages.
     */
    constructor(
        parentOrRuntime: Crdt | CrdtRuntime,
        id: string,
        resettable = true,
        keepOnlyMaximal = false,
        historyTimestamps = false,
        historyDiscard1Dominated = false,
        historyDiscard2Dominated = false,
    ) {
        if (resettable) {
            let resetWrapperCrdt = new ResetWrapperCrdt(
                parentOrRuntime, id + "_reset", keepOnlyMaximal
            );
            super(
                resetWrapperCrdt, id, historyTimestamps,
                historyDiscard1Dominated,
                historyDiscard2Dominated
            );
            resetWrapperCrdt.setup(this);
            this.resetWrapperCrdt = resetWrapperCrdt;
        }
        else super(
            parentOrRuntime, id, historyTimestamps,
            historyDiscard1Dominated,
            historyDiscard2Dominated
        );
        this.resettable = resettable;
    }

    reset() {
        if (this.resetWrapperCrdt) {
            this.resetWrapperCrdt.reset();
        }
    }

    hardReset() {
        this.state.hardReset();
        this.hardResetInternal();
    }

    /**
     * Override this instead of hardReset().
     * This method should perform a hard reset
     * of this.state.internalState
     * (which equals this.crdt1.state and this.crdt2.state).
     * E.g., you could call this.crdt1.hardReset() or
     * this.crdt2.hardReset(), if you want to use
     * one of their hard reset semantics.
     */
    abstract hardResetInternal(): void;
}

// TODO: reset wins?
