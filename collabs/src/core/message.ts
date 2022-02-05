/**
 * A message that is not serialized for sending over
 * the network until needed.
 *
 * This is useful as an optimization for messages carrying whole-transaction
 * or whole-batch metadata that might change while the
 * transaction/batch is being assembled: instead of
 * serializing a separate message for each version, you can
 * wait until the last minute to serialize the final
 * version.
 *
 * For local echos on the replica sending the message,
 * this will be delivered as-is. However, for deliveries
 * that are not local echos (in particular, deliveries
 * to remote replicas), the output of [[serialize]] will
 * be delivered instead.
 */
export interface SerializableMessage {
  /**
   * Serializes this message for sending over the
   * network.
   *
   * This method must only be called once; after it
   * is called, only the serialized form may be used.
   * In particular, this should be called after all local
   * echos involving this message have completed, just before
   * sending it over the network.
   */
  serialize(): Uint8Array | string;
}

/**
 * Type for messages sent and received by [[Collab]]s.
 *
 * Messages will always be sent on the network in the
 * form `Uint8Array | string`. However, as a convenience,
 * messages being sent (and their local echos) may instead
 * have type [[SerializableMessage]].
 */
export type Message = Uint8Array | string | SerializableMessage;

/**
 * Convenience function that calls [[Serializable.serialize]]
 * if needed, otherwise returning `message` directly.
 *
 * This function must only be called once on
 * `message`, after which only the return value may
 * be used. This is because [[Serialize.serialize]]
 * must only be called once.
 */
export function serializeMessage(message: Message): Uint8Array | string {
  if (typeof message === "string" || message instanceof Uint8Array)
    return message;
  else return message.serialize();
}
