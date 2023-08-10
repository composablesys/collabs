# Built-in Collabs

This page gives an overview of the library's built-in collaborative data structures. For more info about a Collab, see its [API docs](../api/collabs/index.html).

## Quick Reference

The table below suggests which Collab `C(U)` to use for various TypeScript types `U`.

| Ordinary type `U`                                          | Collaborative version `C(U)`                                                                                             |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Any immutable `T`                                          | [`CVar<T>`](../api/collabs/classes/CVar.html)                                                                            |
| `boolean`                                                  | [`CBoolean`](../api/collabs/classes/CBoolean.html)                                                                       |
| `number` (for counting or adding)                          | [`CCounter`](../api/collabs/classes/CCounter.html)                                                                       |
| `string` (as plain text in a text box)                     | [`CText`](../api/collabs/classes/CText.html)                                                                             |
| Rich text                                                  | [`CRichText`](../api/collabs/classes/CRichText.html)                                                                     |
| `Set<T>`, `T` [immutable](#immutable-value-collections)    | [`CValueSet<T>`](../api/collabs/classes/CValueSet.html)                                                                  |
| `Set<T>`, `T` [mutable](#mutable-value-collections)        | [`CSet<C(T), ...>`](../api/collabs/classes/CSet.html)                                                                    |
| `Map<K, V>`, `V` [immutable](#immutable-value-collections) | [`CValueMap<K, V>`](../api/collabs/classes/CValueMap.html)                                                               |
| `Map<K, V>`, `V` [mutable](#mutable-value-collections)     | [`CMap<K, C(V), ...>`](../api/collabs/classes/CMap.html) or [`CLazyMap<K, C(V)>`](../api/collabs/classes/CLazyMap.html)  |
| `Array<T>`, `T` [immutable](#immutable-value-collections)  | [`CValueList<T>`](../api/collabs/classes/CValueList.html)                                                                |
| `Array<T>`, `T` [mutable](#mutable-value-collections)      | [`CList<T, ...>`](../api/collabs/classes/CList.html)                                                                     |
| Class with fixed properties                                | [`CObject`](../api/collabs/classes/CObject.html) subclass (see [data modeling](./data_modeling.html) later in the Guide) |

## Good to Know

We now highlight some details that are good to know.

### CVar vs Everything Else

You can use a [CVar](../api/collabs/classes/CVar.html) to store any type that is internally immutable. It lets you set and get the value.

If multiple users set the value concurrently, CVar will pick one arbitrarily. It will _not_ attempt to "merge" the conflicting operations. To do that, you must instead use a type-specific Collab.

### Lists, not Arrays

Although we map Array to CValueList/CList above, our lists behave differently from an ordinary array. Instead, they insert or delete values in the style of `Array.splice` or collaborative text editing, shifting later values around. Likewise for CText.

For more traditional array behavior, use a CValueMap/CMap from index to value.

### Immutable vs Mutable Values

Observe that we suggested different collection types depending on whether your values `T` are (internally) immutable or mutable.

- The collections of **immutable** values (CValueSet, CValueMap, CValueList, CVar) work by serializing each value you give it, broadcasting that to all collaborators, and deserializing on the other end.

  If one user internally mutates their copy of the value, it won't get serialized again; Collabs just won't know about that change. So the value won't change collaboratively.

- The collections of **mutable** values (CSet, CMap, CLazyMap, CList) instead use a Collab of type `C(T)` to represent each value. Operations on that Collab are collaborative as usual.

  You do need some extra setup to construct these collections, including an extra generic type (hidden with `...` above). See [the next page of the Guide](./collections.html).

For example, the ordinary version of a shopping list is `Array<string>`. You have two obvious choices for how to model this in Collabs:

- `CValueList<string>`: This allows operations like `list.push("milk")` and `list.delete(3)`, but you can't edit an existing item. At best you can delete the item and insert a new one.
- `CList<CText, []>`: This also lets you edit an existing item. E.g., to change index 4 from "milk" to "whole milk": `list.get(4).unshift("whole ")`. If another user edits that item concurrently, their edits will be merged in the usual way for collaborative text editing.

> Another choice is to model the shopping list as one big text block, using a single CText or CRichText.

### Fancy Semantics

One of [Collabs's goals](TODO) is _semantic flexbility_: as the app programmer, you should get to choose what the state will be after multiple users perform operations concurrently. These choices can be nuanced and app-specific. That way, you can make your app respect users' expectations and intents, even if users do a lot of offline edits and merge them later.

Towards this goal, Collabs builds in some fancy semantics. These are specific behaviors that make sense to users but are nontrivial to implement. They include:

- **CRichText formatting spans:** [CRichText](TODO) implements the [Peritext algorithm](TODO), which handles formatting spans in an intuitive way. For example, if one user bolds a range of text while another user types in that range concurrently, the new characters will also be bolded.
- **CList `move` operation:** [CList.move](TODO#move) implements Martin Kleppmann's [Moving Elements in List CRDTs](TODO) paper. That way, if one user moves a list element while someone else mutates it concurrently, the element is both moved and mutated.
- **CList deletion options:** If one user deletes a list element while someone else is still updating it, you have a few options for what to do: [delete-wins](TODO: CList.delete), [update-wins](TODO), or [archive](TODO) with the chance to restore later.
