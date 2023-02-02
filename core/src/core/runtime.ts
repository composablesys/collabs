import { Serializer } from "../util";
import { Collab } from "./collab";
import { ICollabParent } from "./collab_parent";
import { MessageMeta } from "./message";

/**
 * A runtime for a Collabs app, responsible for connecting
 * replicas of [[Collab]]s and providing other whole-app
 * functionality.
 *
 * [[Runtime]] is a general interface; specific network models are
 * expected to provide their own implementations, such as
 * [[CRDTRuntime]] for CRDTs.
 *
 * A runtime creates and manages the tree of Collabs
 * for an app, and it provides utilities for those Collabs
 * via [[Collab.runtime]] (e.g., [[replicaID]]).
 * A runtime also delivers messages between different
 * replicas. The exact network guarantees differ by
 * implementation; for example, CRDTRuntime guarantees
 * exactly-once causal broadcast with immediate local echo).
 *
 * Apps should not create or use a runtime directly. Instead, they
 * should use wrappers like [[CRDTApp]] or [[CRDTContainer]],
 * which hide the Collab-internal utilities.
 */
export interface Runtime extends ICollabParent {
  /**
   * Type guard, used by [[isRuntime]].
   */
  readonly isRuntime: true;

  // Utilities for internal use by Collabs, serializers, etc.

  /**
   * An ID that uniquely identifies this replica among
   * all connected replicas.
   *
   * Must not be `""`.
   *
   * See [[randomReplicaID]], [[pseudoRandomReplicaID]].
   */
  readonly replicaID: string;

  // TODO: explicitly require unknown serializer only? To allow
  // more optimized compression for message logs, like in default
  // state-based impl. That also requires actually optimizing the
  // serializer.
  /**
   * Serializer for [[MessageMeta]].
   *
   * A [[Runtime]] implementation should customize this to handle
   * its [[MessageMeta.runtimeSpecific]] type.
   */
  readonly metaSerializer: Serializer<MessageMeta>;

  /**
   * Returns a nonnegative counter value that will only be
   * associated with this Runtime's [[replicaID]]
   * once.
   *
   * @param count = 1 When set, treat this as `count` calls,
   * each claiming one number in sequence. Thus all numbers
   * in the range [returned number, returned number + count)
   * will only be associated with this runtime's [[replicaID]]
   * once.
   * @return local counter
   */
  getLocalCounter(count?: number): number;

  /**
   * @return A UID, i.e., a unique string that will only appear once
   * across all replicas.
   */
  getUID(): string;

  /**
   * Returns the series of names on descendant's path to this Runtime
   * in the tree of [[Collab]]s.
   *
   * [[getDescendant]] does the reverse procedure. They are used to
   * implement [[CollabID]]s.
   *
   * The path may be truncated if this Runtime guarantees
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
   * Returns the descendant of this Runtime at the
   * given name path, or `undefined`
   * if it no longer exists.
   *
   * See also: [[CollabID.getNamePath]].
   *
   * @param  namePath A name path referencing a descendant
   * of this `Runtime`, as returned by [[getNamePath]].
   * It is iterated, consuming the iterator.
   * @return The descendant at the given name path, or `undefined`
   * if it no longer exists.
   * @throws If no descendant with the given `namePath` could possibly
   * exist.
   */
  getDescendant(namePath: Iterable<string>): Collab | undefined;
}

export function isRuntime(x: unknown): x is Runtime {
  if (typeof x === "object") {
    if ((x as Runtime).isRuntime === true) {
      return true;
    }
  }
  return false;
}
