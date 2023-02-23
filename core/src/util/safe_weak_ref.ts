class FakeWeakRef<T extends object> implements WeakRef<T> {
  constructor(private readonly targetObject: T) {}

  deref(): T | undefined {
    return this.targetObject;
  }

  readonly [Symbol.toStringTag] = "WeakRef";
}

/**
 * WeakRef "polyfill" that will use a normal object if WeakRef is not supported.
 */
export const SafeWeakRef =
  typeof WeakRef === "undefined" ? FakeWeakRef : WeakRef;
