import {
  DefaultElementSerializer,
  ElementSerializer,
  Optional,
} from "../../util";
import { AggregateCRegister, CRegisterEntryMeta } from "./aggregate_register";

export class LwwCRegister<T> extends AggregateCRegister<T> {
  /**
   * [constructor description]
   * @param initialValue what get value() should
   * do when no values
   * are currently set (i.e., conflicts() is []), either
   * because the register has just been constructed or
   * it has been reset.
   * - { value: T } : return value
   * - { error: true } : throw an error.  In this case,
   * get optionalValue() can be used to safely get the value.
   * @param valueSerializer         [description]
   */
  constructor(
    private readonly initialValue: { value: T } | { error: true },
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(valueSerializer);
  }

  protected aggregate(conflictsMeta: CRegisterEntryMeta<T>[]) {
    return LwwCRegister.lwwAggregate(conflictsMeta, this.initialValue);
  }

  /**
   * Returns an Optional for this.value which is empty
   * if there are zero conflicting values (i.e.,
   * this.conflicts() is []).  This is the only safe way
   * to access the value when initialValue = { error: true }
   * was passed to the constructor.
   */
  get optionalValue(): Optional<T> {
    if (this.canGc()) return Optional.empty();
    else return Optional.of(this.value);
  }

  /**
   * This method is exposed publicly so you can use it
   * elsewhere (e.g., defining an Args version of
   * LwwCRegister).
   */
  static lwwAggregate<T>(
    conflictsMeta: CRegisterEntryMeta<T>[],
    initialValue: { value: T } | { error: true }
  ): T {
    if (conflictsMeta.length === 0) {
      // Consult initialValue
      if ("value" in initialValue) {
        return initialValue.value;
      } else {
        throw new Error(
          "initial value queried but initialValue is { error: true } (consider using optionalValue)"
        );
      }
    }

    // Return the value with the largest timestamp.
    // Ties broken arbitrarily (last in iteration order).
    let bestValue: T;
    let bestTime = Number.NEGATIVE_INFINITY;
    for (let meta of conflictsMeta.values()) {
      if (meta.time >= bestTime) {
        bestValue = meta.value;
        bestTime = meta.time;
      }
    }
    return bestValue!;
  }
}

export class FwwCRegister<T> extends AggregateCRegister<T> {
  /**
   * [constructor description]
   * @param initialValue what get value() should
   * do when no values
   * are currently set (i.e., conflicts() is []), either
   * because the register has just been constructed or
   * it has been reset.
   * - { value: T } : return value
   * - { error: true } : throw an error.  In this case,
   * get optionalValue() can be used to safely get the value.
   * @param valueSerializer         [description]
   */
  constructor(
    private readonly initialValue: { value: T } | { error: true },
    valueSerializer: ElementSerializer<T> = DefaultElementSerializer.getInstance()
  ) {
    super(valueSerializer);
  }

  protected aggregate(conflictsMeta: CRegisterEntryMeta<T>[]) {
    return LwwCRegister.lwwAggregate(conflictsMeta, this.initialValue);
  }

  /**
   * Returns an Optional for this.value which is empty
   * if there are zero conflicting values (i.e.,
   * this.conflicts() is []).  This is the only safe way
   * to access the value when initialValue = { error: true }
   * was passed to the constructor.
   */
  get optionalValue(): Optional<T> {
    if (this.canGc()) return Optional.empty();
    else return Optional.of(this.value);
  }

  /**
   * This method is exposed publicly so you can use it
   * elsewhere (e.g., defining an Args version of
   * FwwCRegister).
   */
  static fwwAggregate<T>(
    conflictsMeta: CRegisterEntryMeta<T>[],
    initialValue: { value: T } | { error: true }
  ): T {
    if (conflictsMeta.length === 0) {
      // Consult initialValue
      if ("value" in initialValue) {
        return initialValue.value;
      } else {
        throw new Error(
          "initial value queried but initialValue is { error: true } (consider using optionalValue)"
        );
      }
    }

    // Return the value with the largest timestamp.
    // Ties broken arbitrarily (last in iteration order).
    let bestValue: T;
    let bestTime = Number.POSITIVE_INFINITY;
    for (let meta of conflictsMeta.values()) {
      if (meta.time < bestTime) {
        bestValue = meta.value;
        bestTime = meta.time;
      }
    }
    return bestValue!;
  }
}
