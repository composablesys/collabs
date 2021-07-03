import { GPlainSetSave } from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
} from "../../util";
import { Boolean, TrueWinsBoolean } from "../boolean";
import { PrimitiveCrdt } from "../core";
import { ImplicitCrdtMap } from "../map";
import { AbstractPlainSet } from "./abstract_sets";
import { PlainSet, PlainSetEventsRecord } from "./interfaces";

export class BooleanPlainSet<T> extends AbstractPlainSet<T> {
  private readonly booleanMap: ImplicitCrdtMap<T, Boolean>;
  /**
   * TODO: booleans must start false.  If you want
   * different behavior, you should wrap around this
   * set (e.g., negate has to make everything start
   * in the set, or do something else if you want it
   * to start containing some elements but not others).
   */
  constructor(
    booleanConstructor: () => Boolean,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.booleanMap = this.addChild(
      "",
      new ImplicitCrdtMap(booleanConstructor, valueSerializer)
    );

    // Events
    // TODO: optimize to reduce closures?
    this.booleanMap.on("ValueInit", (event) => {
      event.value.on("Change", (event2) => {
        if (this.has(event.key)) {
          this.emit("Add", { value: event.key, timestamp: event2.timestamp });
        } else {
          this.emit("Delete", {
            value: event.key,
            timestamp: event2.timestamp,
          });
        }
      });
    });
  }

  add(value: T): this {
    this.booleanMap.get(value).value = true;
    return this;
  }

  delete(value: T): boolean {
    const had = this.has(value);
    this.booleanMap.get(value).value = false;
    return had;
  }

  // Use inherited clear implementation (delete every value)

  has(value: T): boolean {
    if (this.booleanMap.has(value)) {
      return this.booleanMap.get(value).value;
    } else return false;
  }

  get size(): number {
    // TODO: make run in constant time
    let count = 0;
    for (let _value of this) count++;
    return count;
  }

  *values(): IterableIterator<T> {
    for (let [key, valueBool] of this.booleanMap) {
      if (valueBool.value) yield key;
    }
  }

  reset(): void {
    // TODO: optimize
    for (let value of this.booleanMap.values()) value.reset();
  }
}

export class AddWinsPlainSet<T> extends BooleanPlainSet<T> {
  constructor(
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(() => new TrueWinsBoolean(), valueSerializer);
  }

  // Optimize by calling reset instead of deleting
  // every value separately.
  clear() {
    this.reset();
  }
}

// More generally, SequentialPlainSet, like SequentialMap.
// Allowed use cases are: unique values; or grow-only.
// (Perhaps implement GSet as a subclass that makes delete etc. give an error?)

export class GPlainSet<T>
  extends PrimitiveCrdt<Set<string>, PlainSetEventsRecord<T>>
  implements PlainSet<T>
{
  constructor(
    private readonly valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(new Set());
  }

  private valueAsString(value: T): string {
    return arrayAsString(this.valueSerializer.serialize(value));
  }

  private stringAsValue(str: string): T {
    return this.valueSerializer.deserialize(stringAsArray(str), this.runtime);
  }

  add(value: T): this {
    this.send(this.valueSerializer.serialize(value));
    return this;
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    this.state.add(arrayAsString(message));
    this.emit("Add", {
      // TODO: as an optimization, could deserialize
      // only on demand (use a getter + cache the result)
      value: this.valueSerializer.deserialize(message, this.runtime),
      timestamp,
    });
  }

  has(value: T): boolean {
    return this.state.has(this.valueAsString(value));
  }

  get size(): number {
    return this.state.size;
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  *entries(): IterableIterator<[T, T]> {
    for (let value of this.values()) yield [value, value];
  }

  keys(): IterableIterator<T> {
    return this.values();
  }

  // TODO: note that particular objects may change
  // between different iterations; serialization
  // equality is what matters.
  *values(): IterableIterator<T> {
    for (let str of this.state.values()) {
      yield this.stringAsValue(str);
    }
  }

  clear(): void {
    throw new Error("Unsupported operation: GPlainSet.clear");
  }
  delete(_value: T): boolean {
    throw new Error("Unsupported operation: GPlainSet.delete");
  }
  reset(): void {
    throw new Error("Unsupported operation: GPlainSet.reset");
  }

  canGc(): boolean {
    return this.state.size === 0;
  }

  savePrimitive(): Uint8Array {
    // TODO: elements as repeated string instead of
    // repeated bytes?  Only if guaranteed to be UTF-8.
    const message = GPlainSetSave.create({
      elements: [...this.state].map((value) => stringAsArray(value)),
    });
    return GPlainSetSave.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    const message = GPlainSetSave.decode(saveData);
    for (let element of message.elements) {
      this.state.add(arrayAsString(element));
    }
  }

  forEach(
    callbackfn: (value: T, value2: T, set: this) => void,
    thisArg?: any
  ): void {
    for (let value of this) {
      callbackfn.call(thisArg, value, value, this);
    }
  }

  get [Symbol.toStringTag](): string {
    return "SequentialPlainSet";
  }
}
