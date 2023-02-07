import { Collab } from "./collab";
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
   * guarantee consistency (etc.). For example, [[DeletingMutCSet]] does not
   * deliver messages to deleted set elements.
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
 * a [[IRuntime]] or a [[Collab]] that can have children.
 */
export type Parent = IParent & (Collab | IRuntime);
