import { IParent } from "./parent";

/**
 * A runtime for a Collabs document, responsible for connecting
 * replicas of [[Collab]]s across devices and for other
 * whole-document functionality.
 *
 * [[IRuntime]] is a general interface; specific replication techniques are
 * expected to provide their own implementations, such as
 * [[CRuntime]] for CRDTs.
 *
 * A runtime creates and manages the tree of Collabs
 * for a document, and it provides utilities for those Collabs
 * (e.g., [[replicaID]]). Each Collab can access its runtime
 * using [[Collab.runtime]].
 *
 * A runtime also delivers updates between replicas with runtime-specific
 * guarantees. For example, CRuntime guarantees that messages are
 * broadcast exactly-once in causal order with immediate delivery
 * of local messages.
 */
export interface IRuntime extends IParent {
  /**
   * Type guard, used by [[isRuntime]].
   */
  readonly isRuntime: true;

  /**
   * An ID that uniquely identifies this replica among
   * all connected replicas.
   *
   * You often access this through [[Collab.runtime]], e.g.,
   * `this.runtime.replicaID` in a Collab subclass.
   */
  readonly replicaID: string;
}

export function isRuntime(x: unknown): x is IRuntime {
  if (typeof x === "object") {
    if ((x as IRuntime).isRuntime === true) {
      return true;
    }
  }
  return false;
}
