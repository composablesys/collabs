/**
 * Type of saved state as seen by [[Collab.save]] and [[Collab.load]].
 *
 * A Collab with children may use store their save data in [[children]];
 * this is usually more convenient than serializing the Collab's whole subtree
 * into a single Uint8Array. However, it is not mandatory to use [[children]]
 * or to use this type as described.
 *
 * An empty saved state `{}` is distinct from returning
 * `null` from [[Collab.save]]: in the latter case,
 * [[Collab.load]] will not even be called during loading,
 * while in the former case, it will be called with `{}`.
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
   * It's usually okay to omit null entries (since you won't
   * call child.load(null)), unless you need all names.
   *
   * Iterator order is preserved.
   *
   * Normalization: undefined -> empty map.
   */
  children?: Map<string, SavedStateTree | null>;
}

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
   *
   * <!-- For saved state, this is the replicaID on which save was called
   * - not the replicaID that performed the original operation
   * leading to this update. -->
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
   * Optionally, a [[IRuntime]] implementation may include extra metadata
   * in this field. For example, [[CRuntime]] puts [[CRDTMeta]] here.
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
