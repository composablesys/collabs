export class Optional<T> {
  private constructor(
    readonly isPresent: boolean,
    private readonly valueIfPresent: T | undefined
  ) {}
  get(): T {
    if (!this.isPresent) {
      throw new Error("Optional.get() called but isPresent is false");
    }
    return this.valueIfPresent!;
  }
  orElse(other: T): T {
    if (this.isPresent) return this.valueIfPresent!;
    else return other;
  }

  private static emptyInstance = new Optional(false, undefined);
  static empty<T>(): Optional<T> {
    return Optional.emptyInstance as unknown as Optional<T>;
  }
  static of<T>(value: T): Optional<T> {
    return new Optional(true, value);
  }
}
