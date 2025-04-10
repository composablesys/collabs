# Minesweeper Demo

Collaborative Minesweeper, using [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client) and [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) to connect users via a WebSocket server.

Authors: Ignacio Maronna and Matthew Weidner.

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
