const keys = new WeakMap<object, string>();
let counter = 0;

/**
 * Returns a React key that acts like `obj` with `===` comparisons.
 *
 * This is a workaround to let you use an object as a React key.
 * E.g., in a CList, you should use `objectKey(value: Collab)`
 * as a React key instead of the value's Position, since `CList.move`
 * can change a value's position.
 */
export function objectKey(obj: object): string {
  let value = keys.get(obj);
  if (value === undefined) {
    value = `objectKey_${counter++}`;
    keys.set(obj, value);
  }
  return value;
}
