import { YMap } from "yjs/dist/src/types/YMap";
import { Data } from "../../../util";
import { IMap } from "../../interfaces/map";
import { YjsReplica } from "./replica";

export class YjsMap extends YjsReplica implements IMap {
  private readonly map: YMap<unknown>;

  constructor(onsend: (msg: Data) => void, replicaIdRng: seedrandom.prng) {
    super(onsend, replicaIdRng);
    this.map = this.doc.getMap();
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
    return new Map(this.map.entries());
  }
}
