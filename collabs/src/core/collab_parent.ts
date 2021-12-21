import { Collab } from "./collab";
import { Runtime } from "./runtime";

/**
 * Interface implemented by something that can be a parent
 * of a [[Collab]].
 *
 * Consumers should use [[CollabParent]] instead of this interface.
 * You should only reference this interface directly if you
 * are a [[Collab]] implementing it in order to be a [[CollabParent]].
 */
export interface ICollabParent {
  /**
   * Sends the given message on behalf of `child`.
   *
   * In general, `messagePath` will be then be delivered
   * to [[Collab.receive]] on each replica of child. However,
   * this may choose to modify the message before delivery,
   * including possibly delivering extra messages or none at all.
   *
   * @param  child       [description]
   * @param  messagePath [description]
   * @return             [description]
   */
  childSend(child: Collab, messagePath: (Uint8Array | string)[]): void;

  /**
   * Returns context added by this particular [[CollabParent]]
   * for the given key, or undefined if not added.
   */
  getAddedContext(key: symbol): unknown;
}

/**
 * Something that can be a parent of a [[Collab]]: either
 * a [[Runtime]] or a [[Collab]] that can have children.
 */
export type CollabParent = ICollabParent & (Collab | Runtime);
