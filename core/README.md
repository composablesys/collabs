# @collabs/core

Part of the Collabs library. Main package: [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs).

**@collabs/core** includes the parts of Collabs that are applicable to general collaborative data structures (update-driven replicated data types), not just Conflict-free Replicated Data Types (CRDTs).

For local-first collaborative apps (Collabs's main use case), it is easier to import [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs), which re-exports this package plus [@collabs/crdts](https://www.npmjs.com/package/@collabs/crdts). Import this core package instead if you are developing a non-CRDT extension to Collabs, e.g., a library of [Operational Transformation](https://en.wikipedia.org/wiki/Operational_transformation) algorithms or data structures that rely on a central server to order operations.

## Docs

See [https://collabs.readthedocs.io/](https://collabs.readthedocs.io/)

[API](https://collabs.readthedocs.io/en/latest/api/core)
