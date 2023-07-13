/**
 * Safe version of TypeScript's non-null asertion (`value!`) that throws
 * an error if `value` is actually null or undefined.
 */
export function nonNull<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new Error("Internal error: non-null assertion failed");
  }
  return value;
}
