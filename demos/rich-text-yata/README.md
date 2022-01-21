# Rich Text Demo (Experimental YATA + Semidirect)

A collaborative rich text editor using [Quill](https://quilljs.com/), as a [Collabs container](TODO: guide link).

This demo uses YATA instead of the built-in CRDT sequence algorithm, and it uses a semidirect product to better preserver user intention: if you type in the middle of a block of text while someone else changes its formatting, your new text will get the block formatting. Currently, the Quill integration is a bit behind the other rich text demo, hence the label "experimental".

Author: Benito Geordie.

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

`dist/rich_text_yata.html` is a [standalone container](TODO: guide about how works offline, in sandbox, easily redistributed, etc.). It can used in any [container host](TODO).

## Note

This demo builds off of Collabs' `SemidirectProductRev`, which is not currently maintained while we think about replacements. So newer features might break in the demo. In particular, saving will throw an error.
