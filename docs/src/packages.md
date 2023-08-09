# All Packages

List on npm: [Collabs org](https://www.npmjs.com/org/collabs)

## Main Package

- [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs): Main package; includes data structures for local-first collaborative apps. Internally, it just re-exports the most commonly-used parts of [@collabs/core](https://www.npmjs.com/package/@collabs/core) and [@collabs/crdts](https://www.npmjs.com/package/@collabs/crdts).

## Network Providers

- [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client): Provides `WebSocketNetwork`, a demo network that connects a @collabs/collabs `CRuntime` to a [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) server over WebSockets.
- [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server): Node.js server for [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client).
- TODO: tab-sync
- [@collabs/matrix-widget](https://www.npmjs.com/package/@collabs/matrix-widget): Provides `MatrixWidgetNetwork`, a demo network that connects a @collabs/collabs `CRuntime` to the [Matrix](https://matrix.org/) network inside a widget. You can try it out using [our demo server](https://collabs-demos.herokuapp.com/#matrix), which lets you run any [container](./guide/containers.html) over Matrix.

## Storage Providers

- TODO: INdexeddb
- TODO: localStorage

## Internal

- [@collabs/core](https://www.npmjs.com/package/@collabs/core): Includes the parts of Collabs that are applicable to general collaborative data structures (i.e., message-driven replicated data types), not just Conflict-free Replicated Data Types (CRDTs). Use this to import parts not included in [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs), or if you are developing a non-CRDT extension to Collabs, e.g., a library for collaborative data structures that are managed by a central server.
- [@collabs/crdts](https://www.npmjs.com/package/@collabs/crdts): Includes Collabs's Conflict-free Replicated Data Types (CRDTs).
