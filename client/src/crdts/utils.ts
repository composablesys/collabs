import { CrdtReference, DefaultSerializerMessage, IDefaultSerializerMessage } from "../proto_compiled";
import { Crdt, CrdtRuntime } from "./crdt_core";
import { serialize, deserialize } from 'bson';

/**
 * Default serializer.
 * string, number, undefined, and null types are passed by-value.
 * Crdt types are sent by-reference, using the Crdt's
 * rootId and pathToRoot to identify different replicas
 * of the same Crdt.  Other types are passed by-value using BSON
 * (via https://github.com/mongodb/js-bson).
 */
export function defaultCollectionSerializer<T>(value: T): Uint8Array {
    let message: IDefaultSerializerMessage;
    switch (typeof value) {
        case "string":
            message = {stringValue: value};
            break;
        case "number":
            message = {numberValue: value};
            break;
        case "undefined":
            message = {undefinedValue: true};
            break;
        default:
            if (value === null) {
                message = {nullValue: true};
            }
            else if (value instanceof Crdt) {
                message = {
                    crdtValue: CrdtReference.create({
                        rootId: value.rootId,
                        pathToRoot: value.pathToRoot
                    })
                }
            }
            else {
                // Use BSON
                message = {bsonValue: serialize(value)};
            }
    }
    return DefaultSerializerMessage.encode(message).finish();
}

/**
 * Returns a default deserializer.
 * string, number, undefined, and null types are passed by-value.
 * Crdt types are sent by-reference, using the Crdt's
 * rootId and pathToRoot to identify different replicas
 * of the same Crdt.  Other types are passed by-value using BSON
 * (via https://github.com/mongodb/js-bson).
 */
export function newDefaultCollectionDeserializer<T>(parentOrRuntime: Crdt | CrdtRuntime) {
    let runtime: CrdtRuntime;
    if ("isCrdt" in parentOrRuntime) runtime = parentOrRuntime.runtime;
    else runtime = parentOrRuntime;
    // TODO: how to error if it's not actually T?
    return (message: Uint8Array) => defaultCollectionDeserializer(runtime, message) as T;
}

function defaultCollectionDeserializer(runtime: CrdtRuntime, message: Uint8Array): any {
    let decoded = DefaultSerializerMessage.decode(message);
    switch (decoded.value) {
        case "stringValue":
            return decoded.stringValue;
        case "numberValue":
            return decoded.numberValue;
        case "crdtValue":
            return runtime.getCrdtByReference(
                decoded.crdtValue!.rootId,
                decoded.crdtValue!.pathToRoot!
            );
        case "undefinedValue":
            return undefined;
        case "nullValue":
            return null;
        case "bsonValue":
            return deserialize(Buffer.from(decoded.bsonValue));
        default:
            throw new Error("Bad message format: decoded.value=" + decoded.value);
    }
}
