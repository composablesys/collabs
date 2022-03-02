import { TextReplica } from "../benchmark";
import * as collabs from "@collabs/collabs";
import { CollabsReplica } from "../../../libraries";
import { Data } from "../../../implementation";

export class Text extends CollabsReplica implements TextReplica {
  protected readonly text: collabs.CText;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.text = this.app.registerCollab("text", collabs.Pre(collabs.CText)());
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
}
