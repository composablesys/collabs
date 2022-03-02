import { TextReplica } from "../benchmark";
import { YjsReplica } from "../../../libraries";
import { Data } from "../../../implementation";
import { YText } from "yjs/dist/src/types/YText";

export class YjsText extends YjsReplica implements TextReplica {
  private readonly text: YText;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);
    this.text = this.doc.getText("text");
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
