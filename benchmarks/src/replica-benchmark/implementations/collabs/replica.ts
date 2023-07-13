import { CRuntime, ReplicaIDs } from "@collabs/collabs";
import { Data } from "../../../util";
import { Replica } from "../../replica_benchmark";

export class CollabsReplica implements Replica {
  protected readonly runtime: CRuntime;

  constructor(
    private readonly onsend: (msg: Data) => void,
    replicaIdRng: seedrandom.prng,
    causalityGuaranteed: boolean
  ) {
    this.runtime = new CRuntime({
      debugReplicaID: ReplicaIDs.pseudoRandom(replicaIdRng),
      causalityGuaranteed,
    });
    this.runtime.on("Send", (e) => this.onsend(e.message));
  }

  transact(doOps: () => void) {
    this.runtime.transact(doOps);
  }

  receive(msg: Uint8Array): void {
    this.runtime.receive(msg);
  }

  save(): Data {
    return this.runtime.save();
  }

  load(savedState: Uint8Array): void {
    this.runtime.load(savedState);
  }

  skipLoad(): void {}
}
