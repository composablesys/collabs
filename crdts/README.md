# @collabs/crdts

Part of the Collabs library. Main package: [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs).

**@collabs/crdts** includes the library's [built-in collaborative data structures](https://collabs.readthedocs.io/en/latest/guide/built_in_collabs.html), which are all hybrid op-based/state-based [Conflict-free Replicated Data Types (CRDTs)](https://crdt.tech/).

For local-first collaborative apps (Collabs's main use case), it is easier to import [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs), which re-exports this package plus [@collabs/crdts](https://www.npmjs.com/package/@collabs/crdts). This package exists to separate out the CRDTs from [@collabs/core](https://www.npmjs.com/package/@collabs/core), which contains the parts of Collabs that generalize beyond CRDTs.

## Docs

See [https://collabs.readthedocs.io/](https://collabs.readthedocs.io/)

[API](https://collabs.readthedocs.io/en/latest/api/crdts)
