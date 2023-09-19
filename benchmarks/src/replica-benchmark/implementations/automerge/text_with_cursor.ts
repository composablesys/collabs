import { next as automerge } from "@automerge/automerge";
import { ITextWithCursor } from "../../interfaces/text_with_cursor";
import { AutomergeReplica } from "./replica";

export class AutomergeTextWithCursor
  extends AutomergeReplica<{ v: string }>
  implements ITextWithCursor
{
  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({
    v: "",
  });

  private cursor = -1;

  protected onRemoteChange(patches: automerge.Patch[]) {
    // Maintain cursor position.
    // We use the fact that all ops are at path "v".
    for (const patch of patches) {
      if (patch.action === "splice") {
        const index = patch.path[1] as number;
        if (index < this.cursor) this.cursor += patch.value.length;
      } else if (patch.action === "insert") {
        const index = patch.path[1] as number;
        if (index < this.cursor) this.cursor += patch.values.length;
      } else if (patch.action === "del") {
        const index = patch.path[1] as number;
        if (index < this.cursor) this.cursor -= patch.length ?? 1;
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
    this.doc = automerge.change(this.doc, (d) => {
      automerge.splice(d, ["v"], this.cursor, 0, char);
    });
    this.cursor++;
  }

  delete(): void {
    this.doc = automerge.change(this.doc, (d) => {
      automerge.splice(d, ["v"], this.cursor, 1);
    });
    this.cursor--;
  }

  getText(): string {
    return this.doc.v.toString();
  }

  get length(): number {
    return this.doc.v.length;
  }
}
