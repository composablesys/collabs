# `@collabs/ws-server`

Part of the Collabs library. Main package: [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs).

**@collabs/ws-server** contains the `WebSocketNetworkServer` class. Given a WebSocketServer from package [ws](https://www.npmjs.com/package/ws), it listens to connections from [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client) `WebSocketNetwork` clients and syncs updates between them. You can also configure it to store updates persistently and to authenticate clients.

This package also provides the `collabs-ws-server` command. It starts a `WebSocketNetworkServer` on `$PORT` (default: 3001) with in-memory storage and no authentication. This is useful for getting started with a Collabs app; see [template-app](https://github.com/composablesys/collabs/tree/master/template-app) for an example.

## Docs

<!-- TODO: Link to specific docs page instead of whole site -->

See [https://collabs.readthedocs.io/](https://collabs.readthedocs.io/)

[API](https://collabs.readthedocs.io/en/latest/api/ws-server)
