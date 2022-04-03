import { Data } from "../../../util";
import { CollabsReplica } from "./replica";
import * as collabs from "@collabs/collabs";
import { ITextWithCursor } from "../../interfaces/text_with_cursor";

export function CollabsTextWithCursor(causalityGuaranteed: boolean) {
  return class CollabsTextWithCursor
    extends CollabsReplica
    implements ITextWithCursor
  {
    private readonly text: collabs.CText;
    private cursor = -1;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.text = this.app.registerCollab("", collabs.Pre(collabs.CText)());

      // Maintain cursor position.
      // We use the fact that all ops are single character insertions/deletions.
      // TODO: use built-in Cursor instead? Matches our plain text demo,
      // but unstable API and also probably slower.
      this.text.on("Insert", (e) => {
        if (!e.meta.isLocalEcho && e.startIndex < this.cursor) {
          this.cursor++;
        }
        if (this.cursor > this.length) {
          console.log(this.cursor + ", " + this.length);
          console.log(e);
          throw new Error();
        }
      });
      this.text.on("Delete", (e) => {
        if (!e.meta.isLocalEcho && e.startIndex < this.cursor) {
          this.cursor--;
        }
        if (this.cursor > this.length) {
          console.log(this.cursor + ", " + this.length);
          console.log(e);
          throw new Error();
        }
      });
    }

    moveCursor(index: number) {
      this.cursor = index;
      if (this.cursor > this.length) {
        console.log(this.cursor + ", " + this.length);
        console.log("moveCursor");
        throw new Error();
      }
    }

    needsCursor() {
      return this.cursor === -1;
    }

    insert(char: string): void {
      this.text.insert(this.cursor, char);
      this.cursor++;
    }

    delete(): void {
      this.text.delete(this.cursor);
      this.cursor--;
    }

    getText(): string {
      return this.text.toString();
    }

    get length(): number {
      return this.text.length;
    }
  };
}
