import { Data } from "../../../util";
import { INoop } from "../../interfaces/noop";
import { CollabsReplica } from "./replica";
import * as collabs from "@collabs/collabs";
import { NoopCRDT } from "./noop";

const NESTED_PARENTS = 10;

class NestedNoopCRDT extends collabs.CObject {
  private readonly child: NestedNoopCRDT | NoopCRDT;

  constructor(initToken: collabs.InitToken, parentsRemaining: number) {
    super(initToken);

    if (parentsRemaining === 0) {
      this.child = this.addChild(
        "" + parentsRemaining,
        collabs.Pre(NoopCRDT)()
      );
    } else {
      this.child = this.addChild(
        "" + parentsRemaining,
        collabs.Pre(NestedNoopCRDT)(parentsRemaining - 1)
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

      this.nestedNoopCRDT = this.app.registerCollab(
        "",
        collabs.Pre(NestedNoopCRDT)(NESTED_PARENTS)
      );
    }

    noop() {
      this.nestedNoopCRDT.noop();
    }
  };
}
