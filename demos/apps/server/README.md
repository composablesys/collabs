# Demo Server

Server for running the demos.

It serves `./src/site` at `/`, and each demo's `dist/` folder at `/<demo name>/`. The demos must be built beforehand.

All demos share a single [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) server, with a different `docID` for each demo. Otherwise, each demo functions the same as if you ran `npm start` in its specific folder.

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm start`

Run the demo server on [http://localhost:3000/](http://localhost:3000/). Use multiple browser windows at once to test collaboration.

To change the port, set the `$PORT` environment variable.

### `npm run test:tsc`

Test that the server compiles. (`npm start` uses `ts-node` instead of explicitly compiling TypeScript.)
