import { CRichText } from "@collabs/collabs";
import { Data } from "../../../util";
import { ITextWithCursor } from "../../interfaces/text_with_cursor";
import { CollabsReplica } from "./replica";

export function CollabsRichTextWithCursor(causalityGuaranteed: boolean) {
  return class CollabsRichTextWithCursor
    extends CollabsReplica
    implements ITextWithCursor
  {
    private readonly richText: CRichText;
    private cursor = -1;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.richText = this.runtime.registerCollab(
        "",
        (init) => new CRichText(init)
      );

      // Maintain cursor position.
      // We use the fact that all ops are single character insertions/deletions.
      this.richText.on("Insert", (e) => {
        if (!e.meta.isLocalOp && e.index < this.cursor) this.cursor++;
      });
      this.richText.on("Delete", (e) => {
        if (!e.meta.isLocalOp && e.index < this.cursor) this.cursor--;
      });
    }

    moveCursor(index: number) {
      this.cursor = index;
    }

    needsCursor() {
      return this.cursor === -1;
    }

    insert(char: string): void {
      this.richText.insert(this.cursor, char, {});
      this.cursor++;
    }

    delete(): void {
      this.richText.delete(this.cursor, 1);
      this.cursor--;
    }

    getText(): string {
      return this.richText.toString();
    }

    get length(): number {
      return this.richText.length;
    }
  };
}
