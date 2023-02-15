import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { Replica } from "../../replica_benchmark";

export class CollabsReplica implements Replica {
  protected readonly app: collabs.CRDTApp;

  constructor(
    private readonly onsend: (msg: Data) => void,
    replicaIdRng: seedrandom.prng,
    causalityGuaranteed: boolean
  ) {
    this.app = new collabs.CRDTApp({
      debugReplicaID: collabs.ReplicaIDs.pseudoRandom(replicaIdRng),
      batchingStrategy: new collabs.ManualBatchingStrategy(),
      causalityGuaranteed,
    });
    this.app.on("Send", (e) => this.onsend(e.message));
  }

  transact(doOps: () => void) {
    doOps();
    this.app.commitBatch();
  }

  receive(msg: Uint8Array): void {
    this.app.receive(msg);
  }

  save(): Data {
    return this.app.save();
  }

  load(savedState: Uint8Array): void {
    this.app.load(collabs.Optional.of(savedState));
  }

  skipLoad(): void {
    this.app.load(collabs.Optional.empty());
  }
}
