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

  getChild(name: string): Crdt {
    throw new Error(
      "Unknown child: " + name + ", children: [] (PrimitiveCrdt)"
    );
  }

  save(): [saveData: Uint8Array, children: Map<string, Crdt>] {
    return [this.savePrimitive(), new Map()];
  }

  /**
   * Return a serialization of this Crdt's
   * own internal state that is not set in the
   * constructor, sufficient to reconstruct the
   * state after initializing this Crdt with the same
   * constructor arguments and then calling
   * this.loadPrimitive(<return value>).
   */
  protected abstract savePrimitive(): Uint8Array;

  load(saveData: Uint8Array): void {
    this.loadPrimitive(saveData);
  }

  /**
   *Reconstruct the saved state recorded in saveData,
   * which is an output of savePrimitive().
   * This includes setting all state not set in
   * the constructor.
   *
   * During loading, you must not reference the state
   * of any Crdt, although you may call
   * Runtime.getCrdtByReference (e.g., by deserializing
   * Crdt references).  This is because other Crdts may
   * not have been loaded before this one (however,
   * they are at least initialized (constructed) if
   * demanded by Runtime.getCrdtByReference).
   * If you depend on other Crdt's state to set your own
   * state, you must store it in your own saveData.
   *
   * TODO: note why circular dependencies are impossible.
   */
  protected abstract loadPrimitive(saveData: Uint8Array): void;

  // You can also choose to override postLoad().
}
