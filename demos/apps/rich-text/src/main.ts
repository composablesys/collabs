import {
  CPresence,
  CRichText,
  CRuntime,
  Cursor,
  Cursors,
} from "@collabs/collabs";
import { WebSocketNetwork } from "@collabs/ws-client";
import Quill, { DeltaStatic, Delta as DeltaType } from "quill";
import QuillCursors from "quill-cursors";

// Include CSS
import "quill/dist/quill.snow.css";
import { animalNames } from "./animal_names";

// --- App code ---

const Delta: typeof DeltaType = Quill.import("delta");
Quill.register("modules/cursors", QuillCursors);

const noGrowAtEnd = [
  // Links (Peritext Example 9)
  "link",
];
/**
 * These formats are exclusive; we need to pass only one at a time to Quill or
 * the result is inconsistent.
 * So, we wrap them in our own "block" formatting attribute:
 * { block: [key, value] }.
 * See https://github.com/composablesys/collabs/issues/251
 */
const exclusiveBlocks = new Set(["blockquote", "header", "list", "code-block"]);

const nameParts = animalNames;

interface PresenceState {
  name: string;
  color: string;
  selection: { anchor: Cursor; head: Cursor } | null;
}

function makeBaseState(): Uint8Array {
  const doc = new CRuntime({ debugReplicaID: "BASE" });
  const clientText = doc.registerCollab(
    "text",
    (init) => new CRichText(init, { noGrowAtEnd })
  );
  doc.transact(() => clientText.insert(0, "\n", {}));
  return doc.save();
}

const doc = new CRuntime();
const text = doc.registerCollab(
  "text",
  (init) => new CRichText(init, { noGrowAtEnd })
);
// "Set the initial state"
// (a single "\n", matching Quill's initial state) by
// loading it from a separate doc.
// See https://collabs.readthedocs.io/en/latest/advanced/initial_values.html#loading-a-base-state
doc.load(makeBaseState());

// Store presence in a separate document so that its heartbeats
// don't cause us to re-save the text doc, which could be large.
const presenceDoc = new CRuntime();
const presence = presenceDoc.registerCollab(
  "presence",
  (init) => new CPresence<PresenceState>(init)
);

const quill = new Quill("#editor", {
  theme: "snow",
  // Modules list from quilljs example, based on
  // https://github.com/KillerCodeMonkey/ngx-quill/issues/295#issuecomment-443268064
  modules: {
    cursors: true,
    toolbar: [
      [{ font: [] }, { size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "super" }, { script: "sub" }],
      [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      // Omit embeds (images & videos); they require extra effort since
      // CRichText doesn't allow "object" elements.
      // Omit "syntax: true" because I can't figure out how
      // to trick Webpack into importing highlight.js for
      // side-effects. Same with "formula" and katex.
      ["link"],
      ["clean"],
    ],
  },
  formats: [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "list",
    "indent",
  ],
});

// Reflect Collab operations in Quill.
// Note that for local operations, Quill has already updated
// its own representation, so we should skip doing so again.

let ourChange = false;
function updateContents(delta: DeltaStatic) {
  ourChange = true;
  quill.updateContents(delta);
  ourChange = false;
}

let pendingDelta: DeltaStatic = new Delta();

text.on("Insert", (e) => {
  if (e.meta.isLocalOp) return;

  pendingDelta = pendingDelta.compose(
    new Delta().retain(e.index).insert(e.values, e.format)
  );
});

text.on("Delete", (e) => {
  if (e.meta.isLocalOp) return;

  pendingDelta = pendingDelta.compose(
    new Delta().retain(e.index).delete(e.values.length)
  );
});

text.on("Format", (e) => {
  if (e.meta.isLocalOp) return;

  // Find the Quill version of CRichText's formatting change,
  // inverting quillAttrToCollabs.
  let format: Record<string, any> = {};
  if (e.key === "block") {
    // Unwrap our "block" formatting attribute.
    // See the comment above exclusiveBlocks.
    if (e.value === undefined) {
      const previousBlockAttr = e.previousValue as [key: string, value: any];
      format[previousBlockAttr[0]] = null;
    } else {
      const blockAttr = e.value as [key: string, value: any];
      format[blockAttr[0]] = blockAttr[1];
    }
  } else {
    // Convert CRichText's undefineds to Quill's nulls (both indicate a
    // not-present key).
    format[e.key] = e.value ?? null;
  }

  pendingDelta = pendingDelta.compose(
    new Delta().retain(e.startIndex).retain(e.endIndex - e.startIndex, format)
  );
});

(text.runtime as CRuntime).on("Change", (e) => {
  if (!e.isLocalOp) {
    // Send the pendingDelta to Quill.
    // We wait until "Change" so this only happens once per batch.
    // We don't risk interleaving with Quill's updates because batches
    // are always synchronous, while Quill-driven updates always occur
    // in a DOM event.
    // TODO: will need to adjust this strategy if we allow programmatic ops
    // via CText or Quill manipulation.
    const delta = pendingDelta;
    pendingDelta = new Delta();
    updateContents(delta);
  }
});

// Convert user inputs to Collab operations.

quill.on("text-change", (delta) => {
  // In theory we can listen for events with source "user",
  // to ignore changes caused by Collab events instead of
  // user input.  However, changes that remove formatting
  // using the "remove formatting" button, or by toggling
  // a link off, instead get emitted with source "api".
  // This appears to be fixed only on a not-yet-released v2
  // branch: https://github.com/quilljs/quill/issues/739
  // For now, we manually keep track of whether changes are due
  // to us or not.
  // if (source !== "user") return;
  if (ourChange) return;

  for (const op of getRelevantDeltaOperations(delta)) {
    // Insertion
    if (op.insert) {
      if (typeof op.insert === "string") {
        const quillAttrs = op.attributes ?? {};
        const collabsAttrs = Object.fromEntries(
          [...Object.entries(quillAttrs)].map(quillAttrToCollabs)
        );
        text.insert(op.index, op.insert, collabsAttrs);
      } else {
        // Embed of object
        throw new Error("Embeds not supported");
      }
    }
    // Deletion
    else if (op.delete) {
      text.delete(op.index, op.delete);
    }
    // Formatting
    else if (op.attributes && op.retain) {
      for (const [quillKey, quillValue] of Object.entries(op.attributes)) {
        const [key, value] = quillAttrToCollabs([quillKey, quillValue]);
        text.format(op.index, op.index + op.retain, key, value);
      }
    }
  }
});

/**
 * Convert delta.ops into an array of modified DeltaOperations
 * having the form { index: first char index, ...DeltaOperation},
 * leaving out ops that do nothing.
 */
function getRelevantDeltaOperations(delta: DeltaStatic): {
  index: number;
  insert?: string | object;
  delete?: number;
  attributes?: Record<string, any>;
  retain?: number;
}[] {
  if (delta.ops === undefined) return [];
  const relevantOps = [];
  let index = 0;
  for (const op of delta.ops) {
    if (op.retain === undefined || op.attributes) {
      relevantOps.push({ index, ...op });
    }
    // Adjust index for the next op.
    if (op.insert !== undefined) {
      if (typeof op.insert === "string") index += op.insert.length;
      else index += 1; // Embed
    } else if (op.retain !== undefined) index += op.retain;
    // Deletes don't add to the index because we'll do the
    // next operation after them, hence the text will already
    // be shifted left.
  }
  return relevantOps;
}

/**
 * Converts a Quill formatting attr (key/value pair) to the format
 * we store in CRichText.
 */
function quillAttrToCollabs(
  attr: [key: string, value: any]
): [key: string, value: any] {
  const [key, value] = attr;
  if (exclusiveBlocks.has(key)) {
    // Wrap it in our own "block" formatting attribute.
    // See the comment above exclusiveBlocks.
    if (value === null) return ["block", undefined];
    else return ["block", [key, value]];
  } else {
    // Convert Quill's null to CRichText's undefined.
    return [key, value ?? undefined];
  }
}

// Presence (shared cursors).
const name =
  nameParts[Math.floor(Math.random() * nameParts.length)] +
  " " +
  (1 + Math.floor(Math.random() * 9));
const color = `hsl(${Math.floor(Math.random() * 360)},50%,50%)`;
presence.setOurs({ name, color, selection: null });

const quillCursors = quill.getModule("cursors") as QuillCursors;
function moveCursor(replicaID: string): void {
  if (replicaID === presenceDoc.replicaID) return;
  const value = presence.get(replicaID);
  if (value === undefined) return;
  else if (value.selection === null) quillCursors.removeCursor(replicaID);
  else {
    try {
      const anchorIndex = Cursors.toIndex(value.selection.anchor, text);
      const headIndex = Cursors.toIndex(value.selection.head, text);
      quillCursors.moveCursor(replicaID, {
        index: anchorIndex,
        length: headIndex - anchorIndex,
      });
    } catch (err) {
      // Since presence is in a separate doc from text, its possible
      // that we could get a Cursor before text receives the corresponding
      // Position, causing an error.
      // For now, just ignore the cursor movement.
      // See https://github.com/composablesys/collabs/issues/262
      console.error("Error updating shared cursor: " + err);
    }
  }
}
presence.on("Set", (e) => {
  if (e.key === presenceDoc.replicaID) return;
  if (e.value.selection === null) quillCursors.removeCursor(e.key);
  else {
    quillCursors.createCursor(e.key, e.value.name, e.value.color);
    moveCursor(e.key);
  }
});
presence.on("Delete", (e) => quillCursors.removeCursor(e.key));
quill.on("editor-change", () => {
  // Send our cursor state.
  // Only do this when the user does something (not in reaction to
  // remote Collab events).
  if (!ourChange) {
    const selection = quill.getSelection();
    if (selection === null) {
      presence.updateOurs("selection", null);
    } else {
      const anchor = Cursors.fromIndex(selection.index, text);
      const head = Cursors.fromIndex(selection.index + selection.length, text);
      presence.updateOurs("selection", { anchor, head });
    }
  }

  // Move everyone else's cursors locally.
  // (I guess Quill would OT this for us, though not necessarily with the
  // exact same indices for all clients. We do it ourselves just in case.)
  for (const replicaID of presence.keys()) moveCursor(replicaID);
});

// Presence connect & disconnect.
// Since the demo server delivers old messages shortly after starting, wait
// a second for those to pass before connecting. Otherwise the messages
// (which look new) make old users appear present.
setTimeout(() => presence.connect(), 1000);
// Note: apparently beforeunload disables some opts in Firefox; consider removing.
// https://web.dev/bfcache/#only-add-beforeunload-listeners-conditionally
window.addEventListener("beforeunload", () => presence.disconnect());

// --- Network/storage setup ---

const docID = "rich-text";
const presenceDocID = "rich-text.presence";

// Connect to the server over WebSocket.
const wsURL = location.origin.replace(/^http/, "ws");
const wsNetwork = new WebSocketNetwork(wsURL, { connect: false });
wsNetwork.on("Load", (e) => {
  console.log(`Loaded doc "${e.docID}" from the server.`);
});
wsNetwork.on("Save", (e) => {
  console.log(`Saved all local updates to doc "${e.docID}" to the server`);
});
wsNetwork.on("Connect", () => console.log("Connected to the server."));
wsNetwork.on("Disconnect", (e) => {
  // After a disconnection, try to reconnect every 2 seconds, unless
  // we deliberately called wsNetwork.disconnect().
  if (e.cause === "manual") return;
  console.error("WebSocket disconnected due to", e.cause, e.wsEvent);
  setTimeout(() => {
    console.log("Reconnecting...");
    wsNetwork.connect();
  }, 2000);
});
wsNetwork.subscribe(doc, docID, { batchRemoteMS: 50 });
wsNetwork.subscribe(presenceDoc, presenceDocID, { batchRemoteMS: 50 });

// In a real app, you would probably also add on-device storage
// (@collabs/indexeddb or @collabs/local-storage)
// and cross-tab sync (@collabs/tab-sync).
// See the [Quick Start](https://collabs.readthedocs.io/en/latest/quick_start.html)
// for an example.

// --- "Connected" checkbox for testing concurrency ---

const connected = document.getElementById("connected") as HTMLInputElement;
connected.checked = localStorage.getItem("connected") !== "false";
if (connected.checked) {
  // Instead of calling connect() here, you can just remove WebSocketNetwork's
  // { connect: false } option above.
  wsNetwork.connect();
}
connected.addEventListener("click", () => {
  localStorage.setItem("connected", connected.checked + "");
  if (connected.checked) wsNetwork.connect();
  else wsNetwork.disconnect();
});
