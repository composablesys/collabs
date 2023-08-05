import { AbstractDoc, CRuntime, EventEmitter } from "@collabs/collabs";
import { UpdateEvent } from "@collabs/crdts";
import { fromByteArray, toByteArray } from "base64-js";

/** How many updates before we consider a checkpoint. */
const updatesBeforeCheckpoint = 50;
/** The minimum time between checkpoints. */
const checkpointInterval = 5000;

function setBytes(key: string, value: Uint8Array) {
  window.localStorage.setItem(key, fromByteArray(value));
}

function getBytes(key: string): Uint8Array | null {
  const value = window.localStorage.getItem(key);
  if (value === null) return null;
  try {
    return toByteArray(value);
  } catch (err) {
    console.error(
      `localStorage value ${JSON.stringify(
        value
      )} at ${key} is not base64: ${err}`
    );
    return null;
  }
}

/**
 * Returns an "escaped" version of str with no "."s.
 */
function escapeDots(str: string): string {
  // "." -> "\d"; to make this reversible, also replace existing
  // "\" with "\\".
  return str.replace(/\\/g, "\\\\").replace(/\./g, "\\d");
}

/**
 * Inverse of escapeDots.
 */
function unescapeDots(str: string): string | null {
  // "\d" -> ".", "\\" -> "\"
  let ans = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "\\") {
      switch (str[i + 1]) {
        case "\\":
          ans += "\\";
          i++;
          break;
        case "d":
          ans += ".";
          i++;
          break;
        default:
          // Bad string.
          return null;
      }
    } else ans += str[i];
  }
  return ans;
}

type Doc = AbstractDoc | CRuntime;

interface DocInfo {
  docID: string;
  ourPrefix: string;
  updateCounter: number;
  saveCounter: number;
  /** The index-plus-1 of the last update incorporated into the last savedState. */
  lastSaveUpdates: number;
  lastSaveTime: number;
  readonly off: () => void;
}

export interface LocalStorageDocStoreEventsRecord {
  /**
   * Emitted after all of doc's local changes are confirmed saved to the server.
   */
  Save: { doc: AbstractDoc | CRuntime; docID: string };
  /**
   * Emitted after doc loads the store's current state.
   */
  Load: { doc: AbstractDoc | CRuntime; docID: string };
  Error: { err: unknown };
}

// Doc limits: LocalStorage limits; failures (event for it);
// O(n) subscribe/op loops; temp 2x storage in checkpoints (single doc only).
// Internal docs: format as update log + "checkpoints" (savedStates).
export class LocalStorageDocStore extends EventEmitter<LocalStorageDocStoreEventsRecord> {
  readonly keyPrefix: string;
  private readonly keyPrefixDot: string;
  private readonly suppressErrors: boolean;

  private subs = new Map<Doc, DocInfo>();
  private docsByID = new Map<string, Doc>();

  constructor(
    options: {
      keyPrefix?: string;
      // Doc: if true, won't let OOM errors propagate. Only do this if
      // you have an Error event handler.
      suppressErrors?: boolean;
    } = {}
  ) {
    super();

    this.keyPrefix = options.keyPrefix ?? "@collabs/storage";
    this.keyPrefixDot = this.keyPrefix = ".";
    this.suppressErrors = options.suppressErrors ?? false;
  }

  // docPrefix: "@collabs/storage.<docID>"
  private getDocPrefix(docID: string): string {
    return this.keyPrefix + "." + escapeDots(docID);
  }

  // ourPrefix: "@collabs/storage.<docID>.<replicaID>"
  private getOurPrefix(docID: string, doc: Doc) {
    return this.getDocPrefix(docID) + "." + escapeDots(doc.replicaID);
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

    const docPrefixDot = this.getDocPrefix(docID) + ".";
    const ourPrefix = this.getOurPrefix(docID, doc);

    // Saved states are stored under "<ourPrefix>.savedState<counter>";
    // updates are stored under "<ourPrefix>.update<counter>".
    // All values are immutable (only set once), so it is safe to delete key
    // from a different tab: you don't have to worry about overwriting a
    // concurrent update.

    // 1. Immediately store future updates to the doc, local & remote.
    // Occasional these trigger a "checkpoint" where we replace the updates
    // (& previous savedState) with a new savedState.
    // TODO: what if subscribe is interleaved with unsubscribe?
    const off = doc.on("Transaction", this.onTransaction);
    const info: DocInfo = {
      docID,
      ourPrefix,
      saveCounter: 0,
      updateCounter: 0,
      lastSaveUpdates: 0,
      lastSaveTime: 0,
      off,
    };

    // 2. Store subscription info.
    this.subs.set(doc, info);
    this.docsByID.set(docID, doc);

    // 3. Load existing state into the doc.
    // Do it in a separate task to match other doc stores
    // (e.g., in case you add Transaction listeners after calling subscribe).
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
      // Do it in a separate task to avoid blocking for too long.
      setTimeout(() => {
        // Skip saving if we happen to do so before the timeout.
        // TODO: refactor to avoid this check (no checkpoints before first save);
        // don't register tr listener until after loading.
        if (info.saveCounter === 0) this.checkpoint(doc, info);
        for (const key of loadedKeys) localStorage.removeItem(key);
      });
    }, 0);
  }

  unsubscribe(doc: AbstractDoc | CRuntime) {
    const info = this.subs.get(doc);
    if (info === undefined) return;

    info.off();
    this.subs.delete(doc);
    this.docsByID.delete(info.docID);
  }

  private onTransaction = (e: UpdateEvent, doc: Doc) => {
    const info = this.subs.get(doc);
    if (info === undefined) return;

    if (e.meta.updateType === "message") {
      if (
        info.updateCounter - info.lastSaveUpdates >= updatesBeforeCheckpoint &&
        Date.now() >= info.lastSaveTime + checkpointInterval
      ) {
        // Time for a checkpoint.
        // Do it in a separate task because we are on the critical path.
        setTimeout(() => this.checkpoint(doc, info), 0);
      } else {
        // Append the update.
        try {
          setBytes(info.ourPrefix + ".update" + info.updateCounter, e.update);
        } catch (err) {
          this.emit("Error", { err });
          if (!this.suppressErrors) throw err;
          return;
        }
        info.updateCounter++;
        this.emit("Save", { doc, docID: info.docID });
      }
    } else {
      // Since savedState updates are usually rare and large, do a
      // checkpoint instead of storing it.
      // That also lets us avoid distinguishing messages vs savedStates
      // in the update log.
      // Do it in a separate task because we are on the critical path.
      setTimeout(() => this.checkpoint(doc, info), 0);
    }
  };

  private checkpoint(doc: Doc, info: DocInfo) {
    try {
      setBytes(info.ourPrefix + ".savedState" + info.saveCounter, doc.save());
    } catch (err) {
      this.emit("Error", { err });
      if (!this.suppressErrors) throw err;
      return;
    }

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

  // Async to match other DocStores.
  async delete(docID: string): Promise<void> {
    // localStorage doesn't like concurrent iter/delete, so wait
    // to delete until the end.
    const toDelete: string[] = [];

    const docPrefixDot = this.getDocPrefix(docID) + ".";
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key !== null && key.startsWith(docPrefixDot)) {
        toDelete.push(key);
      }
    }

    for (const key of toDelete) window.localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    // localStorage doesn't like concurrent iter/delete, so wait
    // to delete until the end.
    const toDelete: string[] = [];

    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key !== null && key.startsWith(this.keyPrefixDot)) {
        toDelete.push(key);
      }
    }

    for (const key of toDelete) window.localStorage.removeItem(key);
  }

  // All present docIDs.
  async docIDs(): Promise<Set<string>> {
    const docIDs = new Set<string>();
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key !== null && key.startsWith(this.keyPrefixDot)) {
        const suffix = key.slice(this.keyPrefixDot.length);
        const nextDot = suffix.indexOf(".");
        if (nextDot === -1) continue;
        const escapedDocID = suffix.slice(0, nextDot);
        const docID = unescapeDots(escapedDocID);
        if (docID !== null) docIDs.add(docID);
      }
    }
    return docIDs;
  }
}
