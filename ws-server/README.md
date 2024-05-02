# @collabs/ws-server

Part of the Collabs library. Main package: [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs).

**@collabs/ws-server** contains [WebSocketNetworkServer](https://collabs.readthedocs.io/en/latest/api/ws-server/classes/WebSocketNetworkServer.html). It listens to connections from [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client) clients and syncs updates between them. You can also configure it to store updates persistently and to authenticate clients.

This package also provides the `collabs-ws-server` command. It starts a WebSocketNetworkServer on `$PORT` (default: 3001) and `$HOST` (default: localhost) with in-memory storage and no authentication. This is useful for getting started with a Collabs app; see our [app template](https://github.com/composablesys/collabs-template-app) for an example.

For an example of how to use WebSocketNetworkServer with TLS, see this [code by rozek](https://github.com/rozek/collabs/blob/master/ws-server/bin/collabs-ws-server.js) ([instructions](https://github.com/rozek/collabs/tree/master/ws-server#how-to-use-the-collabs-ws-server-command)).

## Docs

[Providers overview](https://collabs.readthedocs.io/en/latest/guide/providers.html)

[API](https://collabs.readthedocs.io/en/latest/api/ws-server)
