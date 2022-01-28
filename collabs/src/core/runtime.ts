import { Collab } from "./collab";
import { ICollabParent } from "./collab_parent";
import { EventEmitter } from "./event_emitter";

export interface LoadEvent {
  /**
   * Whether loading was skipped, i.e., load was called
   * with an empty [[Optional]].
   */
  skipped: boolean;
}

export interface RuntimeEventsRecord {
  /**
   * Emitted once all Collabs have been loaded
   * (i.e., [[Collab.load]] completed).
   *
   * You can listen on this event if you need to construct
   * views of [[Collab]] state after loading and before any
   * messages are received.
   */
  Load: LoadEvent;
}

/**
 * A runtime for a Collabs app, responsible for connecting
 * replicas of [[Collab]]s and providing other whole-app
 * functionality.
 *
 * [[Runtime]] is a general interface; specific use cases
 * (e.g., op-based CRDTs, OT, server serialized types) are
 * expected to provide their own implementations.
 * Collabs comes with one built-in implementation,
 * [[CRDTRuntime]], intended for use with op-based CRDTs
 * (see also [[CRDTApp]]). When implementing [[Runtime]],
 * consider extending [[AbstractRuntime]].
 *
 * In general, a runtime creates and manages the tree of [[Collab]]s
 * for an app. In particular, it may choose specific
 * [[Collab]]s for the top layers of the tree, to provide
 * specific guarantees to the user-added [[Collab]]s.
 * A runtime also delivers messages between different
 * replicas. The exact network guarantees differ by
 * implementation (e.g., [[CRDTRuntime]] guarantees
 * exactly-once causal broadcast with immediate local echo).
 *
 * [[Collab]] users generally need not interact with the
 * runtime, except indirectly through [[App]], which implements
 * its methods by calling the corresponding [[Runtime]] methods.
 *
 * [[Collab]]s themselves may use the
 * utility properties/methods [[replicaID]], [[getReplicaUniqueNumber]],
 * [[getUniqueString]], [[getNamePath]], and [[getDescendant]].
 */
export interface Runtime<
  Events extends RuntimeEventsRecord = RuntimeEventsRecord
> extends ICollabParent,
    EventEmitter<Events> {
  // Utilities for internal use by Collabs, serializers, etc.

  /**
   * Type guard, used by [[isRuntime]].
   */
  readonly isRuntime: true;
  readonly replicaID: string;

  /**
   * @param count = 1 When set, treat this as count calls,
   * each claiming one number in sequence. Thus all numbers
   * in the range [returned number, returned number + count)
   * will only be associated with this runtime's [[replicaID]]
   * once.
   * @return A unique nonnegative number that will only be
   * associated with this Runtime's [[replicaID]]
   * once.
   */
  getReplicaUniqueNumber(count?: number): number;

  /**
   * @return A UID, i.e., a unique string that will only appear once
   * across all replicas.
   */
  getUID(): string;

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
}

export function isRuntime(x: unknown): x is Runtime {
  if (typeof x === "object") {
    if ((x as Runtime).isRuntime === true) {
      return true;
    }
  }
  return false;
}
