import {
  Collab,
  CollabEventsRecord,
  ICollabParent,
  InitToken,
  MessageMeta,
  Pre,
} from "../core";
import { Optional } from "../util";

/**
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
 */
export class RunLocallyLayer extends Collab implements ICollabParent {
  private child!: Collab;
  private runLocallyMeta: MessageMeta | null = null;

  setChild<C extends Collab>(preChild: Pre<C>): C {
    const child = preChild(new InitToken("", this));
    this.child = child;
    return child;
  }

  runLocally<T>(meta: MessageMeta, doPureOps: () => T): T {
    const oldRunLocallyMeta = this.runLocallyMeta;
    this.runLocallyMeta = meta;
    const ret = doPureOps();
    this.runLocallyMeta = oldRunLocallyMeta;
    return ret;
  }

  childSend(
    child: Collab<CollabEventsRecord>,
    messagePath: (string | Uint8Array)[]
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

  getAddedContext(key: symbol): unknown {
    if (key === MessageMeta.NEXT_MESSAGE_META) {
      if (this.runLocallyMeta !== null) {
        return this.runLocallyMeta;
      } else return undefined;
    }
    return undefined;
  }

  protected receiveInternal(
    messagePath: (string | Uint8Array)[],
    meta: MessageMeta
  ): void {
    this.child.receive(messagePath, meta);
  }

  save(): Uint8Array {
    return this.child.save();
  }

  load(saveData: Optional<Uint8Array>): void {
    this.child.load(saveData);
  }

  getDescendant(namePath: string[]): Collab<CollabEventsRecord> {
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
