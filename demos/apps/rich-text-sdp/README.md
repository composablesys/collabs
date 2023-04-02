# Rich Text Demo

A collaborative rich text editor using [Quill](https://quilljs.com/), as a [Collabs container](https://github.com/composablesys/collabs/blob/master/collabs/docs/containers.md).

> Note: The app's CRDT is purely operation-based; it does not support merging saved states (unlike Collabs's built-in CRDTs). Instead, `load` can only be called in the initial state.

Based off of [template-container](https://github.com/composablesys/collabs/tree/master/template-container).

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm run dev`

Build the container from `src/`, in [development mode](https://webpack.js.org/guides/development/).

### `npm run build`

Build the container from `src/`, in [production mode](https://webpack.js.org/guides/production/) (smaller output files; longer build time; no source maps).

### `npm start`

Run the testing server. Open [http://localhost:3000/](http://localhost:3000/) to view. Use multiple browser windows at once to test collaboration.

See [@collabs/container-testing-server](https://www.npmjs.com/package/@collabs/container-testing-server) for usage info.

### `npm run clean`

Delete `dist/`.

## Deployment

`dist/rich_text.html` is the compiled container. It can used in any container host.
