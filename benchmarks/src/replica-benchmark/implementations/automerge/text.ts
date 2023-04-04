import * as automerge from "@automerge/automerge";
import { IText } from "../../interfaces/text";
import { AutomergeReplica } from "./replica";

export class AutomergeText
  extends AutomergeReplica<{ v: automerge.Text }>
  implements IText
{
  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({
    v: new automerge.Text(),
  });

  skipLoad() {
    this.doc = automerge.load(AutomergeText.fakeInitialSave, this.actorId);
  }

  insert(index: number, char: string): void {
    this.doc = automerge.change(this.doc, (d) => d.v.insertAt(index, char));
  }

  delete(index: number): void {
    this.doc = automerge.change(this.doc, (d) => d.v.deleteAt(index, 1));
  }

  getText(): string {
    return this.doc.v.toString();
  }

  get length(): number {
    return this.doc.v.length;
  }
}
