import { Collab } from "../core";

/**
 * A [[Collab]] with an observed-reset operation.
 *
 * Some collections of Collabs, like [[ImplicitMergingMutCMap]]
 * and the `Resetting` collections,
 * call `reset` when deleting a value.  They thus require
 * their values to implement this interface.
 */
export interface Resettable extends Collab {
  /**
   * Perform an observed-reset operation on this Collab.
   *
   * The semantics **must** be precisely an *observed-reset*:
   * after receiving any number of reset operations (possibly
   * concurrent), the Collab's state must be as if the
   * Collab had received precisely the messages not
   * causally prior to any reset operation.
   *
   * Additionally, if all of a Collab's operations have been
   * reset in this way (for each non-reset operation, there
   * is a causally greater reset operation),
   * then [[Collab.canGc]] **must** return true.
   */
  reset(): void;
}
