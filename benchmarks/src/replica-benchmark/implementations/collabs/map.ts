import { Data } from "../../../util";
import { IMap } from "../../interfaces/map";
import { CollabsReplica } from "./replica";
import * as collabs from "@collabs/collabs";

export class CollabsMap extends CollabsReplica implements IMap {
  private readonly map: collabs.LWWCMap<string, unknown>;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);

    this.map = this.app.registerCollab("", collabs.Pre(collabs.LWWCMap)());
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
}
