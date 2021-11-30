import { Crdt, Pre } from "./crdt";
import { MessageMeta } from "./message_meta";

/**
 * @typeParam M the type of [[MessageMeta]] passed to
 * registered Crdt's.
 */
export interface Runtime {
  // Utilities for internal use by Crdts, serializers, etc.

  /**
   * Type guard, used by [[isRuntime]].
   */
  readonly isRuntime: true;
  readonly replicaId: string;

  childSend(child: Crdt, messagePath: Uint8Array[]): void;

  /**
   * @return the [[MessageMeta]] that will be attached to the
   * next sent message. Note that from a Crdt's perspective,
   * multiple messages might share the same [[MessageMeta]]:
   * its messages might be batched by an ancestor, while
   * [[MessageMeta]] only updates when this Runtime sends a
   * message. This should only be called by the Runtime's children;
   * in general, Crdts should only call nextMessageMeta on their
   * own parent.
   */
  nextMessageMeta(): MessageMeta;

  /**
   * @param count = 1 When set, treat this as count calls,
   * each claiming one number in sequence. Thus all numbers
   * in the range [returned number, returned number + count)
   * will only be associated with this runtime's [[replicaId]]
   * once.
   * @return A unique number that will only be
   * associated with this Runtime's [[replicaId]]
   * once.
   */
  getReplicaUniqueNumber(count: number | undefined): number;
  /**
   * @return A unique string that will only appear once
   * across all replicas.
   */
  getUniqueString(): string;

  /**
   * Returns the series of names on crdt's path to this Runtime.
   *
   * The path may be truncated if this Runtime guarantees
   * that all
   * public-facing Crdt's will be descendants of a given
   * Crdt (e.g., a distinguished root).
   * @param  descendant [description]
   * @return            [description]
   */
  getNamePath(descendant: Crdt): string[];
  /**
   * Returns the descendant with the given `namePath`,
   * as returned by [[getNamePath]].
   * @param  namePath [description]
   * @return          [description]
   */
  getDescendant(namePath: string[]): Crdt;

  // Implementations of user-facing methods from CollabsApp.

  registerCrdt<C extends Crdt>(name: string, preCrdt: Pre<C>): C;
  load(saveData: Uint8Array | null): Promise<void>;
  save(): Promise<Uint8Array>;
}

export function isRuntime(x: any): x is Runtime {
  if (typeof x === "object") {
    if ((x as Runtime).isRuntime === true) {
      return true;
    }
  }
  return false;
}
