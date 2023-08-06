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

/*
  # Storage format

  Stored state is divided into "checkpoints" and "uncompacted updates",
  like a database transaction log.
  Each update is stored immediately.
  Occasionally we trigger a checkpoint, which replaces all the uncompacted
  updates with a single saved state; this is smaller
  and loads faster than the raw update log.
  
  Checkpoints are stored under "<ourPrefix>.savedState<saveCounter>", where:
  - <ourPrefix> is a localStorage key prefix specific to the docID & session (doc.replicaID).
  - <saveCounter> is a counter for own checkpoints, used to
  ensure that each key is unique.

  Update storage:
  - Messages are stored under "<docPrefix>.message<trID>", where:
    - <docPrefix> is a localStorage key prefix specific to the 
    docID but *not* the session. So tabs with the same docID open
    share storage.
    - <trID> is a
  dot-escaped representation of the message's trID.
  - Saved states from updates are not stored incrementally; instead, they trigger
  an immediate checkpoint.

  DocInfo.uncompactedKeys stores the uncompacted updates' keys.

  All values are immutable (only set to a single value - though possibly
  multiple times from different tabs). Thus it is safe to delete a key
  from a different tab; you don't have to worry about overwriting a
  concurrent change.
*/

interface DocInfo {
  readonly docID: string;
  readonly docPrefix: string;
  readonly ourPrefix: string;
  off?: () => void;
  /**
   * The number of saved states stored during this session, used to give a
   * unique name to each one.
   */
  saveCounter: number;
  /**
   * The keys of all of our saved and not-yet-deleted updates, including
   * the last checkpoint.
   *
   * They will be deleted at our next checkpoint.
   */
  currentUpdates: string[];
  lastCheckpointTime: number;
  unsubscribed?: true;
}

export interface LocalStorageDocStoreEventsRecord {
  /**
   * Emitted after all of doc's local changes are confirmed saved to localStorage.
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

    const docPrefix = this.getDocPrefix(docID);
    const docPrefixDot = docPrefix + ".";
    const ourPrefix = this.getOurPrefix(docID, doc);

    // 1. Store subscription info.
    const info: DocInfo = {
      docID,
      docPrefix,
      ourPrefix,
      saveCounter: 0,
      currentUpdates: [],
      lastCheckpointTime: 0,
    };
    this.subs.set(doc, info);
    this.docsByID.set(docID, doc);

    // 2. Load existing state into the doc.
    // Do it in a separate task to match other doc stores
    // (e.g., in case you add Transaction listeners after calling subscribe).
    setTimeout(() => {
      // Skip if we've been unsubscribed already.
      if (info.unsubscribed) return;

      const savedStates: Uint8Array[] = [];
      const messages: Uint8Array[] = [];
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
          } else if (suffix.startsWith("message")) {
            const message = getBytes(key);
            if (message !== null) {
              messages.push(message);
              loadedKeys.push(key);
            }
          }
        }
      }

      // Load saved states first, to reduce causal buffering of updates.
      for (const savedState of savedStates) {
        doc.load(savedState, this);
      }
      for (const message of messages) {
        doc.receive(message, this);
      }
      this.emit("Load", { doc, docID });

      // 3. Store doc's current state and delete the loadedKeys that it incorporates.
      // Do it in a separate task to avoid blocking for too long.
      setTimeout(() => {
        // Skip if we've been unsubscribed already.
        if (info.unsubscribed) return;

        // Just before calling doc.save() (in checkpoint), add a listener for
        // future updates to the doc - local or received from other sources.
        info.off = doc.on("Update", this.onUpdate);

        this.checkpoint(doc, info);
        for (const key of loadedKeys) localStorage.removeItem(key);
      });
    }, 0);
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
        info.currentUpdates.length >= updatesBeforeCheckpoint &&
        Date.now() >= info.lastCheckpointTime + checkpointInterval
      ) {
        // Time for a checkpoint.
        // Do it in a separate task because we are on the critical path
        // for local ops.
        setTimeout(() => this.checkpoint(doc, info), 0);
      } else {
        // Append the update to the log.
        const trID = escapeDots(`${e.senderCounter},${e.senderID}`);
        const key = info.docPrefix + ".message" + trID;
        try {
          setBytes(key, e.update);
        } catch (err) {
          this.emit("Error", { err });
          if (!this.suppressErrors) throw err;
          return;
        }
        info.currentUpdates.push(key);
        this.emit("Save", { doc, docID: info.docID });
      }
    } else {
      // Since savedState updates are usually rare and large, do a
      // checkpoint instead of storing it.
      // Do it in a separate task because we are on the critical path.
      setTimeout(() => this.checkpoint(doc, info), 0);
    }
  };

  private checkpoint(doc: Doc, info: DocInfo) {
    const checkpointKey = info.ourPrefix + ".savedState" + info.saveCounter;
    try {
      setBytes(checkpointKey, doc.save());
    } catch (err) {
      this.emit("Error", { err });
      if (!this.suppressErrors) throw err;
      return;
    }

    // Delete currentUpdates, which have been incorporated into our new checkpoint.
    // Note: setting the savedState before deleting the old one effectively
    // doubles our max memory usage.
    // But the alternative could lose data in a crash.
    for (const key of info.currentUpdates) {
      localStorage.removeItem(key);
    }

    info.saveCounter++;
    info.currentUpdates = [checkpointKey];
    info.lastCheckpointTime = Date.now();

    this.emit("Save", { doc, docID: info.docID });
  }

  delete(docID: string): void {
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

  clear(): void {
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
  docIDs(): Set<string> {
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
