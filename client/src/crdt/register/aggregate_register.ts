import {
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
} from "../../util";
import { CompositeCrdt } from "../core";
import { ResettableEventsRecord } from "../helper_crdts";
import { Register } from "./interfaces";
import { MultiValueRegister, MvrMeta } from "./multi_value_register";

// TODO: mention as other examples, e.g., a color averager.
// Demo that on whiteboard?

export abstract class AggregateRegister<T>
  extends CompositeCrdt<ResettableEventsRecord>
  implements Register<T>
{
  private readonly mvr: MultiValueRegister<T>;
  private cachedValue: T | undefined = undefined;
  private cacheValid: boolean = false;
  constructor(
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super();
    this.mvr = this.addChild("mvr", new MultiValueRegister(valueSerializer));
    this.mvr.on("Change", this.handleMvrEvent.bind(this));
    this.mvr.on("Reset", (event) => this.emit("Reset", event));
  }

  private handleMvrEvent() {
    this.cacheValid = false;
    // TODO: is this wise?
    this.cachedValue = undefined;
  }

  set value(newValue: T) {
    this.mvr.set(newValue);
  }

  get value(): T {
    if (!this.cacheValid) {
      this.cachedValue = this.aggregate(this.mvr.conflictsMeta());
      this.cacheValid = true;
    }
    return this.cachedValue!;
  }

  get optionalValue(): Optional<T> {
    // TODO: use better function than canGc (e.g. size function)
    // TODO: cache Optional.of?
    if (this.mvr.canGc()) return Optional.empty();
    else return Optional.of(this.value);
  }

  conflicts(): Set<T> {
    return this.mvr.conflicts();
  }

  conflictsMeta(): Set<MvrMeta<T>> {
    return this.mvr.conflictsMeta();
  }

  reset(): void {
    this.mvr.reset();
  }

  // TODO: note that it might be empty (initial/reset state)
  protected abstract aggregate(conflictsMeta: Set<MvrMeta<T>>): T;
}

// TODO: allow initialValue to be omitted if you only
// plan to consult optionalValue?  That way you don't
// have to pass a fake initialValue, e.g., (undefined
// as unknown as T).
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
