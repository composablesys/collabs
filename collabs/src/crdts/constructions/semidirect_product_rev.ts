import {
  ISemidirectProductRevSenderHistory,
  SemidirectProductRevSave,
} from "../../../generated/proto_compiled";
import { CObject, PublicCObject, RunLocallyLayer } from "../../constructions";
import {
  MessageMeta,
  Collab,
  CollabEventsRecord,
  InitToken,
  Runtime,
  Pre,
  Message,
} from "../../core";
import { DefaultSerializer, Optional, Serializer } from "../../util";
import { CRDTMeta, CRDTMetaRequestee } from "../crdt-runtime";

/* eslint-disable */

// TODO: revise this file.

class StoredMessage {
  constructor(
    readonly senderCounter: number,
    readonly receiptCounter: number,
    readonly targetPath: string[],
    readonly crdtMeta: CRDTMeta | null,
    readonly message: Uint8Array
  ) {}
}

export class StoredMessageEvent {
  constructor(readonly eventName: string, readonly event: any) {}
}

// TODO: future opts: indexed messages; setting the history
// to a subset; causal stability.
// TODO: for this to work, replicaID's must be comparable according
// to the same-equals approach.  Typically, this requires them
// to be primitive types, as objects which are equal-valued but have
// different pointers will be considered different.
// TODO: mention that to get a proper CRDT (equal internal states),
// we technically must compare receipt orders as equivalent if
// they are both in causal order.

// TODO: In runtime, store a mapping from `${meta.sender}{meta.vectorClock.get(meta.sender)}` to the events triggered by the message.
// TODO: In runtime, add a getMessageEvents() method that retrieves the list of events from mapping.get(`${meta.sender}{meta.vectorClock.get(meta.sender)}`)
// TODO: In runtime, add an addMessageEventIfTracked() method that does mapping.get(`${meta.sender}{meta.vectorClock.get(meta.sender)}`).push(event) if the mapping has the key.
// TODO: In runtime, add a trackMessageEvents() method that adds `${meta.sender}{meta.vectorClock.get(meta.sender)}`: [] to the mapping.
// TODO: In runtime, add an untrackMessageEvents() method that removes `${meta.sender}{meta.vectorClock.get(meta.sender)}` from the mapping.
// TODO: In Collab's omit, call addMessageEventIfTracked()

export class MessageHistory<Events extends CollabEventsRecord> {
  protected receiptCounter = 0;
  /**
   * Maps a replica id to an array of messages sent by that
   * replica, in order.  Keep in mind that per-sender message
   * counters may not be contiguous, since they are shared between
   * all Collabs with a given root.
   */
  protected history: Map<string, Array<StoredMessage>> = new Map();
  protected messageEvents: Map<string, Array<StoredMessageEvent>> = new Map();
  constructor(
    private readonly historyTimestamps: boolean,
    private readonly historyDiscard1Dominated: boolean,
    private readonly historyDiscard2Dominated: boolean
  ) {}
  /**
   * Add message to the history with the given crdtMeta.
   * replicaID is our replica id.
   */
  add(
    replicaID: string,
    targetPath: string[],
    crdtMeta: CRDTMeta,
    message: Uint8Array
  ): string {
    if (this.historyDiscard2Dominated) {
      this.processTimestamp(replicaID, crdtMeta, false, true);
    }
    let senderHistory = this.history.get(crdtMeta.sender);
    if (senderHistory === undefined) {
      senderHistory = [];
      this.history.set(crdtMeta.sender, senderHistory);
    }
    senderHistory.push(
      new StoredMessage(
        crdtMeta.senderCounter,
        this.receiptCounter,
        targetPath,
        this.historyTimestamps ? crdtMeta : null,
        message
      )
    );

    const m2Id = `${crdtMeta.sender}${crdtMeta.senderCounter}`;

    // Start tracking message events
    this.messageEvents.set(`${crdtMeta.sender}${crdtMeta.senderCounter}`, []);
    this.receiptCounter++;
    return m2Id;
  }

  /**
   * Return all messages in the history concurrent to the given
   * crdtMeta, in some causal order (specifically, this replica's
   * receipt order).  If we are the sender (i.e., replicaID ===
   * crdtMeta.sender), it is assumed that the crdtMeta is
   * causally greater than all prior messages, hence [] is returned.
   */
  getConcurrent(replicaID: string, crdtMeta: CRDTMeta) {
    return this.processTimestamp(
      replicaID,
      crdtMeta,
      true,
      this.historyDiscard1Dominated
    );
  }

  /**
   * Performs specified actions on all messages in the history:
   * - if returnConcurrent is true, returns the list of
   * all messages in the history concurrent to crdtMeta, in
   * receipt order.
   * - if discardDominated is true, deletes all messages from
   * the history whose crdtMetas are causally dominated by
   * or equal to the given crdtMeta.  (Note that this means that
   * if we want to keep a message with the given crdtMeta in
   * the history, it must be added to the history after calling
   * this method.)
   */
  private processTimestamp(
    replicaID: string,
    crdtMeta: CRDTMeta,
    returnConcurrent: boolean,
    discardDominated: boolean
  ) {
    if (replicaID === crdtMeta.sender) {
      if (discardDominated) {
        for (let historyEntry of this.history.entries()) {
          for (let message of historyEntry[1]) {
            // Stop tracking message events
            this.messageEvents.delete(
              `${message.crdtMeta!.sender}${message.crdtMeta!.senderCounter}`
            );
          }
        }
        // Nothing's concurrent, so clear everything
        this.history.clear();
      }
      return [];
    }
    // Gather up the concurrent messages.  These are all
    // messages by each replicaID with sender counter
    // greater than crdtMeta.vectorClock.get(replicaID).
    let concurrent: Array<[string, StoredMessage]> = [];
    for (let historyEntry of this.history.entries()) {
      let senderHistory = historyEntry[1];
      let vcEntry = crdtMeta.vectorClockGet(historyEntry[0]);
      if (senderHistory !== undefined) {
        let concurrentIndexStart = MessageHistory.indexAfter(
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
              `${senderHistory[i].crdtMeta!.sender}${
                senderHistory[i].crdtMeta!.senderCounter
              }`
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
    // Note that there may be duplicate crdtMetas.
    // So it would be inappropriate to find an entry whose
    // per-sender counter equals value and infer that
    // the desired index is 1 greater.
    for (let i = sparseArray.length - 1; i >= 0; i--) {
      if (sparseArray[i].senderCounter <= value) return i + 1;
    }
    return 0;
  }

  addMessageEvent(messageId: string, eventName: string, event: any) {
    if (this.messageEvents.has(messageId)) {
      this.messageEvents
        .get(messageId)!
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
            // TODO: crdtMeta, if this.historyTimestamps.
            message: message.message,
          };
        }),
      };
    }
    const messageEventsSave: { [id: string]: string } = {};
    for (const [id, event] of this.messageEvents) {
      // TODO: intelligent way to serialize events.
      // In particular, this will do silly things to
      // crdtMeta.
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
              null,
              // this.historyTimestamps
              //   ? runtime.metaSerializer.deserialize(message.meta!, runtime)
              //   : null,
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

export type m1Start<m1ArgsT> = {
  m: 1;
  args: m1ArgsT;
};

export type m2Start<m2ArgsT> = {
  m: 2;
  args: m2ArgsT;
};

export type SemidirectMessage<m1ArgsT, m2ArgsT> =
  | m1Start<m1ArgsT>
  | m2Start<m2ArgsT>;

/**
 * # Experimental
 */
export abstract class SemidirectProductRev<
  Events extends CollabEventsRecord = CollabEventsRecord,
  C extends Collab = Collab,
  m1Args extends Array<any> = [],
  m2Args extends Array<any> = [],
  m1Ret extends any | void = any | void,
  m2Ret extends any | void = any | void
> extends CObject<Events> {
  protected history = new MessageHistory(false, false, false);
  private receivedMessages = false;
  private m2Id = "";
  private _m1?: (...args: m1Args) => m1Ret;
  private _m2?: (...args: m2Args) => m2Ret;
  private m1RetVal?: m1Ret;
  private m2RetVal?: m2Ret;
  private messageValueSerializer: Serializer<SemidirectMessage<m1Args, m2Args>>;

  protected readonly runLocallyLayer: RunLocallyLayer;
  private readonly internalCObject: PublicCObject;

  constructor(
    initToken: InitToken,
    historyTimestamps: boolean = false,
    historyDiscard1Dominated: boolean = false,
    historyDiscard2Dominated: boolean = false
  ) {
    super(initToken);

    this.runLocallyLayer = super.addChild("", Pre(RunLocallyLayer)());
    this.internalCObject = this.runLocallyLayer.setChild(Pre(PublicCObject)());

    this.messageValueSerializer = DefaultSerializer.getInstance(
      initToken.runtime
    );

    this.history = new MessageHistory(
      historyTimestamps,
      historyDiscard1Dominated,
      historyDiscard2Dominated
    );

    // TODO: fix this subterfuge: separate methods for
    // implementing (abstract, not called by users) and
    // calling (the concrete wrappers here).
    this._m1 = this.m1;
    this._m2 = this.m2;
    this.m1 = (...args: m1Args) => {
      this.m1RetVal = undefined;
      // Request all context.
      const crdtMetaRequestee = <CRDTMetaRequestee>(
        this.getContext(CRDTMetaRequestee.CONTEXT_KEY)
      );
      crdtMetaRequestee.requestAll();
      // Send.
      this.send([this.messageValueSerializer.serialize({ m: 1, args })]);
      return this.m1RetVal as m1Ret;
    };
    this.m2 = (...args: m2Args) => {
      this.m2RetVal = undefined;
      // Request all context.
      const crdtMetaRequestee = <CRDTMetaRequestee>(
        this.getContext(CRDTMetaRequestee.CONTEXT_KEY)
      );
      crdtMetaRequestee.requestAll();
      // Send.
      this.send([this.messageValueSerializer.serialize({ m: 2, args })]);
      return this.m2RetVal as m2Ret;
    };
  }

  protected addSemidirectChild<D extends C>(name: string, preChild: Pre<D>): D {
    return this.internalCObject.addChild(name, preChild);
  }

  protected trackM2Event(eventName: string, event: any) {
    this.history.addMessageEvent(this.m2Id, eventName, event);
  }

  abstract m1(...args: m1Args): m1Ret;
  abstract m2(...args: m2Args): m2Ret;

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
    m2Timestamp: CRDTMeta | null,
    m2Message: m2Start<m2Args>,
    m2TrackedEvents: [string, any][],
    m1TargetPath: string[],
    m1Timestamp: CRDTMeta,
    m1Message: m1Start<m1Args>
  ): { m1TargetPath: string[]; m1Message: m1Start<m1Args> } | null {
    return { m1TargetPath, m1Message };
  }

  protected receiveInternal(messagePath: Message[], meta: MessageMeta) {
    const crdtMeta = <CRDTMeta>meta[CRDTMeta.MESSAGE_META_KEY];

    this.receivedMessages = this.receivedMessages || true;
    const message = messagePath[messagePath.length - 1];
    if (typeof message !== "string") {
      // Uint8Array, message for ourselves.
      const semidirectMessage = this.messageValueSerializer.deserialize(
        <Uint8Array>message
      );
      switch (true) {
        case semidirectMessage.m === 1:
          let concurrent = this.history.getConcurrent(
            this.runtime.replicaID,
            crdtMeta
          );
          let mAct = {
            m1TargetPath: <string[]>[], // TODO: not actually used/usable
            m1Message: semidirectMessage,
          };
          if (concurrent.length > 0) {
            for (let i = 0; i < concurrent.length; i++) {
              // TODO: can we avoid serializing and
              // deserializing each time?
              let mActOrNull = this.action(
                concurrent[i][1].targetPath,
                concurrent[i][1].crdtMeta,
                this.messageValueSerializer.deserialize(
                  concurrent[i][1].message
                ) as m2Start<m2Args>,
                this.history
                  .getMessageEvents(
                    concurrent[i][0],
                    concurrent[i][1].senderCounter
                  )!
                  .map(({ eventName, event }) => [eventName, event]),
                mAct.m1TargetPath,
                crdtMeta,
                mAct.m1Message as m1Start<m1Args>
              );
              if (mActOrNull === null) return;
              else mAct = mActOrNull;
            }
          }
          this.m1RetVal = this.runLocallyLayer.runLocally(meta, () => {
            return this._m1!(...(mAct.m1Message as m1Start<m1Args>).args);
          });
          return;
        case semidirectMessage.m === 2:
          this.m2Id = this.history.add(
            this.runtime.replicaID,
            [], // TODO: not actually used/usable
            crdtMeta,
            <Uint8Array>message
          );
          this.m2RetVal = this.runLocallyLayer.runLocally(meta, () => {
            return this._m2!(...(semidirectMessage as m2Start<m2Args>).args);
          });
          return;
        default:
          console.log("somehow got to default");
          console.log(semidirectMessage);
          return;
      }
    }

    let child = this.children.get(message);
    if (child === undefined) {
      throw new Error(
        "Unknown child: " +
          message +
          " in: " +
          JSON.stringify(messagePath) +
          ", children: " +
          JSON.stringify([...this.children.keys()])
      );
    }
    messagePath.length--;
    child.receive(messagePath, meta);
  }

  canGC(): boolean {
    // TODO: this may spuriously return false if one of the Collab's is not
    // in its initial state only because we overwrote that state with
    // the semidirect initial state.  Although, for our Collab's so far
    // (e.g CNumber), it ends up working because they check canGC()
    // by asking the state if it is in its initial state.
    return this.history.isHistoryEmpty() && super.canGC();
  }

  protected saveObject(): Uint8Array {
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

  protected loadSemidirectProductRev(saveData: Optional<Uint8Array>) {}

  // TODO: the children loading their own states (both
  // of them, in arbitrary order) must correctly set
  // this.internalState, whatever it is.
  // Need option to do custom loading if that's not the
  // case.
  protected loadObject(saveData: Optional<Uint8Array>) {
    if (!saveData.isPresent) this.loadSemidirectProductRev(saveData);
    else {
      this.loadSemidirectProductRev(
        Optional.of(this.history.load(saveData.get(), this.runtime))
      );
    }
  }
}
