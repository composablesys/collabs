export interface VectorClock {
  /**
   * The maximum senderCounter received from replicaId,
   * or 0 if none have been received.
   * Equivalently, the number of messages received from
   * replicaId.
   * When replicaId is sender, this is senderCounter.
   */
  get(replicaId: string): number;
}

/**
 * TODO: should be immutable except for adding extra
 * metadata, which should be grow-only (add an extra
 * field with an immutable value).
 *
 * TODO: usually add values only through extra, but can
 * specialize for common cases (see OpBasedCrdt).
 *
 * TODO: somewhere: MessageMeta for receiver only, context
 * (plus Runtime "context-like" fields) for sender only.
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
   * (Crdts and other highly available data structures),
   * this is equivalent to `this.sender === (relevant Runtime).replicaId`.
   * For data structures that wait to process messages until
   * later (e.g., when signalled by a server), each message
   * may be delivered twice: once as a local echo (isLocalEcho === true)
   * which should be ignored,
   * and once when it should actually be processed (isLocalEcho === false).
   */
  readonly isLocalEcho: boolean;

  /**
   * Record type for any extra metadata, indexed by a `symbol.`
   *
   * Extra metadata may be added by Crdts before
   * delivering this `MessageMeta` to a descendant,
   * by indexing directly with a `symbol` (mutating this
   * `MessageMeta`). Each type of extra metadata should
   * define its own `symbol`, to avoid name conflicts.
   * See TODO for an example.
   *
   * Crdts may depend on specific extra metadata being present.
   * In that case, one of their ancestors must add the
   * metadata to each MessageMeta before delivering it to
   * the descendant. If a Crdt requires extra metadata but it
   * is missing (`undefined`), it should throw an error
   * describing how to supply it, i.e., what ancestor is
   * needed.
   *
   * TODO: if you add any, need to give addedContext for
   * [[MessageMeta.NEXT_SYMBOL]].
   */
  [key: symbol]: any;
}

export const MessageMeta = {
  /**
   * [[Crdt.getContext]] key with value type [[MessageMeta]] that returns
   * the next [[MessageMeta]] for a local message, or
   * undefined if the next [[MessageMeta]] is just the default
   * object `{ sender: (local replicaId), isLocal: true }`
   *
   * The next [[MessageMeta]] will be passed along with
   * the received message corresponding to the next
   * [[ICrdtParent.childSend]]
   * call, assuming there are no intervening messages
   * (within the whole [[Runtime]]). This can be used by children
   * to get the [[MessageMeta]] for messages that they echo internally.
   *
   * If [[Crdt.getContext]] returns undefined (no ancestor
   * supplied the [[MessageMeta]]).
   *
   * TODO: need to define this in addedContext whenever
   * you add a field (call it on your own context and add your field).
   * Clarify reqs around mutability (parents should just accept
   * that their nextMessageMeta might get extra symbol
   * fields and ignore them?).
   */
  NEXT_MESSAGE_META: Symbol(),
};
