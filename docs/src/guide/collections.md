# Collections of Collabs

As mentioned on [the previous page](./built_in_collabs.html#immutable-vs-mutable-values), you can create Collab collections that contain other Collabs: CSet, CMap, CLazyMap, and CList. These are the collaborative version of a collection that contains mutable values, e.g., a shopping list with editable items.

Collab collections can contain arbitrary Collab values. This includes other collections: you can nest Collab collections to arbitrary depths. You can even store custom (non built-in) Collabs in a collection, like the custom data models described on [the next Guide page](./data_modeling.html). This is a unique feature of our library.

To make this possible, collections of Collabs are a bit more complicated than collections of immutable values. We'll see a complete example and then go through the complications one-by-one.

## Example: Shopping List

Let's model a shopping list as a CList of CText items. That way, each item can be edited in the usual way for collaborative text, in addition to inserting and deleting items.

Constructing the list:

```ts
const doc = new CRuntime();

function valueConstructor(valueInit: InitToken): CText {
  const text = new CText(valueInit);
  text.on("Insert", (e) => console.log("You typed chars: " + e.values));
  return text;
}

const shoppingList: CList<CText, []> = doc.registerCollab(
  "shoppingList",
  (init) => new CList(init, valueConstructor)
);
```

Sample operations:

```ts
// When the user clicks "+" to append a blank new item:
shoppingList.push();

// When the user appends a new item with starting text "milk":
const newItem = shoppingList.push();
newItem.insert(0, "milk");

// When the user deletes the item at index 3:
shoppingList.delete(3);
```

Viewing the list:

```ts
// Print out the current state as an array.
console.log(shoppingList.map((item) => item.toString()));
```

## Complications

### 1. valueConstructor

In CList's constructor, we had to supply a `valueConstructor` function. It inputs an InitToken and outputs a CText.

This function serves the same purpose as the callback you pass to [CRuntime.registerCollab](./documents.html#using-cruntime): it tells your CList how to construct a new Collab. CList will call this `valueConstructor` once for each list value.

Like when you call `CRuntime.registerCollab`, you must ensure that all collaborators use "the same" `valueConstructor` function, returning a Collab with the same class and constructor arguments. That way, collaborators agree on how to interpret updates within each list value.

Observe that we added an [event handler](./handling_changes.html#collab-events) to the new CText value before returning it from `valueConstructor`. This is the recommended place to add event handlers, since `valueConstructor` is guaranteed to run exactly once for each list value, before applying any updates.

### 2. Adding Values

We added a new item to the shopping list using `shoppingList.push()`. Note that there is no argument to `push`. Indeed, we don't create CText items and then add them to the list; instead, we ask CList to create the item for us.

More generally, you can supply extra arguments to `push`. These are serialized, broadcast to all collaborators, and passed to each collaborator's `valueConstructor`. You can specify their types (joined into an array) using CList's second generic type parameter ("InsertArgs"). In our example, there are no extra arguments, so we use generic type `[]`: `CList<CText, []>`.

### 3. Initializing Added Values

When we had some initial text to put in a shopping list item, we inserted it like so:

```ts
const newItem = shoppingList.push();
newItem.insert(0, "milk");
```

Here [CList.push](../api/collabs/classes/CList.html#push) returns the new CText value. The next line then performs a normal collaborative operation on this value, inserting "milk". Because only one user runs this code (the user who added the item), "milk" is only inserted once, not duplicated once per collaborator.

_(It is tempting to pass "milk" as an argument to `push()` that gets passed through to each `valueConstructor`, then call `text.insert(0, "milk")` in each `valueConstructor`. This is wrong and will cause an error; see the [Gotchas](./gotchas.html#operations-in-event-handlers-or-initializers).)_

## Collections of CollabIDs

We saw above how collections of Collabs, like CList, differ from collections of immutable values. In particular, you don't insert an existing CText into a `CList<CText, []>`; instead, you ask the list to insert a new one for you.

However, sometimes you do want to put an existing Collab in a collection. For example, our [minesweeper demo](https://github.com/composablesys/collabs/tree/master/demos/apps/minesweeper/src/main.ts) has a `CSet<CMinesweeper>` of all game boards, plus a CVar that points to the current in-play game.

To do this, store [CollabID](../api/collabs/modules.html#CollabID)s in the collection instead of the actual Collabs. CollabIDs make sense across devices and can be serialized (they're JSON). Each collaborator can freely convert between a CollabID and their own copy of its Collab.

## Next Steps

Continue with [Data Modeling and Using CObjects](./data_modeling.html).
