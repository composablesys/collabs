# Initial Values

After initialization and before applying any updates, each Collab has a default initial value. For example, collection types are empty, [CCounter](../api/collabs/classes/CCounter.html) is 0, and [CBoolean](../api/collabs/classes/CBoolean.html) is false.

Sometimes, you need to customize this initial value. For example, the Quill rich text editor's starting text is `"\n"`. If you try to sync its state to a default [CRichText](../api/collabs/classes/CRichText.html), which starts as the empty string, then you will get index out-of-bounds errors.

Below are some techniques and non-techniques for customizing initial values.

## Techniques

### Constructor Options

A few Collabs take the initial value as a constructor option: [`CVar`](../api/collabs/classes/CVar.html), [`CBoolean`](../api/collabs/classes/CBoolean.html), [`CCounter`](../api/collabs/classes/CCounter.html).

### Collab Creator Operations

For a value in a [collection of Collabs](../guide/collections.html), you can perform operations that set the initial value just after creating it. For example, if you have a `myTextSet: CSet<CText, ...>` where each `CText` needs initial value `"\n"`, you can do:

```ts
// After calling add, also set newText's initial value.
const newText = myTextSet.add();
newText.insert(0, "\n");
```

Observe that the initial value operations are performed by the same user who created the Collab, and _not_ any other users. That way, you only get one `"\n"`, not one per collaborator.

### Document Creator Operations

Similar to the previous technique, if an entire collaborative _document_ is created by a specific user, that user can perform operations to set the document's initial state just after creating it, before sharing it with others. Note that the "user" might be a central server.

### Loading a Base State

Finally, sometimes neither Collabs nor documents have a specific creator. For example, our [rich text demo](https://github.com/composablesys/collabs/blob/master/demos/apps/rich-text/src/rich_text.ts) features a single document that always exists, with a single `text: CRichText` Collab synced to Quill.

To the set the initial value of such a document's Collabs, you can create an identical "base" saved state on all users, then load that state before performing any operations (but after registering Collabs). For example:

```ts
function makeInitialSave(): Uint8Array {
  // Set up your CRuntime + Collabs (or AbstractDoc) as usual, but
  // with replicaID "INIT".
  const doc = new collabs.CRuntime({ debugReplicaID: "INIT" });
  const text = doc.registerCollab(
    "text",
    (init) => new collabs.CRichText(init)
  );
  // Now perform operations to set your initial value.
  // In this case, we need an initial "\n" to match Quill's initial state.
  doc.transact(() => text.insert(0, "\n", {}));
  // Return the resulting saved state.
  return doc.save();
}

// At the start of the app, after registering Collabs on doc,
// load the initial save:
doc.load(makeInitialSave());
```

This is functionally equivalent to the previous technique, but instead of getting the "base" saved state from a specific user, you get a copy from the local `makeInitialSave()` call.

## Non-Techniques

The ideas below will not work as expected and should be avoided.

### Every-User Operations

It is tempting to have every user set the initial value by performing "setup" operations when they start the app:

```ts
const doc = new CRuntime();
const text = doc.registerCollab("text", (init) => new CRichText(init));

// "Setup" operation at app start - don't do this!
doc.transact(() => text.insert(0, "\n", {}));
```

However, this will have unintended consequences:

- If you don't broadcast the setup operations' messages (e.g., you perform the operations before configuring your network provider), then other user will ignore your future messages, due to [unmet causal dependencies](./updates.html#syncing-documents).
- If you do broadcast the messages, the setup operations will be duplicated every time a user starts the app. In the text example, you could end up with initial text `"\n\n\n..."`.
- You can try to avoid duplication by checking who's first: `if (text.length === 0) text.insert(0, "\n", {})`. But two users might do this check concurrently and both succeed, again duplicating the `"\n"`.

### Operations in `valueConstructor`

For a value in a [collection of Collabs](../guide/collections.html), you might try to perform setup operations in the `valueConstructor`. For example:

```ts
function valueConstructor(valueInit: collabs.InitToken) {
  const text = new collabs.CRichText(valueInit);

  // "Setup" operation in valueConstructor - don't do this!
  text.insert(0, "\n", {});

  return text;
}

const myTextSet = doc.registerCollab(
  "myTextSet",
  (init) => new collabs.CSet(init, valueConstructor)
);
```

However, you'll get an error at runtime if try this (a [Gotcha](../guide/gotchas.html#operations-in-event-handlers-or-initializers)):

```
Error: CRuntime.send called during a receive/load call; did you try to perform an operation in an event handler?
```

Instead, use [Collab Creator Operations](#collab-creator-operations).
