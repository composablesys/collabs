import { Data } from "../../../util";
import { IText } from "../../interfaces/text";
import { CollabsReplica } from "./replica";
import * as collabs from "@collabs/collabs";

export class CollabsText extends CollabsReplica implements IText {
  private readonly text: collabs.CText;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.text = this.app.registerCollab("", collabs.Pre(collabs.CText)());
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
