# Collaborative Data Types

This page gives an overview of the library's built-in collaborative data types. For complete information, see the [API docs](./typedoc) (specific links are in the table below)).

## Quick List

For a type `T`, we use `C(T)` to denote a collaborative version of `T`. The table below gives suggested `C(T)` values for common types.

| Ordinary type             | Collaborative version(s)                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| Any `T` (as opaque value) | [`CRegister<T>`](./typedoc/interfaces/CRegister.html) implementations                      |
| `boolean`                 | [`CBoolean`](./typedoc/interfaces/CBoolean.html) implementations                           |
| `number`                  | [`CCounter`](./typedoc/classes/CCounter.html), [`CNumber`](./typedoc/classes/CNumber.html) |
| `string` (as text)        | [`CText`](./typedoc/classes/CText.html)                                                    |
| `Set<T>`                  | [`CSet<T>`](./typedoc/interfaces/CSet.html) implementations                                |
| `Map<K, V>`               | [`CMap<K, V>`](./typedoc/interfaces/CMap.html) implementations                             |
| `Array<T>`                | [`CList<T>`](./typedoc/interfaces/CList.html) implementations                              |

When there are multiple collaborative versions of an ordinary type, they may differ in the operations they support or in how they resolve conflicts between concurrent operations.

## Immutable vs mutable values

For each collection type (`CSet`, `CMap`, `CList`) plus `CRegister`, there are two classes of implementations, depending on whether the values are _immutable_ or _mutable_. (The collections themselves are always mutable, e.g., you can always add and remove values from a `CSet` or set the value of `CRegister`; the question is whether those values can be mutated in-place.)

immutable values (serialization rules and serializer, also can be CRDT _refs_, but you can't construct a Crdt from scratch and add it, since you won't get a CrdtInitToken - use a mutable version instead). Technically serial rules apply to the SetArgs/InsertArgs, but these are just the value for the default implementations.
mutable values (as Crdts; choose of implementations). Can also work for primitive types; then it's like an object containing them.
SetArgs / InsertArgs: args you use to actively set the value, then you use a callback (which must be consistent). For mutable values you also get a CrdtInitToken, so you can construct a new Crdt dynamically. For default immutable value collections, it's the value itself; for mutable, it's the valueConstructor args except CrdtInitToken. Make sure they're serializable.
Lists are not like ordinary arrays (designed for insertion/deletion like a list); if you want a more ordinary array (fixed length or growing like a vector), use a map with numeric keys.
string as text vs register (granularity of editing)
register vs whatever else in general. Lww is always a good choice, but changes the granularity of editing.
