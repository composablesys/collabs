Tree of CRDTs etc.

CRDT algs (primitives, Crdt subclasses, movable list from Martin)
Mention (speculative) non-interleaving (double RGA).

Somewhere: mention useful features like batching, LWW consistency (setting many registers at once works as expected) - so long as you do ops in one thread. Avoid weird intermediate states due to batching and events.
