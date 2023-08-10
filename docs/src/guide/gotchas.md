# Gotchas

**Things that might go wrong**

Collabs is designed to make collaboration "just work". However, it's possible to misuse the library in ways that cause inconsistencies or errors. This page lists some gotchas to watch out for.

## Varying Initialization

All in-sync copies of a Collab must be initialized identically. In particular:

1. All copies of a document must make the same calls to [CRuntime.registerCollab](../api/collabs/classes/CRuntime.html#registerCollab), with the same names, Collab classes, and Collab constructor arguments (in the `init` callback)
2. Likewise for calls to `registerCollab` within a CObject.
3. Constructor arguments, and the logic inside Collab constructors or `valueConstructor` callbacks, must not depend on values that can differ across users - e.g., the user's current time, fresh random values, or [CRichText](../api/collabs/classes/CRuntime.html#replicaID).

So long as all users are running the same code, 1 and 2 should be automatic.

<!-- > See [Versioning](TODO) for tips on how to migrate schemas over time. -->

## Delayed Initialization

All of a document's [CRuntime.registerCollab](../api/collabs/classes/CRuntime.html#registerCollab) calls must happen before you use that document in any way: connecting providers, performing collaborative operations on its Collabs, or calling other CRuntime/AbstractDoc methods. To ensure this, you should make all CRuntime.registerCollab calls right after constructing the CRuntime. (In an AbstractDoc subclass, make all calls in its constructor.)

Likewise, within a CObject, you should make all calls to `registerCollab` within the constructor. If you need to add children dynamically, you should instead use a collection of Collabs, e.g., [CSet](../api/collabs/classes/CSet.html).

## Non-unique Names

All names passed to [CRuntime.registerCollab](../api/collabs/classes/IRuntime.html#registerCollab) must be unique. Likewise, within a CObject, all names passed to `super.registerCollab` must be unique. A simple way to ensure this is to use the corresponding variable's name. Note that there is a network cost to longer names, so you might instead prefer to assign names in order of length ("", "0", "1", etc.).

## Non-Serializable Types

Not all values can be serialized by default (e.g., functions). Also, some values might not deserialize the way you expect - e.g., an object reference on one user is meaningless to other users, and so by default, objects are deserialized as deep clones of the input object.

You can work around serialization issues by using a custom [Serializer](../api/collabs/interfaces/Serializer.html), which many Collabs accept as a constructor option.

## Collection Equality Semantics

Values in CValueSet, and keys in CValueMap, CMap, and CLazyMap, are compared using "serialization equality": two values/keys are considered equal if they serializer to equal Uint8Arrays. By default, this is effectively a deep-equals comparison, _not_ JavaScript's usual === comparison.

For example, if you add distinct but deep-equal objects to a JavaScript Set, you'll get a set of size 2:

```ts
const set: Set<any>;
set.add({ foo: "bar" });
set.add({ foo: "bar" });
console.log(set.size); // 2
```

If you do the same to a Collabs CValueSet, you'll get a set of size 1:

```ts
const set: CValueSet<any>;
set.add({ foo: "bar" });
set.add({ foo: "bar" });
console.log(set.size); // 1
```

## Treating Events as Consistent

Although the _state_ of a Collab is eventually consistent, the _events_ that it emits are not. Each user emits events according to its own view of how the state changed over time; this can differ across users if they receive updates in different orders.

Examples:

- When using an CValueSet, one user calls `set.add("foo")` while another concurrently calls `set.add("bar")`. Then some users will see an "Add" event for "foo" followed by an "Add" event for "bar", while others see the opposite order.
- When using a CVar, one user sets `theVar.value = "foo"` while another concurrently sets `theVar.value = "bar"`. Suppose "foo" wins under the arbitrary tiebreaker rule. Then users who receive the "bar" message and then the "foo" message will see two "Set" events: one for "bar", then one for "foo". Meanwhile, users who receive the "foo" message and then the "bar" message will only see one "Set" event, for "foo".

## Treating Iterator Orders as Consistent

CSet, CValueSet, CMap, and CValueMap iterators might not yield elements in the same orders on different users, even when the set/map states are consistent. Instead, the iterators will yield elements in the order they were added/set locally. If you need a consistent iterator order, either use a CList/CValueList, or maintain a sorted view of the collection.

## Operations in Event Handlers or Initializers

Do not perform Collab operations in event handlers or initializers (including Collab constructors and [collection `valueConstructor` callbacks](./collections.html#1-valueconstructor)). These operations will end up running on each user _as collaborative operations_, i.e., each user will broadcast a copy of the operation to every other user. So the operation will be performed (# users) times in total - probably not what you want.

If Collabs detects this, it will throw an error:

```
Error: CRuntime.send called during a receive/load call; did you try to perform an operation in an event handler?
```

You might be tempted into doing this because you are trying to set the initial value of a Collab - e.g., inserting placeholder text in a new document. See [Initial Values](../advanced/initial_values.html) for safe ways to do this.

## Adding Event Listeners during Events

When listening on events from a Collab in a [collection of Collabs](./collections.html), you should register event listeners within the `valueConstructor` callback, **not** during the new value's "Add"/"Set"/"Insert" event.

## Misusing InitTokens

Do not make your own [InitToken](../api/collabs/classes/InitToken.html)s (the `init` argument passed to each Collab's constructor).

Only use a given InitToken once, in the way intended by its creator. E.g., a collection's [`valueConstructor`](./collections.html#1-valueconstructor) must return the Collab created using its `init` parameter.

In a custom Collab's constructor, only use the InitToken in your `super(init)` call.

## Expecting Strong Consistency (Database-Style Transactions)

Do not attempt operations that require [strong consistency](https://en.wikipedia.org/wiki/Strong_consistency), e.g., transferring money between bank accounts. Strong consistency is impossible within the library, and any workaround you find will be flawed. Instead, you should either change your application so that it only requires eventual consistency, or use an external service for such operations (e.g., a dedicated server to manage account balances).

See also: [CAP theorem](https://en.wikipedia.org/wiki/CAP_theorem).
