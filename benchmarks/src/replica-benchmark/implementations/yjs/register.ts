import { YMap } from "yjs/dist/src/types/YMap";
import { Data } from "../../../util";
import { IRegister } from "../../interfaces/register";
import { YjsReplica } from "./replica";

export class YjsRegister extends YjsReplica implements IRegister {
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
