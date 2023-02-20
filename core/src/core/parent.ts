import { Collab } from "./collab";
import { CollabID } from "./collab_id";
import { IRuntime } from "./iruntime";
import { MetaRequest } from "./updates";

/**
 * Interface implemented by something that can be a parent
 * of a [[Collab]].
 *
 * Only reference this interface directly if you
 * are a [[Collab]] implementing it in order to be a [[Parent]].
 * Otherwise, use the [[Parent]] type.
 *
 * See [[CObject]]'s implementation for "default" behavior.
 */
export interface IParent {
  /**
   * Called by `child` to send the given message.
   *
   * *In general*, this parent is then responsible for delivering the given
   * message to [[Collab.receive]] on each replica of child, with
   * guarantees set by the [[runtime]]. *However*, this may choose
   * to violate the delivery assumptions, so long as it can
   * guarantee consistency (etc.). For example, [[CSet]] does not
   * deliver messages to deleted set elements.
   *
   * @param  child        [description]
   * @param  messageStack  [description]
   * @param  metaRequests [description]
   * @return              [description]
   */
  childSend(
    child: Collab,
    messageStack: (Uint8Array | string)[],
    metaRequests: MetaRequest[]
  ): void;

  /**
   * Returns a [[CollabID]] for the given *strict* descendant of this
   * parent.
   *
   * The CollabID may be passed to [[fromID]] on any replica of this
   * parent, but not other parents, to obtain that replica's copy of
   * `descendant`.
   *
   * Typically, this method is implemented as [[collabIDOf]]`(descendant, this)`.
   *
   * @param descendant A strict (non-`this`) descendant of this parent.
   */
  idOf<C extends Collab>(descendant: C): CollabID<C>;

  /**
   * Given a [[CollabID]] returned by [[idOf]] on some replica of
   * this parent, returns this replica's copy of the original
   * `descendant`, or `undefined` if that descendant no longer exists.
   *
   * @param id A CollabID from [[idOf]].
   * @param startIndex Utility for implementing our own ancestors'
   * [[fromID]] methods; other callers should omit this field.
   *
   * When provided, this method will treat `id.namePath` as if
   * it starts at the given index instead of 0.
   * @returns The local replica of the Collab with the given id,
   * or `undefined` if it no longer exists.
   * @throws If the id is malformed, i.e., no descendant (including
   * deleted descendants) could possibly have that id.
   */
  fromID<C extends Collab>(id: CollabID<C>, startIndex?: number): C | undefined;
}

/**
 * Something that can be a parent of a [[Collab]]: either
 * a [[IRuntime]] or a [[Collab]] that can have children.
 */
export type Parent = IParent & (Collab | IRuntime);
