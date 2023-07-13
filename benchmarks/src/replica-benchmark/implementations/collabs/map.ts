import { CValueMap } from "@collabs/collabs";
import { Data } from "../../../util";
import { IMap } from "../../interfaces/map";
import { CollabsReplica } from "./replica";

export function CollabsMap(causalityGuaranteed: boolean) {
  return class CollabsMap extends CollabsReplica implements IMap {
    private readonly map: CValueMap<string, unknown>;

    constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
      super(onsend, replicaIdRng, causalityGuaranteed);

      this.map = this.runtime.registerCollab("", (init) => new CValueMap(init));
    }

    set(key: string, value: unknown): void {
      this.map.set(key, value);
    }

    delete(key: string): void {
      this.map.delete(key);
    }

    get(key: string): unknown {
      return this.map.get(key);
    }

    has(key: string): boolean {
      return this.map.has(key);
    }

    asMap(): Map<string, unknown> {
      return new Map(this.map);
    }
  };
}
