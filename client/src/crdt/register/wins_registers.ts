import {
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
} from "../../util";
import {
  AggregateArgsCRegister,
  AggregateCRegister,
  AggregateCRegisterMeta,
} from "./aggregate_register";

// TODO: allow initialValue to be omitted if you only
// plan to consult optionalValue?  That way you don't
// have to pass a fake initialValue, e.g., (undefined
// as unknown as T).  Mention the fake initial value
// technique in Lww, Fww registers.

function lwwAggregate<T>(
  conflictsMeta: AggregateCRegisterMeta<T>[],
  initialValue: T
): T {
  // Return the value with the largest timestamp.
  // Ties broken arbitrarily (last in iteration order).
  let bestValue = initialValue;
  let bestTime = Number.NEGATIVE_INFINITY;
  for (let meta of conflictsMeta.values()) {
    if (meta.time >= bestTime) {
      bestValue = meta.value;
      bestTime = meta.time;
    }
  }
  return bestValue;
}

export class LwwCRegister<T> extends AggregateCRegister<T> {
  constructor(
    private readonly initialValue: T,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(valueSerializer);
  }

  protected aggregate(conflictsMeta: AggregateCRegisterMeta<T>[]) {
    return lwwAggregate(conflictsMeta, this.initialValue);
  }
}

export class LwwArgsCRegister<
  T,
  SetArgs extends any[]
> extends AggregateArgsCRegister<T, SetArgs> {
  /**
   * TODO: initialValue, or initialArgs?
   *
   * TODO: option to not have an initial value,
   * get value() returns an error if it's not set
   * (you're supposed to use optionalValue).
   */
  constructor(
    valueConstructor: (...args: SetArgs) => T,
    private readonly initialValue: T,
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance(),
    preserveReferences = false
  ) {
    super(valueConstructor, argsSerializer, preserveReferences);
  }

  protected aggregate(conflictsMeta: AggregateCRegisterMeta<T>[]) {
    return lwwAggregate(conflictsMeta, this.initialValue);
  }

  // TODO: move to Lww/Fww only (doesn't seem generally
  // useful).
  get optionalValue(): Optional<T> {
    if (this.state.length === 0) return Optional.empty();
    else return Optional.of(this.value);
  }
}

function fwwAggregate<T>(
  conflictsMeta: AggregateCRegisterMeta<T>[],
  initialValue: T
): T {
  // Return the value with the smallest timestamp.
  // Ties broken arbitrarily (first in iteration order).
  let bestValue = initialValue;
  let bestTime = Number.POSITIVE_INFINITY;
  for (let meta of conflictsMeta.values()) {
    if (meta.time < bestTime) {
      bestValue = meta.value;
      bestTime = meta.time;
    }
  }
  return bestValue;
}

export class FwwCRegister<T> extends AggregateCRegister<T> {
  constructor(
    private readonly initialValue: T,
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(valueSerializer);
  }

  protected aggregate(conflictsMeta: AggregateCRegisterMeta<T>[]): T {
    return fwwAggregate(conflictsMeta, this.initialValue);
  }
}

export class FwwArgsCRegister<
  T,
  SetArgs extends any[]
> extends AggregateArgsCRegister<T, SetArgs> {
  /**
   * TODO: initialValue, or initialArgs?
   */
  constructor(
    valueConstructor: (...args: SetArgs) => T,
    private readonly initialValue: T,
    argsSerializer: ElementSerializer<SetArgs> = DefaultElementSerializer.getInstance(),
    preserveReferences = false
  ) {
    super(valueConstructor, argsSerializer, preserveReferences);
  }

  protected aggregate(conflictsMeta: AggregateCRegisterMeta<T>[]) {
    return fwwAggregate(conflictsMeta, this.initialValue);
  }

  // TODO: move to Lww/Fww only (doesn't seem generally
  // useful).
  get optionalValue(): Optional<T> {
    if (this.state.length === 0) return Optional.empty();
    else return Optional.of(this.value);
  }
}
