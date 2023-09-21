import { next as automerge } from "@automerge/automerge";
import { IVariable } from "../../interfaces/variable";
import { AutomergeReplica } from "./replica";

export class AutomergeVariable
  extends AutomergeReplica<{ v: unknown }>
  implements IVariable
{
  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({
    v: 0,
  });

  skipLoad() {
    this.readDoc = automerge.load(
      AutomergeVariable.fakeInitialSave,
      this.actorId
    );
  }

  set(value: unknown): void {
    this.writeDoc.v = value;
  }

  get(): unknown {
    return this.readDoc.v;
  }
}
