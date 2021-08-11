import { Crdt } from "../core";

export interface Resettable extends Crdt {
  /**
   * Perform an observed-reset operation on this Crdt.
   * The semantics MUST be precisely an observed-reset.
   * If all of a Crdt's operations have been reset by
   * such operations, it MUST have canGc() = true.
   */
  reset(): void;
}
