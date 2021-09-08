import { Runtime, Crdt, isRuntime } from "../core/";
import {
  ArrayMessage,
  CrdtReference,
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
 * A serializer for elements (keys, values, etc.) in Crdt collections,
 * so that they can
 * be sent to other replicas in Crdt operations.
 *
 * DefaultCollectionSerializer.getInstance() should suffice for most uses.
 */
export interface ElementSerializer<T> {
  serialize(value: T): Uint8Array;
  deserialize(message: Uint8Array, runtime: Runtime): T;
}

/**
 * Default serializer.
 * string, number, boolean, undefined, and null types are passed by-value.
 * Crdt types are sent by-reference, using the Crdt's
 * rootId and pathToRoot to identify different replicas
 * of the same Crdt.  Other types are passed by-value using BSON
 * (via https://github.com/mongodb/js-bson).
 */

export class DefaultElementSerializer<T> implements ElementSerializer<T> {
  private constructor() {}

  private static instance = new DefaultElementSerializer<any>();
  static getInstance<U>(): DefaultElementSerializer<U> {
    return DefaultElementSerializer.instance;
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
        } else if (value instanceof Crdt) {
          message = {
            crdtValue: CrdtReference.create({
              pathToBase: value.pathToRoot(),
            }),
          };
        } else if (value instanceof Uint8Array) {
          message = {
            bytesValue: value,
          };
        } else if (value instanceof Array) {
          // TODO: technically types are bad for recursive
          // call to this.serialize.
          message = {
            arrayValue: ArrayMessage.create({
              elements: value.map((element) => this.serialize(element)),
            }),
          };
        } else {
          // TODO: technically types are bad for recursive
          // call to this.serialize.
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

  deserialize(message: Uint8Array, runtime: Runtime): T {
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
      case "crdtValue":
        ans = runtime.getCrdtByReference(decoded.crdtValue!.pathToBase!);
        break;
      case "arrayValue":
        ans = decoded.arrayValue!.elements!.map((serialized) =>
          this.deserialize(serialized, runtime)
        );
        break;
      case "objectValue":
        ans = {};
        for (const [key, serialized] of Object.entries(
          decoded.objectValue!.properties!
        )) {
          ans[key] = this.deserialize(serialized, runtime);
        }
        break;
      case "bytesValue":
        ans = decoded.bytesValue;
        break;
      default:
        throw new Error("Bad message format: decoded.value=" + decoded.value);
    }
    // TODO: throw an error if ans is not of type T?
    return ans as T;
  }
}

export class TextSerializer implements ElementSerializer<string> {
  private constructor() {}
  serialize(value: string): Uint8Array {
    return new Uint8Array(Buffer.from(value, "utf-8"));
  }
  deserialize(message: Uint8Array, _runtime: Runtime): string {
    return Buffer.from(message).toString("utf-8");
  }
  static instance = new TextSerializer();
}

/**
 * Only works on char arrays
 */
export class TextArraySerializer implements ElementSerializer<string[]> {
  private constructor() {}
  serialize(value: string[]): Uint8Array {
    return new Uint8Array(Buffer.from(value.join(""), "utf-8"));
  }
  deserialize(message: Uint8Array, _runtime: Runtime): string[] {
    return [...Buffer.from(message).toString("utf-8")];
  }
  static instance = new TextArraySerializer();
}

export class SingletonSerializer<T> implements ElementSerializer<[T]> {
  private constructor(private readonly valueSerializer: ElementSerializer<T>) {}

  serialize(value: [T]): Uint8Array {
    return this.valueSerializer.serialize(value[0]);
  }

  deserialize(message: Uint8Array, runtime: Runtime): [T] {
    return [this.valueSerializer.deserialize(message, runtime)];
  }

  private static cache: WeakMap<
    ElementSerializer<any>,
    SingletonSerializer<any>
  > = new WeakMap();

  static of<T>(valueSerializer: ElementSerializer<T>): ElementSerializer<[T]> {
    let existing = this.cache.get(valueSerializer);
    if (existing === undefined) {
      existing = new SingletonSerializer(valueSerializer);
      this.cache.set(valueSerializer, existing);
    }
    return existing;
  }
}

/**
 * Serializes strings using stringAsBytes.  This is necessary
 * for strings that have been created from byte arrays using
 * bytesAsString, since those might not be UTF-8.
 */
export class StringAsArraySerializer implements ElementSerializer<string> {
  private constructor() {}

  serialize(value: string): Uint8Array {
    return stringAsBytes(value);
  }

  deserialize(message: Uint8Array, _runtime: Runtime): string {
    return bytesAsString(message);
  }

  static instance = new StringAsArraySerializer();
}

/**
 * Compares two Uint8Array's for equality.
 */
export function byteArrayEquals(one: Uint8Array, two: Uint8Array): boolean {
  if (one.length !== two.length) return false;
  for (let i = 0; i < one.length; i++) {
    if (one[i] !== two[i]) return false;
  }
  return true;
}

export class PairSerializer<T, U> implements ElementSerializer<[T, U]> {
  constructor(
    private readonly oneSerializer: ElementSerializer<T>,
    private readonly twoSerializer: ElementSerializer<U>
  ) {}

  serialize(value: [T, U]): Uint8Array {
    const message = PairSerializerMessage.create({
      one: this.oneSerializer.serialize(value[0]),
      two: this.twoSerializer.serialize(value[1]),
    });
    return PairSerializerMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array, runtime: Runtime): [T, U] {
    const decoded = PairSerializerMessage.decode(message);
    return [
      this.oneSerializer.deserialize(decoded.one, runtime),
      this.twoSerializer.deserialize(decoded.two, runtime),
    ];
  }
}

/**
 * Serializes Crdts using their path to a specified
 * base Crdt (default the root), which must be an
 * ancestor of all serialized Crdts.
 *
 * This is more efficient than using DefaultSerializer
 * when base is not the root.  It is more efficient
 * the closer the serialized values are to base within
 * the Crdt hierarchy, and best when base is their parent.
 */
export class CrdtSerializer<C extends Crdt> implements ElementSerializer<C> {
  /**
   * [constructor description]
   * @param base if omitted, uses the rootCrdt
   */
  constructor(private readonly base?: Crdt) {}

  serialize(value: C): Uint8Array {
    let pathToBase = [];
    for (
      let current: Crdt = value;
      !(
        current === this.base ||
        (this.base === undefined && isRuntime(current.parent))
      );
      current = current.parent as Crdt
    ) {
      pathToBase.push(current.name);
    }
    const message = CrdtReference.create({
      pathToBase,
    });
    return CrdtReference.encode(message).finish();
  }

  deserialize(message: Uint8Array, runtime: Runtime): C {
    const decoded = CrdtReference.decode(message);
    return runtime.getCrdtByReference(decoded.pathToBase!, this.base) as C;
  }
}

export class OptionalSerializer<T> implements ElementSerializer<Optional<T>> {
  private constructor(private readonly valueSerializer: ElementSerializer<T>) {}

  serialize(value: Optional<T>): Uint8Array {
    const imessage: IOptionalSerializerMessage = {};
    if (value.isPresent) {
      imessage.valueIfPresent = this.valueSerializer.serialize(value.get());
    }
    const message = OptionalSerializerMessage.create(imessage);
    return OptionalSerializerMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array, runtime: Runtime): Optional<T> {
    const decoded = OptionalSerializerMessage.decode(message);
    if (decoded.hasOwnProperty("valueIfPresent")) {
      return Optional.of(
        this.valueSerializer.deserialize(decoded.valueIfPresent, runtime)
      );
    } else return Optional.empty();
  }

  // Weak in both keys and values.
  private static cache = new WeakMap<
    ElementSerializer<any>,
    WeakRef<OptionalSerializer<any>>
  >();

  static of<T>(valueSerializer: ElementSerializer<T>): OptionalSerializer<T> {
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
 * Apply this function to protobuf.js [u/s]int64 output values
 * to convert them to the nearest JS number (double).
 * For safe integers, this is exact.
 *
 * In theory you can "request" protobuf.js to not use
 * longs by not depending on the Long library, but that is
 * flaky because one of our dependencies might import it.
 */
export function int64AsNumber(num: number | Long): number {
  if (typeof num === "number") return num;
  else return num.toNumber();
}
