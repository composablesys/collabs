# Built-In `Collab`s and Types

This page gives an overview of the library's built-in `Collab`s. More detailed info about each data structure can be found in the [API docs](../api/collabs/index.html).

## Quick Reference

For a type `X`, we use `C(X)` to denote a collaborative version of `X`. The table below gives suggested `C(X)` values for common types. Alternatives may differ in the operations they support or in how they resolve conflicts between concurrent operations.

<!-- TODO: interface "of" methods as shortcut. -->

| Ordinary type `X`                                | Collaborative version `C(X)`                                                                                                      |
| ------------------------------------------------ | -------------------------------------------------------------------------  |
| Any immutable  `T`     | [`LWWCVariable<T>`](../api/collabs/classes/LWWCVariable.html)            |
| Any mutable `T`           | [`LWWMutCVariable<C(T)>`](../api/collabs/classes/LWWMutCVariable.html)     |
| `boolean`                                               | [`TrueWinsCBoolean`](../api/collabs/classes/TrueWinsCBoolean.html)        | 
| `number` (for counting or adding)                       | [`CCounter`](../api/collabs/classes/CCounter.html)                        |
| `number` (for counting, adding, and resetting)          | [`ResettableCCounter`](../api/collabs/classes/ResettableCCounter.html)    |
| `number` (for general arithmetic)                       | [`CNumber`](../api/collabs/classes/CNumber.html)                          |
| `string` (as texts in a text box with cursor)                             | [`CText`](../api/collabs/classes/CText.html)                              |
| Custom class w/ fixed properties, you may refer to [data modeling](./data_modeling.html)              | [`CObject`](../api/collabs/classes/CObject.html)                          |
| `Set<T>`, `T` [immutable](#immutable-value-collections)                          | [`AddWinsCSet<T>`](../api/collabs/classes/AddWinsCSet.html)               | 
| `Set<T>`, `T` [mutable](#mutable-value-collections)                           | [`DeletingMutCSet<C(T)>`](../api/collabs/classes/DeletingMutCSet.html)    | 
| `Map<K, V>`, `V` [immutable](#immutable-value-collections)                       | [`LWWCMap<K, V>`](../api/collabs/classes/LWWCMap.html)                    |
| `Map<K, V>`, `V` [mutable](#mutable-value-collections)                         | [`DeletingMutCMap<K, C(V)>`](../api/collabs/classes/DeletingMutCMap.html) | 
| [`Array<T>`](#arrays-vs-clists), `T` [immutable](#immutable-value-collections)                        | [`PrimitiveCList<T>`](../api/collabs/classes/PrimitiveCList.html)         |
| [`Array<T>`](#arrays-vs-clists), `T` [mutable](#mutable-value-collections)                          | [`DeletingMutCList<T>`](../api/collabs/classes/DeletingMutCList.html)     |


<!-- ## Choices

Often you can choose between several collaborative data structures. Different choices may support different operations, or different semantics in the face of conflicting concurrent operations. This section describes some common choices and how the options differ. -->

## Variables vs Everything Else

[`LWWCVariable`](../api/collabs/classes/LWWCVariable.html) is a valid choice for any immutable type. It treats values as opaque, and resolves conflicts between conflicting sets by choosing one arbitrarily (specifically, by later wall clock time).
Alternatively, you may use a more specific Collab (later rows in the table) to get type-specific conflict resolution.

> **Example.** If you store a `Set<T>` as an [`LWWCVariable<Set<T>>`](../api/collabs/classes/LWWCVariable.html) and two users add elements concurrently, then one of their new sets will "win" and overwrite the other, dropping the losing user's element. If you instead store the set as an [`AddWinsCSet<T>`](../api/collabs/classes/AddWinsCSet.html), then when two users add elements concurrently, their changes will be merged: both elements will be added.

<!-- ### `CObject`s vs Ordinary Objects

Similar to variable discussion (granularity of edits)

### `CObject`s vs `CMap`s

Use CObject, unless it's really dynamic (props not known at compile time).

### Arrays vs `CLists`

Lists are not like ordinary arrays (designed for insertion/deletion like a list); if you want a more ordinary array (fixed length at constructor time), use a normal array (shorthand for a bunch of individual vars), or maybe in some situations a map with numeric keys. -->


## Collection Types

The collection types (`CSet`, `CMap`, `CList`, and `CVariable`) all contain values that can have arbitrary types - possibly collaborative themselves. This section goes over general rules that apply to all collection types.

### Immutable vs Mutable Values

Each collection type has two classes of implementations, depending on whether the values are _immutable_ or _mutable_. Of course, the collections themselves are always mutable, e.g., you can always add and remove values from a `CSet` or set the value of `CVariable`. The question is whether those values can be mutated internally.

> **Example.** In a shopping list app, suppose you want each item to be immutable: users can add items to the list or delete them, but they can't edit an existing item. You can model this with the ordinary data type `Array<string>`. Since the `string` items are immutable, the collaborative version should be a `CList<string>` with immutable values, e.g., `PrimitiveCList<string>`.
>
> Instead suppose that you want each item to be mutable: users can edit an existing item, possibly at the same time as other users. Since the `string` items are now mutable (technically you are treating them as \*`string`s), the collaborative version should be a `CList<C(string)>` with mutable values, e.g., `DeletingMutCList<CText>`.

We distinguish mutable value collections by including `Mut` in their names, e.g., `DeletingMutCList`.

In some situations, the immutable vs. mutable distinction is subtle:

1. `LWWCMap<K, V>` has immutable values of type `V`. However, you can still change the value associated to a key, e.g., `map.set("foo", 7)`. The difference between `LWWCMap` and a map with mutable values is that in `LWWCMap`, you must not mutate a value in-place, e.g., `map.get("foo")!.doMutatingOperation();`. Instead, you can _only_ change a key's value using `map.set`. If two users set the same key concurrently like this, then one of their values will be chosen according to the Last-Writer-Wins (LWW) rule.
2. You can use `Collab`s as immutable values. In that case, the immutable value acts as a _reference_ to the original `Collab`, like the \* types above.
   > **Example.** In a project planning app, suppose you want to let users describe the set of people working on the project and assign one of them as the project lead. Let `CPerson` be a `Collab` that you are using to represent a person. Then you can use a (mutable value) `DeletingMutCSet<CPerson>` to represent the set of people, and an (immutable value) `LWWCVariable<CPerson>` to store a reference to the project lead, chosen from the set's values.

**Caution:** The library will not prevent you from internally mutating a value that you used in an immutable collection. Instead, you must take care not to do this. If you do mutate a value stored in an immutable collection, then that mutation will not be replicated to other users. Thus the mutating user will see the mutated state, while the other users will not, violating consistency.

### Immutable Value Collections

Immutable value collections have straightforward interfaces, similar to their ordinary versions. E.g., `AddWinsCSet<T>` has methods `add(value: T)`, `delete(value: T)`, values()`, etc., just like ES6 `Set<T>`.

Besides ensuring that the values are not mutated internally, ensure that they can be serialized - see [./serialization.md](Serialization). Primitive values, JSON-like objects or arrays, and references to `Collab`s are all serializable by default.

**Semantic difference with ES6 `Set` and `Map`:** when comparing `AddWinsCSet` values or `CMap` keys, we use _serialization equality_ instead of `===` equality. That is, `x` and `y` are considered equal if they serialize to the same `Uint8Array`. With the default serializer, this is equivalent to _deep `===` equality_. See [`ReferenceCSet`](../api/collabs/classes/ReferenceCSet.html) for a collaborative set that instead compares object values using `===`.

> **Example.** Let `set` be an `AddWinsCSet<[number, number]>` with the default serializer. If one user does `set.add([0, 0]); set.add([0, 0]);`, then `set` contains a single value `[0, 0]` that is a distinct object from either added value. In contrast, an ES6 `Set<[number, number]`> would contain both of the original arrays.

### Mutable Value Collections

Mutable value collections use values that are themselves `Collab`s. You mutate the values internally by performing operations on them as usual. If multiple users mutate a value concurrently, their changes will all take effect, using the value's usual conflict resolution algorithm.

The values are created dynamically at runtime, in response to operations on the collection. E.g., in a `CSet<C>`, each time a user calls `add`, a new instance of the `Collab` `C` is created on each replica as the new set element. Such collection operations are the _only_ way to create `Collab`s dynamically like this, at least when using just our built-in data structures.

To allow you to create `Collab`s dynamically, mutable values collections work a bit differently from the immutable versions. E.g., in a `CSet<CCounter>`, you can't create a new instance `foo` of `CCounter` and then call `set.add(foo)`: constructing `foo` is impossible without a `InitToken`. Instead:

- Operations that create a new value (e.g., `CSet.add`, `CMap.set`, `CList.insert`) input arbitrary arguments. The arguments' type (as an array) is specified using a generic type on the relevant interface, e.g., `CSet`'s `AddArgs`. They must be serializable - see [./serialization.md](Serialization). When such an operation is called, it serializes its arguments and sends them to every replica.
- You must specify a callback, `valueConstructor`, as a constructor argument when creating the collection. This callback is called with the arguments received from an `add`/`set`/`insert`/etc. operation (deserialized), plus a `InitToken`. The callback must use these to construct a new value, perform any per-value setup like adding event listeners, then return the value.

<!-- > **Example:** TODO -->

> **Aside:** In principle, once you have one way of creating `Collab`s dynamically (e.g., `DeletingMutCSet`), you can use that to create data structures dynamically, then put the data structures in an immutable value collection, instead of using a dedicated mutable value collection. E.g., you can make a mutable value map by creating `Collab`s with a `DeletingMutCSet` and then setting them as values in a `LWWCMap`. This is in fact precisely how `DeletingMutCMap` works, and most mutable value collections work similarly. The only collections that create values directly are [`DeletingMutCSet`](../api/collabs/classes/DeletingMutCSet.html) and [`GrowOnlyImplicitMergingMutCMap`](../api/collabs/classes/GrowOnlyImplicitMergingMutCMap.html).


<!-- 
### Mutable Value Collection Variants

Types of mutable collections (Deleting, Archiving). Note downsides of each: tombstones; non-revivable/destroying/inconsisten on deleting (can get confusing if you store it elsewhere, need to check). Also extras (merging map, move on deleting list, ?) -->

<!-- ### Treating Immutable Values as Mutable

TODO: CImmutableValue: wraps a value in a CType. Hack to let you get mutating collection features for immutable values (sending args - could also write your own type; list move ops - not yet implemented for PrimitiveCList; sending values by reference instead of the whole thing, so they are shortened; ??). Modest performance cost. -->

<!-- ## Interfaces

TODO (not as important)

For each type that has multiple collaborative versions with similar methods, we provide  -->
