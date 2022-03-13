import { YMap } from "yjs/dist/src/types/YMap";
import { Data } from "../../../util";
import { IVariable } from "../../interfaces/variable";
import { YjsReplica } from "./replica";

export class YjsVariable extends YjsReplica implements IVariable {
  private readonly map: YMap<unknown>;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);
    this.map = this.doc.getMap();
  }

  set(value: unknown): void {
    this.map.set("", value);
  }

  get(): unknown {
    return this.map.get("");
  }
}
