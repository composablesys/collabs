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

export class LwwCRegister<T> extends AggregateCRegister<T> {
  /**
   * If you don't have an initialValue, consider
   * OptionalLwwCRegister<T>.
   */
  constructor(
    initToken: InitToken,
    private readonly initialValue: T,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken, valueSerializer);
  }

  protected aggregate(conflictsMeta: CRegisterEntryMeta<T>[]) {
    if (conflictsMeta.length === 0) return this.initialValue;
    else return LwwCRegister.aggregateNonempty(conflictsMeta);
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
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(initToken, valueSerializer);
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
    for (let meta of conflictsMeta.values()) {
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
 * Like LwwCRegister, but doesn't need an initialValue
 * for when the value is initialized / reset;
 * instead, it returns an empty Optional<T> in that
 * situation.
 */
export class OptionalLwwCRegister<T> extends AggregateArgsCRegister<
  Optional<T>,
  [T],
  T
> {
  constructor(
    initToken: InitToken,
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(
      initToken,
      (value) => value,
      SingletonSerializer.getInstance(valueSerializer)
    );
  }

  protected aggregate(conflictsMeta: CRegisterEntryMeta<T>[]): Optional<T> {
    if (conflictsMeta.length === 0) return Optional.empty();
    else return Optional.of(LwwCRegister.aggregateNonempty(conflictsMeta));
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
    valueSerializer: Serializer<T> = DefaultSerializer.getInstance(
      initToken.runtime
    )
  ) {
    super(
      initToken,
      (value) => value,
      SingletonSerializer.getInstance(valueSerializer)
    );
  }

  protected aggregate(conflictsMeta: CRegisterEntryMeta<T>[]): Optional<T> {
    if (conflictsMeta.length === 0) return Optional.empty();
    else return Optional.of(FwwCRegister.aggregateNonempty(conflictsMeta));
  }
}
