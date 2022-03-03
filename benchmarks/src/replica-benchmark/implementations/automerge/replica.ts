import Automerge from "automerge";
import { Data } from "../../../util";
import { Replica } from "../../replica_benchmark";

export abstract class AutomergeReplica<T> implements Replica {
  doc!: Automerge.FreezeObject<T>;

  constructor(
    private readonly onsend: (msg: Data) => void,
    replicaIdRng: seedrandom.prng
  ) {
    // TODO: use replicaIdRng.
  }

  /**
   * doOps should change this.doc using Automerge.change.
   */
  transact(doOps: () => void): void {
    const oldDoc = this.doc;
    doOps();
    const msg = JSON.stringify(Automerge.getChanges(oldDoc, this.doc));
    this.onsend(msg);
  }

  receive(msg: string): void {
    this.doc = Automerge.applyChanges(this.doc, JSON.parse(msg));
  }

  save(): Data {
    return Automerge.save(this.doc);
  }

  load(saveData: string): void {
    this.doc = Automerge.load(saveData);
  }

  /**
   * Use Automerge.from to init your doc here.
   */
  abstract skipLoad(): void;
}
