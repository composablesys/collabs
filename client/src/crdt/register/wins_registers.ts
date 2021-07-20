import { DefaultElementSerializer, ElementSerializer } from "../../util";
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
}
