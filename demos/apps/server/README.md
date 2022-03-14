# Demo Server

Server for running the demos.

It serves the demos folder under /demos, and also provides pages including a generic Collabs container host (from `/src/site/`). You can host any container by navigating to `/host.html?network=ws&container=<url>`.

Based off of the source for [@collabs/container-testing-server](https://github.com/composablesys/collabs/tree/master/container-testing-server).

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm run dev`

Build the server from `src/`, with browser-facing content in [development mode](https://webpack.js.org/guides/development/).

### `npm run build`

Build the server from `src/`, with browser-facing content in [production mode](https://webpack.js.org/guides/production/) (smaller output files; longer build time; no source maps).

### `npm start`

Run the server. Open [http://localhost:3000/](http://localhost:3000/) to view. Use multiple browser windows at once to test collaboration.

Options:

- -s, --https run in https mode, using a fake (not secret, self-signed) certificate
- -h, --help display help for command

The port can be configured with the PORT environment variable. It defaults to 3000.

The linked demos use that server to collaborate, but you can also follow the instructions to run in Matrix widgets. (To load Matrix widgets from a localhost server, you'll need to start it in HTTPS mode: `npm start -- --https`. Note that other clients will only be able to load the widget if they can connect to the server at the same address---if it's a localhost address, all clients need to be on the same machine).

### `npm run clean`

Delete `dist/`.
