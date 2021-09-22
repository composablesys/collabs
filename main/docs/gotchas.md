# Gotchas

**Things that might go wrong**

The library is designed to make collaboration "just work". However, it's possible to misuse it in ways that cause inconsistencies or errors. This page lists some misuses to watch out for.

### Varying Initialization

Collaborative data types must be initialized identically for all users. In particular:

1. All users must make the same calls to [`runtime.registerCrdt`](./typedoc/classes/Runtime.html#registerCrdt), with the same names, types, and constructor arguments.
2. Likewise for calls to `addChild` within a `CObject`.
3. Constructor arguments, and the logic inside collaborative type constructors or `valueConstructor` callbacks, must not depend on values that can differ across users - e.g., the user's current time, fresh random values, or `runtime.replicaId`.

So long as all users are running the same version of the code, 1 and 2 should be automatic.

> Using different versions of an app within the same group (e.g., to permit updates) is not impossible, but it takes some care. We will add a guide about this eventually.

<!-- TODO: versioning advice guide -->

More info: [Initialization](./initialization.md).

### Delayed Initialization

All calls to [`runtime.registerCrdt`](./typedoc/classes/Runtime.html#registerCrdt) must happen before any messages are received from other users or any prior state is loaded. Typically, you accomplish this by making all of these calls immediately after constructing `runtime`, in the same thread. Otherwise, you may receive a message or save data that references a collaborative type you haven't registered yet, which will cause an error.

Likewise, within a `CObject`, you should make all calls to `addChild` within the constructor. (If you need to add children dynamically, you should instead use a built-in collection type to do so, e.g., `DeletingMutCSet`.)

More info: [Initialization](./initialization.md).

### Non-unique Names

All names passed to [`runtime.registerCrdt`](./typedoc/classes/Runtime.html#registerCrdt) must be unique. Likewise, within a `CObject`, all names passed to `addChild` must be unique. A simple way to ensure this is to use the corresponding variable's name. Note, however, that there is a network cost to longer names, so you might instead prefer to assign names in order of length ("", "0", "1", etc.).

### Non-Serializable Types

Not all values can be serialized with the default serializer (e.g., functions). Also, some values might not deserialize the way you expect - e.g., an object reference on one user is meaningless to other users, and so by default, objects are deserialized as deep clones of the input object.

You can work around any serialization issues by using a custom serializer.

More info: [Serialization](./serialization.md).

### Treating Events as Consistent

Although the _state_ of a collaborative data type is eventually consistent, the _events_ that it emits are not. Each user emits events according to its own view of how the state changed over time; this can differ across users if they receive network messages in different orders.

Examples:

- When using an `AddWinsCSet` named `set`, one user calls `set.add("foo")` while another concurrently calls `set.add("bar")`. Then some users may see an "Add" event for "foo" followed by an "Add" event for "bar", while other users see the opposite order.
- When using a `LwwCRegister` named `reg`, one user sets `reg.value = "foo"` while another concurrently sets `reg.value = "bar"`. Suppose "foo" wins under the last-writer-wins rule (its operation has a later wall clock time). Then users who receive the "bar" message and then the "foo" message will see two "Set" events: one for "bar", then one for "foo". Meanwhile, users who receive the "foo" message and then the "bar" message will only see one "Set" event, for "foo".

### Treating Iterator Orders as Consistent

`CSet` and `CMap` iterators might not yield elements in the same orders on different users, even when the `CSet`/`CMap`'s states are consistent. Instead, the iterators will yield elements in the order they were added/set locally. If you need a consistent iterator order, either use a `CList`, or maintain a sorted view of the collection.

### Operations in Event Handlers or Initializers

Do not perform collaborative data type operations in event handlers or initializers (e.g., collaborative data type constructors, or collection `valueConstructor` callbacks). These operations will end up running on each user _as collaborative operations_, i.e., each user will broadcast a copy of the operation to every other user. So the operation will be performed (# users) times in total - probably not what you want. (Also, the library will throw an error if you perform an operation during the processing of another operation, which includes event handlers and `valueConstructor` callbacks.)

You might be tempted into doing this because you are trying to set the initial value of a collaborative data type. E.g., perhaps when creating a new collaborative text document, you want to insert some placeholder text. To accomplish this, you can do one of the following:

- If the type is created by a specific user (e.g., they clicked an "Add Document" button), you can create the type and then perform the initial operations _on that user only_. Generally, creation methods like `DeletingMutCSet.add` return the created type, making this easy.
- For some types, you can specify their initial value using constructor arguments. Adding these to all built-in types, or providing a simpler workaround, is a work-in-progress (see [this issue](https://github.com/composablesys/compoventuals/issues/154)).

### Adding Event Listeners during Events

When listening on events from a collaborative type that is created dynamically in a collection (e.g., `ResettingMutCSet`), you should register event listeners within the `valueConstructor` callback, **not** during the new value's "Add"/"Set"/"Insert" event. See [TODO](ref section in events.md).

### Misusing `CrdtInitToken`s

Do not make your own `CrdtInitToken`s, unless you are writing a direct `Crdt` subclass that manages its own children.

Only use a given `CrdtInitToken` once, in the way intended by its creator. E.g., a collection's `valueConstructor` must return the collaborative data type created using its `initToken` parameter. Likewise for a [Pre-Crdt](./typedoc/modules.html#Pre); this is automatic if you use the built-in [`Pre`](./typedoc/modules.html#Pre) function.

In a collaborative data type's constructor, only use the `CrdtInitToken` in your `super` call.

More info: [Initialization](./initialization.md).

### Expecting Strong Consistency (Database-Style Transactions)

Do not attempt operations that require [strong consistency](https://en.wikipedia.org/wiki/Strong_consistency), e.g., transferring money between bank accounts. Strong consistency is impossible within the library, and any workaround you find will be flawed. Instead, you should either change your application so that it only requires eventual consistency, or use an external service for such operations (e.g., use a dedicated server to manage accounts).

See also: [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem).

<!-- ### Loading Too Early

TODO: loading in general (should have own guide)

- loading gotchas (performing ops before loading (block the user input in case loading takes some time); not setting up full state before loading; using ContainerRuntimeSource's auto load-after-first-thread but not setting up full state in the first thread)

Separate out things that will cause errors immediately (catchable with tests) vs subtler things? Latter are more pernicious. (Order by importance.) -->
