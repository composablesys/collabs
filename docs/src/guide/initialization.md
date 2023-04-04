# Initializing `Collab`s

To ensure that your `Collab`s are connected to the network, they need to know about your [entry point](./entry_points.html). We enforce this by not letting you initialize `Collab`s in isolation by calling their constructor directly. Instead, you must use one of the techniques on this page.

In more detail, each `Collab` must be assigned a **parent** and a **name** when it is constructed, by passing an [InitToken](../api/collabs/classes/InitToken.html) as its first constructor argument. Its **parent** can be either the [entry point](./entry_points.html) or another `Collab` that implements [IParent](../api/collabs/interfaces/IParent.html). Its **name** is an arbitrary string that must be unique among all `Collab`s with the same parent.

> The parents arrange your `Collab`s into a tree, with the entry point as the root. The parents and names let us identify each `Collab` in a way that makes sense across devices: each `Collab` is identified by the series of names leading from it to the root entry point. Replicas of a `Collab` on different collaborating devices get the same identifier, which is how we know to connect them to each other, instead of to some other `Collab` in your app.

Don't try to make [InitToken](../api/collabs/classes/InitToken.html)s directly; instead, the parent will give you one to use, in a callback function. That's what the techniques below are about - they are ways to get `InitToken`s from various parents.

## "Global Variable" `Collab`s

Every Collabs app must have some **"global variable"** `Collab`s, whose parents are the [entry point](./entry_points.html). They together must contain the entire collaborative state of your app, either directly or via their own children (e.g., a "global variable" [CSet](../api/collabs/classes/CSet.html) contains [dynamically-created `Collab`s](#dynamically-created-collabs) as children).

We call them "global variables" because they exist in the top-level scope from Collabs's perspective, although you don't have to store them as literal global variables (hence the "scare quotes").

To initialize a "global variable" `Collab`, use your entry point's `registerCollab` method ([CRuntime.registerCollab](../api/collabs/classes/CRuntime.html#registerCollab) / [CContainer.registerCollab](../api/container/classes/CContainer.html#registerCollab)). For example, to initialize a `collabs.CCounter` and store it in `counter`:

```ts
// runtime is a CRuntime or CContainer
const counter = runtime.registerCollab(
  "counter", // name
  (init) => new collabs.CCounter(init) // constructor callback
);
```

A few things to note here:

- `registerCollab` returns the initialized `Collab`. You should store it in a `const` variable for later use. (It should be `const`, not `let` or `var`, because you keep the same instance of a `Collab` for its whole lifetime, while operations mutate its internal state.)
- The first argument is the **name** for your `Collab`. It must be unique among all calls to `runtime.registerCollab` but is otherwise arbitrary. We suggest using the same name as the variable where you store the returned `Collab`.
- The second argument is a callback function that accepts an [InitToken](../api/collabs/classes/InitToken.html), uses it to call your `Collab`'s constructor, then returns the `Collab`. `Collab`s always take the `InitToken` as their first constructor argument. They may take other constructor arguments as well, like any other class, although we don't use that here.

> Internally, `registerCollab` creates an [InitToken](../api/collabs/classes/InitToken.html) with the given name, calls your callback with it, stores the resulting `Collab` in the entry point, then returns it to you.

The "global variable" `Collab`s essentially set up a _schema_ for your app: they tell the Collabs library how your data is structured (types, names, nesting), its initial values, how to interpret network messages received from other collaborators, and how to interpret saved state passed to `runtime.load` (see [Entry Points](./entry_points.html)).

> Interpreting save data is why you have to finish your `registerCollab` calls before calling `runtime.load`.

To make sure that collaborators can understand each other, you must ensure that **all collaborators have the same "global variable" `Collab`s**, i.e., the same schema. In particular:

1. All collaborators must make the same number of calls to `runtime.registerCollab`, with the same names.
2. Calls with the same names on different collaborators must use the same/equivalent `Collab` class, generic types, and constructor arguments.

The easiest way to follow these rules is to have all collaborators run the same code. For example, they all load the same web page. Just be careful that your `registerCollab` calls don't depend on something that might change between collaborators - e.g., the user's name or the current time.

> If you have collaborators who can't run the exact same code because they are in different environments - e.g., browsers vs a NodeJS server - we recommend moving the Collabs initialization code into a shared module that all environments import.

Finally, it is sometimes tempting to perform mutating `Collab` operations (e.g., `counter.add(1)`) as part of initialization, just after constructing your `Collab`s. However, this is almost never what you want: those `Collab` operations will be repeated on _every_ collaborator, _every_ time they start your app, causing duplicate operations. If you want your `Collab`s to start in a specific initial state, either set it using the `Collab`s' constructor arguments, or assign a specific user to perform the mutating operation. Or, consider whether you need to be using a `Collab` at all - if the state you are mutating is just a view of other `Collab`s' states (e.g., an inverted index), it can be an ordinary (non-collaborative) data structure, so long as you keep it up-to-date [when the Collabs state changes](./handling_changes.html).

## Dynamically-Created `Collab`s

So far, we discussed "global variable" `Collab`s, which exist for the lifetime of your app (technically, of its [entry point](./entry_points.html)). But what if you want to create `Collab`s dynamically, at runtime? E.g., you want to create a new `Document` `Collab` each time a user hits the "New Document" button.

That is where **dynamically-created `Collab`s** come in. Collection types containing `Collab` elements, such as [CSet](../api/collabs/classes/CSet.html) (set), [CList](../api/collabs/classes/CList.html) (list), and [CMap](../api/collabs/classes/CMap.html) (map), let you create `Collab`s via their own `Collab` operations, like [CSet.add](../api/collabs/classes/CSet.html#add). We discuss those collections later in the Guide in [Built-In `Collab`s](./built_in_collabs.html#mutable-value-collections), but for now, we will explain how they initialize dynamically-created `Collab`s.

Each collection of `Collab`s takes a constructor argument called `valueConstructor`, which you must supply. `valueConstructor` is a callback function that accepts an [InitToken](../api/collabs/classes/InitToken.html) and possibly some other info. In this callback function, you must use the `InitToken` to call your `Collab`'s constructor, do any other setup you need (e.g., registering [event handlers](../advanced/events.html)), then return the `Collab`.

For example, to construct a `CSet` of `CCounter`s, you first define your `valueConstructor`:

```ts
function valueConstructor(valueInit: collabs.InitToken) {
  return new collabs.CCounter(valueInit);
}
```

You then use it as a constructor argument when initializing your `CSet` (here, as a "global variable" `Collab`):

```ts
// runtime is a CRuntime or CContainer
const set = runtime.registerCollab(
  "set",
  (init) => new collabs.CSet(init, valueConstructor)
);
```

Now you can call `set.add()` as a `Collab` operation, e.g., in response to a user's button press. That creates a new `CCounter` instance on **every** collaborating user, and those `CCounter` instances are collaboratively linked.

As with "global variable" `Collab`s, to ensure that all collaborators can understand each other / have the same scheme, you must follow the rule: `valueConstructor` calls with the same arguments on different collaborators must use the same/equivalent `Collab` class, generic types, and constructor arguments. Again, its easiest to have all collaborators run the same code; just be careful that your `valueConstructor` doesn't depend on something that might change between collaborators, e.g., the user's name or the current time.

## `CObject` Properties

We discuss these in [Data Modeling](./data_modeling.html) later in the Guide.

<!-- TODO -->

<!-- ## Summary

TODO: table of static vs dynamic, scope: global vs object (dynamic is always object)

No local variable Collabs b/c wouldn't make sense collaboratively. -->

## Next Steps

Continue following the Guide with [Handling Changes](./handling_changes.html) - the last really essential page.

To set initial _values_ for Collabs after initializing them as objects, see [Initial Values](../advanced/initial_values.html) in the [Advanced Topics](../advanced/index.html).

[^runtime]: Technically, the parent is the entry point's internal [CRuntime](../api/collabs/classes/CRuntime.html), accessed via [CRuntime.runtime](../api/collabs/classes/CRuntime.html#runtime) / [CContainer.runtime](../api/container/classes/CContainer.html#runtime).
