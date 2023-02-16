# Collabs tensor-average

Example TensorFlow tensor average CRDT built on top of the Collabs library.

It is a CRDT for the average of tensors: nodes can add in tensors, and the CRDT will compute a running average of all tensors so far. The CRDT can be reset, eliminating all causally prior tensors from the average. This has potential applications in federated learning (specifically, federated averaging).

This is a demo that the library can build custom CRDTs, including novel ones with complex internal behavior. It is not intended for production use, but you are free to use or modify it for your own apps.

Author: Maxime Kjaer

**Monorepo note:** To build this package, you must run `npm ci` (or `npm i`) in this directory. It is not one of the monorepo's workspaces, to avoid installing the (huge) tensorflow dependency during normal development.
