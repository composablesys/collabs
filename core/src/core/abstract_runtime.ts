import { makeUID } from "../util/uid";
import { Collab, CollabEventsRecord, InitToken, Pre } from "./collab";
import { EventEmitter } from "./event_emitter";
import { Runtime, RuntimeEventsRecord } from "./runtime";
import { Message } from "./message";
import { MessageMeta } from "./message_meta";

/**
 * Skeletal implementation of [[Runtime]] that uses
 * a root [[Collab]].
 */
export abstract class AbstractRuntime<
    Events extends RuntimeEventsRecord = RuntimeEventsRecord
  >
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

    if (replicaID === "") {
      throw new Error('replicaID must not be ""');
    }
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

  getDescendant(namePath: string[]): Collab | undefined {
    return this.rootCollab.getDescendant(namePath);
  }

  /**
   * Returns context added by this Runtime
   * for the given key, or undefined if not added.
   *
   * By default, this only implements the context key
   * [[MessageMeta.NEXT_MESSAGE_META]]. Subclasses may add other context keys
   * or overwrite that one, but they must ensure that
   * [[MessageMeta.NEXT_MESSAGE_META]] remains implemented.
   */
  getAddedContext(key: symbol): unknown {
    if (key === MessageMeta.NEXT_MESSAGE_META) {
      return MessageMeta.new(this.replicaID, true, true);
    } else return undefined;
  }

  abstract childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: Message[]
  ): void;

  abstract readonly isLoaded: boolean;
}
