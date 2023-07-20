import { UpdateType } from "@collabs/ws-client/src/update_type";
import { ServerDocStore } from "./server_doc_store";

interface StoredDoc {
  savedState: Uint8Array | null;
  updates: Uint8Array[];
  updateTypes: UpdateType[];
  savedStateCount: number;
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
  ): Promise<[count: number, logLength: number]> {
    const info = this.getInfo(docID);
    info.updates.push(update);
    info.updateTypes.push(updateType);
    return [info.savedStateCount + info.updates.length, info.updates.length];
  }

  async save(
    docID: string,
    savedState: Uint8Array,
    count: number
  ): Promise<void> {
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
