import { makeUID } from "../util/uid";
import { Collab, CollabEventsRecord, InitToken, Pre } from "./collab";
import { EventEmitter } from "./event_emitter";
import { Runtime, RuntimeEventsRecord } from "./runtime";
import { Message } from "./message";

/**
 * Skeletal implementation of [[Runtime]] that uses
 * a root [[Collab]].
 */
export abstract class AbstractRuntime<Events extends RuntimeEventsRecord>
  extends EventEmitter<Events>
  implements Runtime<Events>
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

  abstract childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: Message[]
  ): void;

  abstract getAddedContext(key: symbol): unknown;
}
