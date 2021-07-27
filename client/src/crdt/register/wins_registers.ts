import {
  CRegisterEntryMeta,
  OptionalAggregateCRegister,
} from "./aggregate_register";

export class LwwCRegister<T> extends OptionalAggregateCRegister<T> {
  protected aggregateNotInitial(conflictsMeta: CRegisterEntryMeta<T>[]) {
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

export class FwwCRegister<T> extends OptionalAggregateCRegister<T> {
  protected aggregateNotInitial(conflictsMeta: CRegisterEntryMeta<T>[]) {
    // Return the value with the smallest timestamp.
    // Ties broken arbitrarily (first in iteration order).
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
