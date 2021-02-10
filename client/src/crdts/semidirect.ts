import { CrdtRuntime, CrdtEventsRecord } from "./crdt_core";
import { CausalTimestamp } from "../network";
import { Crdt } from "./crdt_core";

class StoredMessage {
  constructor(
    readonly senderCounter: number,
    readonly receiptCounter: number,
    readonly targetPath: string[],
    readonly timestamp: CausalTimestamp | null,
    readonly message: Uint8Array
  ) {}
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
export class SemidirectState<S extends Object | null = Object | null> {
  private receiptCounter = 0;
  /**
   * Maps a replica id to an array of messages sent by that
   * replica, in order.  Keep in mind that per-sender message
   * counters may not be contiguous, since they are shared between
   * all Crdts with a given root.
   */
  private history: Map<string, Array<StoredMessage>> = new Map();
  public internalState!: S;
  constructor(
    public readonly historyTimestamps: boolean,
    public readonly historyDiscard1Dominated: boolean,
    public readonly historyDiscard2Dominated: boolean
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
        // Nothing's concurrent, so clear everything
        this.history.clear();
      }
      return [];
    }
    // Gather up the concurrent messages.  These are all
    // messages by each replicaId with sender counter
    // greater than timestamp.asVectorClock().get(replicaId).
    let concurrent: Array<StoredMessage> = [];
    let vc = timestamp.asVectorClock();
    for (let historyEntry of this.history.entries()) {
      let senderHistory = historyEntry[1];
      let vcEntry = vc.get(historyEntry[0]);
      if (vcEntry === undefined) vcEntry = -1;
      if (senderHistory !== undefined) {
        let concurrentIndexStart = SemidirectState.indexAfter(
          senderHistory,
          vcEntry
        );
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
      // Sort the concurrent messages in receipt order.
      concurrent.sort((a, b) => a.receiptCounter - b.receiptCounter);
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

  hardReset() {
    this.receiptCounter = 0;
    this.history.clear();
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
}

export class SemidirectProduct<
  S extends Object | null = Object | null,
  Events extends CrdtEventsRecord = CrdtEventsRecord
> extends Crdt<SemidirectState<S>, Events> {
  /**
   * TODO
   * @param parentOrRuntime                [description]
   * @param id                             [description]
   * @param historyTimestamps=false        [description]
   * @param historyDiscard1Dominated=false [description]
   * @param historyDiscard2Dominated=false [description]
   */
  constructor(
    parentOrRuntime: Crdt | CrdtRuntime,
    id: string,
    historyTimestamps = false,
    historyDiscard1Dominated = false,
    historyDiscard2Dominated = false
  ) {
    super(
      parentOrRuntime,
      id,
      new SemidirectState(
        historyTimestamps,
        historyDiscard1Dominated,
        historyDiscard2Dominated
      )
    );
  }

  crdt1!: Crdt<S>;
  crdt2!: Crdt<S>;
  actionVar!: (
    m2TargetPath: string[],
    m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    m1TargetPath: string[],
    m1Timestamp: CausalTimestamp,
    m1Message: Uint8Array
  ) => [string[], Uint8Array] | null;

  protected setup(
    crdt1: Crdt<S>,
    crdt2: Crdt<S>,
    action: (
      m2TargetPath: string[],
      m2Timestamp: CausalTimestamp | null,
      m2Message: Uint8Array,
      m1TargetPath: string[],
      m1Timestamp: CausalTimestamp,
      m1Message: Uint8Array
    ) => [string[], Uint8Array] | null,
    initialState: S
  ) {
    this.state.internalState = initialState;
    if (this.children.get(crdt1.id) !== crdt1) {
      throw new Error(
        "crdt1 (" +
          crdt1.id +
          ") is not our child" +
          " (is it using a wrapper crdt, e.g., because of an Ability mixin?)"
      );
    }
    if (this.children.get(crdt2.id) !== crdt2) {
      throw new Error(
        "crdt2 (" +
          crdt2.id +
          ") is not our child" +
          " (is it using a wrapper crdt, e.g., because of an Ability mixin?)"
      );
    }
    this.crdt1 = crdt1;
    this.crdt2 = crdt2;
    // @ts-ignore Ignore readonly
    crdt1.state = initialState;
    // @ts-ignore Ignore readonly
    crdt2.state = initialState;
    this.actionVar = action;
  }

  receiveInternalForChild(
    child: Crdt,
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    switch (child) {
      case this.crdt2:
        this.state.add(
          this.runtime.getReplicaId(),
          targetPath.slice(),
          timestamp,
          message
        );
        this.crdt2.receive(targetPath, timestamp, message);
        break;
      case this.crdt1:
        let concurrent = this.state.getConcurrent(
          this.runtime.getReplicaId(),
          timestamp
        );
        let mAct: [string[], Uint8Array] = [targetPath, message];
        for (let i = 0; i < concurrent.length; i++) {
          // TODO: can we avoid serializing and
          // deserializing each time?  Like
          // with ResetComponent.
          let mActOrNull = this.actionVar(
            concurrent[i].targetPath,
            concurrent[i].timestamp,
            concurrent[i].message,
            mAct[0],
            timestamp,
            mAct[1]
          );
          if (mActOrNull === null) return;
          else mAct = mActOrNull;
        }
        this.crdt1.receive(mAct[0], timestamp, mAct[1]);
        break;
      default:
        // Not involved with semidirect product
        child.receive(targetPath, timestamp, message);
    }
  }
}
