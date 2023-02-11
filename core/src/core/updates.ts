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
  /** Saved state for the current Collab. */
  self?: Uint8Array;
  /**
   * Saved states for child Collabs, keyed by name.
   *
   * Note: if [[Collab.save]] returns an empty map, [[Collab.load]]
   * will instead see `undefined`; both indicate "no saved states
   * for children".
   *
   * TODO: order guaranteed (or maybe if IRuntime does)?
   * Needed for CSet.
   */
  children?: Map<string, SavedStateTree>;
  /**
   * Saved states for child Collabs, in some established
   * order (e.g. described by [[self]]).
   *
   * Unlike in [[children]], null saves are allowed,
   * to avoid skipping list elements.
   */
  childList?: (SavedStateTree | null)[];
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
  runtimeExtra: unknown;
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
