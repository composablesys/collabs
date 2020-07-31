// import { CausalTimestamp } from "../crdt_runtime_interface";
// import { CrdtInternal } from "./crdt_core";
//
// /**
//  * Represents a family of CrdtInternal's with index set I,
//  * totally ordered by compare.
//  */
// export interface CrdtInternalFamily<I, S> {
//     create(initialData?: any): S;
//     prepare(index: I, operation: any, state: S, replicaId: any): any;
//     effect(index: I, message: any, state: S, replicaId: any, timestamp: CausalTimestamp): [S, any];
//     /**
//      * @return < 0 if index1 < index2, 0 if equal, > 0 if index1 >
//      * index2.
//      */
//     compare(index1: I, index2: I): number;
//     /**
//      * @return True if index is the minimum index (<= all other
//      * indices), hence we don't know to store corresponding messages
//      * for future actions.
//      */
//     isMinimum(index: I): boolean;
// }
//
// class DefaultCrdtInternalFamily<S> implements CrdtInternalFamily<number, S> {
//     readonly crdts: CrdtInternal<S>[];
//     /**
//      * Creates a CrdtInternalFamily with the given crdts, which
//      * have indices and arbitration order 1 < 2 < ...
//      * Note we 1-index to conform to the paper and the 2-input
//      * case.
//      */
//     constructor(public readonly createCrdtIndex: number, ...crdts: CrdtInternal<S>[]) {
//         if (createCrdtIndex < 1 || createCrdtIndex > crdts.length) {
//             throw new Error("Bad createCrdtIndex (must be in [1, crdts.length]):" +
//                     createCrdtIndex);
//         }
//         this.crdts = crdts;
//     }
//     create(initialData?: any): S {
//         return this.crdts[this.createCrdtIndex - 1].create(initialData);
//     }
//     prepare(index: number, operation: any, state: S, replicaId: any) {
//         return this.crdts[index].prepare(operation, state, replicaId);
//     }
//     effect(index: number, message: any, state: S, replicaId: any, timestamp: CausalTimestamp): [S, any] {
//         return this.crdts[index].effect(message, state, replicaId, timestamp);
//     }
//     compare(index1: number, index2: number): number {
//         return index1 - index2;
//     }
//     isMinimum(index: number): boolean {
//         return (index === 1);
//     }
// }
//
// class CachedNormalForm<I> {
//     constructor(public normalForm: any, public readonly index: I,
//             public cachedTime: number) { }
// }
//
// // TODO: future opts: indexed messages; setting the history
// // to a subset; causal stability.
// // TODO: for this to work, replicaId's must be comparable according
// // to the same-equals approach.  Typically, this requires them
// // to be primitive types, as objects which are equal-valued but have
// // different pointers will be considered different.
// // TODO: mention that to get a proper CRDT (equal internal states),
// // we have to take into account the equivalences described
// // the paper and also compare receipt counters as causal orders only.
// export class MultiSemidirectState<I, S> {
//     constructor(public internalState: S) { }
//     receiptCounter = 0;
//     /**
//      * Maps an index followed by a replica id to an array of
//      * messages sent by that replica with that index, in order.
//      * Specifically, array elements are tuples
//      * [per-sender message counter, this replica's receipt counter,
//      * message].  Keep in mind that per-sender message
//      * counters may not be contiguous, since they are shared between
//      * all Crdts with a given CrdtRuntime and between
//      * a semidirect product and its components.
//      *
//      * TODO: sort by indices, so we can go top down?
//      */
//     normalForms: Map<I, Map<any, Array<[number, number, CachedNormalForm<I>]>>> = new Map();
//     /**
//      * Maps from a receiptCounter value to the (message, index)
//      * pair received at that receipt counter.
//      */
//     appliedForms: Array<[any, I]> = [];
// }
//
// export class MultiSemidirectInternal<I, S> implements CrdtInternal<MultiSemidirectState<I, S>> {
//     /**
//      * TODO: update for multi.
//      *
//      * CrdtInternal implementing the semidirect product of
//      * crdt1 and crdt2 with the given action, which is a function
//      * (m2: crdt2 message, m1: crdt1 message): crdt1 message.
//      * crdt1, crdt2, and action must satisfy the semidirect product
//      * assumptions from our paper.
//      *
//      * TODO: options and their theoretical significance.  Formally,
//      * historyTimestamps = true means that timestamps become
//      * part of the crdt2 messages.  Also createCrdtIndex.
//      * Dominated stats control whether you discard messages in the
//      * history that are causally dominated by crdt1/crdt2 messages;
//      * need to ensure that action is the same with those messages
//      * discarded.  If dominated1 is set, then state.isHistoryEmpty()
//      * becomes (there exists a crdt2 message not causally dominated by a
//      * crdt1 message).  Check this is still true if dominated2 is set.)
//      * Explain examples where this is used (resettable, flags); it's
//      * not quite in the semidirect product spirit unless you think
//      * of it as using the history as part of the crdt1/2 state.
//      * Potential optimization: only delete dominated messages when
//      * receiving our own message (it's basically free and always
//      * clears the history), or only sometimes (will miss some
//      * messages, so need to ensure correctness in that case
//      * (I think it is okay for dominated2 but not dominated1 in our
//      * target use cases), but
//      * should be more efficient due to batching and still kill
//      * off most messages).  This trades a small increase in space
//      * usage for a decrease in CPU time.
//      *
//      * As described in CrdtInternal and Crdt, null messages are treated
//      * as the identity function id, allowing them to be optimized away.
//      * Because of this, action will never be called with null as
//      * either input.  Instead, we behave as if
//      * (action(id (i.e., null), m1) = m1)
//      * for all m1 and (action(m2, id) = id) for all m2.  The semidirect
//      * product assumptions must hold given these assignments.
//      */
//     constructor(public readonly family: CrdtInternalFamily<I, S>,
//         public readonly action: (m2: any, index2: I, m1: any, index1: any) => any) {
//         }
//     /**
//      * @param  initialData Initial data used to initialize this.crdt1.
//      * @return
//      */
//     create(initialData?: any): MultiSemidirectState<I, S> {
//         return new MultiSemidirectState(this.family.create(initialData));
//     }
//     /**
//      * Operation/message format: [crdt index,
//      * operation/message for that crdt].  An exception is if
//      * the internal crdt returns a null message, in which case
//      * we just return null, not [index, null].  This
//      * allows the Crdt class to optimize away sending the
//      * message.
//      *
//      * TODO (general): error checking
//      */
//     prepare(operation: [I, any], state: MultiSemidirectState<I, S>,
//             replicaId: any): [I, any] | null {
//         let message = this.family.prepare(operation[0], operation[1],
//                 state.internalState, replicaId);
//         if (message === null) return null;
//         else return [operation[0], message];
//     }
//     /**
//      * Message/descrption format: [crdt index,
//      * message for/description from that crdt].
//      * The description is for the acted-on message that
//      * is actually applied to this.internalState, not the input
//      * message.  An exception is if the description from the internal
//      * crdt is null (or if the message gets acted on to become null),
//      * the returned description is just null, not [index, null].
//      * This allows the Crdt class to optimize away calling onchange.
//      */
//     effect(message: [I, any], state: MultiSemidirectState<I, S>, replicaId: any, timestamp: CausalTimestamp): [MultiSemidirectState<I, S>, [I, any] | null] {
//         // 1. Act on the message to get mAct.  Note this
//         // may update the cached normal forms in state even
//         // if nothing else happens.
//         let index = message[0];
//         let mAct = this.act(index, message[1], state, replicaId, timestamp);
//         if (mAct === null) return [state, null];
//         // 2. Add mAct to the history.
//         this.addToHistory(index, mAct, state, timestamp);
//         // 3. Act on the state and return the description.
//         let result = this.family.effect(
//             index, mAct, state.internalState, replicaId, timestamp
//         );
//         state.internalState = result[0];
//         if (result[1] === null) return [state, null];
//         else return [state, [index, result[1]]];
//     }
//     /**
//      * Add message to the history with the given timestamp.
//      */
//     private addToHistory(
//         index: I, message: any, state: MultiSemidirectState<I, S>,
//         timestamp: CausalTimestamp
//     ) {
//         state.appliedForms[state.receiptCounter] = [message, index];
//         let indexHistory = state.normalForms.get(index);
//         if (indexHistory === undefined) {
//             indexHistory = new Map();
//             state.normalForms.set(index, indexHistory);
//         }
//         let senderHistory = indexHistory.get(timestamp.getSender());
//         if (senderHistory === undefined) {
//             senderHistory = [];
//             indexHistory.set(timestamp.getSender(), senderHistory);
//         }
//         senderHistory.push([timestamp.getSenderCounter(), state.receiptCounter, new CachedNormalForm(message, index, state.receiptCounter)]);
//         state.receiptCounter++;
//     }
//
//     /**
//      * Return the applied form of the given message.
//      * If we are the sender (i.e., replicaId ===
//      * timestamp.getSender()), it is assumed that the timestamp is
//      * causally greater than all prior messages, as described in
//      * CrdtInternal.effect, hence message is returned unchanged.
//      */
//     private act(
//         index: I, message: any, state: MultiSemidirectState<I, S>,
//         replicaId: any, timestamp: CausalTimestamp
//     ) {
//         if (replicaId === timestamp.getSender()) {
//             return message;
//         }
//         // Gather up the concurrent messages with greater
//         // index.  These are all
//         // messages by each replicaId with sender counter
//         // greater than timestamp.asVectorClock().get(replicaId).
//         let concurrent: Array<[number, number, any]> = [];
//         let vc = timestamp.asVectorClock();
//         // TODO: loop over indices top-down until no longer > index.
//         let concIndex: I = TODO;
//         let oneHistory! = this.normalForms.get(concIndex);
//         for (let entry of vc.entries()) {
//             let senderHistory = oneHistory.get(entry[0]);
//             if (senderHistory !== undefined) {
//                 let concurrentIndexStart =
//                     MultiSemidirectState.indexAfter(senderHistory, entry[1]);
//                 for (let i = concurrentIndexStart; i < senderHistory.length; i++) {
//                     this.updateNormalForm(senderHistory[i][2]);
//                     concurrent.push(senderHistory[i]);
//                 }
//             }
//         }
//         // Sort the concurrent messages in receipt order (i.e.,
//         // by the second entry in each triple).
//         // TODO: sort one index at a time.
//         concurrent.sort((a, b) => (a[1] - b[1]));
//         // TODO: might as well do the action directly here, to
//         // avoid copying the whole thing twice more.
//
//         // Strip away everything except the messages.
//         return concurrent.map(a => a[2]);
//
//         // let mAct = message[1];
//         // for (let i = 0; i < concurrent.length; i++) {
//         //     mAct = this.action(concurrent[i], mAct);
//         //     if (mAct === null) return [state, null];
//         // }
//     }
//
//     /**
//      * Normal form = act on cached normal form (initially
//      * the applied form) with applied forms of later-received
//      * messages (regardless of concurrency) with greater
//      * index.
//      */
//     private updateNormalForm(cached: CachedNormalForm<I>) {
//         for (let i = cached.cachedTime + 1; i < this.receiptCounter; i++) {
//             let [m2, index2] = this.appliedForms[i];
//             if (this.family.compare(cached.index, index2) < 0) {
//                 cached.normalForm = this.action(m2, index2, cached.normalForm, cached.index);
//             }
//         }
//     }
//
//     /**
//      * Utility method for working with the per-sender history
//      * arrays.  Returns the index after the last entry whose
//      * per-sender counter (the first tuple element) is <=
//      * value.
//      */
//     private static indexAfter(sparseArray: Array<[number, number, any]>,
//             value: number): number {
//         // TODO: binary search when sparseArray is large
//         // Note that there may be duplicate timestamps.
//         // So it would be inappropriate to find an entry whose
//         // per-sender counter equals value and infer that
//         // the desired index is 1 greater.
//         for (let i = 0; i < sparseArray.length; i++) {
//             if (sparseArray[i][0] > value) return i;
//         }
//         return sparseArray.length;
//     }
// }
