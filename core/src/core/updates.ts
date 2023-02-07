/**
 * Type of saved state as seen by [[Collab.save]] and [[Collab.load]].
 *
 * A Collab with children may use the object form of this type;
 * this is usually more convenient than serializing the Collab's whole subtree
 * into a single Uint8Array. However, it is not mandatory to use the object
 * form or to use it as described.
 */
export type SavedStateTree =
  | Uint8Array
  | {
      /** Saved state for the current Collab. */
      self: Uint8Array;
      /** Saved states for child Collabs, keyed by name. */
      children: Map<string, SavedStateTree>;
    };

/**
 * Metadata for an applied update.
 */
export interface UpdateMeta {
  /**
   * The update's type: a message sent by a [[Collab]] operation,
   * or a saved state that was loaded.
   */
  updateType: "message" | "savedState";
  /**
   * The replicaID that sent the update.
   *
   * For saved state, this is the replicaID on which save was called
   * - not the replicaID that performed the original operation
   * leading to this update.
   */
  sender: string;
  /**
   * Whether the update was caused by a local operation, i.e., calling
   * a [[Collab]] method on this replica.
   *
   * Equivalent to `(updateType === "message" && sender === (local runtime).replicaID)`.
   */
  isLocalOp: boolean;
  /**
   * Optionally, a [[Runtime]] implementation may include extra metadata
   * in this field. For example, [[CRDTRuntime]] puts [[CRDTMeta]] here.
   *
   * This field is intended for use by [[Collab]] implementations,
   * not event listeners.
   *
   * A Collab that requires specific metadata should cast this field
   * to the appropriate type. For CRDTMeta, you can instead
   * extend [[PrimitiveCRDT]]. Note that specific metadata will only
   * be present when using a corresponding Runtime.
   */
  runtimeExtra: unknown;
}

/**
 * A [[Runtime]] may extend this interface to allow [[Collab]]s to configure
 * the content of [[UpdateMeta.runtimeExtra]].
 *
 * Specifically, a Collab makes a request in [[Collab.send]]; this affects
 * the UpdateMeta passed to [[Collab.receive]] together with the sent message.
 *
 * For example, [[CRDTRuntime]] accepts requests of type [[CRDTMetaRequest]].
 * To make those requests more easily, you can instead extend [[PrimitiveCRDT]].
 */
export interface MetaRequest {
  /** Type guard. */
  readonly isMetaRequest: true;
}
