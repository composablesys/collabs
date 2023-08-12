import { CRichText } from "@collabs/collabs";
import Quill, { DeltaStatic, Delta as DeltaType } from "quill";

// TODO: add shared cursors (from Collabs main)

// Include CSS
import "quill/dist/quill.snow.css";
import React, { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const Delta: typeof DeltaType = Quill.import("delta");

/**
 * React component containing a Quill rich text editor synced to
 * `text`, a Collabs CRichText.
 *
 * `text`'s state must always end with a "\n" to keep Quill happy.
 * To accomplish this, you need to initialize it with state "\n"
 * instead of "" (the default); see
 * [Collabs Initial Values](https://collabs.readthedocs.io/en/latest/advanced/initial_values.html).
 *
 * TODO: allow configuring Quill options (theme, modules, etc.).
 */
export function CollabsQuill({
  text,
  style,
}: {
  text: CRichText;
  style?: React.CSSProperties;
}) {
  const quillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (quillRef.current === null) return;

    const cleanup: (() => void)[] = [];

    const quill = new Quill(quillRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic"],
          [{ header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          // TODO: images. Needs CRDT support.
          ["clean"],
        ],
      },
    });

    // Display text's initial state by syncing it to Quill.
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
    // pushed to the end), since it's not in text.
    updateContents(new Delta().retain(text.length).delete(1));

    // Reflect future Collab operations in Quill.
    // Note that for local operations, Quill has already updated
    // its own representation, so we should skip doing so again.

    {
      const off = text.on("Insert", (e) => {
        if (e.meta.isLocalOp) return;

        updateContents(new Delta().retain(e.index).insert(e.values, e.format));
      });
      cleanup.push(off);
    }

    {
      const off = text.on("Delete", (e) => {
        if (e.meta.isLocalOp) return;

        updateContents(new Delta().retain(e.index).delete(e.values.length));
      });
      cleanup.push(off);
    }

    {
      const off = text.on("Format", (e) => {
        if (e.meta.isLocalOp) return;

        updateContents(
          new Delta().retain(e.startIndex).retain(e.endIndex - e.startIndex, {
            // Convert CRichText's undefineds to Quill's nulls (both indicate a
            // not-present key).
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            [e.key]: e.value ?? null,
          })
        );
      });
      cleanup.push(off);
    }

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    function onTextChange(delta: DeltaStatic) {
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
            text.format(
              op.index,
              op.index + op.retain,
              key,
              value ?? undefined
            );
          }
        }
      }
    }
    quill.on("text-change", onTextChange);
    cleanup.push(() => quill.off("text-change", onTextChange));

    return () => {
      for (const off of cleanup) off();
    };
  }, [text]);

  return <div ref={quillRef} style={style} />;
}
