import {
  DefaultElementSerializer,
  ElementSerializer,
} from "../../util/serialization";
import { CompositeCrdt } from "../core/composite_crdt";
import { Register, RegisterEventsRecord } from "./interfaces";
import {
  MultiValueRegister,
  MvrMeta,
  MvrSetEvent,
} from "./multi_value_register";

// TODO: mention as other examples, e.g., a color averager.
// Demo that on whiteboard?

export abstract class AggregateRegister<T>
  extends CompositeCrdt<RegisterEventsRecord<T>>
  implements Register<T>
{
  private readonly mvr: MultiValueRegister<T>;
  private cachedValue: T;
  constructor(
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.mvr = this.addChild("mvr", new MultiValueRegister(valueSerializer));
    this.mvr.on("Set", this.handleMvrEvent.bind(this));
    // TODO: optimize?
    this.cachedValue = this.aggregate(new Set());
  }

  private handleMvrEvent(event: MvrSetEvent<T>) {
    this.cachedValue = this.aggregate(this.mvr.conflictsMeta());
    this.emit("Set", {
      caller: this,
      timestamp: event.timestamp,
      value: this.cachedValue,
    });
  }

  set value(newValue: T) {
    this.mvr.set(newValue);
  }

  get value(): T {
    return this.cachedValue;
  }

  reset(): void {
    this.mvr.reset();
  }

  // TODO: note that it might be empty (initial/reset state)
  protected abstract aggregate(conflictsMeta: Set<MvrMeta<T>>): T;
}

export class LwwRegister<T> extends AggregateRegister<T> {
  constructor(
    private readonly initialValue: T,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(valueSerializer);
  }

  protected aggregate(conflictsMeta: Set<MvrMeta<T>>): T {
    // Return the value with the largest timestamp.
    // Ties broken arbitrarily (last in iteration order).
    let bestValue = this.initialValue;
    let bestTime = Number.NEGATIVE_INFINITY;
    for (let meta of conflictsMeta.values()) {
      if (meta.time >= bestTime) {
        bestValue = meta.value;
        bestTime = meta.time;
      }
    }
    return bestValue;
  }
}

// TODO: include?
export class FwwRegister<T> extends AggregateRegister<T> {
  constructor(
    private readonly initialValue: T,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(valueSerializer);
  }

  protected aggregate(conflictsMeta: Set<MvrMeta<T>>): T {
    // Return the value with the smallest timestamp.
    // Ties broken arbitrarily (first in iteration order).
    let bestValue = this.initialValue;
    let bestTime = Number.POSITIVE_INFINITY;
    for (let meta of conflictsMeta.values()) {
      if (meta.time < bestTime) {
        bestValue = meta.value;
        bestTime = meta.time;
      }
    }
    return bestValue;
  }
}
