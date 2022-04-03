import Automerge from "automerge";
import { ITextWithCursor } from "../../interfaces/text_with_cursor";
import { AutomergeReplica } from "./replica";

export class AutomergeTextWithCursor
  extends AutomergeReplica<{ v: Automerge.Text }>
  implements ITextWithCursor
{
  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({
    v: new Automerge.Text(),
  });

  private cursor = -1;

  protected onRemoteChange(patch: Automerge.Patch) {
    // Maintain cursor position.
    // We use the fact that all ops are single character insertions/deletions.
    const diffs = patch.diffs.props.v;
    for (const diff of Object.values(diffs)) {
      const listEdit = (<Automerge.ListDiff>diff).edits[0];
      if (listEdit.action === "insert") {
        if (listEdit.index < this.cursor) this.cursor++;
      } else if (listEdit.action === "remove") {
        if (listEdit.index < this.cursor) this.cursor--;
      }
    }
  }

  skipLoad() {
    this.doc = Automerge.load(
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
    this.doc = Automerge.change(this.doc, (d) =>
      d.v.insertAt!(this.cursor, char)
    );
    this.cursor++;
  }

  delete(): void {
    this.doc = Automerge.change(this.doc, (d) => d.v.deleteAt!(this.cursor, 1));
    this.cursor--;
  }

  getText(): string {
    return this.doc.v.toString();
  }

  get length(): number {
    return this.doc.v.length;
  }
}
