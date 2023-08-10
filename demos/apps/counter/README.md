# Counter Demo

A collaborative counter, using [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client) and [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) to connect users via aWebSocket server.

This is the same collaborative app described in the [Quick Start](https://collabs.readthedocs.io/en/latest/quick_start.html), but with a different network/storage setup:

- The app (`src/main.ts`) omits IndexedDB storage and cross-tab sync, to make it easier to see that the server is doing something.
- The app adds a "Connected" checkmark for testing concurrency.
- The server (`bin/server.ts`) runs both `express` and `@collabs/ws-server` in the same script (& port), instead of using the separate commands `webpack-dev-server` and `collabs-ws-server`.

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm run dev`

Build the app from `src/`, in [development mode](https://webpack.js.org/guides/development/).

### `npm run build`

Build the app from `src/`, in [production mode](https://webpack.js.org/guides/production/).

### `npm start`

Run the testing server on [http://localhost:3000/](http://localhost:3000/). Use multiple browser windows at once to test collaboration.

To change the port, set the `$PORT` environment variable.

### `npm run clean`

Delete `dist/`.
