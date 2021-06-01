import { MvrMessage } from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util/serialization";
import { CrdtEvent, CrdtEventsRecord } from "../core/crdt";
import { PrimitiveCrdt } from "../core/primitive_crdt";

interface MvrEntry<T> {
  readonly value: T;
  readonly sender: string;
  readonly senderCounter: number;
}

// TODO: also dispatch for reset event?
// TODO: names
// TODO: also include meta in valuesRemoved?
// TODO: only include a value in valuesRemoved if
// *all* instances were removed
// TODO: equality semantics for set of values?
export interface MvrEvent<T> extends CrdtEvent {
  readonly caller: MultiValueRegister<T>;
  readonly valueAdded: T;
  readonly valuesRemoved: Set<T>;
}

export interface MvrEventsRecord<T> extends CrdtEventsRecord {
  Mvr: MvrEvent<T>;
  Reset: CrdtEvent;
}

export class MultiValueRegister<T> extends PrimitiveCrdt<
  MvrEntry<T>[],
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

  /**
   * Return the current set of values, i.e., the
   * set of non-overwritten values.  This may have
   * more than one element due to concurrent writes,
   * or it may have zero elements because the register is
   * newly initialized or has been reset.
   *
   * TODO: deterministic iterator order.  Same for meta.
   */
  conflicts(): Set<T> {
    return new Set(this.state.map((entry) => entry.value));
  }

  conflictsWithMeta(): Set<{ value: T; sender: string }> {
    return new Set(
      this.state.map((entry) => {
        return {
          value: entry.value,
          sender: entry.sender,
        };
      })
    );
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

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): boolean {
    let decoded = MvrMessage.decode(message);
    let removed = new Set<T>();
    let vc = timestamp.asVectorClock();
    for (let entry of this.state) {
      let vcEntry = vc.get(entry.sender);
      if (vcEntry !== undefined && vcEntry >= entry.counter) {
        this.state.delete(entry);
        removed.add(entry.value);
      }
    }
    switch (decoded.data) {
      case "value":
        // Add the new entry
        let value = this.valueSerializer.deserialize(
          decoded.value,
          this.runtime
        );
        this.state.add(
          new MvrEntry(
            value,
            timestamp.getSender(),
            timestamp.getSenderCounter()
          )
        );
        if (removed.size === 1 && removed.entries().next().value === value) {
          return false; // no change to actual value
        } else {
          this.emit("Mvr", {
            caller: this,
            timestamp,
            valueAdded: value,
            valuesRemoved: removed,
          });
          return true;
        }
      case "reset":
        this.emit("Reset", { caller: this, timestamp });
        return removed.size === 0;
      // TODO: also do normal Mvr event?  Would need to make valueAdded
      // optional.
      default:
        throw new Error(
          "MultiValueRegister: Bad decoded.data: " + decoded.data
        );
    }
  }

  canGc() {
    return this.state.size === 0;
  }
}
