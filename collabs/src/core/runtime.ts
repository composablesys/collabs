import { Collab, CollabEvent, Pre } from "./collab";
import { ICollabParent } from "./collab_parent";
import { EventEmitter } from "./event_emitter";

interface RuntimeEventsRecord {
  /**
   * Emitted each time the app's state is changed and
   * is in a reasonable user-facing state
   * (so not in the middle of a transaction).
   *
   * A simple way to keep a GUI in sync with the app is to
   * do `runtime.on("Change", refreshDisplay)`.
   */
  Change: CollabEvent;
}

/**
 * TODO: see [concrete instance]
 */
export interface Runtime
  extends ICollabParent,
    EventEmitter<RuntimeEventsRecord> {
  // Utilities for internal use by Collabs, serializers, etc.

  /**
   * Type guard, used by [[isRuntime]].
   */
  readonly isRuntime: true;
  readonly replicaId: string;

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
  getReplicaUniqueNumber(count?: number): number;

  /**
   * @return A unique string that will only appear once
   * across all replicas.
   */
  getUniqueString(): string;

  /**
   * Returns the series of names on descendant's path to this Runtime.
   *
   * The path may be truncated if this Runtime guarantees
   * that all
   * public-facing Collab's will be descendants of a given
   * Collab (e.g., a distinguished root).
   *
   * See [[getDescendant]].
   *
   * @param  descendant [description]
   * @return            [description]
   */
  getNamePath(descendant: Collab): string[];

  /**
   * Returns the descendant with the given `namePath`,
   * as returned by [[getNamePath]].
   * @param  namePath [description]
   * @return          [description]
   */
  getDescendant(namePath: string[]): Collab;

  // Implementations of user-facing methods from App.

  registerCollab<C extends Collab>(name: string, preCollab: Pre<C>): C;
  /**
   * TODO: disallow calling during send/receive?
   * Should be implied, but could point out explicitly,
   * since it could break things in weird ways.
   * Can likewise guarantee to Collabs. Also, don't consult
   * nextMessageMeta() during loading/saving?
   * (More generally: decouple these things.)
   * @return [description]
   */
  save(): Uint8Array;
  load(saveData: Uint8Array | null): void;
}

export function isRuntime(x: any): x is Runtime {
  if (typeof x === "object") {
    if ((x as Runtime).isRuntime === true) {
      return true;
    }
  }
  return false;
}
