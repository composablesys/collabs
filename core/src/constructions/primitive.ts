import { Collab, CollabEventsRecord, MessageMeta, Message } from "../core";

/**
 * Convenience superclass for a primitive [[Collab]] (Collab with no children, i.e., leaf in the Collab tree).
 *
 * This class provides simplified send and receive methods,
 * [[sendPrimitive]] and [[receivePrimitive]]), and
 * implements [[Collab]] methods that are not relevant to primitive Collabs.
 */
export abstract class CPrimitive<
  Events extends CollabEventsRecord = CollabEventsRecord
> extends Collab<Events> {
  protected sendPrimitive(message: Message) {
    this.send([message]);
  }

  /**
   * Do not override this method; instead override
   * [[sendPrimitive]].
   *
   * If you need to override this method instead of
   * [[sendPrimitive]], consider extending [[Collab]]
   * directly instead of this class.
   *
   * @param  messagePath [description]
   * @return             [description]
   */
  receive(messagePath: Message[], meta: MessageMeta): void {
    if (messagePath.length !== 1) {
      // We are not the target
      throw new Error("CPrimitive received message for child");
    }
    this.receivePrimitive(messagePath[0], meta);
  }

  /**
   * Receives messages sent by [[send]]
   * on local and replica replicas of this [[CPrimitive]].
   *
   * @param  meta  [description]
   * @param  message    [description]
   */
  protected abstract receivePrimitive(
    message: Message,
    meta: MessageMeta
  ): void;

  getDescendant(namePath: string[]): Collab | undefined {
    if (namePath.length !== 0) {
      throw new Error(
        `CPrimitive has no descendants, but namePath = ${namePath}`
      );
    }
    return this;
  }
}
