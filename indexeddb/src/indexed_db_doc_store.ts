import {
  AbstractDoc,
  CRuntime,
  EventEmitter,
  UpdateEvent,
} from "@collabs/collabs";
import { nonNull } from "@collabs/core";

/** How many updates before we consider a checkpoint. */
const updatesBeforeCheckpoint = 100;
/** The minimum time between checkpoints. */
const checkpointInterval = 10000;

const objectStoreName = "updates";

type Doc = AbstractDoc | CRuntime;

/*
  # Storage format

  Stored state is divided into "checkpoints" and "uncompacted updates",
  like a database transaction log.
  Each update is stored immediately.
  Occasionally we trigger a checkpoint, which replaces all the uncompacted
  updates (& previous checkpoint) with a single saved state; this is smaller
  and loads faster than the raw update log.
  
  Checkpoints are stored as objects of the form
  {
    docID: string;
    savedState: Uint8Array;
  }
  under an auto-generated primary key.

  Update storage:
  - Messages are stored as objects of the form
    {
      docID: string;
      message: Uint8Array;
    }
    under an auto-generated primary key.
  - Saved states from updates are not stored incrementally; instead, they trigger
    an immediate checkpoint.

  All values are immutable (a given primary key is 
  only set once). Thus it is safe to delete a key
  from a different tab; you don't have to worry about overwriting a
  concurrent change.
*/

type ValueType = {
  docID: string;
  savedState?: Uint8Array;
  message?: Uint8Array;
};

interface DocInfo {
  readonly docID: string;
  off?: () => void;
  /**
   * The primary keys of all of our saved and not-yet-deleted updates, including
   * the last checkpoint.
   *
   * They will be deleted at our next checkpoint.
   */
  currentUpdates: Set<string>;
  lastCheckpointTime: number;
  unsubscribed?: true;
}

/** Events record for [[IndexedDBDocStore]]. */
export interface IndexedDBDocStoreEventsRecord {
  /**
   * Emitted after doc's current state is confirmed saved to IndexedDB.
   */
  Save: { doc: AbstractDoc | CRuntime; docID: string };
  /**
   * Emitted after doc loads IndexedDB's current state.
   */
  Load: { doc: AbstractDoc | CRuntime; docID: string };
  /**
   * Emitted when IndexedDB emits an error event, e.g., because it is out of space.
   */
  Error: { err: Event };
}

/**
 * Stores updates to Collabs documents in IndexeddDB.
 *
 * To load existing state into a document (if any) and store future updates
 * to that document, call [[subscribe]]. You will need to supply a `docID`
 * that identifies which stored state to use.
 *
 * This class is designed to work seamlessly with other sources of updates,
 * such as [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client).
 * In particular, updates from those sources will be stored alongside local
 * operations.
 * - Exception: Updates from other tabs via
 * [@collabs/tab-sync](https://www.npmjs.com/package/@collabs/tab-sync) are not
 * saved, since the source tab should save them.
 *
 * See also: [@collabs/local-storage](https://www.npmjs.com/package/@collabs/local-storage),
 * which stores updates in localStorage instead of IndexedDB.
 */
export class IndexedDBDocStore extends EventEmitter<IndexedDBDocStoreEventsRecord> {
  /**
   * The name of this class's IndexedDB database,
   * set in the constructor.
   *
   * Default: "@collabs/indexeddb".
   */
  readonly dbName: string;

  private readonly dbPromise: Promise<IDBDatabase>;
  private db: IDBDatabase | null = null;

  private subs = new Map<Doc, DocInfo>();
  private docsByID = new Map<string, Doc>();

  private closed = false;

  /**
   * Constructs an IndexedDBDocStore.
   *
   * You typically only need one IndexedDBDocStore per app, since it
   * can [[subscribe]] multiple documents.
   *
   * @param options.dbName The name of the database to use.
   * Default: "@collabs/indexeddb".
   */
  constructor(options: { dbName?: string } = {}) {
    super();

    this.dbName = options.dbName ?? "@collabs/indexeddb";

    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      const openRequest = indexedDB.open(this.dbName, 1);
      openRequest.onupgradeneeded = () => {
        const db = openRequest.result;
        const objectStore = db.createObjectStore(objectStoreName, {
          autoIncrement: true,
        });
        objectStore.createIndex("docID", "docID", { unique: false });
      };
      openRequest.onsuccess = () => {
        this.db = openRequest.result;
        this.db.onerror = this.onError;
        resolve(openRequest.result);
      };
      openRequest.onerror = (event) => {
        this.onError(event);
        reject(event);
      };
    });
  }

  private onError = (err: Event) => {
    this.emit("Error", { err });
  };

  /**
   * Waits for tr to finish, returning whether it succeeded.
   *
   * Errors are suppressed (not thrown) since they are already reported to this.onError.
   */
  private trFinish(tr: IDBTransaction): Promise<boolean> {
    return new Promise((resolve) => {
      tr.oncomplete = () => resolve(true);
      tr.onabort = () => resolve(false);
      tr.onerror = () => resolve(false);
    });
  }

  // Implicit (not documented): works well with other tabs, but won't
  // actively load their stored states - only checks at time of subscribe.
  // Also, multiple tabs will duplicate checkpoints, increasing IndexedDB usage.
  /**
   * Subscribes `doc` to updates stored under `docID`.
   *
   * All existing updates under `docID` will be loaded into `doc`
   * asynchronously, emitting a "Load" event when finished (including
   * if there are no existing updates).
   *
   * Also, all new updates to `doc` will be saved under `docID`,
   * emitting a "Save" event whenever the IndexedDB state becomes up-to-date with `doc`.
   * This includes both local operations and updates from other sources.
   *
   * @param doc The document to subscribe.
   * @param docID An arbitrary string that identifies which stored state to use.
   * @throws If `doc` is already subscribed to a docID.
   * @throws If another doc is subscribed to `docID`.
   */
  subscribe(doc: AbstractDoc | CRuntime, docID: string): void {
    if (this.closed) throw new Error("Already closed");
    if (this.subs.has(doc)) {
      throw new Error("doc is already subscribed to a docID");
    }
    if (this.docsByID.has(docID)) {
      throw new Error("Unsupported: multiple docs with same docID");
    }

    // Store subscription info.
    const info: DocInfo = {
      docID,
      currentUpdates: new Set(),
      lastCheckpointTime: 0,
    };
    this.subs.set(doc, info);
    this.docsByID.set(docID, doc);

    // Load existing state into the doc and subscribe to future
    // updates, asynchronously.
    void this.subscribeAsync(doc, docID, info);
  }

  private async subscribeAsync(
    doc: Doc,
    docID: string,
    info: DocInfo
  ): Promise<void> {
    let db: IDBDatabase;
    try {
      db = await this.dbPromise;
    } catch (err) {
      // The error is already sent to onError; no need to send it again
      // or let the unhandled error spam the console.
      return;
    }

    // Skip if we've been unsubscribed already.
    if (info.unsubscribed) return;

    // 1. Read existing state from IndexedDB.
    const savedStates: Uint8Array[] = [];
    const messages: Uint8Array[] = [];
    {
      const tr = db.transaction([objectStoreName], "readonly");
      const objectStore = tr.objectStore(objectStoreName);

      const request = objectStore.index("docID").openCursor(docID);
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) return;

        const value = cursor.value as ValueType;
        if (typeof value === "object") {
          if (value.savedState !== undefined) {
            savedStates.push(value.savedState);
            info.currentUpdates.add(cursor.primaryKey as string);
          }
          if (value.message !== undefined) {
            messages.push(value.message);
            info.currentUpdates.add(cursor.primaryKey as string);
          }
        } // Else ignore (wrong type).

        cursor.continue();
      };

      if (!(await this.trFinish(tr))) return;
    }
    if (info.unsubscribed) return;

    // 3. Load the updates into doc.

    doc.batchRemoteUpdates(() => {
      // Load saved states first, to reduce causal buffering of updates.
      for (const savedState of savedStates) {
        doc.load(savedState, this);
      }
      for (const message of messages) {
        doc.receive(message, this);
      }
    });
    this.emit("Load", { doc, docID });

    // Do the next part's save() in a separate task to avoid blocking
    // for too long.
    await new Promise((resolve) => setTimeout(resolve, 0));
    if (info.unsubscribed) return;

    // 3. Just before calling doc.save() (in checkpoint), add a listener for
    // future updates to the doc - local or received from other sources.
    info.off = doc.on("Update", this.onUpdate);

    // 4. Save the loaded state as a checkpoint.
    // That will also deleted the loaded keys (info.currentUpdates).
    await this.checkpoint(doc, info);
  }

  /**
   * Unsubscribes `doc` from its subscribed `docID` (if any).
   *
   * Further updates to `doc` will not be saved.
   */
  unsubscribe(doc: AbstractDoc | CRuntime) {
    const info = this.subs.get(doc);
    if (info === undefined) return;

    info.unsubscribed = true;
    this.subs.delete(doc);
    this.docsByID.delete(info.docID);
    if (info.off !== undefined) info.off();
  }

  private onUpdate = (e: UpdateEvent, doc: Doc) => {
    // Skip updates that we delivered.
    if (e.caller === this) return;
    // Skip updates delivered by other tabs; they should be storing
    // their own updates themselves.
    if (
      typeof e.caller === "object" &&
      (<any>e.caller).isTabSyncNetwork === true
    )
      return;

    const info = this.subs.get(doc);
    if (info === undefined) return;

    if (e.updateType === "message") {
      if (
        info.currentUpdates.size >= updatesBeforeCheckpoint &&
        Date.now() >= info.lastCheckpointTime + checkpointInterval
      ) {
        // Time for a checkpoint.
        // Do it in a separate task because we are on the critical path
        // for local ops.
        setTimeout(() => void this.checkpoint(doc, info), 0);
      } else {
        // Append the message to the log.
        void this.appendMessage(doc, info, e.update);
      }
    } else {
      // Since savedState updates are usually rare and large, do a
      // checkpoint instead of storing it.
      // Do it in a separate task because we are on the critical path
      // for local ops.
      setTimeout(() => void this.checkpoint(doc, info), 0);
    }
  };

  private async appendMessage(doc: Doc, info: DocInfo, message: Uint8Array) {
    // We only register onUpdate after using db, so we don't need to
    // await this.dbPromise.
    const db = nonNull(this.db);
    const tr = db.transaction([objectStoreName], "readwrite");
    const objectStore = tr.objectStore(objectStoreName);

    const request = objectStore.add({ docID: info.docID, message });

    if (await this.trFinish(tr)) {
      // Add the update's primary key to currentUpdates.
      info.currentUpdates.add(request.result as string);
      this.emit("Save", { doc, docID: info.docID });
    }
  }

  private async checkpoint(doc: Doc, info: DocInfo) {
    if (info.unsubscribed) return;

    // We only call checkpoint after using db, so we don't need to
    // await this.dbPromise.
    const db = nonNull(this.db);
    const tr = db.transaction([objectStoreName], "readwrite");
    const objectStore = tr.objectStore(objectStoreName);

    // The updates definitely included in the following doc.save() call.
    const includedUpdates = [...info.currentUpdates];

    const addRequest = objectStore.add({
      docID: info.docID,
      savedState: doc.save(),
    });
    // Delete includedUpdates, which have been incorporated into our new checkpoint.
    // Since we do this in the save tr as addRequest, we don't
    // have to worry about accidentally deleting these but failing to
    // set the checkpoint.
    for (const key of includedUpdates) {
      objectStore.delete(key);
    }

    if (await this.trFinish(tr)) {
      // In case of concurrent addUpdate/checkpoint calls, only delete the keys
      // we definitely included, instead of resetting currentUpdates entirely.
      for (const key of includedUpdates) info.currentUpdates.delete(key);

      // Add the new checkpoint's primary key.
      info.currentUpdates.add(addRequest.result as string);
      info.lastCheckpointTime = Date.now();

      this.emit("Save", { doc, docID: info.docID });
    }
  }

  /**
   * Closes our IndexedDB database connection and unsubscribes all documents.
   *
   * Future method calls will throw an error.
   */
  close() {
    if (this.closed) return;

    this.closed = true;

    // Unsubscribe all docs.
    for (const doc of this.subs.keys()) this.unsubscribe(doc);

    // Close our DB connection.
    void (async () => {
      try {
        const db = await this.dbPromise;
        db.close();
      } catch (err) {
        // The error is already sent to onError; no need to send it again
        // or let the unhandled error spam the console.
        return;
      }
    })();
  }

  /**
   * Deletes `docID` from localStorage.
   */
  async delete(docID: string): Promise<void> {
    if (this.closed) throw new Error("Already closed");

    const db = await this.dbPromise;
    const tr = db.transaction([objectStoreName], "readwrite");
    const objectStore = tr.objectStore(objectStoreName);

    // Delete all values with the given docID.
    const request = objectStore.index("docID").openKeyCursor(docID);
    await new Promise<void>((resolve, reject) => {
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) {
          resolve();
          return;
        }

        objectStore.delete(cursor.primaryKey);
        cursor.continue();
      };
      request.onerror = reject;
    });

    if (!(await this.trFinish(tr))) {
      // Throw the error here in addition to the Error event.
      throw nonNull(tr.error);
    }
  }

  /**
   * Deletes all documents in our database.
   */
  async clear(): Promise<void> {
    if (this.closed) throw new Error("Already closed");

    const db = await this.dbPromise;
    const tr = db.transaction([objectStoreName], "readwrite");
    const objectStore = tr.objectStore(objectStoreName);

    objectStore.clear();

    if (!(await this.trFinish(tr))) {
      // Throw the error here in addition to the Error event.
      throw nonNull(tr.error);
    }
  }

  /**
   * Returns all `docID`s with state stored in our database.
   */
  async docIDs(): Promise<Set<string>> {
    if (this.closed) throw new Error("Already closed");

    const db = await this.dbPromise;
    const tr = db.transaction([objectStoreName], "readonly");
    const objectStore = tr.objectStore(objectStoreName);

    const results = new Set<string>();
    const request = objectStore
      .index("docID")
      .openKeyCursor(null, "nextunique");
    await new Promise<void>((resolve, reject) => {
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) {
          resolve();
          return;
        }

        // cursor.key is the *index* key (= docID), not the primary key.
        results.add(cursor.key as string);
        cursor.continue();
      };
      request.onerror = reject;
    });

    if (!(await this.trFinish(tr))) {
      // Throw the error here in addition to the Error event.
      throw nonNull(tr.error);
    }
    return results;
  }
}
