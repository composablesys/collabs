/**
 * Metadata for an applied update.
 */
export interface UpdateMeta {
  /**
   * The update's type: a message sent by a [[Collab]] operation,
   * or a saved state that was loaded.
   */
  readonly updateType: "message" | "savedState";
  /**
   * The replicaID that sent the update.
   *
   * For saved state, this is the local replicaID.
   */
  readonly senderID: string;
  /**
   * Whether the update was caused by a local operation, i.e., calling
   * a [[Collab]] method on this replica.
   *
   * Equivalent to `(updateType === "message" && sender === (local runtime).replicaID)`.
   */
  readonly isLocalOp: boolean;
  /**
   * Optionally, a sender-provided info string about the update
   * (e.g., a "commit message").
   *
   * In [[CRuntime]], this info comes from the optional arg to [[CRuntime.transact]].
   */
  readonly info: string | undefined;
  /**
   * Optionally, an [[IRuntime]] implementation may include extra metadata
   * in this field. For example, [[CRuntime]] puts [[CRDTMessageMeta]] here.
   *
   * This field is intended for use by [[Collab]] implementations,
   * not event listeners.
   *
   * A Collab that requires specific metadata should cast this field
   * to the appropriate type. For CRDTMeta, you can instead
   * extend [[PrimitiveCRDT]]. Note that specific metadata will only
   * be present when using a corresponding IRuntime.
   */
  readonly runtimeExtra: unknown;
}

/**
 * A [[IRuntime]] may extend this interface to allow [[Collab]]s to configure
 * the content of [[UpdateMeta.runtimeExtra]].
 *
 * Specifically, a Collab makes a request in [[Collab.send]]; this affects
 * the UpdateMeta passed to [[Collab.receive]] together with the sent message.
 *
 * For example, [[CRuntime]] accepts requests of type [[CRDTMetaRequest]].
 * To make those requests more easily, you can instead extend [[PrimitiveCRDT]].
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MetaRequest {}

/**
 * Type of saved state as used by [[Collab.save]] and [[Collab.load]].
 *
 * A Collab with children may store their save data in [[children]];
 * this is usually more convenient than serializing everything
 * into a single Uint8Array. However, it is not mandatory to use [[children]]
 * or to use this type as described.
 *
 * The return value of Collab.load is normalized before being passed to
 * Collab.save:
 * - If Collab.load returned null, Collab.save is not called.
 * - If [[self]] was undefined, it is replaced by an empty Uint8Array.
 * - If [[children]] was undefined, is is replaced by an empty Map.
 */
export interface SavedStateTree {
  /**
   * Saved state for the current Collab.
   *
   * Normalization: undefined -> empty Uint8Array.
   */
  self?: Uint8Array;
  /**
   * Saved states for child Collabs, keyed by name.
   *
   * Iterator order is preserved.
   *
   * Normalization: undefined -> empty map.
   */
  children?: Map<string, SavedStateTree | null>;
}
