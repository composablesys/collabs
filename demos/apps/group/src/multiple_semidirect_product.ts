import {
  Collab,
  CollabEventsRecord,
  CollabID,
  CRDTMessageMeta,
  InitToken,
  IParent,
  MetaRequest,
  Parent,
  SavedStateTree,
  UpdateMeta,
} from "@collabs/collabs";
import {
  collabIDOf,
  MessageStacksSerializer,
  protobufHas,
} from "@collabs/core";
import {
  IMultiSemidirectProductSenderHistory,
  MultiSemidirectProductHistorySave,
} from "../generated/proto_compiled";

/* eslint-disable */

/**
 * Interface describing a Collab which stores all of its mutable state
 * in a single readonly variable state of type S.
 *
 * Such a Collab must continue
 * to function after state is mutated or even replaced (ignoring state's
 * readonly property) as if it had changed state itself.
 *
 * This interace is used by SemidirectProduct, which composes two
 * StatefulCRDT's of the same type, unifying their states by setting
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
export interface StatefulCRDT<S extends object> extends Collab {
  /**
   * Not for use outside of this (treat as protected).
   */
  readonly state: S;
}

class StoredMessage {
  messageStack: (Uint8Array | string)[] | null;
  constructor(
    readonly sender: string,
    readonly senderCounter: number,
    readonly receiptCounter: number,
    messageStack: (Uint8Array | string)[] | null,
    readonly meta: UpdateMeta | null,
    readonly arbIndex: number // arbitration number
  ) {
    this.messageStack = messageStack;
  }

  setMessageStack(newMessageStack: (Uint8Array | string)[] | null) {
    this.messageStack = newMessageStack;
  }
}

class MultipleSemidirectState<S extends object> {
  protected receiptCounter = 0;
  /**
   * Maps a replica id to an array of messages sent by that
   * replica, in order.  Keep in mind that per-sender message
   * counters may not be contiguous, since they are shared between
   * all Collabs with a given root.
   */
  protected history: Map<string, Array<StoredMessage>> = new Map();
  public internalState!: S;
  constructor(private readonly historyMetas: boolean) {}

  /**
   * Add message to the history with the given meta.
   * replicaID is our replica id.
   */
  add(
    messageStack: (Uint8Array | string)[],
    meta: UpdateMeta,
    crdtMeta: CRDTMessageMeta,
    arbId: number
  ) {
    let senderHistory = this.history.get(meta.senderID);
    if (senderHistory === undefined) {
      senderHistory = [];
      this.history.set(meta.senderID, senderHistory);
    }
    senderHistory.push(
      new StoredMessage(
        crdtMeta.senderID,
        crdtMeta.senderCounter,
        this.receiptCounter,
        messageStack,
        this.historyMetas ? meta : null,
        arbId
      )
    );
    this.receiptCounter++;
  }

  /**
   * Return all messages in the history concurrent to the given
   * meta, in some causal order (specifically, this replica's
   * receipt order).  If we are the sender (i.e., replicaID ===
   * meta.senderID), it is assumed that the meta is
   * causally greater than all prior messages, hence [] is returned.
   */
  getConcurrent(replicaID: string, crdtMeta: CRDTMessageMeta, arbId: number) {
    return this.processMeta(replicaID, crdtMeta, true, arbId);
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
    replicaID: string,
    crdtMeta: CRDTMessageMeta,
    returnConcurrent: boolean,
    arbId: number
  ) {
    // if replicaID === crdtMeta.senderID, we know the answer is [] (sequential).
    // But for automatic CRDTMessageMeta to work, we need to still access all
    // current VC entries. So, we skip that shortcut.

    // Gather up the concurrent messages.  These are all
    // messages by each replicaID with sender counter
    // greater than meta.vectorClock.get(replicaID).
    let concurrent: Array<StoredMessage> = [];
    for (let historyEntry of this.history.entries()) {
      let senderHistory = historyEntry[1];
      let vcEntry = crdtMeta.vectorClock.get(historyEntry[0]);
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

  /**
   * Returns an interable of all known senderIDs. Request these VC entries.
   * (TODO: is that sufficient in the face of history trimming?)
   */
  getKnownSenderIDs() {
    return this.history.keys();
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
            messageStack:
              message.messageStack === null
                ? null
                : MessageStacksSerializer.instance.serialize([
                    message.messageStack,
                  ]),
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

  load(savedState: Uint8Array) {
    const saveMessage = MultiSemidirectProductHistorySave.decode(savedState);
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
              protobufHas(message, "messageStack")
                ? MessageStacksSerializer.instance.deserialize(
                    message.messageStack!
                  )[0]
                : null,
              null,
              message.arbIndex
            )
        )
      );
    }
  }
}

/**
 * # Experimental
 *
 * Merging saved states is not supported; you may only call the ambient
 * `CRuntime.load` function in the initial state.
 */
export abstract class MultipleSemidirectProduct<
    S extends object,
    Events extends CollabEventsRecord = CollabEventsRecord
  >
  extends Collab<Events>
  implements IParent, StatefulCRDT<MultipleSemidirectState<S>>
{
  readonly state: MultipleSemidirectState<S>;

  /**
   * TODO
   * @param historyMetas=false        [description]
   */
  constructor(init: InitToken, historyMetas = false) {
    super(init);
    // Types are hacked a bit here to make implementation simpler
    this.state = new MultipleSemidirectState(historyMetas);
  }

  childSend(
    child: Collab,
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void {
    if (child.parent !== this) {
      throw new Error("childSend called by non-child: " + child);
    }

    // Automatic CRDTMessageMeta suffices: we need all known VC entries,
    // and these are accessed during the local echo.

    messageStack.push(child.name);
    this.send(messageStack, metaRequests);
  }

  protected crdts: Array<StatefulCRDT<S>> = [];

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
    m2MessageStack: (Uint8Array | string)[],
    m2Meta: UpdateMeta | null,
    m2Index: number,
    m1MessageStack: (Uint8Array | string)[],
    m1Meta: UpdateMeta | null
  ): { m1MessageStack: (Uint8Array | string)[] } | null;

  protected setupState(initialState: S) {
    this.state.internalState = initialState;
  }

  /**
   * Must be called after setupState, and in arbitration order
   * (ascending).
   */
  protected setupOneCRDT<C extends StatefulCRDT<S>>(
    crdtCallback: (init: InitToken) => C
  ): C {
    const crdt = crdtCallback(new InitToken("crdt" + this.crdts.length, this));
    // @ts-ignore Ignore readonly
    crdt.state = this.state.internalState;
    this.crdts.push(crdt);
    return crdt;
  }

  // The resulting message mact is then applied to σ and added to the history.
  // It also acts on all messages in the history with lower arbitration order,
  // regardless ofwhether they are concurrent or not.
  receive(messageStack: (Uint8Array | string)[], meta: UpdateMeta) {
    if (messageStack.length === 0) {
      throw new Error("Unexpected message");
    }

    const crdtMeta = <CRDTMessageMeta>meta.runtimeExtra;

    const name = <string>messageStack.pop();
    let idx: number;
    if (
      name.substring(0, 4) == "crdt" &&
      !Number.isNaN((idx = parseInt(name.substring(4))))
    ) {
      let crdt = this.crdts[idx];

      // Be acted on by all concurrent messages with greater
      // arbitration index (idx).
      let concurrent = this.state.getConcurrent(
        this.runtime.replicaID,
        crdtMeta,
        idx
      );

      let mAct = {
        m1MessageStack: messageStack,
      };
      for (let i = 0; i < concurrent.length; i++) {
        if (concurrent[i].messageStack !== null) {
          let mActOrNull = this.action(
            concurrent[i].messageStack!,
            concurrent[i].meta,
            concurrent[i].arbIndex,
            mAct.m1MessageStack,
            meta
          );

          if (mActOrNull == null) return;
          else mAct = mActOrNull;
        }
      }

      // mAct should act on all messages in history w/ lower order
      let hist = this.state.getLowerHistory(idx);
      hist.forEach((msg) => {
        if (msg.messageStack !== null) {
          let acted = this.action(
            mAct.m1MessageStack,
            meta,
            idx,
            msg.messageStack,
            msg.meta
          );

          if (acted) msg.setMessageStack(acted.m1MessageStack);
          else msg.setMessageStack(null);
        }
      });

      // add mAct to state and history
      this.state.add(messageStack.slice(), meta, crdtMeta, idx);

      crdt.receive(mAct.m1MessageStack, meta);
    } else {
      throw new Error(
        "Unknown SemidirectProduct child: " +
          name +
          " in: " +
          JSON.stringify(messageStack)
      );
    }
  }

  save(): SavedStateTree {
    const childSaves = new Map<string, SavedStateTree>();
    for (const [index, child] of this.crdts.entries()) {
      childSaves.set(index + "", child.save());
    }
    return { self: this.state.save(), children: childSaves };
  }

  /**
   * TODO: the children loading their own states (all
   * of them, in arbitration order) must correctly set
   * this.internalState, whatever it is.
   * Need option to do custom loading if that's not the
   * case.
   * @param savedState [description]
   */
  load(savedStateTree: SavedStateTree | null, meta: UpdateMeta): void {
    if (savedStateTree === null) return;

    for (const [name, savedState] of savedStateTree.children!) {
      if (savedState !== null) {
        this.crdts[Number.parseInt(name)].load(savedState, meta);
      }
    }
    this.state.load(savedStateTree.self!);
  }

  idOf<C extends Collab>(descendant: C): CollabID<C> {
    return collabIDOf(descendant, this);
  }

  fromID<C extends Collab>(id: CollabID<C>, startIndex = 0): C | undefined {
    const name = id.namePath[startIndex];
    const child = this.crdts[parseInt(name.substring(4))] as Collab;
    if (child === undefined) {
      throw new Error(
        "Unknown child: " + name + " in MultipleSemidirectProduct: "
      );
    }
    // Terminal case.
    // Note that this cast is unsafe, but convenient.
    if (startIndex === id.namePath.length - 1) return child as C;
    // Recursive case.
    if ((child as Parent).fromID === undefined) {
      throw new Error("child is not a parent, but CollabID is its descendant");
    }
    return (child as Parent).fromID(id, startIndex + 1);
  }

  canGC(): boolean {
    // TODO: this may spuriously return false if one of the Collab's is not
    // in its initial state only because we overwrote that state with
    // the semidirect initial state.  Although, for our Collab's so far
    // (e.g CNumber), it ends up working because they check canGC()
    // by asking the state if it is in its initial state.
    let crdtsCanGc = true;
    this.crdts.forEach((crdt) => {
      crdtsCanGc = crdtsCanGc && crdt.canGC();
    });

    return this.state.isHistoryEmpty() && crdtsCanGc;
  }
}
