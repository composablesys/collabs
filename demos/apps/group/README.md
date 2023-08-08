# Shapes Demo (Semidirect Product)

A demo of the [semidirect product of CRDTs](https://docs.google.com/presentation/d/1AzUBBmq9IAf39ZvtSU5UtI-hlugsDsX7kuGKaaOZExQ/edit?usp=sharing), using [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client) and [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) to connect users over a WebSocket server.

Author: Ria Pradeep.

> Note: The app's CRDT is purely operation-based; it does not support merging saved states (unlike Collabs's built-in CRDTs). Instead, `CRuntime.load` can only be called in the initial state. The demo is setup to respect this rule; adding storage or cross-tab sync would break it.

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
