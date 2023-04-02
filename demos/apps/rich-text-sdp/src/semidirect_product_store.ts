import {
  CObject,
  DefaultSerializer,
  InitToken,
  Serializer,
} from "@collabs/collabs";
import { SavedStateTree, UpdateMeta } from "@collabs/core";
import { CRDTMessageMeta, CRuntime } from "@collabs/crdts";
import {
  ISemidirectProductStoreSenderHistory,
  SemidirectProductStoreSave,
} from "../generated/proto_compiled";

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
 * using [[IRuntime.runLocally]].
 *
 * To learn what Collab2 operations happen, you can:
 * - Listen for the relevant events and call [[processM2]]
 * in the event handler.
 * - Use a [[CMessenger]] to send your own description of
 * what operation to perform, then in the event handler,
 * perform it using [[IRuntime.runLocally]] before calling
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
 * Merging saved states is not supported; you may only call the ambient
 * `CRuntime.load` function in the initial state.
 */
export class SemidirectProductStore<M1, M2> extends CObject {
  private readonly m2Serializer: Serializer<M2>;
  private readonly discardM1Dominated: boolean;
  private readonly discardM2Dominated: boolean;

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
    options: {
      m2Serializer?: Serializer<M2>;
      discardM1Dominated?: boolean;
      discardM2Dominated?: boolean;
    } = {}
  ) {
    super(init);

    this.m2Serializer = options.m2Serializer ?? DefaultSerializer.getInstance();
    this.discardM1Dominated = options.discardM1Dominated ?? false;
    this.discardM2Dominated = options.discardM2Dominated ?? false;

    if ((this.runtime as CRuntime).isCRDTRuntime !== true) {
      throw new Error("this.runtime must be CRuntime or compatible");
    }
  }

  processM2(m2: M2, crdtMeta: CRDTMessageMeta): void {
    // Add m2 to the history.
    if (this.discardM2Dominated) {
      this.processMeta(crdtMeta, false, true);
    }
    let senderHistory = this.history.get(crdtMeta.senderID);
    if (senderHistory === undefined) {
      senderHistory = [];
      this.history.set(crdtMeta.senderID, senderHistory);
    }
    senderHistory.push(
      new StoredMessage(crdtMeta.senderCounter, this.receiptCounter, m2)
    );
    this.receiptCounter++;
  }

  processM1(m1: M1, crdtMeta: CRDTMessageMeta): M1 | null {
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
    crdtMeta: CRDTMessageMeta,
    returnConcurrent: boolean,
    discardDominated: boolean
  ) {
    // if replicaID === crdtMeta.senderID, we know the answer is [] (sequential).
    // But for automatic CRDTMessageMeta to work, we need to still access all current VC
    // entries. So, we skip that shortcut.

    // Gather up the concurrent messages.  These are all
    // messages by each replicaID with sender counter
    // greater than crdtMeta.vectorClock.get(replicaID).
    // TODO: automatic VC entries should be sufficient, but double-check,
    // especially when discardDominated flags are set.
    // OPT: only request causally maximal VC entries (then require a full DAG).
    const concurrent: StoredMessage<M2>[] = [];
    for (const [sender, senderHistory] of this.history.entries()) {
      const vcEntry = crdtMeta.vectorClock.get(sender);
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
    // Note that there may be duplicate CRDTMessageMetas.
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

  save(): SavedStateTree {
    const ans = super.save();

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
    ans.self = SemidirectProductStoreSave.encode(saveMessage).finish();
    return ans;
  }

  // TODO: support merging. Possible algorithmically, just need to code it up.
  load(savedStateTree: SavedStateTree | null, meta: UpdateMeta) {
    if (savedStateTree === null) return;

    super.load(savedStateTree, meta);
    const savedState = savedStateTree.self!;

    const saveMessage = SemidirectProductStoreSave.decode(savedState);
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
