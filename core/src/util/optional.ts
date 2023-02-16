import {
  IOptionalMessage,
  OptionalMessage,
} from "../../generated/proto_compiled";
import { SafeWeakRef } from "./safe_weak_ref";
import { Serializer } from "./serializers";

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

  /**
   * Map the value by f if present, else returning an empty Optional.
   * @param  f               [description]
   * @return                [description]
   */
  map<U>(f: (value: T) => U): Optional<U> {
    if (this.isPresent) return Optional.of(f(this.valueIfPresent!));
    else return Optional.empty();
  }

  toString(): string {
    if (this.isPresent) {
      return `Optional.of(${this.get()})`;
    } else return "Optional.empty()";
  }

  private static emptyInstance = new Optional<unknown>(false, undefined);
  static empty<T>(): Optional<T> {
    return Optional.emptyInstance as Optional<T>;
  }
  static of<T>(value: T): Optional<T> {
    return new Optional(true, value);
  }
}

export class OptionalSerializer<T> implements Serializer<Optional<T>> {
  private constructor(private readonly valueSerializer: Serializer<T>) {}

  serialize(value: Optional<T>): Uint8Array {
    const imessage: IOptionalMessage = {};
    if (value.isPresent) {
      imessage.valueIfPresent = this.valueSerializer.serialize(value.get());
    }
    const message = OptionalMessage.create(imessage);
    return OptionalMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): Optional<T> {
    const decoded = OptionalMessage.decode(message);
    if (Object.prototype.hasOwnProperty.call(decoded, "valueIfPresent")) {
      return Optional.of(
        this.valueSerializer.deserialize(decoded.valueIfPresent)
      );
    } else return Optional.empty();
  }

  // Weak in both keys and values.
  private static cache = new WeakMap<
    Serializer<unknown>,
    WeakRef<OptionalSerializer<unknown>>
  >();

  static getInstance<T>(valueSerializer: Serializer<T>): OptionalSerializer<T> {
    const existingWeak = OptionalSerializer.cache.get(valueSerializer);
    if (existingWeak !== undefined) {
      const existing = existingWeak.deref();
      if (existing !== undefined) return <OptionalSerializer<T>>existing;
    }
    const ret = new OptionalSerializer(valueSerializer);
    OptionalSerializer.cache.set(valueSerializer, new SafeWeakRef(ret));
    return ret;
  }
}
