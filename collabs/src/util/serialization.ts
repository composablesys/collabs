import { Runtime, Collab } from "../core/";
import {
  ArrayMessage,
  CollabReference,
  DefaultSerializerMessage,
  IDefaultSerializerMessage,
  IOptionalSerializerMessage,
  ObjectMessage,
  OptionalSerializerMessage,
  PairSerializerMessage,
} from "../../generated/proto_compiled";
import { Buffer } from "buffer";
import { Optional } from "./optional";

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
 * string, number, boolean, undefined, and null types are passed by-value.
 * Collab types are sent by-reference, using
 * [[Runtime.getNamePath]] to identify different replicas
 * of the same Collab.  Arrays and objects are serialized
 * recursively. Note that object classes are not preserved
 *
 * TODO: restrictions, e.g., functions. Structured clone alg,
 * like window.postMessage?
 */
export class DefaultSerializer<T> implements Serializer<T> {
  private constructor(private readonly runtime: Runtime) {}

  // Only weak in keys, since we expect a Runtime's DefaultSerializer
  // to exist for as long as the Runtime.
  private static instancesByRuntime = new WeakMap<
    Runtime,
    DefaultSerializer<any>
  >();
  static getInstance<U>(runtime: Runtime): DefaultSerializer<U> {
    let instance = DefaultSerializer.instancesByRuntime.get(runtime);
    if (instance === undefined) {
      instance = new DefaultSerializer(runtime);
      DefaultSerializer.instancesByRuntime.set(runtime, instance);
    }
    return instance;
  }

  serialize(value: T): Uint8Array {
    let message: IDefaultSerializerMessage;
    switch (typeof value) {
      case "string":
        message = { stringValue: value };
        break;
      case "number":
        message = { numberValue: value };
        break;
      case "boolean":
        message = { booleanValue: value };
        break;
      case "undefined":
        message = { undefinedValue: true };
        break;
      default:
        if (value === null) {
          message = { nullValue: true };
        } else if (value instanceof Collab) {
          message = {
            collabValue: CollabReference.create({
              namePath: this.runtime.getNamePath(value),
            }),
          };
        } else if (value instanceof Uint8Array) {
          message = {
            bytesValue: value,
          };
        } else if (value instanceof Array) {
          // Technically types are bad for recursive
          // call to this.serialize, but it's okay because
          // we ignore our generic type.
          message = {
            arrayValue: ArrayMessage.create({
              elements: value.map((element) => this.serialize(element)),
            }),
          };
        } else {
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
        }
    }
    return DefaultSerializerMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array): T {
    let decoded = DefaultSerializerMessage.decode(message);
    let ans: any;
    switch (decoded.value) {
      case "stringValue":
        ans = decoded.stringValue;
        break;
      case "numberValue":
        ans = decoded.numberValue;
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
      case "collabValue":
        ans = this.runtime.getDescendant(decoded.collabValue!.namePath!);
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
          ans[key] = this.deserialize(serialized);
        }
        break;
      case "bytesValue":
        ans = decoded.bytesValue;
        break;
      default:
        throw new Error("Bad message format: decoded.value=" + decoded.value);
    }
    // No way of checking if it's really type T.
    return ans as T;
  }
}

export class TextSerializer implements Serializer<string> {
  private constructor() {}
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
  private constructor() {}
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
    Serializer<any>,
    WeakRef<SingletonSerializer<any>>
  >();

  static getInstance<T>(
    valueSerializer: Serializer<T>
  ): SingletonSerializer<T> {
    const existingWeak = SingletonSerializer.cache.get(valueSerializer);
    if (existingWeak !== undefined) {
      const existing = existingWeak.deref();
      if (existing !== undefined) return existing;
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
  private constructor() {}

  serialize(value: string): Uint8Array {
    return stringAsBytes(value);
  }

  deserialize(message: Uint8Array): string {
    return bytesAsString(message);
  }

  static readonly instance = new StringAsArraySerializer();
}

/**
 * Compares two Uint8Array's for equality.
 *
 * TODO: optimize; delete if unused.
 */
export function byteArrayEquals(one: Uint8Array, two: Uint8Array): boolean {
  if (one.length !== two.length) return false;
  for (let i = 0; i < one.length; i++) {
    if (one[i] !== two[i]) return false;
  }
  return true;
}

// TODO: cache instances?
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

// TODO: cache instances?
/**
 * Serializes [[Collab]]s using their name path with
 * respect to a specified
 * base Collab or the [[Runtime]] (the default),
 * as returned by `base.getNamePath`.
 * The base must be an ancestor of all serialized Collabs.
 *
 * This is more efficient than using DefaultSerializer
 * when base is not the [[Runtime]].  It is more efficient
 * the closer the serialized values are to base within
 * the Collab hierarchy, and best when base is their parent.
 */
export class CollabSerializer<C extends Collab> implements Serializer<C> {
  /**
   * [constructor description]
   * @param base
   */
  constructor(private readonly base: Collab | Runtime) {}

  serialize(value: C): Uint8Array {
    const message = CollabReference.create({
      namePath: this.base.getNamePath(value),
    });
    return CollabReference.encode(message).finish();
  }

  deserialize(message: Uint8Array): C {
    const decoded = CollabReference.decode(message);
    return this.base.getDescendant(decoded.namePath) as C;
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
    if (decoded.hasOwnProperty("valueIfPresent")) {
      return Optional.of(
        this.valueSerializer.deserialize(decoded.valueIfPresent)
      );
    } else return Optional.empty();
  }

  // Weak in both keys and values.
  private static cache = new WeakMap<
    Serializer<any>,
    WeakRef<OptionalSerializer<any>>
  >();

  static getInstance<T>(valueSerializer: Serializer<T>): OptionalSerializer<T> {
    const existingWeak = OptionalSerializer.cache.get(valueSerializer);
    if (existingWeak !== undefined) {
      const existing = existingWeak.deref();
      if (existing !== undefined) return existing;
    }
    const ret = new OptionalSerializer(valueSerializer);
    OptionalSerializer.cache.set(valueSerializer, new WeakRef(ret));
    return ret;
  }
}

const ENCODING: "base64" = "base64";
export function bytesAsString(array: Uint8Array) {
  return Buffer.from(array).toString(ENCODING);
}
export function stringAsBytes(str: string) {
  return new Uint8Array(Buffer.from(str, ENCODING));
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
