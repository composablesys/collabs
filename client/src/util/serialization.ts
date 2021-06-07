import { serialize, deserialize } from "bson";
import { Runtime, Crdt } from "../crdt/";
import {
  CrdtReference,
  DefaultSerializerMessage,
  IDefaultSerializerMessage,
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
      case "undefined":
        message = { undefinedValue: true };
        break;
      default:
        if (value instanceof Crdt) {
          // TODO: require to be in the same group.
          // How to enforce?
          message = {
            crdtValue: CrdtReference.create({
              pathToRoot: value.pathToRoot().map(stringAsArray),
            }),
          };
        } else {
          // Use BSON.  It only works on objects, so
          // we have to wrap value in an object.
          message = { bsonValue: serialize({ "": value }) };
        }
    }
    return DefaultSerializerMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array, runtime: Runtime): T {
    let decoded = DefaultSerializerMessage.decode(message);
    let ans: any;
    switch (decoded.value) {
      case "bsonValue":
        // Unwrap the object by indexing ""
        ans = deserialize(Buffer.from(decoded.bsonValue))[""];
        break;
      case "crdtValue":
        ans = runtime.getCrdtByReference(
          decoded.crdtValue!.pathToRoot!.map(arrayAsString)
        );
        break;
      case "undefinedValue":
        ans = undefined;
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

// TODO: use these in networks
const ENCODING: "latin1" = "latin1";
export function arrayAsString(array: Uint8Array) {
  return Buffer.from(array).toString(ENCODING);
}
export function stringAsArray(str: string) {
  return new Uint8Array(Buffer.from(str, ENCODING));
}
