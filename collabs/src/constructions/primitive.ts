import { Crdt, CrdtEventsRecord, MessageMeta } from "../core";

/**
 * TODO: description, correctness definition (from paper)
 *
 * TODO: type param docstrings
 */
export abstract class CPrimitive<
  Events extends CrdtEventsRecord = CrdtEventsRecord
> extends Crdt<Events> {
  protected sendPrimitive(message: Uint8Array | string) {
    this.send([message]);
  }

  protected receiveInternal(
    messagePath: (Uint8Array | string)[],
    meta: MessageMeta
  ): void {
    if (messagePath.length !== 1) {
      // We are not the target
      throw new Error("CPrimitive received message for child");
    }
    this.receivePrimitive(messagePath[0], meta);
  }

  /**
   * Receives messages sent by send
   * on replicas of this crdt (including those sent
   * locally).
   * @param  timestamp  [description]
   * @param  message    [description]
   */
  protected abstract receivePrimitive(
    message: Uint8Array | string,
    meta: MessageMeta
  ): void;

  getDescendant(namePath: string[]): Crdt {
    if (namePath.length !== 0) {
      throw new Error(
        "CPrimitive has no descendants, but namePath=" + namePath
      );
    }
    return this;
  }
}
