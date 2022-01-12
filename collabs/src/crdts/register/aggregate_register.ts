import {
  AggregateArgsCRegisterMessage,
  AggregateArgsCRegisterSave,
} from "../../../generated/proto_compiled";
import { InitToken } from "../../core";
import { CRegister, CRegisterEventsRecord } from "../../data_types";
import {
  DefaultSerializer,
  Optional,
  Serializer,
  SingletonSerializer,
} from "../../util";
import { CRDTMessageMeta, PrimitiveCRDT } from "../constructions";

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
    SetArgs extends unknown[],
    S = T,
    Events extends CRegisterEventsRecord<T> = CRegisterEventsRecord<T>
  >
  extends PrimitiveCRDT<Events>
  implements CRegister<T, SetArgs>
{
  protected entries: AggregateArgsCRegisterEntry<S>[] = [];
  private cachedValue?: T = undefined;
  private cacheValid = false;

  constructor(
    initToken: InitToken,
    readonly valueConstructor: (...args: SetArgs) => S,
    readonly argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken);
  }

  set(...args: SetArgs): T {
    const message = AggregateArgsCRegisterMessage.create({
      setArgs: this.argsSerializer.serialize(args),
    });
    const buffer = AggregateArgsCRegisterMessage.encode(message).finish();
    this.sendCRDT(buffer);
    return this.value;
  }

  reset(): void {
    // Only reset if needed
    if (!this.canGC()) {
      const message = AggregateArgsCRegisterMessage.create({
        reset: true,
      }); // no value
      const buffer = AggregateArgsCRegisterMessage.encode(message).finish();
      this.sendCRDT(buffer);
    }
  }

  protected receiveCRDT(
    message: string | Uint8Array,
    meta: CRDTMessageMeta
  ): void {
    // Get previousValue now
    const previousValue = this.value;

    const decoded = AggregateArgsCRegisterMessage.decode(<Uint8Array>message);
    const newState = new Array<AggregateArgsCRegisterEntry<S>>();
    for (const entry of this.entries) {
      if (meta.vectorClock.get(entry.sender) < entry.senderCounter) {
        newState.push(entry);
      }
    }
    switch (decoded.data) {
      case "setArgs": {
        // Add the new entry
        const entry = new AggregateArgsCRegisterEntry(
          this.constructValue(decoded.setArgs),
          meta.sender,
          meta.senderCounter,
          meta.wallClockTime,
          decoded.setArgs
        );
        newState.push(entry);
        break;
      }
      case "reset":
        // Add nothing new to newState
        break;
      default:
        throw new Error(
          `AggregateCRegister: Bad decoded.data: ${decoded.data}`
        );
    }
    this.setNewState(newState);
    this.cacheValid = false;
    this.cachedValue = undefined;

    this.emit("Set", {
      meta,
      previousValue,
    });
  }

  private constructValue(argsSerialized: Uint8Array): S {
    return this.valueConstructor(
      ...this.argsSerializer.deserialize(argsSerialized)
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

  /**
   * @return this.value + ""
   */
  toString(): string {
    return String(this.value);
  }

  canGC(): boolean {
    return this.entries.length === 0;
  }

  save(): Uint8Array {
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

  load(saveData: Optional<Uint8Array>) {
    if (!saveData.isPresent) return;
    const message = AggregateArgsCRegisterSave.decode(saveData.get());
    for (const element of message.entries) {
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
    initToken: InitToken,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(
      initToken,
      (value) => value,
      SingletonSerializer.getInstance(valueSerializer)
    );
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
