import {
  CollabEvent,
  CollabEventsRecord,
  CPrimitive,
  InitToken,
  int64AsNumber,
  UpdateMeta,
} from "@collabs/core";
import { CCounterMessage } from "../../generated/proto_compiled";

/**
 * Event emitted by a [[CCounter]] when a number is added.
 */
export interface CounterAddEvent extends CollabEvent {
  /**
   * The number added.
   */
  added: number;
  /**
   * The resulting [[CCounter.value]].
   */
  value: number;
}

/**
 * Events record for [[CCounter]].
 */
export interface CounterEventsRecord extends CollabEventsRecord {
  /**
   * Emitted when a number is added.
   */
  Add: CounterAddEvent;
}

/**
 * A collaborative counter with an [[add]] operation.
 *
 * If multiple users call [[add]] concurrently, all
 * of their additions take effect.
 *
 * Values and add args are required to be safe integers, since floating-point addition is not
 * commutative. If you need non-integer values,
 * you should use e.g. `counter.value / 100`.
 */
export class CCounter extends CPrimitive<CounterEventsRecord> {
  private _value: number;
  private readonly initialValue: number;

  /**
   * Constructs a CCounter.
   *
   * @param options.initialValue The initial value. Defaults to 0.
   */
  constructor(init: InitToken, { initialValue = 0 } = {}) {
    super(init);

    this.initialValue = initialValue;
    this._value = initialValue;
  }

  /**
   * Adds the given number to [[value]].
   *
   * @throws If `toAdd` is not a safe integer.
   */
  add(toAdd: number): void {
    if (!Number.isSafeInteger(toAdd)) {
      throw new Error("toAdd must be a safe integer");
    }

    const message = CCounterMessage.create(toAdd === 1 ? {} : { arg: toAdd });
    this.sendPrimitive(CCounterMessage.encode(message).finish());
  }

  protected receivePrimitive(
    message: Uint8Array | string,
    meta: UpdateMeta
  ): void {
    const decoded = CCounterMessage.decode(<Uint8Array>message);
    const toAdd = int64AsNumber(decoded.arg);
    this._value += toAdd;

    this.emit("Add", { added: toAdd, value: this.value, meta });
  }

  /**
   * The current value.
   */
  get value(): number {
    return this._value;
  }

  protected savePrimitive(): Uint8Array | null {
    if (this.canGC()) return null;

    const message = CCounterMessage.create({ arg: this._value });
    return CCounterMessage.encode(message).finish();
  }

  protected loadPrimitive(savedState: Uint8Array): void {
    const decoded = CCounterMessage.decode(savedState);
    this._value = int64AsNumber(decoded.arg);
  }

  canGC(): boolean {
    return this._value === this.initialValue;
  }
}
