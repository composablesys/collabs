# Collaborative Data Types

This page gives an overview of the library's built-in collaborative data types. More detailed info about each type can be found in the [API docs](./typedoc).

## Quick Reference

For a type `X`, we use `C(X)` to denote a collaborative version of `X`. The table below gives suggested `C(X)` values for common types. Alternatives may differ in the operations they support or in how they resolve conflicts between concurrent operations. TODO: interface "of" methods as shortcut.

| Ordinary type `X`                       | Collaborative version `C(X)`                                         | Alternatives                                                             |
| --------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Custom class w/ fixed properties        | [`CObject`](./typedoc/classes/CObject.html) ([Guide](TODO))          |
| `Set<T>`, `T` immutable                 | [`AddWinsCSet<T>`](./typedoc/classes/AddWinsCSet.html)               | [`CSet<T>`](./typedoc/interfaces/CSet.html) implementations              |
| `Set<T>`, `T` mutable                   | [`DeletingMutCSet<C(T)>`](./typedoc/classes/DeletingMutCSet.html)    | [`CSet<C(T)>`](./typedoc/interfaces/CSet.html) implementations           |
| `Map<K, V>`, `V` immutable              | [`LwwCMap<K, V>`](./typedoc/classes/LwwCMap.html)                    | [`CMap<K, V>`](./typedoc/interfaces/CMap.html) implementations           |
| `Map<K, V>`, `V` mutable                | [`DeletingMutCMap<K, C(V)>`](./typedoc/classes/DeletingMutCMap.html) | [`CMap<K, C(V)>`](./typedoc/interfaces/CMap.html) implementations        |
| `Array<T>`, `T` immutable               | [`PrimitiveCList<T>`](./typedoc/classes/PrimitiveCList.html)         | [`CList<T>`](./typedoc/interfaces/CList.html) implementations            |
| `Array<T>`, `T` mutable                 | [`DeletingMutCList<T>`](./typedoc/classes/DeletingMutCList.html)     | [`CList<C(T)>`](./typedoc/interfaces/CList.html) implementations         |
| \*(Any immutable `T`) (as opaque value) | [`LwwCRegister<T>`](./typedoc/classes/LwwCRegister.html)             | [`CRegister<T>`](./typedoc/interfaces/CRegister.html) implementations    |
| \*(Any mutable `T`) (as opaque value)   | [`LwwMutCRegister<C(T)>`](./typedoc/classes/LwwMutCRegister.html)    | [`CRegister<C(T)>`](./typedoc/interfaces/CRegister.html) implementations |
| \*`boolean`                             | [`TrueWinsCBoolean`](./typedoc/classes/TrueWinsCBoolean.html)        | [`CBoolean`](./typedoc/interfaces/CBoolean.html) implementations         |
| \*`number` (for counting or adding)     | [`CCounter`](./typedoc/classes/CCounter.html)                        |
| \*`number` (for general arithmetic)     | [`CNumber`](./typedoc/classes/CNumber.html)                          |
| \*`string` (as text)                    | [`CText`](./typedoc/classes/CText.html)                              |

\*`X` denotes a _variable holding type `X`_, or alternatively a mutable wrapper object `{ value: X }`. E.g., `CCounter` is the collaborative version of an object that you can mutate in-place by calling e.g. `obj.add(3)` and that you can read by calling `obj.value`.

## Collection Types

The collection types (`CSet`, `CMap`, `CList`, and `CRegister`) all contain values that can have arbitrary types - possibly collaborative themselves. This section goes over general rules that apply to all collection types.

### Immutable vs Mutable Values

Each collection type has two classes of implementations, depending on whether the values are _immutable_ or _mutable_. Of course, the collections themselves are always mutable, e.g., you can always add and remove values from a `CSet` or set the value of `CRegister`. The question is whether those values can be mutated internally.

> **Example.** In a shopping list app, suppose you want each item to be immutable: users can add items to the list or delete them, but they can't edit an existing item. You can model this with the ordinary data type `Array<string>`. Since the `string` items are immutable, the collaborative version should be a `CList<string>` with immutable values, e.g., `PrimitiveCList<string>`.
>
> Instead suppose that you want each item to be mutable: users can edit an existing item, possibly at the same time as other users. Since the `string` items are now mutable (technically you are treating them as \*`string`s), the collaborative version should be a `CList<C(string)>` with mutable values, e.g., `DeletingMutCList<CText>`.

We distinguish mutable value collections by including `Mut` in their names, e.g., `DeletingMutCList`.

In some situations, the immutable vs. mutable distinction is subtle:

1. `LwwCMap<K, V>` has immutable values of type `V`. However, you can still change the value associated to a key, e.g., `map.set("foo", 7)`. The difference between `LwwCMap` and a map with mutable values is that in `LwwCMap`, you must not mutate a value in-place, e.g., `map.get("foo")!.doMutatingOperation();`. Instead, you can _only_ change a key's value using `map.set`. If two users set the same key concurrently like this, then one of their values will be chosen according to the Last-Writer-Wins (LWW) rule.
2. You can use collaborative types as immutable values. In that case, the immutable value acts as a _reference_ to the original collaborative type, like the \* types above.
   > **Example.** In a project planning app, suppose you want to let users describe the set of people working on the project and assign one of them as the project lead. Let `CPerson` be a collaborative type that you are using to represent a person. Then you can use a (mutable value) `DeletingMutCSet<CPerson>` to represent the set of people, and an (immutable value) `LwwCRegister<CPerson>` to store a reference to the project lead, chosen from the set's values.

**Caution:** The library will not prevent you from internally mutating a value that you used in an immutable collection. Instead, you must take care not to do this. If you do mutate a value stored in an immutable collection, then that mutation will not be replicated to other users. Thus the mutating user will see the mutated state, while the other users will not, violating consistency.

### Immutable Value Collections

Immutable value collections have straightforward interfaces, similar to their ordinary versions. E.g., `AddWinsCSet<T>` has methods `add(value: T)`, `delete(value: T)`, values()`, etc., just like ES6 `Set<T>`.

Besides ensuring that the values are not mutated internally, ensure that they can be serialized - see [./serialization.md](Serialization). Primitive values, JSON-like objects or arrays, and references to collaborative types are all serializable by default.

**Semantic difference with ES6 `Set` and `Map`:** when comparing `AddWinsCSet` values or `CMap` keys, we use _serialization equality_ instead of `===` equality. That is, `x` and `y` are considered equal if they serialize to the same `Uint8Array`. With the default serializer, this is equivalent to _deep `===` equality_. See [`ReferenceCSet`](./typedoc/classes/ReferenceCSet.html) for a collaborative set that instead compares object values using `===`.

> **Example.** Let `set` be an `AddWinsCSet<[number, number]>` with the default serializer. If one user does `set.add([0, 0]); set.add([0, 0]);`, then `set` contains a single value `[0, 0]` that is a distinct object from either added value. In contrast, an ES6 `Set<[number, number]`> would contain both of the original arrays.

### Mutable Value Collections

Mutable value collections use values that are themselves collaborative types. You mutate the values internally by performing operations on them as usual. If multiple users mutate a value concurrently, their changes will all take effect, using the value's usual conflict resolution algorithm.

The values are created dynamically at runtime, in response to operations on the collection. E.g., in a `CSet<C>`, each time a user calls `add`, a new instance of the collaborative type `C` is created on each replica as the new set element. Such collection operations are the _only_ way to create collaborative types dynamically like this, at least when using just our built-in types.

To allow you to create collaborative types dynamically, mutable values collections work a bit differently from the immutable versions. E.g., in a `CSet<CCounter>`, you can't create a new instance `foo` of `CCounter` and then call `set.add(foo)`: constructing `foo` is impossible without a `CrdtInitToken`. Instead:

- Operations that create a new value (e.g., `CSet.add`, `CMap.set`, `CList.insert`) input arbitrary arguments. The arguments' type (as an array) is specified using a generic type on the relevant interface, e.g., `CSet`'s `AddArgs`. They must be serializable - see [./serialization.md](Serialization). When such an operation is called, it serializes its arguments and sends them to every replica.
- You must specify a callback, `valueConstructor`, as a constructor argument when creating the collection. This callback is called with the arguments received from an `add`/`set`/`insert`/etc. operation (deserialized), plus a `CrdtInitToken`. The callback must use these to construct a new value, perform any per-value setup like adding event listeners, then return the value.

> **Example:** TODO

> **Aside:** In principle, once you have one way of creating collaborative types dynamically (e.g., `DeletingMutCSet`), you can use that to create types dynamically, then put the types in an immutable value collection, instead of using a dedicated mutable value collection. E.g., you can make a mutable value map by creating collaborative types with a `DeletingMutCSet` and then setting them as values in a `LwwCMap`. This is in fact precisely how `DeletingMutCMap` works, and most mutable value collections work similarly. The only collections that create values directly are [`DeletingMutCSet`](./typedoc/classes/DeletingMutCSet.html) and [`GrowOnlyImplicitMergingMutCMap`](./typedoc/classes/GrowOnlyImplicitMergingMutCMap.html).

## Choices

Often you can choose between several collaborative types. Different choices may support different operations, or different semantics in the face of conflicting concurrent operations. This section describes some common choices and how the options differ.

### Registers vs Everything Else

register vs whatever else in general. Lww is always a good choice, but changes the granularity of editing.

> **Example.** TODO: setting value vs editing internally, on bulk object. Also applies to maps. string as text vs register (granularity of editing)

Efficiency of sending big object every time

### Mutable Value Collection Variants

Types of mutable collections (Deleting, Resetting, Tombstone). Note downsides of each: resetting message size for all ops; tombstones; non-revivable/destroying/inconsisten on deleting (can get confusing if you store it elsewhere, need to check); resetting needs resetting. Also extras (merging map, move on deleting list, ?)

### `CObject`s vs Ordinary Objects

Similar to register discussion (granularity of edits)

### `CObject`s vs `CMap`s

Use CObject, unless it's really dynamic (props not known at compile time).

### Arrays vs `CLists`

Lists are not like ordinary arrays (designed for insertion/deletion like a list); if you want a more ordinary array (fixed length at constructor time), use a normal array (shorthand for a bunch of individual vars), or maybe in some situations a map with numeric keys. Actually this applies generally to any collection (e.g. our use of a map object in the horse demo) - change title?.

### Treating Immutable Values as Mutable

TODO: CImmutableValue: wraps a value in a CType. Hack to let you get mutating collection features for immutable values (sending args - could also write your own type; list move ops - not yet implemented for PrimitiveCList; sending values by reference instead of the whole thing, so they are shortened; ??). Modest performance cost.

<!-- ## Interfaces

TODO (not as important)

For each type that has multiple collaborative versions with similar methods, we provide  -->
