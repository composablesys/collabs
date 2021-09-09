import {
  IMultiSemidirectProductSenderHistory,
  MultiSemidirectProductSave,
} from "../../generated/proto_compiled";
import {
  CausalTimestamp,
  Crdt,
  CrdtEventsRecord,
  CrdtInitToken,
  Pre,
  Runtime,
} from "../core";
import { StatefulCrdt } from "./semidirect_product";

class StoredMessage {
  message: Uint8Array | null;
  constructor(
    readonly sender: string,
    readonly senderCounter: number,
    readonly receiptCounter: number,
    readonly targetPath: string[],
    readonly timestamp: CausalTimestamp | null,
    readonly arbIndex: number, // arbitration number
    message: Uint8Array | null
  ) {
    this.message = message;
  }

  setMessage(newMessage: Uint8Array | null) {
    this.message = newMessage;
  }
}

class MultipleSemidirectState<S extends object> {
  protected receiptCounter = 0;
  /**
   * Maps a replica id to an array of messages sent by that
   * replica, in order.  Keep in mind that per-sender message
   * counters may not be contiguous, since they are shared between
   * all Crdts with a given root.
   */
  protected history: Map<string, Array<StoredMessage>> = new Map();
  public internalState!: S;
  constructor(private readonly historyTimestamps: boolean) {}

  /**
   * Add message to the history with the given timestamp.
   * replicaId is our replica id.
   */
  add(
    replicaId: string,
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array,
    arbId: number
  ) {
    let senderHistory = this.history.get(timestamp.getSender());
    if (senderHistory === undefined) {
      senderHistory = [];
      this.history.set(timestamp.getSender(), senderHistory);
    }
    senderHistory.push(
      new StoredMessage(
        timestamp.getSender(),
        timestamp.getSenderCounter(),
        this.receiptCounter,
        targetPath,
        this.historyTimestamps ? timestamp : null,
        arbId,
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
   * causally greater than all prior messages, hence [] is returned.
   */
  getConcurrent(replicaId: string, timestamp: CausalTimestamp, arbId: number) {
    return this.processTimestamp(replicaId, timestamp, true, arbId);
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
    arbId: number
  ) {
    if (replicaId === timestamp.getSender()) {
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
        let concurrentIndexStart = MultipleSemidirectState.indexAfter(
          senderHistory,
          vcEntry
        );
        if (returnConcurrent) {
          for (let i = concurrentIndexStart; i < senderHistory.length; i++) {
            // With multiple semidirect products, we only consider messages
            // from CRDTs with a higher arbitration index
            if (senderHistory[i].arbIndex > arbId) {
              concurrent.push(senderHistory[i]);
            }
          }
        }
      }
    }
    if (returnConcurrent) {
      // Sort concurrent messages by arbitration order then by receipt order.
      concurrent.sort((a, b) => {
        if (a.arbIndex == b.arbIndex)
          return a.receiptCounter - b.receiptCounter;
        else return a.arbIndex - b.arbIndex;
      });
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
   * Get all messages from CRDTs with lower arbitration index
   */
  getLowerHistory(idx: number): StoredMessage[] {
    let hist: StoredMessage[] = [];

    for (const messages of this.history.values()) {
      messages.forEach((msg) => {
        if (msg.arbIndex < idx) {
          hist.push(msg);
        }
      });
    }

    return hist;
  }

  // // Binary search to find first index in array with senderCounter
  // // greater than given value
  // private static binSearch(
  //   arr: Array<StoredMessage>,
  //   value: number,
  //   start: number,
  //   end: number
  // ): number {
  //   if (start >= end) return start;
  //
  //   let mid = Math.floor((start + end) / 2);
  //
  //   if (arr[mid].senderCounter > value) {
  //     return this.binSearch(arr, value, start, mid - 1);
  //   } else {
  //     return this.binSearch(arr, value, mid + 1, end);
  //   }
  // }

  private static indexAfter(
    sparseArray: Array<StoredMessage>,
    value: number
  ): number {
    // TODO: binary search when sparseArray is large
    // Note that there may be duplicate timestamps.
    // So it would be inappropriate to find an entry whose
    // per-sender counter equals value and infer that
    // the desired index is 1 greater.
    for (let i = sparseArray.length - 1; i >= 0; i--) {
      if (sparseArray[i].senderCounter <= value) return i + 1;
    }
    return 0;
  }

  save(runtime: Runtime): Uint8Array {
    const historySave: {
      [sender: string]: IMultiSemidirectProductSenderHistory;
    } = {};
    for (const [sender, messages] of this.history) {
      historySave[sender] = {
        messages: messages.map((message) => {
          return {
            sender: message.sender,
            senderCounter: message.senderCounter,
            receiptCounter: message.receiptCounter,
            targetPath: message.targetPath,
            timestamp: this.historyTimestamps
              ? runtime.timestampSerializer.serialize(message.timestamp!)
              : null,
            arbIndex: message.arbIndex,
            message: message.message,
          };
        }),
      };
    }
    const saveMessage = MultiSemidirectProductSave.create({
      receiptCounter: this.receiptCounter,
      history: historySave,
    });
    return MultiSemidirectProductSave.encode(saveMessage).finish();
  }

  load(saveData: Uint8Array, runtime: Runtime) {
    const saveMessage = MultiSemidirectProductSave.decode(saveData);
    this.receiptCounter = saveMessage.receiptCounter;
    for (const [sender, messages] of Object.entries(saveMessage.history)) {
      this.history.set(
        sender,
        messages.messages!.map(
          (message) =>
            new StoredMessage(
              message.sender,
              message.senderCounter,
              message.receiptCounter,
              message.targetPath!,
              this.historyTimestamps
                ? runtime.timestampSerializer.deserialize(
                    message.timestamp!,
                    runtime
                  )
                : null,
              message.arbIndex,
              message.hasOwnProperty("message") ? message.message! : null
            )
        )
      );
    }
  }
}

export abstract class MultipleSemidirectProduct<
    S extends object,
    Events extends CrdtEventsRecord = CrdtEventsRecord
  >
  extends Crdt<Events>
  implements StatefulCrdt<MultipleSemidirectState<S>>
{
  readonly state: MultipleSemidirectState<S>;

  /**
   * TODO
   * @param historyTimestamps=false        [description]
   */
  constructor(initToken: CrdtInitToken, historyTimestamps = false) {
    super(initToken);
    // Types are hacked a bit here to make implementation simpler
    this.state = new MultipleSemidirectState(historyTimestamps);
  }

  protected crdts: Array<StatefulCrdt<S>> = [];

  /**
   * TODO
   * @param  m2TargetPath [description]
   * @param  m2Timestamp  [description]
   * @param  m2Message    [description]
   * @param  m2Index      [description]
   * @param  m1TargetPath [description]
   * @param  m1Timestamp  [description]
   * @param  m1Message    [description]
   * @return              [description]
   */
  protected abstract action(
    m2TargetPath: string[],
    m2Timestamp: CausalTimestamp | null,
    m2Message: Uint8Array,
    m2Index: number,
    m1TargetPath: string[],
    m1Timestamp: CausalTimestamp | null,
    m1Message: Uint8Array
  ): { m1TargetPath: string[]; m1Message: Uint8Array } | null;

  protected setupState(initialState: S) {
    this.state.internalState = initialState;
  }

  /**
   * Must be called after setupState, and in arbitration order
   * (ascending).
   */
  protected setupOneCrdt<C extends StatefulCrdt<S>>(preCrdt: Pre<C>): C {
    const crdt = preCrdt(new CrdtInitToken("crdt" + this.crdts.length, this));
    // @ts-ignore Ignore readonly
    crdt.state = this.state.internalState;
    this.crdts.push(crdt);
    return crdt;
  }

  // The resulting message mact is then applied to σ and added to the history.
  // It also acts on all messages in the history with lower arbitration order,
  // regardless ofwhether they are concurrent or not.
  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ) {
    if (targetPath.length === 0) {
      throw new Error("TODO");
    }

    let idx: number;
    if (
      targetPath[targetPath.length - 1].substr(0, 4) == "crdt" &&
      (idx = parseInt(targetPath[targetPath.length - 1].substr(4))) !== NaN
    ) {
      targetPath.length--;
      let crdt = this.crdts[idx];

      // Be acted on by all concurrent messages with greater
      // arbitration index (idx).
      let concurrent = this.state.getConcurrent(
        this.runtime.replicaId,
        timestamp,
        idx
      );

      let mAct = {
        m1TargetPath: targetPath,
        m1Message: message,
      };
      for (let i = 0; i < concurrent.length; i++) {
        if (concurrent[i].message !== null) {
          let mActOrNull = this.action(
            concurrent[i].targetPath,
            concurrent[i].timestamp,
            concurrent[i].message!,
            concurrent[i].arbIndex,
            mAct.m1TargetPath,
            timestamp,
            mAct.m1Message
          );

          if (mActOrNull == null) return;
          else mAct = mActOrNull;
        }
      }

      // mAct should act on all messages in history w/ lower order
      let hist = this.state.getLowerHistory(idx);
      hist.forEach((msg) => {
        if (msg.message !== null) {
          let acted = this.action(
            mAct.m1TargetPath,
            timestamp,
            mAct.m1Message,
            idx,
            msg.targetPath,
            msg.timestamp,
            msg.message
          );

          if (acted) msg.setMessage(acted.m1Message);
          else msg.setMessage(null);
        }
      });

      // add mAct to state and history
      this.state.add(
        this.runtime.replicaId,
        targetPath.slice(),
        timestamp,
        mAct.m1Message,
        idx
      );

      crdt.receive(mAct.m1TargetPath, timestamp, mAct.m1Message);
    } else {
      throw new Error(
        "Unknown SemidirectProduct child: " +
          targetPath[targetPath.length - 1] +
          " in: " +
          JSON.stringify(targetPath)
      );
    }
  }

  getChild(name: string): Crdt {
    let idx: number;
    if (
      name.substr(0, 4) == "crdt" &&
      (idx = parseInt(name.substr(4))) !== NaN
    ) {
      let idx = parseInt(name.substr(4));
      return this.crdts[idx];
    } else {
      throw new Error(
        "Unknown child: " + name + " in MultipleSemidirectProduct: "
      );
    }
  }

  canGc(): boolean {
    // TODO: this may spuriously return false if one of the Crdt's is not
    // in its initial state only because we overwrote that state with
    // the semidirect initial state.  Although, for our Crdt's so far
    // (e.g CNumber), it ends up working because they check canGC()
    // by asking the state if it is in its initial state.
    let crdtsCanGc = true;
    this.crdts.forEach((crdt) => {
      crdtsCanGc = crdtsCanGc && crdt.canGc();
    });

    return this.state.isHistoryEmpty() && crdtsCanGc;
  }

  save(): [saveData: Uint8Array, children: Map<string, Crdt>] {
    let crdts: [string, Crdt<CrdtEventsRecord>][] = [];
    for (let i = 0; i < this.crdts.length; i++) {
      crdts.push(["crdt" + i.toString(), this.crdts[i]]);
    }

    return [this.state.save(this.runtime), new Map(crdts)];
  }

  // TODO: the children loading their own states (both
  // of them, in arbitrary order) must correctly set
  // this.internalState, whatever it is.
  // Need option to do custom loading if that's not the
  // case.
  load(saveData: Uint8Array): boolean {
    this.state.load(saveData, this.runtime);
    return true;
  }
}
