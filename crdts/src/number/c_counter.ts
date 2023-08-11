import {
  CPrimitive,
  CollabEvent,
  CollabEventsRecord,
  InitToken,
  MessageMeta,
  SavedStateMeta,
  int64AsNumber,
} from "@collabs/core";
import { CounterMessage, CounterSave } from "../../generated/proto_compiled";

/**
 * Event emitted by a [[CCounter]] when the value changes.
 */
export interface CounterAddEvent extends CollabEvent {
  /**
   * The amount added.
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
   * Emitted when the value changes.
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
 *
 * See also: [[CVar]]`<number>`: for a number that can be set and get atomically instead of
 * counting.
 */
export class CCounter extends CPrimitive<CounterEventsRecord> {
  private readonly initialValue: number;
  private readonly p = new Map<string, number>();
  private readonly n = new Map<string, number>();
  /** Cached value. */
  private _value: number;

  /**
   * Constructs a CCounter.
   *
   * @param options.initialValue The initial value. Defaults to 0.
   */
  constructor(init: InitToken, options: { initialValue?: number } = {}) {
    super(init);

    this.initialValue = options.initialValue ?? 0;
    this._value = this.initialValue;
  }

  /**
   * Adds the given number to [[value]].
   *
   * If multiple users call [[add]] concurrently, all
   * of their additions take effect.
   *
   * @throws If `toAdd` is not a safe integer.
   */
  add(toAdd: number): void {
    if (!Number.isSafeInteger(toAdd)) {
      throw new Error("toAdd must be a safe integer");
    }
    if (toAdd === 0) return;

    const message = CounterMessage.create(toAdd === 1 ? {} : { arg: toAdd });
    this.sendPrimitive(CounterMessage.encode(message).finish());
  }

  protected receivePrimitive(
    message: Uint8Array | string,
    meta: MessageMeta
  ): void {
    const decoded = CounterMessage.decode(<Uint8Array>message);
    const toAdd = int64AsNumber(decoded.arg);
    if (toAdd > 0) {
      this.p.set(meta.senderID, (this.p.get(meta.senderID) ?? 0) + toAdd);
    } else {
      this.n.set(meta.senderID, (this.n.get(meta.senderID) ?? 0) - toAdd);
    }
    this._value += toAdd;

    this.emit("Add", { added: toAdd, value: this._value, meta });
  }

  /**
   * The current value.
   */
  get value(): number {
    return this._value;
  }

  protected savePrimitive(): Uint8Array {
    const message = CounterSave.create({
      p: Object.fromEntries(this.p),
      n: Object.fromEntries(this.n),
    });
    return CounterSave.encode(message).finish();
  }

  protected loadPrimitive(
    savedState: Uint8Array | null,
    meta: SavedStateMeta
  ): void {
    if (savedState === null) return;

    const oldValue = this._value;
    const decoded = CounterSave.decode(savedState);
    this.mergeOne(this.p, decoded.p, 1);
    this.mergeOne(this.n, decoded.n, -1);
    if (this._value !== oldValue) {
      this.emit("Add", {
        added: this._value - oldValue,
        value: this._value,
        meta,
      });
    }
  }

  private mergeOne(
    current: Map<string, number>,
    incoming: Record<string, number | Long>,
    sign: 1 | -1
  ) {
    for (const [key, value] of Object.entries(incoming)) {
      const a = current.get(key) ?? 0;
      const b = int64AsNumber(value);
      if (b > a) {
        current.set(key, b);
        this._value += sign * (b - a);
      }
    }
  }
}
