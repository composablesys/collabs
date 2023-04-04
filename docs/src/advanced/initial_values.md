# Initial Values

After [initialization](../guide/initialization.html) and before performing any operations, each `Collab` has a default initial value. For example, collection types are empty, [`CCounter`](../api/collabs/classes/CCounter.html) is 0, and [`CBoolean`](../api/collabs/classes/CBoolean.html) is false.

Sometimes, you need to customize this initial value. For example, the Quill rich text editor's starting text is `"\n"`. If you try to sync its state to a default [`CText`](../api/collabs/classes/CText.html), which starts as the empty string, then you will get index out-of-bounds errors.

Below are some techniques and non-techniques for customizing initial values.

## Techniques

### Constructor Options

A few `Collab`s take the initial value as a constructor option: [`CVar`](../api/collabs/classes/CVar.html), [`CBoolean`](../api/collabs/classes/CBoolean.html), [`CCounter`](../api/collabs/classes/CCounter.html).

### `Collab` Creator Operations

For a [dynamically-created `Collab`](../guide/initialization.html#dynamically-created-collabs), you can perform operations that set the initial value just after creating it. For example, if you have a `myTextSet: CSet<CText, ...>` where each `CText` needs initial value `"\n"`, you can do:

```ts
// After calling add, also set newText's initial value.
const newText = myTextSet.add(...);
newText.insert(0, "\n");
```

Observe that the initial value operations are performed by the same user who created the `Collab`, and _not_ any other users. That way, the operations are only performed once across all collaborators.

### Document Creator Operations

Similar to [`Collab` creator operations](#collab-creator-operations), if entire collaborative _documents_ are created by a specific user, that user can perform operations to set the document's initial state just after creating it, before sharing it with others. Note that the "user" might be a central server.

### Loading a Base State

Finally, sometimes neither `Collab`s nor documents have a specific creator. For example, our [rich text demo](https://github.com/composablesys/collabs/blob/master/demos/apps/rich-text/src/rich_text.ts) features a single document that always exists, with a single [global variable](../guide/initialization.html#global-variable-collabs) `clientText: CRichText` synced to Quill.

To the set the initial value of such a document's `Collab`s, you can create an identical "base" saved state on all users, then load that state before performing any operations (but after registering Collabs). For example:

```ts
function makeInitialSave(): Uint8Array {
  // Set up your CRuntime + Collabs (or AbstractDoc) as usual, but
  // with replicaID "INIT".
  const runtime = new collabs.CRuntime({ debugReplicaID: "INIT" });
  const clientText = runtime.registerCollab(
    "text",
    (init) => new CRichText(init)
  );
  // Now perform operations to set your initial value.
  // In this case, we need an initial "\n" to match Quill's initial state.
  runtime.transact(() => clientText.insert(0, "\n"));
  // Return the resulting saved state.
  return runtime.save();
}

// At the start of the app, after registering Collabs on runtime:
runtime.load(makeInitialSave());
```

This is functionally equivalent to [Document Creator Operations](#document-creator-operations), but instead of getting the "base" saved state from a specific user, you get a copy from the local `makeInitialSave()` call.

## Non-Techniques

The ideas below will not work as expected and should be avoided.

### Every-User Operations

It is tempting to have every user set the initial value by performing "setup" operations when they start the app:

```ts
const runtime = new CRuntime();
const text = runtime.registerCollab("text", (init) => new CText(init));
// "Setup" operation at app start - don't do this!
runtime.transact(() => text.insert(0, "\n"));
```

However, this will have unintended consequences:

- If you don't broadcast the setup operations' messages (i.e., you perform the operations before setting up your network), then other user will ignore your future messages, due to unmet causal dependencies.
- If you do broadcast the messages, the setup operations will be duplicated every time a user starts the app. In the text example, you could end up with "initial" text `"\n\n\n..."`.
- Duplication can occur even if you check for prior setup before performing your own, e.g., `if (text.length === 0) text.insert(0, "\n")`. Indeed, two users might do this check concurrently and both succeed.

### Operations in `valueConstructor`

For a [dynamically-created `Collab`](../guide/initialization.html#dynamically-created-collabs), you might try to perform setup operations in the `valueConstructor`. For example:

```ts
function valueConstructor(valueInit: collabs.InitToken) {
  const text = new collabs.CText(valueInit);
  // "Setup" operation in valueConstructor - don't do this!
  text.insert(0, "\n");
  return text;
}

const myTextSet = runtime.registerCollab(
  "myTextSet",
  (init) => new collabs.CSet(init, valueConstructor)
);
```

However, you'll get errors at runtime if try this:

```
Error: CRuntime.send called during a receive/load call; did you try to perform an operation in an event handler?
```

The issue is that you are performing a collaborative operation on _every_ user's device, in response to the original `myTextSet.add` operation. This would duplicate the operation (# users) times, which is usually a mistake, hence `CRuntime` won't let you. Instead, use [`Collab` Creator Operations](#collab-creator-operations).
