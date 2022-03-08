import { Data } from "../../../util";
import { IRegister } from "../../interfaces/register";
import { CollabsReplica } from "./replica";
import * as collabs from "@collabs/collabs";

export class CollabsRegister extends CollabsReplica implements IRegister {
  private readonly register: collabs.LWWCRegister<unknown>;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.register = this.app.registerCollab(
      "",
      collabs.Pre(collabs.LWWCRegister)<unknown>(0)
    );
  }

  set(value: unknown): void {
    this.register.value = value;
  }

  get(): unknown {
    return this.register.value;
  }
}
