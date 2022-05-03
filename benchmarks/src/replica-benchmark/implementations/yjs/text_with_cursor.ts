import { YText } from "yjs/dist/src/types/YText";
import { Data } from "../../../util";
import { ITextWithCursor } from "../../interfaces/text_with_cursor";
import { YjsReplica } from "./replica";

export class YjsTextWithCursor extends YjsReplica implements ITextWithCursor {
  private readonly text: YText;
  private cursor = -1;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.text = this.doc.getText();

    // Maintain cursor position.
    // We use the fact that all ops are single character insertions/deletions.
    this.text.observe((e) => {
      if (!e.transaction.local) {
        let index = 0;
        for (const delta of e.delta) {
          if (delta.insert) {
            if (index < this.cursor) this.cursor++;
            return;
          } else if (delta.delete) {
            if (index < this.cursor) this.cursor--;
            return;
          } else {
            index += delta.retain!;
          }
        }
      }
    });
  }

  moveCursor(index: number) {
    this.cursor = index;
  }

  needsCursor() {
    return this.cursor === -1;
  }

  insert(char: string): void {
    this.text.insert(this.cursor, char);
    this.cursor++;
  }

  delete(): void {
    this.text.delete(this.cursor, 1);
    this.cursor--;
  }

  getText(): string {
    return this.text.toString();
  }

  get length(): number {
    return this.text.length;
  }
}
