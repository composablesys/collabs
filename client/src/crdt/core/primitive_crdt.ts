import { CausalTimestamp } from "../../net";
import { Crdt, CrdtEventsRecord } from "./crdt";
import { StatefulCrdt } from "./interfaces";

/**
 * TODO: description, correctness definition (from paper)
 *
 * TODO: type param docstrings
 */
export abstract class PrimitiveCrdt<
    S extends Object,
    Events extends CrdtEventsRecord = CrdtEventsRecord
  >
  extends Crdt<Events>
  implements StatefulCrdt<S>
{
  readonly state: S;

  constructor(state: S) {
    super();
    this.state = state;
  }

  protected send(message: Uint8Array) {
    this.runtime.send(this, message);
  }

  protected receiveInternal(
    targetPath: string[],
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    if (targetPath.length !== 0) {
      // We are not the target
      throw new Error("PrimitiveCrdt received message for child");
    }
    this.receivePrimitive(timestamp, message);
  }

  /**
   * Receives messages sent by send
   * on replicas of this crdt (including those sent
   * locally).
   * @param  timestamp  [description]
   * @param  message    [description]
   */
  protected abstract receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void;

  getDescendant(targetPath: string[]) {
    if (targetPath.length !== 0) {
      // We are not the target
      throw new Error(
        "Unknown child: " +
          targetPath[targetPath.length - 1] +
          " in: " +
          JSON.stringify(targetPath) +
          ", children: [] (PrimitiveCrdt)"
      );
    }
    return this;
  }
}
