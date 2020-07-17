import { CausalTimestamp } from "../crdt_runtime_interface";
import { CrdtInternal } from "./crdt_core";

// TODO: future opts: indexed messages; setting the history
// to a subset; causal stability.
// TODO: for this to work, replicaId's must be comparable according
// to the same-equals approach.  Typically, this requires them
// to be primitive types, as objects which are equal-valued but have
// different pointers will be considered different.
// TODO: mention that to get a proper CRDT (equal internal states),
// we technically must compare receipt orders as equivalent if
// they are both in causal order.
export class SemidirectState<S> {
    /**
     * Maps a replica id to an array of messages sent by that
     * replica, in order.  Specifically, array elements are tuples
     * [per-sender message counter, this replica's receipt counter,
     * message].  Keep in mind that per-sender message
     * counters may not be contiguous, since they are shared between
     * all Crdts with a given CrdtRuntime and between
     * a semidirect product and its components.
     */
    private receiptCounter = 0;
    private history: Map<any, Array<[number, number, any]>> = new Map();
    constructor(public internalState: S,
        public readonly historyTimestamps: boolean,
        public readonly historyDiscard1Dominated: boolean,
        public readonly historyDiscard2Dominated: boolean) { }
    /**
     * Add message to the history with the given timestamp.
     * Timestamp may be undefined, indicating that this message
     * is by the current replica, hence is causally greater than all
     * causally prior elements.  replicaId is our replica id.
     */
    add(replicaId: any, message: any, timestamp: CausalTimestamp) {
        if (this.historyDiscard2Dominated) {
            this.processTimestamp(replicaId, timestamp, false, true);
        }
        let senderHistory = this.history.get(timestamp.getSender());
        if (senderHistory === undefined) {
            senderHistory = [];
            this.history.set(timestamp.getSender(), senderHistory);
        }
        let messageMaybeWithTimestamp = this.historyTimestamps?
                [message, timestamp]: message;
        senderHistory.push([timestamp.getSenderCounter(), this.receiptCounter, messageMaybeWithTimestamp]);
        this.receiptCounter++;
    }

    /**
     * Return all messages in the history concurrent to the given
     * timestamp, in some causal order (specifically, this replica's
     * receipt order).  If we are the sender (i.e., replicaId ===
     * timestamp.getSender()), it is assumed that the timestamp is
     * causally greater than all prior messages, as described in
     * CrdtInternal.effect, hence [] is returned.
     */
    getConcurrent(replicaId: any, timestamp: CausalTimestamp): Array<any> {
        return this.processTimestamp(replicaId, timestamp, true,
            this.historyDiscard1Dominated);
    }

    /**
     * Performs specified actions on all messages in the history:
     * - if returnConcurrent is true, returns the list of
     * all messages in the history concurrent to timestamp, in
     * receipt order.
     * - if discardDominated is true, deletes all messages from
     * the history whose timestamps are causally dominated by
     * or equal to the given timestamp.  (Note that this means that
     * if we want to keep a message with the given timestamp in
     * the history, it must be added to the history after calling
     * this method.)
     */
    private processTimestamp(replicaId: any,
            timestamp: CausalTimestamp, returnConcurrent: boolean,
            discardDominated: boolean): Array<any> {
        if (replicaId === timestamp.getSender()) {
            if (discardDominated) {
                // Nothing's concurrent, so clear everything
                this.history.clear();
            }
            return [];
        }
        // Gather up the concurrent messages.  These are all
        // messages by each replicaId with sender counter
        // greater than timestamp.asVectorClock().get(replicaId).
        let concurrent: Array<[number, number, any]> = [];
        let vc = timestamp.asVectorClock();
        for (let entry of vc.entries()) {
            let senderHistory = this.history.get(entry[0]);
            if (senderHistory !== undefined) {
                let concurrentIndexStart =
                    SemidirectState.indexAfter(senderHistory, entry[1]);
                if (returnConcurrent) {
                    for (let i = concurrentIndexStart; i < senderHistory.length; i++) {
                        concurrent.push(senderHistory[i]);
                    }
                }
                if (discardDominated) {
                    // Keep only the messages with index
                    // >= concurrentIndexStart
                    senderHistory.splice(0, concurrentIndexStart);
                    // TODO: delete it from the map if empty,
                    // as a form of garbage collection.
                    // This also makes isHistoryEmpty simpler.
                }
            }
        }
        if (returnConcurrent) {
            // Sort the concurrent messages in receipt order (i.e.,
            // by the second entry in each triple).
            concurrent.sort((a, b) => (a[1] - b[1]));
            // Strip away everything except the messages.
            return concurrent.map(a => a[2]);
        }
        else return [];
    }

    /**
     * Returns true if there are no messages stored in the history,
     * i.e., either there have been no crd1 messages, or
     * our SemidirectInternal's historyKeepOnlyConcurrent flag is true
     * and all crdt1 messages have been causally less than a crdt2
     * message.
     */
    isHistoryEmpty(): boolean {
        for (let value of this.history.values()) {
            if (value.length !== 0) return false;
        }
        return true;
    }

    /**
     * Utility method for working with the per-sender history
     * arrays.  Returns the index after the last entry whose
     * per-sender counter (the first tuple element) is <=
     * value.
     */
    private static indexAfter(sparseArray: Array<[number, number, any]>,
            value: number): number {
        // TODO: binary search when sparseArray is large
        // Note that there may be duplicate timestamps.
        // So it would be inappropriate to find an entry whose
        // per-sender counter equals value and infer that
        // the desired index is 1 greater.
        for (let i = 0; i < sparseArray.length; i++) {
            if (sparseArray[i][0] > value) return i;
        }
        return sparseArray.length;
    }
}

export class SemidirectInternal<S> implements CrdtInternal<SemidirectState<S>> {
    /**
     * CrdtInternal implementing the semidirect product of
     * crdt1 and crdt2 with the given action, which is a function
     * (m2: crdt2 message, m1: crdt1 message): crdt1 message.
     * crdt1, crdt2, and action must satisfy the semidirect product
     * assumptions from our paper.
     *
     * TODO: options and their theoretical significance.  Formally,
     * historyTimestamps = true means that timestamps become
     * part of the crdt2 messages.  Also createCrdtIndex.
     * Dominated stats control whether you discard messages in the
     * history that are causally dominated by crdt1/crdt2 messages;
     * need to ensure that action is the same with those messages
     * discarded.  If dominated1 is set, then state.isHistoryEmpty()
     * becomes (there exists a crdt2 message not causally dominated by a
     * crdt1 message).  Check this is still true if dominated2 is set.)
     * Explain examples where this is used (resettable, flags); it's
     * not quite in the semidirect product spirit unless you think
     * of it as using the history as part of the crdt1/2 state.
     * Potential optimization: only delete dominated messages when
     * receiving our own message (it's basically free and always
     * clears the history), or only sometimes (will miss some
     * messages, so need to ensure correctness in that case
     * (I think it is okay for dominated2 but not dominated1 in our
     * target use cases), but
     * should be more efficient due to batching and still kill
     * off most messages).  This trades a small increase in space
     * usage for a decrease in CPU time.
     *
     * As described in CrdtInternal and Crdt, null messages are treated
     * as the identity function id, allowing them to be optimized away.
     * Because of this, action will never be called with null as
     * either input.  Instead, we behave as if
     * (action(id (i.e., null), m1) = m1)
     * for all m1 and (action(m2, id) = id) for all m2.  The semidirect
     * product assumptions must hold given these assignments.
     */
    constructor(public readonly crdt1: CrdtInternal<S>,
        public readonly crdt2: CrdtInternal<S>,
        public readonly action: (m2: any, m1: any) => any,
        public readonly createCrdtIndex: number,
        public readonly historyTimestamps = false,
        public readonly historyDiscard1Dominated = false,
        public readonly historyDiscard2Dominated = false) {
            if (createCrdtIndex !== 1 && createCrdtIndex !== 2) {
                throw new Error("Bad createCrdtIndex (must be 1 or 2):" +
                        createCrdtIndex);
            }
        }
    /**
     * @param  initialData Initial data used to initialize this.crdt1.
     * @return
     */
    create(initialData: any): SemidirectState<S> {
        let internalState: S;
        if (this.createCrdtIndex === 1) internalState = this.crdt1.create(initialData);
        else internalState = this.crdt2.create(initialData);
        return new SemidirectState(internalState,
            this.historyTimestamps, this.historyDiscard1Dominated,
            this.historyDiscard2Dominated);
    }
    /**
     * Operation/message format: [crdt number (1 or 2),
     * operation/message for that crdt].  An exception is if
     * the internal crdt returns a null message, in which case
     * we just return null, not [1, null] or [2, null].  This
     * allows the Crdt class to optimize away sending the
     * message.
     *
     * TODO (general): error checking
     */
    prepare(operation: [number, any], state: SemidirectState<S>,
            replicaId: any): [number, any] | null {
        if (operation[0] === 1) {
            let op1 = this.crdt1.prepare(operation[1], state.internalState, replicaId);
            if (op1 === null) return null;
            else return [1, op1];
        }
        else {
            let op2 = this.crdt2.prepare(operation[1], state.internalState, replicaId);
            if (op2 === null) return null;
            else return [2, op2];
        }
    }
    /**
     * Message/descrption format: [crdt number (1 or 2),
     * message for/description from that crdt].  For this.crdt1
     * messages, the description is for the acted-on message that
     * is actually applied to this.internalState, not the input
     * message.  An exception is if the description from the internal
     * crdt is null (or if the message gets acted on to become null),
     * the returned description is just null, not [1, null] or [2, null].
     * This allows the Crdt class to optimize away calling onchange.
     */
    effect(message: [number, any], state: SemidirectState<S>, replicaId: any, timestamp: CausalTimestamp): [SemidirectState<S>, [number, any] | null] {
        if (message[0] === 2) {
            let result = this.crdt2.effect(message[1], state.internalState, replicaId, timestamp);
            state.internalState = result[0];
            state.add(replicaId, message[1], timestamp);
            if (result[1] === null) return [state, null];
            else return [state, [2, result[1]]];
        }
        else {
            let concurrent = state.getConcurrent(replicaId, timestamp);
            let mAct = message[1];
            for (let i = 0; i < concurrent.length; i++) {
                mAct = this.action(concurrent[i], mAct);
                if (mAct === null) return [state, null];
            }
            let result = this.crdt1.effect(mAct, state.internalState,
                replicaId, timestamp);
            state.internalState = result[0];
            if (result[1] === null) return [state, null];
            else return [state, [1, result[1]]];
        }
    }
}


export class DirectInternal<S> implements CrdtInternal<S> {
    /**
     * Direct product of CrdtInternal's.  This is the
     * special case of SemidirectInternal when the action is trivial
     * ((m_2, m1) => m1).  In this case we can optimize
     * by not keeping the history or acting on messages.
     *
     * For this to be a Crdt, concurrent messages of the two input
     * Crdts must commute.
     *
     * Note this construction is symmetric (switching crdt1 and
     * crdt2 doesn't change the semantics), except for swapping
     * the meaning of the numbers 1/2 in createCrdtIndex and
     * in the first coordinates of messages and operations.
     *
     * @param createCrdtIndex Which crdt's create method to use
     * in create.
     */
    constructor(public readonly crdt1: CrdtInternal<S>,
            public readonly crdt2: CrdtInternal<S>,
            public readonly createCrdtIndex: number) {
        if (createCrdtIndex !== 1 && createCrdtIndex !== 2) {
            throw new Error("Bad createCrdtIndex (must be 1 or 2):" +
                    createCrdtIndex);
        }
    }
    /**
     * @param  initialData Initial data used to initialize this.crdt1.
     * @return
     */
    create(initialData: any): S {
        if (this.createCrdtIndex === 1) return this.crdt1.create(initialData);
        else return this.crdt2.create(initialData);
    }
    /**
     * Operation/message format: [crdt number (1 or 2),
     * operation/message for that crdt].  An exception is if
     * the internal crdt returns a null message, in which case
     * we just return null, not [1, null] or [2, null].  This
     * allows the Crdt class to optimize away sending the
     * message.
     */
    prepare(operation: [number, any], state: S,
            replicaId: any): [number, any] | null {
        let message: any;
        switch (operation[0]) {
            case 1:
                message = this.crdt1.prepare(operation[1], state, replicaId);
                break;
            case 2:
                message = this.crdt2.prepare(operation[1], state, replicaId);
                break;
            default:
                throw new Error("Bad crdt number in operation: " + operation);
        }
        if (message == null) return null;
        else return [operation[0], message];
    }
    /**
     * Message/descrption format: [crdt number (1 or 2),
     * message for/description from that crdt].
     * An exception is if the description from the internal
     * crdt is null,
     * the returned description is just null, not [1, null] or [2, null].
     * This allows the Crdt class to optimize away calling onchange.
     * TODO: perhaps add translating descriptions to this class, so
     * the Crdt doesn't have to understand all of the layers at
     * once?
     */
    effect(message: [number, any], state: S, replicaId: any, timestamp: CausalTimestamp): [S, [number, any] | null] {
        let result: [S, any];
        switch (message[0]) {
            case 1:
                result = this.crdt1.effect(message[1], state, replicaId, timestamp);
                break;
            case 2:
                result = this.crdt2.effect(message[1], state, replicaId, timestamp);
                break;
            default:
                throw new Error("Bad crdt number in message: " + message);
        }
        if (result[1] === null) return [result[0], null];
        else return [result[0], [message[0], result[1]]];
    }
}
