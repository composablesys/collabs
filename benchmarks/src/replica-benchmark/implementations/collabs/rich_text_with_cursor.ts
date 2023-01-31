import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { ITextWithCursor } from "../../interfaces/text_with_cursor";
import { CollabsReplica } from "./replica";

interface RichCharEventsRecord extends collabs.CollabEventsRecord {
  Format: { key: string } & collabs.CollabEvent;
}

class RichChar extends collabs.CObject<RichCharEventsRecord> {
  private readonly _attributes: collabs.LWWCMap<string, any>;

  /**
   * char comes from a Quill Delta's insert field, split
   * into single characters if a string.  So it is either
   * a single char, or (for an embed) a JSON-serializable
   * object with a single property.
   */
  constructor(init: collabs.InitToken, readonly char: string | object) {
    super(init);

    this._attributes = this.addChild("", (init) => new collabs.LWWCMap(init));

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
}

interface RichTextEventsRecord extends collabs.CollabEventsRecord {
  Insert: { startIndex: number; count: number } & collabs.CollabEvent;
  Delete: { startIndex: number; count: number } & collabs.CollabEvent;
  Format: { index: number; key: string } & collabs.CollabEvent;
}

class RichTextInternal extends collabs.CObject<RichTextEventsRecord> {
  readonly text: collabs.DeletingMutCList<RichChar, [char: string | object]>;

  constructor(init: collabs.InitToken, initialChars: (string | object)[] = []) {
    super(init);

    this.text = this.addChild(
      "",
      (init) =>
        new collabs.DeletingMutCList(
          init,
          (valueInitToken, char) => {
            const richChar = new RichChar(valueInitToken, char);
            richChar.on("Format", (e) => {
              this.emit("Format", { index: this.text.indexOf(richChar), ...e });
            });
            return richChar;
          },
          initialChars.map((value) => [value])
        )
    );
    this.text.on("Insert", (e) => {
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
    const richChar = this.text.insert(index, char);
    this.formatChar(richChar, attributes);
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

export function CollabsRichTextWithCursor(causalityGuaranteed: boolean) {
  return class CollabsRichTextWithCursor
    extends CollabsReplica
    implements ITextWithCursor
  {
    private readonly richText: RichTextInternal;
    private cursor = -1;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.richText = this.app.registerCollab(
        "",
        (init) => new RichTextInternal(init)
      );

      // Maintain cursor position.
      // We use the fact that all ops are single character insertions/deletions.
      // TODO: use built-in Cursor instead? Matches our plain text demo,
      // but unstable API and also probably slower.
      this.richText.on("Insert", (e) => {
        if (!e.meta.isLocalUser && e.startIndex < this.cursor) this.cursor++;
      });
      this.richText.on("Delete", (e) => {
        if (!e.meta.isLocalUser && e.startIndex < this.cursor) this.cursor--;
      });
    }

    moveCursor(index: number) {
      this.cursor = index;
    }

    needsCursor() {
      return this.cursor === -1;
    }

    insert(char: string): void {
      this.richText.insert(this.cursor, char);
      this.cursor++;
    }

    delete(): void {
      this.richText.delete(this.cursor, 1);
      this.cursor--;
    }

    getText(): string {
      return this.richText.text
        .map((richChar) => <string>richChar.char)
        .join("");
    }

    get length(): number {
      return this.richText.length;
    }
  };
}
