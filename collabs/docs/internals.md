# Internals

## Core Library

Coming soon

<!-- TODO: Tree of CRDTs etc.

CRDT algs (primitives, Crdt subclasses, movable list from Martin)
Mention (speculative) non-interleaving (double RGA).

Somewhere: mention useful features like batching, LWW consistency (setting many registers at once works as expected) - so long as you do ops in one thread. Avoid weird intermediate states due to batching and events. -->

## Built-in Collaborative Data Types

Our built-in collaborative data types are implemented as [Conflict-free Replicated Data Types (CRDTs)](https://crdt.tech/) - specifically, [operation-based CRDTs](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type#Operation-based_CRDTs).

Traditionally, operation-based CRDTs are described in terms of sending and receiving messages, like our `CPrimitive` type (plus direct `Crdt` subclasses). However, only a few of our collaborative types are implemented directly like this; instead, most of them are compositions of other types.

More info coming soon.
