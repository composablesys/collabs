import {
  Collab,
  CollabEventsRecord,
  ICollabParent,
  InitToken,
  UpdateMeta,
} from "../../core/src/core";
import { Optional } from "../../core/src/util";

/**
 * **Experimental/flaky - use with caution**
 *
 * Layer that allows you to run operations on its descendants
 * locally only, not as a replicated operation, by calling
 * [[runLocally]].
 *
 * Typically, you will call [[runLocally]] in response to
 * a message broadcast to all replicas (e.g., using
 * [[CMessenger]]), so that all replicas run the same
 * operation. This is supposed to give the same result as
 * if the message's sender had run `doPureOps` normally.
 * However, ensuring this requires some care; see
 * [[runLocally]].
 *
 * Use cases:
 * - Optimizing bulk operations. For example, in a drawing tool,
 * suppose a user draws a 1,000x1,000 filled rectangle. The easy
 * way to implement this is by setting each of the 1,000,000
 * pixels to the intended color as a replicated operation.
 * However, this will result in 1,000,000 messages being sent.
 * You can instead use a [[CMessenger]] to send a short
 * description
 * of the operation (e.g., the rectangle's coordinates and
 * fill color), then each replica uses [[runLocally]] to do
 * the actual fill operation in response to that message.
 * - Together with [[SemidirectProductStore]]. [[SemidirectProductStore]]
 * concerns modifying sent operations based on concurrent
 * operations. To make this possible, it is easiest to send
 * a high-level description of each operation using
 * [[CMessenger]], modify it using [[SemidirectProductStore]],
 * then perform the modified operation using [[runLocally]].
 *
 * ## Experimental
 * This class is experimental. Using it may break certain
 * assumptions made by the library, due to its "magic"
 * nature. See [https://github.com/composablesys/collabs/issues](https://github.com/composablesys/collabs/issues).
 */
export class RunLocallyLayer extends Collab implements ICollabParent {
  private child!: Collab;
  private runLocallyMeta: UpdateMeta | null = null;

  setChild<C extends Collab>(childCallback: (init: InitToken) => C): C {
    const child = childCallback(new InitToken("", this));
    this.child = child;
    return child;
  }

  /**
   * Runs the pure operations doPureOps locally, as if they have the given
   * meta.
   *
   * Usually you will do this during processing on another message, in which
   * case you supply its meta. You can instead pass null to do the ops
   * with a new operation by the local user.
   */
  runLocally<T>(meta: UpdateMeta | null, doPureOps: () => T): T {
    const oldRunLocallyMeta = this.runLocallyMeta;
    let metaCopy: UpdateMeta;
    if (meta === null) {
      metaCopy = <UpdateMeta>this.getContext(UpdateMeta.NEXT_MESSAGE_META);
    } else {
      metaCopy = meta.setIsEcho(true);
    }
    this.runLocallyMeta = metaCopy;
    try {
      return doPureOps();
    } finally {
      this.runLocallyMeta = oldRunLocallyMeta;
    }
  }

  childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: Uint8Array[]
  ): void {
    if (child !== this.child) {
      throw new Error(`childSend called by non-child: ${child}`);
    }

    if (this.runLocallyMeta !== null) {
      // Local echo only.
      this.child.receive(messagePath, this.runLocallyMeta);
    } else {
      // Normal send.
      this.send(messagePath);
    }
  }

  receive(messagePath: (string | Uint8Array)[], meta: UpdateMeta): void {
    this.child.receive(messagePath, meta);
  }

  save(): Uint8Array {
    return this.child.save();
  }

  load(saveData: Optional<Uint8Array>): void {
    this.child.load(saveData);
  }

  getDescendant(namePath: string[]): Collab | undefined {
    if (namePath.length === 0) return this;
    if (namePath[namePath.length - 1] !== "") {
      throw new Error("Unrecognized child: " + namePath[namePath.length - 1]);
    }
    namePath.length--;
    return this.child.getDescendant(namePath);
  }

  canGC(): boolean {
    return this.child.canGC();
  }
}
