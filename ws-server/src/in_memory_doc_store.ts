import { UpdateType } from "@collabs/ws-client/src/update_type";
import { ServerDocStore } from "./server_doc_store";

interface StoredDoc {
  savedState: Uint8Array | null;
  updates: Uint8Array[];
  updateTypes: UpdateType[];
  savedStateCount: number;
  lastSaveRequestTime: number | null;
}

export class InMemoryDocStore implements ServerDocStore {
  /** Maps docID -> stored info. */
  private docs = new Map<string, StoredDoc>();

  private getInfo(docID: string): StoredDoc {
    let info = this.docs.get(docID);
    if (info === undefined) {
      info = {
        savedState: null,
        updates: [],
        updateTypes: [],
        savedStateCount: 0,
        lastSaveRequestTime: null,
      };
      this.docs.set(docID, info);
    }
    return info;
  }

  async load(
    docID: string
  ): Promise<
    [
      savedState: Uint8Array | null,
      updates: Uint8Array[],
      updateTypes: UpdateType[]
    ]
  > {
    const info = this.getInfo(docID);
    return [info.savedState, info.updates.slice(), info.updateTypes.slice()];
  }

  async addUpdate(
    docID: string,
    update: Uint8Array,
    updateType: UpdateType
  ): Promise<string | null> {
    const info = this.getInfo(docID);
    info.updates.push(update);
    info.updateTypes.push(updateType);

    // Do save request if:
    // - There are at least 100 pending updates in the log.
    // - It has been at least 5 seconds since the last save request,
    // including potential failed or long-latency requests.
    if (info.updates.length >= 100) {
      if (
        info.lastSaveRequestTime === null ||
        info.lastSaveRequestTime + 5000 <= Date.now()
      ) {
        return `${info.savedStateCount}`;
      }
    }
    return null;
  }

  async save(
    docID: string,
    savedState: Uint8Array,
    saveRequest: string
  ): Promise<void> {
    const count = Number.parseInt(saveRequest);
    if (isNaN(count)) throw new Error(`Invalid saveRequest: ${saveRequest}`);

    const info = this.getInfo(docID);
    if (info.savedStateCount >= count) return;
    if (count > info.savedStateCount + info.updates.length) {
      throw new Error("savedState claims to contain more updates than exist");
    }

    const dominated = count - info.savedStateCount;
    info.savedState = savedState;
    info.savedStateCount = count;
    info.updates = info.updates.slice(dominated);
    info.updateTypes = info.updateTypes.slice(dominated);
  }
}
