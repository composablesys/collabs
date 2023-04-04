import * as automerge from "@automerge/automerge";
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
    this.doc = automerge.load(AutomergeVariable.fakeInitialSave, this.actorId);
  }

  set(value: unknown): void {
    this.doc = automerge.change(this.doc, (d) => {
      d.v = value;
    });
  }

  get(): unknown {
    return this.doc.v;
  }
}
