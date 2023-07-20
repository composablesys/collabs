// TODO: for non-server doc stores, instead have them be like Yjs storage providers
// /WebSocketNetwork: new ...Storage(doc) or storage.subscribe(docID, doc).
// That way the storage can make choices about when to save etc.,
// instead of some external manager doing it.

import { UpdateType } from "@collabs/ws-client/src/update_type";

// Also means we don't have to define a standard DocStore API.
export interface ServerDocStore {
  // Only needs to be accurate as of the time the call started, but can be
  // more up-to-date.
  load(
    docID: string
    // TODO: binary instead
    // If it doesn't exist yet, return [null, []]
  ): Promise<
    [
      savedState: Uint8Array | null,
      updates: Uint8Array[],
      updateTypes: UpdateType[]
    ]
  >;

  /**
   * Returns [the update's count, number of pending updates].
   */
  addUpdate(
    docID: string,
    update: Uint8Array,
    updateType: UpdateType
  ): Promise<[count: number, logLength: number]>;

  /**
   * count: last update that is dominated by this save.
   *
   * Ignore if the current savedState already includes count. This may include
   * in-progress saves - just make sure you don't lose any updates.
   */
  save(docID: string, savedState: Uint8Array, count: number): Promise<void>;
}
