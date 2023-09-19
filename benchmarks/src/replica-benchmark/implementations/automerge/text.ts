import { next as automerge } from "@automerge/automerge";
import { IText } from "../../interfaces/text";
import { AutomergeReplica } from "./replica";

export class AutomergeText
  extends AutomergeReplica<{ v: string }>
  implements IText
{
  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({
    v: "",
  });

  skipLoad() {
    this.doc = automerge.load(AutomergeText.fakeInitialSave, this.actorId);
  }

  insert(index: number, char: string): void {
    this.doc = automerge.change(this.doc, (d) => {
      automerge.splice(d, ["v"], index, 0, char);
    });
  }

  delete(index: number): void {
    this.doc = automerge.change(this.doc, (d) => {
      automerge.splice(d, ["v"], index, 1);
    });
  }

  getText(): string {
    return this.doc.v.toString();
  }

  get length(): number {
    return this.doc.v.length;
  }
}
