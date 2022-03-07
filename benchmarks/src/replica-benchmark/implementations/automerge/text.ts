import Automerge from "automerge";
import { IText } from "../../interfaces/text";
import { AutomergeReplica } from "./replica";

export class AutomergeText
  extends AutomergeReplica<{ v: Automerge.Text }>
  implements IText
{
  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({
    v: new Automerge.Text(),
  });

  skipLoad() {
    this.doc = Automerge.load(AutomergeText.fakeInitialSave);
  }

  insert(index: number, char: string): void {
    this.doc = Automerge.change(this.doc, (d) => d.v.insertAt!(index, char));
  }

  delete(index: number): void {
    this.doc = Automerge.change(this.doc, (d) => d.v.deleteAt!(index, 1));
  }

  getText(): string {
    return this.doc.v.toString();
  }

  get length(): number {
    return this.doc.v.length;
  }
}
