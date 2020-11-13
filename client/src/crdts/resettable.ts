import { CausalTimestamp } from "../network";
import { Crdt, CrdtRuntime } from "./crdt_core";
import { SemidirectProduct } from "./semidirect";
import { isResettable, isOutOfOrderAble, AllAble, Resettable, OutOfOrderAble } from "./abilities";

export interface HardResettable {
    /**
     * Warning: not a Crdt operation (may not be
     * eventually consistent)!
     *
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

class ResetComponentMessage extends Uint8Array {
    readonly isResetComponentMessage = true;
    replay: [string[], CausalTimestamp, Uint8Array][] = [];
    outOfOrderMessage: Uint8Array | null = null;
}

class ResetComponent<S extends Object | null = Object | null> extends Crdt<S> {
    constructor(
        parent: ResetWrapperCrdt<S>,
        id: string,
        readonly targetCrdt: Crdt & HardResettable
    ) {
        super(parent, id, null as unknown as S);
    }

    resetTarget() {
        super.send(new Uint8Array());
    }

    receiveInternal(
        timestamp: CausalTimestamp,
        message: Uint8Array | ResetComponentMessage
    ) {
        this.targetCrdt.hardReset();
        (this.parent as ResetWrapperCrdt).dispatchResetEvent(timestamp);
        if ("isResetComponentMessage" in message) {
            // Replay message.replay
            for (let toReplay of message.replay) {
                this.targetCrdt.receive(...toReplay);
            }
        }
    }
}

export class ResetWrapperCrdt<S extends Object | null = Object | null> extends SemidirectProduct<S> implements HardResettable, Resettable, OutOfOrderAble {
    private resetComponent!: ResetComponent<S>;
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

    setupReset(targetCrdt: Crdt<S> & HardResettable) {
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
            [m2TargetPath.slice(), m2Timestamp!, m2Message]
        );
        return [m1TargetPath, m1Message];
    }

    dispatchResetEvent(timestamp: CausalTimestamp) {
        this.dispatchEvent({
            caller: this,
            type: "Reset",
            timestamp: timestamp
        });
    }

    reset() {
        this.resetComponent.resetTarget();
    }

    /**
     * In case we want to further wrap this with StrongResetWrapperCrdt.
     */
    hardReset(): void {
        this.resetComponent.targetCrdt.hardReset();
        this.state.hardReset();
    }

    /**
     * Defers OutOfOrder receipt handling to the target Crdt.
     * Note that the target Crdt may not actually be OutOfOrderAble,
     * in which case this will throw an error.
     * OutOfOrderAble is not supported for reset() operations and
     * will cause an error.
     */
    receiveOutOfOrder(targetPath: string[], timestamp: CausalTimestamp, message: Uint8Array): void {
        let child = this.children.get(targetPath[targetPath.length - 1]);
        if (child === undefined) {
            throw new Error("Unknown child: " + targetPath[targetPath.length - 1] +
                    " in: " + JSON.stringify(targetPath) + ", children: " + JSON.stringify([...this.children.keys()]));
        }
        if (child === this.resetComponent) {
            throw new Error(
                "OutOfOrderAble is not supported for reset()" +
                " operations added by ResetWrapperCrdt"
            );
        }
        if (!isOutOfOrderAble(child)) {
            throw new Error(
                "receiveOutOfOrder() called on ResetWrapperCrdt, but the " +
                "original (wrapped) Crdt is not OutOfOrderAble"
            );
        }
        targetPath.length--;
        child.receiveOutOfOrder(
            targetPath, timestamp, message
        );
    }
}


// Strong reset


// TODO: how to do garbage collection of reset-wins operations?
// E.g. for flags in a set: garbage collection will fail if
// there are reset-wins ops in the history, as it should, but
// we would like to garbage collect anyway once all the reset-wins
// are causally stable.
export class StrongResetComponent<S extends Object | null = Object | null> extends Crdt<S> {
    constructor(
        parent: StrongResetWrapperCrdt<S>,
        id: string,
        readonly targetCrdt: Crdt & HardResettable
    ) {
        super(parent, id, null as unknown as S);
    }

    strongResetTarget() {
        super.send(new Uint8Array());
    }

    receiveInternal(
        timestamp: CausalTimestamp,
        _message: Uint8Array | ResetComponentMessage
    ) {
        this.targetCrdt.hardReset();
        (this.parent as StrongResetWrapperCrdt<S>).dispatchStrongResetEvent(timestamp);
    }
}

export class StrongResetWrapperCrdt<S extends Object | null = Object | null> extends SemidirectProduct<S> implements AllAble {
    private strongResetComponent!: StrongResetComponent<S>;
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

    setupStrongReset(targetCrdt: Crdt<S> & HardResettable) {
        this.strongResetComponent = new StrongResetComponent(
            this, this.id + "_comp", targetCrdt
        );
        super.setup(
            targetCrdt, this.strongResetComponent,
            this.action.bind(this), targetCrdt.state
        );
    }

    action(
        _m2TargetPath: string[],
        _m2Timestamp: CausalTimestamp | null,
        _m2Message: Uint8Array,
        _m1TargetPath: string[],
        _m1Timestamp: CausalTimestamp,
        _m1Message: Uint8Array
    ): [string[], Uint8Array] | null {
        // The action converts every message to the identity
        return null;
    }

    dispatchStrongResetEvent(timestamp: CausalTimestamp) {
        this.dispatchEvent({
            caller: this,
            type: "StrongReset",
            timestamp: timestamp
        });
    }

    strongReset() {
        this.strongResetComponent.strongResetTarget();
    }

    /**
     * Defers (non-strong) reset() operations to the target Crdt.
     * Note that the target Crdt may not actually be Resettable,
     * in which case this will throw an error.
     * This method is implemented for the sake of AddAbilitiesViaChildren,
     * which calls reset() on all children of a Crdt; targetCrdt's wrapped with
     * this class will have this class as the parent's child instead of
     * targetCrdt, so we need to handle those reset() calls.
     */
    reset() {
        if (isResettable(this.strongResetComponent.targetCrdt)) {
            this.strongResetComponent.targetCrdt.reset();
        }
        else throw new Error(
            "reset() called on StrongResetWrapperCrdt, but the " +
            "original (wrapped) Crdt is not Resettable"
        );
    }

    /**
     * Defers OutOfOrder receipt handling to the target Crdt.
     * Note that the target Crdt may not actually be OutOfOrderAble,
     * in which case this will throw an error.
     * OutOfOrderAble is not supported for strongReset() operations and
     * will cause an error.
     */
    receiveOutOfOrder(targetPath: string[], timestamp: CausalTimestamp, message: Uint8Array): void {
        let child = this.children.get(targetPath[targetPath.length - 1]);
        if (child === undefined) {
            throw new Error("Unknown child: " + targetPath[targetPath.length - 1] +
                    " in: " + JSON.stringify(targetPath) + ", children: " + JSON.stringify([...this.children.keys()]));
        }
        if (child === this.strongResetComponent) {
            throw new Error(
                "OutOfOrderAble is not supported for strongReset()" +
                " operations added by StrongResetWrapperCrdt"
            );
        }
        if (!isOutOfOrderAble(child)) {
            throw new Error(
                "receiveOutOfOrder() called on StrongResetWrapperCrdt, but the " +
                "original (wrapped) Crdt is not OutOfOrderAble"
            );
        }
        targetPath.length--;
        child.receiveOutOfOrder(
            targetPath, timestamp, message
        );
    }
}
