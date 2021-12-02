// import {
//   ISemidirectProductSenderHistory,
//   SemidirectProductSave,
// } from "../../generated/proto_compiled";
// import {
//   MessageMeta,
//   Crdt,
//   CrdtEventsRecord,
//   Runtime,
//   InitToken,
//   Pre,
// } from "../core";
//
// // TODO: revise this file.
// // In particular, separate out resettable version?
// // (Currently has weird conditional types.)
// // Better yet, move that to resettable.ts
//
// class StoredMessage {
//   constructor(
//     readonly senderCounter: number,
//     readonly receiptCounter: number,
//     readonly targetPath: string[],
//     readonly meta: MessageMeta | null,
//     readonly message: Uint8Array
//   ) {}
// }
//
// // TODO: future opts: indexed messages; setting the history
// // to a subset; causal stability.
// // TODO: for this to work, replicaId's must be comparable according
// // to the same-equals approach.  Typically, this requires them
// // to be primitive types, as objects which are equal-valued but have
// // different pointers will be considered different.
// // TODO: mention that to get a proper CRDT (equal internal states),
// // we technically must compare receipt orders as equivalent if
// // they are both in causal order.
// export class SemidirectState<S extends object> {
//   protected receiptCounter = 0;
//   /**
//    * Maps a replica id to an array of messages sent by that
//    * replica, in order.  Keep in mind that per-sender message
//    * counters may not be contiguous, since they are shared between
//    * all Crdts with a given root.
//    */
//   protected history: Map<string, Array<StoredMessage>> = new Map();
//   public internalState!: S;
//   constructor(
//     private readonly historyTimestamps: boolean,
//     private readonly historyDiscard1Dominated: boolean,
//     private readonly historyDiscard2Dominated: boolean
//   ) {}
//   /**
//    * Add message to the history with the given meta.
//    * replicaId is our replica id.
//    */
//   add(
//     replicaId: string,
//     targetPath: string[],
//     meta: MessageMeta,
//     message: Uint8Array
//   ) {
//     if (this.historyDiscard2Dominated) {
//       this.processTimestamp(replicaId, meta, false, true);
//     }
//     let senderHistory = this.history.get(meta.sender);
//     if (senderHistory === undefined) {
//       senderHistory = [];
//       this.history.set(meta.sender, senderHistory);
//     }
//     senderHistory.push(
//       new StoredMessage(
//         meta.senderCounter,
//         this.receiptCounter,
//         targetPath,
//         this.historyTimestamps ? meta : null,
//         message
//       )
//     );
//     this.receiptCounter++;
//   }
//
//   /**
//    * Return all messages in the history concurrent to the given
//    * meta, in some causal order (specifically, this replica's
//    * receipt order).  If we are the sender (i.e., replicaId ===
//    * meta.sender), it is assumed that the meta is
//    * causally greater than all prior messages, hence [] is returned.
//    */
//   getConcurrent(replicaId: string, meta: MessageMeta) {
//     return this.processTimestamp(
//       replicaId,
//       meta,
//       true,
//       this.historyDiscard1Dominated
//     );
//   }
//
//   /**
//    * Performs specified actions on all messages in the history:
//    * - if returnConcurrent is true, returns the list of
//    * all messages in the history concurrent to meta, in
//    * receipt order.
//    * - if discardDominated is true, deletes all messages from
//    * the history whose metas are causally dominated by
//    * or equal to the given meta.  (Note that this means that
//    * if we want to keep a message with the given meta in
//    * the history, it must be added to the history after calling
//    * this method.)
//    */
//   private processTimestamp(
//     replicaId: string,
//     meta: MessageMeta,
//     returnConcurrent: boolean,
//     discardDominated: boolean
//   ) {
//     if (replicaId === meta.sender) {
//       if (discardDominated) {
//         // Nothing's concurrent, so clear everything
//         this.history.clear();
//       }
//       return [];
//     }
//     // Gather up the concurrent messages.  These are all
//     // messages by each replicaId with sender counter
//     // greater than meta.vectorClock!.get(replicaId).
//     let concurrent: Array<StoredMessage> = [];
//     let vc = meta.vectorClock!;
//     for (let historyEntry of this.history.entries()) {
//       let senderHistory = historyEntry[1];
//       let vcEntry = vc.get(historyEntry[0]);
//       if (vcEntry === undefined) vcEntry = -1;
//       if (senderHistory !== undefined) {
//         let concurrentIndexStart = SemidirectState.indexAfter(
//           senderHistory,
//           vcEntry
//         );
//         if (returnConcurrent) {
//           for (let i = concurrentIndexStart; i < senderHistory.length; i++) {
//             concurrent.push(senderHistory[i]);
//           }
//         }
//         if (discardDominated) {
//           // Keep only the messages with index
//           // >= concurrentIndexStart
//           senderHistory.splice(0, concurrentIndexStart);
//           // TODO: delete it from the map if empty,
//           // as a form of garbage collection.
//           // This also makes isHistoryEmpty simpler.
//         }
//       }
//     }
//     if (returnConcurrent) {
//       // Sort the concurrent messages in receipt order.
//       concurrent.sort((a, b) => a.receiptCounter - b.receiptCounter);
//       // Strip away everything except the messages.
//       return concurrent;
//     } else return [];
//   }
//
//   /**
//    * Returns true if there are no messages stored in the history,
//    * i.e., either there have been no crd1 messages, or
//    * our SemidirectInternal's historyKeepOnlyConcurrent flag is true
//    * and all crdt1 messages have been causally less than a crdt2
//    * message.
//    */
//   isHistoryEmpty(): boolean {
//     for (let value of this.history.values()) {
//       if (value.length !== 0) return false;
//     }
//     return true;
//   }
//
//   /**
//    * Utility method for working with the per-sender history
//    * arrays.  Returns the index after the last entry whose
//    * per-sender counter (the first tuple element) is <=
//    * value.
//    */
//   private static indexAfter(
//     sparseArray: Array<StoredMessage>,
//     value: number
//   ): number {
//     // TODO: binary search when sparseArray is large
//     // Note that there may be duplicate metas.
//     // So it would be inappropriate to find an entry whose
//     // per-sender counter equals value and infer that
//     // the desired index is 1 greater.
//     for (let i = sparseArray.length - 1; i >= 0; i--) {
//       if (sparseArray[i].senderCounter <= value) return i + 1;
//     }
//     return 0;
//   }
//
//   save(runtime: Runtime): Uint8Array {
//     const historySave: { [sender: string]: ISemidirectProductSenderHistory } =
//       {};
//     for (const [sender, messages] of this.history) {
//       historySave[sender] = {
//         messages: messages.map((message) => {
//           return {
//             senderCounter: message.senderCounter,
//             receiptCounter: message.receiptCounter,
//             targetPath: message.targetPath,
//             meta: this.historyTimestamps
//               ? runtime.metaSerializer.serialize(message.meta!)
//               : null,
//             message: message.message,
//           };
//         }),
//       };
//     }
//     const saveMessage = SemidirectProductSave.create({
//       receiptCounter: this.receiptCounter,
//       history: historySave,
//     });
//     return SemidirectProductSave.encode(saveMessage).finish();
//   }
//
//   load(saveData: Uint8Array, runtime: Runtime) {
//     const saveMessage = SemidirectProductSave.decode(saveData);
//     this.receiptCounter = saveMessage.receiptCounter;
//     for (const [sender, messages] of Object.entries(saveMessage.history)) {
//       this.history.set(
//         sender,
//         messages.messages!.map(
//           (message) =>
//             new StoredMessage(
//               message.senderCounter,
//               message.receiptCounter,
//               message.targetPath!,
//               this.historyTimestamps
//                 ? runtime.metaSerializer.deserialize(
//                     message.meta!,
//                     runtime
//                   )
//                 : null,
//               message.message
//             )
//         )
//       );
//     }
//   }
// }
//
// /**
//  * Interface describing a Crdt which stores all of its mutable state
//  * in a single readonly variable state of type S.
//  *
//  * Such a Crdt must continue
//  * to function after state is mutated or even replaced (ignoring state's
//  * readonly property) as if it had changed state itself.
//  *
//  * This interace is used by SemidirectProduct, which composes two
//  * StatefulCrdt's of the same type, unifying their states by setting
//  * both state variables equal to the same value.  Note that
//  * SemidirectProduct ignores the readonly property during
//  * init, possibly overwriting state with a different instance
//  * of S.
//  *
//  * @param S the state type.  S is forced to extend object
//  * because state is meant to be mutated in-place, since
//  * it is readonly.  Immutable primitive types (e.g., number)
//  * should be wrapped in an object.
//  */
// export interface StatefulCrdt<S extends object> extends Crdt {
//   /**
//    * Not for use outside of this (treat as protected).
//    */
//   readonly state: S;
// }
//
// export abstract class SemidirectProduct<
//     S extends object,
//     Events extends CrdtEventsRecord = CrdtEventsRecord
//   >
//   extends Crdt<Events>
//   implements StatefulCrdt<SemidirectState<S>>
// {
//   static readonly crdt1Name = "1";
//   static readonly crdt2Name = "2";
//
//   readonly state: SemidirectState<S>;
//   /**
//    * TODO
//    * @param historyTimestamps=false        [description]
//    * @param historyDiscard1Dominated=false [description]
//    * @param historyDiscard2Dominated=false [description]
//    */
//   constructor(
//     initToken: InitToken,
//     historyTimestamps = false,
//     historyDiscard1Dominated = false,
//     historyDiscard2Dominated = false
//   ) {
//     super(initToken);
//     // Types are hacked a bit here to make implementation simpler
//     this.state = new SemidirectState(
//       historyTimestamps,
//       historyDiscard1Dominated,
//       historyDiscard2Dominated
//     );
//   }
//
//   protected crdt1!: StatefulCrdt<S>;
//   protected crdt2!: StatefulCrdt<S>;
//
//   /**
//    * TODO
//    * @param  m2TargetPath [description]
//    * @param  m2Timestamp  [description]
//    * @param  m2Message    [description]
//    * @param  m1TargetPath [description]
//    * @param  m1Timestamp  [description]
//    * @param  m1Message    [description]
//    * @return              [description]
//    */
//   protected abstract action(
//     m2TargetPath: string[],
//     m2Timestamp: MessageMeta | null,
//     m2Message: Uint8Array,
//     m1TargetPath: string[],
//     m1Timestamp: MessageMeta,
//     m1Message: Uint8Array
//   ): { m1TargetPath: string[]; m1Message: Uint8Array } | null;
//
//   // TODO: move setup into constructor?  Then we don't have to worry about
//   // it being called after init.  But then it's annoying to pass
//   // this to the children (as was done in ResetWrapperCrdt).
//   protected setup<C1 extends StatefulCrdt<S>, C2 extends StatefulCrdt<S>>(
//     preCrdt1: Pre<C1>,
//     preCrdt2: Pre<C2>,
//     initialState: S
//   ): [C1, C2] {
//     const crdt1 = preCrdt1(
//       new InitToken(SemidirectProduct.crdt1Name, this)
//     );
//     const crdt2 = preCrdt2(
//       new InitToken(SemidirectProduct.crdt2Name, this)
//     );
//     this.state.internalState = initialState;
//     this.crdt1 = crdt1;
//     this.crdt2 = crdt2;
//     // @ts-ignore Ignore readonly
//     crdt1.state = initialState;
//     // @ts-ignore Ignore readonly
//     crdt2.state = initialState;
//     return [crdt1, crdt2];
//   }
//
//   // TODO: errors if setup is not called exactly once?
//
//   protected receiveInternal(
//     targetPath: string[],
//     meta: MessageMeta,
//     message: Uint8Array
//   ) {
//     if (targetPath.length === 0) {
//       // We are the target
//       throw new Error("TODO");
//     }
//     switch (targetPath[targetPath.length - 1]) {
//       case SemidirectProduct.crdt2Name:
//         targetPath.length--;
//         this.state.add(
//           this.runtime.replicaId,
//           targetPath.slice(),
//           meta,
//           message
//         );
//         this.crdt2.receive(targetPath, meta, message);
//         break;
//       case SemidirectProduct.crdt1Name:
//         targetPath.length--;
//         let concurrent = this.state.getConcurrent(
//           this.runtime.replicaId,
//           meta
//         );
//         let mAct = {
//           m1TargetPath: targetPath,
//           m1Message: message,
//         };
//         for (let i = 0; i < concurrent.length; i++) {
//           // TODO: can we avoid serializing and
//           // deserializing each time?  Like
//           // with ResetComponent.
//           let mActOrNull = this.action(
//             concurrent[i].targetPath,
//             concurrent[i].meta,
//             concurrent[i].message,
//             mAct.m1TargetPath,
//             meta,
//             mAct.m1Message
//           );
//           if (mActOrNull === null) return;
//           else mAct = mActOrNull;
//         }
//         this.crdt1.receive(mAct.m1TargetPath, meta, mAct.m1Message);
//         break;
//       default:
//         // TODO: deliver error somewhere reasonable
//         throw new Error(
//           "Unknown SemidirectProduct child: " +
//             targetPath[targetPath.length - 1] +
//             " in: " +
//             JSON.stringify(targetPath)
//         );
//     }
//   }
//
//   getChild(name: string): Crdt {
//     switch (name) {
//       case SemidirectProduct.crdt1Name:
//         return this.crdt1;
//       case SemidirectProduct.crdt2Name:
//         return this.crdt2;
//       default:
//         throw new Error("Unknown child: " + name + " in SemidirectProduct");
//     }
//   }
//
//   canGc(): boolean {
//     // TODO: this may spuriously return false if one of the Crdt's is not
//     // in its initial state only because we overwrote that state with
//     // the semidirect initial state.  Although, for our Crdt's so far
//     // (e.g CNumber), it ends up working because they check canGC()
//     // by asking the state if it is in its initial state.
//     return (
//       this.state.isHistoryEmpty() && this.crdt1.canGc() && this.crdt2.canGc()
//     );
//   }
//
//   save(): [saveData: Uint8Array, children: Map<string, Crdt>] {
//     return [
//       this.state.save(this.runtime),
//       new Map([
//         [SemidirectProduct.crdt1Name, this.crdt1],
//         [SemidirectProduct.crdt2Name, this.crdt2],
//       ]),
//     ];
//   }
//
//   // TODO: the children loading their own states (both
//   // of them, in arbitrary order) must correctly set
//   // this.internalState, whatever it is.
//   // Need option to do custom loading if that's not the
//   // case.
//   load(saveData: Uint8Array): boolean {
//     this.state.load(saveData, this.runtime);
//     return true;
//   }
// }
