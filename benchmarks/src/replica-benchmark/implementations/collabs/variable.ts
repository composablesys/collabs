import { CVar } from "@collabs/collabs";
import { Data } from "../../../util";
import { IVariable } from "../../interfaces/variable";
import { CollabsReplica } from "./replica";

export function CollabsVariable(causalityGuaranteed: boolean) {
  return class CollabsVariable extends CollabsReplica implements IVariable {
    private readonly variable: CVar<unknown>;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.variable = this.runtime.registerCollab(
        "",
        (init) => new CVar(init, 0)
      );
    }

    set(value: unknown): void {
      this.variable.value = value;
    }

    get(): unknown {
      return this.variable.value;
    }
  };
}
