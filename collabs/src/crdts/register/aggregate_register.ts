import {
  AggregateArgsCRegisterMessage,
  AggregateArgsCRegisterSave,
} from "../../../generated/proto_compiled";
import { InitToken, MessageMeta } from "../../core";
import { CRegister, CRegisterEventsRecord } from "../../data_types";
import {
  DefaultSerializer,
  Optional,
  Serializer,
  SingletonSerializer,
} from "../../util";
import { PrimitiveCRDT } from "../constructions";
import { CRDTMeta } from "../crdt-runtime";
import { ClearableCRegister } from "../map";

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
 * to type T.  Usually S = T, but OptionalLWWCRegister
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
  implements CRegister<T, SetArgs>, ClearableCRegister<T, SetArgs>
{
  private entries: AggregateArgsCRegisterEntry<S>[] = [];
  private _value: T;

  constructor(
    initToken: InitToken,
    readonly valueConstructor: (...args: SetArgs) => S,
    initialValue: T,
    readonly argsSerializer: Serializer<SetArgs> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken);

    this._value = initialValue;
  }

  set(...args: SetArgs): T {
    const message = AggregateArgsCRegisterMessage.create({
      setArgs: this.argsSerializer.serialize(args),
    });
    const buffer = AggregateArgsCRegisterMessage.encode(message).finish();
    // Opt: only request wallClockTime if actually used by
    // aggregate().
    // Automatic mode suffices to send all of the needed
    // vector clock entries (those corresponding to current
    // values in this.entries).
    this.sendCRDT(buffer, { automatic: true });
    return this.value;
  }

  /**
   * Clears the register, resetting it to its initial value.
   *
   * Like [[set]], this overwrites all causally prior values,
   * but unlike [[set]], it does not provide a new value.
   * Hence after calling this method, the conflicts set
   * is empty.
   *
   * As a consequence, in the face of concurrent calls to
   * [[clear]] and [[set]], the [[set]] always wins.
   *
   * Also, immediately after calling this method,
   * [[canGC]] will be true.
   */
  clear(): void {
    // Only clear if needed
    if (!this.canGC()) {
      const message = AggregateArgsCRegisterMessage.create({
        clear: true,
      }); // no value
      const buffer = AggregateArgsCRegisterMessage.encode(message).finish();
      // Automatic mode suffices to send all of the needed
      // vector clock entries (those corresponding to current
      // values in this.entries).
      this.sendCRDT(buffer, { automatic: true });
    }
  }

  protected receiveCRDT(
    message: string | Uint8Array,
    meta: MessageMeta,
    crdtMeta: CRDTMeta
  ): void {
    const decoded = AggregateArgsCRegisterMessage.decode(<Uint8Array>message);
    const newState = new Array<AggregateArgsCRegisterEntry<S>>();
    for (const entry of this.entries) {
      if (crdtMeta.vectorClockGet(entry.sender) < entry.senderCounter) {
        newState.push(entry);
      }
    }
    switch (decoded.data) {
      case "setArgs": {
        // Add the new entry
        const entry = new AggregateArgsCRegisterEntry(
          this.constructValue(decoded.setArgs),
          crdtMeta.sender,
          crdtMeta.senderCounter,
          crdtMeta.wallClockTime!,
          decoded.setArgs
        );
        newState.push(entry);
        break;
      }
      case "clear":
        // Add nothing new to newState
        break;
      default:
        throw new Error(
          `AggregateCRegister: Bad decoded.data: ${decoded.data}`
        );
    }

    // Use newState to set entries and _value.
    // We sort entries by sender, to make the order deterministic.
    // Note senders are always all distinct.
    newState.sort((a, b) => (a.sender < b.sender ? -1 : 1));
    this.entries = newState;
    const previousValue = this._value;
    this._value = this.aggregate(this.entries);

    // Only emit a Set event if the value has changed
    // (under === equality).
    if (this._value !== previousValue) {
      this.emit("Set", {
        meta,
        previousValue,
      });
    }
  }

  private constructValue(argsSerialized: Uint8Array): S {
    return this.valueConstructor(
      ...this.argsSerializer.deserialize(argsSerialized)
    );
  }

  get value(): T {
    return this._value;
  }

  /**
   * Return the current conflicting values, i.e., the
   * non-overwritten values.  This may have
   * more than one element due to concurrent writes,
   * or it may have zero elements because the register is
   * newly initialized or has been [[clear]]ed.
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
    this._value = this.aggregate(this.entries);
  }

  /**
   * Aggregate the current conflicting (causally maximal)
   * values, with metadata, returning the actual value.
   *
   * Note that conflictsMeta might be empty (initial/[[clear]]ed
   * state).  Order is eventually consistent, so it is okay
   * to depend on the order.
   *
   * If the return value is "equal" to the previous value
   * (the current `this.value`), for some
   * definition of equal that users would find reasonable,
   * then you should return the literal previous value
   * or something === to it. Otherwise, users will get spurious
   * "Set" events.
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
    initialValue: T,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(
      initToken,
      (value) => value,
      initialValue,
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
