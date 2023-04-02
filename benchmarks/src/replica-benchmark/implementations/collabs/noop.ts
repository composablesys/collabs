import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { INoop } from "../../interfaces/noop";
import { CollabsReplica } from "./replica";

export class NoopCRDT extends collabs.PrimitiveCRDT {
  noop() {
    super.sendPrimitive(new Uint8Array());
  }

  protected receiveCRDT(): void {
    // Noop.
  }

  saveCRDT() {
    return new Uint8Array();
  }

  loadCRDT(): void {
    // No-op.
  }
}

export function CollabsNoop(causalityGuaranteed: boolean) {
  return class CollabsNoop extends CollabsReplica implements INoop {
    private readonly noopCRDT;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.noopCRDT = this.runtime.registerCollab(
        "",
        (init) => new NoopCRDT(init)
      );
    }

    noop() {
      this.noopCRDT.noop();
    }
  };
}
