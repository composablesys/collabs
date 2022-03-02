import { AutomergeReplica } from "../../../libraries";
import { TextReplica } from "../benchmark";
import Automerge from "automerge";

export class AutomergeText
  extends AutomergeReplica<{ text: Automerge.Text }>
  implements TextReplica
{
  insert(index: number, char: string): void {
    this.doc = Automerge.change(this.doc, (d) => d.text.insertAt!(index, char));
  }

  delete(index: number): void {
    this.doc = Automerge.change(this.doc, (d) => d.text.deleteAt!(index, 1));
  }

  getText(): string {
    return this.doc.text.toString();
  }

  get length(): number {
    return this.doc.text.length;
  }

  // Override
  skipLoad() {
    this.doc = Automerge.from({ text: new Automerge.Text() });
  }
}
