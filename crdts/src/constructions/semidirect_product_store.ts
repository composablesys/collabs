import {
  CObject,
  DefaultSerializer,
  InitToken,
  Optional,
  Serializer,
} from "@collabs/core";
import {
  ISemidirectProductStoreSenderHistory,
  SemidirectProductStoreSave,
} from "../../generated/proto_compiled";
import { CRDTMeta } from "../crdt-runtime";

class StoredMessage<M2> {
  constructor(
    readonly senderCounter: number,
    readonly receiptCounter: number,
    readonly message: M2
  ) {}
}

// Currently, this doesn't need to be a Collab; it just stores
// stuff. We'll leave it as one for now in case it requires
// message sending later. Will reconsider the next time we
// refactor the semidirect product API.

/**
 * # Experimental
 *
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
 *
 * TODO: will probably need to requestAll `CRDTMeta`
 * (via [[CRDTMetaRequestee.requestAll]], or perhaps
 * make it easy to do this with [[CMessenger]]) when
 * sending a message that might result in storing something
 * here, since we need the full vector clock.
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
    init: InitToken,
    private readonly action: (m2: M2, m1: M1) => M1 | null,
    private readonly m2Serializer: Serializer<M2> = DefaultSerializer.getInstance(),
    private readonly discardM1Dominated = false,
    private readonly discardM2Dominated = false
  ) {
    super(init);
  }

  processM2(m2: M2, crdtMeta: CRDTMeta): void {
    // Add m2 to the history.
    if (this.discardM2Dominated) {
      this.processMeta(crdtMeta, false, true);
    }
    let senderHistory = this.history.get(crdtMeta.sender);
    if (senderHistory === undefined) {
      senderHistory = [];
      this.history.set(crdtMeta.sender, senderHistory);
    }
    senderHistory.push(
      new StoredMessage(crdtMeta.senderCounter, this.receiptCounter, m2)
    );
    this.receiptCounter++;
  }

  processM1(m1: M1, crdtMeta: CRDTMeta): M1 | null {
    // Collect concurrent messages.
    const concurrent = this.processMeta(
      crdtMeta,
      true,
      this.discardM1Dominated
    );
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
   * all messages in the history concurrent to crdtMeta, in
   * receipt order.
   * - if discardDominated is true, deletes all messages from
   * the history whose crdtMetas are causally dominated by
   * or equal to the given crdtMeta.  (Note that this means that
   * if we want to keep a message with the given crdtMeta in
   * the history, it must be added to the history after calling
   * this method.)
   */
  private processMeta(
    crdtMeta: CRDTMeta,
    returnConcurrent: boolean,
    discardDominated: boolean
  ) {
    if (this.runtime.replicaID === crdtMeta.sender) {
      if (discardDominated) {
        // Nothing's concurrent, so clear everything
        this.history.clear();
      }
      return [];
    }
    // Gather up the concurrent messages.  These are all
    // messages by each replicaID with sender counter
    // greater than crdtMeta.vectorClock.get(replicaID).
    const concurrent: StoredMessage<M2>[] = [];
    for (const [sender, senderHistory] of this.history.entries()) {
      const vcEntry = crdtMeta.vectorClockGet(sender);
      if (senderHistory !== undefined) {
        const concurrentIndexStart = this.indexAfter(senderHistory, vcEntry);
        if (returnConcurrent) {
          for (let i = concurrentIndexStart; i < senderHistory.length; i++) {
            concurrent.push(senderHistory[i]);
          }
        }
        if (discardDominated) {
          // Keep only the messages with index
          // >= concurrentIndexStart.
          if (concurrentIndexStart === senderHistory.length) {
            // We want to empty senderHistory completely;
            // delete it from this.history.
            this.history.delete(sender);
          } else {
            senderHistory.splice(0, concurrentIndexStart);
          }
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
    // OPT: binary search when sparseArray is large?
    // Note that there may be duplicate crdtMetas.
    // So it would be inappropriate to find an entry whose
    // per-sender counter equals value and infer that
    // the desired index is 1 greater.
    for (let i = sparseArray.length - 1; i >= 0; i--) {
      if (sparseArray[i].senderCounter <= value) return i + 1;
    }
    return 0;
  }

  canGC(): boolean {
    // canGC() iff the history is empty.
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

  protected loadObject(savedState: Optional<Uint8Array>) {
    if (!savedState.isPresent) return;
    const saveMessage = SemidirectProductStoreSave.decode(savedState.get());
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
