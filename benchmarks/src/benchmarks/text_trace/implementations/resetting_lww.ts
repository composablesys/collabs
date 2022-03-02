import { TextReplica } from "../benchmark";
import * as collabs from "@collabs/collabs";
import { CollabsReplica } from "../../../libraries";
import { Data } from "../../../implementation";

export class ResettingLww extends CollabsReplica implements TextReplica {
  protected readonly text: collabs.ResettingMutCList<
    collabs.LwwCRegister<string>
  >;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.text = this.app.registerCollab(
      "text",
      collabs.Pre(collabs.ResettingMutCList)(
        (valueInitToken) => new collabs.LwwCRegister(valueInitToken, "")
      )
    );
  }

  insert(index: number, char: string): void {
    this.text.insert(index).value = char;
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
