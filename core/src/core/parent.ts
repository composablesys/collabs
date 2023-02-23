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
   * Internal ([[Collab.send]]) use only.
   *
   * Sends the given message on behalf of child.
   * In general, this parent is then responsible for delivering the given
   * message to [[Collab.receive]] on each replica of child, with
   * guarantees set by the [[runtime]].
   *
   * @param  child        The caller.
   * @param  messageStack As in [[Collab.send]].
   * @param  metaRequests As in [[Collab.send]].
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
   * parent (but not other parents) to obtain that replica's copy of
   * `descendant`.
   *
   * @param descendant A strict (non-`this`) descendant of this parent.
   */
  idOf<C extends Collab>(descendant: C): CollabID<C>;

  /**
   * Inverse of [[idOf]].
   *
   * Specifically, given a [[CollabID]] returned by [[idOf]] on some replica of
   * this parent, returns this replica's copy of the original
   * `descendant`. If that descendant does not exist (e.g., it was deleted
   * or it is not present in this program version), returns undefined.
   *
   * @param id A CollabID from [[idOf]].
   * @param startIndex Internal (parent) use only.
   * If provided, treat `id.namePath` as if
   * it starts at startIndex instead of 0.
   */
  fromID<C extends Collab>(id: CollabID<C>, startIndex?: number): C | undefined;
}

/**
 * Something that can be a parent of a [[Collab]]: either
 * an [[IRuntime]] or a [[Collab]] that can have children.
 */
export type Parent = IParent & (Collab | IRuntime);
