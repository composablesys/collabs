import { ServerDocStore } from "./server_doc_store";

/** How many updates before we consider a checkpoint. */
const updatesBeforeCheckpoint = 100;
/** The minimum time between checkpoints. */
const checkpointInterval = 10000;

interface StoredDoc {
  checkpoint: Uint8Array | null;
  /** Updates not included in savedState (the last checkpoint). */
  updates: Uint8Array[];
  updateTypes: number[];
  /**
   * The number of our all-time updates included in savedState
   * (the last checkpoint).
   */
  lastCheckpointCounter: number;
  lastCheckpointRequestTime: number | null;
}

/**
 * Simple implementation of [[ServerDocStore]] for demonstration purposes.
 *
 * It stores all of its documents in memory only, hence is not reliable.
 * But you can use
 * [its source code](https://github.com/composablesys/collabs/blob/master/ws-server/src/in_memory_doc_store.ts)
 * for guidance when implementing a proper, persistent ServerDocStore.
 */
export class InMemoryDocStore implements ServerDocStore {
  /** Maps docID -> stored info. */
  private docs = new Map<string, StoredDoc>();

  private getInfo(docID: string): StoredDoc {
    let info = this.docs.get(docID);
    if (info === undefined) {
      info = {
        checkpoint: null,
        updates: [],
        updateTypes: [],
        lastCheckpointCounter: 0,
        lastCheckpointRequestTime: null,
      };
      this.docs.set(docID, info);
    }
    return info;
  }

  async load(docID: string): Promise<{
    checkpoint: Uint8Array | null;
    updates: Uint8Array[];
    updateTypes: number[];
  }> {
    const info = this.getInfo(docID);
    return {
      checkpoint: info.checkpoint,
      updates: info.updates.slice(),
      updateTypes: info.updateTypes.slice(),
    };
  }

  async addUpdate(
    docID: string,
    update: Uint8Array,
    updateType: number
  ): Promise<string | null> {
    const info = this.getInfo(docID);
    info.updates.push(update);
    info.updateTypes.push(updateType);

    // Do checkpoint request if:
    // - There are at least 100 pending updates in the log.
    // - It has been at least 10 seconds since the last save request,
    // including potential failed or long-latency requests.
    if (info.updates.length >= updatesBeforeCheckpoint) {
      if (
        info.lastCheckpointRequestTime === null ||
        info.lastCheckpointRequestTime + checkpointInterval <= Date.now()
      ) {
        // The number of our all-time updates included in savedState + updates.
        const updateCount = info.lastCheckpointCounter + info.updates.length;
        return `${updateCount}`;
      }
    }
    return null;
  }

  async checkpoint(
    docID: string,
    savedState: Uint8Array,
    checkpointRequest: string
  ): Promise<void> {
    // The number of our all-time updates included in savedState.
    const updateCount = Number.parseInt(checkpointRequest);
    if (isNaN(updateCount))
      throw new Error(`Invalid saveRequest: ${checkpointRequest}`);

    const info = this.getInfo(docID);
    if (info.lastCheckpointCounter >= updateCount) return;
    if (updateCount > info.lastCheckpointCounter + info.updates.length) {
      throw new Error("savedState claims to contain more updates than exist");
    }

    // The number of updates in the current log that are included in savedState.
    const dominated = updateCount - info.lastCheckpointCounter;
    info.checkpoint = savedState;
    info.updates = info.updates.slice(dominated);
    info.updateTypes = info.updateTypes.slice(dominated);
    info.lastCheckpointCounter = updateCount;
  }
}
