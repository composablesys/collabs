import {
  AggregateArgsCRegisterMessage,
  AggregateArgsCRegisterSave,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
  SingletonSerializer,
} from "../../util";
import { PrimitiveCrdt } from "../core";
import {
  CRegister,
  CRegisterEventsRecord,
  CRegisterEvent,
  OptionalCRegisterEventsRecord,
  OptionalCRegister,
  OptionalCRegisterEvent,
} from "./interfaces";

export interface CRegisterEntryMeta<T> {
  readonly value: T;
  readonly sender: string;
  readonly senderCounter: number;
  readonly time: number;
}

class AggregateArgsCRegisterEntry<T> implements CRegisterEntryMeta<T> {
  constructor(
    readonly value: T,
    readonly sender: string,
    readonly senderCounter: number,
    readonly time: number,
    readonly argsSerialized: Uint8Array
  ) {}
}

/**
 * TODO: mention a color averager as an advanced example.
 * Demo on whiteboard?
 */
export abstract class AggregateArgsCRegister<
    T,
    SetArgs extends any[],
    Events extends CRegisterEventsRecord<T> = CRegisterEventsRecord<T>
  >
  extends PrimitiveCrdt<{ entries: AggregateArgsCRegisterEntry<T>[] }, Events>
  implements CRegister<T, SetArgs>
{
  private cachedValue: T | undefined = undefined;
  private cacheValid: boolean = false;

  constructor(
    readonly valueConstructor: (...args: SetArgs) => T,
    readonly argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance()
  ) {
    super({ entries: [] });
  }

  set(...args: SetArgs) {
    let message = AggregateArgsCRegisterMessage.create({
      setArgs: this.argsSerializer.serialize(args),
    });
    let buffer = AggregateArgsCRegisterMessage.encode(message).finish();
    super.send(buffer);
  }

  reset() {
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
    // Get the event now so it can access the current
    // value, soon to be the previousValue.
    const event = this.prepareEvent(timestamp);

    let decoded = AggregateArgsCRegisterMessage.decode(message);
    let vc = timestamp.asVectorClock();
    let newState = new Array<AggregateArgsCRegisterEntry<T>>();
    for (let entry of this.state.entries) {
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
    this.emit("Set", event);
    this.cacheValid = false;
    this.cachedValue = undefined;
  }

  /**
   * This is separated out from receivePrimitive so that
   * it can be overridden by classes that might throw
   * an error on get value(), to instead throw the
   * error only if a listener gets previousValue.
   */
  protected prepareEvent(timestamp: CausalTimestamp): CRegisterEvent<T> {
    return { timestamp, previousValue: this.value };
  }

  private constructValue(argsSerialized: Uint8Array): T {
    return this.valueConstructor(
      ...this.argsSerializer.deserialize(argsSerialized, this.parent.runtime)
    );
  }

  private setNewState(newState: AggregateArgsCRegisterEntry<T>[]): void {
    // Sort by sender, to make the order deterministic.
    // Note senders are always all distinct.
    newState.sort((a, b) => (a.sender < b.sender ? -1 : 1));
    // Replace this.state with newState
    this.state.entries = newState;
  }

  get value(): T {
    // Note: it is important for LwwCRegister that we don't
    // call aggregate until a call to value(), so that if
    // LwwCRegister chooses to
    // throw an error in the initial state, it will only
    // be thrown during value.  If we remove this caching,
    // LwwCRegister will need to throw no error in aggregate
    // and instead override value() to throw an error.
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
  conflicts(): T[] {
    return this.state.entries.map((entry) => entry.value);
  }

  /**
   * Return the current conflicting values with metadata.
   *
   * The array is guaranteed to contain
   * values in the same order on all replicas, namely,
   * in lexicographic order by sender.
   */
  conflictsMeta(): CRegisterEntryMeta<T>[] {
    // Defensive copy
    return this.state.entries.slice();
  }

  canGc(): boolean {
    return this.state.entries.length === 0;
  }

  savePrimitive(): Uint8Array {
    const message = AggregateArgsCRegisterSave.create({
      entries: this.state.entries.map((entry) => {
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
      this.state.entries.push(
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
   * TODO.
   *
   * Note that conflictsMeta might be empty (initial/reset
   * state).  Order is eventually consistent, so it is okay
   * to depend on the order.
   *
   * @param  conflictsMeta [description]
   * @return               [description]
   */
  protected abstract aggregate(conflictsMeta: CRegisterEntryMeta<T>[]): T;
}

/**
 * Version that has equal get and set types
 * (SetArgs = [T]).
 */
export abstract class AggregateCRegister<
  T,
  Events extends CRegisterEventsRecord<T> = CRegisterEventsRecord<T>
> extends AggregateArgsCRegister<T, [T], Events> {
  constructor(
    readonly valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance(),
    readonly preserveReferences = false
  ) {
    super((value) => value, SingletonSerializer.of(valueSerializer));
  }

  set value(value: T) {
    this.set(value);
  }
}

/**
 * Version that is an OptionalCRegister, with no value
 * set if the conflicts() is empty.
 */
export abstract class OptionalAggregateCRegister<T>
  extends AggregateCRegister<T, OptionalCRegisterEventsRecord<T>>
  implements OptionalCRegister<T>
{
  /**
   * [constructor description]
   * @param initialValue what get value() should
   * do when no values
   * are currently set (i.e., conflicts() is []), either
   * because the register has just been constructed or
   * it has been reset.
   * - { value: T } : return value
   * - { error: true } : throw an error.  In this case,
   * optionalValue can be used to safely get the value.
   * Also, in OptionalSet events, previousOptionalValue can
   * be used to safely get the previous value
   * (in contrast, previousValue in Set/OptionalSet events
   * will throw an error
   * if the previous value would have thrown an error).
   * @param valueSerializer         [description]
   */
  constructor(
    protected readonly initialValue: { value: T } | { error: true },
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(valueSerializer);
    // OptionalSet event
    this.on("Set", (event) =>
      // From prepareEvent, we know that the Set event is
      // actually an OptionalCRegisterEvent.
      this.emit("OptionalSet", event as OptionalCRegisterEvent<T>)
    );
  }

  /**
   * Returns an Optional for this.value which is empty
   * if there are zero conflicting values (i.e.,
   * this.conflicts() is []).  This is the only safe way
   * to access the value when initialValue = { error: true }
   * was passed to the constructor.
   */
  get optionalValue(): Optional<T> {
    if (this.canGc()) return Optional.empty();
    else return Optional.of(this.value);
  }

  /**
   * Override this so that if this.value throws an error,
   * instead of throwing an error here, we only do so
   * if a listener gets event.previousValue.
   */
  protected prepareEvent(
    timestamp: CausalTimestamp
  ): OptionalCRegisterEvent<T> {
    if (!("value" in this.initialValue) && !this.optionalValue.isPresent) {
      // previousValue should throw an error
      return {
        timestamp,
        get previousValue(): T {
          throw new Error(
            "initial value queried but initialValue is { error: true } (consider using previousOptionalValue)"
          );
        },
        previousOptionalValue: this.optionalValue,
      };
    } else {
      return {
        timestamp,
        previousValue: this.value,
        previousOptionalValue: this.optionalValue,
      };
    }
  }

  protected aggregate(conflictsMeta: CRegisterEntryMeta<T>[]) {
    if (conflictsMeta.length === 0) {
      // Consult initialValue
      if ("value" in this.initialValue) {
        return this.initialValue.value;
      } else {
        throw new Error(
          "initial value queried but initialValue is { error: true } (consider using optionalValue)"
        );
      }
    }

    return this.aggregateNotInitial(conflictsMeta);
  }

  /**
   * It is guaranteed that conflictsMeta.length >= 1.
   */
  protected abstract aggregateNotInitial(
    conflictsMeta: CRegisterEntryMeta<T>[]
  ): T;
}
