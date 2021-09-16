# Container Selector

Lets the user select a [Compoventuals container](TODO: guide link) from a link or a file, then download the container as a file for safekeeping or sharing. This project is itself a Compoventuals container.

Based off of [template-container](TODO).

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm run dev`

Build the container from `src/`, in [development mode](https://webpack.js.org/guides/development/).

### `npm run build`

Build the container from `src/`, in [production mode](https://webpack.js.org/guides/production/) (smaller output files; longer build time; no source maps).

### `npm start`

Run the testing server. Open [http://localhost:3000/](http://localhost:3000/) to view. Use multiple browser windows at once to test collaboration.

See [container-testing-server](TODO) for usage info.

### `npm run clean`

Delete `dist/`.

## Deployment

`dist/selector.html` is a [standalone container](TODO: guide about how works offline, in sandbox, easily redistributed, etc.). It can used in any [container host](TODO).
