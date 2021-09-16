# Horse Color Genetics Demo

A collaborative app where you edit a horse's genes and observe the effects on its coat color, as a [Compoventuals container](TODO: guide link).

TODO: author credit

Based off of [template-container](TODO).

## Installation

First, install [Node.js](https://nodejs.org/). Then run `npm i`.

## Commands

### `npm run dev`

Build the container from `src/`, in [development mode](https://webpack.js.org/guides/development/).

### `npm run build`

Build the container from `src/`, in [production mode](https://webpack.js.org/guides/production/) (smaller output files; longer build time; no source maps).

### `npm run start:standalone`

Run the testing server for the "standalone" deployment (see below). Open [http://localhost:3000/](http://localhost:3000/) to view. Use multiple browser windows at once to test collaboration.

See [container-testing-server](TODO) for usage info.

### `npm run start:multi`

Same as `npm run start:standalone`, but for the "multi" deployment (see below).

### `npm run clean`

Delete `dist/`.

## Deployment

There are two deployment builds:

- `dist/standalone/horse-color-genetics.html` is a [standalone container](TODO: guide about how works offline, in sandbox, easily redistributed, etc.). It can used in any [container host](TODO). However, it is rather large (30 MB, 20MB gzipped) and thus loads slowly.
- `dist/multi/horse-color-genetics.html` is a container, but is not standalone; it leaves out the images, which are instead other files in `dist/multi/`. These images must be hosted on a static site somewhere, and their location must be specified with an absolute URL in `webpack-multi.config.ts`'s `publicPath` field (TODO: exactly how, which folders to include in path). An absolute URL is necessary because a host might load the container HTML file as a data URL instead of from its original site, in which case paths relative to the HTML file will not point to the site. TODO: how to test this (test server should just work; that's good for testing in dev but bad for the final answer. Although I guess you can build (with publicPath), host the images, and then test).
