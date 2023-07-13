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
   * obtained from [[ReplicaIDs]]. Must not be `""`.
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

  /**
   * Returns a [[CollabID]] for the given Collab.
   *
   * The CollabID may be passed to [[fromID]] on any replica of this
   * runtime to obtain that replica's copy of `collab`.
   *
   * @param collab A Collab that belongs to this runtime.
   */
  idOf<C extends Collab<CollabEventsRecord>>(collab: C): CollabID<C> {
    if (collab.runtime !== this) {
      throw new Error("idOf called with Collab from different Runtime");
    }
    return this.rootCollab.idOf(collab);
  }

  /**
   * Inverse of [[idOf]].
   *
   * Specifically, given a [[CollabID]] returned by [[idOf]] on some replica of
   * this runtime, returns this replica's copy of the original
   * `collab`. If that Collab does not exist (e.g., it was deleted
   * or it is not present in this program version), returns undefined.
   *
   * @param id A CollabID from [[idOf]].
   */
  fromID<C extends Collab<CollabEventsRecord>>(id: CollabID<C>): C | undefined {
    return this.rootCollab.fromID(id);
  }

  abstract childSend(
    child: Collab<CollabEventsRecord>,
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void;
}
