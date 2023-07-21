import { AbstractDoc, CRuntime } from "@collabs/collabs";
import { TransactionEvent } from "@collabs/crdts";
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

type Doc = AbstractDoc | CRuntime;

interface DocInfo {
  docID: string;
  ourPrefix: string;
  updateCounter: number;
  saveCounter: number;
  // TODO: doc: format as update log + "checkpoints" (savedStates).
  /** The index-plus-1 of the last update incorporated into the last savedState. */
  lastSaveUpdates: number;
  lastSaveTime: number;
  readonly off: () => void;
}

// Doc limits: LocalStorage limits; failures (event for it);
// O(n) subscribe loop; temp 2x storage in checkpoints (single doc only).
export class LocalStorageDocStore {
  readonly keyPrefix: string;

  private subs = new Map<Doc, DocInfo>();
  private docsByID = new Map<string, Doc>();

  constructor(
    options: {
      keyPrefix?: string;
    } = {}
  ) {
    this.keyPrefix = options.keyPrefix ?? "@collabs/storage";
  }

  // Note: if this errors due to bad format / version update,
  // it will corrupt the doc. Need to design your doc's receive/load
  // to tolerate those errors instead.
  subscribe(doc: AbstractDoc | CRuntime, docID: string) {
    if (this.subs.has(doc)) {
      throw new Error("doc is already subscribed to a docID");
    }

    if (this.docsByID.has(docID)) {
      throw new Error("Unsupported: multiple docs with same docID");
    }

    // docPrefix: "@collabs/storage.<docID>"
    const docPrefix = this.keyPrefix + "." + escapeDots(docID);
    // ourPrefix: "@collabs/storage.<docID>.<replicaID>"
    const ourPrefix = docPrefix + "." + escapeDots(doc.replicaID);

    // Saved states are stored under "<ourPrefix>.savedState<counter>";
    // updates are stored under "<ourPrefix>.update<counter>".
    // All values are immutable (only set once), so it is safe to delete key
    // from a different tab: you don't have to worry about overwriting a
    // concurrent update.

    // 1. Load existing state into the doc.
    // TODO: do async, to match other storage providers?
    const savedStates: Uint8Array[] = [];
    const updates: Uint8Array[] = [];
    const loadedKeys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key !== null && key.startsWith(docPrefix)) {
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
    for (const update of updates) {
      doc.receive(update, this);
    }

    // 2. Immediately store future updates to the doc, local & remote.
    // Occasional these trigger a "checkpoint" where we replace the updates
    // (& previous savedState) with a new savedState.
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

    // 3. Store subscription info.
    this.subs.set(doc, info);
    this.docsByID.set(docID, doc);

    // 4. Store doc's current state and delete the loadedKeys that it incorporates.
    // Do this in a separate task to avoid blocking for too long.
    setTimeout(() => {
      // Skip saving if we happen to do so before the timeout.
      if (info.saveCounter === 0) this.checkpoint(doc, info);
      for (const key of loadedKeys) localStorage.removeItem(key);
    });
  }

  // TODO: events.

  unsubscribe(doc: AbstractDoc | CRuntime) {
    const info = this.subs.get(doc);
    if (info === undefined) return;

    // Final checkpoint to clean up the update log.
    this.checkpoint(doc, info);

    info.off();
    this.subs.delete(doc);
    this.docsByID.delete(info.docID);
  }

  private onTransaction = (e: TransactionEvent, doc: Doc) => {
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
        setBytes(info.ourPrefix + ".update" + info.updateCounter, e.update);
        info.updateCounter++;
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
  }
}
