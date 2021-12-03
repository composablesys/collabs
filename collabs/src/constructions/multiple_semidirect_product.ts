import {
  BytesOrString,
  IMultiSemidirectProductSenderHistory,
  MultiSemidirectProductHistorySave,
  MultiSemidirectProductSave,
} from "../../generated/proto_compiled";
import {
  MessageMeta,
  Crdt,
  CrdtEventsRecord,
  InitToken,
  Pre,
  ParentCrdt,
} from "../core";

/**
 * Interface describing a Crdt which stores all of its mutable state
 * in a single readonly variable state of type S.
 *
 * Such a Crdt must continue
 * to function after state is mutated or even replaced (ignoring state's
 * readonly property) as if it had changed state itself.
 *
 * This interace is used by SemidirectProduct, which composes two
 * StatefulCrdt's of the same type, unifying their states by setting
 * both state variables equal to the same value.  Note that
 * SemidirectProduct ignores the readonly property during
 * init, possibly overwriting state with a different instance
 * of S.
 *
 * @param S the state type.  S is forced to extend object
 * because state is meant to be mutated in-place, since
 * it is readonly.  Immutable primitive types (e.g., number)
 * should be wrapped in an object.
 */
export interface StatefulCrdt<S extends object> extends Crdt {
  /**
   * Not for use outside of this (treat as protected).
   */
  readonly state: S;
}

class StoredMessage {
  messagePath: (Uint8Array | string)[] | null;
  constructor(
    readonly sender: string,
    readonly senderCounter: number,
    readonly receiptCounter: number,
    messagePath: (Uint8Array | string)[] | null,
    readonly meta: MessageMeta | null,
    readonly arbIndex: number // arbitration number
  ) {
    this.messagePath = messagePath;
  }

  setMessagePath(newMessagePath: (Uint8Array | string)[] | null) {
    this.messagePath = newMessagePath;
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
  constructor(private readonly historyMetas: boolean) {}

  /**
   * Add message to the history with the given meta.
   * replicaId is our replica id.
   */
  add(messagePath: (Uint8Array | string)[], meta: MessageMeta, arbId: number) {
    let senderHistory = this.history.get(meta.sender);
    if (senderHistory === undefined) {
      senderHistory = [];
      this.history.set(meta.sender, senderHistory);
    }
    senderHistory.push(
      new StoredMessage(
        meta.sender,
        meta.senderCounter,
        this.receiptCounter,
        messagePath,
        this.historyMetas ? meta : null,
        arbId
      )
    );
    this.receiptCounter++;
  }

  /**
   * Return all messages in the history concurrent to the given
   * meta, in some causal order (specifically, this replica's
   * receipt order).  If we are the sender (i.e., replicaId ===
   * meta.sender), it is assumed that the meta is
   * causally greater than all prior messages, hence [] is returned.
   */
  getConcurrent(replicaId: string, meta: MessageMeta, arbId: number) {
    return this.processMeta(replicaId, meta, true, arbId);
  }

  /**
   * Performs specified actions on all messages in the history:
   * - if returnConcurrent is true, returns the list of
   * all messages in the history concurrent to meta, in
   * receipt order.
   * - if discardDominated is true, deletes all messages from
   * the history whose metas are causally dominated by
   * or equal to the given meta.  (Note that this means that
   * if we want to keep a message with the given meta in
   * the history, it must be added to the history after calling
   * this method.)
   */
  private processMeta(
    replicaId: string,
    meta: MessageMeta,
    returnConcurrent: boolean,
    arbId: number
  ) {
    if (replicaId === meta.sender) {
      return [];
    }
    // Gather up the concurrent messages.  These are all
    // messages by each replicaId with sender counter
    // greater than meta.vectorClock!.get(replicaId).
    let concurrent: Array<StoredMessage> = [];
    let vc = meta.vectorClock!;
    for (let historyEntry of this.history.entries()) {
      let senderHistory = historyEntry[1];
      let vcEntry = vc.get(historyEntry[0]);
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
    // Note that there may be duplicate metas.
    // So it would be inappropriate to find an entry whose
    // per-sender counter equals value and infer that
    // the desired index is 1 greater.
    for (let i = sparseArray.length - 1; i >= 0; i--) {
      if (sparseArray[i].senderCounter <= value) return i + 1;
    }
    return 0;
  }

  save(): Uint8Array {
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
            messagePath: message.messagePath?.map((value) => {
              if (typeof value === "string") {
                return { stringData: value };
              } else return { bytesData: value };
            }),
            meta: null, // TODO: historyMetas not supported
            arbIndex: message.arbIndex,
          };
        }),
      };
    }
    const saveMessage = MultiSemidirectProductHistorySave.create({
      receiptCounter: this.receiptCounter,
      history: historySave,
    });
    return MultiSemidirectProductHistorySave.encode(saveMessage).finish();
  }

  load(saveData: Uint8Array) {
    const saveMessage = MultiSemidirectProductHistorySave.decode(saveData);
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
              message.hasOwnProperty("messagePath")
                ? message.messagePath!.map((value) => {
                    const asClass = <BytesOrString>value;
                    if (asClass.data === "stringData") {
                      return asClass.stringData;
                    } else return asClass.bytesData;
                  })
                : null,
              null,
              message.arbIndex
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
  implements ParentCrdt, StatefulCrdt<MultipleSemidirectState<S>>
{
  readonly state: MultipleSemidirectState<S>;

  /**
   * TODO
   * @param historyMetas=false        [description]
   */
  constructor(initToken: InitToken, historyMetas = false) {
    super(initToken);
    // Types are hacked a bit here to make implementation simpler
    this.state = new MultipleSemidirectState(historyMetas);
  }

  childSend(child: Crdt, messagePath: (string | Uint8Array)[]): void {
    if (child.parent !== this) {
      throw new Error("childSend called by non-child: " + child);
    }

    messagePath.push(child.name);
    this.send(messagePath);
  }

  nextMessageMeta(): MessageMeta {
    return this.parent.nextMessageMeta();
  }

  protected crdts: Array<StatefulCrdt<S>> = [];

  /**
   * TODO
   * @param  m2TargetPath [description]
   * @param  m2Meta  [description]
   * @param  m2Message    [description]
   * @param  m2Index      [description]
   * @param  m1TargetPath [description]
   * @param  m1Meta  [description]
   * @param  m1Message    [description]
   * @return              [description]
   */
  protected abstract action(
    m2MessagePath: (Uint8Array | string)[],
    m2Meta: MessageMeta | null,
    m2Index: number,
    m1MessagePath: (Uint8Array | string)[],
    m1Meta: MessageMeta | null
  ): { m1MessagePath: (Uint8Array | string)[] } | null;

  protected setupState(initialState: S) {
    this.state.internalState = initialState;
  }

  /**
   * Must be called after setupState, and in arbitration order
   * (ascending).
   */
  protected setupOneCrdt<C extends StatefulCrdt<S>>(preCrdt: Pre<C>): C {
    const crdt = preCrdt(new InitToken("crdt" + this.crdts.length, this));
    // @ts-ignore Ignore readonly
    crdt.state = this.state.internalState;
    this.crdts.push(crdt);
    return crdt;
  }

  // The resulting message mact is then applied to σ and added to the history.
  // It also acts on all messages in the history with lower arbitration order,
  // regardless ofwhether they are concurrent or not.
  protected receiveInternal(
    messagePath: (Uint8Array | string)[],
    meta: MessageMeta
  ) {
    if (messagePath.length === 0) {
      throw new Error("TODO");
    }

    const name = <string>messagePath[messagePath.length - 1];
    let idx: number;
    if (
      name.substr(0, 4) == "crdt" &&
      (idx = parseInt(name.substr(4))) !== NaN
    ) {
      messagePath.length--;
      let crdt = this.crdts[idx];

      // Be acted on by all concurrent messages with greater
      // arbitration index (idx).
      let concurrent = this.state.getConcurrent(
        this.runtime.replicaId,
        meta,
        idx
      );

      let mAct = {
        m1MessagePath: messagePath,
      };
      for (let i = 0; i < concurrent.length; i++) {
        if (concurrent[i].messagePath !== null) {
          let mActOrNull = this.action(
            concurrent[i].messagePath!,
            concurrent[i].meta,
            concurrent[i].arbIndex,
            mAct.m1MessagePath,
            meta
          );

          if (mActOrNull == null) return;
          else mAct = mActOrNull;
        }
      }

      // mAct should act on all messages in history w/ lower order
      let hist = this.state.getLowerHistory(idx);
      hist.forEach((msg) => {
        if (msg.messagePath !== null) {
          let acted = this.action(
            mAct.m1MessagePath,
            meta,
            idx,
            msg.messagePath,
            msg.meta
          );

          if (acted) msg.setMessagePath(acted.m1MessagePath);
          else msg.setMessagePath(null);
        }
      });

      // add mAct to state and history
      this.state.add(messagePath.slice(), meta, idx);

      crdt.receive(mAct.m1MessagePath, meta);
    } else {
      throw new Error(
        "Unknown SemidirectProduct child: " +
          name +
          " in: " +
          JSON.stringify(messagePath)
      );
    }
  }

  save(): Uint8Array {
    const saveMessage = MultiSemidirectProductSave.create({
      childSaves: this.crdts.map((crdt) => crdt.save()),
      historySave: this.state.save(),
    });
    return MultiSemidirectProductSave.encode(saveMessage).finish();
  }

  /**
   * Map from child names to their saveData, containing
   * precisely the children that have not yet initiated loading.
   * null if we are not currently loading children.
   */
  private pendingChildSaves: Map<number, Uint8Array> | null = null;

  /**
   * TODO: the children loading their own states (all
   * of them, in arbitration order) must correctly set
   * this.internalState, whatever it is.
   * Need option to do custom loading if that's not the
   * case.
   * @param saveData [description]
   */
  load(saveData: Uint8Array | null): void {
    if (saveData === null) {
      // Indicates skipped loading. Pass on the message.
      for (const crdt of this.crdts) crdt.load(null);
    } else {
      const saveMessage = MultiSemidirectProductSave.decode(saveData);
      // For the child saves: it's possible that loading
      // one child might lead to this.getDescendant being
      // called for some other child (typically by deserializing
      // a Crdt reference). So we use this.pendingChildSaves
      // to allow getDescendant to load children on demand.
      this.pendingChildSaves = new Map(saveMessage.childSaves.entries());
      for (const [idx, childSave] of this.pendingChildSaves) {
        this.pendingChildSaves.delete(idx);
        // Note this loop will skip over children that get
        // loaded preemptively by getDescendant, since they
        // are deleted from this.pendingChildSaves.
        this.crdts[idx].load(childSave);
      }
      this.pendingChildSaves = null;
      this.state.load(saveMessage.historySave);
    }
  }

  getDescendant(namePath: string[]): Crdt {
    if (namePath.length === 0) return this;

    const name = namePath[namePath.length - 1];
    let idx: number;
    if (
      name.substr(0, 4) == "crdt" &&
      (idx = parseInt(name.substr(4))) !== NaN
    ) {
      namePath.length--;
      if (this.pendingChildSaves !== null && namePath.length > 0) {
        // Ensure child is loaded.
        const childSave = this.pendingChildSaves.get(idx);
        if (childSave !== undefined) {
          this.pendingChildSaves.delete(idx);
          this.crdts[idx].load(childSave);
        }
      }
      return this.crdts[idx].getDescendant(namePath);
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
}
