import { UpdateType } from "@collabs/ws-client/src/update_type";

export { UpdateType };

/**
 * Interface for a class that stores documents on behalf of a
 * [[WebSocketNetworkServer]].
 *
 * We only provide [[InMemoryDocStore]]; to persist data to disk, you will
 * need to write your own implementation. See
 * [InMemoryDocStore's source code](https://github.com/composablesys/collabs/blob/master/ws-server/src/in_memory_doc_store.ts)
 * for guidance.
 *
 * # Storage Model
 *
 * Stored state is divided into "checkpoints" and "uncompacted updates",
 * like a database transaction log.
 *
 * Each update passed to [[addUpdate]] should be stored immediately.
 * It consists of a Uint8Array and an [[UpdateType]] (which you can
 * treat as opaque).
 *
 * When an update is stored, you may choose to request a checkpoint;
 * this is smaller and loads faster than the raw update log.
 * The server will ask one client to save their current state, which will
 * be passed to [[checkpoint]] (if successful).
 *
 * Once you save the new
 * checkpoint, you can safely delete all updates included in that checkpoint,
 * plus the previous checkpoint.
 */
export interface ServerDocStore {
  /**
   * Returns the current saved state of `docID`.
   *
   * As described in the class header, this state consists of a
   * checkpoint plus uncompacted updates.
   *
   * The return value only needs to be up-to-date as of the time this call
   * started, although it may be more up-to-date.
   *
   * If there is no saved state for `docID`, returns
   * `{ checkpoint: null, updates: [], updateTypes: [] }`.
   *
   * @return
   * - `checkpoint`: The checkpoint, if any.
   * - `updates`: The uncompacted updates.
   * - `updateTypes`: The [[UpdateType]] corresponding to each update in `updates`.
   */
  load(docID: string): Promise<{
    checkpoint: Uint8Array | null;
    updates: Uint8Array[];
    updateTypes: UpdateType[];
  }>;

  /**
   * Adds an update to the saved state for `docID`.
   *
   * @returns Optionally, a `checkpointRequest` string, requesting that some client
   * save their current state as a checkpoint. This is an opaque string
   * that will be passed to [[checkpoint]] along with the client's
   * saved state, if the checkpoint is successful.
   */
  addUpdate(
    docID: string,
    update: Uint8Array,
    updateType: UpdateType
  ): Promise<string | null>;

  /**
   * Processes a checkpoint performed in response to a `checkpointRequest`
   * from [[addUpdate]].
   *
   * `checkpoint` is guaranteed to be at least as up-to-date as the saved state
   * (previous checkpoint + uncompacted updates) at the end of the [[addUpdate]]
   * call that returned `checkpointRequest`. So, it may replace any checkpoint
   * and uncompacted updates older than that call.
   *
   * Implementer notes:
   * - `checkpointRequest` may be out-of-date, i.e., we have saved
   * a newer checkpoint since that request. In that case, this call should be ignored.
   * - `checkpointRequest` is received over the network from a client and
   * should be validated.
   */
  checkpoint(
    docID: string,
    checkpoint: Uint8Array,
    checkpointRequest: string
  ): Promise<void>;
}
