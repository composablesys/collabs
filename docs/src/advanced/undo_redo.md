# Undo/Redo

Collabs does not have built-in undo/redo support, but here are some ideas for how to incorporate it into your own app.

## Local Undo

The easiest form of undo is a "local" undo, which undoes local operations in reverse order (typical Ctrl+Z behavior).

In principle, you can implement this similarly to a non-collaborative app: maintain a stack of undo [commands](https://en.wikipedia.org/wiki/Command_pattern) to execute; after each local operation, push an "inverse" operation onto the stack; to undo, run the stack's top command.

A local operation's inverse should undo that operation's effects from the local user's perspective. For example:

1. Set the value of a [`CVar`](../api/collabs/classes/CVar.html) -> Set the `CVar` to its previous value.
2. Add a value to a [`CValueSet`](../api/collabs/classes/CValueSet.html) -> Delete that value.
3. Insert a character into a [`CText`](../api/collabs/classes/CText.html) -> Delete the character's [Position](../api/collabs/modules.html#Position). Unlike an index, the Position moves around to account for concurrent operations. You can get the position (after inserting) using [`getPosition`](../api/collabs/classes/CText.html#getPosition), then delete it with help from [`indexOfPosition`](../api/collabs/classes/CText.html#indexOfPosition).
4. Delete a text character -> Insert the same character at the index where its Position would be, with help from `getPosition` and `indexOfPosition(pos, "right")`.
5. Delete a value from a [`CList`](../api/collabs/classes/CList.html) -> Originally call [CList.archive](TODO) instead of CList.delete, then undo with [CList.restore](TODO).

Note that these undo operations are approximate; they do not give the exact same result as if the operation never happened.

Also note our use of [Position](../api/collabs/modules.html#Position)s instead of indices when lists are involved. This makes sure that undo operations move around to account for concurrent operations, like a cursor.

## Group, Selective, and Exact Undo

More complicated forms of undo include:

- _Group undo_ - Allow users to undo each others' operations.
- _Selective undo_ - Allow the user to undo operations anywhere in the history, not just in a stack.
- _Exact undo_ - Undo gives the exact same result as if the operation never happened.

The paper [Supporting Undo and Redo for Replicated Registers in Collaborative Applications (Brattli, Yu 2015)](https://doi.org/10.1007/978-3-030-88207-5_19) discusses these in a CRDT context.

We do not plan to support these directly in Collabs, but if you are ambitious, you could implement them in a custom Collab.
