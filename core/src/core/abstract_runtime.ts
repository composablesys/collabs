import { Collab, CollabEventsRecord, InitToken } from "./collab";
import { Runtime } from "./runtime";
import { MetaRequest } from "./updates";

/**
 * Skeletal implementation of [[Runtime]] that uses
 * a root [[Collab]].
 */
export abstract class AbstractRuntime implements Runtime {
  readonly isRuntime: true = true;
  /**
   * Readonly. Set with setRootCollab.
   */
  protected rootCollab!: Collab;

  /**
   * @param replicaID This replica's [[replicaID]].
   */
  constructor(readonly replicaID: string) {
    if (replicaID === "") {
      throw new Error('replicaID must not be ""');
    }
  }

  protected setRootCollab<C extends Collab>(
    rootCallback: (init: InitToken) => C
  ): C {
    const rootCollab = rootCallback(new InitToken("", this));
    this.rootCollab = rootCollab;
    return rootCollab;
  }

  private idCounter = 0;
  nextLocalCounter(count = 1): number {
    const ans = this.idCounter;
    this.idCounter += count;
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

  getNamePath(descendant: Collab): string[] {
    return this.rootCollab.getNamePath(descendant);
  }

  getDescendant(namePath: string[]): Collab | undefined {
    return this.rootCollab.getDescendant(namePath[Symbol.iterator]());
  }

  abstract childSend(
    child: Collab<CollabEventsRecord>,
    messageStack: Uint8Array[],
    metaRequests: MetaRequest[]
  ): void;
}
