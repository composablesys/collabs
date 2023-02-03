// TODO: rename to Update? Since it's not just send/receive.
// Update CRDTRuntime, CRDTApp to match.
/**
 * Type for messages sent and received by [[Collab]]s.
 */
export type Message = Uint8Array | string;

// TODO: CRDTMessageMeta users: assert runtime in constructor? E.g. PrimitiveCRDT.
// TODO: separate out Message vs Event meta?
/**
 * Metadata for a received message, attached by the [[Runtime]].
 */
export interface MessageMeta {
  /**
   * The message's type: an operation sent with [[Collab.send]],
   * or a saved state returned by [[Collab.save]].
   *
   * This field is mostly useful for event listeners.
   * In a Collab implementation,
   * messages delivered to [[Collab.receive]] always have type "send",
   * and messages delivered to [[Collab.load]] always have type "save".
   */
  method: "send" | "save";
  /**
   * The replicaID that created the message.
   */
  creator: string;
  /**
   * Optionally, a [[Runtime]] implementation may include extra metadata
   * in this field.
   *
   * [[Collab]]s that require specific metadata should cast this
   * to the appropriate type. Note that such a Collab can only be used with
   * the corresponding Runtime implementation.
   *
   * For example, [[CRDTRuntime]] puts [[CRDTMeta]] here. To access that in a
   * CRDT implementation, consider extending [[PrimitiveCRDT]].
   */
  runtimeSpecific: unknown;
}

// TODO: rename to MessageMetaRequest?
/**
 * A [[Runtime]] may extend this interface to allow [[Collab]]s to configure
 * the content of [[MessageMeta.runtimeSpecific]].
 *
 * Specifically, a Collab makes a request in [[Collab.send]]; this affects
 * the MessageMeta passed to [[Collab.receive]] with the sent message.
 *
 * For example, [[CRDTRuntime]] accepts requests of type [[CRDTMetaRequest]].
 * A Collab can use them to request e.g. vector clock entries; that is
 * often more network-efficient than sending the entries in the Collab's own message.
 * To use CRDTMetaRequest in a CRDT implementation, consider extending [[PrimitiveCRDT]].
 */
export interface MetaRequest {
  /** Type guard. */
  readonly isMetaRequest: true;
}
