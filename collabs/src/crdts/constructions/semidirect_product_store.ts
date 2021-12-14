import {
  ISemidirectProductStoreSenderHistory,
  SemidirectProductStoreSave,
} from "../../generated/proto_compiled";
import { InitToken, MessageMeta, Serializer } from "../core";
import { DefaultSerializer } from "../util";
import { CObject } from "./object";

class StoredMessage<M2> {
  constructor(
    readonly senderCounter: number,
    readonly receiptCounter: number,
    readonly message: M2
  ) {}
}

/**
 * A bare-bones semidirect product implementation that stores
 * and acts on custom messages provided by the user, without
 * performing any operations directly.
 *
 * Work in progress.
 *
 * Basically, you tell the store what Collab2 operations
 * happen (using processM2) and what Collab1 operations
 * are planned (using processM1).  Then for Collab1 operations, it
 * tells you the acted upon version that you should actually
 * perform, according to the semidirect
 * product algorithm.  Typically you will perform the operation
 * using [[Runtime.runLocally]].
 *
 * To learn what Collab2 operations happen, you can:
 * - Listen for the relevant events and call [[processM2]]
 * in the event handler.
 * - Use a [[CMessenger]] to send your own description of
 * what operation to perform, then in the event handler,
 * perform it using [[Runtime.runLocally]] before calling
 * [[processM2]].
 *
 * To plan Collab1 operations, you can likewise use a [[CMessenger]].
 * You can instead listen on an event for the original operation,
 * but only if the acted operation
 * has the form (do the original operation, then do the
 * operations specified by [[processM1]]'s output).
 * When performing the operation specified by [[processM1]]'s
 * output, take care not to repeat the already-completed
 * original operation.
 */
export class SemidirectProductStore<M1, M2> extends CObject {
  private receiptCounter = 0;

  /**
   * Maps a replica id to an array of M2 messages sent by that
   * replica, in order.  Keep in mind that per-sender message
   * counters may not be contiguous, since they are shared between
   * all Collabs with a given root.
   */
  private history: Map<string, StoredMessage<M2>[]> = new Map();

  constructor(
    initToken: InitToken,
    private readonly action: (m2: M2, m1: M1) => M1 | null,
    private readonly m2Serializer: Serializer<M2> = DefaultSerializer.getInstance(
      initToken.runtime
    ),
    private readonly discardM1Dominated = false,
    private readonly discardM2Dominated = false
  ) {
    super(initToken);
  }

  processM2(m2: M2, meta: MessageMeta): void {
    // Add m2 to the history.
    if (this.discardM2Dominated) {
      this.processMeta(meta, false, true);
    }
    let senderHistory = this.history.get(meta.sender);
    if (senderHistory === undefined) {
      senderHistory = [];
      this.history.set(meta.sender, senderHistory);
    }
    senderHistory.push(
      new StoredMessage(meta.senderCounter, this.receiptCounter, m2)
    );
    this.receiptCounter++;
  }

  processM1(m1: M1, meta: MessageMeta): M1 | null {
    // Collect concurrent messages.
    const concurrent = this.processMeta(meta, true, this.discardM1Dominated);
    // Action.
    for (const storedMessage of concurrent) {
      const mActOrNull = this.action(storedMessage.message, m1);
      if (mActOrNull === null) return null;
      m1 = mActOrNull;
    }
    return m1;
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
    meta: MessageMeta,
    returnConcurrent: boolean,
    discardDominated: boolean
  ) {
    if (this.runtime.replicaId === meta.sender) {
      if (discardDominated) {
        // Nothing's concurrent, so clear everything
        this.history.clear();
      }
      return [];
    }
    // Gather up the concurrent messages.  These are all
    // messages by each replicaId with sender counter
    // greater than meta.vectorClock!.get(replicaId).
    const concurrent: StoredMessage<M2>[] = [];
    const vc = meta.vectorClock!;
    for (const historyEntry of this.history.entries()) {
      const senderHistory = historyEntry[1];
      let vcEntry = vc.get(historyEntry[0]);
      if (senderHistory !== undefined) {
        let concurrentIndexStart = this.indexAfter(senderHistory, vcEntry);
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
   * Utility method for working with the per-sender history
   * arrays.  Returns the index after the last entry whose
   * per-sender counter (the first tuple element) is <=
   * value.
   */
  private indexAfter(sparseArray: StoredMessage<M2>[], value: number): number {
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

  canGc(): boolean {
    // canGc() iff the history is empty.
    for (const value of this.history.values()) {
      if (value.length !== 0) return false;
    }
    return true;
  }

  protected saveObject(): Uint8Array {
    const historySave: {
      [sender: string]: ISemidirectProductStoreSenderHistory;
    } = {};
    for (const [sender, messages] of this.history) {
      historySave[sender] = {
        messages: messages.map((message) => {
          return {
            senderCounter: message.senderCounter,
            receiptCounter: message.receiptCounter,
            message: this.m2Serializer.serialize(message.message),
          };
        }),
      };
    }
    const saveMessage = SemidirectProductStoreSave.create({
      receiptCounter: this.receiptCounter,
      history: historySave,
    });
    return SemidirectProductStoreSave.encode(saveMessage).finish();
  }

  protected loadObject(saveData: Uint8Array | null) {
    if (saveData === null) return;
    const saveMessage = SemidirectProductStoreSave.decode(saveData);
    this.receiptCounter = saveMessage.receiptCounter;
    for (const [sender, messages] of Object.entries(saveMessage.history)) {
      this.history.set(
        sender,
        messages.messages!.map(
          (message) =>
            new StoredMessage(
              message.senderCounter,
              message.receiptCounter,
              this.m2Serializer.deserialize(message.message)
            )
        )
      );
    }
  }
}
