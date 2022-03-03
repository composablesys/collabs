import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { IText } from "../../interfaces/text";
import { CollabsReplica } from "./replica";

interface RichCharEventsRecord extends collabs.CollabEventsRecord {
  Format: { key: string } & collabs.CollabEvent;
}

class RichChar extends collabs.CObject<RichCharEventsRecord> {
  private readonly _attributes: collabs.LwwCMap<string, any>;

  /**
   * char comes from a Quill Delta's insert field, split
   * into single characters if a string.  So it is either
   * a single char, or (for an embed) a JSON-serializable
   * object with a single property.
   */
  constructor(initToken: collabs.InitToken, readonly char: string | object) {
    super(initToken);

    this._attributes = this.addChild("", collabs.Pre(collabs.LwwCMap)());

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

  constructor(
    initToken: collabs.InitToken,
    initialChars: (string | object)[] = []
  ) {
    super(initToken);

    this.text = this.addChild(
      "",
      collabs.Pre(collabs.DeletingMutCList)(
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
      this.emit("Insert", e);
    });
    this.text.on("Delete", (e) => this.emit("Delete", e));
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

export class CollabsRichText extends CollabsReplica implements IText {
  private readonly richText: RichTextInternal;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.richText = this.app.registerCollab(
      "text",
      collabs.Pre(RichTextInternal)()
    );
  }

  insert(index: number, char: string): void {
    this.richText.insert(index, char);
  }

  delete(index: number): void {
    this.richText.delete(index, 1);
  }

  getText(): string {
    return this.richText.text.map((richChar) => <string>richChar.char).join("");
  }

  get length(): number {
    return this.richText.length;
  }
}
