# @collabs/ws-server

Part of the Collabs library. Main package: [@collabs/collabs](https://www.npmjs.com/package/@collabs/collabs).

**@collabs/ws-server** contains [WebSocketNetworkServer](https://collabs.readthedocs.io/en/latest/api/ws-server/classes/WebSocketNetworkServer.html). It listens to connections from [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client) clients and syncs updates between them. You can also configure it to store updates persistently and to authenticate clients.

This package also provides the `collabs-ws-server` command. It starts a WebSocketNetworkServer on `$PORT` (default: 3001) and `$HOST` (default: localhost) with in-memory storage and no authentication. This is useful for getting started with a Collabs app; see our [app template](https://github.com/composablesys/collabs-template-app) for an example.

## Docs

[Providers overview](https://collabs.readthedocs.io/en/latest/guide/providers.html)

[API](https://collabs.readthedocs.io/en/latest/api/ws-server)

## How to use the `collabs-ws-server` Command ##

The "classical" approach to run a WebSocketNetworkServer is as follows:

```
  npm install @collabs/collabs
  cd ./ws-server
  npm run start
```

which actually runs the script found in `./bin/collabs-ws-server.js` and starts a server on port `3001` for `localhost`.

If you want to customize host and port, you may also run the script explicitly:

```
  HOST=0.0.0.0 PORT=3001 ./bin/collabs-ws-server.js
```

To check that the server is up and running, simply navigate your browser to the configured URL, e.g., to `http://localhost:3001` - you should see the text `collabs-ws-server` if everything works fine.

### Providing Transport Layer Security ###

Since modern browsers often require transport layer security and valid server certificates in order to communicate with external servers, the script also supports TLS (i.e., HTTPS and WSS).

For a TLS-enabled server, however, you first need a private key and a signed certificate for your server. Unless your server is publically accessible and has an "official" certificate (e.g., issued by [Let's Encrypt](https://letsencrypt.org/)), you will have to setup your own small "certificate authority" (CA) and let any system, that attempts to connect to your server, trust this CA. You may then use it to generate the required certificate.

**Fortunately, doing so is much simpler than you may expect**, just follow the instructions on [deliciousbrains.com](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/)

In the end, you should have two two files, namely

  * `./SSS.key` with your server's private key and
  * `./SSS.crt` with a signed certificate for your server

where `SSS` stands for the name of your server (just an arbitrary string of your choice)

Place these files in a folder (e.g., `/cert`) and remember that folder's path.

Now start the server using

```
  CERT=/cert/SSS HOST=0.0.0.0 PORT=3001 ./bin/collabs-ws-server.js
```

after replacing `SSS` with your server's name (as explained above) and, perhaps `/cert` with the path to the folder with your server's private key and certificate.

If everything works well, navigating your browser to `https://...:3001` (replace the ellipsis with the domain name of your server and mind the `https`!) should, again, show the text `collabs-ws-server`.
