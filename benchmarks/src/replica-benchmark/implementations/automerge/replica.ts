import { next as automerge } from "@automerge/automerge";
import { Data, uuidv4 } from "../../../util";
import { Replica } from "../../replica_benchmark";

export abstract class AutomergeReplica<T> implements Replica {
  /* Only for reads and loads. For mutations, use mutableDoc instead. */
  readDoc!: automerge.Doc<T>;
  writeDoc!: T;
  protected readonly actorId: string;
  private readonly applyOptions: automerge.ApplyOptions<T>;

  constructor(
    private readonly onsend: (msg: Data) => void,
    replicaIdRng: seedrandom.prng
  ) {
    // actorId is usually set with uuid.v4().replace(/-/g, ""),
    // so we need to do a PRNG version instead.
    this.actorId = uuidv4(replicaIdRng).replace(/-/g, "");

    this.applyOptions = {
      patchCallback: (patches, { before, after }) =>
        this.onRemoteChange(patches, before, after),
    };
  }

  /**
   * doOps should change this.doc by mutating this.writeDoc, trusting
   * that it is inside a call to automerge.change.
   */
  transact(doOps: () => void): void {
    this.readDoc = automerge.change(this.readDoc, (doc) => {
      this.writeDoc = doc;
      doOps();
      // @ts-expect-error
      this.writeDoc = undefined;
    });
    // Use getLastLocalChange because it is faster than getChanges:
    // https://github.com/automerge/automerge/issues/748
    // However then we must do the this.writeDoc weirdness above, to handle traces
    // that call multiple ops in one transact() call (e.g. MapRolling).
    this.onsend([automerge.getLastLocalChange(this.readDoc)!]);
  }

  receive(msg: automerge.Change[]): void {
    const ans = automerge.applyChanges(this.readDoc, msg, this.applyOptions);
    this.readDoc = ans[0];
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
    return automerge.save(this.readDoc);
  }

  load(savedState: Uint8Array): void {
    this.readDoc = automerge.load(savedState, this.actorId);
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
    automerge.free(this.readDoc);
  }
}
