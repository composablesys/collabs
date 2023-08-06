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
  updates with a single saved state; this is smaller
  and loads faster than the raw update log.
  
  Checkpoints are stored as objects of the form
  {
    docID: string;
    savedState: Uint8Array;
  }
  under an auto-generated primary key. We store our own last checkpoint's primary
  key so we know to delete it at our next checkpoint.

  Update storage:
  - Messages are stored as objects of the form
    {
      docID: string;
      message: Uint8Array;
    }
    under an auto-generated primary key.
    We store all of our own messages' primary keys so we know to delete them
    at our next checkpoint.
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
   * The keys of all of our saved and not-yet-deleted updates, including
   * the last checkpoint.
   *
   * They will be deleted at our next checkpoint.
   */
  currentUpdates: Set<string>;
  lastCheckpointTime: number;
  unsubscribed?: true;
}

export interface IndexedDBDocStoreEventsRecord {
  /**
   * Emitted after all of doc's local changes are confirmed saved to IndexedDB.
   */
  Save: { doc: AbstractDoc | CRuntime; docID: string };
  /**
   * Emitted after doc loads the store's current state.
   */
  Load: { doc: AbstractDoc | CRuntime; docID: string };
  Error: { event: Event };
}

export class IndxedDBDocStore extends EventEmitter<IndexedDBDocStoreEventsRecord> {
  readonly dbName: string;

  private readonly dbPromise: Promise<IDBDatabase>;
  private db: IDBDatabase | null = null;

  private subs = new Map<Doc, DocInfo>();
  private docsByID = new Map<string, Doc>();

  constructor(
    options: {
      dbName?: string;
    } = {}
  ) {
    super();

    this.dbName = options.dbName ?? "@collabs/storage";

    let dbResolve!: (db: IDBDatabase) => void;
    let dbReject!: (reason: unknown) => void;
    this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
      dbResolve = resolve;
      dbReject = reject;
    });

    const openRequest = indexedDB.open(this.dbName, 1);
    openRequest.onerror = (event) => {
      this.onError(event);
      dbReject(event);
    };
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
      dbResolve(openRequest.result);
    };
  }

  close() {
    void this.dbPromise.then((db) => db.close());
  }

  private onError = (event: Event) => {
    this.emit("Error", { event });
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
    });
  }

  // Note: if this errors due to bad format / version update,
  // it will corrupt the doc. Need to design your doc's receive/load
  // to tolerate those errors instead.
  subscribe(doc: AbstractDoc | CRuntime, docID: string): void {
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
    // changes, asynchronously.
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

      const request = objectStore.index("docID").openCursor(docID, "next");
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) return;

        info.currentUpdates.add(cursor.primaryKey as string);
        const value = cursor.value as ValueType;
        if (value.savedState !== undefined) savedStates.push(value.savedState);
        if (value.message !== undefined) messages.push(value.message);

        cursor.continue();
      };

      if (!(await this.trFinish(tr))) return;
    }
    if (info.unsubscribed) return;

    // 3. Load the updates into doc.

    // Load saved states first, to reduce causal buffering of updates.
    for (const savedState of savedStates) {
      doc.load(savedState, this);
    }
    for (const message of messages) {
      doc.receive(message, this);
    }
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

  unsubscribe(doc: AbstractDoc | CRuntime) {
    const info = this.subs.get(doc);
    if (info === undefined) return;

    if (info.off !== undefined) info.off();
    info.unsubscribed = true;
    this.subs.delete(doc);
    this.docsByID.delete(info.docID);
  }

  private onUpdate = (e: UpdateEvent, doc: Doc) => {
    // Skip updates that we delivered.
    if (e.caller === this) return;
    // Skip updates delivered by other tabs; they should be storing
    // their own updates themselves.
    // TODO

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
      // Do it in a separate task because we are on the critical path.
      setTimeout(() => void this.checkpoint(doc, info), 0);
    }
  };

  private async appendMessage(doc: Doc, info: DocInfo, message: Uint8Array) {
    // We only register onUpdate after using db, so we don't need to
    // await this.dbPromise.
    const db = nonNull(this.db);
    const tr = db.transaction([objectStoreName], "readonly");
    const objectStore = tr.objectStore(objectStoreName);

    const request = objectStore.add({ docID: info.docID, message });

    if (await this.trFinish(tr)) {
      // Add the update's primary key to currentUpdates.
      info.currentUpdates.add(request.result as string);
      this.emit("Save", { doc, docID: info.docID });
    }
  }

  private async checkpoint(doc: Doc, info: DocInfo) {
    const db = nonNull(this.db);
    const tr = db.transaction([objectStoreName], "readonly");
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

  // Doc: If error, will throw that error here
  // in addition to Error event.
  async delete(docID: string): Promise<void> {
    const db = await this.dbPromise;
    const tr = db.transaction([objectStoreName], "readwrite");
    const objectStore = tr.objectStore(objectStoreName);

    const request = objectStore.index("docID").openKeyCursor(docID, "next");
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
      throw nonNull(tr.error);
    }
  }

  async clear(): Promise<void> {
    const db = await this.dbPromise;
    const tr = db.transaction([objectStoreName], "readwrite");
    const objectStore = tr.objectStore(objectStoreName);

    objectStore.clear();

    if (!(await this.trFinish(tr))) {
      throw nonNull(tr.error);
    }
  }

  // All present docIDs.
  async docIDs(): Promise<Set<string>> {
    const db = await this.dbPromise;
    const tr = db.transaction([objectStoreName], "readonly");
    const objectStore = tr.objectStore(objectStoreName);

    const request = objectStore
      .index("docID")
      .openKeyCursor(null, "nextunique");
    return new Promise((resolve, reject) => {
      const results = new Set<string>();
      request.onsuccess = () => {
        const cursor = request.result;
        if (!cursor) {
          resolve(results);
          return;
        }

        results.add(cursor.key as string);
        cursor.continue();
      };
      request.onerror = reject;
    });

    // No need to await tr.complete since it's readonly.
  }
}
