export interface MessageMeta {
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
   * from calling [[Collab]] methods on this replica.
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

export interface SavedStateMeta {
  /**
   * The update's type.
   */
  readonly updateType: "savedState";
  /**
   * Whether the update is for local operations, i.e., it results
   * from calling [[Collab]] methods on this replica.
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
 * Type of saved state as used by [[Collab.save]] and [[Collab.load]].
 *
 * A Collab with children may store their save data in [[children]];
 * this is usually more convenient than serializing everything
 * into a single Uint8Array. However, it is not mandatory to use [[children]]
 * or to use this type as described.
 *
 * The return value of Collab.load is normalized before being passed to
 * Collab.save:
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
