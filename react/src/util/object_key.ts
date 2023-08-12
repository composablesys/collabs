const keys = new WeakMap<object, string>();
let counter = 0;

/**
 * Workaround to let you use objects (e.g. Collabs)
 * as React keys, by assigning a unique string to each object.
 * TODO: for CList etc
 */
export function objectKey(obj: object): string {
  let value = keys.get(obj);
  if (value === undefined) {
    value = `reactKey_${counter++}`;
    keys.set(obj, value);
  }
  return value;
}
