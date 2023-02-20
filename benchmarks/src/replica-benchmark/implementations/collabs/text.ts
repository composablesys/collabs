import * as collabs from "@collabs/collabs";
import { Data } from "../../../util";
import { IText } from "../../interfaces/text";
import { CollabsReplica } from "./replica";

export function CollabsText(causalityGuaranteed: boolean) {
  return class CollabsText extends CollabsReplica implements IText {
    private readonly text: collabs.CText;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.text = this.runtime.registerCollab(
        "",
        (init) => new collabs.CText(init)
      );
    }

    insert(index: number, char: string): void {
      this.text.insert(index, char);
    }

    delete(index: number): void {
      this.text.delete(index);
    }

    getText(): string {
      return this.text.toString();
    }

    get length(): number {
      return this.text.length;
    }
  };
}
