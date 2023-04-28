import * as collabs from "@collabs/collabs";
import { CContainer } from "@collabs/container";
import Quill, { Delta as DeltaType, DeltaStatic } from "quill";
import QuillCursors from "quill-cursors";

// Include CSS
import "quill/dist/quill.snow.css";

const Delta: typeof DeltaType = Quill.import("delta");
Quill.register("modules/cursors", QuillCursors);

const noGrowAtEnd = [
  // Links (Peritext Example 9)
  "link",
  // Paragraph-level (\n) formatting: should only apply to the \n, not
  // extend to surrounding chars.
  "header",
  "blockquote",
  "code-block",
  "list",
  "indent",
];

const nameParts = ["Cat", "Dog", "Rabbit", "Mouse", "Elephant"];

function makeInitialSave(): Uint8Array {
  const runtime = new collabs.CRuntime({ debugReplicaID: "INIT" });
  const clientText = runtime.registerCollab(
    "text",
    (init) => new collabs.CRichText(init, { noGrowAtEnd })
  );
  runtime.transact(() => clientText.insert(0, "\n", {}));
  return runtime.save();
}

(async function () {
  const container = new CContainer();

  const text = container.registerCollab(
    "text",
    (init) => new collabs.CRichText(init, { noGrowAtEnd })
  );
  const presence1 = container.registerCollab(
    "presence1",
    (init) => new collabs.CPresenceMap<{ name: string; color: string }>(init)
  );
  const presence2 = container.registerCollab(
    "presence2",
    (init) =>
      new collabs.CPresenceMap<{
        anchor: collabs.Cursor;
        head: collabs.Cursor;
      } | null>(init)
  );
  // "Set the initial state"
  // (a single "\n", required by Quill) by
  // loading it from a separate doc.
  container.runtime.load(makeInitialSave());

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
        // Omit "direction" because I am not sure whether it is paragraph-level
        // or not (need to know for noGrowAtEnd).
        ["link"],
        ["clean"],
      ],
    },
  });

  await container.load();

  // Call this before adding event listeners, as
  // an optimization.
  // That way, we can immediately give Quill the complete loaded
  // state (including further messages), instead of syncing
  // it to Quill using a bunch of events.
  container.receiveFurtherUpdates();

  // Display loaded state by syncing it to Quill.
  let ourChange = false;
  function updateContents(delta: DeltaStatic) {
    ourChange = true;
    quill.updateContents(delta);
    ourChange = false;
  }
  const initDelta = new Delta();
  for (const { values, format } of text.formatted()) {
    initDelta.insert(values, format);
  }
  updateContents(initDelta);
  // Delete Quill's starting character (a single "\n", now
  // pushed to the end), since it's not in clientText.
  updateContents(new Delta().retain(text.length).delete(1));

  // Reflect Collab operations in Quill.
  // Note that for local operations, Quill has already updated
  // its own representation, so we should skip doing so again.

  text.on("Insert", (e) => {
    if (e.meta.isLocalOp) return;

    updateContents(new Delta().retain(e.index).insert(e.values, e.format));
  });

  text.on("Delete", (e) => {
    if (e.meta.isLocalOp) return;

    updateContents(new Delta().retain(e.index).delete(e.values.length));
  });

  text.on("Format", (e) => {
    if (e.meta.isLocalOp) return;

    updateContents(
      new Delta().retain(e.startIndex).retain(e.endIndex - e.startIndex, {
        // Convert CRichText's undefineds to Quill's nulls (both indicate a
        // not-present key).
        [e.key]: e.value ?? null,
      })
    );
  });

  // Convert user inputs to Collab operations.

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
          text.insert(op.index, op.insert, op.attributes ?? {});
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
        for (const [key, value] of Object.entries(op.attributes)) {
          // Map null to undefined, for deleted keys.
          text.format(op.index, op.index + op.retain, key, value ?? undefined);
        }
      }
    }
  });

  // Awareness.
  // TODO: better var names
  const name =
    nameParts[Math.floor(Math.random() * nameParts.length)] +
    " " +
    (1 + Math.floor(Math.random() * 9));
  const color = `hsl(${Math.floor(Math.random() * 360)},100%,50%)`;

  const quillCursors = quill.getModule("cursors") as QuillCursors;
  function moveCursor(replicaID: string): void {
    if (replicaID === container.runtime.replicaID) return;
    const value = presence2.get(replicaID);
    if (value === undefined) return;
    else if (value === null) quillCursors.removeCursor(replicaID);
    else {
      const anchorIndex = collabs.Cursors.toIndex(value.anchor, text);
      const headIndex = collabs.Cursors.toIndex(value.head, text);
      quillCursors.moveCursor(replicaID, {
        index: anchorIndex,
        length: headIndex - anchorIndex,
      });
    }
  }
  presence2.on("Set", (e) => {
    if (e.key === container.runtime.replicaID) return;
    if (!presence1.has(e.key)) return;
    if (e.value === null) quillCursors.removeCursor(e.key);
    else {
      const { name, color } = presence1.get(e.key)!;
      quillCursors.createCursor(e.key, name, color);
      moveCursor(e.key);
    }
  });
  presence2.on("Delete", (e) => quillCursors.removeCursor(e.key));
  quill.on("editor-change", () => {
    // Send our cursor state.
    // Only do this when the user does something (not in reaction to
    // remote Collab events).
    if (!ourChange) {
      const selection = quill.getSelection();
      if (selection === null) {
        presence2.setOurs(null);
      } else {
        const anchor = collabs.Cursors.fromIndex(selection.index, text);
        const head = collabs.Cursors.fromIndex(
          selection.index + selection.length,
          text
        );
        presence2.setOurs({ anchor, head });
      }
    }

    // Move everyone else's cursors locally.
    // TODO: is this necessary? Will Quill OT it for us (possibly slightly inaccurate
    // but oh well)?
    for (const replicaID of presence2.keys()) moveCursor(replicaID);
  });

  // Ready.
  container.ready();

  // Set our presence and request initial presence data from others.
  // Since we request presence1 first, we're guaranteed that we'll receive
  // it from peers before presence2, so presence2's Set handler will indeed
  // have access to presence1.
  // TODO: what if we get presence2 accidentally first? Won't get new Set
  // event. Also, this is confusing.
  // Also, we don't need to display initial presence state (due to further
  // messages) because we'll get new Set events on join anyway.
  // TODO: same bug as above.
  presence1.setOurs({ name, color });
  presence2.requestAll();
})();
