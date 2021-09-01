import {
  AggregateArgsCRegisterMessage,
  AggregateArgsCRegisterSave,
} from "../../../generated/proto_compiled";
import { PrimitiveCrdt } from "../../constructions";
import { CausalTimestamp, CrdtInitToken } from "../../core";
import {
  DefaultElementSerializer,
  ElementSerializer,
  SingletonSerializer,
} from "../../util";
import { CRegister, CRegisterEventsRecord } from "./interfaces";

export interface CRegisterEntryMeta<S> {
  readonly value: S;
  readonly sender: string;
  readonly senderCounter: number;
  readonly time: number;
}

class AggregateArgsCRegisterEntry<S> implements CRegisterEntryMeta<S> {
  constructor(
    readonly value: S,
    readonly sender: string,
    readonly senderCounter: number,
    readonly time: number,
    readonly argsSerialized: Uint8Array
  ) {}
}

/**
 * Mention a color averager as an advanced example,
 * link to demo.
 *
 * S is the type of conflicting values that get aggregated
 * to type T.  Usually S = T, but OptionalLwwCRegister
 * instead has T = Optional<S>, so that it can return
 * an empty Optional when there are no conflicting values.
 */
export abstract class AggregateArgsCRegister<
    T,
    SetArgs extends any[],
    S = T,
    Events extends CRegisterEventsRecord<T> = CRegisterEventsRecord<T>
  >
  extends PrimitiveCrdt<Events>
  implements CRegister<T, SetArgs>
{
  protected entries: AggregateArgsCRegisterEntry<S>[] = [];
  private cachedValue: T | undefined = undefined;
  private cacheValid: boolean = false;

  constructor(
    initToken: CrdtInitToken,
    readonly valueConstructor: (...args: SetArgs) => S,
    readonly argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super(initToken);
  }

  set(...args: SetArgs): T {
    let message = AggregateArgsCRegisterMessage.create({
      setArgs: this.argsSerializer.serialize(args),
    });
    let buffer = AggregateArgsCRegisterMessage.encode(message).finish();
    super.send(buffer);
    return this.value;
  }

  reset(): void {
    // Only reset if needed
    if (!this.canGc()) {
      let message = AggregateArgsCRegisterMessage.create({
        reset: true,
      }); // no value
      let buffer = AggregateArgsCRegisterMessage.encode(message).finish();
      super.send(buffer);
    }
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    // Get previousValue now
    const previousValue = this.value;

    let decoded = AggregateArgsCRegisterMessage.decode(message);
    let vc = timestamp.asVectorClock();
    let newState = new Array<AggregateArgsCRegisterEntry<S>>();
    for (let entry of this.entries) {
      let vcEntry = vc.get(entry.sender);
      if (vcEntry === undefined || vcEntry < entry.senderCounter) {
        newState.push(entry);
      }
    }
    switch (decoded.data) {
      case "setArgs":
        // Add the new entry
        const entry = new AggregateArgsCRegisterEntry(
          this.constructValue(decoded.setArgs),
          timestamp.getSender(),
          timestamp.getSenderCounter(),
          timestamp.getTime(),
          decoded.setArgs
        );
        newState.push(entry);
        break;
      case "reset":
        // Add nothing new to newState
        break;
      default:
        throw new Error(
          "AggregateCRegister: Bad decoded.data: " + decoded.data
        );
    }
    this.setNewState(newState);
    this.cacheValid = false;
    this.cachedValue = undefined;

    this.emit("Set", { timestamp, previousValue });
  }

  private constructValue(argsSerialized: Uint8Array): S {
    return this.valueConstructor(
      ...this.argsSerializer.deserialize(argsSerialized, this.parent.runtime)
    );
  }

  private setNewState(newState: AggregateArgsCRegisterEntry<S>[]): void {
    // Sort by sender, to make the order deterministic.
    // Note senders are always all distinct.
    newState.sort((a, b) => (a.sender < b.sender ? -1 : 1));
    // Replace this.state with newState
    this.entries = newState;
  }

  get value(): T {
    if (!this.cacheValid) {
      this.cachedValue = this.aggregate(this.conflictsMeta());
      this.cacheValid = true;
    }
    return this.cachedValue!;
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
  conflicts(): S[] {
    return this.entries.map((entry) => entry.value);
  }

  /**
   * Return the current conflicting values with metadata.
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  conflictsMeta(): CRegisterEntryMeta<S>[] {
    // Defensive copy
    return this.entries.slice();
  }

  canGc(): boolean {
    return this.entries.length === 0;
  }

  savePrimitive(): Uint8Array {
    const message = AggregateArgsCRegisterSave.create({
      entries: this.entries.map((entry) => {
        return {
          setArgs: entry.argsSerialized,
          sender: entry.sender,
          senderCounter: entry.senderCounter,
          time: entry.time,
        };
      }),
    });
    return AggregateArgsCRegisterSave.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    const message = AggregateArgsCRegisterSave.decode(saveData);
    for (let element of message.entries) {
      this.entries.push(
        new AggregateArgsCRegisterEntry(
          this.constructValue(element.setArgs),
          element.sender,
          element.senderCounter,
          element.time,
          element.setArgs
        )
      );
    }
  }

  /**
   * Aggregate the current conflicting (causally maximal)
   * values, with metadata, returning the actual value.
   *
   * Note that conflictsMeta might be empty (initial/reset
   * state).  Order is eventually consistent, so it is okay
   * to depend on the order.
   *
   * @param  conflictsMeta [description]
   * @return               [description]
   */
  protected abstract aggregate(conflictsMeta: CRegisterEntryMeta<S>[]): T;
}

/**
 * Version where set directly sets the (conflicting)
 * value (SetArgs = [T], S = T).
 */
export abstract class AggregateCRegister<
  T,
  Events extends CRegisterEventsRecord<T> = CRegisterEventsRecord<T>
> extends AggregateArgsCRegister<T, [T], T, Events> {
  constructor(
    initToken: CrdtInitToken,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(initToken, (value) => value, SingletonSerializer.of(valueSerializer));
  }

  set value(value: T) {
    this.set(value);
  }

  // Since we have a setter, we need to have a getter as
  // well, else it will default to returning undefined.
  get value(): T {
    return super.value;
  }
}
