import * as collabs from "@collabs/collabs";
import { CRDTContainer } from "@collabs/container";
import Quill, { DeltaOperation } from "quill";

// Include CSS
import "quill/dist/quill.snow.css";

const Delta = Quill.import("delta");
declare type Delta = {
  ops: DeltaOperation[];
};

interface RichCharEventsRecord extends collabs.CollabEventsRecord {
  Format: { key: string } & collabs.CollabEvent;
}

class RichChar extends collabs.CObject<RichCharEventsRecord> {
  private readonly _attributes: collabs.LWWCMap<string, any>;
  readonly ignoreAttrsSet: Set<string>;

  /**
   * char comes from a Quill Delta's insert field, split
   * into single characters if a string.  So it is either
   * a single char, or (for an embed) a JSON-serializable
   * object with a single property.
   */
  constructor(
    initToken: collabs.InitToken,
    readonly char: string | object,
    readonly origin: RichChar | null,
    ignoreAttrs: string[]
  ) {
    super(initToken);

    this._attributes = this.addChild("", collabs.Pre(collabs.LWWCMap)());

    this.ignoreAttrsSet = new Set(ignoreAttrs);

    // Events
    this._attributes.on("Set", (e) => {
      this.emit("Format", {
        key: e.key,
        meta: e.meta,
      });
    });
    this._attributes.on("Delete", (e) => {
      this.emit("Format", { key: e.key, meta: e.meta });
    });
  }

  getAttribute(attribute: string): any | null {
    return this._attributes.get(attribute) ?? null;
  }

  /**
   * null attribute deletes the existing one.
   */
  setAttribute(attribute: string, value: any | null) {
    if (value === null) {
      this._attributes.delete(attribute);
    } else {
      this._attributes.set(attribute, value);
    }
  }

  attributes(): { [key: string]: any } {
    return Object.fromEntries(this._attributes);
  }

  loadObject(saveData: collabs.Optional<Uint8Array>) {
    if (!saveData.isPresent && this.origin !== null) {
      // Copy non-ignored attrs.
      this._attributes.load(
        collabs.Optional.of(this.origin._attributes.save())
      );
      for (const key of this.ignoreAttrsSet) {
        this._attributes.getVariable(key).fullClear();
      }
    }
  }
}

interface FormatOp {
  target: RichChar;
  attribute: string;
}

interface RichTextEventsRecord extends collabs.CollabEventsRecord {
  Insert: { startIndex: number; count: number } & collabs.CollabEvent;
  Delete: { startIndex: number; count: number } & collabs.CollabEvent;
  Format: { index: number; key: string } & collabs.CollabEvent;
}

class RichText extends collabs.CObject<RichTextEventsRecord> {
  readonly text: collabs.ArchivingMutCList<
    RichChar,
    [
      char: string | object,
      originID: collabs.CollabID<RichChar> | null,
      ignoreAttrs: string[]
    ]
  >;
  private readonly sdpStore: collabs.SemidirectProductStore<FormatOp, RichChar>;
  private readonly runLocallyLayer: collabs.RunLocallyLayer;

  constructor(
    initToken: collabs.InitToken,
    initialChars: (string | object)[] = []
  ) {
    super(initToken);

    this.runLocallyLayer = this.addChild(
      "",
      collabs.Pre(collabs.RunLocallyLayer)()
    );
    this.text = this.runLocallyLayer.setChild(
      collabs.Pre(collabs.ArchivingMutCList)(
        (valueInitToken, char, originID, ignoreAttrs) => {
          const origin = originID === null ? null : originID.get(this.text)!;
          const richChar = new RichChar(
            valueInitToken,
            char,
            origin,
            ignoreAttrs
          );
          richChar.on("Format", (e) => {
            const acted = this.sdpStore.processM1(
              {
                target: richChar,
                attribute: e.key,
              },
              <collabs.CRDTMeta>e.meta[collabs.CRDTMeta.MESSAGE_META_KEY]
            );
            if (acted !== null) {
              // Also format the new target indicated by acted.
              const value = richChar.getAttribute(e.key);
              this.runLocallyLayer.runLocally(e.meta, () => {
                acted.target.setAttribute(acted.attribute, value);
              });
            }
            this.emit("Format", { index: this.text.indexOf(richChar), ...e });
          });
          return richChar;
        },
        initialChars.map((value) => [
          value,
          <collabs.CollabID<RichChar> | null>null,
          [],
        ])
      )
    );
    this.sdpStore = this.addChild(
      "1",
      collabs.Pre(collabs.SemidirectProductStore)(
        this.action.bind(this),
        new collabs.CollabSerializer(this.text)
      )
    );

    // Events.
    this.text.on("Insert", (e) => {
      this.sdpStore.processM2(
        this.text.get(e.startIndex),
        <collabs.CRDTMeta>e.meta[collabs.CRDTMeta.MESSAGE_META_KEY]
      );
      this.emit("Insert", e);
    });
    this.text.on("Delete", (e) => this.emit("Delete", e));
  }

  private action(m2: RichChar, m1: FormatOp): FormatOp | null {
    // Action: transfer the formatting to m2 if:
    // - m1.target is m2's origin
    // - m1.key is not one of m2's ignoreAttrs.
    if (m1.target === m2.origin) {
      if (!m2.ignoreAttrsSet.has(m1.attribute)) {
        return { target: m2, attribute: m1.attribute };
      }
    }
    return null;
  }

  get(index: number): RichChar {
    return this.text.get(index);
  }

  get length(): number {
    return this.text.length;
  }

  insert(
    index: number,
    char: string | object,
    attributes?: Record<string, any>
  ) {
    const origin = index === 0 ? null : this.text.get(index - 1);
    if (origin !== null) {
      const originID = collabs.CollabID.fromCollab(origin, this.text);
      // ignoreAttrs that differ between this and origin.
      const ignoreAttrs: string[] = [];
      const keys = new Set(Object.keys(attributes ?? {}));
      for (const key of Object.keys(origin.attributes())) keys.add(key);
      for (const key of keys) {
        if ((attributes ?? {})[key] !== origin.getAttribute(key)) {
          console.log("diff: " + key);
          console.log((attributes ?? {})[key]);
          console.log(origin.getAttribute(key));
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
    this.text.delete(startIndex, count);
  }

  /**
   * null attribute deletes the existing one.
   */
  format(index: number, newAttributes?: Record<string, any>) {
    this.formatChar(this.get(index), newAttributes);
  }

  private formatChar(richChar: RichChar, newAttributes?: Record<string, any>) {
    if (newAttributes) {
      for (const entry of Object.entries(newAttributes)) {
        richChar.setAttribute(...entry);
      }
    }
  }
}

(async function () {
  const container = new CRDTContainer();

  // Quill's initial content is "\n".
  const clientText = container.registerCollab(
    "text",
    collabs.Pre(RichText)(["\n"])
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
    if (e.meta.isLocalEcho) return;

    for (let index = e.startIndex; index < e.startIndex + e.count; index++) {
      // Characters start without any formatting.
      updateContents(
        new Delta().retain(index).insert(clientText.get(index).char)
      );
    }
  });

  clientText.on("Delete", (e) => {
    if (e.meta.isLocalEcho) return;

    updateContents(new Delta().retain(e.startIndex).delete(e.count));
  });

  clientText.on("Format", (e) => {
    if (e.meta.isLocalEcho) return;

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
    attributes?: Record<string, any>;
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

// TODO: cursor management.  Quill appears to be doing this
// for us, but should verify.
