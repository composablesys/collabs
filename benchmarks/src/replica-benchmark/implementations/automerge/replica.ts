import * as automerge from "@automerge/automerge";
import { Data, uuidv4 } from "../../../util";
import { Replica } from "../../replica_benchmark";

export abstract class AutomergeReplica<T> implements Replica {
  doc!: automerge.Doc<T>;
  protected readonly actorId: string;
  private readonly applyOptions: automerge.ApplyOptions<T>;

  constructor(
    private readonly onsend: (msg: Data) => void,
    replicaIdRng: seedrandom.prng
  ) {
    // actorId is usually set with uuid.v4().replace(/-/g, ""),
    // so we need to do a PRNG version instead.
    this.actorId = uuidv4(replicaIdRng).replace(/-/g, "");

    this.applyOptions = { patchCallback: this.onRemoteChange.bind(this) };
  }

  /**
   * doOps should change this.doc using Automerge.change.
   */
  transact(doOps: () => void): void {
    const oldDoc = this.doc;
    doOps();
    // TODO: can we use Automerge.getLastLocalChange instead?
    // Might be faster, but it's possible doOps does multiple changes.
    const msg = automerge.getChanges(oldDoc, this.doc);
    this.onsend(msg);
  }

  receive(msg: automerge.Change[]): void {
    const ans = automerge.applyChanges(this.doc, msg, this.applyOptions);
    this.doc = ans[0];
  }

  /**
   * Override to be used as the PatchCallback for remote messages.
   */
  protected onRemoteChange(
    patches: automerge.Patch[],
    before: automerge.Doc<T>,
    after: automerge.Doc<T>
  ): void {}

  save(): Data {
    return automerge.save(this.doc);
  }

  load(savedState: Uint8Array): void {
    this.doc = automerge.load(savedState, this.actorId);
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
    return automerge.save(automerge.from(data));
  }

  free(): void {
    automerge.free(this.doc);
  }
}
