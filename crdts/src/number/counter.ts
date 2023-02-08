import {
  CollabEvent,
  CollabEventsRecord,
  CPrimitive,
  InitToken,
  int64AsNumber,
  Optional,
  UpdateMeta,
} from "@collabs/core";
import { CCounterMessage } from "../../generated/proto_compiled";

export interface CCounterAddEvent extends CollabEvent {
  added: number;
  value: number;
}

export interface CCounterEventsRecord extends CollabEventsRecord {
  Add: CCounterAddEvent;
}

/**
 * A counter CRDT with operation add(integer).
 *
 * In case of concurrent additions, they all take effect,
 * in serial order. This is eventually consistent because
 * addition commutes.
 *
 * Values and addends are required to be (safe) integers, since
 * floating-point addition is not actually commutative
 * (due to rounding errors). If you need non-integer values,
 * you should represent them as e.g. (Counter value)/100.
 */
export class CCounter extends CPrimitive<CCounterEventsRecord> {
  private _value: number;

  constructor(init: InitToken, private readonly initialValue = 0) {
    super(init);

    this._value = initialValue;
  }

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

  get value(): number {
    return this._value;
  }

  save(): Uint8Array {
    const message = CCounterMessage.create({ arg: this._value });
    return CCounterMessage.encode(message).finish();
  }

  load(savedState: Optional<Uint8Array>): void {
    if (savedState.isPresent) {
      const decoded = CCounterMessage.decode(savedState.get());
      this._value = int64AsNumber(decoded.arg);
    }
  }

  canGC(): boolean {
    return this._value === this.initialValue;
  }
}
