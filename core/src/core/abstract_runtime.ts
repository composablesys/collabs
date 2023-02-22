import { Collab, CollabEventsRecord, InitToken } from "./collab";
import { CollabID } from "./collab_id";
import { EventEmitter, EventsRecord } from "./event_emitter";
import { IRuntime } from "./iruntime";
import { Parent } from "./parent";
import { MetaRequest } from "./updates";

/**
 * Skeletal implementation of [[IRuntime]] that uses
 * a root [[Collab]].
 */
export abstract class AbstractRuntime<Events extends EventsRecord>
  extends EventEmitter<Events>
  implements IRuntime
{
  readonly isRuntime: true = true;
  /**
   * Readonly. Set with [[setRootCollab]].
   */
  protected rootCollab!: Collab & Parent;

  /**
   * @param replicaID This replica's [[replicaID]], usually
   * obtained from [[ReplicaIDs]].
   */
  constructor(readonly replicaID: string) {
    super();

    if (replicaID === "") {
      throw new Error('replicaID must not be ""');
    }
  }

  /**
   * Call this during your constructor to set [[rootCollab]].
   *
   * @param rootCallback Callback that constructs rootCollab
   * using the given [[InitToken]].
   * @returns The constructed rootCollab.
   */
  protected setRootCollab<C extends Collab & Parent>(
    rootCallback: (init: InitToken) => C
  ): C {
    const rootCollab = rootCallback(new InitToken("", this));
    this.rootCollab = rootCollab;
    return rootCollab;
  }

  private localCounter = 0;
  nextLocalCounter(count = 1): number {
    const ans = this.localCounter;
    this.localCounter += count;
    return ans;
  }

  nextUID(): string {
    // For UID, use a pair (replicaID, replicaUniqueNumber).
    // These are sometimes called "causal dots".
    // They are similar to Lamport timestamps,
    // except that the number is a per-replica counter instead
    // of a logical clock.
    // OPT: shorten (base128 instead of base36)
    return `${this.nextLocalCounter().toString(36)},${this.replicaID}`;
  }

  idOf<C extends Collab<CollabEventsRecord>>(descendant: C): CollabID<C> {
    return this.rootCollab.idOf(descendant);
  }

  fromID<C extends Collab<CollabEventsRecord>>(
    id: CollabID<C>,
    startIndex = 0
  ): C | undefined {
    return this.rootCollab.fromID(id, startIndex);
  }

  abstract childSend(
    child: Collab<CollabEventsRecord>,
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void;
}
