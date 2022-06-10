# Counter Demo

A collaborative counter, as a [Collabs container](https://github.com/composablesys/collabs/blob/master/collabs/docs/containers.md).

Except for the readme, this folder is identical to the result of following the [Quick Start](https://collabs.readthedocs.io/en/latest/quick_start.html).

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm run dev`

Build the container from `src/`, in [development mode](https://webpack.js.org/guides/development/).

### `npm run build`

Build the container from `src/`, in [production mode](https://webpack.js.org/guides/production/) (smaller output files; longer build time; source maps have line numbers only).

### `npm start`

Run the testing server. Open [http://localhost:3000/](http://localhost:3000/) to view your container. Use multiple browser windows at once to test collaboration.

See [container-testing-server](https://www.npmjs.com/package/@collabs/container-testing-server) for usage info.

### `npm run clean`

Delete `dist/`.

## Deployment

See [Deployment](https://collabs.readthedocs.io/en/latest/guide/containers.html#deployment) for deployment options. The container's built HTML file is placed in `dist/` when you run `npm run dev` or `npm run build`.
