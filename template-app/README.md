# Compoventuals template-app

Template for a Compoventuals app with a specific network (e.g., your own server).

Guide: TODO

See also [template-container](TODO).

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm run build`

Build the app in `src/`, in [development mode](https://webpack.js.org/guides/development/).

### `npm run build-prod`

Build the app in `src/`, in [production mode](https://webpack.js.org/guides/production/) (smaller output files; longer build time; no source maps).

### `npm start`

Run the testing server. Open [http://localhost:3000/](http://localhost:3000/) to view your app.

Options:

- `npm start -- --https` (or `npm start -- -s`): run in https mode, using a fake (not secret, self-signed) certificate. Useful for testing `MatrixWidgetNetwork` apps (see below).
- Set the `PORT` environment variable to change the port to something besides 3000.

### `npm run clean`

Delete `dist/`.

## Starter Files

- `src/`: Client-side app source files. If you rename the files in here, also rename their uses in `webpack.config.ts` and `server/static/index.html`.
- `webpack.config.ts`: Webpack config for the client-side app.
- `tsconfig.json`: TypeScript config for the client-side app.
- `server/`: Source for the testing server used by `npm start`.

## Changing the Network

The template uses `compoventuals-ws-client`'s `WebSocketNetwork` on the client and `compoventuals-ws-server` on the testing server. So, all communication happens through the testing server, which clients connect to using WebSockets.

While the starter server is convenient for testing, it is not appropriate for actual deployments: all users on the site are collaborators, and the state is not saved, except as an ever-growing message log in the server's memory. You should instead customize the app's [`BroadcastNetwork`](TODO) to integrate with your own server, or use one that integrates with an existing network (e.g., [`MatrixWidgetNetwork`](TODO)). You should also set up [saving and loading](TODO: relevant guide) in the client app.

(If you don't want to bother with all that, and you don't care what network your users use, consider using [template-container](TODO) instead.)

You can easily modify the testing server for testing with these other `BroadcastNetwork` implementations:

- `MatrixWidgetNetwork` from [compoventuals-matrix-widget](TODO):

  1. Remove the call to `startWebSocketServer` in `server/testing_server.ts`.
  2. Start the server in https mode (`npm start -- --https`).
  3. In a widget-capable Matrix client (e.g., [Element web](https://app.element.io/)), type `/addwidget https://localhost:3000/dist/my_app.html` into a chat, then open the widget. You can test the app with multiple users by opening multiple clients on the same machine (the widget will not work on other machines due to the localhost address). To test the widget across multiple machines, you can host the files on the web (a static site is fine, but https is required) and use `/addwidget <link to hosted my_app.html>`.

- `WebRtcNetwork` from [compoventuals-webrtc-client](TODO):
  1. Install the WebRTC server: `npm i --save compoventuals-webrtc-server`.
  2. Replace the call to `startWebSocketServer` in `server/testing_server.ts` with a call to `startWebRtcServer`, imported from `compoventuals-webrtc-server`.
  3. Start the server and navigate to your app as usual.
