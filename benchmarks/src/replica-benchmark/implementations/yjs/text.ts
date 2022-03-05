import { YText } from "yjs/dist/src/types/YText";
import { Data } from "../../../util";
import { IText } from "../../interfaces/text";
import { YjsReplica } from "./replica";

export class YjsText extends YjsReplica implements IText {
  private readonly text: YText;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);
    this.text = this.doc.getText();
  }

  insert(index: number, char: string): void {
    this.text.insert(index, char);
  }

  delete(index: number): void {
    this.text.delete(index, 1);
  }

  getText(): string {
    return this.text.toString();
  }

  get length(): number {
    return this.text.length;
  }
}
