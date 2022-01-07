# Related Work

This is a brief list of related projects and research. At some point, we will publish a paper with a full bibliography and link it from here.

## Collaborative Data Structure Libraries (for the Web)

### Network-Agnostic Libraries

[Yjs](https://docs.yjs.dev/)

[Automerge](https://github.com/automerge/automerge)

### Server-Based Libraries

[SharedDB](https://share.github.io/sharedb/)

[Legion](https://legion.di.fct.unl.pt/)

[Fluid Framework](https://fluidframework.com/)

## Collaborative Data Structure Research

[Conflict-free Replicated Data Types (CRDTs)](https://crdt.tech/)

[Operational Transformation (OT)](https://en.wikipedia.org/wiki/Operational_transformation). In principle, one could implement OT data structures in our library so long as they have Transformation Properties 1 & 2 described [here](https://dl.acm.org/doi/10.1145/240080.240305). However, many OT data structures only support Transformation Property 1, in which case they are not network agnostic (require a central server).
