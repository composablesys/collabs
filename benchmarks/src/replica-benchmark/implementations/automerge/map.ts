import { next as automerge } from "@automerge/automerge";
import { IMap } from "../../interfaces/map";
import { AutomergeReplica } from "./replica";

export class AutomergeMap
  extends AutomergeReplica<{ [key: string]: unknown }>
  implements IMap
{
  private static fakeInitialSave = AutomergeReplica.getFakeInitialSave({});

  skipLoad() {
    this.readDoc = automerge.load(AutomergeMap.fakeInitialSave, this.actorId);
  }

  set(key: string, value: unknown): void {
    this.writeDoc[key] = value;
  }

  delete(key: string): void {
    delete this.writeDoc[key];
  }

  get(key: string): unknown {
    return this.readDoc[key];
  }

  has(key: string): boolean {
    return this.readDoc[key] !== undefined;
  }

  asMap(): Map<string, unknown> {
    return new Map(Object.entries(this.readDoc));
  }
}
