import Automerge from "automerge";
import { Data, uuidv4 } from "../../../util";
import { Replica } from "../../replica_benchmark";

export abstract class AutomergeReplica<T> implements Replica {
  doc!: Automerge.FreezeObject<T>;
  protected readonly actorId: string;

  constructor(
    private readonly onsend: (msg: Data) => void,
    replicaIdRng: seedrandom.prng
  ) {
    // actorId is usually set with uuid.v4().replace(/-/g, ""),
    // so we need to do a PRNG version instead.
    this.actorId = uuidv4(replicaIdRng).replace(/-/g, "");
  }

  /**
   * doOps should change this.doc using Automerge.change.
   */
  transact(doOps: () => void): void {
    const oldDoc = this.doc;
    doOps();
    // TODO: can we use Automerge.getLastLocalChange instead?
    // Docs say it should be faster, but it's possible doOps
    // does multiple changes.
    const msg = Automerge.getChanges(oldDoc, this.doc);
    this.onsend(msg);
  }

  receive(msg: Automerge.BinaryChange[]): void {
    const ans = Automerge.applyChanges(this.doc, msg);
    this.doc = ans[0];
    this.onRemoteChange(ans[1]);
  }

  /**
   * Override to get the patch from each remote message.
   */
  protected onRemoteChange(patch: Automerge.Patch): void {}

  save(): Data {
    return Automerge.save(this.doc);
  }

  load(saveData: Automerge.BinaryDocument): void {
    this.doc = Automerge.load(saveData, this.actorId);
  }

  /**
   * Use Automerge.load with a prepared save to init
   * your state. Make sure to use this.actorId as the "options" arg.
   * (Note Automerge.from does not work:
   * it needs to be applied on one replica and shipped to
   * the others, like a normal change.)
   */
  abstract skipLoad(): void;

  static getFakeInitialSave(data: any) {
    return Automerge.save(Automerge.from(data));
  }
}
