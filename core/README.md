# @collabs/core

**Collabs core - General tools for collaborative data structures**

[https://www.npmjs.com/package/@collabs/core](https://www.npmjs.com/package/@collabs/core)

This package includes the parts of Collabs that are applicable to general collaborative data structures (i.e., message-driven replicated data types), not just Conflict-free Replicated Data Types (CRDTs).

For local-first collaborative apps (Collabs's main use case), it is easier to import [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs), which re-exports this package plus [@collabs/crdts](https://www.npmjs.com/package/@collabs/crdts). Import this core package instead if you are developing a non-CRDT extension to Collabs, e.g., a library for collaborative data structures that are managed by a central server.

## Docs

For now, see the @collabs/collabs docs (mostly CRDT focused): [Docs](https://github.com/composablesys/collabs/tree/master/collabs/docs/)

### API

```
git clone https://github.com/composablesys/collabs.git
cd collabs/core
npm i
npm run build
```

Open `docs/index.html.`
