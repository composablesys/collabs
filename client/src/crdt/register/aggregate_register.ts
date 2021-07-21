import {
  AggregateCRegisterMessage,
  AggregateCRegisterSave,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
  SingletonSerializer,
} from "../../util";
import { CrdtEvent, PrimitiveCrdt } from "../core";
import { ResettableEventsRecord } from "../helper_crdts";
import { CRegister } from "./interfaces";

// TODO: mention as other examples, e.g., a color averager.
// Demo that on whiteboard?

export class AggregateCRegisterMeta<T> {
  private cachedValue?: T;
  constructor(
    readonly argsSerialized: Uint8Array,
    readonly sender: string,
    readonly senderCounter: number,
    readonly time: number,
    private readonly parent: AggregateArgsCRegister<T, any>
  ) {}

  get value(): T {
    if (this.parent.preserveReferences) {
      if (this.cachedValue === undefined) {
        this.cachedValue = this.parent.valueConstructor(
          ...this.parent.argsSerializer.deserialize(
            this.argsSerialized,
            this.parent.runtime
          )
        );
      }
      return this.cachedValue;
    } else {
      return this.parent.valueConstructor(
        ...this.parent.argsSerializer.deserialize(
          this.argsSerialized,
          this.parent.runtime
        )
      );
    }
  }
}

export interface AggregateCRegisterReceiveEvent<T> extends CrdtEvent {
  value: T;
}

export interface AggregateCRegisterEventsRecord<T>
  extends ResettableEventsRecord {
  /**
   * Emitted whenever a value is received from another
   * replica, even if it does not become the actual
   * value.
   */
  Receive: AggregateCRegisterReceiveEvent<T>;
}

export abstract class AggregateArgsCRegister<T, SetArgs extends any[]>
  extends PrimitiveCrdt<
    AggregateCRegisterMeta<T>[],
    AggregateCRegisterEventsRecord<T>
  >
  implements CRegister<T, SetArgs>
{
  private cachedValue: T | undefined = undefined;
  private cacheValid: boolean = false;
  constructor(
    readonly valueConstructor: (...args: SetArgs) => T,
    readonly argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance(),
    readonly preserveReferences = false
  ) {
    super([]);
  }

  set(...args: SetArgs) {
    let message = AggregateCRegisterMessage.create({
      setArgs: this.argsSerializer.serialize(args),
    });
    let buffer = AggregateCRegisterMessage.encode(message).finish();
    super.send(buffer);
  }

  reset() {
    // Only reset if needed
    if (!this.canGc()) {
      let message = AggregateCRegisterMessage.create({
        reset: true,
      }); // no value
      let buffer = AggregateCRegisterMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    let decoded = AggregateCRegisterMessage.decode(message);
    let vc = timestamp.asVectorClock();
    let newState = new Array<AggregateCRegisterMeta<T>>();
    for (let entry of this.state) {
      let vcEntry = vc.get(entry.sender);
      if (vcEntry === undefined || vcEntry < entry.senderCounter) {
        newState.push(entry);
      }
    }
    switch (decoded.data) {
      case "setArgs":
        // Add the new entry
        const valueMeta = new AggregateCRegisterMeta(
          decoded.setArgs,
          timestamp.getSender(),
          timestamp.getSenderCounter(),
          timestamp.getTime(),
          this
        );
        newState.push(valueMeta);
        this.setNewState(newState);
        // TODO: way to avoid double deserialization (
        // if preserveReferences is false) / possible
        // too early or unneeded deserialization?
        // Also, if we're going to construct it right
        // away anyway, it is probably more efficient
        // to cache the value (treat preserveReferences
        // as true always).
        // One option would be to avoid emitting this if
        // you know there are no listeners
        this.emit("Receive", { value: valueMeta.value, timestamp });
        break;
      case "reset":
        this.setNewState(newState);
        this.emit("Reset", { timestamp });
        break;
      default:
        throw new Error(
          "AggregateCRegister: Bad decoded.data: " + decoded.data
        );
    }
    this.cacheValid = false;
    this.cachedValue = undefined;
  }

  private setNewState(newState: AggregateCRegisterMeta<T>[]): void {
    // Sort by sender, to make the order deterministic.
    // Note senders are always all distinct.
    newState.sort((a, b) => (a.sender < b.sender ? -1 : 1));
    // Replace this.state with newState
    // TODO: nest the array in another object, so that
    // we can directly replace the arrays instead?
    // May be more efficient.
    this.state.splice(0, this.state.length, ...newState);
  }

  get value(): T {
    if (!this.cacheValid) {
      this.cachedValue = this.aggregate(this.conflictsMeta());
      this.cacheValid = true;
    }
    return this.cachedValue!;
  }

  get optionalValue(): Optional<T> {
    if (this.state.length === 0) return Optional.empty();
    else return Optional.of(this.value);
  }

  /**
   * Return the current conflicting values, i.e., the
   * non-overwritten values.  This may have
   * more than one element due to concurrent writes,
   * or it may have zero elements because the register is
   * newly initialized or has been reset.
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  conflicts(): T[] {
    return this.state.map((entry) => entry.value);
  }

  /**
   * Return the current conflicting values with metadata.
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  conflictsMeta(): AggregateCRegisterMeta<T>[] {
    // Defensive copy
    return this.state.slice();
  }

  canGc(): boolean {
    return this.state.length === 0;
  }

  savePrimitive(): Uint8Array {
    const message = AggregateCRegisterSave.create({
      elements: this.state.map((entry) => {
        return {
          setArgs: entry.argsSerialized,
          sender: entry.sender,
          senderCounter: entry.senderCounter,
          time: entry.time,
        };
      }),
    });
    return AggregateCRegisterSave.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    const message = AggregateCRegisterSave.decode(saveData);
    for (let element of message.elements) {
      this.state.push(
        new AggregateCRegisterMeta(
          element.setArgs,
          element.sender,
          element.senderCounter,
          element.time,
          this
        )
      );
    }
  }

  /**
   * TODO.
   *
   * Note that conflictsMeta might be empty (initial/reset
   * state).  Order is eventually consistent, so it is okay
   * to depend on it.
   * @param  conflictsMeta [description]
   * @return               [description]
   */
  protected abstract aggregate(conflictsMeta: AggregateCRegisterMeta<T>[]): T;
}

export abstract class AggregateCRegister<T> extends AggregateArgsCRegister<
  T,
  [T]
> {
  // TODO: can we optimize the serializers (creating only
  // one per LwwMap, say) when they're not the default?
  constructor(
    readonly valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance(),
    readonly preserveReferences = false
  ) {
    super(
      (value) => value,
      SingletonSerializer.of(valueSerializer),
      preserveReferences
    );
  }

  set value(value: T) {
    this.set(value);
  }
}
