import { Collab } from "./collab";
import { Runtime } from "./runtime";
import { MetaRequest } from "./updates";

// TODO: rename to just "IParent", "Parent"?
/**
 * Interface implemented by something that can be a parent
 * of a [[Collab]].
 *
 * Only reference this interface directly if you
 * are a [[Collab]] implementing it in order to be a [[CollabParent]].
 * Otherwise, use the [[CollabParent]] type.
 */
export interface ICollabParent {
  /**
   * Sends the given message on behalf of `child`.
   *
   * In general, `messageStack` will be then be delivered
   * to [[Collab.receive]] on each replica of child. However,
   * thisparent may choose to modify the message before delivery,
   * including possibly delivering extra messages or none at all.
   *
   * `metaRequests` affect the [[UpdateMeta]] delivered with
   * with `messageStack`. Specifically, the [[Runtime]] will consider
   * the union of all requests and adjust [[UpdateMeta.runtimeExtra]]
   * in a Runtime-specific way.
   *
   * @param  child        [description]
   * @param  messageStack  [description]
   * @param  metaRequests [description]
   * @return              [description]
   */
  childSend(
    child: Collab,
    messageStack: Uint8Array[],
    metaRequests: MetaRequest[]
  ): void;
}

/**
 * Something that can be a parent of a [[Collab]]: either
 * a [[Runtime]] or a [[Collab]] that can have children.
 */
export type CollabParent = ICollabParent & (Collab | Runtime);
