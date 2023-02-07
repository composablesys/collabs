import { Collab } from "./collab";
import { IParent } from "./parent";

/**
 * A runtime for a Collabs document, responsible for connecting
 * replicas of [[Collab]]s across devices and for other
 * whole-document functionality.
 *
 * [[IRuntime]] is a general interface; specific replication techniques are
 * expected to provide their own implementations, such as
 * [[CRDTRuntime]] for CRDTs.
 *
 * A runtime creates and manages the tree of Collabs
 * for a document, and it provides utilities for those Collabs
 * (e.g., [[replicaID]]). Each Collab can access its runtime
 * using [[Collab.runtime]].
 *
 * A runtime also delivers updates between replicas with runtime-specific
 * guarantees. For example, CRDTRuntime guarantees that messages are
 * broadcast exactly-once in causal order with immediate delivery
 * of local messages, and that saved states are delivered
 * in causal order but may be redundant with other updates.
 */
export interface IRuntime extends IParent {
  /**
   * Type guard, used by [[isRuntime]].
   */
  readonly isRuntime: true;

  // Utilities for internal use by Collabs, serializers, etc.

  /**
   * An ID that uniquely identifies this replica among
   * all connected replicas.
   *
   * Never `""`.
   *
   * See [[randomReplicaID]], [[pseudoRandomReplicaID]].
   */
  readonly replicaID: string;

  /**
   * Returns a nonnegative counter value that will only be
   * associated with this IRuntime's [[replicaID]]
   * once.
   *
   * @param count = 1 When set, treat this as `count` calls,
   * each claiming one number in sequence. Thus all numbers
   * in the range [returned number, returned number + count)
   * will only be associated with this runtime's [[replicaID]]
   * once.
   */
  nextLocalCounter(count?: number): number;

  /**
   * @return A UID, i.e., a unique string that will only appear once
   * across all replicas.
   */
  nextUID(): string;

  /**
   * Returns the series of names on descendant's path to this IRuntime
   * in the tree of [[Collab]]s.
   *
   * [[getDescendant]] does the reverse procedure. They are used to
   * implement [[CollabID]]s.
   *
   * The path may be truncated if this IRuntime guarantees
   * that all
   * public-facing Collab's will be descendants of a given
   * Collab (e.g., a distinguished root).
   *
   * See also: [[CollabID.getNamePath]]
   *
   * @param  descendant [description]
   * @return            [description]
   */
  getNamePath(descendant: Collab): string[];

  /**
   * Returns the descendant of this IRuntime at the
   * given name path, or `undefined`
   * if it no longer exists.
   *
   * See also: [[CollabID.getDescendant]].
   *
   * @param  namePath A name path referencing a descendant
   * of this `IRuntime`, as returned by [[getNamePath]].
   * It is iterated, consuming the iterator.
   * @return The descendant at the given name path, or `undefined`
   * if it no longer exists.
   * @throws If no descendant with the given `namePath` could possibly
   * exist.
   */
  getDescendant(namePath: string[]): Collab | undefined;
}

export function isRuntime(x: unknown): x is IRuntime {
  if (typeof x === "object") {
    if ((x as IRuntime).isRuntime === true) {
      return true;
    }
  }
  return false;
}
