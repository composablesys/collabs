import { Collab } from "./collab";
import { isRuntime } from "./iruntime";
import { Parent } from "./parent";

/**
 * A replica-independent ID for a [[Collab]].
 *
 * A CollabID refers to a Collab in a way that makes sense across
 * replicas: you can send a CollabID from replica A to replica B,
 * and replica B can use it to find (their replica of) the original
 * Collab from replica A.
 *
 * To convert between Collabs and CollabIDs, use [[IParent.idOf]]
 * and [[IParent.fromID]]. Specifically, these let you work with
 * CollabIDs for Collabs (strictly) descended from the [[Parent]]. Note that
 * CollabIDs derived from different parents are incomparable, and it
 * does not make sense to call [[IParent.fromID]] on a CollabID
 * returned by a different parent's [[IParent.idOf]].
 *
 * CollabIDs can be serialized with [[DefaultSerializer]], as JSON objects,
 * or with [[CollabIDSerializer]]. (TODO)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface CollabID<C extends Collab> {
  /**
   * The sequence of names on a path in the tree of Collabs.
   * Typically, the path goes from the targeted
   * Collab to the [[Parent]] used as its ancestor.
   */
  readonly namePath: string[];
}

/**
 * Utility function for implementing [[IParent.idOf]].
 * Other callers should instead call `ancestor.idOf(descendant)`.
 */
export function collabIDOf<C extends Collab>(
  descendant: C,
  ancestor: Parent
): CollabID<C> {
  let current: Collab = descendant;
  const namePath = [];
  while (current !== ancestor) {
    namePath.push(current.name);
    if (isRuntime(current.parent)) {
      throw new Error("getNamePath called on non-descendant");
    }
    current = current.parent;
  }
  return { namePath };
}
