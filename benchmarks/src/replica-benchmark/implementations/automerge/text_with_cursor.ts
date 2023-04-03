import * as automerge from "@automerge/automerge";
import { ITextWithCursor } from "../../interfaces/text_with_cursor";
import { AutomergeReplica } from "./replica";

export class AutomergeTextWithCursor
  extends AutomergeReplica<{ v: automerge.Text }>
  implements ITextWithCursor
{
  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({
    v: new automerge.Text(),
  });

  private cursor = -1;

  protected onRemoteChange(patches: automerge.Patch[]) {
    // Maintain cursor position.
    // We use the fact that all ops are single character insertions/deletions
    // at "v".
    for (const patch of patches) {
      if (patch.action === "insert") {
        const index = patch.path[1] as number;
        if (index < this.cursor) this.cursor++;
      } else if (patch.action === "del") {
        const index = patch.path[1] as number;
        if (index < this.cursor) this.cursor--;
      }
    }
  }

  skipLoad() {
    this.doc = automerge.load(
      AutomergeTextWithCursor.fakeInitialSave,
      this.actorId
    );
  }

  moveCursor(index: number) {
    this.cursor = index;
  }

  needsCursor() {
    return this.cursor === -1;
  }

  insert(char: string): void {
    this.doc = automerge.change(this.doc, (d) =>
      d.v.insertAt(this.cursor, char)
    );
    this.cursor++;
  }

  delete(): void {
    this.doc = automerge.change(this.doc, (d) => d.v.deleteAt(this.cursor, 1));
    this.cursor--;
  }

  getText(): string {
    return this.doc.v.toString();
  }

  get length(): number {
    return this.doc.v.length;
  }
}
