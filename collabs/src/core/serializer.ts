/**
 * A serializer for values of type T (e.g., elements
 * in Crdt collections), so that they can
 * be sent to other replicas in Crdt operations.
 *
 * DefaultSerializer.getInstance(runtime) should suffice for most uses.
 */
export interface Serializer<T> {
  serialize(value: T): Uint8Array;
  deserialize(message: Uint8Array): T;
}
