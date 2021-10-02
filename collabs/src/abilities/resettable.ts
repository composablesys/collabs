import { Crdt } from "../core";

/**
 * A [[Crdt]] with an observed-reset operation.
 *
 * Some collections of Crdts, like [[ImplicitMergingMutCMap]]
 * and the `Resetting` collections,
 * call `reset` when deleting a value.  They thus require
 * their values to implement this interface.
 */
export interface Resettable extends Crdt {
  /**
   * Perform an observed-reset operation on this Crdt.
   *
   * The semantics **must** be precisely an *observed-reset*:
   * after receiving any number of reset operations (possibly
   * concurrent), the Crdt's state must be as if the
   * Crdt had received precisely the messages not
   * causally prior to any reset operation.
   *
   * Additionally, if all of a Crdt's operations have been
   * reset in this way (for each non-reset operation, there
   * is a causally greater reset operation),
   * then [[Crdt.canGc]] **must** return true.
   */
  reset(): void;
}
