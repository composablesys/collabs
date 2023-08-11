# @collabs/ws-server

Part of the Collabs library. Main package: [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs).

**@collabs/ws-server** contains [WebSocketNetworkServer](https://collabs.readthedocs.io/en/latest/api/ws-server/classes/WebSocketNetworkServer.html). It listens to connections from [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client) clients and syncs updates between them. You can also configure it to store updates persistently and to authenticate clients.

This package also provides the `collabs-ws-server` command. It starts a WebSocketNetworkServer on `$PORT` (default: 3001) with in-memory storage and no authentication. This is useful for getting started with a Collabs app; see our [app template](https://github.com/composablesys/collabs/tree/master/template-app) for an example.

## Docs

[Providers overview](https://collabs.readthedocs.io/en/latest/guide/providers.html)

[API](https://collabs.readthedocs.io/en/latest/api/ws-server)
