import { Crdt } from "../crdt_core";
import { Constructor, Mixin } from "./mixin";

// TODO: do this on the receiving end instead?  Doesn't work
// if you have counter children though.  Same for strongReset.
export interface Resettable {
  /**
   * Perform an observed-reset operation on this Crdt.  Actually,
   * any behavior is acceptable (will not violate eventual
   * consistency) so long as this method commutes with
   * concurrent operations and has no effect if timestamp
   * is prior to the timestamps of all other received messages.
   * In particular, if you don't want to implement resets, it is okay to
   * make this method a no-op, so long as users are aware that
   * reset() will have no effect.
   */
  reset(): void;
}
