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
    this.readDoc = automerge.load(AutomergeText.fakeInitialSave, this.actorId);
  }

  insert(index: number, char: string): void {
    automerge.splice(this.writeDoc, ["v"], index, 0, char);
  }

  delete(index: number): void {
    automerge.splice(this.writeDoc, ["v"], index, 1);
  }

  getText(): string {
    return this.readDoc.v.toString();
  }

  get length(): number {
    return this.readDoc.v.length;
  }
}
