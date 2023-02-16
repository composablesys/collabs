import {
  CList,
  CObject,
  CollabEvent,
  CollabEventsRecord,
  CollabID,
  CRDTMeta,
  CValueMap,
  InitToken,
} from "@collabs/collabs";
import { CContainer } from "@collabs/container";
import Quill, { DeltaOperation } from "quill";

// Include CSS
import "quill/dist/quill.snow.css";
import { RunLocallyLayer } from "./run_locally_layer";
import { SemidirectProductStore } from "./semidirect_product_store";

const Delta = Quill.import("delta");
declare type Delta = {
  ops: DeltaOperation[];
};

interface CRichCharEventsRecord extends CollabEventsRecord {
  Format: { key: string } & CollabEvent;
}

// TODO: restrict attributes which can be transferred by SDP.

class CRichChar extends CObject<CRichCharEventsRecord> {
  private readonly _attributes: CValueMap<string, unknown>;
  readonly ignoreAttrsSet: Set<string>;
  /** Used to suppress formatting events during copyOriginAttributes. */
  private inCopyOriginAttributes = false;

  /**
   * char comes from a Quill Delta's insert field, split
   * into single characters if a string.  So it is either
   * a single char, or (for an embed) a JSON-serializable
   * object with a single property.
   */
  constructor(
    init: InitToken,
    readonly char: string | object,
    readonly origin: CRichChar | null,
    ignoreAttrs: string[]
  ) {
    super(init);

    this._attributes = this.addChild("", (init) => new CValueMap(init));

    this.ignoreAttrsSet = new Set(ignoreAttrs);

    // Events
    this._attributes.on("Set", (e) => {
      this.emit("Format", {
        key: e.key,
        meta: e.meta,
      });
    });
    this._attributes.on("Delete", (e) => {
      if (!this.inCopyOriginAttributes) {
        this.emit("Format", { key: e.key, meta: e.meta });
      }
    });
  }

  getAttribute(attribute: string): unknown | null {
    return this._attributes.get(attribute) ?? null;
  }

  /**
   * null attribute deletes the existing one.
   */
  setAttribute(attribute: string, value: unknown | null) {
    if (value === null) {
      this._attributes.delete(attribute);
    } else {
      this._attributes.set(attribute, value);
    }
  }

  attributes(): { [key: string]: unknown } {
    return Object.fromEntries(this._attributes);
  }

  copyOriginAttributes(runLocallyLayer: RunLocallyLayer) {
    if (this.origin !== null) {
      this.inCopyOriginAttributes = true;
      try {
        throw new Error("TODO: copyOriginAttributes");
        // // TODO: need to normalize the save, as if it was serialized?
        // const originSave = this.origin._attributes.save();
        // if (originSave !== null) {
        //   // Copy attributes from origin...
        //   this._attributes.load(originSave);
        //   // ...except for ignored ones, which are locally deleted, to reset them
        //   // to the initial state.
        //   runLocallyLayer.runLocally(null, () => {
        //     for (const key of this.ignoreAttrsSet) {
        //       this._attributes.delete(key);
        //     }
        //   });
        // }
      } finally {
        this.inCopyOriginAttributes = false;
      }
    }
  }
}

interface FormatOp {
  targets: Set<CRichChar>;
  attribute: string;
}

interface CRichTextEventsRecord extends CollabEventsRecord {
  Insert: { startIndex: number; count: number } & CollabEvent;
  Delete: { startIndex: number; count: number } & CollabEvent;
  Format: { index: number; key: string } & CollabEvent;
}

class CRichText extends CObject<CRichTextEventsRecord> {
  readonly text: CList<
    CRichChar,
    [
      char: string | object,
      originID: CollabID<CRichChar> | null,
      ignoreAttrs: string[]
    ]
  >;
  private readonly sdpStore: SemidirectProductStore<
    FormatOp,
    CollabID<CRichChar>
  >;
  private readonly runLocallyLayer: RunLocallyLayer;

  /**
   * Used to distinguish normal formatting ops from those due to the
   * concurrent-insert-format SDP behavior.
   */
  private inNormalFormat = false;

  constructor(init: InitToken, initialChars: (string | object)[] = []) {
    super(init);

    this.runLocallyLayer = this.addChild(
      "",
      (init) => new RunLocallyLayer(init)
    );
    this.text = this.runLocallyLayer.setChild(
      (init) =>
        new CList(
          init,
          this.charConstructor.bind(this)
          // TODO: initial char
          // initialChars.map((value) => [value, null, []])
        )
    );
    this.sdpStore = this.addChild(
      "1",
      (init) => new SemidirectProductStore(init, this.action.bind(this))
    );

    // Events.
    this.text.on("Insert", (e) => {
      const char = this.text.get(e.index);
      // Concurrent formatting logic: copy formatting from the new char's
      // origin to itself, and store it in sdpStore.
      // It is okay to do so here because we never un-archive chars, hence
      // Insert events correspond exactly to new char operations. Note that
      // we don't want to do this during loading, hence we can't do it in the
      // valueConstructor.
      char.copyOriginAttributes(this.runLocallyLayer);
      this.sdpStore.processM2(
        this.text.idOf(char),
        <CRDTMeta>e.meta.runtimeExtra
      );
      // Own event.
      this.emit("Insert", {
        startIndex: e.index,
        count: e.values.length,
        meta: e.meta,
      });
    });
    this.text.on("Delete", (e) =>
      this.emit("Delete", {
        startIndex: e.index,
        count: e.values.length,
        meta: e.meta,
      })
    );
  }

  private charConstructor(
    valueInitToken: InitToken,
    char: string | object,
    originID: CollabID<CRichChar> | null,
    ignoreAttrs: string[]
  ) {
    const origin = originID === null ? null : this.text.fromID(originID)!;
    const richChar: CRichChar = new CRichChar(
      valueInitToken,
      char,
      origin,
      ignoreAttrs
    );
    richChar.on("Format", (e) => {
      if (!this.inNormalFormat) {
        this.inNormalFormat = true;
        try {
          const acted = this.sdpStore.processM1(
            {
              targets: new Set([richChar]),
              attribute: e.key,
            },
            <CRDTMeta>e.meta.runtimeExtra
          )!;
          if (acted.targets.size > 1) {
            // Also format the new targets indicated by acted.
            const value = richChar.getAttribute(e.key);
            this.runLocallyLayer.runLocally(e.meta, () => {
              for (const target of acted.targets) {
                if (target !== richChar) {
                  target.setAttribute(acted.attribute, value);
                }
              }
            });
          }
        } finally {
          this.inNormalFormat = false;
        }
      }
      // Emit event even for concurrent-insert formats.
      // We skip emitting if richChar is deleted.
      const index = this.text.indexOf(richChar);
      if (index !== -1) {
        this.emit("Format", { index, ...e });
      }
    });
    return richChar;
  }

  private action(m2: CollabID<CRichChar>, m1: FormatOp): FormatOp {
    const m2Char = this.text.fromID(m2)!;
    // Action: transfer the formatting to m2 if:
    // - m2's origin is one of m1's existing targets
    // - m1.key is not one of m2's ignoreAttrs.
    if (m2Char.origin !== null && m1.targets.has(m2Char.origin)) {
      if (!m2Char.ignoreAttrsSet.has(m1.attribute)) {
        // Okay to mutate and reuse m1 here.
        m1.targets.add(m2Char);
      }
    }
    return m1;
  }

  get(index: number): CRichChar {
    return this.text.get(index);
  }

  get length(): number {
    return this.text.length;
  }

  insert(
    index: number,
    char: string | object,
    attributes?: Record<string, unknown>
  ) {
    const origin = index === 0 ? null : this.text.get(index - 1);
    if (origin !== null) {
      const originID = this.text.idOf(origin);
      // ignoreAttrs that differ between this and origin.
      const ignoreAttrs: string[] = [];
      const keys = new Set(Object.keys(attributes ?? {}));
      for (const key of Object.keys(origin.attributes())) keys.add(key);
      for (const key of keys) {
        if ((attributes ?? {})[key] !== origin.getAttribute(key)) {
          ignoreAttrs.push(key);
        }
      }
      const richChar = this.text.insert(index, char, originID, ignoreAttrs);
      // Only format the new ignoreAttrs.
      if (attributes) {
        for (const key of ignoreAttrs) {
          richChar.setAttribute(key, attributes[key]);
        }
      }
    } else {
      const richChar = this.text.insert(index, char, null, []);
      this.formatChar(richChar, attributes);
    }
  }

  delete(startIndex: number, count: number) {
    // archive instead of delete, so we can still consult the old char's
    // formatting, in case it's a concurrent char's origin.
    this.text.archive(startIndex, count);
  }

  /**
   * null attribute deletes the existing one.
   */
  format(index: number, newAttributes?: Record<string, unknown>) {
    this.formatChar(this.get(index), newAttributes);
  }

  private formatChar(
    richChar: CRichChar,
    newAttributes?: Record<string, unknown>
  ) {
    if (newAttributes) {
      for (const entry of Object.entries(newAttributes)) {
        richChar.setAttribute(...entry);
      }
    }
  }
}

(async function () {
  const container = new CContainer();

  // Quill's initial content is "\n".
  const clientText = container.registerCollab(
    "text",
    (init) => new CRichText(init, ["\n"])
  );

  const quill = new Quill("#editor", {
    theme: "snow",
    // Modules list from quilljs example, via
    // https://github.com/KillerCodeMonkey/ngx-quill/issues/295#issuecomment-443268064
    // We remove syntax: true because I can't figure out how
    // to trick Webpack into importing highlight.js for
    // side-effects.
    // Same with "formula" (after "video") and katex.
    modules: {
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
        ["direction", { align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
    },
  });

  await container.load();

  // Call this before syncing the loaded state to Quill, as
  // an optimization.
  // That way, we can immediately give Quill the complete loaded
  // state (including further messages), instead of syncing
  // the further messages to Quill using a bunch of events.
  container.receiveFurtherMessages();

  // Display loaded state by syncing it to Quill.
  let ourChange = false;
  function updateContents(delta: Delta) {
    ourChange = true;
    quill.updateContents(delta as any);
    ourChange = false;
  }
  updateContents(
    new Delta({
      ops: clientText.text.map((richChar) => {
        return {
          insert: richChar.char,
          attributes: richChar.attributes(),
        };
      }),
    })
  );
  // Delete Quill's starting character (a single "\n", now
  // pushed to the end), since it's not in clientText.
  updateContents(new Delta().retain(clientText.length).delete(1));

  // Reflect Collab operations in Quill.
  // Note that for local operations, Quill has already updated
  // its own representation, so we should skip doing so again.

  clientText.on("Insert", (e) => {
    if (e.meta.senderID === container.runtime.replicaID) return;

    for (let index = e.startIndex; index < e.startIndex + e.count; index++) {
      const richChar = clientText.get(index);
      updateContents(
        new Delta().retain(index).insert(richChar.char, richChar.attributes())
      );
    }
  });

  clientText.on("Delete", (e) => {
    if (e.meta.senderID === container.runtime.replicaID) return;

    updateContents(new Delta().retain(e.startIndex).delete(e.count));
  });

  clientText.on("Format", (e) => {
    if (e.meta.senderID === container.runtime.replicaID) return;

    updateContents(
      new Delta()
        .retain(e.index)
        .retain(1, { [e.key]: clientText.get(e.index).getAttribute(e.key) })
    );
  });

  // Convert user inputs to Collab operations.

  /**
   * Convert delta.ops into an array of modified DeltaOperations
   * having the form { index: first char index, ...DeltaOperation},
   * leaving out ops that do nothing.
   */
  function getRelevantDeltaOperations(delta: Delta): {
    index: number;
    insert?: string | object;
    delete?: number;
    attributes?: Record<string, unknown>;
    retain?: number;
  }[] {
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
          for (let i = 0; i < op.insert.length; i++) {
            clientText.insert(op.index + i, op.insert[i], op.attributes);
          }
        } else {
          // Embed of object
          clientText.insert(op.index, op.insert, op.attributes);
        }
      }
      // Deletion
      else if (op.delete) {
        clientText.delete(op.index, op.delete);
      }
      // Formatting
      else if (op.attributes && op.retain) {
        for (let i = 0; i < op.retain; i++) {
          clientText.format(op.index + i, op.attributes);
        }
      }
    }
  });

  // Ready.
  container.ready();
})();
