import {
  ISemidirectProductRevSenderHistory,
  SemidirectProductRevSave,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  CompositeCrdt,
  Crdt,
  CrdtEvent,
  CrdtEventsRecord,
  CrdtParent,
  Runtime,
  StatefulCrdt,
} from "../core";
import { LocallyResettableState } from "./resettable";

// TODO: revise this file.
// In particular, separate out resettable version?
// (Currently has weird conditional types.)
// Better yet, move that to resettable.ts

class StoredMessage {
  constructor(
    readonly senderCounter: number,
    readonly receiptCounter: number,
    readonly targetPath: string[],
    readonly timestamp: CausalTimestamp | null,
    readonly message: Uint8Array
  ) {}
}

export class StoredMessageEvent {
  constructor(readonly eventName: string, readonly event: any) {}
}

// TODO: future opts: indexed messages; setting the history
// to a subset; causal stability.
// TODO: for this to work, replicaId's must be comparable according
// to the same-equals approach.  Typically, this requires them
// to be primitive types, as objects which are equal-valued but have
// different pointers will be considered different.
// TODO: mention that to get a proper CRDT (equal internal states),
// we technically must compare receipt orders as equivalent if
// they are both in causal order.

// TODO: In runtime, store a mapping from `${timestamp.getSender()}{timestamp.asVectorClock().get(timestamp.getSender())}` to the events triggered by the message.
// TODO: In runtime, add a getMessageEvents() method that retrieves the list of events from mapping.get(`${timestamp.getSender()}{timestamp.asVectorClock().get(timestamp.getSender())}`)
// TODO: In runtime, add an addMessageEventIfTracked() method that does mapping.get(`${timestamp.getSender()}{timestamp.asVectorClock().get(timestamp.getSender())}`).push(event) if the mapping has the key.
// TODO: In runtime, add a trackMessageEvents() method that adds `${timestamp.getSender()}{timestamp.asVectorClock().get(timestamp.getSender())}`: [] to the mapping.
// TODO: In runtime, add an untrackMessageEvents() method that removes `${timestamp.getSender()}{timestamp.asVectorClock().get(timestamp.getSender())}` from the mapping.
// TODO: In Crdt's omit, call addMessageEventIfTracked()

class SemidirectHistory<Events extends CrdtEventsRecord> {
  protected receiptCounter = 0;
  /**
   * Maps a replica id to an array of messages sent by that
   * replica, in order.  Keep in mind that per-sender message
   * counters may not be contiguous, since they are shared between
   * all Crdts with a given root.
   */
  protected history: Map<string, Array<StoredMessage>> = new Map();
  protected messageEvents: Map<string, Array<StoredMessageEvent>> = new Map();
  constructor(
    private readonly historyTimestamps: boolean,
    private readonly historyDiscard1Dominated: boolean,
    private readonly historyDiscard2Dominated: boolean
  ) {}
  /**
   * Add message to the history with the given timestamp.
   * replicaId is our replica id.
   */
  add(
    replicaId: string,
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    if (this.historyDiscard2Dominated) {
      this.processTimestamp(replicaId, timestamp, false, true);
    }
    let senderHistory = this.history.get(timestamp.getSender());
    if (senderHistory === undefined) {
      senderHistory = [];
      this.history.set(timestamp.getSender(), senderHistory);
    }
    senderHistory.push(
      new StoredMessage(
        timestamp.getSenderCounter(),
        this.receiptCounter,
        targetPath,
        this.historyTimestamps ? timestamp : null,
        message
      )
    );
    // Start tracking message events
    this.messageEvents.set(
      `${timestamp.getSender()}${timestamp.getSenderCounter()}`,
      []
    );
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
  getConcurrent(replicaId: string, timestamp: CausalTimestamp) {
    return this.processTimestamp(
      replicaId,
      timestamp,
      true,
      this.historyDiscard1Dominated
    );
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
  private processTimestamp(
    replicaId: string,
    timestamp: CausalTimestamp,
    returnConcurrent: boolean,
    discardDominated: boolean
  ) {
    if (replicaId === timestamp.getSender()) {
      if (discardDominated) {
        for (let historyEntry of this.history.entries()) {
          for (let message of historyEntry[1]) {
            // Stop tracking message events
            this.messageEvents.delete(
              `${message.timestamp!.getSender()}${message.timestamp!.getSenderCounter()}`
            );
          }
        }
        // Nothing's concurrent, so clear everything
        this.history.clear();
      }
      return [];
    }
    // Gather up the concurrent messages.  These are all
    // messages by each replicaId with sender counter
    // greater than timestamp.asVectorClock().get(replicaId).
    let concurrent: Array<[string, StoredMessage]> = [];
    let vc = timestamp.asVectorClock();
    for (let historyEntry of this.history.entries()) {
      let senderHistory = historyEntry[1];
      let vcEntry = vc.get(historyEntry[0]);
      if (vcEntry === undefined) vcEntry = -1;
      if (senderHistory !== undefined) {
        let concurrentIndexStart = SemidirectHistory.indexAfter(
          senderHistory,
          vcEntry
        );
        if (returnConcurrent) {
          for (let i = concurrentIndexStart; i < senderHistory.length; i++) {
            concurrent.push([historyEntry[0], senderHistory[i]]);
          }
        }
        if (discardDominated) {
          for (let i = 0; i < concurrentIndexStart; i++) {
            // Stop tracking message events
            this.messageEvents.delete(
              `${senderHistory[i].timestamp!.getSender()}${senderHistory[
                i
              ].timestamp!.getSenderCounter()}`
            );
          }
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
      // Sort the concurrent messages in receipt order.
      concurrent.sort((a, b) => a[1].receiptCounter - b[1].receiptCounter);
      // Strip away everything except the messages.
      return concurrent;
    } else return [];
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
  private static indexAfter(
    sparseArray: Array<StoredMessage>,
    value: number
  ): number {
    // TODO: binary search when sparseArray is large
    // Note that there may be duplicate timestamps.
    // So it would be inappropriate to find an entry whose
    // per-sender counter equals value and infer that
    // the desired index is 1 greater.
    for (let i = 0; i < sparseArray.length; i++) {
      if (sparseArray[i].senderCounter > value) return i;
    }
    return sparseArray.length;
  }

  addMessageEvent(timestamp: CausalTimestamp, eventName: string, event: any) {
    if (
      this.messageEvents.has(
        `${timestamp.getSender()}${timestamp.getSenderCounter()}`
      )
    ) {
      this.messageEvents
        .get(`${timestamp.getSender()}${timestamp.getSenderCounter()}`)!
        .push(new StoredMessageEvent(eventName, event));
    }
  }

  getMessageEvents(
    sender: string,
    senderCounter: number
  ): StoredMessageEvent[] | null {
    if (this.messageEvents.has(`${sender}${senderCounter}`)) {
      return this.messageEvents.get(`${sender}${senderCounter}`)!;
    }
    return null;
  }

  save(runtime: Runtime, subclassSave: Uint8Array): Uint8Array {
    const historySave: {
      [sender: string]: ISemidirectProductRevSenderHistory;
    } = {};
    for (const [sender, messages] of this.history) {
      historySave[sender] = {
        messages: messages.map((message) => {
          return {
            senderCounter: message.senderCounter,
            receiptCounter: message.receiptCounter,
            targetPath: message.targetPath,
            timestamp: this.historyTimestamps
              ? runtime.timestampSerializer.serialize(message.timestamp!)
              : null,
            message: message.message,
          };
        }),
      };
    }
    const messageEventsSave: { [id: string]: string } = {};
    for (const [id, event] of this.messageEvents) {
      // TODO: intelligent way to serialize events.
      // In particular, this will do silly things to
      // timestamp.
      messageEventsSave[id] = JSON.stringify(event);
    }
    const saveMessage = SemidirectProductRevSave.create({
      receiptCounter: this.receiptCounter,
      history: historySave,
      messageEvents: messageEventsSave,
      subclassSave,
    });
    return SemidirectProductRevSave.encode(saveMessage).finish();
  }

  /**
   * [load description]
   * @param  saveData [description]
   * @param  runtime  [description]
   * @return subclassSave
   */
  load(saveData: Uint8Array, runtime: Runtime): Uint8Array {
    const saveMessage = SemidirectProductRevSave.decode(saveData);
    this.receiptCounter = saveMessage.receiptCounter;
    for (const [sender, messages] of Object.entries(saveMessage.history)) {
      this.history.set(
        sender,
        messages.messages!.map(
          (message) =>
            new StoredMessage(
              message.senderCounter,
              message.receiptCounter,
              message.targetPath!,
              this.historyTimestamps
                ? runtime.timestampSerializer.deserialize(
                    message.timestamp!,
                    runtime
                  )
                : null,
              message.message
            )
        )
      );
    }
    for (const [id, eventSave] of Object.entries(saveMessage.messageEvents)) {
      this.messageEvents.set(id, JSON.parse(eventSave));
    }
    return saveMessage.subclassSave;
  }
}

// class SemidirectStateLocallyResettable<S extends LocallyResettableState>
//     extends SemidirectStateBase<S>
//     implements LocallyResettableState
// {
//   resetLocalState() {
//     this.receiptCounter = 0;
//     this.history.clear();
//     this.internalState.resetLocalState();
//   }
// }

// TODO: instead of subclass, have interface for all-but-reset part of
// SemidirectState, then have just one class including reset?
// export type SemidirectState<S> = S extends LocallyResettableState
//     ? SemidirectStateBase<S> & LocallyResettableState
//     : SemidirectStateBase<S>;

export abstract class SemidirectProductRev<
    Events extends CrdtEventsRecord = CrdtEventsRecord,
    C extends Crdt = Crdt
  >
  extends CompositeCrdt<Events, C>
  implements CrdtParent
{
  protected history = new SemidirectHistory(false, false, false);
  private receivedMessages = false;

  protected setupHistory(
    historyTimestamps: boolean = false,
    historyDiscard1Dominated: boolean = false,
    historyDiscard2Dominated: boolean = false
  ) {
    if (this.receivedMessages) {
      throw new Error(
        "Tried to set up after messages have been received. " +
          "Make sure that this method is called in the constructor."
      );
    }
    this.history = new SemidirectHistory(
      historyTimestamps,
      historyDiscard1Dominated,
      historyDiscard2Dominated
    );
  }

  protected trackM2Event(
    timestamp: CausalTimestamp,
    eventName: string,
    event: any
  ) {
    this.history.addMessageEvent(timestamp, eventName, event);
  }

  protected m1Criteria(
    // TODO: make abstract
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    return false;
  }

  protected m2Criteria(
    // TODO: make abstract
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    return false;
  }
  /**
   * TODO
   * @param  m2TargetPath [description]
   * @param  m2Timestamp  [description]
   * @param  m2Message    [description]
   * @param  m1TargetPath [description]
   * @param  m1Timestamp  [description]
   * @param  m1Message    [description]
   * @return              [description]
   */
  protected action(
    // TODO: make abstract
    m2TargetPath: string[],
    m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    m2TrackedEvents: [string, any][],
    m1TargetPath: string[],
    m1Timestamp: CausalTimestamp,
    m1Message: Uint8Array
  ): { m1TargetPath: string[]; m1Message: Uint8Array } | null {
    return { m1TargetPath, m1Message };
  }

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    this.receivedMessages = this.receivedMessages || true;
    if (targetPath.length === 0) {
      // We are the target
      throw new Error("SemidirectProduct received message for itself");
    }

    let child = this.children.get(targetPath[targetPath.length - 1]);
    if (child === undefined) {
      throw new Error(
        "Unknown child: " +
          targetPath[targetPath.length - 1] +
          " in: " +
          JSON.stringify(targetPath) +
          ", children: " +
          JSON.stringify([...this.children.keys()])
      );
    }
    switch (true) {
      // m2 cannot be local only. Mainly so that it doesn't break because local messages have a weird vectorMap.
      // But also at the same time, the idea behind semi direct products is that concurrent m2's act on m1 to produce
      // a modified m1, which is then relayed locally. Thus, the semidirect product may need to locally resend some
      // form of m1 to modify m1 properly, while there should be no need to resend m2.
      // TODO: Work on this argument more.
      case this.m2Criteria(targetPath, timestamp, message):
        console.log(timestamp);
        targetPath.length--;
        this.history.add(
          this.runtime.replicaId,
          targetPath.slice(),
          timestamp,
          message
        );
        child.receive(targetPath, timestamp, message);
        break;

      case this.m1Criteria(targetPath, timestamp, message):
        // &&
        // !this.runtime.isLocal:
        if (this.runtime.isInRunLocally) {
          console.log("local!", timestamp);
        } else {
          console.log("not local!", timestamp);
        }
        targetPath.length--;
        let concurrent = this.history.getConcurrent(
          this.runtime.replicaId,
          timestamp
        );
        let mAct = {
          m1TargetPath: targetPath,
          m1Message: message,
        };
        for (let i = 0; i < concurrent.length; i++) {
          // TODO: can we avoid serializing and
          // deserializing each time?  Like
          // with ResetComponent.
          let mActOrNull = this.action(
            concurrent[i][1].targetPath,
            concurrent[i][1].timestamp,
            concurrent[i][1].message,
            this.history
              .getMessageEvents(
                concurrent[i][0],
                concurrent[i][1].senderCounter
              )!
              .map(({ eventName, event }) => [eventName, event]),
            mAct.m1TargetPath,
            timestamp,
            mAct.m1Message
          );
          if (mActOrNull === null) return;
          else mAct = mActOrNull;
        }
        child.receive(mAct.m1TargetPath, timestamp, mAct.m1Message);
        break;
      default:
        targetPath.length--;
        child.receive(targetPath, timestamp, message);
    }
  }

  canGc(): boolean {
    // TODO: this may spuriously return false if one of the Crdt's is not
    // in its initial state only because we overwrote that state with
    // the semidirect initial state.  Although, for our Crdt's so far
    // (e.g NumberCrdt), it ends up working because they check canGC()
    // by asking the state if it is in its initial state.
    return this.history.isHistoryEmpty() && super.canGc();
  }

  protected saveComposite(): Uint8Array {
    return this.history.save(this.runtime, this.saveSemidirectProductRev());
  }

  /**
   * Override to return your own saveData, which will
   * be passed to loadSemidirectProductRev during this.load,
   * after loading the semidirect product state.
   */
  protected saveSemidirectProductRev(): Uint8Array {
    return new Uint8Array();
  }

  protected loadSemidirectProductRev(saveData: Uint8Array) {}

  // TODO: the children loading their own states (both
  // of them, in arbitrary order) must correctly set
  // this.internalState, whatever it is.
  // Need option to do custom loading if that's not the
  // case.
  protected loadComposite(saveData: Uint8Array) {
    this.loadSemidirectProductRev(this.history.load(saveData, this.runtime));
  }
}
