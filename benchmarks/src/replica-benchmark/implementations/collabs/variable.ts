import { Data } from "../../../util";
import { IVariable } from "../../interfaces/variable";
import { CollabsReplica } from "./replica";
import * as collabs from "@collabs/collabs";

export function CollabsVariable(causalityGuaranteed: boolean) {
  return class CollabsVariable extends CollabsReplica implements IVariable {
    private readonly variable: collabs.LWWCVariable<unknown>;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.variable = this.app.registerCollab(
        "",
        collabs.Pre(collabs.LWWCVariable)<unknown>(0)
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
