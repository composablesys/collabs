# Recipe Editor Demo

A collaborative recipe editor, using [@collabs/ws-client](https://www.npmjs.com/package/@collabs/ws-client) and [@collabs/ws-server](https://www.npmjs.com/package/@collabs/ws-server) to connect users via a WebSocket server.

This demo uses React and [@collabs/react](https://www.npmjs.com/package/@collabs/react):

- [useCollab](https://collabs.readthedocs.io/en/latest/api/react/modules.html#useCollab) to control rerenders.
- [CollabsTextInput](https://collabs.readthedocs.io/en/latest/api/react/classes/CollabsTextInput.html) for each Ingredient text field.

It also uses a copy of our [rich-text demo](../rich-text) for the Instructions editor.

[fileshare-recipe-editor](https://github.com/mweidner037/fileshare-recipe-editor/) uses the same GUI but syncs changes through Dropbox instead of our own server. We demonstrated it at [LFW.dev](https://localfirstweb.dev/) meetup #5: [Video](https://www.youtube.com/watch?v=Z0nzsxhoToo&t=2346s), [Slides](https://docs.google.com/presentation/d/13I3L76R-wwiXxgTXI2ide3zlbjiWoTWXMSU9YbQdYXU/edit?usp=sharing).

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
