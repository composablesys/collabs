/**
 * Metadata attached to a received message in
 * [[Collab.receive]].
 *
 * By default, the metadata is [[sender]], [[isLocalUser]], and [[isEcho]].
 * However, ancestor Collabs may add extra metadata using [[set]] before
 * delivering messages to their children, allowing all descendants to
 * access that metadata using [[get]]. Some Collabs expect specific such
 * extra metadata, in which case they must be instantiated as descendants
 * of a Collab that supplies it.
 *
 * MessageMeta instances are immutable; [[set]] returns a new value.
 */
export class MessageMeta {
  /**
   * [constructor description]
   * @param sender The message sender's [[Runtime.replicaID]].
   * @param isLocalUser Whether the message was sent by the local user.
   * Equivalent to this.sender === (ambient Runtime).replicaID.
   * @param isEcho Whether the message is an internal echo, i.e., it was
   * sent within the current replica and delivered to a [[Collab]] internally.
   * This field is mostly for internal use by Collabs; for determining
   * if the message is from the local user, use [[isLocalUser]] instead,
   * which may differ in case some Collab generates a local echo while
   * processing a remote message (e.g., [[RunLocallyLayer]] does so).
   * @param extra
   */
  private constructor(
    readonly sender: string,
    readonly isLocalUser: boolean,
    readonly isEcho: boolean,
    private readonly extra: Map<symbol, unknown>
  ) {}

  /**
   * Get extra metadata with the given key, or `undefined` if the
   * key has not been set.
   *
   * If you require metadata with the given key but it is not present,
   * you should throw an error with a description of what ancestor
   * Collab is needed to set that metadata.
   */
  get(key: symbol): unknown {
    return this.extra.get(key);
  }

  // TODO: rename to suggest that it's not mutating (persistent style)
  /**
   * Set extra metadata with the given key, returning a new [[MessageMeta]]
   * while leaving this unchanged.
   *
   * Receipients can get the value by calling [[get]] with the same key
   * on the returned MessageMeta.
   *
   * @param  key A Symbol created to identify the extra metadata.
   * @param  value The set value.
   * @return A new MessageMeta with the same properties as this plus the
   * extra set value.
   */
  set(key: symbol, value: unknown): MessageMeta {
    // OPT: persistent map implementation instead of copy
    const newExtra = new Map(this.extra);
    newExtra.set(key, value);
    return new MessageMeta(
      this.sender,
      this.isLocalUser,
      this.isEcho,
      newExtra
    );
  }

  /**
   * Set [[isEcho]]]], returning a new [[MessageMeta]]
   * while leaving this unchanged.
   */
  setIsEcho(isEcho: boolean): MessageMeta {
    return new MessageMeta(
      this.sender,
      this.isLocalUser,
      isEcho,
      new Map(this.extra)
    );
  }

  /**
   * Returns a new [[MessageMeta]] with the given metadata and no
   * extra metadata keys.
   */
  static new(
    sender: string,
    isLocalUser: boolean,
    isEcho: boolean
  ): MessageMeta {
    return new MessageMeta(sender, isLocalUser, isEcho, new Map());
  }

  /**
   * [[Collab.getContext]] key that returns
   * the next [[MessageMeta]] for a locally sent message's echo, or
   * undefined if the next [[MessageMeta]] is just the default
   * `{ sender: (local replicaID), isLocalEcho: true }`.
   */
  static NEXT_MESSAGE_META = Symbol();
}
