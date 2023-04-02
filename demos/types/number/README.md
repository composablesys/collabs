# Collabs CNumber

A number CRDT with add, multiply, min, and max operations.

The CRDT is an extension of the add/mult example from the paper ["Composing and Decomposing Op-Based CRDTs with Semidirect Products"](https://doi.org/10.1145/3408976) by Matthew Weidner, Heather Miller, and Christopher Meiklejohn (ICFP 2020).

This is a demo that the library can build custom CRDTs, including novel ones with complex internal behavior. It is not intended for production use, but you are free to use or modify it for your own apps.

Author: Ria Pradeep

> Note: The CRDT is purely operation-based; it does not support merging saved states (unlike Collabs's built-in CRDTs). Instead, `load` can only be called in the initial state.
