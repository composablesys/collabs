import {
  CrdtReference,
  DefaultSerializerMessage,
  IDefaultSerializerMessage,
} from "../../generated/proto_compiled";
import { Crdt, CrdtRuntime } from "./crdt_core";
import { serialize, deserialize } from "bson";

/**
 * A serializer for elements (keys, values, etc.) in Crdt collections,
 * so that they can
 * be sent to other replicas in Crdt operations.
 *
 * DefaultCollectionSerializer.getInstance() should suffice for most uses.
 */
export interface ElementSerializer<T> {
  serialize(value: T): Uint8Array;
  deserialize(message: Uint8Array, runtime: CrdtRuntime): T;
}

/**
 * Default serializer.
 * string, number, undefined, and null types are passed by-value.
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
      case "undefined":
        message = { undefinedValue: true };
        break;
      default:
        if (value === null) {
          message = { nullValue: true };
        } else if (value instanceof Crdt) {
          message = {
            crdtValue: CrdtReference.create({
              pathToRoot: value.pathToRoot as string[],
            }),
          };
        } else {
          // Use BSON
          message = { bsonValue: serialize(value) };
        }
    }
    return DefaultSerializerMessage.encode(message).finish();
  }

  deserialize(message: Uint8Array, runtime: CrdtRuntime): T {
    let decoded = DefaultSerializerMessage.decode(message);
    let ans: any;
    switch (decoded.value) {
      case "stringValue":
        ans = decoded.stringValue;
        break;
      case "numberValue":
        ans = decoded.numberValue;
        break;
      case "crdtValue":
        ans = runtime.getCrdtByReference(decoded.crdtValue!.pathToRoot!);
        break;
      case "undefinedValue":
        ans = undefined;
        break;
      case "nullValue":
        ans = null;
        break;
      case "bsonValue":
        ans = deserialize(Buffer.from(decoded.bsonValue));
        break;
      default:
        throw new Error("Bad message format: decoded.value=" + decoded.value);
    }
    // TODO: throw an error if ans is not of type T?
    return ans as T;
  }
}
