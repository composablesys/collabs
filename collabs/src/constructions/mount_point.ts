// import { CMountPointSave } from "../../generated/proto_compiled";
// import {
//   CausalTimestamp,
//   Crdt,
//   CrdtEventMeta,
//   CrdtEventsRecord,
//   CrdtInitToken,
//   Pre,
// } from "../core";
//
// export interface CMountPointEventsRecord extends CrdtEventsRecord {
//   /**
//    * Emitted at the end of a call to mount().
//    *
//    * Note this is not a CrdtEvent and has no associated
//    * timestamp, since calls to mount are local, not associated
//    * with a message.
//    */
//   Mount: {};
//   /**
//    * Emitted at the end of a call to unmount().
//    *
//    * Note this is not a CrdtEvent and has no associated
//    * timestamp, since calls to unmount are local, not associated
//    * with a message.
//    */
//   Unmount: {};
// }
//
// /**
//  * A wrapper around a Crdt that can be mounted and
//  * unmounted.  While unmounted, the wrapped Crdt cannot
//  * be used; messages received from other replicas are
//  * queued until the next time it is mounted.
//  *
//  * For example, the TODO subclass can be used to wrap
//  * individual documents in a Google Drive-style collaborative
//  * document system, so that they are not loaded into
//  * memory unless the local user is actively using them.
//  *
//  * For the purposes of eventual consistency, we regard
//  * this Crdt's state as formally equal to what its
//  * state would be if its wrapped Crdt was mounted and
//  * had received all currently queued messages.
//  * In other words, it acts like a CObject with
//  * the wrapped Crdt as its single child, named "".
//  *
//  * When unmounted locally, the local state differs from this formal
//  * state - the wrapped Crdt is instead unusable.  Likewise,
//  * when unmounted locally, save data differs from that of the
//  * formal state: the saveData of the wrapped Crdt and its
//  * descendants are left unchanged from the last time it
//  * was unmounted locally, while messages queued since then
//  * are stored in our own saveData.
//  *
//  * The above formalism extends to Message events for this Crdt
//  * and its ancestors: if a message is received for the
//  * wrapped Crdt but it is unmounted, this Crdt and all
//  * of its ancestors will emit Message events immediately,
//  * as if it was mounted; later, when the wrapped Crdt is
//  * mounted and the message is replayed, this Crdt and all
//  * of its ancestors will **not** emit Message events, although
//  * the wrapped Crdt will emit all events as usual.
//  *
//  * Note that
//  * mounting/unmounting operations are not replicated, so
//  * different replicas may be in different actual states.
//  *
//  * @type C the type of the wrapped Crdt
//  */
// export class CMountPoint<C extends Crdt> extends Crdt<CMountPointEventsRecord> {
//   /**
//    * Name: "".  undefined iff unmounted.
//    */
//   private wrappedCrdt?: C = undefined;
//   /**
//    * messageQueue is always empty this is mounted
//    * (wrappedCrdt !== undefined).
//    */
//   private messageQueue: [
//     targetPath: string[],
//     timestamp: CausalTimestamp,
//     message: Uint8Array
//   ][] = [];
//   private needsDelayedLoad = false;
//
//   /**
//    * [mount description]
//    *
//    * Note that if there are queued messages, they will
//    * now be delivered, with some unusual behaviors:
//    * - wrappedCrdt and its descendants will dispatch
//    * all of their events with the original (queued) timestamps,
//    * which may be causally prior to timestamps that have
//    * appeared in events for other Crdts.
//    * - this Crdt and its ancestors will not dispatch Message
//    * events for the queued messages; they were already dispatched when the messages
//    * were originally received.
//    *
//    * @param wrappedCrdtConstructor Must be constructed with the same
//    * type and constructor arguments each time.
//    * Use the callback to add event listeners etc. that need
//    * to be added before loading or receiving any messages.
//    *
//    * @throw if this.isMounted
//    */
//   mount(wrappedCrdtConstructor: (initToken: CrdtInitToken) => C): void {
//     // We could pass wrappedCrdtConstructor in our constructor
//     // instead of here, but this way is easier in case you don't
//     // know what you're going to be constructing until mount
//     // time (e.g. old container demo).
//     this.wrappedCrdt = wrappedCrdtConstructor(new CrdtInitToken("", this));
//
//     if (this.needsDelayedLoad) {
//       this.runtime.delayedLoadDescendants(this);
//       // TODO (for unmount): delayed load should also
//       // invalidate any preemptive save
//       // from the last time we were unmounted.
//     }
//     this.processMessageQueue();
//
//     // TODO: event.  Doesn't work while timestamp is required.
//     // this.emit("Mount", { meta: CrdtEventMeta.local(this.runtime) });
//   }
//
//   /**
//    * Deliver all messages in messageQueue to wrappedCrdt,
//    * which must be defined, initialized, and loaded.
//    */
//   private processMessageQueue() {
//     for (const queued of this.messageQueue) {
//       this.wrappedCrdt!.receive(...queued);
//     }
//     this.messageQueue = [];
//   }
//
//   /**
//    * [unmount description]
//    *
//    * @throw if !this.isMounted
//    */
//   unmount(): void {
//     throw new Error("not yet implemented");
//     if (!this.isMounted) {
//       throw new Error("unmount called but already unmounted");
//     }
//     // TODO: need to save wrappedCrdt and its descendants.
//     this.wrappedCrdt = undefined;
//     this.messageQueue = [];
//
//     // TODO: event.  Doesn't work while timestamp is required.
//     // this.emit("Unmount", { meta: CrdtEventMeta.local(this.runtime) });
//   }
//
//   get isMounted(): boolean {
//     return this.wrappedCrdt !== undefined;
//   }
//
//   get mountedCrdt(): C | undefined {
//     return this.wrappedCrdt;
//   }
//
//   protected receiveInternal(
//     targetPath: string[],
//     timestamp: CausalTimestamp,
//     message: Uint8Array
//   ): void {
//     if (targetPath.length === 0) {
//       // We are the target
//       throw new Error("CMountPoint received message for itself");
//     }
//     if (targetPath[targetPath.length - 1] !== "") {
//       throw new Error(
//         "Unknown child: " +
//           targetPath[targetPath.length - 1] +
//           " in: " +
//           JSON.stringify(targetPath) +
//           ', children: [""]'
//       );
//     }
//
//     targetPath.length--;
//     if (this.wrappedCrdt !== undefined) {
//       this.wrappedCrdt.receive(targetPath, timestamp, message);
//     } else {
//       this.messageQueue.push([targetPath, timestamp, message]);
//     }
//   }
//
//   getChild(name: string): Crdt<CrdtEventsRecord> {
//     // TODO: what to do if not mounted.
//     // For now, just throw an error.
//     // Should make consistent with DeletingMutCSet,
//     // whatever we do.
//     if (name !== "") {
//       throw new Error("Unknown child: " + name + ', children: [""]');
//     }
//     if (this.wrappedCrdt === undefined) {
//       throw new Error('TODO: getChild("") called but not mounted');
//     }
//     return this.wrappedCrdt;
//   }
//
//   canGc(): boolean {
//     if (this.wrappedCrdt !== undefined) {
//       return this.wrappedCrdt.canGc();
//     } else {
//       // TODO: would like to return true if the messageQueue
//       // is empty; however, it is possible that the saved state
//       // is nontrivial, so we must conservatively return false.
//       return false;
//       // return this.messageQueue.length === 0;
//     }
//   }
//
//   save(): [
//     saveData: Uint8Array,
//     children: Map<string, Crdt<CrdtEventsRecord>>
//   ] {
//     const saveMessage = CMountPointSave.create({
//       messageQueue: this.messageQueue.map(
//         ([targetPath, timestamp, message]) => {
//           return {
//             targetPath,
//             timestamp: this.runtime.timestampSerializer.serialize(timestamp),
//             message,
//           };
//         }
//       ),
//     });
//     const saveData = CMountPointSave.encode(saveMessage).finish();
//     if (this.wrappedCrdt !== undefined) {
//       // Also save wrappedCrdt.  Note that in this case,
//       // our saveData just encodes an empty array.
//       return [saveData, new Map([["", this.wrappedCrdt]])];
//     } else {
//       return [saveData, new Map()];
//     }
//   }
//
//   load(saveData: Uint8Array): boolean {
//     this.needsDelayedLoad = true;
//
//     const save = CMountPointSave.decode(saveData);
//     this.messageQueue = save.messageQueue.map((queuedMessage) => [
//       queuedMessage.targetPath!,
//       this.runtime.timestampSerializer.deserialize(
//         queuedMessage.timestamp!,
//         this.runtime
//       ),
//       queuedMessage.message,
//     ]);
//     // Note that our mount state may be different from
//     // what it was during saving.  So the loaded messageQueue
//     // might be nonempty even if we are currently mounted,
//     // in which case we should load the state by first loading
//     // wrappedCrdt, then processing the message queue.
//     if (this.wrappedCrdt !== undefined) {
//       // Let wrappedCrdt be loaded recursively, then process
//       // the messageQueue in postLoad().
//       return true;
//     } else {
//       // messageQueue is reserved for when we are mounted;
//       // wrappedCrdt cannot be loaded yet.
//       return false;
//     }
//   }
//
//   /**
//    * If the wrapped Crdt is mounted now but it wasn't when
//    * saveData was generated, replays the saved queued
//    * messages.  Note that this will cause the wrapped
//    * Crdt to dispatch events with old (pre-save) timestamps,
//    * contrary to most load/postLoad methods which do not
//    * dispatch any events.  However this Crdt and its
//    * ancestors will not dispatch Message
//    * events for the queued messages; they were already dispatched when the messages
//    * were originally received (before saving).
//    *
//    * @return [description]
//    */
//   postLoad() {
//     // See comments in load().
//     if (this.wrappedCrdt !== undefined) {
//       this.processMessageQueue();
//     }
//   }
// }
