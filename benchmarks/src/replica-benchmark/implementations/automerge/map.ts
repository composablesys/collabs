import { next as automerge } from "@automerge/automerge";
import { IMap } from "../../interfaces/map";
import { AutomergeReplica } from "./replica";

export class AutomergeMap
  extends AutomergeReplica<{ [key: string]: unknown }>
  implements IMap
{
  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({});

  skipLoad() {
    this.doc = automerge.load(AutomergeMap.fakeInitialSave, this.actorId);
  }

  set(key: string, value: unknown): void {
    this.doc = automerge.change(this.doc, (d) => {
      d[key] = value;
    });
  }

  delete(key: string): void {
    this.doc = automerge.change(this.doc, (d) => {
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
