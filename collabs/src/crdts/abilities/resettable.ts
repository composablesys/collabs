import { Collab } from "../../core";

/**
 * A CRDT with an observed-reset operation.
 *
 * Some collections of CRDTs, like [[ImplicitMergingMutCMap]]
 * and the `Resetting` collections,
 * call `reset` when deleting a value.  They thus require
 * their values to implement this interface.
 */
export interface Resettable extends Collab {
  /**
   * Perform an observed-reset operation on this CRDT.
   *
   * The semantics **must** be precisely an *observed-reset*:
   * after receiving any number of reset operations (possibly
   * concurrent), the CRDT's state must be as if the
   * CRDT had received precisely the messages not
   * causally prior to any reset operation.
   *
   * Additionally, if all of a CRDT's operations have been
   * reset in this way (for each non-reset operation, there
   * is a causally greater reset operation),
   * then [[Collab.canGC]] **must** return true.
   */
  reset(): void;
}
