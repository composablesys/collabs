import { makeUID } from "../util/uid";
import { Collab, CollabEventsRecord, InitToken, Pre } from "./collab";
import { EventEmitter } from "./event_emitter";
import { Runtime, RuntimeEventsRecord } from "./runtime";

/**
 * Skeletal implementation of [[Runtime]] that implements
 * most behavior using a root [[Collab]].
 */
export abstract class AbstractRuntime<Events extends RuntimeEventsRecord>
  extends EventEmitter<Events>
  implements Runtime 
{
  readonly isRuntime: true = true;
  /**
   * Readonly. Set with setRootCollab.
   */
  protected rootCollab!: Collab;

  constructor(readonly replicaID: string) {
    super();
  }

  protected setRootCollab<C extends Collab>(preRootCollab: Pre<C>): C {
    const rootCollab = preRootCollab(new InitToken("", this));
    this.rootCollab = rootCollab;
    return rootCollab;
  }

  save(): Uint8Array {
    return this.rootCollab.save();
  }

  load(saveData: Uint8Array | null): void {
    this.rootCollab.load(saveData);
  }

  private idCounter = 0;
  getReplicaUniqueNumber(count = 1): number {
    const ans = this.idCounter;
    this.idCounter += count;
    return ans;
  }

  getUID(): string {
    return makeUID(this.replicaID, this.getReplicaUniqueNumber());
  }

  getNamePath(descendant: Collab): string[] {
    return this.rootCollab.getNamePath(descendant);
  }

  getDescendant(namePath: string[]): Collab {
    return this.rootCollab.getDescendant(namePath);
  }

  abstract registerCollab<C extends Collab<CollabEventsRecord>>(
    name: string,
    preCollab: Pre<C>
  ): C;

  abstract childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: (string | Uint8Array)[]
  ): void;

  abstract getAddedContext(key: symbol): unknown;
}
