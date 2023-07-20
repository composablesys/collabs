import { UpdateType } from "@collabs/ws-client/src/update_type";

// Also means we don't have to define a standard DocStore API.
export interface ServerDocStore {
  // Only needs to be accurate as of the time the call started, but can be
  // more up-to-date.
  // If it doesn't exist yet, return [null, [], []].
  load(
    docID: string
  ): Promise<
    [
      savedState: Uint8Array | null,
      updates: Uint8Array[],
      updateTypes: UpdateType[]
    ]
  >;

  /**
   * Returns a "save request" ID if you think it's a good time to save,
   * else null.
   * E.g., an internal counter for this update. Caller guarantees that save
   * includes all updates up to this point.
   * Note: it will be sent over the network and echoed back by a client.
   */
  addUpdate(
    docID: string,
    update: Uint8Array,
    updateType: UpdateType
  ): Promise<string | null>;

  /**
   * Ignore if the current savedState is already newer than saveRequest. This may include
   * in-progress saves - just make sure you don't lose any updates.
   * Note: saveRequest comes over the network and should be validated.
   */
  save(
    docID: string,
    savedState: Uint8Array,
    saveRequest: string
  ): Promise<void>;
}
