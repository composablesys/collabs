import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { Replica } from "../../replica_benchmark";

export class CollabsReplica implements Replica {
  protected readonly app: collabs.CRDTApp;

  constructor(
    private readonly onsend: (msg: Data) => void,
    replicaIdRng: seedrandom.prng
  ) {
    this.app = new collabs.CRDTApp({
      debugReplicaId: collabs.pseudoRandomReplicaId(replicaIdRng),
      batchingStrategy: new collabs.ManualBatchingStrategy(),
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

  load(saveData: Uint8Array): void {
    this.app.load(collabs.Optional.of(saveData));
  }

  skipLoad(): void {
    this.app.load(collabs.Optional.empty());
  }
}
