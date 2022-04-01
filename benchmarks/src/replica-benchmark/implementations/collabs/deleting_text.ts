import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { IText } from "../../interfaces/text";
import { CollabsReplica } from "./replica";

export function CollabsDeletingText(causalityGuaranteed: boolean) {
  return class CollabsDeletingText extends CollabsReplica implements IText {
    protected readonly text: collabs.DeletingMutCList<
      collabs.LWWCVariable<string>,
      []
    >;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.text = this.app.registerCollab(
        "",
        collabs.Pre(collabs.DeletingMutCList)(
          (valueInitToken) => new collabs.LWWCVariable(valueInitToken, "")
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
  };
}
