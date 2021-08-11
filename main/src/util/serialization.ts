import { Runtime, Crdt } from "../core/";
import {
  ArrayMessage,
  CrdtReference,
  DefaultSerializerMessage,
  IDefaultSerializerMessage,
  ObjectMessage,
  PairSerializerMessage,
} from "../../generated/proto_compiled";
import { RootCrdt } from "../core/runtime";

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
              pathToBase: value.pathToRoot().map(stringAsArray),
            }),
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
        ans = runtime.getCrdtByReference(
          decoded.crdtValue!.pathToBase!.map(arrayAsString)
        );
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
 * Serializes strings using stringAsArray.  This is necessary
 * for strings that have been created from byte arrays using
 * arrayAsString, since those might not be UTF-8.
 */
export class StringAsArraySerializer implements ElementSerializer<string> {
  private constructor() {}

  serialize(value: string): Uint8Array {
    return stringAsArray(value);
  }

  deserialize(message: Uint8Array, _runtime: Runtime): string {
    return arrayAsString(message);
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
        (this.base === undefined && (current as RootCrdt).isRootCrdt)
      );
      current = current.parent
    ) {
      pathToBase.push(current.name);
    }
    const message = CrdtReference.create({
      pathToBase: pathToBase.map(stringAsArray),
    });
    return CrdtReference.encode(message).finish();
  }

  deserialize(message: Uint8Array, runtime: Runtime): C {
    const decoded = CrdtReference.decode(message);
    return runtime.getCrdtByReference(
      decoded.pathToBase!.map(arrayAsString),
      this.base
    ) as C;
  }
}

const ENCODING: "latin1" = "latin1";
export function arrayAsString(array: Uint8Array) {
  return Buffer.from(array).toString(ENCODING);
}
export function stringAsArray(str: string) {
  return new Uint8Array(Buffer.from(str, ENCODING));
}
