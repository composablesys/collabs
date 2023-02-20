import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { ITextWithCursor } from "../../interfaces/text_with_cursor";
import { CollabsReplica } from "./replica";

export function CollabsTextWithCursor(causalityGuaranteed: boolean) {
  return class CollabsTextWithCursor
    extends CollabsReplica
    implements ITextWithCursor
  {
    private readonly text: collabs.CText;
    private cursor = -1;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.text = this.runtime.registerCollab(
        "",
        (init) => new collabs.CText(init)
      );

      // Maintain cursor position.
      // We use the fact that all ops are single character insertions/deletions.
      // TODO: use position-based cursors instead?
      this.text.on("Insert", (e) => {
        if (!e.meta.isLocalOp && e.index < this.cursor) {
          this.cursor++;
        }
        if (this.cursor > this.length) {
          console.log(this.cursor + ", " + this.length);
          console.log(e);
          throw new Error();
        }
      });
      this.text.on("Delete", (e) => {
        if (!e.meta.isLocalOp && e.index < this.cursor) {
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
