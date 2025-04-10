# @collabs/collabs

**Collabs** is a collections library for **collaborative data structures**. These are data structures that look like `Set`, `Map`, `Array`, etc., except they are synchronized between multiple users: when one user changes a collaborative data structure, their changes show up for every other user. You can use them to quickly build collaborative apps along the lines of Google Docs/Sheets/Slides, shared whiteboards, etc.

We call each collaborative data structure a **Collab**, for short.

**@collabs/collabs** is Collabs's main package. It contains Collabs's core and its [built-in collaborative data structures](https://collabs.readthedocs.io/en/latest/guide/built_in_collabs.html), which are all hybrid op-based/state-based [Conflict-free Replicated Data Types (CRDTs)](https://crdt.tech/).

## Docs

See [https://collabs.readthedocs.io/](https://collabs.readthedocs.io/)

[API](https://collabs.readthedocs.io/en/latest/api/collabs)

## Source Code

This package merely re-exports [@collabs/core](https://www.npmjs.com/package/@collabs/core) and [@collabs/crdts](https://www.npmjs.com/package/@collabs/crdts). The actual code lives in their source folders: [core](https://github.com/composablesys/collabs/tree/master/core), [crdts](https://github.com/composablesys/collabs/tree/master/crdts).
