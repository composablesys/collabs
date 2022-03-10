import { InitToken } from "../../core";
import {
  DefaultSerializer,
  Optional,
  Serializer,
  SingletonSerializer,
} from "../../util";
import {
  AggregateArgsCRegister,
  AggregateCRegister,
  CRegisterEntryMeta,
} from "./aggregate_register";

export class LWWCRegister<T> extends AggregateCRegister<T> {
  /**
   * If you don't have an initialValue, consider
   * OptionalLWWCRegister<T>.
   */
  constructor(
    initToken: InitToken,
    private readonly initialValue: T,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance()
  ) {
    super(initToken, initialValue, valueSerializer);
  }

  protected aggregate(conflictsMeta: CRegisterEntryMeta<T>[]) {
    if (conflictsMeta.length === 0) return this.initialValue;
    else return LWWCRegister.aggregateNonempty(conflictsMeta);
  }

  /**
   * Does the LWW aggregation function for
   * conflictsMeta, which must be non-empty.
   * This is static and exposed publicly so that it
   * can be reused in other classes.
   *
   * @param  conflictsMeta [description]
   * @return                                [description]
   * @throws if conflictsMeta.length === 0
   */
  static aggregateNonempty<T>(conflictsMeta: CRegisterEntryMeta<T>[]): T {
    if (conflictsMeta.length === 0) {
      throw new Error("conflictsMeta is empty");
    }
    // Return the value with the largest meta.
    // Ties broken arbitrarily (last in iteration order).
    let bestValue: T;
    let bestTime = Number.NEGATIVE_INFINITY;
    for (const meta of conflictsMeta.values()) {
      if (meta.time >= bestTime) {
        bestValue = meta.value;
        bestTime = meta.time;
      }
    }
    // Guaranteed to have been set because conflictsMeta.length >= 1.
    return bestValue!;
  }
}

export class FwwCRegister<T> extends AggregateCRegister<T> {
  /**
   * If you don't have an initialValue, consider
   * OptionalFwwCRegister<T>.
   */
  constructor(
    initToken: InitToken,
    private readonly initialValue: T,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance()
  ) {
    super(initToken, initialValue, valueSerializer);
  }

  protected aggregate(conflictsMeta: CRegisterEntryMeta<T>[]) {
    if (conflictsMeta.length === 0) return this.initialValue;
    else return FwwCRegister.aggregateNonempty(conflictsMeta);
  }

  /**
   * Does the FWW aggregation function for
   * conflictsMeta, which must be non-empty.
   * This is static and exposed publicly so that it
   * can be reused in other classes.
   *
   * @param  conflictsMeta [description]
   * @return                                [description]
   * @throws if conflictsMeta.length === 0
   */
  static aggregateNonempty<T>(conflictsMeta: CRegisterEntryMeta<T>[]): T {
    if (conflictsMeta.length === 0) {
      throw new Error("conflictsMeta is empty");
    }
    // Return the value with the smallest meta.
    // Ties broken arbitrarily (first in iteration order).
    let bestValue: T;
    let bestTime = Number.POSITIVE_INFINITY;
    for (const meta of conflictsMeta.values()) {
      if (meta.time < bestTime) {
        bestValue = meta.value;
        bestTime = meta.time;
      }
    }
    // Guaranteed to have been set because conflictsMeta.length >= 1.
    return bestValue!;
  }
}

/**
 * Like LWWCRegister, but doesn't need an initialValue
 * for when the value is initialized / reset;
 * instead, it returns an empty Optional<T> in that
 * situation.
 */
export class OptionalLWWCRegister<T> extends AggregateArgsCRegister<
  Optional<T>,
  [T],
  T
> {
  constructor(
    initToken: InitToken,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance()
  ) {
    super(
      initToken,
      (value) => value,
      Optional.empty(),
      SingletonSerializer.getInstance(valueSerializer)
    );
  }

  protected aggregate(conflictsMeta: CRegisterEntryMeta<T>[]): Optional<T> {
    if (conflictsMeta.length === 0) return Optional.empty();
    else {
      const newValue = LWWCRegister.aggregateNonempty(conflictsMeta);
      if (this.value.isPresent && this.value.get() === newValue) {
        // Return the previous value, so that its Optional is
        // === instead of just deep-equals.
        return this.value;
      }
      return Optional.of(newValue);
    }
  }
}

/**
 * Like FwwCRegister, but doesn't need an initialValue
 * for when the value is initialized / reset;
 * instead, it returns an empty Optional<T> in that
 * situation.
 */
export class OptionalFwwCRegister<T> extends AggregateArgsCRegister<
  Optional<T>,
  [T],
  T
> {
  constructor(
    initToken: InitToken,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance()
  ) {
    super(
      initToken,
      (value) => value,
      Optional.empty(),
      SingletonSerializer.getInstance(valueSerializer)
    );
  }

  protected aggregate(conflictsMeta: CRegisterEntryMeta<T>[]): Optional<T> {
    if (conflictsMeta.length === 0) return Optional.empty();
    else {
      const newValue = FwwCRegister.aggregateNonempty(conflictsMeta);
      if (this.value.isPresent && this.value.get() === newValue) {
        // Return the previous value, so that its Optional is
        // === instead of just deep-equals.
        return this.value;
      }
      return Optional.of(newValue);
    }
  }
}
