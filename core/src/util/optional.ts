import {
  IOptionalMessage,
  OptionalMessage,
} from "../../generated/proto_compiled";
import { SafeWeakRef } from "./safe_weak_ref";
import { Serializer, protobufHas } from "./serializers";

/**
 * An optional value of type T.
 *
 * Construct using [[Optional.of]] or [[Optional.empty]].
 *
 * Collabs uses this utility type in places where `T | undefined` or
 * `T | null` is inappropriate because T may itself be
 * null/undefined.
 *
 * Local data structure - not a [[Collab]].
 */
export class Optional<T> {
  private constructor(
    /** Whether the value is present. */
    readonly isPresent: boolean,
    private readonly valueIfPresent: T | undefined
  ) {}

  /**
   * Returns the value if present, else throwing an error.
   */
  get(): T {
    if (!this.isPresent) {
      throw new Error("Optional.get() called but isPresent is false");
    }
    return this.valueIfPresent!;
  }

  /**
   * Returns the value if present, else returning other.
   */
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
  /**
   * Returns an empty (not present) Optional.
   *
   * Internally, all empty Optionals are the same literal object.
   */
  static empty<T>(): Optional<T> {
    return Optional.emptyInstance as Optional<T>;
  }

  /**
   * Returns a new present Optional representing value.
   */
  static of<T>(value: T): Optional<T> {
    return new Optional(true, value);
  }
}

/**
 * Serializes [[Optional]]`<T>` using a serializer for T.
 * This is slightly more efficient
 * than [[DefaultSerializer]], and it works with arbitrary T.
 *
 * Construct using [[getInstance]].
 */
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
    if (protobufHas(decoded, "valueIfPresent")) {
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

  /**
   * Returns an instance of [[OptionalSerializer]] that uses valueSerializer
   * to serialize present values.
   *
   * This method may cache instances internally to save memory.
   */
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
