# Built-In `Collab`s and Types

This page gives an overview of the library's built-in `Collab`s. More detailed info about each data structure can be found in the [API docs](../api/collabs/index.html).

## Quick Reference

For a type `X`, we use `C(X)` to denote a collaborative version of `X`. The table below gives suggested `C(X)` values for common types.

<!-- TODO: interface "of" methods as shortcut. -->

| Ordinary type `X`                                                                        | Collaborative version `C(X)`                                                                                       |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Any immutable `T`                                                                        | [`CVar<T>`](../api/collabs/classes/CVar.html)                                                                      |
| `boolean`                                                                                | [`CBoolean`](../api/collabs/classes/CBoolean.html)                                                                 |
| `number` (for counting or adding)                                                        | [`CCounter`](../api/collabs/classes/CCounter.html)                                                                 |
| `string` (as plain text in a text box with cursors)                                      | [`CText`](../api/collabs/classes/CText.html)                                                                       |
| Rich text                                                                                | [`CRichText`](../api/collabs/classes/CRichText.html)                                                               |
| Custom class w/ fixed properties, you may refer to [data modeling](./data_modeling.html) | [`CObject`](../api/collabs/classes/CObject.html)                                                                   |
| `Set<T>`, `T` [immutable](#immutable-value-collections)                                  | [`CValueSet<T>`](../api/collabs/classes/CValueSet.html)                                                            |
| `Set<T>`, `T` [mutable](#mutable-value-collections)                                      | [`CSet<C(T)>`](../api/collabs/classes/CSet.html)                                                                   |
| `Map<K, V>`, `V` [immutable](#immutable-value-collections)                               | [`CValueMap<K, V>`](../api/collabs/classes/CValueMap.html)                                                         |
| `Map<K, V>`, `V` [mutable](#mutable-value-collections)                                   | [`CMap<K, C(V)>`](../api/collabs/classes/CMap.html) or [`CLazyMap<K, C(V)>`](../api/collabs/classes/CLazyMap.html) |
| [`Array<T>`](#arrays-vs-clists), `T` [immutable](#immutable-value-collections)           | [`CValueList<T>`](../api/collabs/classes/CValueList.html)                                                          |
| [`Array<T>`](#arrays-vs-clists), `T` [mutable](#mutable-value-collections)               | [`CList<T>`](../api/collabs/classes/CList.html)                                                                    |

<!-- ## Choices

Often you can choose between several collaborative data structures. Different choices may support different operations, or different semantics in the face of conflicting concurrent operations. This section describes some common choices and how the options differ. -->

## Variables vs Everything Else

[`CVar`](../api/collabs/classes/CVar.html) is a valid choice for any immutable type. It treats values as opaque, and resolves conflicts between conflicting sets by choosing one arbitrarily (specifically, by later wall clock time).
Alternatively, you may use a more specific Collab (later rows in the table) to get type-specific conflict resolution.

> **Example.** If you store a `Set<T>` as an [`CVar<Set<T>>`](../api/collabs/classes/CVar.html) and two users add elements concurrently, then one of their new sets will "win" and overwrite the other, dropping the losing user's element. If you instead store the set as an [`CValueSet<T>`](../api/collabs/classes/CValueSet.html), then when two users add elements concurrently, their changes will be merged: both elements will be added.

<!-- ### `CObject`s vs Ordinary Objects

Similar to variable discussion (granularity of edits)

### `CObject`s vs `IMap`s

Use CObject, unless it's really dynamic (props not known at compile time).

### Arrays vs `CLists`

Lists are not like ordinary arrays (designed for insertion/deletion like a list); if you want a more ordinary array (fixed length at constructor time), use a normal array (shorthand for a bunch of individual vars), or maybe in some situations a map with numeric keys. -->

## Collection Types

The collection types (set, map, list) all contain values that can have arbitrary types - possibly collaborative themselves. This section goes over general rules that apply to all collection types.

### Immutable vs Mutable Values

Each collection type has two classes of implementations, depending on whether the values are _immutable_ or _mutable_. Of course, the collections themselves are always mutable, e.g., you can always add and remove values from a set. The question is whether those values can be mutated internally.

> **Example.** In a shopping list app, suppose you want each item to be immutable: users can add items to the list or delete them, but they can't edit an existing item. You can model this with the ordinary data type `Array<string>`. Since the `string` items are immutable, the collaborative version should be a list of strings with immutable values: `CValueList<string>`.
>
> Instead suppose that you want each item to be mutable: users can edit an existing item, possibly at the same time as other users. Since the `string` items are now mutable (technically you are treating them as \*`string`s), the collaborative version should be a list of `C(string)` with mutable values: `CList<CText>`.

We distinguish immutable value collections by including `Value` in their names, e.g., `CValueList`.

In some situations, the immutable vs. mutable distinction is subtle:

1. `CValueMap<K, V>` has immutable values of type `V`. However, you can still change the value associated to a key, e.g., `map.set("foo", 7)`. The difference between `CValueMap` and a map with mutable values is that in `CValueMap`, you must not mutate a value in-place, e.g., `map.get("foo")!.doMutatingOperation()`. Instead, you can _only_ change a key's value using `map.set`. If two users set the same key concurrently like this, then one of their values will be chosen arbitrarily.
2. You can use a _reference_ to a `Collab`s as an immutable value, in the form of a [`CollabID`](../api/collabs/interfaces/CollabID.html).
   > **Example.** In a project planning app, suppose you want to let users describe the set of people working on the project and assign one of them as the project lead. Let `CPerson` be a `Collab` that you are using to represent a person. Then you can use a (mutable value) `CSet<CPerson>` to represent the set of people, and an (immutable value) `CVar<CollabID<CPerson>>` to store a reference to the project lead, chosen from the set's values.

**Caution:** The library will not prevent you from internally mutating a value that you used in an immutable collection. Instead, you must take care not to do this. If you do mutate a value stored in an immutable collection, then that mutation will not be replicated to other users. Thus the mutating user may see the mutated state, while the other users will not, violating consistency.

### Immutable Value Collections

Immutable value collections have straightforward interfaces, similar to their ordinary versions. E.g., `CValueSet<T>` has methods `add(value: T)`, `delete(value: T)`, values()`, etc., just like ES6 `Set<T>`.

Besides ensuring that the values are not mutated internally, ensure that they can be serialized. Primitive values, JSON-like objects or arrays, and references to `Collab`s are all serializable by default.

**Semantic difference with ES6 `Set` and `Map`:** when comparing `CValueSet` values or `CValueMap` keys, we use _serialization equality_ instead of `===` equality. That is, `x` and `y` are considered equal if they serialize to the same `Uint8Array`. With the default serializer, this is equivalent to _deep `===` equality_.

> **Example.** Let `set` be an `CValueSet<[number, number]>` with the default serializer. If one user does `set.add([0, 0]); set.add([0, 0]);`, then `set` contains a single value `[0, 0]` that is a distinct object from either added value. In contrast, an ES6 `Set<[number, number]`> would contain both of the original arrays.

### Mutable Value Collections

Mutable value collections use values that are themselves `Collab`s. You mutate the values internally by performing operations on them as usual. If multiple users mutate a value concurrently, their changes will all take effect, using the value's usual conflict resolution algorithm.

The values are created dynamically at runtime, in response to operations on the collection. E.g., in a `CSet<C>`, each time a user calls `add`, a new instance of the `Collab` `C` is created on each replica as the new set element. Such collection operations are the _only_ way to create `Collab`s dynamically like this, at least when using just our built-in data structures.

To allow you to create `Collab`s dynamically, mutable values collections work a bit differently from the immutable versions. E.g., in a `CSet<CCounter>`, you can't create a new instance `foo` of `CCounter` and then call `set.add(foo)`: constructing `foo` is impossible without a `InitToken`. Instead:

- Operations that create a new value (e.g., `CSet.add`, `CMap.set`, `CList.insert`) input arbitrary arguments. The arguments' type (as an array) is specified using a generic type on the relevant interface, e.g., `CSet`'s `AddArgs`. They must be serializable. When such an operation is called, it serializes its arguments and sends them to every replica.
- You must specify a callback, `valueConstructor`, as a constructor argument when creating the collection. This callback is called with the arguments received from an `add`/`set`/`insert`/etc. operation (deserialized), plus a `InitToken`. The callback must use these to construct a new value, perform any per-value setup like adding event listeners, then return the value.

<!-- > **Example:** TODO -->

> **Aside:** In principle, once you have one way of creating `Collab`s dynamically (e.g., `CSet`), you can use that to create Collabs dynamically, then put references to them (`CollabID`s) in an immutable value collection, instead of using a dedicated mutable value collection. E.g., you can make a mutable value map by creating `Collab`s with a `CSet` and then setting their `CollabID`s as values in a `CValueMap`. This is in fact precisely how `CMap` works, and most mutable value collections work similarly. The only collections that create values directly are [`CSet`](../api/collabs/classes/CSet.html) and [`CLazyMap`](../api/collabs/classes/CLazyMap.html).

<!--
### Mutable Value Collection Variants

Types of mutable collections (Deleting, Archiving). Note downsides of each: tombstones; non-revivable/destroying/inconsisten on deleting (can get confusing if you store it elsewhere, need to check). Also extras (merging map, move on deleting list, ?) -->

<!-- ### Treating Immutable Values as Mutable

TODO: CConst: wraps a value in a CType. Hack to let you get mutating collection features for immutable values (sending args - could also write your own type; list move ops - not yet implemented for CValueList; sending values by reference instead of the whole thing, so they are shortened; ??). Modest performance cost. -->

<!-- ## Interfaces

TODO (not as important)

For each type that has multiple collaborative versions with similar methods, we provide  -->
