import { CausalTimestamp } from "../../network/causal_broadcast_network";

export interface OutOfOrderAble {
  /**
   * TODO: like receive, not receiveInternal.
   * TODO: general out-of-order, not just causally prior.
   * TODO: it is possible some operations are not OoOAble; should
   * be clearly specified.  E.g. resets and strongResets added via
   * the mixins below.  Make a note about this on Map's foreach method:
   * reset, strongReset can't be for-each'd directly, although we can
   * easily add resetAll() and strongResetAll() ops that have the same effect.
   *
   * Like receiveInternal, but timestamp is causally prior
   * to this Crdt's initialization, i.e., to all operations
   * that have been delivered so far.  This is necessary to support
   * edge cases involving map() operations on container types
   * containing this Crdt.  If this method is implemented, it
   * MUST give the same result as if message had been delivered to
   * receiveInternal before all other calls to receiveInternal
   * (and resetInternal and strongResetInternal),
   * while preserving the effects of these other calls.  If
   * it is not implemented,
   * it MUST throw an error, to prevent mapping operations being
   * called on this Crdt; else the edge cases may lead to
   * violations of eventual consistency.
   * @param timestamp [description]
   * @param message   [description]
   */
  receiveOutOfOrder(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void;
}
