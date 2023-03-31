# Collabs CResettableCounter

Oblivious resettable counter CRDT built on top of the Collabs library.

The CRDT is based on the paper ["An Oblivious Observed-Reset Embeddable Replicated Counter"](https://doi.org/10.1145/3517209.3524084) by Matthew Weidner and Paulo Sérgio Almeida (PaPoC 2022).

This is a demo that the library can build custom CRDTs, including novel ones with complex internal behavior. It is not intended for production use, but you are free to use or modify it for your own apps.

> Note: The CRDT is purely operation-based; it does not support merging saved states (unlike Collabs's built-in CRDTs). Instead, `load` can only be called in the initial state.
