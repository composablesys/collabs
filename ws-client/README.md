# @collabs/ws-client

Part of the Collabs library. Main package: [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs).

**@collabs/ws-client** contains [WebSocketNetwork](https://collabs.readthedocs.io/en/latest/api/ws-client/classes/WebSocketNetwork.html), a network provider that syncs Collabs documents with a central server using WebSockets. This is an easy way to collaborate with other users: each update is sent to the server, which echoes it to other users listening on the same `docID` and also stores it for later.

The [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) package contains the server.

## Docs

[Providers overview](https://collabs.readthedocs.io/en/latest/guide/providers.html)

[API](https://collabs.readthedocs.io/en/latest/api/ws-client)
