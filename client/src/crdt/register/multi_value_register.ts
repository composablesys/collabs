import { MvrMessage } from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util/serialization";
import { ResettableEventsRecord } from "../composers/resettable";
import { CrdtEvent } from "../core/crdt";
import { PrimitiveCrdt } from "../core/primitive_crdt";

export interface MvrMeta<T> {
  readonly value: T;
  readonly sender: string;
  readonly senderCounter: number;
  readonly time: number;
}

export interface MvrSetEvent<T> extends CrdtEvent {
  readonly caller: MultiValueRegister<T>;
  readonly value: T;
}

export interface MvrEventsRecord<T> extends ResettableEventsRecord {
  Set: MvrSetEvent<T>;
}

// TODO: equality semantics for set of values?
export class MultiValueRegister<T> extends PrimitiveCrdt<
  MvrMeta<T>[],
  MvrEventsRecord<T>
> {
  /**
   * Multi-value register of type T.
   *
   * The default serializer behaves as follows.  string, number,
   * undefined, and null types are stored
   * by-value, as in ordinary JS Set's, so that different
   * instances of the same value are identified
   * (even if they are added by different
   * replicas).  Crdt types are stored
   * by-reference, as they would be in ordinary JS set's,
   * with replicas of the same Crdt being identified
   * (even if they are added by different replicas).
   * Other types are serialized using BSON (via
   * https://github.com/mongodb/js-bson).  Note this means
   * that they will effectively be sent by-value to other
   * replicas, but on each replica, they are treated by reference,
   * following JS's usual set semantics.
   */
  constructor(
    private readonly valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super([]);
  }

  set(value: T) {
    let message = MvrMessage.create({
      value: this.valueSerializer.serialize(value),
    });
    let buffer = MvrMessage.encode(message).finish();
    super.send(buffer);
  }

  reset() {
    // Only reset if needed
    if (!this.canGc()) {
      let message = MvrMessage.create({
        reset: true,
      }); // no value
      let buffer = MvrMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  /**
   * Return the current set of values, i.e., the
   * set of non-overwritten values.  This may have
   * more than one element due to concurrent writes,
   * or it may have zero elements because the register is
   * newly initialized or has been reset.
   *
   * The returned set's iterator is guaranteed to return
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.  In case a value is
   * duplicated, it is ordered by its lexicographically
   * first sender.
   */
  conflicts(): Set<T> {
    return new Set(this.state.map((entry) => entry.value));
  }

  /**
   * Return the current set of values with metadata.
   *
   * Note that this set may be larger than conflicts(),
   * since conflicts() does not repeat identical values
   * while conflictsMeta() does (because they will
   * have distinct metadata).
   *
   * The returned set's iterator is guaranteed to return
   * values in the same order on all replicas, namely,
   * in order sorted by sender.
   */
  conflictsMeta(): Set<MvrMeta<T>> {
    return new Set(this.state);
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    let decoded = MvrMessage.decode(message);
    let vc = timestamp.asVectorClock();
    let newState = new Array<MvrMeta<T>>();
    for (let entry of this.state) {
      let vcEntry = vc.get(entry.sender);
      if (vcEntry === undefined || vcEntry < entry.senderCounter) {
        newState.push(entry);
      }
    }
    switch (decoded.data) {
      case "value":
        // Add the new entry
        const value = this.valueSerializer.deserialize(
          decoded.value,
          this.runtime
        );
        const valueMeta = {
          value,
          sender: timestamp.getSender(),
          senderCounter: timestamp.getSenderCounter(),
          time: timestamp.getTime(),
        };
        newState.push(valueMeta);
        this.setNewState(newState);
        this.emit("Set", {
          caller: this,
          timestamp,
          value,
        });
      case "reset":
        this.setNewState(newState);
        this.emit("Reset", { caller: this, timestamp });
      default:
        throw new Error(
          "MultiValueRegister: Bad decoded.data: " + decoded.data
        );
    }
  }

  private setNewState(newState: MvrMeta<T>[]): void {
    // Sort by sender, to make the order deterministic.
    // Note senders are always all distinct.
    newState.sort((a, b) => (a.sender < b.sender ? -1 : 1));
    // Replace this.state with newState
    // TODO: nest the array in another object, so that
    // we can directly replace the arrays instead?
    // May be more efficient.
    this.state.splice(0, this.state.length, ...newState);
  }

  canGc() {
    return this.state.length === 0;
  }
}
