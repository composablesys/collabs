import {
  ISemidirectProductSenderHistory,
  SemidirectProductSave,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  Crdt,
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

// TODO: future opts: indexed messages; setting the history
// to a subset; causal stability.
// TODO: for this to work, replicaId's must be comparable according
// to the same-equals approach.  Typically, this requires them
// to be primitive types, as objects which are equal-valued but have
// different pointers will be considered different.
// TODO: mention that to get a proper CRDT (equal internal states),
// we technically must compare receipt orders as equivalent if
// they are both in causal order.
class SemidirectStateBase<S extends Object> {
  protected receiptCounter = 0;
  /**
   * Maps a replica id to an array of messages sent by that
   * replica, in order.  Keep in mind that per-sender message
   * counters may not be contiguous, since they are shared between
   * all Crdts with a given root.
   */
  protected history: Map<string, Array<StoredMessage>> = new Map();
  public internalState!: S;
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
        let concurrentIndexStart = SemidirectStateBase.indexAfter(
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

  save(runtime: Runtime): Uint8Array {
    const historySave: { [sender: string]: ISemidirectProductSenderHistory } =
      {};
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
    const saveMessage = SemidirectProductSave.create({
      receiptCounter: this.receiptCounter,
      history: historySave,
    });
    return SemidirectProductSave.encode(saveMessage).finish();
  }

  load(saveData: Uint8Array, runtime: Runtime) {
    const saveMessage = SemidirectProductSave.decode(saveData);
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
  }
}

class SemidirectStateLocallyResettable<S extends LocallyResettableState>
  extends SemidirectStateBase<S>
  implements LocallyResettableState
{
  resetLocalState() {
    this.receiptCounter = 0;
    this.history.clear();
    this.internalState.resetLocalState();
  }
}

// TODO: instead of subclass, have interface for all-but-reset part of
// SemidirectState, then have just one class including reset?
export type SemidirectState<S> = S extends LocallyResettableState
  ? SemidirectStateBase<S> & LocallyResettableState
  : SemidirectStateBase<S>;

export abstract class SemidirectProduct<
    S extends Object,
    Events extends CrdtEventsRecord = CrdtEventsRecord
  >
  extends Crdt<Events>
  implements StatefulCrdt<SemidirectState<S>>, CrdtParent
{
  static readonly crdt1Name = "1";
  static readonly crdt2Name = "2";

  readonly state: SemidirectState<S>;
  /**
   * TODO
   * @param historyTimestamps=false        [description]
   * @param historyDiscard1Dominated=false [description]
   * @param historyDiscard2Dominated=false [description]
   */
  constructor(
    historyTimestamps = false,
    historyDiscard1Dominated = false,
    historyDiscard2Dominated = false
  ) {
    super();
    // Types are hacked a bit here to make implementation simpler
    this.state = new SemidirectStateLocallyResettable<
      S & LocallyResettableState
    >(
      historyTimestamps,
      historyDiscard1Dominated,
      historyDiscard2Dominated
    ) as SemidirectState<S>;
  }

  protected crdt1!: StatefulCrdt<S>;
  protected crdt2!: StatefulCrdt<S>;

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
  protected abstract action(
    m2TargetPath: string[],
    m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    m1TargetPath: string[],
    m1Timestamp: CausalTimestamp,
    m1Message: Uint8Array
  ): { m1TargetPath: string[]; m1Message: Uint8Array } | null;

  // TODO: move setup into constructor?  Then we don't have to worry about
  // it being called after init.  But then it's annoying to pass
  // this to the children (as is one in ResetWrapperCrdt).
  protected setup(
    crdt1: StatefulCrdt<S>,
    crdt2: StatefulCrdt<S>,
    initialState: S
  ) {
    this.state.internalState = initialState;
    this.crdt1 = crdt1;
    this.crdt2 = crdt2;
    // @ts-ignore Ignore readonly
    crdt1.state = initialState;
    // @ts-ignore Ignore readonly
    crdt2.state = initialState;
    if (this.afterInit) this.initChildren();
  }

  init(name: string, parent: CrdtParent) {
    super.init(name, parent);
    if (this.crdt1 !== undefined) {
      // setup has already been called
      this.initChildren();
    }
  }

  private initChildren() {
    this.childBeingAdded = this.crdt1;
    this.crdt1.init(SemidirectProduct.crdt1Name, this);
    this.childBeingAdded = this.crdt2;
    this.crdt2.init(SemidirectProduct.crdt2Name, this);
    this.childBeingAdded = undefined;
  }

  private childBeingAdded?: Crdt;
  onChildInit(child: Crdt) {
    if (child != this.childBeingAdded) {
      throw new Error(
        "this was passed to Crdt.init as parent externally" +
          " (use this.setup instead)"
      );
    }
  }

  // TODO: errors if setup is not called exactly once?

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    if (targetPath.length === 0) {
      // We are the target
      throw new Error("TODO");
    }
    switch (targetPath[targetPath.length - 1]) {
      case SemidirectProduct.crdt2Name:
        targetPath.length--;
        this.state.add(
          this.runtime.replicaId,
          targetPath.slice(),
          timestamp,
          message
        );
        this.crdt2.receive(targetPath, timestamp, message);
        break;
      case SemidirectProduct.crdt1Name:
        targetPath.length--;
        let concurrent = this.state.getConcurrent(
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
            concurrent[i].targetPath,
            concurrent[i].timestamp,
            concurrent[i].message,
            mAct.m1TargetPath,
            timestamp,
            mAct.m1Message
          );
          if (mActOrNull === null) return;
          else mAct = mActOrNull;
        }
        this.crdt1.receive(mAct.m1TargetPath, timestamp, mAct.m1Message);
        break;
      default:
        // TODO: deliver error somewhere reasonable
        throw new Error(
          "Unknown SemidirectProduct child: " +
            targetPath[targetPath.length - 1] +
            " in: " +
            JSON.stringify(targetPath)
        );
    }
  }

  getChild(name: string): Crdt {
    switch (name) {
      case SemidirectProduct.crdt1Name:
        return this.crdt1;
      case SemidirectProduct.crdt2Name:
        return this.crdt2;
      default:
        throw new Error("Unknown child: " + name + " in SemidirectProduct");
    }
  }

  canGc(): boolean {
    // TODO: this may spuriously return false if one of the Crdt's is not
    // in its initial state only because we overwrote that state with
    // the semidirect initial state.  Although, for our Crdt's so far
    // (e.g NumberCrdt), it ends up working because they check canGC()
    // by asking the state if it is in its initial state.
    return (
      this.state.isHistoryEmpty() && this.crdt1.canGc() && this.crdt2.canGc()
    );
  }

  save(): [saveData: Uint8Array, children: Map<string, Crdt>] {
    return [
      this.state.save(this.runtime),
      new Map([
        [SemidirectProduct.crdt1Name, this.crdt1],
        [SemidirectProduct.crdt2Name, this.crdt2],
      ]),
    ];
  }

  // TODO: the children loading their own states (both
  // of them, in arbitrary order) must correctly set
  // this.internalState, whatever it is.
  // Need option to do custom loading if that's not the
  // case.
  load(saveData: Uint8Array) {
    this.state.load(saveData, this.runtime);
  }
}
