# Horse Color Genetics Demo

A collaborative app where you edit a horse's genes and observe the effects on its coat color, using [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client) and [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) to connect users via aWebSocket server.

This is a collaborative version of an app by [Jennifer Hoffman](http://www.jenniferhoffman.net/). Original app:
[http://horse.jenniferhoffman.net/horse-color-genetics.html](http://horse.jenniferhoffman.net/horse-color-genetics.html). Since the original app is CC-BY-NC-SA-3.0 licensed, so is this version.

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
