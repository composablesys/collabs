import { AbstractDoc, CRuntime, EventEmitter } from "@collabs/collabs";
import { nonNull } from "@collabs/core";
import { TransactionEvent } from "@collabs/crdts";

/** How many updates before we consider a checkpoint. */
const updatesBeforeCheckpoint = 100;
/** The minimum time between checkpoints. */
const checkpointInterval = 10000;

const objectStoreName = "updates";

type Doc = AbstractDoc | CRuntime;

interface DocInfo {
  docID: string;
  /** The number of updates since our last checkpoint. */
  uncompactedCount: number;
  lastSaveTime: number;
  readonly off: () => void;
}

export interface IndexedDBDocStoreEventsRecord {
  /**
   * Emitted after all of doc's local changes are confirmed saved to the server.
   */
  Save: { doc: AbstractDoc | CRuntime; docID: string };
  /**
   * Emitted after doc loads the store's current state.
   */
  Load: { doc: AbstractDoc | CRuntime; docID: string };
  Error: { event: Event };
}

// Internal docs: format as update log + "checkpoints" (savedStates).
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
      objectStore.createIndex("docID, replicaID", ["docID", "replicaID"], {
        unique: false,
      });
    };
    openRequest.onsuccess = () => {
      this.db = openRequest.result;
      dbResolve(openRequest.result);
      openRequest.result.onerror = this.onError;
    };
  }

  close() {
    void this.dbPromise.then((db) => db.close());
  }

  private onError = (event: Event) => {
    this.emit("Error", { event });
  };

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

    // 1. Immediately store future updates to the doc, local & remote.
    // Occasional these trigger a "checkpoint" where we replace the updates
    // (& previous savedState) with a new savedState.
    const off = doc.on("Transaction", this.onTransaction);
    const info: DocInfo = {
      docID,
      uncompactedCount: 0,
      lastSaveTime: 0,
      off,
    };

    // 2. Store subscription info.
    this.subs.set(doc, info);
    this.docsByID.set(docID, doc);

    // 3. Load existing state into the doc.

    // TODO: remove setTimeouts, except around doc.save().
    setTimeout(() => {
      const savedStates: Uint8Array[] = [];
      const updates: Uint8Array[] = [];
      const loadedKeys: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key !== null && key.startsWith(docPrefixDot)) {
          let lastDot = key.lastIndexOf(".");
          const suffix = key.slice(lastDot + 1);
          if (suffix.startsWith("savedState")) {
            const savedState = getBytes(key);
            if (savedState !== null) {
              savedStates.push(savedState);
              loadedKeys.push(key);
            }
          } else if (suffix.startsWith("update")) {
            const update = getBytes(key);
            if (update !== null) {
              updates.push(update);
              loadedKeys.push(key);
            }
          }
        }
      }

      // TODO: can we tell doc to group these into a single Change event?
      // Yjs uses transact for that, but I found it confusing.
      // I guess alt is to wait until Load event to display the state.
      // Load saved states first, to avoid temp causal buffering of updates.
      for (const savedState of savedStates) {
        doc.load(savedState, this);
      }
      // TODO: sort updates by number within each user, so they start mostly causally ordered.
      for (const update of updates) {
        doc.receive(update, this);
      }

      // Emit a Load event even if nothing was loaded, to signal that loading
      // is done regardless.
      this.emit("Load", { doc, docID });

      // 4. Store doc's current state and delete the loadedKeys that it incorporates.
      // Do this in a separate transaction (hence task) to avoid blocking for too long.
      // TODO: remove setTimeout.
      setTimeout(() => {
        // Skip saving if we happen to do so before the timeout.
        if (info.saveCounter === 0) this.checkpoint(doc, info, db);
        for (const key of loadedKeys) localStorage.removeItem(key);
      });
    });
  }

  unsubscribe(doc: AbstractDoc | CRuntime) {
    const info = this.subs.get(doc);
    if (info === undefined) return;

    info.off();
    this.subs.delete(doc);
    this.docsByID.delete(info.docID);
  }

  private onTransaction = (e: TransactionEvent, doc: Doc) => {
    const info = this.subs.get(doc);
    if (info === undefined) return;

    // onTransaction is only registered after a doc is loaded (TODO), which requires
    // this.db to be set.
    const db = nonNull(this.db);

    if (e.meta.updateType === "message") {
      if (
        info.uncompactedCount >= updatesBeforeCheckpoint &&
        Date.now() >= info.lastSaveTime + checkpointInterval
      ) {
        // Time for a checkpoint.
        // Do it in a separate task because we are on the critical path.
        setTimeout(() => this.checkpoint(doc, info, db), 0);
      } else {
        // Append the update.
        setBytes(info.ourPrefix + ".update" + info.updateCounter, e.update);
        info.updateCounter++;
        this.emit("Save", { doc, docID: info.docID });
      }
    } else {
      // Since savedState updates are usually rare and large, do a
      // checkpoint instead of storing it.
      // That also lets us avoid distinguishing messages vs savedStates
      // in the update log.
      // Do it in a separate task because we are on the critical path.
      setTimeout(() => this.checkpoint(doc, info, db), 0);
    }
  };

  private checkpoint(doc: Doc, info: DocInfo, db: IDBDatabase) {
    setBytes(info.ourPrefix + ".savedState" + info.saveCounter, doc.save());

    // Delete dominated updates and the last checkpoint.
    // Note: setting the savedState before deleting the old one effectively
    // doubles our memory usage, which could overflow the storage space.
    // But the alternative could lose data in a crash.
    if (info.saveCounter !== 0) {
      localStorage.removeItem(
        info.ourPrefix + ".savedState" + (info.saveCounter - 1)
      );
    }
    for (let i = info.lastSaveUpdates; i < info.updateCounter; i++) {
      localStorage.removeItem(info.ourPrefix + ".update" + i);
    }

    info.saveCounter++;
    info.lastSaveUpdates = info.updateCounter;
    info.lastSaveTime = Date.now();

    this.emit("Save", { doc, docID: info.docID });
  }

  // Doc: If db open errored, will throw that error here
  // (in addition to Error event, I think - check that all errors go
  // there even if handled at request level).
  async delete(docID: string): Promise<void> {
    const db = await this.dbPromise;
    const objectStore = db
      .transaction([objectStoreName], "readwrite")
      .objectStore(objectStoreName);

    const request = objectStore.index("docID").openKeyCursor(docID, "next");
    return new Promise((resolve, reject) => {
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
  }

  async clear(): Promise<void> {
    const db = await this.dbPromise;
    const objectStore = db
      .transaction([objectStoreName], "readwrite")
      .objectStore(objectStoreName);

    const request = objectStore.clear();
    await new Promise<void>((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = reject;
    });
  }

  // All present docIDs.
  async docIDs(): Promise<Set<string>> {
    const db = await this.dbPromise;
    const objectStore = db
      .transaction([objectStoreName], "readonly")
      .objectStore(objectStoreName);

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
  }
}
