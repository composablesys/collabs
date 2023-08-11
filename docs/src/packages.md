# All Packages

[List on npm](https://www.npmjs.com/org/collabs)

## Main Package

- [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs): A library for network- and storage-agnostic collaborative data structures (CRDTs).

## Network Providers

- [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client): Contains [WebSocketNetwork](./api/ws-client/classes/WebSocketNetwork.html), a network provider that syncs Collabs documents with a central server using WebSockets.
- [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server): Node.js server for @collabs/ws-client. Contains [WebSocketNetworkServer](./api/ws-server/classes/WebSocketNetworkServer.html) and the `collabs-ws-server` command.
- [@collabs/tab-sync](https://www.npmjs.com/package/@collabs/tab-sync): Contains [TabSyncNetwork](./api/tab-sync/classes/TabSyncNetwork.html), a network provider that shares updates across local tabs using BroadcastChannel.
- [@collabs/matrix-widget](https://www.npmjs.com/package/@collabs/matrix-widget): Contains [MatrixWidgetNetwork](./api/matrix-widget/classes/MatrixWidgetNetwork.html), a network provider that syncs Collabs documents through a [Matrix](https://matrix.org/) room from inside a widget. It is currently **experimental** because it does not save documents reliably.

## Storage Providers

- [@collabs/indexeddb](https://www.npmjs.com/package/@collabs/indexeddb): Contains [IndexedDBDocStore](./api/indexeddb/classes/IndexedDBDocStore.html), a storage provider that stores Collabs documents in IndexedDB.
- [@collabs/local-storage](https://www.npmjs.com/package/@collabs/local-storage): Contains [LocalStorageDocStore](./api/local-storage/classes/LocalStorageDocStore.html), a storage provider that stores Collabs documents in localStorage.

## Misc Tools

- [@collabs/react](https://www.npmjs.com/package/@collabs/react): Contains React hooks for using Collabs, and React components with built-in Collabs sync.

## Internal

@collabs/collabs is internally split into two packages:

- [@collabs/core](https://www.npmjs.com/package/@collabs/core): The parts of Collabs that are applicable to general collaborative data structures (update-driven replicated data types), not just Conflict-free Replicated Data Types (CRDTs). Use this to import internal utilities not included in @collabs/collabs, or if you are developing a non-CRDT extension to Collabs (e.g., a server-side reconciliation library.)
- [@collabs/crdts](https://www.npmjs.com/package/@collabs/crdts): Collabs's CRDTs.
