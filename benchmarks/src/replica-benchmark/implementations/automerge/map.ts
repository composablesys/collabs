import Automerge from "automerge";
import { IMap } from "../../interfaces/map";
import { AutomergeReplica } from "./replica";

export class AutomergeMap
  extends AutomergeReplica<{ [key: string]: unknown }>
  implements IMap
{
  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({});

  skipLoad() {
    this.doc = Automerge.load(AutomergeMap.fakeInitialSave);
  }

  set(key: string, value: unknown): void {
    this.doc = Automerge.change(this.doc, (d) => {
      d[key] = value;
    });
  }

  delete(key: string): void {
    this.doc = Automerge.change(this.doc, (d) => {
      delete d[key];
    });
  }

  get(key: string): unknown {
    return this.doc[key];
  }

  has(key: string): boolean {
    return this.doc[key] !== undefined;
  }

  asMap(): Map<string, unknown> {
    return new Map(Object.entries(this.doc));
  }
}
