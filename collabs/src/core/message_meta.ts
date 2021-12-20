/**
 * Metadata attached to a received message in
 * [[Collab.receive]].
 *
 * The distinction between [[MessageMeta]] and the message
 * itself is that [[MessageMeta]] contains info that is not
 * specific to one [[Collab]] and can be shared between them.
 * Examples include the message's sender (included by default)
 * and a vector clock (optionally added by TODO).
 * Using [[MessageMeta]] instead of including such info
 * directly in the messages allows for efficiency improvements:
 * - If multiple Collabs send messages that depend on the same
 * metadata, and those messages get batched together
 * by [[BatchingLayer]], the batch need only include
 * the metadata once, instead of once within each message.
 * - Collabs don't need to store any state needed for
 * construction metadata (e.g., a current vector clock).
 * This deduplicates state, and also allows Collabs to be
 * garbage collected even in they depend on nontrivial
 * global state.
 *
 * By default, [[MessageMeta]] only includes the metadata
 * specified here. However, a Collab may choose to add
 * extra metadata before delivering messages to its
 * descendants. To do so, it should set values in the
 * index signature, keyed by a Symbol unique to that type
 * of metadata (e.g., specified in the metadata's class
 * as a constant). It should also define the
 * [[MessageMeta.NEXT_MESSAGE_META]] key for
 * [[ICollabParent.getAddedContext]].
 * See TODO for an example.
 *
 * A Collab may depend on specific extra metadata being present.
 * In that case, one of its ancestors must add the
 * metadata to each MessageMeta before delivering it to
 * the descendant. If required extra metadata is
 * missing (`undefined`), the Collab should throw an error
 * describing how to supply it, e.g.,, what ancestor class is
 * needed.
 *
 * Except for adding values to the index signature, [[MessageMeta]] should
 * be treated as immutable.
 */
export interface MessageMeta {
  /**
   * The message sender's replicaId.
   */
  readonly sender: string;
  /**
   * Whether the message is an internal echo of a message
   * sent by the local user.
   *
   * For Collabs that process their own messages immediately
   * (CRDTs and other highly available data structures),
   * this is equivalent to `this.sender === (relevant Runtime).replicaId`.
   * For data structures that wait to process messages until
   * later (e.g., when signalled by a server), each message
   * may be delivered twice: once as a local echo
   * which should be ignored (`isLocalEcho === true`),
   * and once when it should actually be processed (`isLocalEcho === false`).
   */
  readonly isLocalEcho: boolean;

  /**
   * TODO: does this show up in docs?
   *
   * Record type for any extra metadata, indexed by a `symbol.`
   *
   * For more info, see the interface description.
   */
  [key: symbol]: any;
}

export const MessageMeta = {
  /**
   * [[Collab.getContext]] key with value type [[MessageMeta]] that returns
   * the next [[MessageMeta]] for a locally echoed message, or
   * undefined if the next [[MessageMeta]] is just the default
   * `{ sender: (local replicaId), isLocalEcho: true }`
   *
   * The next [[MessageMeta]] will be passed along with
   * the locally echoed message corresponding to the next
   * [[ICollabParent.childSend]]
   * call, assuming there are no intervening messages
   * that change the [[MessageMeta]]
   * (within the whole [[Runtime]]). This can be used by children
   * to get the [[MessageMeta]] for messages that they echo internally.
   *
   * If [[Collab.getContext]] returns undefined (no ancestor
   * supplied the [[MessageMeta]]).
   *
   * A Collab that adds extra metadata to [[MessageMeta]]
   * (via the index signature) generally should define
   * this key in [[ICollabParent.getAddedContext]],
   * so that descendants' [[Collab.getContext]] calls
   * return the correct [[MessageMeta]]. An exception is if
   * you know descendants will ignore locally echoed messages,
   * in which case it does not matter.
   *
   * TODO: === equality valid (for giving messages in the same
   * transaction/batch equal MessageMeta---good for transaction
   * semantics, and good for compressing batches). Although then
   * you get the mutable symbol fields messed up?
   */
  NEXT_MESSAGE_META: Symbol(),
} as const;
