/**
 * Metadata for a message passed to [[Collab.receive]].
 */
export interface MessageMeta {
  // For fields shared with SavedStateMeta, we use the same typedoc
  // on both, so that they show up nicely in IDE tooltips when you have
  // an Update event of type MessageEvent | SavedStateEvent.

  /**
   * The update's type.
   */
  readonly updateType: "message";
  /**
   * The replicaID that sent the message.
   */
  readonly senderID: string;
  /**
   * Whether the update is for local operations, i.e., it results
   * from calling Collab methods on this replica.
   */
  readonly isLocalOp: boolean;
  /**
   * Optionally, the runtime may include extra metadata
   * in this field.
   *
   * This field is intended for use by [[Collab]] implementations,
   * not event listeners.
   *
   * For example, [[CRuntime]] puts [[CRDTMessageMeta]] here.
   * To access that more easily, consider extending [[PrimitiveCRDT]].
   */
  readonly runtimeExtra: unknown;
}

/**
 * Metadata for a saved state passed to [[Collab.load]].
 */
export interface SavedStateMeta {
  /**
   * The update's type.
   */
  readonly updateType: "savedState";
  /**
   * Whether the update is for local operations, i.e., it results
   * from calling Collab methods on this replica.
   */
  readonly isLocalOp: false;
  /**
   * Optionally, the runtime may include extra metadata
   * in this field.
   *
   * This field is intended for use by [[Collab]] implementations,
   * not event listeners.
   *
   * For example, [[CRuntime]] puts [[CRDTSavedStateMeta]] here.
   * To access that more easily, consider extending [[PrimitiveCRDT]].
   */
  readonly runtimeExtra: unknown;
}

/**
 * Metadata for an update (message or saved state).
 */
export type UpdateMeta = MessageMeta | SavedStateMeta;

/**
 * A [[IRuntime]] may extend this interface to allow [[Collab]]s to configure
 * the content of a message's [[MessageMeta.runtimeExtra]].
 *
 * Specifically, a Collab makes a request in [[Collab.send]]; this affects
 * the MessageMeta passed to [[Collab.receive]] together with the sent message.
 *
 * For example, [[CRuntime]] accepts requests of type [[CRDTMetaRequest]].
 * To make those requests more easily, consider extending [[PrimitiveCRDT]].
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MetaRequest {}

/**
 * Optimized representation of saved state used by [[Collab.save]] and
 * [[Collab.load]].
 *
 * A Collab with children may store the children's save data in [[children]];
 * this is usually more convenient than serializing everything
 * into a single Uint8Array.
 *
 * The return value of Collab.save is normalized before being passed to
 * Collab.load:
 * - If [[self]] was undefined, it is replaced by an empty Uint8Array.
 * - If [[children]] was undefined, it is replaced by an empty Map.
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
  children?: Map<string, SavedStateTree>;
}
