import {
  SequentialCSetMessage,
  SequentialCSetSave,
} from "../../../generated/proto_compiled";
import { CausalTimestamp } from "../../net";
import {
  arrayAsString,
  DefaultElementSerializer,
  ElementSerializer,
  stringAsArray,
} from "../../util";
import { Resettable } from "../helper_crdts";
import { AbstractCSetPrimitiveCrdt } from "./abstract_set";

export class SequentialCSet<T>
  extends AbstractCSetPrimitiveCrdt<Set<string>, T, T[]>
  implements Resettable
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

  add(value: T): T {
    const message = SequentialCSetMessage.create({
      value: this.valueSerializer.serialize(value),
      operation: SequentialCSetMessage.Operation.ADD,
    });
    this.send(SequentialCSetMessage.encode(message).finish());
    return value;
  }

  delete(value: T): void {
    const message = SequentialCSetMessage.create({
      value: this.valueSerializer.serialize(value),
      operation: SequentialCSetMessage.Operation.DELETE,
    });
    this.send(SequentialCSetMessage.encode(message).finish());
  }

  protected receivePrimitive(
    timestamp: CausalTimestamp,
    message: Uint8Array
  ): void {
    const decoded = SequentialCSetMessage.decode(message);
    switch (decoded.operation) {
      case SequentialCSetMessage.Operation.ADD:
        this.state.add(arrayAsString(decoded.value));
        this.emit("Add", {
          // TODO: as an optimization, could deserialize
          // only on demand (use a getter + cache the result)
          value: this.valueSerializer.deserialize(message, this.runtime),
          timestamp,
        });
        break;
      case SequentialCSetMessage.Operation.DELETE:
        this.emit("Delete", {
          // TODO: as an optimization, could deserialize
          // only on demand (use a getter + cache the result)
          value: this.valueSerializer.deserialize(message, this.runtime),
          timestamp,
        });
        this.state.delete(arrayAsString(decoded.value));
        break;
      default:
        throw new Error("Unrecognized decoded.operation: " + decoded.operation);
    }
  }

  reset(): void {
    // clear is semantically an observed-reset
    this.clear();
  }

  has(value: T): boolean {
    return this.state.has(this.valueAsString(value));
  }

  get size(): number {
    return this.state.size;
  }

  *values(): IterableIterator<T> {
    for (let str of this.state.values()) {
      yield this.stringAsValue(str);
    }
  }

  canGc(): boolean {
    return this.state.size === 0;
  }

  savePrimitive(): Uint8Array {
    // TODO: elements as repeated string instead of
    // repeated bytes?  Only if guaranteed to be UTF-8.
    const message = SequentialCSetSave.create({
      values: [...this.state].map((value) => stringAsArray(value)),
    });
    return SequentialCSetSave.encode(message).finish();
  }

  loadPrimitive(saveData: Uint8Array) {
    const message = SequentialCSetSave.decode(saveData);
    for (let value of message.values) {
      this.state.add(arrayAsString(value));
    }
  }
}

export class GrowOnlyCSet<T> extends SequentialCSet<T> {
  delete(_value: T): void {
    throw new Error("Unsupported operation: GrowOnlyCSet.delete");
  }

  clear(): void {
    throw new Error("Unsupported operation: GrowOnlyCSet.clear");
  }

  reset(): void {
    throw new Error("Unsupported operation: GrowOnlyCSet.reset");
  }
}
