import { Runtime } from "./runtime";

// We put this in a separate file from runtime.ts to prevent circular
// dependencies between runtime.ts and crdt.ts at runtime.

/**
 * The formal parent of the root Crdt.
 * Not for external use except as a type and for "instanceof"
 * checks.
 *
 * This is not part
 * of the tree of Crdts, but is necessary to keep the
 * API uniform (all Crdts need a parent, including the root Crdt).
 */
export class RootParent {
  /**
   * Used to prevent Crdts from being duck-typable as
   * a RootParent.
   */
  readonly isRootParent = true;

  constructor(readonly runtime: Runtime) {}
}
