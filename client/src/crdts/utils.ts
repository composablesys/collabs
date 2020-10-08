import { CrdtReference, DefaultSerializerMessage, IDefaultSerializerMessage } from "../proto_compiled";
import { Crdt, CrdtRuntime } from "./crdt_core";

/**
 * Serializer for string, number, and Crdt types.
 * string and number types are passed by-value.
 * Crdt types are sent by-reference, using the Crdt's
 * rootId and pathToRoot to identify different replicas
 * of the same Crdt.  Other types cause an error.
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
        default:
            if (value instanceof Crdt) {
                message = {
                    crdtValue: CrdtReference.create({
                        rootId: value.rootId,
                        pathToRoot: value.pathToRoot
                    })
                }
            }
            else {
                throw new Error("defaultCollectionSerializer only works with values of type string | number | Crdt");
            }
    }
    return DefaultSerializerMessage.encode(message).finish();
}

/**
 * Returns a deserializer for string, number, and Crdt types.
 * string and number types are passed by-value.
 * Crdt types are sent by-reference, using the Crdt's
 * rootId and pathToRoot to identify different replicas
 * of the same Crdt.  Other types are not supported.
 */
export function newDefaultCollectionDeserializer<T>(parentOrRuntime: Crdt | CrdtRuntime) {
    let runtime: CrdtRuntime;
    if ("isCrdt" in parentOrRuntime) runtime = parentOrRuntime.runtime;
    else runtime = parentOrRuntime;
    // TODO: how to error if it's not actually T?
    return (message: Uint8Array) => defaultCollectionDeserializer(runtime, message) as unknown as T;
}

function defaultCollectionDeserializer(runtime: CrdtRuntime, message: Uint8Array): string | number | Crdt {
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
        default:
            throw new Error("Bad message format: decoded.value=" + decoded.value);
    }
}
