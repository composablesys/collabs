import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { INoop } from "../../interfaces/noop";
import { NoopCRDT } from "./noop";
import { CollabsReplica } from "./replica";

const NESTED_PARENTS = 10;

class NestedNoopCRDT extends collabs.CObject {
  private readonly child: NestedNoopCRDT | NoopCRDT;

  constructor(init: collabs.InitToken, parentsRemaining: number) {
    super(init);

    if (parentsRemaining === 0) {
      this.child = this.registerCollab(
        "" + parentsRemaining,
        (init) => new NoopCRDT(init)
      );
    } else {
      this.child = this.registerCollab(
        "" + parentsRemaining,
        (init) => new NestedNoopCRDT(init, parentsRemaining - 1)
      );
    }
  }

  noop() {
    this.child.noop();
  }
}

export function CollabsNestedNoop(causalityGuaranteed: boolean) {
  return class CollabsNestedNoop extends CollabsReplica implements INoop {
    private readonly nestedNoopCRDT;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.nestedNoopCRDT = this.runtime.registerCollab(
        "",
        (init) => new NestedNoopCRDT(init, NESTED_PARENTS)
      );
    }

    noop() {
      this.nestedNoopCRDT.noop();
    }
  };
}
