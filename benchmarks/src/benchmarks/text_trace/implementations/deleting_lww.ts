import { TextReplica } from "../benchmark";
import * as collabs from "@collabs/collabs";
import { CollabsReplica } from "../../../libraries";
import { Data } from "../../../implementation";

export class DeletingLww extends CollabsReplica implements TextReplica {
  protected readonly text: collabs.DeletingMutCList<
    collabs.LwwCRegister<string>,
    [char: string]
  >;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.text = this.app.registerCollab(
      "text",
      collabs.Pre(collabs.DeletingMutCList)(
        (valueInitToken, char: string) =>
          new collabs.LwwCRegister(valueInitToken, char)
      )
    );
  }

  insert(index: number, char: string): void {
    this.text.insert(index, char);
  }

  delete(index: number): void {
    this.text.delete(index);
  }

  getText(): string {
    return this.text.map((lww) => lww.value).join("");
  }

  get length(): number {
    return this.text.length;
  }
}
