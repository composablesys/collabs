import { Collab } from "./collab";
import { isRuntime } from "./iruntime";
import { Parent } from "./parent";

/**
 * A replica-independent ID for a [[Collab]].
 *
 * A CollabID refers to a Collab in a way that makes sense across
 * replicas: you can send a CollabID from replica A to replica B,
 * and replica B can use it to find (their replica of) the original
 * Collab. This lets you link to a place in a collection or even
 * in a whole document, similar to a [[Position]].
 *
 * To convert between the Collabs in a collection (e.g., a [[CSet]])
 * and their CollabIDs, use the collection's [[IParent.idOf]]
 * and [[IParent.fromID]] methods. More generally,
 * you can use any ancestor of the Collabs or the
 * top-level [[IRuntime]]/[[AbstractDoc]].
 *
 * CollabIDs are JSON objects and can be serialized with [[DefaultSerializer]].
 * You can also use [CollabIDSerializer](../core/classes/CollabIDSerializer.html)
 * (in package @collabs/core).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type CollabID<C extends Collab> = {
  /**
   * An internal description of where the Collab is
   * located relative to the ancestor that created this CollabID.
   *
   * Typically, it is the path from the Collab to the ancestor
   * in the tree of Collabs.
   */
  readonly collabIDPath: string[];
};

/**
 * Utility function to help custom parents implement [[IParent.idOf]].
 * Other callers should instead call `ancestor.idOf(descendant)`.
 */
export function collabIDOf<C extends Collab>(
  descendant: C,
  ancestor: Parent
): CollabID<C> {
  let current: Collab = descendant;
  const collabIDPath = [];
  while (current !== ancestor) {
    collabIDPath.push(current.name);
    if (isRuntime(current.parent)) {
      throw new Error("collabIDOf called on non-descendant");
    }
    current = current.parent;
  }
  return { collabIDPath };
}
