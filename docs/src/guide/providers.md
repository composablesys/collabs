# Network and Storage Providers

Collabs documents don't come with networking or storage built-in. Instead, you should configure **network and storage providers**. These keep your Collabs in sync with remote collaborators and persistent storage.

Our providers are inspired by [Yjs's providers](https://docs.yjs.dev/ecosystem/connection-provider) and [Automerge-Repo](https://github.com/automerge/automerge-repo).

## Collabs Providers

We publish several providers alongside Collabs. We already saw three [in the Quick Start](../quick_start.html#network-and-storage-providers); a complete list is below.

To use a provider, you typically construct a single instance per app. Then you can use its `subscribe` and `unsubscribe` methods to work with as many documents as you like.

Each provider uses `docID`s (arbitrary strings) to keep track of which documents are supposed to be kept in sync. For example, when using our Websocket client and server, documents on different devices that subscribe to the same `docID` will be kept in sync via the server.

All of our providers are designed to work well together. E.g., if you subscribe a document to both @collabs/indexeddb and @collabs/ws-client, then updates loaded from IndexedDB will be forwarded to the WebSocket server and vice-versa. That way, all copies of the document stay in sync.

### @collabs/ws-client

[npm package](https://www.npmjs.com/package/@collabs/ws-client)

[WebSocketNetwork](../api/ws-client/classes/WebSocketNetwork.html) is a network provider that syncs Collabs documents with a central server using WebSockets. This is an easy way to collaborate with other users: each update is sent to the server, which echoes it to other users listening on the same `docID` and also stores it for later.

The [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) package contains the server. You can construct its [WebSocketNetworkServer](../api/ws-server/classes/WebSocketNetworkServer.html) in a Node.js app or run the `collab-ws-server` command.

### @collabs/tab-sync

[npm package](https://www.npmjs.com/package/@collabs/tab-sync)

[TabSyncNetwork](../api/tab-sync/classes/TabSyncNetwork.html) is a network provider that shares updates across local tabs using BroadcastChannel. That way, a user with multiple tabs open sees their changes sync quickly, even when offline.

### @collabs/indexeddb

[npm package](https://www.npmjs.com/package/@collabs/indexeddb)

[IndexedDBDocStore](../api/indexeddb/classes/IndexedDBDocStore.html) is a storage provider that stores Collabs documents in IndexedDB. That way, your app can load documents quickly, even when offline. Adding IndexedDB storage is one step towards making your app [local-first](https://www.inkandswitch.com/local-first/).

### @collabs/local-storage

[npm package](https://www.npmjs.com/package/@collabs/local-storage)

[LocalStorageDocStore](../api/local-storage/classes/LocalStorageDocStore.html) is a storage provider that stores Collabs documents in localStorage. That way, your app can load documents quickly, even when offline.

Note that you will be subject to localStorage's small storage quotas.

## 3rd-Party Providers

If you publish your own provider (WebRTC networking, file storage, ??), let us know in [our Matrix room](https://matrix.to/#/#collabs-library:matrix.org) and we can list it here.

## Manual

You can also manually manage document updates, using the methods and events on [CRuntime](../api/collabs/classes/CRuntime.html) / [AbstractDoc](../api/collabs/classes/AbstractDoc.html). This is how providers work internally. See [Updates and Sync](../advanced/updates.html) for more info.

Manual update management (or writing custom providers) is often necessary for more complex apps, since our published providers are simple instead of flexible. However, you may still find it useful to read or fork our providers' source code, which contains thorough comments.

## Next Steps

You now know everything you need to begin making Collabs apps! Our [app template](https://github.com/composablesys/collabs-template-app) (described in the [Quick Start](../quick_start.html)) is a good starting point.

The rest of the Guide gives more info about working with Collabs. Continue with [Built-in Collabs](./built_in_collabs.html).
