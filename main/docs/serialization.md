# Serialization

Some collaborative types send values of arbitrary types to all replicas. These values are sent in serialized form.

For example, when you add `foo: T` to an `AddWinsCSet<T>`, `foo` is serialized and sent to all replicas. Each replica then deserializes `foo` and adds it to their own copy of the set.

Collaborative types that need to serialize values of an arbitrary type `T` take an argument of type [`ElementSerializer<T>`](./typedoc/interfaces/ElementSerializer.html) in their constructor. These serializer arguments default to an instance of [`DefaultElementSerializer`](./typedoc/classes/DefaultElementSerializer), which works for the following types (an extension of JSON):

- Primitive values, including `undefined` and `null`
- References to collaborative types (these deserialize as a reference to the recipient's version of the collaborative type)
- `Uint8Array` (as a byte array)
- Objects and arrays containing these types (including nested objects or arrays) without cyclic references.

Other types may throw an error during serialization, or deserialize to an unexpected value. If you want to serialize other types, optimize the size of serialized messages, or change the semantics (e.g., deserializing objects "by-reference" instead of as a deep copy), you must use a different `ElementSerializer` implementation or write your own.
