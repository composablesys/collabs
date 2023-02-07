/**
 * Type of saved state as seen by [[Collab.save]] and [[Collab.load]].
 *
 * A Collab with children may use store their save data in [[children]];
 * this is usually more convenient than serializing the Collab's whole subtree
 * into a single Uint8Array. However, it is not mandatory to use [[children]]
 * or to use this type as described.
 */
export interface SavedStateTree {
  // TODO: nullish case: both optional/undefined, instead of null vs undefined?
  /** Saved state for the current Collab, possibly `null`. */
  self: Uint8Array | null;
  /**
   * Saved states for child Collabs, keyed by name.
   *
   * Note: if [[Collab.save]] returns an empty map, [[Collab.load]]
   * will instead see `undefined`; both indicate "no saved states
   * for children".
   */
  children?: Map<string, SavedStateTree>;
}

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
   * Optionally, a [[IRuntime]] implementation may include extra metadata
   * in this field. For example, [[CRDTRuntime]] puts [[CRDTMeta]] here.
   *
   * This field is intended for use by [[Collab]] implementations,
   * not event listeners.
   *
   * A Collab that requires specific metadata should cast this field
   * to the appropriate type. For CRDTMeta, you can instead
   * extend [[PrimitiveCRDT]]. Note that specific metadata will only
   * be present when using a corresponding IRuntime.
   */
  runtimeExtra: unknown;
}

/**
 * A [[IRuntime]] may extend this interface to allow [[Collab]]s to configure
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
