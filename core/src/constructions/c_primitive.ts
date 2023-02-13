import {
  Collab,
  CollabEventsRecord,
  MetaRequest,
  SavedStateTree,
  UpdateMeta,
} from "../core";

/**
 * Convenience superclass for a primitive [[Collab]] (Collab with no children, i.e., leaf in the Collab tree).
 *
 * This class provides simplified versions of send ([[sendPrimitive]]),
 * receive ([[receivePrimitive]]), save ([[savePrimitive]]), and load
 * ([[loadPrimitive]]). It also
 * implements [[Collab]] methods that are not relevant to primitive Collabs.
 */
export abstract class CPrimitive<
  Events extends CollabEventsRecord = CollabEventsRecord
> extends Collab<Events> {
  /**
   * Broadcast a message to other replicas of this Collab.
   *
   * Use this method instead of [[Collab.send]].
   *
   * @param message If a string, must be ASCII.
   * @param metaRequest
   */
  protected sendPrimitive(
    message: Uint8Array | string,
    metaRequest?: MetaRequest
  ) {
    this.send([message], metaRequest === undefined ? [] : [metaRequest]);
  }

  /**
   * Do not override this method; instead override
   * [[receivePrimitive]].
   *
   * If you need to override this method instead of
   * [[receivePrimitive]], consider extending [[Collab]]
   * directly instead of this class.
   *
   * @param  messageStack [description]
   * @return             [description]
   */
  receive(messageStack: (Uint8Array | string)[], meta: UpdateMeta): void {
    if (messageStack.length !== 1) {
      // We are not the target
      throw new Error("CPrimitive received message for child");
    }
    this.receivePrimitive(messageStack[0], meta);
  }

  /**
   * Receives messages sent by [[send]]
   * on local and replica replicas of this [[CPrimitive]].
   *
   * @param  meta  [description]
   * @param  message    [description]
   */
  protected abstract receivePrimitive(
    message: Uint8Array | string,
    meta: UpdateMeta
  ): void;

  save(): SavedStateTree | null {
    const self = this.savePrimitive();
    return self === null ? null : { self };
  }

  protected abstract savePrimitive(): Uint8Array | null;

  load(savedState: SavedStateTree): void {
    this.loadPrimitive(savedState.self!);
  }

  protected abstract loadPrimitive(savedState: Uint8Array): void;

  getDescendant(namePath: Iterator<string>): Collab | undefined {
    const next = namePath.next();
    if (!next.done) {
      throw new Error(
        `CPrimitive has no descendants, but namePath starts with "${next.value}"`
      );
    }
    return this;
  }
}
