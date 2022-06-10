import { Buffer } from "buffer";
import { Collab } from "../core/";
import {
  ArrayMessage,
  CollabIDMessage,
  DefaultSerializerMessage,
  IDefaultSerializerMessage,
  IOptionalSerializerMessage,
  ObjectMessage,
  OptionalSerializerMessage,
  PairSerializerMessage,
} from "../../generated/proto_compiled";
import { Optional } from "./optional";
import { CollabID } from "./collab_id";

/**
 * A serializer for values of type `T` (e.g., elements
 * in Collabs collections), so that they can
 * be sent to other replicas in Collabs operations.
 *
 * [[DefaultSerializer.getInstance]]`(runtime)` should suffice for most uses.
 */
export interface Serializer<T> {
  serialize(value: T): Uint8Array;
  deserialize(message: Uint8Array): T;
}

// In this file, we generally cache instances in case each
// element of a collection constructs a derived serializer
// from a fixed given one.

/**
 * Default serializer.
 *
 * Supported types:
 * - Primitive types (string, number, boolean, undefined, null)
 * - [[CollabID]]s
 * - Arrays and plain (non-class) objects, serialized recursively.
 *
 * All other types cause an error during [[serialize]].
 */
export class DefaultSerializer<T> implements Serializer<T> {
  private constructor() {
    // Constructor is just here to mark it as private.
  }

  // Only weak in keys, since we expect a Runtime's DefaultSerializer
  // to exist for as long as the Runtime.
  private static instance = new DefaultSerializer();

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
        } else if (value instanceof CollabID) {
          message = {
            collabIDValue: CollabIDMessage.create({
              pathToBase: value.namePath(),
            }),
          };
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
      case "collabIDValue":
        ans = new CollabID(decoded.collabIDValue!.pathToBase!);
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
      default:
        throw new Error(`Bad message format: decoded.value=${decoded.value}`);
    }
    // No way of checking if it's really type T.
    return ans as T;
  }
}

export class TextSerializer implements Serializer<string> {
  private constructor() {
    // Use TextSerializer.instance instead.
  }
  serialize(value: string): Uint8Array {
    return new Uint8Array(Buffer.from(value, "utf-8"));
  }
  deserialize(message: Uint8Array): string {
    return Buffer.from(message).toString("utf-8");
  }
  static readonly instance = new TextSerializer();
}

/**
 * Only works on char arrays (each element must be a
 * single-character string).
 */
export class TextArraySerializer implements Serializer<string[]> {
  private constructor() {
    // Use TextArraySerializer.instance instead.
  }
  serialize(value: string[]): Uint8Array {
    return new Uint8Array(Buffer.from(value.join(""), "utf-8"));
  }
  deserialize(message: Uint8Array): string[] {
    return [...Buffer.from(message).toString("utf-8")];
  }
  static readonly instance = new TextArraySerializer();
}

/**
 * Serializes [T] using a serializer for T.  This is slightly more efficient
 * than the default serializer, and also works with arbitrary T.
 */
export class SingletonSerializer<T> implements Serializer<[T]> {
  private constructor(private readonly valueSerializer: Serializer<T>) {}

  serialize(value: [T]): Uint8Array {
    return this.valueSerializer.serialize(value[0]);
  }

  deserialize(message: Uint8Array): [T] {
    return [this.valueSerializer.deserialize(message)];
  }

  // Weak in both keys and values.
  private static cache = new WeakMap<
    Serializer<unknown>,
    WeakRef<SingletonSerializer<unknown>>
  >();

  static getInstance<T>(
    valueSerializer: Serializer<T>
  ): SingletonSerializer<T> {
    const existingWeak = SingletonSerializer.cache.get(valueSerializer);
    if (existingWeak !== undefined) {
      const existing = existingWeak.deref();
      if (existing !== undefined) return <SingletonSerializer<T>>existing;
    }
    const ret = new SingletonSerializer(valueSerializer);
    SingletonSerializer.cache.set(valueSerializer, new WeakRef(ret));
    return ret;
  }
}

/**
 * Serializes strings that are outputs of
 * [[bytesAsString]], using [[stringAsBytes]].
 *
 * This is more efficient than using a literal string
 * encoding, since we know the strings have a restricted
 * form.
 */
export class StringAsArraySerializer implements Serializer<string> {
  private constructor() {
    // Use StringAsArraySerializer.instance instead.
  }

  serialize(value: string): Uint8Array {
    return stringAsBytes(value);
  }

  deserialize(message: Uint8Array): string {
    return bytesAsString(message);
  }

  static readonly instance = new StringAsArraySerializer();
}

// OPT: cache instances?
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

// OPT: cache instances?
/**
 * Serializes [[CollabID]]s using their [[Collab]]'s name path with
 * respect to a specified
 * base [[Collab]] or [[Runtime]].
 *
 * The base must be an ancestor of all serialized `CollabID`s' `Collab`s.
 *
 * This is more efficient (in terms of serialized size)
 * than using DefaultSerializer
 * when base is not the [[Runtime]].  It is better
 * the closer the serialized values are to base within
 * the Collab hierarchy, and best when base is their parent.
 */
export class CollabIDSerializer<C extends Collab>
  implements Serializer<CollabID<C>>
{
  constructor(private readonly base?: Collab) {}

  serialize(value: CollabID<C>): Uint8Array {
    // OPT: interface with CollabID to cache this.base's namePath.length,
    // instead of recalculating its whole namePath each time?
    // Although then we lose the ability to check ancestry.
    const message = CollabIDMessage.create({
      pathToBase: value.namePath(this.base),
    });
    return CollabIDMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): CollabID<C> {
    const decoded = CollabIDMessage.decode(message);
    return new CollabID(decoded.pathToBase, this.base);
  }
}

export class OptionalSerializer<T> implements Serializer<Optional<T>> {
  private constructor(private readonly valueSerializer: Serializer<T>) {}

  serialize(value: Optional<T>): Uint8Array {
    const imessage: IOptionalSerializerMessage = {};
    if (value.isPresent) {
      imessage.valueIfPresent = this.valueSerializer.serialize(value.get());
    }
    const message = OptionalSerializerMessage.create(imessage);
    return OptionalSerializerMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): Optional<T> {
    const decoded = OptionalSerializerMessage.decode(message);
    if (Object.hasOwnProperty.call(decoded, "valueIfPresent")) {
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
    OptionalSerializer.cache.set(valueSerializer, new WeakRef(ret));
    return ret;
  }
}

const ENCODING = "base64" as const;
export function bytesAsString(array: Uint8Array) {
  return Buffer.from(array).toString(ENCODING);
}
export function stringAsBytes(str: string) {
  return new Uint8Array(Buffer.from(str, ENCODING));
}

/**
 * Compares two Uint8Array's for equality.
 */
export function byteArrayEquals(one: Uint8Array, two: Uint8Array): boolean {
  if (one.length !== two.length) return false;
  // OPT: convert to a Uint32Array
  // and do 4-byte comparisons at a time?
  for (let i = 0; i < one.length; i++) {
    if (one[i] !== two[i]) return false;
  }
  return true;
}

/**
 * Apply this function to protobuf.js uint64 and sint64 output values
 * to convert them to the nearest JS number (double).
 * For safe integers, this is exact.
 *
 * In theory you can "request" protobuf.js to not use
 * Longs by not depending on the Long library, but that is
 * flaky because a dependency might import it.
 */
export function int64AsNumber(num: number | Long): number {
  if (typeof num === "number") return num;
  else return num.toNumber();
}
