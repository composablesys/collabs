import { Buffer } from "buffer";
import {
  ArrayMessage,
  CollabIDMessage,
  DefaultSerializerMessage,
  IDefaultSerializerMessage,
  ObjectMessage,
  PairSerializerMessage,
} from "../../generated/proto_compiled";
import { Collab, CollabID } from "../core";
import { Optional } from "./optional";
import { SafeWeakRef } from "./safe_weak_ref";

/**
 * A serializer for values of type `T`.
 *
 * Collabs with a generic type `T`, like [[CVar]]`<T>` or
 * [[CValueSet]]`<T>`, need a Serializer\<T\> so that they can send
 * values of type `T` from one replica to another.
 *
 * By default,
 * all built-in Collabs use [[DefaultSerializer]], which permits
 * JSON values and some others. To use more general `T`
 * or to optimize the encoding, you must supply your own
 * Serializer\<T\>, typically in the Collab constructor's
 * `options` parameter.
 *
 * Serializers provided with the library include [[DefaultSerializer]],
 * [[StringSerializer]], [[TrivialSerializer]], [[SingletonSerializer]],
 * [[PairSerializer]], and [[CollabIDSerializer]].
 *
 * See also: [[Bytes]], which encodes Uint8Arrays as strings.
 */
export interface Serializer<T> {
  /**
   * Returns a Uint8Array that is the serialized form of value.
   *
   * To recover the original value, use [[deserialize]].
   */
  serialize(value: T): Uint8Array;
  /**
   * Inverse of [[serialize]].
   *
   * Typically, this returns a deep clone of the original value, not
   * the same literal reference. Indeed, it is impossible to return
   * the original reference on a different replica.
   */
  deserialize(message: Uint8Array): T;
}

// In this file, we generally cache instances in case each
// element of a collection constructs a derived serializer
// from a fixed given one.

/**
 * Default [[Serializer]].
 *
 * Supported types are a superset of JSON:
 * - Primitive types (string, number, boolean, undefined, null)
 * - Arrays and plain (non-class) objects, serialized recursively
 * - [[CollabID]]s (covered by the previous case since they are plain objects)
 * - Uint8Array
 * - [[Optional]]<T>, with T serialized recursively.
 *
 * All other types cause an error during [[serialize]].
 *
 * Construct using [[getInstance]].
 */
export class DefaultSerializer<T> implements Serializer<T> {
  private constructor() {
    // Singleton.
  }

  private static instance = new this();

  /**
   * Returns an instance of [[DefaultSerializer]].
   *
   * Internally, all instances are the same literal object.
   */
  static getInstance<T>(): DefaultSerializer<T> {
    return <DefaultSerializer<T>>this.instance;
  }

  serialize(value: T): Uint8Array {
    let message: IDefaultSerializerMessage;
    switch (typeof value) {
      case "string":
        message = { stringValue: value };
        break;
      case "number":
        if (Number.isSafeInteger(value)) {
          message = { intValue: value };
        } else {
          message = { doubleValue: value };
        }
        break;
      case "boolean":
        message = { booleanValue: value };
        break;
      case "undefined":
        message = { undefinedValue: true };
        break;
      case "object":
        if (value === null) {
          message = { nullValue: true };
        } else if (value instanceof Uint8Array) {
          message = {
            bytesValue: value,
          };
        } else if (Array.isArray(value)) {
          // Technically types are bad for recursive
          // call to this.serialize, but it's okay because
          // we ignore our generic type.
          message = {
            arrayValue: ArrayMessage.create({
              elements: value.map((element) => this.serialize(element)),
            }),
          };
        } else if (value instanceof Optional) {
          message = {
            optionalValue: {
              valueIfPresent: value.isPresent
                ? this.serialize(value.get())
                : undefined,
            },
          };
        } else {
          const constructor = (<object>(<unknown>value)).constructor;
          if (constructor === Object) {
            // Technically types are bad for recursive
            // call to this.serialize, but it's okay because
            // we ignore our generic type.
            const properties: { [key: string]: Uint8Array } = {};
            for (const [key, property] of Object.entries(value)) {
              properties[key] = this.serialize(property);
            }
            message = {
              objectValue: ObjectMessage.create({
                properties,
              }),
            };
          } else if (value instanceof Collab) {
            throw new Error(
              "Collab serialization is not supported; serialize a CollabID instead"
            );
          } else {
            throw new Error(
              `Unsupported class type for DefaultSerializer: ${constructor.name}; you must use a custom serializer or a plain (non-class) Object`
            );
          }
        }
        break;
      default:
        throw new Error(
          `Unsupported type for DefaultSerializer: ${typeof value}; you must use a custom Serializer`
        );
    }
    return DefaultSerializerMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): T {
    const decoded = DefaultSerializerMessage.decode(message);
    let ans: unknown;
    switch (decoded.value) {
      case "stringValue":
        ans = decoded.stringValue;
        break;
      case "intValue":
        ans = int64AsNumber(decoded.intValue);
        break;
      case "doubleValue":
        ans = decoded.doubleValue;
        break;
      case "booleanValue":
        ans = decoded.booleanValue;
        break;
      case "undefinedValue":
        ans = undefined;
        break;
      case "nullValue":
        ans = null;
        break;
      case "arrayValue":
        ans = decoded.arrayValue!.elements!.map((serialized) =>
          this.deserialize(serialized)
        );
        break;
      case "objectValue":
        ans = {};
        for (const [key, serialized] of Object.entries(
          decoded.objectValue!.properties!
        )) {
          (<Record<string, unknown>>ans)[key] = this.deserialize(serialized);
        }
        break;
      case "bytesValue":
        ans = decoded.bytesValue;
        break;
      case "optionalValue":
        if (
          Object.prototype.hasOwnProperty.call(
            decoded.optionalValue,
            "valueIfPresent"
          )
        ) {
          ans = Optional.of(
            this.deserialize(decoded.optionalValue!.valueIfPresent!)
          );
        } else ans = Optional.empty();
        break;
      default:
        throw new Error(`Bad message format: decoded.value=${decoded.value}`);
    }
    // No way of checking if it's really type T.
    return ans as T;
  }
}

/**
 * Serializer for Uint8Array that is the identity function.
 *
 * This is a singleton class; use [[instance]]
 * instead of the constructor.
 */
export class Uint8ArraySerializer implements Serializer<Uint8Array> {
  private constructor() {
    // Use Uint8ArraySerializer.instance instead.
  }
  serialize(value: Uint8Array): Uint8Array {
    return value;
  }
  deserialize(message: Uint8Array): Uint8Array {
    return message;
  }
  static readonly instance = new Uint8ArraySerializer();
}

/**
 * Serializer for string that uses utf-8 encoding.
 *
 * This is a singleton class; use [[instance]]
 * instead of the constructor.
 */
export class StringSerializer implements Serializer<string> {
  private constructor() {
    // Use StringSerializer.instance instead.
  }
  serialize(value: string): Uint8Array {
    return new Uint8Array(Buffer.from(value, "utf-8"));
  }
  deserialize(message: Uint8Array): string {
    return Buffer.from(message).toString("utf-8");
  }
  static readonly instance = new StringSerializer();
}

/**
 * Serializes \[T\] using a serializer for T. This is slightly more efficient
 * than [[DefaultSerializer]], and it works with arbitrary T.
 *
 * Construct using [[getInstance]].
 */
export class SingletonSerializer<T> implements Serializer<[T]> {
  private constructor(private readonly valueSerializer: Serializer<T>) {}

  serialize(values: [T]): Uint8Array {
    return this.valueSerializer.serialize(values[0]);
  }

  deserialize(message: Uint8Array): [T] {
    return [this.valueSerializer.deserialize(message)];
  }

  // Weak in both keys and values.
  private static cache = new WeakMap<
    Serializer<unknown>,
    WeakRef<SingletonSerializer<unknown>>
  >();

  /**
   * Returns an instance of [[SingletonSerializer]] that uses valueSerializer
   * to serialize the singleton value.
   *
   * This method may cache instances internally to save memory.
   */
  static getInstance<T>(
    valueSerializer: Serializer<T>
  ): SingletonSerializer<T> {
    const existingWeak = this.cache.get(valueSerializer);
    if (existingWeak !== undefined) {
      const existing = existingWeak.deref();
      if (existing !== undefined) return <SingletonSerializer<T>>existing;
    }
    const ret = new SingletonSerializer(valueSerializer);
    this.cache.set(valueSerializer, new SafeWeakRef(ret));
    return ret;
  }
}

/**
 * Serializes T\[\] using a serializer for T. This is slightly more efficient
 * than [[DefaultSerializer]], and it works with arbitrary T.
 *
 * Construct using [[getInstance]].
 */
export class ArraySerializer<T> implements Serializer<T[]> {
  private constructor(private readonly valueSerializer: Serializer<T>) {}

  serialize(values: T[]): Uint8Array {
    const message = ArrayMessage.create({
      elements: values.map((value) => this.valueSerializer.serialize(value)),
    });
    return ArrayMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): T[] {
    const decoded = ArrayMessage.decode(message);
    return decoded.elements.map((bytes) =>
      this.valueSerializer.deserialize(bytes)
    );
  }

  // Weak in both keys and values.
  private static cache = new WeakMap<
    Serializer<unknown>,
    WeakRef<ArraySerializer<unknown>>
  >();

  /**
   * Returns an instance of [[ArraySerializer]] that uses valueSerializer
   * to serialize each value.
   *
   * This method may cache instances internally to save memory.
   */
  static getInstance<T>(valueSerializer: Serializer<T>): ArraySerializer<T> {
    const existingWeak = this.cache.get(valueSerializer);
    if (existingWeak !== undefined) {
      const existing = existingWeak.deref();
      if (existing !== undefined) return <ArraySerializer<T>>existing;
    }
    const ret = new ArraySerializer(valueSerializer);
    this.cache.set(valueSerializer, new SafeWeakRef(ret));
    return ret;
  }
}

/**
 * Serializes \[T, U\] using serializers for T and U. This is slightly more efficient
 * than [[DefaultSerializer]], and it works with arbitrary T and U.
 */
export class PairSerializer<T, U> implements Serializer<[T, U]> {
  constructor(
    private readonly oneSerializer: Serializer<T>,
    private readonly twoSerializer: Serializer<U>
  ) {}

  serialize(value: [T, U]): Uint8Array {
    const message = PairSerializerMessage.create({
      one: this.oneSerializer.serialize(value[0]),
      two: this.twoSerializer.serialize(value[1]),
    });
    return PairSerializerMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): [T, U] {
    const decoded = PairSerializerMessage.decode(message);
    return [
      this.oneSerializer.deserialize(decoded.one),
      this.twoSerializer.deserialize(decoded.two),
    ];
  }
}

const emptyUint8Array = new Uint8Array();

/**
 * Serializes a fixed value as an empty Uint8Array.
 */
export class TrivialSerializer<T> implements Serializer<T> {
  /**
   * @param value The value that [[deserialize]] will always return.
   */
  constructor(readonly value: T) {}

  serialize(_value: T): Uint8Array {
    return emptyUint8Array;
  }

  deserialize(_message: Uint8Array): T {
    return this.value;
  }
}

/**
 * Serializes [[CollabID]]s. This is slightly more efficient
 * than [[DefaultSerializer]].
 *
 * Construct using [[getInstance]].
 */
export class CollabIDSerializer<C extends Collab>
  implements Serializer<CollabID<C>>
{
  private constructor() {
    // Singleton.
  }

  private static instance = new this<Collab>();

  /**
   * Returns an instance of [[CollabIDSerializer]].
   *
   * Internally, all instances are the same literal object.
   */
  static getInstance<C extends Collab>(): CollabIDSerializer<C> {
    return this.instance;
  }

  serialize(value: CollabID<C>): Uint8Array {
    const message = CollabIDMessage.create({ namePath: value.namePath });
    return CollabIDMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): CollabID<C> {
    const decoded = CollabIDMessage.decode(message);
    return { namePath: decoded.namePath };
  }
}

/**
 * Internal utility for working with protobuf encodings.
 *
 * Apply this function to protobuf.js uint64 and sint64 output values
 * to convert them to the nearest JS number (double).
 * For safe integers, this is exact.
 */
export function int64AsNumber(num: number | Long): number {
  // In theory you can "request" protobuf.js to not use
  // Longs by not depending on the Long library, in which case
  // you can just cast to number. But that is
  // flaky because a dependency might import Long.
  if (typeof num === "number") return num;
  else return num.toNumber();
}
