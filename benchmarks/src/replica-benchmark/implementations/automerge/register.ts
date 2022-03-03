import Automerge from "automerge";
import { IRegister } from "../../interfaces/register";
import { AutomergeReplica } from "./replica";

export class AutomergeRegister
  extends AutomergeReplica<{ v: unknown }>
  implements IRegister
{
  skipLoad() {
    this.doc = Automerge.from({ v: 0 });
  }

  set(value: unknown): void {
    this.doc = Automerge.change(this.doc, (d) => {
      d.v = value;
    });
  }

  get(): unknown {
    return this.doc.v;
  }
}
