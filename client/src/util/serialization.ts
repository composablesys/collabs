import { Runtime, Crdt } from "../crdt/";
import {
  ArrayMessage,
  CrdtReference,
  DefaultSerializerMessage,
  IDefaultSerializerMessage,
  ObjectMessage,
} from "../../generated/proto_compiled";

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
        }
        if (value instanceof Crdt) {
          // TODO: require to be in the same group.
          // How to enforce?
          message = {
            crdtValue: CrdtReference.create({
              pathToRoot: value.pathToRoot().map(stringAsArray),
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
          decoded.crdtValue!.pathToRoot!.map(arrayAsString)
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

// TODO: use these in networks
const ENCODING: "latin1" = "latin1";
export function arrayAsString(array: Uint8Array) {
  return Buffer.from(array).toString(ENCODING);
}
export function stringAsArray(str: string) {
  return new Uint8Array(Buffer.from(str, ENCODING));
}
